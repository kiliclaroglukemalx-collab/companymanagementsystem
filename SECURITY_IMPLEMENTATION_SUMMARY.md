# Güvenlik Kuralları Implementasyonu

Bu dokümantasyon, PDF sayfa 701 ve 705'te belirtilen güvenlik kurallarının implementasyonunu açıklamaktadır.

## 1. Çoklu Oturum Kontrolü (Single Device Session)

### Özellik
Bir kullanıcı aynı anda sadece tek cihazdan giriş yapabilir. İkinci bir giriş yapıldığında, ilk oturum otomatik olarak sonlandırılır.

### Implementasyon
- **Dosya**: `lib/auth-login.ts` (satır 49-56)
- **Mantık**: Kullanıcı giriş yaptığında, o kullanıcının tüm aktif oturumları `revokedAt` alanı güncellenerek sonlandırılır.

```typescript
// Çoklu Oturum Kontrolü: Kullanıcının aktif oturumlarını sonlandır
await basePrisma.session.updateMany({
  where: {
    userId: user.id,
    revokedAt: null,
  },
  data: {
    revokedAt: new Date(),
  },
})
```

### Sonuç
Kullanıcı yeni bir cihazdan giriş yaptığında, eski cihazlardaki oturumları otomatik olarak geçersiz hale gelir ve kullanıcı çıkış yapmış gibi olur.

---

## 2. IP Çakışması Kontrolü (IP Conflict Detection)

### Özellik
Eğer farklı kullanıcılar aynı IP adresinden giriş yaparsa, bu işlem "Giriş Kayıtları"na şüpheli işlem olarak düşer ve Master Panel'e bildirim gider.

### Implementasyon
- **Dosya**: `lib/auth-login.ts` (satır 58-79)
- **Mantık**: 
  1. Aynı IP adresinden farklı bir kullanıcının aktif oturumu olup olmadığı kontrol edilir
  2. Çakışma tespit edilirse `SecurityEvent` tablosuna `ip_conflict` event'i kaydedilir
  3. Event metadata'sında şu bilgiler saklanır:
     - IP adresi
     - Çakışan kullanıcı bilgileri (ID, email, isim)
     - Mevcut kullanıcı bilgileri
     - IP'nin güvenilir olup olmadığı (Trusted IP listesi kontrolü)
     - Zaman damgası

```typescript
const conflictSession = await basePrisma.session.findFirst({
  where: {
    ip,
    revokedAt: null,
    userId: { not: user.id },
    user: { siteId: user.siteId },
  },
  select: { userId: true, user: { select: { email: true, name: true } } },
})

if (conflictSession) {
  const trusted = await isTrustedIp(user.siteId, ip)
  await logSecurityEvent({
    siteId: user.siteId,
    userId: user.id,
    type: "ip_conflict",
    meta: {
      ip,
      conflictingUserId: conflictSession.userId,
      conflictingUserEmail: conflictSession.user.email,
      conflictingUserName: conflictSession.user.name,
      currentUserEmail: user.email,
      currentUserName: user.name,
      trusted,
      timestamp: new Date().toISOString(),
    },
  })
}
```

### SecurityEvent Tipi
- **Dosya**: `lib/security-events.ts` (satır 42, 249-255)
- **Event Type**: `IP_CONFLICT` / `ip_conflict`
- **Severity**: `HIGH` (Yüksek Öncelik)
- **Category**: `alert` (Güvenlik Uyarısı)
- **Label**: "IP Çakışması"
- **Description**: "Aynı IP adresinden farklı kullanıcılar giriş yaptı"
- **Requires Resolution**: `true` (Çözümlenmesi gerekir)

### Görüntüleme
Master Panel kullanıcıları (SUPER_ADMIN), "Giriş Kayıtları" veya "Security Events" sayfasından bu olayları görebilir ve detayları inceleyebilir.

---

## 3. Oturum Zaman Aşımı (Session Timeout)

### Özellik
Kullanıcı belirli bir süre boyunca hareketsiz kalırsa oturumu otomatik olarak sonlandırılır. Bu süre Master Panel'den yönetilebilir.

### Database Değişikliği
- **Dosya**: `prisma/schema.prisma` (satır 668-682)
- **Model**: `MasterPanelSettings`
- **Yeni Alan**: `sessionTimeoutMinutes` (Integer, default: 60 dakika)

```prisma
model MasterPanelSettings {
  id                      String   @id @default(cuid())
  siteId                  String   @unique
  
  // ... diğer alanlar ...
  
  // Güvenlik Ayarları
  sessionTimeoutMinutes   Int      @default(60)  // Oturum zaman aşımı süresi (dakika)
  
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
}
```

### Implementasyon
- **Dosya**: `lib/auth.ts` (satır 115-153)
- **Mantık**:
  1. Her istek geldiğinde, kullanıcının oturumu kontrol edilir
  2. Session'ın `lastSeenAt` alanı ile şimdiki zaman arasındaki fark hesaplanır
  3. Fark, site ayarlarındaki `sessionTimeoutMinutes` değerinden büyükse oturum revoke edilir
  4. Oturum geçerliyse `lastSeenAt` güncellenir

```typescript
// Oturum Zaman Aşımı Kontrolü
const sessionTimeoutMinutes = session.user.site.masterPanelSettings?.sessionTimeoutMinutes || 60
const lastSeenAt = new Date(session.lastSeenAt)
const now = new Date()
const minutesSinceLastSeen = (now.getTime() - lastSeenAt.getTime()) / (1000 * 60)

if (minutesSinceLastSeen > sessionTimeoutMinutes) {
  // Oturum zaman aşımına uğradı, revoke et
  await basePrisma.session.update({
    where: { id: session.id },
    data: { revokedAt: new Date() },
  })
  return null
}
```

### Master Panel Yönetimi

#### Backend API
- **Dosya**: `app/api/chronos/master-panel/route.ts`
- **Endpoints**:
  - `GET /api/chronos/master-panel` - Ayarları getir
  - `PUT /api/chronos/master-panel` - Ayarları güncelle
- **Authorization**: Sadece `SUPER_ADMIN` rolü güncelleyebilir

```typescript
// GET endpoint'inde default settings
settings = await prisma.masterPanelSettings.create({
  data: {
    siteId: user.siteId,
    minEditableHour: 6,
    maxEditableHour: 23,
    requiresApproval: true,
    editingDurationMinutes: 30,
    sessionTimeoutMinutes: 60,  // Yeni alan
  },
})

// PUT endpoint'inde güncelleme
const { sessionTimeoutMinutes, ... } = await req.json()

await prisma.masterPanelSettings.upsert({
  where: { siteId: user.siteId },
  update: {
    sessionTimeoutMinutes,
    // ... diğer alanlar
  },
  create: {
    siteId: user.siteId,
    sessionTimeoutMinutes: sessionTimeoutMinutes || 60,
    // ... diğer alanlar
  },
})
```

#### Frontend UI
- **Dosya**: `components/dashboard/master-panel-settings-modal.tsx`
- **Component**: `MasterPanelSettingsModal`
- **Özellik**: 
  - Session timeout ayarını görüntüler ve düzenler
  - Slider ile 15-240 dakika arasında ayarlanabilir
  - 15 dakika artışlarla (step: 15)
  - Gerçek zamanlı görsel geri bildirim

```tsx
<div>
  <label className="block text-[13px] font-medium mb-2">
    Oturum Zaman Aşımı Süresi
  </label>
  <div className="px-4 py-3 rounded-xl">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[11px]">Kullanıcılar bu süre sonunda otomatik çıkış yapacak</span>
      <span className="text-[14px] font-bold">
        {settings.sessionTimeoutMinutes} dakika
      </span>
    </div>
    <input
      type="range"
      min="15"
      max="240"
      step="15"
      value={settings.sessionTimeoutMinutes}
      onChange={(e) => setSettings({ ...settings, sessionTimeoutMinutes: parseInt(e.target.value) })}
      className="w-full"
    />
  </div>
</div>
```

### Migration
- **Dosya**: `prisma/migrations/20260208_add_session_timeout/migration.sql`
- **SQL**:
```sql
ALTER TABLE "MasterPanelSettings" ADD COLUMN "sessionTimeoutMinutes" INTEGER NOT NULL DEFAULT 60;
```

---

## Test Senaryoları

### 1. Çoklu Oturum Testi
1. Kullanıcı A, Chrome'dan giriş yapıyor
2. Kullanıcı A, Firefox'tan giriş yapıyor
3. **Sonuç**: Chrome'daki oturum otomatik sonlanır, kullanıcı tekrar giriş yapmak zorunda kalır

### 2. IP Çakışması Testi
1. Kullanıcı A, IP: 192.168.1.100'den giriş yapıyor
2. Kullanıcı B, IP: 192.168.1.100'den giriş yapıyor
3. **Sonuç**: SecurityEvent tablosuna `ip_conflict` event'i eklenir
4. Master Panel'de "Giriş Kayıtları" sayfasında görünür
5. Event detayında her iki kullanıcının bilgileri ve IP adresi yer alır

### 3. Session Timeout Testi
1. Master Panel'den timeout süresi 30 dakika olarak ayarlanıyor
2. Kullanıcı giriş yapıyor
3. 30 dakika boyunca hiçbir işlem yapmıyor
4. 31. dakikada herhangi bir sayfaya tıklıyor
5. **Sonuç**: Oturum sonlanmış, kullanıcı giriş sayfasına yönlendirilir

---

## Güvenlik Notları

1. **Çoklu Oturum**: Bu özellik kullanıcı hesaplarının paylaşımını engeller ve güvenliği artırır.

2. **IP Çakışması**: 
   - Trusted IP listesindeki IP'ler için warning seviyesinde log tutulur
   - Trusted olmayan IP'ler için yüksek öncelikli alert oluşturulur
   - VPN veya proxy kullanımı tespit edilebilir

3. **Session Timeout**:
   - Her istek geldiğinde kontrol edilir (performans optimizasyonu: DB query cache)
   - Timeout süresi site bazında ayarlanabilir (multi-tenant yapı)
   - Frontend'de automatic token refresh mekanizması eklenmemiştir (kullanıcı deneyimi trade-off)

---

## Sonraki Adımlar (Opsiyonel İyileştirmeler)

1. **Real-time Bildirimler**: WebSocket veya SSE ile Master Panel'e anlık IP çakışması bildirimleri
2. **Email Notifications**: Kritik güvenlik olaylarında email gönderimi
3. **Advanced Analytics**: IP bazlı kullanıcı davranış analizi
4. **Geolocation**: IP adreslerinin coğrafi konumlarını gösterme
5. **2FA Enforcement**: Şüpheli IP'lerden giriş yapanlara zorunlu 2FA
6. **Session History**: Kullanıcı bazında oturum geçmişi sayfası

---

## İlgili Dosyalar

### Backend
- `lib/auth-login.ts` - Login mantığı ve güvenlik kontrolleri
- `lib/auth.ts` - Session timeout kontrolü
- `lib/session.ts` - Session oluşturma
- `lib/security-events.ts` - Security event tipleri ve metadata
- `lib/log-security-event.ts` - Security event loglama
- `app/api/chronos/master-panel/route.ts` - Master Panel API

### Frontend
- `components/dashboard/master-panel-settings-modal.tsx` - Ayarlar modal
- `components/admin/security-events-table.tsx` - Security events listesi

### Database
- `prisma/schema.prisma` - Database schema
- `prisma/migrations/20260208_add_session_timeout/migration.sql` - Migration

---

**Implementasyon Tarihi**: 8 Şubat 2026
**Versiyon**: 1.0
**Durum**: ✅ Tamamlandı

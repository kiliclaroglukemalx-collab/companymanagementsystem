# Chronos Module - Test Senaryoları

## 🧪 Test Edilecek Özellikler

### 1. Timeline Saat Değiştirme ve Aktif Personel Güncelleme

#### Test Adımları:
1. **Sayfa 1061 - Mesai Takvimi'ne gidin**
2. Chronos timeline'ını (24 saatlik çubuk) görmelisiniz
3. Timeline'ı farklı saatlere çekin (örn: 09:00, 14:00, 20:00)
4. Her saat değişiminde:
   - ✅ Aktif personel sayısının değiştiğini gözlemleyin
   - ✅ Her departman kartında aktif personel sayısının güncellendiğini kontrol edin
   - ✅ "Aktif Personel @ XX:00" göstergesinin değiştiğini görün

#### Beklenen Sonuç:
- Timeline'ı saat 14:00'e çektiğinizde, o saatte mesaisi olan personel sayısı tüm kartlarda görüntülenir
- 10 saniye hareketsizlikten sonra timeline otomatik olarak gerçek saate döner
- Geri sayım "Geri sayım: 10s, 9s, 8s..." şeklinde görüntülenir

---

### 2. Master Panel Ayarları (SUPER_ADMIN)

#### Test Adımları:
1. **SUPER_ADMIN** hesabıyla giriş yapın
2. Mesai Takvimi sayfasında **"Master Panel"** butonuna tıklayın
3. Açılan modal'da şu ayarları görmelisiniz:
   - Başlangıç Saati slider'ı (0-23)
   - Bitiş Saati slider'ı (0-23)
   - "Onay Sistemi Aktif" checkbox
   - "Düzenleme Yetkisi Süresi" slider'ı (10-120 dakika)

#### Test Senaryosu:
```
1. Başlangıç Saati: 08:00 olarak ayarlayın
2. Bitiş Saati: 20:00 olarak ayarlayın
3. Onay Sistemi: Aktif bırakın
4. Düzenleme Süresi: 30 dakika
5. "Kaydet" butonuna tıklayın
```

#### Beklenen Sonuç:
- ✅ "Master Panel ayarları güncellendi" başarı mesajı görüntülenir
- ✅ Ayarlar veritabanına kaydedilir
- ✅ Birim yöneticileri artık sadece 08:00-20:00 arası düzenleme talep edebilir

---

### 3. Vardiya Düzenleme Onay Talebi (MANAGER)

#### Test Adımları:
1. **MANAGER** hesabıyla giriş yapın
2. Mesai Takvimi sayfasında **"Düzenleme İzni Talep Et"** butonuna tıklayın
3. Açılan modal'da:
   - Başlangıç saati: 09:00
   - Bitiş saati: 18:00
   - Sebep: "Acil personel değişikliği gerekiyor"
4. **"Talep Gönder"** butonuna tıklayın

#### Beklenen Sonuç:
- ✅ "Onay talebi Master Panel'e gönderildi" mesajı görüntülenir
- ✅ Talep veritabanına PENDING durumunda kaydedilir
- ✅ Master Panel'de "Onay Bekleyen Talepler" listesinde görünür

---

### 4. Talep Onaylama (SUPER_ADMIN)

#### Test Adımları:
1. **SUPER_ADMIN** hesabıyla giriş yapın
2. **"Master Panel"** butonuna tıklayın
3. "Onay Bekleyen Talepler" bölümünde talepleri görün
4. Bir talebin yanındaki **"Onayla"** butonuna tıklayın

#### Beklenen Sonuç:
- ✅ "Talep onaylandı - 30 dakikalık düzenleme yetkisi verildi" mesajı
- ✅ MANAGER kullanıcısı için 30 dakikalık düzenleme yetkisi oluşturulur
- ✅ Talep durumu PENDING → APPROVED değişir
- ✅ `expiresAt` alanı (şu an + 30 dakika) olarak kaydedilir

---

### 5. Düzenleme Yetkisi Kontrolü (MANAGER)

#### Test Adımları:
1. Talep onaylandıktan sonra **MANAGER** hesabıyla tekrar giriş yapın
2. Mesai Takvimi sayfasında şunları göreceksiniz:

```
[✓] "Düzenleme Aktif (27dk)" butonu yeşil/mavi olarak vurgulanmış
[✓] "Vardiya Ekle" butonu artık görünür ve tıklanabilir
[✓] Vardiya kartlarına hover yapınca düzenleme butonları görünür
```

#### Beklenen Sonuç:
- ✅ Kalan süre gerçek zamanlı olarak güncellenir (27dk → 26dk → ...)
- ✅ 30 dakika sonunda yetki otomatik kaldırılır
- ✅ "Vardiya Ekle" butonu tekrar gizlenir
- ✅ Kullanıcı tekrar talep oluşturmalıdır

---

### 6. Saat Kısıtlaması Testi

#### Test Adımları:
1. Master Panel'de: minEditableHour=8, maxEditableHour=20 olarak ayarlayın
2. MANAGER olarak: 05:00-07:00 arası düzenleme talep etmeye çalışın

#### Beklenen Sonuç:
- ✅ Talep gönderilemez veya
- ✅ Master Panel talebı reddeder: "Talep edilen saat aralığı Master Panel ayarları dışında"

---

## 📋 Veritabanı Kontrolleri

### 1. ShiftApprovalRequest Tablosu
```sql
SELECT * FROM "ShiftApprovalRequest" 
WHERE status = 'PENDING'
ORDER BY "createdAt" DESC;
```

Beklenen kolonlar:
- `id`
- `requestedById` (User ID)
- `siteId`
- `reason`
- `requestedStartHour` (9)
- `requestedEndHour` (18)
- `status` (PENDING/APPROVED/REJECTED)
- `expiresAt` (Onay zamanı + 30 dakika)

### 2. MasterPanelSettings Tablosu
```sql
SELECT * FROM "MasterPanelSettings";
```

Her site için bir kayıt olmalı:
- `minEditableHour` (6-23 arası)
- `maxEditableHour` (6-23 arası)
- `requiresApproval` (true/false)
- `editingDurationMinutes` (30)

---

## 🔍 API Endpoint Testleri (Postman/Thunder Client)

### 1. Talep Oluşturma
```http
POST /api/chronos/shift-approval
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Test talebi",
  "requestedStartHour": 9,
  "requestedEndHour": 18
}
```

### 2. Talepleri Listele
```http
GET /api/chronos/shift-approval
Authorization: Bearer <token>
```

### 3. Talep Onayla
```http
PATCH /api/chronos/shift-approval/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "action": "approve"
}
```

### 4. Master Panel Ayarları
```http
GET /api/chronos/master-panel
Authorization: Bearer <token>

PUT /api/chronos/master-panel
Authorization: Bearer <token>
Content-Type: application/json

{
  "minEditableHour": 8,
  "maxEditableHour": 20,
  "requiresApproval": true,
  "editingDurationMinutes": 30
}
```

### 5. Düzenleme Yetkisi Kontrolü
```http
GET /api/chronos/editing-permission
Authorization: Bearer <token>
```

Response (yetki varsa):
```json
{
  "hasPermission": true,
  "expiresAt": "2026-02-07T15:30:00Z",
  "allowedStartHour": 9,
  "allowedEndHour": 18,
  "approvalId": "..."
}
```

---

## 🎨 UI/UX Kontrolleri

### Timeline (Chronos)
- [ ] Timeline smooth bir şekilde drag ediliyor mu?
- [ ] Seçilen saat altın renkli vurgulanıyor mu?
- [ ] Gerçek saat mavi renkli gösteriliyor mu?
- [ ] Geri sayım (10s countdown) görünüyor mu?
- [ ] 10 saniye sonra otomatik gerçek saate dönüyor mu?

### Master Panel Modal
- [ ] Modal açılıyor ve kapatılıyor mu?
- [ ] Slider'lar düzgün çalışıyor mu?
- [ ] Onay bekleyen talepler listeleniyor mu?
- [ ] "Onayla/Reddet" butonları çalışıyor mu?
- [ ] Başarı/hata mesajları toast olarak gösteriliyor mu?

### Düzenleme Yetkisi
- [ ] Yetki aktifken buton yeşil/mavi oluyor mu?
- [ ] Kalan süre gerçek zamanlı güncelleniyor mu?
- [ ] 30 dakika sonunda yetki kalkıyor mu?
- [ ] "Vardiya Ekle" butonu yetki varken görünüyor mu?

---

## ⚠️ Bilinen Sorunlar ve Çözümleri

### Problem: Timeline çalışmıyor
**Çözüm**: ChronosProvider'ın doğru yere sarıldığından emin olun
```tsx
<ChronosProvider>
  <DashboardContent />
</ChronosProvider>
```

### Problem: Aktif personel sayısı güncellenmiyor
**Çözüm**: useChronos hook'unun component içinde kullanıldığından emin olun

### Problem: Master Panel butonu görünmüyor
**Çözüm**: Kullanıcı rolü SUPER_ADMIN olmalı

### Problem: Talep onaylandığında yetki verilmiyor
**Çözüm**: useEditingPermissionSync hook'u çalışıyor mu kontrol edin

---

## 📊 Performans Testleri

### Timeline Performansı
- 1000 personel ile timeline drag etme: < 100ms
- Saat değiştirme hesaplaması: < 50ms
- Dashboard kartlarının güncellenmesi: < 200ms

### API Response Süreleri
- POST /shift-approval: < 500ms
- GET /shift-approval: < 300ms
- PUT /master-panel: < 400ms

---

## ✅ Test Checklist

### Fonksiyonel Testler
- [ ] Timeline saat değiştirme çalışıyor
- [ ] Aktif personel sayısı güncelleniyor
- [ ] Master Panel ayarları kaydediliyor
- [ ] Vardiya düzenleme talebi oluşturuluyor
- [ ] Master Panel talepleri görebiliyor
- [ ] Master Panel talepleri onaylayabiliyor/reddedebiliyor
- [ ] 30 dakikalık düzenleme yetkisi veriliyor
- [ ] Yetki süresi dolduğunda otomatik kalkıyor
- [ ] Saat kısıtlaması çalışıyor

### Güvenlik Testleri
- [ ] Yetkisiz kullanıcı Master Panel'e erişemiyor
- [ ] STAFF kullanıcı vardiya düzenleyemiyor
- [ ] API endpoint'leri JWT token ile korunuyor
- [ ] Rol tabanlı erişim kontrolü çalışıyor

### Performans Testleri
- [ ] Timeline smooth çalışıyor
- [ ] 100+ personel ile performans sorunsuz
- [ ] API response süreleri makul
- [ ] Gerçek zamanlı güncellemeler akıcı

---

**Test Tamamlanma Tarihi**: ___________
**Test Eden**: ___________
**Sonuç**: ✅ BAŞARILI / ❌ BAŞARISIZ

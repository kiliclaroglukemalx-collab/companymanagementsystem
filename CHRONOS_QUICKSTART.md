# Chronos Module - Hızlı Başlangıç Kılavuzu

## 🚀 5 Dakikada Chronos Modülünü Kullanmaya Başlayın

### Adım 1: Veritabanını Hazırlayın (2 dakika)

```bash
# Terminal'i açın ve proje klasörüne gidin
cd /Users/selimkilcik/Desktop/companymanagementsystem

# Prisma client'ı oluşturun
npx prisma generate

# Migration'ı çalıştırın (database connection varsa)
npx prisma migrate deploy

# Seed data'yı ekleyin
npx tsx prisma/seed-chronos.ts
```

**Not**: Eğer database connection hatası alırsanız, manuel olarak migration SQL'ini çalıştırın:
- Dosya: `prisma/migrations/20260207_add_chronos_module/migration.sql`

---

### Adım 2: Development Server'ı Başlatın (30 saniye)

```bash
npm run dev
```

Tarayıcınızda: `http://localhost:3000`

---

### Adım 3: Giriş Yapın ve Test Edin (2 dakika)

#### Test 1: Timeline (Herkes)
1. **"Mesai Takvimi"** sekmesine tıklayın
2. Chronos timeline'ını (24 saatlik çubuk) sürükleyin
3. Farklı saatlerdeki aktif personel sayılarını gözlemleyin
4. 10 saniye bekleyin → Otomatik gerçek saate döner

#### Test 2: Master Panel (SUPER_ADMIN)
1. SUPER_ADMIN hesabıyla giriş yapın
2. **"Master Panel"** butonuna tıklayın
3. Ayarları yapın:
   - Başlangıç Saati: 08:00
   - Bitiş Saati: 20:00
   - Onay Sistemi: ✅ Aktif
   - Düzenleme Süresi: 30 dakika
4. **"Kaydet"** butonuna tıklayın

#### Test 3: Vardiya Düzenleme Talebi (MANAGER)
1. MANAGER hesabıyla giriş yapın
2. **"Düzenleme İzni Talep Et"** butonuna tıklayın
3. Talep oluşturun:
   - Saat: 09:00 - 18:00
   - Sebep: "Test talebi"
4. **"Talep Gönder"** butonuna tıklayın

#### Test 4: Talep Onaylama (SUPER_ADMIN)
1. SUPER_ADMIN hesabıyla geri dönün
2. **"Master Panel"** → "Onay Bekleyen Talepler"
3. Talebi görün ve **"Onayla"** butonuna tıklayın

#### Test 5: Düzenleme Yetkisi (MANAGER)
1. MANAGER hesabıyla geri dönün
2. **"Düzenleme Aktif (27dk)"** butonunu görün
3. **"Vardiya Ekle"** butonu artık aktif olmalı
4. 30 dakika bekleyin → Yetki otomatik kalkacak

---

## 📋 Hızlı Referans

### API Endpoint'leri
```
POST   /api/chronos/shift-approval          # Talep oluştur
GET    /api/chronos/shift-approval          # Talepleri listele
PATCH  /api/chronos/shift-approval/[id]     # Onayla/Reddet
GET    /api/chronos/master-panel            # Ayarları getir
PUT    /api/chronos/master-panel            # Ayarları güncelle
GET    /api/chronos/editing-permission      # Yetki durumu
```

### React Hooks
```tsx
import { useChronos } from "@/lib/chronos-context"

const { 
  selectedHour,           // Seçilen saat
  realHour,               // Gerçek saat
  activePersonnelCount,   // Aktif personel sayısı
  editingPermission,      // Düzenleme yetkisi
  masterPanelSettings     // Master Panel ayarları
} = useChronos()
```

### UI Bileşenleri
```tsx
import { ChronosActiveCountBadge } from "@/components/dashboard/chronos-active-count"
import { MasterPanelSettingsModal } from "@/components/dashboard/master-panel-settings-modal"
import { ShiftApprovalRequestModal } from "@/components/dashboard/shift-approval-request-modal"
```

---

## 🎯 Temel Özellikler

### 1. Timeline Saat Değiştirme
**Ne yapar?** Geçmişe veya geleceğe bakarak o saatteki aktif personel sayısını gösterir.
**Nasıl kullanılır?** Timeline'ı sürükleyin, aktif personel sayıları otomatik güncellenir.

### 2. Master Panel Kontrolü
**Ne yapar?** Hangi saatler arasında vardiya düzenlenebileceğini belirler.
**Nasıl kullanılır?** Master Panel → Saat aralığı ayarlayın → Kaydet.

### 3. Onay Sistemi
**Ne yapar?** Yöneticiler vardiya değiştirmeden önce Master Panel'den onay alır.
**Nasıl kullanılır?** Talep oluştur → Master Panel onaylar → 30 dakika düzenleme yetkisi.

---

## 🔍 Sorun Giderme

### Timeline çalışmıyor?
✅ ChronosProvider sarıldı mı kontrol edin:
```tsx
<ChronosProvider>
  <YourApp />
</ChronosProvider>
```

### Master Panel butonu görünmüyor?
✅ Kullanıcı rolü SUPER_ADMIN mi kontrol edin

### Talep onaylandığında yetki verilmiyor?
✅ 10 saniye bekleyin (otomatik sync)
✅ Sayfayı yenileyin

---

## 📞 Yardım

Daha fazla bilgi için:
- **Detaylı Dokümantasyon**: `CHRONOS_MODULE.md`
- **Test Senaryoları**: `CHRONOS_TESTING.md`
- **Kurulum Özeti**: `CHRONOS_SUMMARY.md`

---

**İyi çalışmalar! 🎉**

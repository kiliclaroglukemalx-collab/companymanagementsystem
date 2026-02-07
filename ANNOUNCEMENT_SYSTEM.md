# Dinamik Bildirim ve Duyuru Sistemi

## Genel Bakış

Bu sistem, yöneticiler ve kullanıcılar arasında dinamik, hedefli ve izlenebilir bir bildirim/duyuru sistemi sağlar.

## Özellikler

### 1. Yönetici Paneli (Admin Panel - Sayfa 445)

**Lokasyon:** `/admin/announcements`

**Özellikler:**
- ✅ Başlık ve içerik ile duyuru oluşturma
- ✅ Önem seviyesi seçimi:
  - **Bilgi (INFO)**: Genel bilgilendirmeler
  - **Uyarı (WARNING)**: Önemli uyarılar
  - **Kritik (CRITICAL)**: Acil ve kritik duyurular (her zaman gösterilir)
- ✅ Hedef kitle seçimi:
  - Tüm Kullanıcılar
  - Sadece Yöneticiler (Admin/Super Admin/Manager)
  - Sadece Personel (Staff)
  - Belirli Site
  - Belirli Birim/Departman
  - Belirli Rol
- ✅ Görüntüleme ayarları:
  - Popup olarak göster
  - Gösterim modu (Bir Kez / Her Giriş / Günlük)
  - Aktif günler seçimi (Pzt, Sal, Çar, vb.)
  - Okunduğunda kaldır
- ✅ Geçerlilik tarihi ayarlama
- ✅ Duyuruları düzenleme, silme ve aktif/pasif yapma
- ✅ Okunma raporlarını görüntüleme

### 2. Hedefli Duyuru Gönderimi

**API Endpoint:** `POST /api/announcements`

Duyurular şu şekillerde hedeflenebilir:
- **Site bazlı:** Sadece belirli bir site çalışanlarına
- **Birim bazlı:** Sadece belirli bir departmandakilere
- **Rol bazlı:** Sadece belirli role sahip kullanıcılara
- **Popup özelliği:** Ana sayfada otomatik açılan popup olarak

### 3. Okunma Geçmişi ve Raporlama (Sayfa 508)

**Lokasyon:** Admin panel içinde her duyurunun yanındaki "Okunma Raporu" butonu

**Özellikler:**
- ✅ Hedef kullanıcı sayısı
- ✅ Okuyan kullanıcı sayısı ve listesi
- ✅ Okumayan kullanıcı sayısı ve listesi
- ✅ Her kullanıcının okuma zamanı
- ✅ Kullanıcı detayları (isim, email, rol, site, birim)

**API Endpoint:** `GET /api/announcements/[id]/read`

### 4. Kullanıcı Tercihleri (Sayfa 222)

**Lokasyon:** Ana sayfa → Ayarlar → Bildirimler → Ayarlar sekmesi

**Özellikler:**
- ✅ Popup bildirimleri açma/kapama
- ✅ Bilgilendirme duyurularını açma/kapama
- ✅ Uyarı duyurularını açma/kapama
- ⚠️ **ÖNEMLİ:** Kritik duyurular her zaman gösterilir (güvenlik nedeniyle kapatılamaz)

**API Endpoint:** 
- `GET /api/notifications/preferences` - Tercihleri getir
- `PATCH /api/notifications/preferences` - Tercihleri güncelle

## Veritabanı Yapısı

### Announcement Tablosu
```prisma
model Announcement {
  id              String
  title           String
  content         String (Text)
  severity        AnnouncementSeverity (INFO/WARNING/CRITICAL)
  targetType      AnnouncementTargetType
  targetSiteId    String? (Nullable)
  targetDepartmentId String? (Nullable)
  targetRole      UserRole? (Nullable)
  showAsPopup     Boolean
  displayMode     DisplayMode (ONCE/EVERY_LOGIN/DAILY)
  activeDays      String[] (Array)
  removeOnRead    Boolean
  isActive        Boolean
  expiresAt       DateTime? (Nullable)
  createdByUserId String
  createdAt       DateTime
  updatedAt       DateTime
}
```

### AnnouncementRead Tablosu
```prisma
model AnnouncementRead {
  id              String
  announcementId  String
  userId          String
  readAt          DateTime
}
```

### UserNotificationPreference Tablosu
```prisma
model UserNotificationPreference {
  userId                      String (PK)
  disableInfoNotifications    Boolean
  disableWarningNotifications Boolean
  disablePopups               Boolean
  updatedAt                   DateTime
}
```

## API Endpoints

### Duyurular
- `GET /api/announcements` - Kullanıcıya özel duyuruları getir
- `GET /api/announcements?showAll=true` - Tüm duyuruları getir (Admin)
- `POST /api/announcements` - Yeni duyuru oluştur (Admin)
- `PATCH /api/announcements/[id]` - Duyuru güncelle (Admin)
- `DELETE /api/announcements/[id]` - Duyuru sil (Admin)

### Okunma Takibi
- `POST /api/announcements/[id]/read` - Duyuruyu okundu işaretle
- `GET /api/announcements/[id]/read` - Okunma raporunu getir (Admin)

### Bildirim Tercihleri
- `GET /api/notifications/preferences` - Kullanıcı tercihlerini getir
- `PATCH /api/notifications/preferences` - Kullanıcı tercihlerini güncelle

### Diğer
- `GET /api/admin/sites` - Tüm siteleri listele (Admin)
- `GET /api/admin/departments?siteId=[id]` - Belirli site birimlerini listele (Admin)

## Kullanım Akışı

### Yönetici (Admin) İşlemleri

1. **Duyuru Oluşturma:**
   - `/admin/announcements` sayfasına git
   - "Yeni Duyuru" butonuna tıkla
   - Başlık ve içerik gir
   - Önem seviyesi seç (Bilgi/Uyarı/Kritik)
   - Hedef kitle seç
   - Gerekirse site/birim/rol seç
   - Popup olarak gösterilsin mi? (checkbox)
   - Gösterim modu seç
   - Aktif günleri seç (isteğe bağlı)
   - Son geçerlilik tarihi belirle (isteğe bağlı)
   - "Oluştur" butonuna tıkla

2. **Okunma Raporu Görüntüleme:**
   - Duyuru listesinde ilgili duyurunun yanındaki grafik ikonuna tıkla
   - İstatistikleri ve detayları görüntüle
   - Okuyan/okumayan kullanıcı listelerini incele

3. **Duyuru Düzenleme:**
   - Duyuru listesinde kalem ikonuna tıkla
   - Gerekli değişiklikleri yap
   - "Güncelle" butonuna tıkla

4. **Duyuru Silme:**
   - Duyuru listesinde çöp kutusu ikonuna tıkla
   - Onaylama mesajını onayla

### Kullanıcı İşlemleri

1. **Duyuru Görüntüleme:**
   - Ana sayfaya giriş yap
   - Popup duyuru varsa otomatik açılır
   - "Okudum" butonuna tıklayarak okundu işaretle
   - Veya "Kapat" ile kapat

2. **Bildirim Tercihlerini Ayarlama:**
   - Ana sayfa → Ayarlar → Bildirimler → Ayarlar sekmesi
   - İstediğin bildirim türlerini aç/kapat
   - Tercihler otomatik kaydedilir
   - **Not:** Kritik duyurular her zaman gösterilir

## Güvenlik Özellikleri

- ✅ Tüm API endpoint'leri kimlik doğrulama gerektirir
- ✅ Admin işlemleri rol kontrolü ile korunur
- ✅ Kullanıcılar sadece kendilerine hedeflenmiş duyuruları görür
- ✅ Kritik duyurular kullanıcı tercihleriyle kapatılamaz
- ✅ Okunma kayıtları kullanıcı bazlı takip edilir

## Frontend Entegrasyonu

### Ana Sayfa (app/page.tsx)
```tsx
import { AnnouncementPopup } from "@/components/dashboard/announcement-popup"

// Component içinde
<AnnouncementPopup />
```

### Admin Navigation (components/admin/admin-nav.tsx)
Navigation'da "Announcements" linki otomatik eklendi.

### Ayarlar Paneli (components/dashboard/settings-panel.tsx)
Bildirim tercihleri sekmesi API ile entegre edildi.

## Geliştirme Notları

### Migration
Veritabanı migration'ı şu komutla çalıştırılmalı:
```bash
npx prisma db push
```

### Test Senaryoları

1. **Admin testi:**
   - Farklı önem seviyelerinde duyuru oluştur
   - Farklı hedef kitlelere duyuru gönder
   - Okunma raporlarını kontrol et

2. **Kullanıcı testi:**
   - Farklı rollerdeki kullanıcılarla giriş yap
   - Sadece hedeflenen duyuruları gördüğünü doğrula
   - Tercihleri değiştir ve etkilerini gözlemle
   - Kritik duyuruların her zaman göründüğünü doğrula

3. **Popup testi:**
   - Popup olarak işaretli duyuru oluştur
   - Ana sayfaya giriş yap
   - Popup'ın otomatik açıldığını doğrula
   - "Okudum" butonuna tıkla
   - Tekrar giriş yap, popup'ın açılmadığını doğrula (ONCE modu)

## Yapılan Değişiklikler

### Yeni Dosyalar
1. `prisma/schema.prisma` - Announcement, AnnouncementRead, UserNotificationPreference modelleri eklendi
2. `app/api/announcements/route.ts` - Duyuru CRUD API
3. `app/api/announcements/[id]/route.ts` - Duyuru güncelleme/silme API
4. `app/api/announcements/[id]/read/route.ts` - Okunma takibi API
5. `app/api/notifications/preferences/route.ts` - Bildirim tercihleri API
6. `app/api/admin/departments/route.ts` - Departman listesi API
7. `app/(dashboard)/admin/announcements/page.tsx` - Admin duyuru yönetim sayfası
8. `components/admin/announcements-management.tsx` - Duyuru yönetim bileşeni

### Güncellenen Dosyalar
1. `components/admin/admin-nav.tsx` - Announcements linki eklendi
2. `components/dashboard/announcement-popup.tsx` - API entegrasyonu yapıldı
3. `components/dashboard/settings-panel.tsx` - Bildirim tercihleri API'si entegre edildi
4. `prisma/schema.prisma` - Site ve Department modellerine ilişkiler eklendi

## Sonuç

✅ Tüm istenen özellikler başarıyla implement edildi:
- Yönetici paneli (Sayfa 445)
- Site/birim özel gönderim
- Popup özelliği
- Okunma geçmişi raporlama (Sayfa 508)
- Kullanıcı tercihleri (Sayfa 222)
- Frontend yapısı bozulmadan entegre edildi

Sistem production'a hazır ve test edilmeye hazır!

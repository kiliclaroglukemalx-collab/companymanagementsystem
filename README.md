# Company Management System

**🏢 Enterprise Organizasyon ve Performans Yönetim Sistemi**

## 📋 Özellikler

- ✅ **Multi-Tenant Architecture** (Site bazlı izolasyon)
- ✅ **Global Site Selection** (Merkezi site yönetimi, anında senkronizasyon)
- ✅ **Role-Based Access Control** (SUPER_ADMIN, ADMIN, MANAGER, STAFF)
- ✅ **Güvenlik & Audit** (IP kontrolü, 2FA, session yönetimi, security events)
- ✅ **Arena Şampiyonlar Ligi** (10 kategorili lig sistemi, otomatik sıralama)
- ✅ **Rating Core** (Kriter bazlı günlük puanlama sistemi)
- ✅ **Ay Sonu Şampiyonları** (Otomatik arşivleme, kutlama ekranı)
- ✅ **Türkçe UI** (Merkezi metin yönetimi)

## 🎯 Site Selector - Global State Management

**Yeni Özellik:** Merkezi site yönetimi ile tüm bileşenlerde anında senkronizasyon.

### Ana Özellikler
- **Merkezi Durum:** React Context API ile global site yönetimi
- **Anında Güncelleme:** Site değiştiğinde tüm modüller otomatik güncellenir
- **Veri İzolasyonu:** Her site kendi bloğunda bağımsız çalışır
- **Tıklanabilir Analitikler:** 5 ana analitik kart detaylı görünüm sunar

### Etkilenen Bölümler
1. **Analitik Modüller** - Site bazlı finansal, bonus, spor, casino, oyuncu analizi
2. **Canlı Veri Akışı** - Site özel ticker verileri
3. **Personel Merkezi** - Site bazlı personel ve departman yönetimi
4. **Mesai Takvimi** - Site özel vardiya sistemleri
5. **Para Nasıl Akıyor?** - Tüm siteler için toplam (site seçiminden bağımsız)

### Kullanım
```typescript
import { useSite } from '@/lib/site-context'

function MyComponent() {
  const { selectedSite, setSelectedSite, isLoading } = useSite()
  return <div>{selectedSite.name}</div>
}
```

### Dokümantasyon
- `SITE_SELECTOR_IMPLEMENTATION.md` - Detaylı teknik dokümantasyon
- `IMPLEMENTATION_SUMMARY.md` - Tamamlanma özeti
- `QUICK_REFERENCE_GUIDE.md` - Hızlı başvuru kılavuzu

---

## 🚀 Teknoloji Stack

- **Framework:** Next.js 16 (App Router, Server Actions)
- **Database:** PostgreSQL (Vercel Postgres)
- **ORM:** Prisma
- **Auth:** Custom JWT + Session
- **UI:** shadcn/ui + Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel

## Gereksinimler
- Node.js 18+
- PostgreSQL (Vercel Postgres / Neon)

## Kurulum
```bash
npm install
npx prisma generate
npx prisma migrate deploy  # Production
# VEYA
npx prisma db push        # Development
npx prisma db seed
```

## Ortam Degiskenleri
```bash
DATABASE_URL="postgresql://..."
AUTH_SECRET_KEY="super-secret"
DEFAULT_ADMIN_EMAIL="admin@company.com"
DEFAULT_ADMIN_NAME="Super Admin"
DEFAULT_SITE_NAME="Default Site"
DEFAULT_DEPARTMENT_NAME="General"

# Opsiyonel (legacy /api/login icin)
DEFAULT_ADMIN_EMAIL="admin@company.com"
```

## Ilk Admin Kullanici
Seed ile otomatik olusur:
```bash
npx prisma db seed
```
Komut sonunda gecici sifre terminale yazilir.

## 🛣️ Route'lar

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/first-password` - İlk şifre değiştirme

### User Profile
- `GET /api/me` - Profil bilgileri
- `PATCH /api/me/avatar` - Avatar yükleme
- `POST /api/me/change-password` - Şifre değiştirme
- `GET /api/me/sessions` - Aktif session'lar
- `DELETE /api/me/sessions/others` - Diğer session'ları sonlandır
- `POST /api/me/2fa` - 2FA enable/disable

### Admin Panel
- `/admin` - Ana panel
- `/admin/users` - Kullanıcı yönetimi
- `/admin/users/new` - Yeni kullanıcı
- `/admin/users/[id]` - Kullanıcı detay/düzenle
- `/admin/sites` - Site yönetimi
- `/admin/departments` - Departman yönetimi
- `/admin/criteria` - Genel kriter yönetimi (eski)
- `/admin/rating-criteria` - Değerlendirme kriterleri (yeni)
- `/admin/sessions` - Session yönetimi
- `/admin/security-events` - Güvenlik olayları
- `/admin/security-events/[id]` - Olay detayı

### Arena
- `/arena` - Şampiyonlar Ligi (10 kategorili sıralama)
- `/arena/rate` - Günlük puanlama (00:00-17:00)
- `/arena/champions` - Ay sonu şampiyonlar arşivi

## Guvenlik Notlari
- Session cookie: HttpOnly + SameSite=Strict
- JWT icinde `sid`, `siteId`, `role` tasinir
- API isteklerinde session dogrulama + DB session kontrolu
- IP conflict kurali (trusted_ips disi bloklanir)
- Rate limit (login + first-password): bellek ici limit
- IP kaynagi: `x-forwarded-for` header
- Device fingerprint: `x-device-fingerprint` header (SHA256)

## 🎯 Arena Şampiyonlar Ligi

**PDF'e %100 sadık full implementasyon.**

### Özellikler
- ✅ 10 kategori lig sistemi (Üstat → Demir)
- ✅ Yüzdelik dilim hesaplama (%1, %1-5, %5-10, vb.)
- ✅ 4 ayrı personel tipi ligi (Personel, Admin, Birim Müdürü, Genel Müdür)
- ✅ Günlük puanlama → Aylık kümülatif puan
- ✅ Otomatik kategori yerleştirme
- ✅ Gerçek zamanlı sıralama
- ✅ Renkli kategori kartları (gradient)
- ✅ Top 3 gösterimi (🥇🥈🥉)
- ✅ Ay sonu otomatik arşivleme
- ✅ Şampiyonlar kutlama ekranı

### Puanlama Kuralları
- **Zaman:** Sadece 00:00-17:00 arası (İstanbul saati)
- **Kümülatif:** Her puanlama aylık toplama eklenir
- **Otomatik:** Her puanlama sonrası lig güncellemesi
- **Ay Sonu:** Otomatik arşivleme + yeni ay sıfırlama

### Ay Sonu Sistemi
```bash
# Manuel arşivleme
node scripts/archive-monthly-champions.js

# Cron Job (Her ay 1. gün 00:00)
0 0 1 * * node /path/to/scripts/archive-monthly-champions.js
```

Detaylı dokümantasyon: `docs/ARENA-LEAGUE-SYSTEM.md`

---

## 🎯 Rating Core (Günlük Puanlama)

**PDF'e sadık kalarak implement edildi.**

### Özellikler
- ✅ Departman bazlı değerlendirme kriterleri
- ✅ Günlük puanlama (1-10 slider)
- ✅ Aynı gün aynı kişi 2 kere puanlanamaz
- ✅ Kendini puanlama engellendi
- ✅ Progress tracking (%0-%100)
- ✅ Arena event entegrasyonu (RATING_GIVEN, RATING_PROGRESS)
- ✅ Multi-tenant güvenlik

### Kullanım
1. **Admin olarak kriter tanımla:**
   - `/admin/rating-criteria` → Departman seç → Kriter ekle
2. **Kullanıcı olarak puan ver:**
   - `/arena/rate` → Personel seç → Puanla
3. **Live Feed'de takip et:**
   - `/arena` → Son puanlamalar ve ilerleme

### Dokümantasyon
- `docs/RATING-CORE-IMPLEMENTATION.md` - Teknik detaylar
- `docs/RATING-DEPLOYMENT-GUIDE.md` - Deployment rehberi
- `docs/ARENA-LIVE-FEED.md` - Arena entegrasyonu

## 📊 Demo Data
```bash
# Development/Test için (Production'da ASLA çalıştırma!)
node scripts/seed-arena-events.js    # Arena event'leri
node scripts/seed-rating-demo.js     # Rating demo data
```

## 🔐 Roller ve Yetkiler

| Feature | SUPER_ADMIN | ADMIN | MANAGER | STAFF |
|---------|-------------|-------|---------|-------|
| Tüm siteleri gör | ✅ | ❌ | ❌ | ❌ |
| Kullanıcı yönetimi | ✅ | ✅ (kendi sitesi) | ❌ | ❌ |
| Kriter yönetimi | ✅ | ✅ (kendi sitesi) | ❌ | ❌ |
| Puanlama yapma | ✅ | ✅ | ✅ | ✅ |
| Arena görüntüleme | ✅ | ✅ | ✅ | ✅ |

## 🌐 Başlatma
```bash
npm run dev
```

## 🚀 Production Deploy
```bash
npm run build
git push origin main
# Vercel otomatik deploy eder
```

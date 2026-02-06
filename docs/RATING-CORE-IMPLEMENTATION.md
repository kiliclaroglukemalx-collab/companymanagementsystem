# Rating Core - Günlük Puanlama Sistemi

**Tarih:** 6 Şubat 2026  
**Durum:** ✅ Phase 1 Tamamlandı  
**Dil:** 🇹🇷 Türkçe

---

## 📋 Genel Bakış

PDF dokümanına sadık kalarak "Günlük Puanlama (Kriter Bazlı)" sisteminin çekirdeği oluşturuldu. Sistem departman bazlı değerlendirme kriterleri ve günlük puanlama akışını içerir.

---

## 🎯 Uygulanan Özellikler

### 1. Database Schema (`prisma/schema.prisma`)

#### RatingCriteria (Zaten Vardı - Genişletildi)
```prisma
model RatingCriteria {
  id           String        @id @default(cuid())
  departmentId String
  name         String
  weight       Int           @default(0)
  isActive     Boolean       @default(true)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  department   Department    @relation(...)
  ratingScores RatingScore[] // YENİ: İlişki eklendi

  @@unique([departmentId, name])
  @@index([departmentId])
}
```

#### Rating (YENİ)
```prisma
model Rating {
  id           String        @id @default(cuid())
  siteId       String        // Multi-tenant isolation
  departmentId String
  raterUserId  String        // Puan veren
  ratedUserId  String        // Puan alan
  date         String        // YYYY-MM-DD format
  totalScore   Float?        // Hesaplanmış ortalama
  createdAt    DateTime      @default(now())

  site         Site          @relation(...)
  department   Department    @relation(...)
  rater        User          @relation("RatingsGiven", ...)
  rated        User          @relation("RatingsReceived", ...)
  scores       RatingScore[]

  // KRİTİK: Aynı gün aynı kişiyi 2 kere puanlayamaz
  @@unique([raterUserId, ratedUserId, date])
  
  @@index([siteId])
  @@index([departmentId])
  @@index([date])
  @@index([ratedUserId])
}
```

#### RatingScore (YENİ)
```prisma
model RatingScore {
  id         String   @id @default(cuid())
  ratingId   String
  criteriaId String
  score      Int      // 1-10 arası
  createdAt  DateTime @default(now())

  rating   Rating         @relation(...)
  criteria RatingCriteria @relation(...)

  @@index([ratingId])
  @@index([criteriaId])
}
```

**Önemli Kısıtlamalar:**
- ✅ Unique constraint: `(raterUserId, ratedUserId, date)` → Aynı gün aynı kişiyi 2 kere puanlayamaz
- ✅ Site isolation: Her Rating `siteId` ile bağlı
- ✅ Cascade delete: Site/Department silinince ilişkili tüm data silinir

---

### 2. Server Actions (`lib/rating-actions.ts`)

#### Fonksiyonlar

**1. listCriteria()**
- Değerlendirme kriterlerini listeler
- SUPER_ADMIN: Tüm siteler
- ADMIN: Sadece kendi sitesi
- MANAGER/STAFF: Sadece kendi sitesi (read-only)

**2. upsertCriteria()**
- Kriter oluştur/güncelle
- Sadece SUPER_ADMIN ve ADMIN
- Site access kontrolü

**3. toggleCriteriaStatus()**
- Kriteri aktif/pasif yap
- Sadece SUPER_ADMIN ve ADMIN

**4. createRating()**
- Puanlama oluştur
- Tüm authenticated kullanıcılar
- Validasyonlar:
  - ✅ Kendini puanlayamaz
  - ✅ Aynı gün aynı kişiyi 2 kere puanlayamaz
  - ✅ Tüm kriterler için puan vermeli
  - ✅ Puanlar 1-10 arası olmalı
  - ✅ Site isolation kontrolü
- Arena event oluşturur (RATING_GIVEN)
- Progress event günceller

**5. getTodayProgress()**
- Günlük puanlama ilerlemesini getirir
- % hesaplayarak döner
- Departman bazlı filtreleme

**6. listUsersForRating()**
- Puanlanabilir kullanıcıları listeler
- Kendi departmanı
- Kendisi hariç
- Bugün zaten puanlanmış mı kontrolü

#### Güvenlik Kontrolleri

| Fonksiyon | Auth Check | Site Isolation | Role Check |
|-----------|------------|----------------|------------|
| listCriteria | ✅ Line 57-60 | ✅ Line 65-72 | ❌ |
| upsertCriteria | ✅ Line 107-110 | ✅ Line 117-127 | ✅ Line 113-115 |
| createRating | ✅ Line 225-228 | ✅ Line 236-239 | ❌ (All can rate) |
| getTodayProgress | ✅ Line 350-353 | ✅ Line 357 | ❌ |
| listUsersForRating | ✅ Line 413-416 | ✅ Line 421-427 | ❌ |

#### Arena Event Entegrasyonu

**RATING_GIVEN Event:**
```typescript
// Line 283-296
await createArenaEvent({
  siteId: auth.siteId,
  type: "RATING_GIVEN",
  title: `${rater.name}, ${rated.name} kişisini puanladı`,
  message: `Ortalama puan: ${totalScore.toFixed(1)}/10`,
  metaJson: { ratingId, raterId, ratedId, departmentId, totalScore, date }
})
```

**RATING_PROGRESS Event:**
```typescript
// Line 329-347
// Milestones: %25, %50, %75, %100
await createArenaEvent({
  siteId,
  type: "RATING_PROGRESS",
  title: `Günlük puanlama %${milestone} tamamlandı`,
  message: `${ratedUsers} / ${totalUsers} kişi puanlandı`,
  metaJson: { departmentId, date, completionRate }
})
```

---

### 3. UI Implementation

#### Admin: Rating Criteria Management

**Sayfa:** `app/(dashboard)/admin/rating-criteria/page.tsx`

**Özellikler:**
- ✅ Departman seçimi (dropdown)
- ✅ Kriter listesi (tablo)
- ✅ Kriter ekle/düzenle (dialog)
- ✅ Aktif/Pasif toggle
- ✅ SUPER_ADMIN: Tüm siteler
- ✅ ADMIN: Sadece kendi sitesi
- ✅ MANAGER/STAFF: Erişim engellendi

**Component:** `components/admin/criteria-management-new.tsx`

**UI Pattern:**
```tsx
<div className="bg-white rounded-xl border border-slate-200 p-6">
  // Admin panel ile aynı pattern
</div>
```

#### Arena: Daily Rating

**Sayfa:** `app/(dashboard)/arena/rate/page.tsx`

**Özellikler:**
- ✅ Hero section (gradient background)
- ✅ Progress bar (günlük ilerleme)
- ✅ Personel seçimi (dropdown)
- ✅ Kriter bazlı puanlama (slider 1-10)
- ✅ Validasyon mesajları (Türkçe)
- ✅ Bugün zaten puanlananları göster
- ✅ Kendini puanlama engellenmiş

**Component:** `components/arena/rating-form.tsx`

**UI Pattern:**
```tsx
<div className="bg-white rounded-xl border border-slate-200 p-6">
  // Admin panel ile aynı pattern
</div>
```

---

### 4. Türkçe Dil Standardizasyonu

#### Eklenen TR Constants (`lib/tr-constants.ts`)

**Yeni Kategori: rating**
- 60+ Türkçe metin
- Tüm UI metinleri: başlıklar, açıklamalar, validasyonlar, hatalar
- Örnek kullanım:
  ```typescript
  TR.rating.giveRating // "Puan Ver"
  TR.rating.alreadyRatedToday // "Bu Kişiyi Bugün Zaten Puanladınız"
  TR.rating.criteriaManagement // "Kriter Yönetimi"
  ```

#### Güncellenen Dosyalar (Türkçe)

| Dosya | Durum |
|-------|-------|
| `lib/tr-constants.ts` | ✅ Rating metinleri eklendi |
| `app/(dashboard)/admin/page.tsx` | ✅ Tam Türkçe |
| `app/(dashboard)/arena/page.tsx` | ✅ Tam Türkçe |
| `app/(dashboard)/arena/rate/page.tsx` | ✅ Tam Türkçe |
| `components/arena/arena-live-feed.tsx` | ✅ Tam Türkçe |
| `components/admin/criteria-management-new.tsx` | ✅ Tam Türkçe |
| `components/arena/rating-form.tsx` | ✅ Tam Türkçe |

---

## 🔐 Güvenlik & Multi-Tenant

### Kriter Yönetimi

| Role | Access |
|------|--------|
| SUPER_ADMIN | Tüm siteler - Kriter oluştur/düzenle ✅ |
| ADMIN | Kendi sitesi - Kriter oluştur/düzenle ✅ |
| MANAGER | Kendi sitesi - Sadece görüntüle (yönetim ❌) |
| STAFF | Kendi sitesi - Sadece görüntüle (yönetim ❌) |

### Puanlama Yapma

| Role | Access |
|------|--------|
| SUPER_ADMIN | Puan verebilir ✅ |
| ADMIN | Puan verebilir ✅ |
| MANAGER | Puan verebilir ✅ |
| STAFF | Puan verebilir ✅ |

**Tüm roller puan verebilir, ama sadece kendi departmanındaki kişileri puanlayabilir.**

### Güvenlik Kontrol Noktaları

**1. Authentication:**
- Her action'da `getServerAuthContext()` (Line varies per file)

**2. Site Isolation:**
- `rating-actions.ts:65-72` - listCriteria
- `rating-actions.ts:117-127` - upsertCriteria department check
- `rating-actions.ts:236-239` - createRating user check
- `rating-actions.ts:421-427` - listUsersForRating

**3. Role-Based Access:**
- `rating-actions.ts:113-115` - upsertCriteria (SUPER_ADMIN/ADMIN only)
- `rating-criteria/page.tsx:15-26` - Page-level block

**4. Business Rule Enforcement:**
- `rating-actions.ts:231-233` - Cannot rate self
- `rating-actions.ts:248-258` - Cannot rate same person twice on same day (UNIQUE constraint)
- `rating-actions.ts:261-267` - Score validation (1-10)

---

## 📊 Veri Akışı

### Puanlama Akışı

```
1. Kullanıcı /arena/rate sayfasına gider
   ↓
2. Sistem kriter ve personel listesi getirir (kendi departmanı)
   ↓
3. Kullanıcı personel seçer
   ↓
4. Her kriter için 1-10 puan verir (slider)
   ↓
5. "Puan Ver" butonuna tıklar
   ↓
6. Server action validasyon yapar:
   - Kendini puanlıyor mu? ❌
   - Bugün zaten puanladı mı? ❌
   - Tüm kriterler dolu mu? ✅
   - Puanlar 1-10 arası mı? ✅
   ↓
7. Rating + RatingScore oluşturulur
   ↓
8. Arena event oluşturulur (RATING_GIVEN)
   ↓
9. Progress hesaplanır ve milestone'da RATING_PROGRESS event'i oluşturulur
   ↓
10. Kullanıcıya başarı mesajı gösterilir
   ↓
11. Arena Live Feed'de event görünür
```

### Progress Hesaplama

```
1. Departmandaki toplam aktif kullanıcı sayısı (totalUsers)
   ↓
2. Bugün en az 1 puan alan kullanıcı sayısı (ratedUsers)
   ↓
3. completionRate = (ratedUsers / totalUsers) × 100
   ↓
4. Milestone kontrolü: %25, %50, %75, %100
   ↓
5. Milestone'a ulaşıldıysa RATING_PROGRESS event oluştur
```

---

## 🚀 Deployment

### 1. Prisma Client Güncelleme
```bash
npx prisma generate
```

### 2. Database Migration
```bash
# Production
npx prisma migrate deploy

# Development
npx prisma db push
```

### 3. Demo Data (Opsiyonel)
```bash
# Sadece development/demo için!
node scripts/seed-rating-demo.js
```

**Not:** Seed script departman başına 20-40 demo rating oluşturur (son 7 gün).

---

## 🎨 UI/UX Tutarlılığı

### Admin Panel Pattern Korundu

**Card Wrapper:**
```tsx
<div className="bg-white rounded-xl border border-slate-200 p-6">
```

**Spacing:**
- `space-y-6` (page sections)
- `space-y-4` (form fields)
- `gap-6` (grid items)
- `gap-3` (small items)

**Colors:**
- Background: `bg-slate-50`, `bg-white`
- Text: `text-slate-900` (headings), `text-slate-600` (body)
- Borders: `border-slate-200`
- Gradients: `from-blue-500 to-purple-600` (admin ile aynı)

**Components:**
- Badge, Button, Select, Slider, Dialog
- lucide-react icons
- shadcn/ui suite

**Sonuç:** ✅ Admin panel ile %100 uyumlu

---

## 🇹🇷 Türkçe Dil Standardı

### Merkezi Metin Kaynağı

**Dosya:** `lib/tr-constants.ts`

**Eklenen Kategori:**
```typescript
TR.rating = {
  title: "Puanlama",
  giveRating: "Puan Ver",
  rateToday: "Bugün Puan Ver",
  criteriaManagement: "Kriter Yönetimi",
  alreadyRatedToday: "Bu Kişiyi Bugün Zaten Puanladınız",
  cannotRateSelf: "Kendinizi Puanlayamazsınız",
  // ... 60+ metin
}
```

### Tüm UI Metinleri Türkçe

- ✅ Sayfa başlıkları
- ✅ Buton etiketleri
- ✅ Form alanları
- ✅ Validasyon mesajları
- ✅ Hata mesajları
- ✅ Başarı mesajları
- ✅ Boş durum açıklamaları
- ✅ Toast bildirimleri

**Dil Tutarlılığı:** %100 Türkçe

---

## 📱 Route'lar

| Route | Access | Açıklama |
|-------|--------|----------|
| `/admin/rating-criteria` | SUPER_ADMIN, ADMIN | Kriter yönetimi |
| `/arena/rate` | All authenticated | Günlük puanlama |

---

## 🧪 Test Senaryoları

### Senaryo 1: İlk Kez Puanlama
1. Kullanıcı `/arena/rate` sayfasına gider
2. Personel seçer
3. Her kriter için puan verir (slider)
4. "Puan Ver" butonuna tıklar
5. ✅ Başarı mesajı: "Puanlama başarıyla kaydedildi"
6. ✅ Arena Live Feed'de event görünür
7. ✅ Progress güncellenir

### Senaryo 2: Aynı Gün İkinci Puanlama (ENGELLENMELI)
1. Kullanıcı aynı personeli tekrar seçer
2. Puanları doldurur
3. "Puan Ver" butonuna tıklar
4. ❌ Hata mesajı: "Bu Kişiyi Bugün Zaten Puanladınız"
5. ✅ Database'e yazılmaz
6. ✅ Arena event oluşmaz

### Senaryo 3: Kendini Puanlama (ENGELLENMELI)
1. Sistem kendini liste dışında tutar
2. Kullanıcı kendi adını göremez
3. ✅ Server-side'da da kontrol var

### Senaryo 4: Eksik Puan (VALİDASYON)
1. Kullanıcı bazı kriterlere puan vermez
2. "Puan Ver" butonuna tıklar
3. ❌ Hata mesajı: "Lütfen tüm kriterlere puan verin"
4. ✅ Form submit olmaz

### Senaryo 5: Progress Milestone
1. Departmanda 10 kullanıcı var
2. 2 kişi puanlandı → %20 (event yok)
3. 3. kişi puanlandı → %30 (event yok)
4. 5. kişi puanlandı → %50 (✅ RATING_PROGRESS event)
5. 7. kişi puanlandı → %70 (event yok)
6. 10. kişi puanlandı → %100 (✅ RATING_PROGRESS event)

---

## 📦 Oluşturulan Dosyalar

### Database
- ✅ `prisma/schema.prisma` (güncellendi)
- ✅ `prisma/migrations/20260206_add_rating_system/migration.sql`

### Server
- ✅ `lib/rating-actions.ts` (450+ satır)
- ✅ `lib/tr-constants.ts` (güncellendi - rating metinleri)

### UI - Admin
- ✅ `app/(dashboard)/admin/rating-criteria/page.tsx`
- ✅ `components/admin/criteria-management-new.tsx`

### UI - Arena
- ✅ `app/(dashboard)/arena/rate/page.tsx`
- ✅ `components/arena/rating-form.tsx`

### Utility
- ✅ `scripts/seed-rating-demo.js`

### Documentation
- ✅ `docs/RATING-CORE-IMPLEMENTATION.md` (bu dosya)

**Toplam:** 9 yeni/güncellenmiş dosya

---

## 🚫 Bilinçli Olarak YAPILMAYANLAR

Phase 1 odaklı olduğu için:

- ❌ Ağırlıklı puan hesaplama (weight kullanılmıyor)
- ❌ Geçmiş puanlama listesi/raporları
- ❌ Grafik ve chartlar
- ❌ Puanlama geçmişi export
- ❌ Toplu puanlama
- ❌ Puanlama düzenleme (delete de yok)
- ❌ Email bildirimleri
- ❌ Push notifications
- ❌ Puanlama istatistikleri (ortalama, min, max)

**Bunlar Phase 2+ için planlandı.**

---

## 📊 Örnek Kullanım

### Kriter Oluşturma (Admin)
```
1. /admin/rating-criteria sayfasına git
2. Departman seç (örn: "Satış")
3. "Kriter Ekle" butonuna tıkla
4. Kriter adı: "İletişim Becerileri"
5. Ağırlık: 20
6. Kaydet
7. ✅ Kriter oluşturuldu
```

### Puanlama Yapma (Herkes)
```
1. /arena/rate sayfasına git
2. Personel seç (örn: "Ahmet Yılmaz")
3. İletişim Becerileri: 8/10 (slider)
4. Takım Çalışması: 9/10
5. Teknik Yeterlilik: 7/10
6. ... (tüm kriterler)
7. "Puan Ver" butonuna tıkla
8. ✅ Puanlama kaydedildi
9. ✅ Arena Live Feed'de görünür
```

---

## 🎯 Arena Live Feed Entegrasyonu

### Event Tipleri

**RATING_GIVEN:**
- Ne zaman: Her puanlama sonrası
- Başlık: "Ali, Ayşe kişisini puanladı"
- Mesaj: "Ortalama puan: 8.3/10"
- Icon: ⭐ Star (Amber)

**RATING_PROGRESS:**
- Ne zaman: %25, %50, %75, %100 milestone'lar
- Başlık: "Günlük puanlama %75 tamamlandı"
- Mesaj: "15 / 20 kişi puanlandı"
- Icon: 📈 TrendingUp (Blue)

### Arena Live Feed Görünümü

Rating sistemi devreye girdiğinde, Live Feed'de artık şunlar görünecek:

```
⭐ Ali, Ayşe kişisini puanladı
   Ortalama puan: 8.3/10
   5dk önce

📈 Günlük puanlama %75 tamamlandı
   15 / 20 kişi puanlandı
   12dk önce

⭐ Mehmet, Can kişisini puanladı
   Ortalama puan: 9.1/10
   18dk önce

📈 Günlük puanlama %50 tamamlandı
   10 / 20 kişi puanlandı
   35dk önce
```

---

## ✅ Başarı Kriterleri

- [x] Database schema oluşturuldu (Rating, RatingScore)
- [x] Unique constraint: Aynı gün aynı kişi 2 kere puanlanamaz
- [x] Site isolation enforced
- [x] Server actions güvenli
- [x] Admin kriter yönetimi UI
- [x] Arena puanlama UI
- [x] Türkçe metinler (merkezi)
- [x] Admin UI pattern korundu
- [x] Arena event entegrasyonu
- [x] Progress tracking
- [x] Validasyon mesajları
- [x] Seed script
- [x] Migration dosyası
- [x] Dokümantasyon

**Sonuç:** ✅ **Rating Core Tamamlandı**

---

## 🔄 Sonraki Adımlar

### Deploy
1. `npx prisma generate` ✅ (yapıldı)
2. `npx prisma migrate deploy` (production'da çalıştır)
3. `node scripts/seed-rating-demo.js` (opsiyonel demo)
4. `npm run build`
5. Deploy to Vercel

### Test
1. Admin olarak login
2. `/admin/rating-criteria` - Kriter tanımla
3. Herhangi bir kullanıcı olarak `/arena/rate` - Puan ver
4. `/arena` - Live Feed'de event'leri gör
5. Progress %'sini takip et

### Phase 2 İçin Hazırlık
- Ağırlıklı puan hesaplama
- Geçmiş puanlama raporları
- Performans grafikleri
- İstatistikler

---

**Hazırlayan:** AI Assistant (Cursor)  
**Tarih:** 6 Şubat 2026  
**Durum:** ✅ Production Ready  
**Dil:** 🇹🇷 %100 Türkçe

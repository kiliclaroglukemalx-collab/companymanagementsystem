# Master Panel - Quick Start Guide

## 🚀 Hızlı Başlangıç

### 1. Migration'ı Çalıştırın (Production)
```bash
# RatingCriteria modelini database'e ekle
npx prisma migrate deploy

# Prisma client'ı güncelle (zaten yapıldı)
npx prisma generate
```

### 2. İlk Erişim
1. SUPER_ADMIN kullanıcısı ile login olun (seed'den oluşturulan)
2. URL'e `/admin` ekleyin: `http://localhost:3000/admin`
3. Master Panel Dashboard'a yönlendirileceksiniz

### 3. İlk Kurulum Adımları

#### Adım 1: Site Oluşturun
```
/admin/sites → "Create Site"
Örnek: "Merkez Ofis", "İstanbul Şube"
```

#### Adım 2: Department Oluşturun
```
/admin/departments → "Create Department"
Örnek: 
- Site: "Merkez Ofis", Department: "Müşteri Hizmetleri"
- Site: "Merkez Ofis", Department: "Satış"
```

#### Adım 3: Kullanıcı Ekleyin
```
/admin/users → "Create User"
- Name: "Ahmet Yılmaz"
- Email: "ahmet@example.com"
- Site: "Merkez Ofis"
- Department: "Müşteri Hizmetleri"
- Role: "ADMIN"

⚠️ Geçici şifreyi mutlaka kaydedin!
```

#### Adım 4: Rating Criteria Tanımlayın
```
/admin/criteria → "Create Criteria"
Department: "Müşteri Hizmetleri"
- "Hız" - Weight: 30
- "Doğruluk" - Weight: 30
- "İletişim" - Weight: 40
```

## 🔐 Rol Bazlı Erişim

### SUPER_ADMIN Yetenekleri
✅ Tüm modüllere erişim
✅ Site & Department CRUD
✅ Tüm sitelerdeki kullanıcıları yönetme
✅ Rating criteria tanımlama
✅ Tüm rolleri atayabilme

### ADMIN Yetenekleri
✅ Sadece kendi sitesindeki kullanıcıları görme
✅ Kendi sitesine kullanıcı ekleme
✅ MANAGER ve STAFF rolleri atayabilme
❌ Site/Department oluşturamaz
❌ SUPER_ADMIN/ADMIN rolü atayamaz
❌ Rating criteria yönetemez

## 📁 Dosya Yapısı

```
app/
└── (dashboard)/
    └── admin/
        ├── layout.tsx              # Auth + navigation wrapper
        ├── page.tsx                # Dashboard
        ├── sites/
        │   └── page.tsx            # Site management
        ├── departments/
        │   └── page.tsx            # Department management
        ├── users/
        │   └── page.tsx            # User management
        └── criteria/
            └── page.tsx            # Criteria management

components/
└── admin/
    ├── admin-nav.tsx               # Navigation component
    ├── sites-management.tsx        # Site CRUD
    ├── departments-management.tsx  # Department CRUD
    ├── users-management.tsx        # User CRUD
    └── criteria-management.tsx     # Criteria CRUD

lib/
├── server-auth.ts                  # Server-side auth helpers
└── admin-actions.ts                # All server actions

prisma/
├── schema.prisma                   # RatingCriteria modeli eklendi
└── migrations/
    └── 20260206131203_add_rating_criteria/
        └── migration.sql
```

## 🧪 Test Senaryoları

### Test 1: SUPER_ADMIN Full Access
```bash
1. Login as SUPER_ADMIN
2. /admin → Dashboard'da tüm istatistikleri gör
3. /admin/sites → Yeni site oluştur
4. /admin/departments → Yeni department oluştur
5. /admin/users → Herhangi bir siteye kullanıcı ekle
6. /admin/criteria → Rating criteria tanımla
```

### Test 2: ADMIN Limited Access
```bash
1. Login as ADMIN (belirli bir site'ye ait)
2. /admin → Sadece kendi sitesinin istatistiklerini gör
3. /admin/sites → Erişim yok (404 veya forbidden)
4. /admin/departments → Erişim yok
5. /admin/users → Sadece kendi sitesindeki kullanıcıları gör
6. Yeni kullanıcı ekle → Sadece kendi sitesine ekleyebilir
7. Role seçimi → SUPER_ADMIN/ADMIN seçenekleri yok
```

### Test 3: Data Validation
```bash
1. Duplicate site name → Hata mesajı göster
2. Empty field submit → Validation error
3. Invalid weight (>100) → Hata mesajı
4. Duplicate email → Hata mesajı
```

## 🔧 Troubleshooting

### Migration Hatası
```bash
# Database connection hatası alırsanız:
1. .env.local dosyasında DATABASE_URL kontrol edin
2. Network erişimi olduğundan emin olun
3. Migration'ı manuel çalıştırın:
   npx prisma migrate deploy
```

### Auth Hatası
```bash
# Unauthorized hatası alırsanız:
1. Session cookie'sini kontrol edin
2. Logout/login yapın
3. Browser cache'i temizleyin
```

### Build Hatası
```bash
# Type errors alırsanız:
npm install --save-dev @types/bcrypt
npx prisma generate
npm run build
```

## 📊 API Endpoints (Server Actions)

Tüm işlemler server actions üzerinden yapılır, REST API yok:

```typescript
// Sites
createSite(data)
updateSite(id, data)
deleteSite(id)
listSites()

// Departments
createDepartment(data)
updateDepartment(id, data)
deleteDepartment(id)
listDepartments(siteId?)

// Users
createUser(data)
updateUser(id, data)
toggleUserActive(id, isActive)
listUsers(filters?)

// Rating Criteria
createRatingCriteria(data)
updateRatingCriteria(id, data)
deleteRatingCriteria(id)
listRatingCriteria(departmentId?)
```

## 🎨 UI Components Kullanımı

Tüm UI component'leri shadcn/ui tabanlı:
- Button
- Input
- Select
- Dialog
- AlertDialog
- Badge
- Switch
- Toast (Sonner)

## 🚦 Deployment Checklist

- [x] Migration dosyası oluşturuldu
- [x] Prisma client generate edildi
- [x] Server actions implement edildi
- [x] Auth kontrolü tüm seviyelerde yapıldı
- [x] UI component'leri tamamlandı
- [x] Linter hataları temizlendi
- [x] Type safety sağlandı
- [ ] Production database'e migration deploy edildi
- [ ] İlk SUPER_ADMIN kullanıcısı oluşturuldu (seed)

## 📝 Next Steps

1. **Development:**
   ```bash
   npm run dev
   # Navigate to http://localhost:3000/admin
   ```

2. **Production Deploy:**
   ```bash
   # Migration'ı çalıştır
   npx prisma migrate deploy
   
   # Build
   npm run build
   
   # Start
   npm start
   ```

3. **İlk Kullanıcı:**
   - Seed script'i çalıştırarak ilk SUPER_ADMIN'i oluşturun
   - Geçici şifre console'da görünecek
   - İlk login'de şifre değiştirin

## 🎉 Hazır!

Master Panel artık kullanıma hazır. İyi çalışmalar!

Sorular için dokümantasyona bakın: `ADMIN_PANEL.md`

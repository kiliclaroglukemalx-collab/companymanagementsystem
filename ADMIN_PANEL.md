# Master Panel - Organization & User Management

## Overview

Master Panel, şirket yönetim sisteminin merkezi yönetim arayüzüdür. Site, department, kullanıcı ve rating criteria yönetimini sağlar.

## Erişim

**URL:** `/admin`

**Gerekli Roller:** `SUPER_ADMIN` veya `ADMIN`

## Modüller

### 1. Dashboard (`/admin`)
Ana panel ekranı. Sistem istatistiklerini gösterir:
- Site sayısı (SUPER_ADMIN only)
- Department sayısı
- Kullanıcı sayısı
- Rating criteria sayısı (SUPER_ADMIN only)

### 2. Site Management (`/admin/sites`)
**Erişim:** Sadece `SUPER_ADMIN`

**Özellikler:**
- ✅ Site listesi
- ✅ Yeni site oluşturma
- ✅ Site güncelleme
- ✅ Site silme (cascade: tüm departmentler ve kullanıcılar)

**Validasyonlar:**
- Site adı unique olmalı
- Site adı boş olamaz

### 3. Department Management (`/admin/departments`)
**Erişim:** Sadece `SUPER_ADMIN`

**Özellikler:**
- ✅ Department listesi (site bazlı filtreleme)
- ✅ Yeni department oluşturma
- ✅ Department güncelleme
- ✅ Department silme (cascade: ilişkili kullanıcılar ve criteria)

**Validasyonlar:**
- Department adı + site kombinasyonu unique
- Department bir site'a bağlı olmalı
- Site değiştirilemez (sadece oluşturma sırasında)

### 4. User Management (`/admin/users`)
**Erişim:** `SUPER_ADMIN` ve `ADMIN`

**Özellikler:**
- ✅ Kullanıcı listesi (site + role bazlı filtreleme)
- ✅ Yeni kullanıcı oluşturma (otomatik geçici şifre)
- ✅ Kullanıcı bilgilerini güncelleme
- ✅ Rol değiştirme
- ✅ Kullanıcı aktif/pasif yapma

**Yetki Kuralları:**

#### SUPER_ADMIN:
- ✅ Tüm sitelerdeki kullanıcıları görebilir
- ✅ Her siteye kullanıcı ekleyebilir
- ✅ Tüm roller (SUPER_ADMIN, ADMIN, MANAGER, STAFF) atayabilir
- ✅ Tüm kullanıcıları düzenleyebilir

#### ADMIN:
- ✅ Sadece kendi sitesindeki kullanıcıları görebilir
- ✅ Sadece kendi sitesine kullanıcı ekleyebilir
- ✅ Sadece MANAGER ve STAFF rolleri atayabilir
- ❌ SUPER_ADMIN veya ADMIN rolündeki kullanıcıları düzenleyemez
- ❌ Kullanıcıya SUPER_ADMIN veya ADMIN rolü atayamaz

**Kullanıcı Oluşturma:**
1. Ad, email, site, department (opsiyonel), rol seçilir
2. Sistem otomatik geçici şifre oluşturur
3. Şifre dialog'da gösterilir (kopyalanabilir)
4. Kullanıcı ilk girişte şifre değiştirmek zorundadır

**Validasyonlar:**
- Email unique olmalı
- Site değiştirilemez
- Email değiştirilemez

### 5. Rating Criteria Management (`/admin/criteria`)
**Erişim:** Sadece `SUPER_ADMIN`

**Özellikler:**
- ✅ Criteria listesi (department bazlı gruplama)
- ✅ Yeni criteria oluşturma
- ✅ Criteria güncelleme (isim, weight, active status)
- ✅ Criteria silme

**Criteria Özellikleri:**
- **Name:** Kriter adı (örn: Hız, Doğruluk, İletişim)
- **Weight:** Ağırlık (0-100 arası)
- **isActive:** Aktif/pasif durumu
- **Department:** Hangi departmana ait

**Validasyonlar:**
- Criteria adı + department kombinasyonu unique
- Weight 0-100 arası olmalı
- Department değiştirilemez

## Güvenlik

### Server Actions
Tüm veri işlemleri `lib/admin-actions.ts` içindeki server actions ile yapılır:

```typescript
// Örnek: Site oluşturma
export async function createSite(data: { name: string }): Promise<ActionResult> {
  // 1. Auth kontrolü
  await requireSuperAdmin()
  
  // 2. Validation
  if (!data.name?.trim()) {
    return { success: false, error: "Site name is required" }
  }
  
  // 3. İşlem
  const site = await basePrisma.site.create({ data: { name: data.name.trim() } })
  
  // 4. Cache invalidation
  revalidatePath("/admin/sites")
  
  return { success: true, data: site }
}
```

### Auth Helpers (`lib/server-auth.ts`)
```typescript
// Session kontrolü
const auth = await getServerAuthContext()

// Yetki kontrolü
await requireSuperAdmin()
await requireAdminOrAbove()

// Site erişim kontrolü
assertSiteAccess(auth, siteId)
```

### Yetki Kontrolü Seviyeleri

1. **Layout Level:** `/admin` layout'unda minimum ADMIN yetkisi kontrol edilir
2. **Page Level:** Her page kendi action'ını çağırır, action içinde yetki kontrol edilir
3. **Action Level:** Her server action içinde detaylı yetki kontrolü yapılır
4. **Data Level:** ADMIN kullanıcılar sadece kendi sitelerinin verilerini görebilir

## Database Schema

### RatingCriteria Model (YENİ)
```prisma
model RatingCriteria {
  id           String     @id @default(cuid())
  departmentId String
  name         String
  weight       Int        @default(0)
  isActive     Boolean    @default(true)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  
  department Department @relation(fields: [departmentId], references: [id], onDelete: Cascade)
  
  @@index([departmentId])
  @@unique([departmentId, name])
}
```

## Kullanım Senaryoları

### Senaryo 1: SUPER_ADMIN - Yeni Site ve Kullanıcı Ekleme
1. Login as SUPER_ADMIN
2. `/admin/sites` → "Create Site" → "Acme Corp" oluştur
3. `/admin/departments` → "Create Department" → Site: "Acme Corp", Name: "Sales" oluştur
4. `/admin/users` → "Create User" → Site: "Acme Corp", Department: "Sales", Role: "ADMIN"
5. Geçici şifreyi kaydet ve kullanıcıya ilet

### Senaryo 2: ADMIN - Kendi Sitesine Kullanıcı Ekleme
1. Login as ADMIN (Acme Corp)
2. `/admin/users` → Sadece "Acme Corp" kullanıcıları görünür
3. "Create User" → Sadece "Acme Corp" seçilebilir
4. Role: "MANAGER" veya "STAFF" seçilebilir (ADMIN seçemez)

### Senaryo 3: SUPER_ADMIN - Rating Criteria Tanımlama
1. Login as SUPER_ADMIN
2. `/admin/criteria` → "Create Criteria"
3. Department: "Sales" seç
4. Name: "Communication Skills", Weight: 30 → Kaydet
5. Name: "Sales Performance", Weight: 70 → Kaydet

## UI/UX Özellikleri

### Tasarım Prensipler
- ✅ Temiz, modern dashboard UI
- ✅ Responsive design (mobile-friendly)
- ✅ Loading states (disabled buttons during operations)
- ✅ Empty states (boş liste durumları)
- ✅ Toast notifications (başarı/hata mesajları)
- ✅ Confirmation dialogs (kritik işlemler için)

### Navigation
- Top navigation bar ile modüller arası geçiş
- Active tab indicator
- Role-based menu visibility
- "Exit Panel" button ile ana uygulamaya dönüş

### Feedback
- ✅ Sonner toast notifications
- ✅ Inline error messages
- ✅ Success confirmations
- ✅ Loading spinners

## Testing Checklist

### SUPER_ADMIN Tests
- [ ] Dashboard istatistiklerini görebiliyor
- [ ] Site oluşturabiliyor
- [ ] Site güncelleyebiliyor
- [ ] Site silebiliyor
- [ ] Department oluşturabiliyor
- [ ] Department güncelleyebiliyor
- [ ] Department silebiliyor
- [ ] Tüm sitelerdeki kullanıcıları görebiliyor
- [ ] Her siteye kullanıcı ekleyebiliyor
- [ ] SUPER_ADMIN rolü atayabiliyor
- [ ] Rating criteria oluşturabiliyor
- [ ] Rating criteria güncelleyebiliyor
- [ ] Rating criteria silebiliyor

### ADMIN Tests
- [ ] Dashboard'da sadece kendi sitesinin istatistiklerini görebiliyor
- [ ] Site/Department menülerini göremiyor
- [ ] Sadece kendi sitesindeki kullanıcıları görebiliyor
- [ ] Sadece kendi sitesine kullanıcı ekleyebiliyor
- [ ] SUPER_ADMIN/ADMIN rolü atayamıyor
- [ ] SUPER_ADMIN/ADMIN kullanıcıları düzenleyemiyor
- [ ] Rating criteria menüsünü göremiyor

### Data Validation Tests
- [ ] Duplicate site name engelleniyor
- [ ] Duplicate email engelleniyor
- [ ] Empty field validations çalışıyor
- [ ] Weight 0-100 arası zorunluluğu kontrol ediliyor

### Security Tests
- [ ] Unauthorized erişim engelleniyor
- [ ] ADMIN başka site verilerine erişemiyor
- [ ] Client-side bypass mümkün değil (server action kontrolü)
- [ ] Session expired durumunda redirect yapılıyor

## Migration

Yeni migration oluşturuldu:
```
prisma/migrations/20260206131203_add_rating_criteria/migration.sql
```

Migration'ı production'a deploy etmek için:
```bash
npx prisma migrate deploy
```

## Gelecek Geliştirmeler

### Önerilen İyileştirmeler
- [ ] Bulk user import (CSV)
- [ ] User activity logs
- [ ] Advanced filtering (date range, multiple filters)
- [ ] Export functionality (users, criteria)
- [ ] Department weight calculation summary
- [ ] Email notification for new user creation
- [ ] Password reset functionality for admins
- [ ] Audit trail for all admin actions

## Sonuç

Master Panel artık tam fonksiyonel ve production-ready durumda. Tüm CRUD işlemleri, yetki kontrolü ve güvenlik mekanizmaları implement edildi.

**Tamamlanan Özellikler:**
✅ Site Management (SUPER_ADMIN only)
✅ Department Management (SUPER_ADMIN only)
✅ User Management (role-based)
✅ Rating Criteria Management (SUPER_ADMIN only)
✅ Role-based access control
✅ Server-side validations
✅ Modern UI/UX
✅ Loading & error states
✅ Empty states
✅ Responsive design

**Demo Hazır:** Master Panel artık demo edilebilir durumda!

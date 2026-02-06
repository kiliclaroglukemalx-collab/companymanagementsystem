# Role Management & User Promotion Guide

**📅 6 Şubat 2026**

---

## 🎯 Production DB'de Kullanıcıyı SUPER_ADMIN Yapma

### Yöntem 1: Script ile (Önerilen)

```bash
# Local'den production DB'ye bağlanarak çalıştır
node scripts/promote-to-super-admin.js <email>
```

**Örnek:**
```bash
node scripts/promote-to-super-admin.js admin@company.com
```

**Script ne yapar:**
1. Email'den kullanıcıyı bulur
2. Mevcut bilgileri gösterir
3. Role'ü `SUPER_ADMIN` yapar
4. `isActive: true` yapar
5. `mustChangePassword: false` yapar
6. Güncel bilgileri gösterir

**Çıktı Örneği:**
```
🔍 Looking for user with email: admin@company.com...

📋 Current User Info:
   Name: Admin User
   Email: admin@company.com
   Current Role: ADMIN
   Site: Default Site
   Active: true
   Must Change Password: false

🔄 Promoting user to SUPER_ADMIN...

✅ Successfully promoted user!

📋 Updated User Info:
   Name: Admin User
   Email: admin@company.com
   New Role: SUPER_ADMIN
   Active: true
   Must Change Password: false

🎉 Done! User now has full SUPER_ADMIN access.
   Please refresh the page or log in again to see changes.
```

---

### Yöntem 2: Direct SQL (Alternatif)

```sql
-- Production database'e bağlan
psql $DATABASE_URL

-- Kullanıcıyı bul
SELECT id, email, name, role FROM "User" WHERE email = 'admin@company.com';

-- SUPER_ADMIN yap
UPDATE "User" 
SET 
  role = 'SUPER_ADMIN',
  "isActive" = true,
  "mustChangePassword" = false
WHERE email = 'admin@company.com';

-- Kontrol et
SELECT id, email, name, role, "isActive", "mustChangePassword" 
FROM "User" 
WHERE email = 'admin@company.com';
```

---

## 🔍 Debug Panel ile Kontrol

Arena sayfasında (`/arena`) geliştirme/preview ortamında debug panel görünür:

**Sarı Panel Gösterir:**
- Email
- Name
- **Role** (SUPER_ADMIN olmalı)
- Site
- Department
- Active
- Must Change Password
- User ID
- Site ID

**Production'da:**
- UI debug panel gizli
- Ama console.log Vercel logs'da görünür

---

## 🎯 Role Kontrol Sonrası Test

### 1. Login Yeniden

```
1. Logout yap
2. Tekrar login ol
3. Session yenilensin
```

### 2. Admin Menüsü Kontrol

**SUPER_ADMIN Görmeli:**
- ✅ Kullanıcılar
- ✅ Site Yönetimi
- ✅ Departmanlar
- ✅ Kriter Yönetimi
- ✅ Session Yönetimi
- ✅ Güvenlik Olayları
- ✅ "Yeni Kullanıcı" butonu

### 3. Arena Kontrol

```
1. /arena sayfasına git
2. Summary bar görünmeli (4 stat kutusu)
3. Debug panel'de Role: SUPER_ADMIN görünmeli
4. Sidebar'da "Tüm Siteleri Görüntülüyorsunuz" yazmalı
```

### 4. Rating Criteria Kontrol

```
1. /admin/rating-criteria sayfasına git
2. Tüm sitelerin departmanlarını görmeli
3. Kriter ekle/düzenle/sil yapabilmeli
```

---

## 🔐 Role Hierarchy

```
SUPER_ADMIN (En Üst)
  ↓ Tüm siteleri görür ve yönetir
  ↓ Tüm kullanıcıları yönetir
  ↓ Tüm özelliklere erişir

ADMIN
  ↓ Sadece kendi sitesini yönetir
  ↓ Kendi sitesindeki kullanıcıları yönetir
  ↓ Kriter yönetimi yapabilir

MANAGER
  ↓ Sadece görüntüleme
  ↓ Puanlama yapabilir
  ↓ Yönetim panelinde kısıtlı

STAFF
  ↓ En kısıtlı erişim
  ↓ Puanlama yapabilir
  ↓ Yönetim paneline giremez
```

---

## 🛠️ Central Role Helpers

**Dosya:** `lib/role-helpers.ts`

**Fonksiyonlar:**

```typescript
isAdminLike(role)        // SUPER_ADMIN || ADMIN
isSuperAdmin(role)       // SUPER_ADMIN only
isLimitedAccess(role)    // MANAGER || STAFF
canManageUsers(role)     // SUPER_ADMIN || ADMIN
canViewAllSites(role)    // SUPER_ADMIN only
canManageCriteria(role)  // SUPER_ADMIN || ADMIN
```

**Kullanım:**

```typescript
// Önce (Eski)
if (auth.role === "SUPER_ADMIN" || auth.role === "ADMIN") {
  // ...
}

// Sonra (Yeni - Önerilen)
import { isAdminLike } from "@/lib/role-helpers"

if (isAdminLike(auth.role)) {
  // ...
}
```

---

## 📝 Troubleshooting

### Problem 1: Script "User not found" diyor

**Çözüm:**
```sql
-- Tüm kullanıcıları listele
SELECT email, name, role FROM "User";

-- Doğru email'i bul ve script'i o email ile çalıştır
```

### Problem 2: Role değişti ama menü hala kilitli

**Çözüm:**
```
1. Logout yap
2. Browser cache temizle
3. Tekrar login ol
4. Session yenilenir, yeni role aktif olur
```

### Problem 3: Debug panel görünmüyor

**Kontrol:**
```
- NODE_ENV !== 'production' mi?
- Vercel preview deployment mı? (production değil)
- Browser console'da hata var mı?
```

---

## 🚀 Deployment Sonrası

**1. Push:**
```bash
git push origin main
```

**2. Vercel Deploy Bekle:**
- Deployment tamamlanınca preview URL'e git

**3. Script Çalıştır:**
```bash
# Production DB'ye bağlı olarak
node scripts/promote-to-super-admin.js <your-email>
```

**4. Test:**
- Logout → Login
- `/arena` → Debug panel kontrol
- `/admin/users` → "Yeni Kullanıcı" butonu görünmeli
- `/admin/rating-criteria` → Erişim olmalı

---

**Hazırlayan:** AI Assistant  
**Tarih:** 6 Şubat 2026  
**Durum:** ✅ Ready for Use

# Production Deployment Talimatları

## 1. Database Migration Uygulama

Aşağıdaki komutu production ortamında çalıştırın:

```bash
# Prisma migration'ı uygula
npx prisma migrate deploy

# Veya manuel olarak SQL çalıştır:
psql $DATABASE_URL -c "ALTER TABLE \"MasterPanelSettings\" ADD COLUMN \"sessionTimeoutMinutes\" INTEGER NOT NULL DEFAULT 60;"
```

## 2. Prisma Client'ı Yeniden Oluştur

```bash
npx prisma generate
```

## 3. Uygulamayı Yeniden Başlat

```bash
# Next.js production build
npm run build

# Uygulamayı başlat
npm start
```

## 4. Kontrol Listesi

### Database Kontrolü
```sql
-- MasterPanelSettings tablosunda yeni alan var mı?
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'MasterPanelSettings' 
  AND column_name = 'sessionTimeoutMinutes';
```

### Uygulama Kontrolleri

1. **Çoklu Oturum Testi**
   - Aynı kullanıcı ile 2 farklı tarayıcıdan giriş yap
   - İlk tarayıcıdaki oturum sonlanmalı

2. **IP Çakışması Testi**
   - Aynı IP'den farklı kullanıcılarla giriş yap
   - Security Events sayfasında IP_CONFLICT eventi görünmeli

3. **Session Timeout Testi**
   - Master Panel'den timeout süresini 5 dakika yap
   - 5 dakika bekle
   - Herhangi bir sayfaya tıkla
   - Oturum sonlanmış olmalı

4. **Master Panel Ayarları**
   - SUPER_ADMIN kullanıcısıyla giriş yap
   - Chronos Master Panel Ayarları'na git
   - "Oturum Zaman Aşımı Süresi" slider'ı görünüyor mu?
   - Değişiklikleri kaydet ve test et

## 5. Rollback (Geri Alma)

Sorun yaşanırsa:

```bash
# Migration'ı geri al
npx prisma migrate rollback

# Veya manuel SQL:
psql $DATABASE_URL -c "ALTER TABLE \"MasterPanelSettings\" DROP COLUMN IF EXISTS \"sessionTimeoutMinutes\";"
```

## 6. Monitoring

Aşağıdaki metrikler izlenmeli:

- SecurityEvent tablosundaki `ip_conflict` event'lerinin sayısı
- Session revoke sayısı (günlük)
- Ortalama session süresi
- Timeout nedeniyle sonlanan session'lar

## 7. Notlar

- Mevcut kullanıcıların oturumları etkilenmez
- Varsayılan timeout süresi 60 dakikadır
- Master Panel kullanıcıları timeout süresini 15-240 dakika arası ayarlayabilir
- IP çakışması tespiti tüm sitelerde otomatik çalışır

## 8. Destek

Sorun yaşanırsa:
1. Application loglarını kontrol edin
2. Database migration durumunu kontrol edin: `npx prisma migrate status`
3. Prisma client'ı tekrar generate edin: `npx prisma generate`

---

**Deployment Tarihi**: 8 Şubat 2026  
**Commit Hash**: 7317603  
**Branch**: main

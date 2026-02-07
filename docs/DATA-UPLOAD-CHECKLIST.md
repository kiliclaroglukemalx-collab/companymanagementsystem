# Veri Yükleme Merkezi - Verification Checklist

## ✅ Deployment Öncesi Kontrol Listesi

Deployment'tan önce aşağıdaki maddeleri kontrol edin:

### 1. Kod Değişiklikleri

- [ ] Tüm yeni dosyalar git'e eklendi
- [ ] `package.json` güncellenmiş (xlsx dependency)
- [ ] `.gitignore` güncellendi (uploads/ eklendi)
- [ ] Prisma schema güncellenmiş
- [ ] Migration SQL dosyası mevcut

**Kontrol Komutu:**
```bash
git status
```

### 2. Bağımlılıklar

- [ ] `npm install` başarıyla çalıştı
- [ ] `xlsx` paketi yüklendi
- [ ] `node_modules` güncel

**Kontrol Komutu:**
```bash
npm list xlsx
```

### 3. Veritabanı

- [ ] Prisma Client oluşturuldu
- [ ] Migration uygulandı (veya SQL elle çalıştırıldı)
- [ ] Yeni tablolar var: `DataUpload`, `FinancialFlow`, `AIAnalysis`

**Kontrol Komutu:**
```bash
npx prisma generate
npx prisma migrate deploy
```

### 4. Dosya Yapısı

- [ ] `uploads/` klasörü oluşturuldu
- [ ] `uploads/` yazma izinlerine sahip
- [ ] Yeni API routes mevcut
- [ ] Yeni components mevcut
- [ ] Dokümantasyon dosyaları mevcut

**Kontrol Komutu:**
```bash
ls -la uploads/
ls -la app/api/data-upload/
ls -la components/admin/data-upload-center.tsx
ls -la docs/DATA-UPLOAD-*.md
```

### 5. Ortam Değişkenleri

- [ ] `.env.local` dosyası mevcut (opsiyonel)
- [ ] `OPENAI_API_KEY` eklendi (opsiyonel, AI için)
- [ ] Database connection string doğru

**Not:** OpenAI API anahtarı olmadan da sistem çalışır (fallback mode).

### 6. Build Kontrolü

- [ ] `npm run build` hatasız tamamlandı
- [ ] Linting hataları yok
- [ ] TypeScript type errors yok

**Kontrol Komutu:**
```bash
npm run build
npm run lint
```

## ✅ Deployment Sonrası Test Listesi

Deployment sonrası şu testleri yapın:

### 1. Erişim Kontrolü

**Test 1.1: SUPER_ADMIN Erişimi**
- [ ] SUPER_ADMIN ile giriş yap
- [ ] `/admin/data-upload` adresine git
- [ ] Sayfa yüklendi ve form görünüyor
- [ ] Admin nav'da "Data Upload" linki var

**Test 1.2: Diğer Kullanıcılar**
- [ ] ADMIN/MANAGER/STAFF ile giriş yap
- [ ] `/admin/data-upload` adresine gitmeyi dene
- [ ] Erişim reddedildi ve yönlendirildi

### 2. UI Kontrolleri

**Test 2.1: Data Upload Center**
- [ ] Site dropdown çalışıyor ve siteleri gösteriyor
- [ ] Veri tipi seçimi (Excel/CSV/JSON) çalışıyor
- [ ] Analitik modül seçimi çalışıyor
- [ ] Dosya seçici çalışıyor
- [ ] Upload butonu doğru durumda (disabled/enabled)

**Test 2.2: Ana Sayfa Widget**
- [ ] Ana sayfada "Para Nasıl Akıyor?" bölümü görünüyor
- [ ] Günlük/Aylık toggle çalışıyor
- [ ] Veri yoksa "No Data" mesajı gösteriliyor

### 3. Fonksiyonel Testler

**Test 3.1: Dosya Yükleme**
1. Test dosyası hazırla (CSV/Excel):
```csv
date,totalIncome,bankFees,withdrawals,operatingCosts
2024-02-01,150000,5000,30000,20000
2024-02-02,180000,6000,35000,22000
```

2. Testler:
- [ ] Dosya seçildi
- [ ] Dosya boyutu gösteriliyor
- [ ] Upload butonu aktif oldu
- [ ] "Yükleniyor..." durumu gösteriliyor
- [ ] Başarı mesajı göründü
- [ ] Liste'de yeni upload görünüyor
- [ ] Status "PENDING" → "PROCESSING" → "COMPLETED" oluyor

**Test 3.2: Finansal Veri İşleme**
- [ ] Yüklenen dosya işlendi
- [ ] `FinancialFlow` kayıtları oluşturuldu (database'de kontrol)
- [ ] Net profit doğru hesaplandı
- [ ] Kümülatif profit doğru

**Test 3.3: Ana Sayfa Güncelleme**
- [ ] Ana sayfaya git
- [ ] "Para Nasıl Akıyor?" widget'ı güncellenmiş
- [ ] Yüklenen veriler görünüyor
- [ ] Hesaplamalar doğru
- [ ] Toggle (günlük/aylık) çalışıyor

**Test 3.4: AI Analizi**
- [ ] Completed upload için "AI Analiz Oluştur" butonu görünüyor
- [ ] Butona tıkla
- [ ] Başarı mesajı göründü
- [ ] Analiz oluşturuldu

**OpenAI API key varsa:**
- [ ] GPT-4 yanıtı alındı
- [ ] Token kullanımı kaydedildi
- [ ] Türkçe analiz raporu oluştu

**API key yoksa (fallback):**
- [ ] Fallback analiz oluşturuldu
- [ ] Model: "fallback" olarak kaydedildi
- [ ] Temel analiz metni var

### 4. Hata Senaryoları

**Test 4.1: Geçersiz Dosya**
- [ ] .txt dosyası yüklemeyi dene
- [ ] Hata mesajı gösteriliyor

**Test 4.2: Site Seçmeden Upload**
- [ ] Site seçmeden upload'a tıkla
- [ ] Hata mesajı: "Lütfen site seçin"

**Test 4.3: Boş Dosya**
- [ ] Boş Excel yükle
- [ ] Sistem hata vermemeli veya uygun hata mesajı vermeli

**Test 4.4: Bozuk Veri Formatı**
- [ ] Yanlış sütun isimleriyle CSV yükle
- [ ] Status "FAILED" olmalı
- [ ] Error message kaydedilmeli

### 5. Performans Testleri

**Test 5.1: Dosya Boyutu**
- [ ] 1KB dosya: < 2 saniye
- [ ] 100KB dosya: < 5 saniye
- [ ] 1MB dosya: < 10 saniye
- [ ] 10MB dosya: < 30 saniye

**Test 5.2: Satır Sayısı**
- [ ] 10 satır: anlık işleniyor
- [ ] 100 satır: < 5 saniye
- [ ] 1000 satır: < 30 saniye

**Test 5.3: Widget Yükleme**
- [ ] Ana sayfa açılışı: < 2 saniye
- [ ] Widget data fetch: < 1 saniye

### 6. Browser Uyumluluğu

- [ ] Chrome: Tüm özellikler çalışıyor
- [ ] Firefox: Tüm özellikler çalışıyor
- [ ] Safari: Tüm özellikler çalışıyor
- [ ] Edge: Tüm özellikler çalışıyor

### 7. Responsive Tasarım

- [ ] Desktop (1920x1080): Perfect
- [ ] Laptop (1366x768): Perfect
- [ ] Tablet (768x1024): Uyumlu
- [ ] Mobile (375x667): Uyumlu

### 8. Database Kontrolleri

**SQL Sorguları:**
```sql
-- DataUpload kayıtlarını kontrol et
SELECT * FROM "DataUpload" ORDER BY "createdAt" DESC LIMIT 5;

-- FinancialFlow kayıtlarını kontrol et
SELECT * FROM "FinancialFlow" ORDER BY date DESC LIMIT 10;

-- AIAnalysis kayıtlarını kontrol et
SELECT * FROM "AIAnalysis" ORDER BY "createdAt" DESC LIMIT 5;

-- Tablolar oluşturulmuş mu?
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('DataUpload', 'FinancialFlow', 'AIAnalysis');
```

### 9. Güvenlik Kontrolleri

- [ ] Non-SUPER_ADMIN kullanıcılar erişemiyor
- [ ] File type validation çalışıyor
- [ ] SQL injection koruması var (Prisma ORM)
- [ ] XSS koruması var (React)
- [ ] uploads/ klasörü web'den erişilemiyor

### 10. Logging & Monitoring

- [ ] Upload hataları loglanıyor
- [ ] Processing hataları loglanıyor
- [ ] AI generation hataları loglanıyor
- [ ] Server logs temiz (kritik hata yok)

## 🐛 Bilinen Sorunlar ve Çözümler

### Sorun 1: "Prisma Client not found"
**Çözüm:**
```bash
npx prisma generate
```

### Sorun 2: "uploads directory not writable"
**Çözüm:**
```bash
mkdir -p uploads
chmod 755 uploads
```

### Sorun 3: "TLS connection error" (Migration)
**Çözüm:**
```bash
# Manuel SQL çalıştır
cat prisma/migrations/add_data_upload_center/migration.sql | psql $DATABASE_URL
```

### Sorun 4: "Module 'xlsx' not found"
**Çözüm:**
```bash
npm install xlsx
```

### Sorun 5: "OpenAI API error"
**Çözüm:**
- API key'i kontrol et
- Rate limit'e takılmış olabilir
- Fallback mode çalışıyor olmalı

## 📊 Başarı Kriterleri

Tüm aşağıdaki kriterler sağlanmalı:

- ✅ Build başarılı
- ✅ Linting hatasız
- ✅ Database migration uygulandı
- ✅ SUPER_ADMIN erişebiliyor
- ✅ Diğer kullanıcılar erişemiyor
- ✅ Dosya yükleme çalışıyor
- ✅ Finansal veriler işleniyor
- ✅ Ana sayfa widget'ı güncelleniyor
- ✅ AI analizi oluşturuluyor (GPT-4 veya fallback)
- ✅ Responsive tasarım uyumlu
- ✅ Hata senaryoları handle ediliyor

## 🎉 Production Ready Checklist

Son kontroller:

- [ ] Tüm testler başarılı
- [ ] Performance kabul edilebilir
- [ ] Güvenlik kontrolleri OK
- [ ] Dokümantasyon tam
- [ ] Rollback planı hazır
- [ ] Monitoring kuruldu
- [ ] Backup alındı (database)
- [ ] Team'e eğitim verildi

## 📝 Sign-off

**Tarih:** _____________

**Test Eden:** _____________

**Onaylayan:** _____________

**Notlar:**
_______________________________________________
_______________________________________________
_______________________________________________

## 🚀 Go Live!

Tüm checkboxlar işaretlendiyse, production'a deploy edilebilir!

```bash
# Production build
npm run build

# Start production server
npm start
```

---

**Destek İçin:**
- Dokümantasyon: `/docs`
- GitHub Issues
- Team Slack/Discord

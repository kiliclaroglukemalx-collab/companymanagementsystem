# Veri Yükleme Merkezi - Deployment Guide

## Hızlı Başlangıç

Bu rehber, Veri Yükleme Merkezi özelliğini projeye entegre etmek için gereken adımları içerir.

## Yapılan Değişiklikler

### 1. Veritabanı Değişiklikleri
- ✅ `DataUpload` modeli eklendi
- ✅ `FinancialFlow` modeli eklendi
- ✅ `AIAnalysis` modeli eklendi
- ✅ Yeni enum'lar: `DataFileType`, `AnalyticModule`, `UploadStatus`

### 2. API Endpoint'leri
- ✅ `/api/data-upload/upload` - Veri yükleme
- ✅ `/api/data-upload/list` - Yüklemeleri listeleme
- ✅ `/api/data-upload/generate-ai` - AI analizi oluşturma
- ✅ `/api/financial-flow/summary` - Finansal özet
- ✅ `/api/admin/sites` - Site listesi (mevcut endpoint güncellendi)

### 3. Frontend Bileşenleri
- ✅ `DataUploadCenter` - Ana yükleme merkezi komponenti
- ✅ `FinancialFlowWidget` - Ana sayfa finansal akış widget'ı
- ✅ Admin navigasyonuna "Data Upload" linki eklendi

### 4. Yeni Sayfalar
- ✅ `/admin/data-upload` - Veri yükleme merkezi sayfası

### 5. Çeviriler
- ✅ Türkçe çeviriler `lib/tr-constants.ts`'ye eklendi

## Deployment Adımları

### Adım 1: Kod Değişikliklerini Çek
```bash
git pull origin main
```

### Adım 2: Bağımlılıkları Yükle
```bash
npm install
```

Yeni eklenen paket:
- `xlsx` - Excel/CSV dosya parse'lama

### Adım 3: Veritabanı Migrasyonu Çalıştır

#### Otomatik (Önerilen):
```bash
npx prisma migrate deploy
```

#### Manuel (Bağlantı sorunu olursa):
1. `prisma/migrations/add_data_upload_center/migration.sql` dosyasını açın
2. SQL'i veritabanınızda manuel çalıştırın (Neon dashboard, pgAdmin, vb.)

### Adım 4: Prisma Client'ı Yeniden Oluştur
```bash
npx prisma generate
```

### Adım 5: .env Dosyasını Güncelle (Opsiyonel)

AI Analyst özelliğini kullanmak için OpenAI API anahtarı ekleyin:

```env
# .env.local
OPENAI_API_KEY=sk-your-api-key-here
```

**Not**: API anahtarı yoksa sistem otomatik fallback analize geçer, özellik çalışmaya devam eder.

### Adım 6: Build ve Test
```bash
# Development modunda test
npm run dev

# Production build
npm run build
npm start
```

### Adım 7: Uploads Klasörü İzinleri

Sunucuda `uploads/` klasörünün yazma izinleri olduğundan emin olun:
```bash
mkdir -p uploads
chmod 755 uploads
```

## Test Senaryoları

### Test 1: Erişim Kontrolü
1. SUPER_ADMIN olmayan bir kullanıcıyla giriş yapın
2. `/admin/data-upload` adresine gitmeyi deneyin
3. ✅ Erişim reddedilmeli ve admin dashboard'a yönlendirilmeli

### Test 2: Veri Yükleme
1. SUPER_ADMIN ile giriş yapın
2. `/admin/data-upload` adresine gidin
3. Bir site seçin
4. Excel/CSV dosyası yükleyin (örnek format aşağıda)
5. ✅ Dosya başarıyla yüklenmeli
6. ✅ Liste'de "COMPLETED" durumunda görünmeli

### Test 3: Finansal Akış Widget'ı
1. Herhangi bir kullanıcı ile giriş yapın
2. Ana sayfaya gidin
3. ✅ "Para Nasıl Akıyor?" bölümü görünmeli
4. ✅ Günlük/Aylık toggle çalışmalı
5. ✅ Veriler doğru hesaplanmalı

### Test 4: AI Analiz
1. SUPER_ADMIN ile giriş yapın
2. `/admin/data-upload` adresine gidin
3. Completed bir yükleme için "AI Analiz Oluştur" butonuna tıklayın
4. ✅ Analiz oluşturulmalı (API key varsa GPT-4, yoksa fallback)

## Örnek Test Dosyası

### Excel/CSV Format (finans.csv)
```csv
date,totalIncome,bankFees,withdrawals,operatingCosts
2024-02-01,150000,5000,30000,20000
2024-02-02,180000,6000,35000,22000
2024-02-03,165000,5500,32000,21000
2024-02-04,175000,5800,33000,21500
2024-02-05,190000,6200,36000,23000
```

### JSON Format (finans.json)
```json
[
  {
    "date": "2024-02-01",
    "totalIncome": 150000,
    "bankFees": 5000,
    "withdrawals": 30000,
    "operatingCosts": 20000
  },
  {
    "date": "2024-02-02",
    "totalIncome": 180000,
    "bankFees": 6000,
    "withdrawals": 35000,
    "operatingCosts": 22000
  }
]
```

## Rollback Planı

Eğer bir sorun çıkarsa:

### 1. Veritabanı Rollback
```sql
-- Tabloları sil
DROP TABLE IF EXISTS "AIAnalysis";
DROP TABLE IF EXISTS "FinancialFlow";
DROP TABLE IF EXISTS "DataUpload";

-- Enum'ları sil
DROP TYPE IF EXISTS "UploadStatus";
DROP TYPE IF EXISTS "AnalyticModule";
DROP TYPE IF EXISTS "DataFileType";
```

### 2. Kod Rollback
```bash
git revert HEAD
```

### 3. Dependencies Rollback
```bash
npm uninstall xlsx
```

## Monitoring

### Kontrol Edilmesi Gerekenler

1. **Disk Alanı**: `uploads/` klasörünün boyutu
2. **API Rate Limits**: OpenAI API kullanım limitleri
3. **Database Performance**: FinancialFlow tablo boyutu
4. **Error Logs**: Upload ve processing hataları

### Log Kontrol Komutları
```bash
# Next.js logs
pm2 logs

# Upload errors
grep "Upload error" logs/error.log

# AI generation errors  
grep "AI generation error" logs/error.log
```

## Production Checklist

- [ ] Veritabanı migrasyonu tamamlandı
- [ ] Prisma client güncellendi
- [ ] npm bağımlılıkları yüklendi
- [ ] Uploads klasörü oluşturuldu ve izinler ayarlandı
- [ ] .env dosyasına OPENAI_API_KEY eklendi (opsiyonel)
- [ ] Test senaryoları başarıyla geçti
- [ ] Error handling test edildi
- [ ] Admin menüsünde "Data Upload" görünüyor
- [ ] Ana sayfada "Para Nasıl Akıyor?" widget'ı görünüyor
- [ ] Master Panel kullanıcıları erişebiliyor
- [ ] Diğer kullanıcılar erişemiyor

## Performans Optimizasyonları

### Öneriler:
1. **File Size Limits**: Nginx/Apache'de upload limitlerini ayarlayın
2. **Caching**: Financial summary endpoint'ini cache'leyin
3. **Background Jobs**: Büyük dosyalar için queue sistemi ekleyin
4. **Database Indexes**: Sık sorgulanan alanlar için index ekleyin (zaten var)

### Nginx Örnek Config
```nginx
client_max_body_size 50M;
```

## Sorun Giderme

### Hata: "Prisma Client not found"
```bash
npx prisma generate
```

### Hata: "Cannot find module 'xlsx'"
```bash
npm install xlsx
```

### Hata: "uploads directory not writable"
```bash
mkdir -p uploads
chmod 755 uploads
```

### Hata: "TLS connection error"
Prisma migrate çalıştırırken bağlantı hatası alırsanız:
1. Manuel SQL dosyasını çalıştırın
2. Veya Neon dashboard'dan çalıştırın

## Destek ve Dokümantasyon

- Ana Dokümantasyon: `/docs/DATA-UPLOAD-CENTER.md`
- API Dokümantasyonu: Kod içindeki JSDoc yorumları
- Türkçe çeviriler: `/lib/tr-constants.ts`

## Sonraki Adımlar

1. ✅ Temel özellikler tamamlandı
2. 🔄 Production'da test edilecek
3. 📝 Kullanıcı geri bildirimleri toplanacak
4. 🚀 Gelişmiş özellikler eklenecek (batch upload, charts, vb.)

---

**Not**: Bu özellik PDF'deki sayfa 106 ve 682'deki "Veri Yükleme Merkezi" spesifikasyonlarına göre geliştirilmiştir.

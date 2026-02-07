# Veri Yükleme Merkezi - Hızlı Başlangıç Kılavuzu

## 🚀 5 Dakikada Başlayın

Bu rehber, Veri Yükleme Merkezi'ni hızlıca kurmanız ve test etmeniz için hazırlanmıştır.

## Adım 1: Deployment (2 dakika)

### Otomatik Kurulum (Önerilen)

**Mac/Linux:**
```bash
./scripts/deploy-data-upload.sh
```

**Windows:**
```cmd
scripts\deploy-data-upload.bat
```

### Manuel Kurulum

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Prisma Client oluştur
npx prisma generate

# 3. Uploads klasörü oluştur
mkdir -p uploads
chmod 755 uploads

# 4. Database migration (opsiyonel, bağlantı sorunları varsa atla)
npx prisma migrate deploy

# 5. Build kontrolü
npm run build
```

## Adım 2: Test Dosyası Hazırla (30 saniye)

`test-data.csv` adında bir dosya oluşturun:

```csv
date,totalIncome,bankFees,withdrawals,operatingCosts
2024-02-01,150000,5000,30000,20000
2024-02-02,180000,6000,35000,22000
2024-02-03,165000,5500,32000,21000
2024-02-04,175000,5800,33000,21500
2024-02-05,190000,6200,36000,23000
2024-02-06,200000,6500,38000,24000
2024-02-07,185000,6000,34000,22500
```

**Veya Excel versiyonu** kullanabilirsiniz (aynı sütunlarla).

## Adım 3: Dev Server'ı Başlat (10 saniye)

```bash
npm run dev
```

Tarayıcınızda açın: http://localhost:3000

## Adım 4: İlk Veri Yükleme (1 dakika)

1. **Giriş Yapın**
   - SUPER_ADMIN kullanıcısı ile login olun
   - Eğer yoksa, seed script çalıştırın:
     ```bash
     npx prisma db seed
     ```

2. **Veri Yükleme Merkezi'ne Gidin**
   - Üst menüden "Data Upload" tıklayın
   - Veya direkt: http://localhost:3000/admin/data-upload

3. **Dosya Yükleyin**
   - Site seçin (herhangi bir site)
   - Veri Tipi: Excel
   - Analitik Modül: Finans
   - Dosya: `test-data.csv` seçin
   - "Dosyayı Yükle" butonuna tıklayın

4. **İşlem Tamamlanana Kadar Bekleyin**
   - Status: PENDING → PROCESSING → COMPLETED
   - ~5-10 saniye sürer

## Adım 5: Sonuçları Görüntüle (30 saniye)

### Ana Sayfa Widget
1. Ana sayfaya gidin: http://localhost:3000
2. Aşağı scroll yapın
3. **"Para Nasıl Akıyor?"** bölümünü görün
4. Verileriniz orada!

### AI Analizi Oluştur (Opsiyonel)
1. Veri Yükleme Merkezi'ne geri dönün
2. Completed upload için **"AI Analiz Oluştur"** butonuna tıklayın
3. 5-30 saniye bekleyin (OpenAI API key varsa GPT-4, yoksa fallback)
4. Başarı mesajı göreceksiniz

## 🎯 Ne Başardınız?

✅ Veri Yükleme Merkezi kuruldu  
✅ İlk veri yüklendi ve işlendi  
✅ Finansal akış hesaplandı  
✅ Ana sayfa widget'ı güncellendi  
✅ (Opsiyonel) AI analizi oluşturuldu  

## 🔧 Sorun mu Yaşıyorsunuz?

### "Cannot access /admin/data-upload"
**Neden:** SUPER_ADMIN değilsiniz  
**Çözüm:**
```bash
# Kullanıcınızı SUPER_ADMIN yapın
npx prisma db seed
# Veya manuel olarak promote edin
```

### "Module 'xlsx' not found"
**Çözüm:**
```bash
npm install xlsx
```

### "Prisma Client not found"
**Çözüm:**
```bash
npx prisma generate
```

### "uploads directory not writable"
**Çözüm:**
```bash
mkdir -p uploads
chmod 755 uploads
```

### "Database migration error"
**Çözüm:** Manuel SQL çalıştırın:
1. Aç: `prisma/migrations/add_data_upload_center/migration.sql`
2. SQL'i database'de çalıştır (Neon dashboard, pgAdmin vb.)

## 📚 Sonraki Adımlar

### 1. OpenAI API Key Ekle (Gelişmiş AI için)
`.env.local` dosyasına:
```env
OPENAI_API_KEY=sk-your-api-key-here
```

### 2. Farklı Formatlar Dene
- Excel (.xlsx) dosyası yükle
- JSON formatı yükle
- Farklı analitik modüller dene (Spor, Bonus, Casino)

### 3. Gerçek Verilerinizi Yükleyin
- Finansal raporlarınızı Excel'den export edin
- Sütun isimlerini eşleştirin
- Sisteme yükleyin

### 4. Ekibinizi Eğitin
- Master Panel kullanıcılarına gösterin
- Günlük/haftalık veri yükleme rutini oluşturun
- AI analiz raporlarını paylaşın

## 📖 Detaylı Dokümantasyon

Daha fazla bilgi için:

- **Özellik Dokümantasyonu:** `/docs/DATA-UPLOAD-CENTER.md`
- **Deployment Rehberi:** `/docs/DATA-UPLOAD-DEPLOYMENT.md`
- **Proje Özeti:** `/docs/DATA-UPLOAD-SUMMARY.md`
- **Test Checklist:** `/docs/DATA-UPLOAD-CHECKLIST.md`

## 💡 Pro İpuçları

### İpucu 1: Toplu Yükleme
Aylık raporlarınızı bir kerede yükleyin. Sistem her satırı otomatik işler.

### İpucu 2: Veri Formatı
Türkçe sütun isimleri de desteklenir:
```csv
tarih,gelir,bankaKesintisi,cekim,isletmeGideri
```

### İpucu 3: Günlük vs Aylık
Ana sayfada toggle ile görünümü değiştirin:
- **Günlük:** Bugünün verileri
- **Aylık:** Bu ayın toplam verileri

### İpucu 4: Kümülatif Takip
Sistem her gün üst üste hesaplama yapar. Böylece toplam kazancınızı sürekli görebilirsiniz.

### İpucu 5: AI Insights
Her upload için AI analizi oluşturun. Farklı perspektifler edinirsiniz.

## 🎓 Video Tutorial (Yakında)

Görsel anlatım için video tutorial hazırlanıyor.

## 🆘 Destek

Sorularınız için:
- GitHub Issues
- Team Slack/Discord
- Dokümantasyon dosyaları

## 🎉 Hazırsınız!

Artık Veri Yükleme Merkezi'ni kullanmaya hazırsınız. İyi çalışmalar!

---

**Son Güncelleme:** Şubat 2026  
**Versiyon:** 1.0.0

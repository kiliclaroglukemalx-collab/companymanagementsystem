# Veri Yükleme Merkezi - Data Upload Center

## Özellikler / Features

### 1. Veri Yükleme (Data Upload)
- ✅ **Master Panel Erişimi**: Sadece SUPER_ADMIN rolündeki kullanıcılar erişebilir
- ✅ **Çoklu Format Desteği**: Excel (.xlsx), CSV (.csv), JSON formatlarında dosya yükleme
- ✅ **Site Seçimi**: Yüklenen veriler belirli bir siteye atanır
- ✅ **Analitik Modül Seçimi**: Finans, Spor, Bonus, Casino, Genel modüllerinden birini seçme
- ✅ **Otomatik İşleme**: Yüklenen dosyalar arkaplanda otomatik olarak işlenir

### 2. Finansal Akış Otomasyonu
- ✅ **Para Nasıl Akıyor?**: Yüklenen finansal veriler ana sayfadaki widget'ı otomatik besler
- ✅ **Kümülatif Hesaplama**: Her gün üst üste hesaplama yaparak toplam kazancı gösterir
- ✅ **Veri Alanları**:
  - Toplam Gelir (Total Income)
  - Banka Kesintisi (Bank Fees)
  - Çekim (Withdrawals)
  - İşletme Gideri (Operating Costs)
  - Net Kazanç (Net Profit)
  - Kümülatif Kazanç (Cumulative Profit)

### 3. AI Analyst Fonksiyonu
- ✅ **LLM Entegrasyonu**: OpenAI GPT-4 ile entegre
- ✅ **Özel Analiz**: Her site için yüklenen verilere göre özel analiz raporları
- ✅ **Fallback Mekanizması**: API anahtarı yoksa veya hata olursa kural tabanlı analiz
- ✅ **Türkçe Raporlar**: Tüm analizler Türkçe olarak oluşturulur
- ✅ **Yayınlama Kontrolü**: Raporlar onaylanıp ana sayfada gösterilebilir

## Veritabanı Yapısı

### DataUpload (Veri Yükleme Kaydı)
```prisma
model DataUpload {
  id              String          @id @default(cuid())
  siteId          String
  uploadedByEmail String
  fileName        String
  fileType        DataFileType    // EXCEL, CSV, JSON
  analyticModule  AnalyticModule  // FINANS, SPOR, BON, CASINO, GENEL
  fileSize        Int
  status          UploadStatus    // PENDING, PROCESSING, COMPLETED, FAILED
  processedAt     DateTime?
  errorMessage    String?
  metaData        Json?
  createdAt       DateTime
}
```

### FinancialFlow (Finansal Akış)
```prisma
model FinancialFlow {
  id              String      @id @default(cuid())
  siteId          String
  dataUploadId    String?
  date            DateTime
  totalIncome     Float
  bankFees        Float
  withdrawals     Float
  operatingCosts  Float
  netProfit       Float       // Otomatik hesaplanır
  cumulativeProfit Float      // Önceki günlerle toplanır
  month           String      // YYYY-MM format
  createdAt       DateTime
  updatedAt       DateTime
}
```

### AIAnalysis (AI Analiz Raporları)
```prisma
model AIAnalysis {
  id              String      @id @default(cuid())
  siteId          String
  dataUploadId    String?
  analyticModule  AnalyticModule
  analysisDate    DateTime
  prompt          String      @db.Text
  response        String      @db.Text
  tokensUsed      Int?
  model           String      @default("gpt-4")
  isPublished     Boolean     @default(false)
  createdAt       DateTime
}
```

## API Endpoints

### 1. Upload Data
```
POST /api/data-upload/upload
```
- **Authorization**: SUPER_ADMIN only
- **Content-Type**: multipart/form-data
- **Body**:
  - file: File (Excel/CSV/JSON)
  - siteId: string
  - fileType: "EXCEL" | "CSV" | "JSON"
  - analyticModule: "FINANS" | "SPOR" | "BON" | "CASINO" | "GENEL"

### 2. List Uploads
```
GET /api/data-upload/list
```
- **Authorization**: SUPER_ADMIN only
- **Returns**: Array of recent uploads with their status

### 3. Generate AI Analysis
```
POST /api/data-upload/generate-ai
```
- **Authorization**: SUPER_ADMIN only
- **Body**:
  - uploadId: string
  - siteId: string
  - module: string

### 4. Get Financial Summary
```
GET /api/financial-flow/summary?range=daily|monthly
```
- **Authorization**: Authenticated users
- **Returns**: Aggregated financial data for the specified range

## Excel/CSV Format Örneği

Finans modülü için yüklenecek dosyanın beklenen sütunları:

```csv
date,totalIncome,bankFees,withdrawals,operatingCosts
2024-02-01,150000,5000,30000,20000
2024-02-02,180000,6000,35000,22000
2024-02-03,165000,5500,32000,21000
```

Alternatif Türkçe sütun isimleri de desteklenir:
```csv
tarih,gelir,bankaKesintisi,cekim,isletmeGideri
2024-02-01,150000,5000,30000,20000
```

## Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Veritabanı Migrasyonu
```bash
# Eğer bağlantı sorunları yoksa:
npx prisma migrate deploy

# Manuel olarak SQL çalıştırma gerekiyorsa:
# prisma/migrations/add_data_upload_center/migration.sql dosyasını çalıştırın
```

### 3. Prisma Client Oluştur
```bash
npx prisma generate
```

### 4. OpenAI API Anahtarı (Opsiyonel)
`.env.local` dosyasına ekleyin:
```env
OPENAI_API_KEY=sk-...your-key-here
```

**Not**: API anahtarı yoksa sistem otomatik olarak fallback analize geçer.

### 5. Uploads Klasörü
Sistem otomatik olarak `uploads/` klasörünü oluşturacaktır. Bu klasör `.gitignore`'a eklenmiştir.

## Kullanım

### 1. Veri Yükleme Merkezi'ne Erişim
1. SUPER_ADMIN olarak giriş yapın
2. Üst menüden "Data Upload" seçeneğine tıklayın
3. Alternatif: `/admin/data-upload` URL'ine gidin

### 2. Veri Yükleme
1. Site seçin
2. Veri tipini seçin (Excel/CSV/JSON)
3. Analitik modülü seçin
4. Dosyayı yükleyin
5. Sistem otomatik olarak dosyayı işler

### 3. AI Analiz Oluşturma
1. Yükleme listesinde "COMPLETED" durumundaki bir yükleme bulun
2. "AI Analiz Oluştur" butonuna tıklayın
3. Sistem yüklenen verilerden otomatik analiz raporu oluşturur

### 4. Finansal Akış Görüntüleme
1. Ana sayfaya gidin
2. "Para Nasıl Akıyor?" bölümünde tüm sitelerin finansal özetini görün
3. Günlük/Aylık görünüm arasında geçiş yapın

## Teknik Detaylar

### Dosya İşleme Süreci
1. Dosya sunucuya yüklenir
2. `uploads/` klasörüne kaydedilir
3. Database'de `DataUpload` kaydı oluşturulur (status: PENDING)
4. Arkaplan işlemcisi dosyayı parse eder
5. Finans modülü ise `FinancialFlow` kayıtları oluşturulur
6. Status COMPLETED olarak güncellenir

### Finansal Hesaplamalar
```typescript
netProfit = totalIncome - bankFees - withdrawals - operatingCosts
cumulativeProfit = previousDayCumulative + todayNetProfit
```

### AI Prompt Yapısı
Sistem şu bilgileri LLM'e gönderir:
- Site adı
- Analitik modül
- Yükleme tarihi
- Finansal özet (son 30 gün)
- Toplam/ortalama değerler

LLM'den şu formatta yanıt beklenir:
- Markdown formatında rapor
- Durum değerlendirmesi
- Öneriler
- Sonuç

## Frontend Entegrasyonu

### Ana Sayfa Widget'ı
```tsx
import { FinancialFlowWidget } from "@/components/dashboard/financial-flow-widget"

<FinancialFlowWidget />
```

Widget özellikleri:
- Otomatik veri yenileme
- Günlük/Aylık görünüm toggle
- Responsive tasarım
- Gradient arka plan
- İkon ve renklerle görselleştirme

## Güvenlik

- ✅ Sadece SUPER_ADMIN erişimi
- ✅ Dosya tipi doğrulaması
- ✅ Site ID doğrulaması
- ✅ SQL Injection koruması (Prisma ORM)
- ✅ File upload size limitlri
- ✅ Uploads klasörü web'den erişilemez

## Gelecek Özellikler (TODO)

- [ ] Batch upload (Çoklu dosya yükleme)
- [ ] Data validation rules (Veri doğrulama kuralları)
- [ ] Export to Excel (Excel'e aktarma)
- [ ] Scheduled uploads (Planlanmış yüklemeler)
- [ ] Email notifications (E-posta bildirimleri)
- [ ] Data visualization charts (Veri görselleştirme grafikleri)
- [ ] Historical comparison (Geçmiş karşılaştırma)
- [ ] AI insights on homepage (Ana sayfada AI önerileri)

## Sorun Giderme

### Dosya yüklenemiyor
- Dosya boyutunu kontrol edin
- Dosya formatının doğru olduğundan emin olun
- Browser console'da hata mesajlarını kontrol edin

### AI analizi oluşturulamıyor
- OpenAI API anahtarının geçerli olduğundan emin olun
- API kotanızı kontrol edin
- Fallback analiz çalışıyor mu kontrol edin

### Finansal veriler görünmüyor
- En az bir veri yüklemesi yapılmış olmalı
- Veri yüklemesi "COMPLETED" durumunda olmalı
- Site ID'si doğru olmalı

## Destek

Sorularınız için:
- GitHub Issues
- Dokümantasyon: `/docs`
- README dosyaları

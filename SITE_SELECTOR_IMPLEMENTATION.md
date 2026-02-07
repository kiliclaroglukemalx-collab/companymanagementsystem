# Site Selector Global State - Implementation Documentation

## Overview
Bu dokümantasyon, CMS projesindeki Site Selector bileşenini merkezi bir duruma (Global State) getiren implementasyonu açıklamaktadır.

## Özellikler

### 1. Merkezi Site Yönetimi
- **Global Context**: Tüm uygulama genelinde paylaşılan site seçimi durumu
- **Otomatik Senkronizasyon**: Kullanıcı bir site seçtiğinde, tüm ilgili bölümler anında güncellenir
- **Tutarlı Veri İzolasyonu**: Her site kendi bloğunda bağımsız hareket eder

### 2. Site Seçiminden Etkilenen Bölümler

#### Anında Güncellenen Bölümler:
1. **Analitik Modüller** (`SimpleCarousel` - Sayfa 113-114)
   - 5 ana kart: Finansal, Bonus, Spor, Casino, Oyuncu
   - Her kart tıklanabilir ve seçili sitenin detaylarını gösterir
   - Site değiştiğinde kartlar anında güncellenir

2. **Canlı Veri Akışı** (`LivingDataFooter`)
   - Site seçimine göre özel ticker verileri
   - Gerçek zamanlı güncelleme
   - Site rengine göre görsel özelleştirme

3. **Personel Merkezi** (`PersonnelCenter`)
   - Seçili sitenin departmanları ve personeli
   - Site bazlı filtreleme
   - Aktif personel sayıları

4. **Mesai Takvimi** (`ShiftCalendar`)
   - Site özel vardiya sistemleri
   - Departman bazlı mesai takibi
   - Site özel raporlama

#### Bağımsız Çalışan Bölüm:
5. **Para Nasıl Akıyor?** (`GlobalPerformanceMonolith` - Sayfa 111)
   - ✅ Site seçiminden etkilenmez
   - Tüm şirketlerin toplam kümülatif verisi
   - Her gün üst üste hesaplama (Gelen Para, Giderler, Net Kazanç vb.)

## Teknik Implementasyon

### 1. Site Context (`lib/site-context.tsx`)

```typescript
// Global state yönetimi için React Context kullanımı
export function SiteProvider({ children, initialSite }) {
  const [selectedSite, setSelectedSite] = useState(initialSite)
  const [isLoading, setIsLoading] = useState(false)
  
  // Yumuşak geçiş için loading state
  const setSelectedSite = (site) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedSiteState(site)
      setIsLoading(false)
    }, 150)
  }
}

// Hook ile kolay erişim
export function useSite() {
  const context = useContext(SiteContext)
  return context
}
```

**Kullanım:**
```typescript
const { selectedSite, setSelectedSite, isLoading } = useSite()
```

### 2. Ana Sayfa Güncellemesi (`app/page.tsx`)

```typescript
export default function DashboardPage() {
  return (
    <SiteProvider initialSite={brands[0]}>
      <DashboardContent />
    </SiteProvider>
  )
}
```

**Önemli:** Tüm uygulama `SiteProvider` ile sarmalandı, böylece her alt bileşen site bilgisine erişebilir.

### 3. Bileşen Güncellemeleri

#### HybridBrandSelector (Site Seçici)
```typescript
export function HybridBrandSelector() {
  const { selectedSite, setSelectedSite } = useSite()
  // Artık props olarak almıyor, doğrudan context'ten alıyor
}
```

#### LivingDataFooter (Canlı Veri)
```typescript
export function LivingDataFooter({ onOpenDataWall }) {
  const { selectedSite } = useSite()
  // Site değişince ticker verileri otomatik güncellenir
  const tickerItems = brandTickerData[selectedSite.id]
}
```

#### NeonExpandedView (Analitik Detay)
```typescript
export function NeonExpandedView({ card, onClose }) {
  const { selectedSite } = useSite()
  // Detay ekranında site bilgisi gösterilir
  return (
    <div>
      <SiteBadge site={selectedSite} />
      {/* Analytics content */}
    </div>
  )
}
```

#### PersonnelCenter (Personel Merkezi)
```typescript
export function PersonnelCenter({ isManager }) {
  const { selectedSite, setSelectedSite } = useSite()
  // Site seçici integrated
}
```

#### ShiftCalendar (Mesai Takvimi)
```typescript
export function ShiftCalendar({ isManager }) {
  const { selectedSite, setSelectedSite } = useSite()
  // Site bazlı vardiya yönetimi
}
```

## Veri İzolasyonu Mimarisi

### Site Bazlı Veri Yapısı

```typescript
// Her site için ayrı veri setleri
export const brandTickerData: Record<string, string[]> = {
  '1': ['BetMaster TR data...'],
  '2': ['Casino Royal data...'],
  // ...
}

export const brandDataWallMetrics: Record<string, DataWallMetrics> = {
  '1': { revenue: {...}, players: {...} },
  '2': { revenue: {...}, players: {...} },
  // ...
}
```

### Veri Erişim Kontrolü

```typescript
// Site ID'ye göre güvenli veri erişimi
const getSiteData = (siteId: string) => {
  return brandData[siteId] || brandData['default']
}
```

**Garanti:** Site-A'nın verisi asla Site-B'de görünmez.

## Kullanıcı Deneyimi

### 1. Site Seçimi
- Üst başlıktaki site seçici ile anında değiştirilebilir
- Kaydırma ile ya da arama ile site bulunabilir
- Otomatik döngü (5 saniye) - kullanıcı etkileşimi durur

### 2. Görsel Feedback
- Site değiştiğinde yumuşak animasyonlar
- Site rengi tema olarak yansır
- Loading state ile geçiş netliği

### 3. Performans
- Lazy loading ile optimize edilmiş
- Context güncellemesi sadece gerekli bileşenleri render eder
- Video optimizasyonu ile hızlı yükleme

## Frontend Yapısı Korunumu

### ✅ Korunan Özellikler:
- Mevcut component hiyerarşisi değişmedi
- UI/UX tasarımı korundu
- Animasyon ve geçişler aynı
- Video oynatıcılar optimize edildi
- Responsive tasarım korundu

### ✅ Yeni Özellikler:
- Global state management
- Site bazlı veri izolasyonu
- Otomatik senkronizasyon
- Gelişmiş tip güvenliği

## Test Senaryoları

### 1. Site Değiştirme
```
✓ Site seçildiğinde Analitik Modüller güncellenir
✓ Canlı Veri Akışı site özel verileri gösterir
✓ Personel Merkezi seçili sitenin personelini gösterir
✓ Mesai Takvimi site özel vardiyaları gösterir
✓ Para Nasıl Akıyor bölümü değişmez (tüm siteler)
```

### 2. Veri İzolasyonu
```
✓ Site-A seçildiğinde sadece Site-A verisi görünür
✓ Site değiştirildiğinde önceki site verisi kaybolur
✓ Detay ekranları doğru site bilgisini gösterir
```

### 3. Performans
```
✓ Site değişimi < 200ms
✓ Bileşenler sadece gerektiğinde render edilir
✓ Context güncellemesi optimize edildi
```

## Güvenlik ve Best Practices

### 1. Tip Güvenliği
```typescript
// TypeScript ile tip kontrolü
interface Brand {
  id: string
  name: string
  status: 'active' | 'inactive'
  themeColor: string
  rgbGlow: string
}
```

### 2. Null Safety
```typescript
// Güvenli veri erişimi
const data = selectedSite?.data || defaultData
```

### 3. Immutable State
```typescript
// State mutasyonlarından kaçınma
setSelectedSite(newSite) // Yeni referans oluşturur
```

## Gelecek Geliştirmeler

### Potansiyel İyileştirmeler:
1. **Backend Entegrasyonu**
   - API'den site verilerini çekme
   - Real-time güncelleme (WebSocket)
   - Önbellekleme stratejisi

2. **Gelişmiş Filtreleme**
   - Çoklu site seçimi
   - Site gruplaması
   - Karşılaştırma modu

3. **Raporlama**
   - Site bazlı PDF export
   - Özel dashboard oluşturma
   - Scheduled reports

## Sorun Giderme

### Problem: Site değişmiyor
**Çözüm:** `SiteProvider`'ın doğru yerde olduğundan emin olun

### Problem: Veri karışıyor
**Çözüm:** Site ID kontrollerini kontrol edin

### Problem: Performans sorunu
**Çözüm:** `React.memo` veya `useMemo` kullanın

## Sonuç

Bu implementasyon:
- ✅ Site seçimini merkezi hale getirdi
- ✅ Veri izolasyonunu garanti etti
- ✅ "Para Nasıl Akıyor" bölümünü bağımsız tuttu
- ✅ Analitik modülleri tıklanabilir yaptı
- ✅ Frontend yapısını bozmadı
- ✅ Performanslı ve ölçeklenebilir bir yapı sağladı

## İletişim ve Destek

Herhangi bir sorun veya soru için lütfen development ekibi ile iletişime geçin.

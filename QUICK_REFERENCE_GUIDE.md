# Site Selector - Hızlı Başvuru Kılavuzu

## 🚀 Hızlı Başlangıç

### Site Context Kullanımı

```typescript
import { useSite } from '@/lib/site-context'

function MyComponent() {
  const { selectedSite, setSelectedSite, isLoading } = useSite()
  
  // Seçili siteyi kullan
  console.log(selectedSite.name)  // örn: "BetMaster TR"
  console.log(selectedSite.themeColor)  // örn: "#3b82f6"
  
  // Site değiştir
  const changeSite = (newSite) => {
    setSelectedSite(newSite)
  }
  
  // Loading durumunu kontrol et
  if (isLoading) {
    return <Spinner />
  }
  
  return <div>{selectedSite.name}</div>
}
```

## 📋 API Referansı

### `useSite()` Hook

#### Dönen Değerler:
| Özellik | Tip | Açıklama |
|---------|-----|----------|
| `selectedSite` | `Brand` | Aktif seçili site objesi |
| `setSelectedSite` | `(site: Brand) => void` | Site değiştirme fonksiyonu |
| `isLoading` | `boolean` | Geçiş animasyonu durumu |

#### Brand Tipi:
```typescript
interface Brand {
  id: string           // Benzersiz site ID'si
  name: string         // Site adı (örn: "BetMaster TR")
  status: 'active' | 'inactive'  // Site durumu
  themeColor: string   // Hex renk kodu (örn: "#3b82f6")
  rgbGlow: string      // RGB glow efekti (örn: "rgba(59, 130, 246, 0.8)")
}
```

## 🎨 Örnekler

### 1. Basit Site Gösterimi

```typescript
function SiteDisplay() {
  const { selectedSite } = useSite()
  
  return (
    <div>
      <h1>{selectedSite.name}</h1>
      <span style={{ color: selectedSite.themeColor }}>
        Aktif
      </span>
    </div>
  )
}
```

### 2. Site Bazlı Veri Yükleme

```typescript
function SiteData() {
  const { selectedSite } = useSite()
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // Site değiştiğinde veri yükle
    loadDataForSite(selectedSite.id).then(setData)
  }, [selectedSite.id])
  
  return <div>{data?.revenue}</div>
}
```

### 3. Site Seçici Oluşturma

```typescript
function CustomSiteSelector() {
  const { selectedSite, setSelectedSite } = useSite()
  
  return (
    <select 
      value={selectedSite.id}
      onChange={(e) => {
        const site = brands.find(b => b.id === e.target.value)
        if (site) setSelectedSite(site)
      }}
    >
      {brands.map(brand => (
        <option key={brand.id} value={brand.id}>
          {brand.name}
        </option>
      ))}
    </select>
  )
}
```

### 4. Koşullu Render (Site Bazlı)

```typescript
function SiteSpecificContent() {
  const { selectedSite } = useSite()
  
  if (selectedSite.id === '1') {
    return <BetMasterContent />
  }
  
  return <DefaultContent site={selectedSite} />
}
```

### 5. Site Renk Teması

```typescript
function ThemedCard() {
  const { selectedSite } = useSite()
  
  return (
    <div style={{
      background: `linear-gradient(135deg, ${selectedSite.themeColor}20, transparent)`,
      border: `1px solid ${selectedSite.themeColor}30`,
      boxShadow: `0 0 20px ${selectedSite.rgbGlow}`
    }}>
      <h3 style={{ color: selectedSite.themeColor }}>
        {selectedSite.name}
      </h3>
    </div>
  )
}
```

### 6. Loading State Kullanımı

```typescript
function SiteContent() {
  const { selectedSite, isLoading } = useSite()
  
  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <Spinner />
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSite.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SiteDetails site={selectedSite} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

## 🔍 Veri Erişim Örnekleri

### Site Bazlı Veri Getirme

```typescript
// dashboard-data.ts içindeki yapı
export const brandTickerData: Record<string, string[]> = {
  '1': ['BetMaster verileri...'],
  '2': ['Casino Royal verileri...'],
  'default': ['Varsayılan veriler...']
}

// Kullanım
function TickerDisplay() {
  const { selectedSite } = useSite()
  
  const tickerData = brandTickerData[selectedSite.id] || brandTickerData['default']
  
  return (
    <div>
      {tickerData.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  )
}
```

### Site Metrik Verileri

```typescript
function SiteMetrics() {
  const { selectedSite } = useSite()
  
  const metrics = brandDataWallMetrics[selectedSite.id] || brandDataWallMetrics['default']
  
  return (
    <div>
      <p>Günlük Gelir: {metrics.revenue.daily}</p>
      <p>Aktif Oyuncu: {metrics.players.active}</p>
      <p>Güvenlik: {metrics.security.status}</p>
    </div>
  )
}
```

## ⚠️ Önemli Notlar

### 1. Context Provider Gerekli
```typescript
// app/page.tsx veya layout.tsx'te
<SiteProvider initialSite={brands[0]}>
  <YourApp />
</SiteProvider>
```

### 2. Null Safety
```typescript
// Güvenli erişim
const data = selectedSite?.data || defaultData
```

### 3. Dependency Array
```typescript
// useEffect'te site ID kullan
useEffect(() => {
  fetchData(selectedSite.id)
}, [selectedSite.id])  // Sadece ID değişince çalışır
```

### 4. Memoization
```typescript
// Performans optimizasyonu
const siteData = useMemo(() => {
  return expensiveCalculation(selectedSite)
}, [selectedSite.id])
```

## 🚫 Yapılmaması Gerekenler

### ❌ Props ile Site Geçirme
```typescript
// YANLIŞ
function MyComponent({ site }: { site: Brand }) {
  return <div>{site.name}</div>
}

// DOĞRU
function MyComponent() {
  const { selectedSite } = useSite()
  return <div>{selectedSite.name}</div>
}
```

### ❌ State'i Kopyalama
```typescript
// YANLIŞ
const [localSite, setLocalSite] = useState(selectedSite)

// DOĞRU
const { selectedSite } = useSite()
```

### ❌ Direkt Mutasyon
```typescript
// YANLIŞ
selectedSite.name = "Yeni İsim"

// DOĞRU
setSelectedSite({ ...selectedSite, name: "Yeni İsim" })
```

## 📊 Performans İpuçları

### 1. Component Memoization
```typescript
const MemoizedComponent = React.memo(({ data }) => {
  const { selectedSite } = useSite()
  return <div>{selectedSite.name}: {data}</div>
})
```

### 2. Selector Pattern
```typescript
// Sadece ihtiyaç duyulan değeri al
function Component() {
  const { selectedSite } = useSite()
  const siteId = selectedSite.id  // Sadece ID'yi kullan
  
  // siteId değişmedikçe re-render olmaz
  return <ExpensiveComponent siteId={siteId} />
}
```

### 3. Context Splitting
```typescript
// Gerekirse context'i böl
const { selectedSite } = useSite()  // Sadece site bilgisi
const { isLoading } = useAppState()  // Loading durumu ayrı
```

## 🐛 Hata Ayıklama

### Problem: "Cannot read property of undefined"
**Çözüm:** Provider'ın doğru yerde olduğunu kontrol edin

### Problem: Bileşen güncellenmiyor
**Çözüm:** Dependency array'i kontrol edin, `selectedSite.id` kullanın

### Problem: Performans sorunu
**Çözüm:** React.memo ve useMemo kullanın

## 📞 Yardım

- Detaylı dokümantasyon: `SITE_SELECTOR_IMPLEMENTATION.md`
- Özet: `IMPLEMENTATION_SUMMARY.md`
- Kod örnekleri: Mevcut bileşenlerde

**Son Güncelleme:** 2026-02-07

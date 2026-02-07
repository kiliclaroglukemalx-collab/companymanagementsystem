# Chronos Module - Mesai Takvimi ve Aktif Personel Yönetimi

## 📋 Genel Bakış

Chronos Modülü, sistemdeki tüm birimlerin aktifliğini yöneten gelişmiş bir vardiya ve mesai takvimi yönetim sistemidir. Gerçek zamanlı personel takibi, onay bazlı düzenleme sistemi ve Master Panel kontrolü sağlar.

## 🎯 Ana Özellikler

### 1. **Chronos Timeline (Sayfa 1061)**
- **24 Saatlik İnteraktif Timeline**: Kullanıcılar zaman çubuğunu ileri veya geriye çekerek farklı saatlerdeki aktif personel durumunu görebilir
- **Otomatik Güncelleme**: Seçilen saat değiştiğinde, tüm dashboard kartlarında aktif personel sayısı otomatik güncellenir
- **Birim Bazında Filtreleme**: Her departman için o saatteki aktif personel sayısı görüntülenir
- **Gerçek Zamana Dönüş**: 10 saniye hareketsizlikten sonra timeline otomatik olarak gerçek saate döner

### 2. **Vardiya Düzenleme Penceresi (Sayfa 535)**
- **Master Panel Kontrolü**: Birim yöneticileri yalnızca Master Panel'in belirlediği saat aralığında vardiya düzenleyebilir
- **Saat Kısıtlaması**: Örneğin, Master Panel 06:00 - 23:00 arası düzenlemeye izin veriyorsa, yöneticiler bu saatler dışında değişiklik yapamaz
- **Görsel Geri Bildirim**: İzin verilen saatler vurgulanır, izin verilmeyen saatler gri görünür

### 3. **Mesai Değişikliği Onay Sistemi (Sayfa 565)**
- **Onay Talebi**: Birim yöneticileri vardiya değiştirmek için Master Panel'den onay talep eder
- **30 Dakikalık Yetki**: Onay geldiğinde, yöneticiye 30 dakika süreyle "Düzenleme Yetkisi" tanınır
- **Otomatik Süre Sonu**: 30 dakika sonunda düzenleme yetkisi otomatik olarak kaldırılır
- **Gerçek Zamanlı Sayaç**: Kalan düzenleme süresi ekranda görüntülenir

## 🏗️ Teknik Yapı

### Context API - ChronosContext

```typescript
// lib/chronos-context.tsx
interface ChronosContextType {
  selectedHour: number          // Kullanıcının seçtiği saat
  realHour: number              // Gerçek sistem saati
  activePersonnelCount: number  // O saatteki aktif personel sayısı
  departmentActiveCounts: Record<string, number>  // Departman bazında aktif sayılar
  editingPermission: {
    hasPermission: boolean
    expiresAt: Date | null
    allowedStartHour: number | null
    allowedEndHour: number | null
  }
  masterPanelSettings: {
    minEditableHour: number
    maxEditableHour: number
    requiresApproval: boolean
  }
}
```

### Database Schema

#### ShiftApprovalRequest (Vardiya Onay Talebi)
```prisma
model ShiftApprovalRequest {
  id                  String               
  requestedById       String               // Talep eden yönetici
  siteId              String               
  departmentId        String?              
  reason              String               // Talep sebebi
  requestedStartHour  Int                  // İstenen başlangıç saati
  requestedEndHour    Int                  // İstenen bitiş saati
  status              ShiftApprovalStatus  // PENDING, APPROVED, REJECTED
  approvedById        String?              // Onaylayan kişi (Master Panel)
  approvedAt          DateTime?
  expiresAt           DateTime?            // 30 dakika sonra
}
```

#### MasterPanelSettings
```prisma
model MasterPanelSettings {
  id                      String   
  siteId                  String   
  minEditableHour         Int      @default(6)   // 06:00
  maxEditableHour         Int      @default(23)  // 23:00
  requiresApproval        Boolean  @default(true)
  editingDurationMinutes  Int      @default(30)
}
```

#### ShiftDefinition (Vardiya Tanımları)
```prisma
model ShiftDefinition {
  id          String         
  siteId      String
  name        String         // Sabah, Öğle, Gece
  startHour   Int            // 8
  endHour     Int            // 16
  color       String         // #3b82f6
  isActive    Boolean
}
```

#### Shift (Vardiya Atamaları)
```prisma
model Shift {
  id                  String           
  siteId              String
  departmentId        String
  shiftDefinitionId   String
  userId              String           // Atanan personel
  date                DateTime         
  startTime           DateTime         
  endTime             DateTime         
  lastModifiedById    String?          // Son değiştiren yönetici
  lastModifiedAt      DateTime?
}
```

## 🔌 API Endpoints

### 1. Vardiya Onay Talebi
```bash
POST /api/chronos/shift-approval
Content-Type: application/json

{
  "reason": "Acil durum için vardiya değişikliği gerekiyor",
  "requestedStartHour": 9,
  "requestedEndHour": 18
}

Response:
{
  "success": true,
  "request": {
    "id": "...",
    "status": "PENDING",
    "createdAt": "..."
  }
}
```

### 2. Onay Taleplerini Listele (Master Panel)
```bash
GET /api/chronos/shift-approval

Response:
{
  "requests": [
    {
      "id": "...",
      "requestedBy": {
        "name": "Ahmet Yılmaz",
        "department": { "name": "Risk" }
      },
      "reason": "...",
      "requestedStartHour": 9,
      "requestedEndHour": 18,
      "status": "PENDING"
    }
  ]
}
```

### 3. Talebi Onayla/Reddet (Master Panel)
```bash
PATCH /api/chronos/shift-approval/[id]
Content-Type: application/json

{
  "action": "approve"  // veya "reject"
}

Response (approve):
{
  "success": true,
  "message": "Request approved. Manager has 30 minutes to edit shifts.",
  "request": {
    "status": "APPROVED",
    "expiresAt": "2026-02-07T15:30:00Z"
  }
}
```

### 4. Master Panel Ayarları
```bash
GET /api/chronos/master-panel
Response:
{
  "settings": {
    "minEditableHour": 6,
    "maxEditableHour": 23,
    "requiresApproval": true,
    "editingDurationMinutes": 30
  }
}

PUT /api/chronos/master-panel
{
  "minEditableHour": 8,
  "maxEditableHour": 22,
  "requiresApproval": true,
  "editingDurationMinutes": 30
}
```

## 🎨 UI Bileşenleri

### 1. ChronosProvider
```tsx
// app/page.tsx
<ChronosProvider>
  <DashboardContent />
</ChronosProvider>
```

### 2. Chronos Timeline
```tsx
// components/dashboard/shift-calendar.tsx
const { selectedHour, setSelectedHour, activePersonnelCount } = useChronos()

// Timeline'da saat değiştiğinde:
setSelectedHour(newHour)
// → Otomatik olarak tüm dashboard kartları güncellenir
```

### 3. ChronosActiveCountBadge
```tsx
// Dashboard kartlarında kullanım:
import { ChronosActiveCountBadge } from "@/components/dashboard/chronos-active-count"

<ChronosActiveCountBadge />
// → Seçilen saatteki aktif personel sayısını gösterir
```

### 4. MasterPanelSettingsModal
```tsx
<MasterPanelSettingsModal
  isOpen={isMasterPanelOpen}
  onClose={() => setIsMasterPanelOpen(false)}
/>
```

### 5. ShiftApprovalRequestModal
```tsx
<ShiftApprovalRequestModal
  isOpen={isApprovalRequestOpen}
  onClose={() => setIsApprovalRequestOpen(false)}
  onSuccess={() => {
    // Onay talebi başarıyla gönderildi
  }}
/>
```

## 🔐 Yetki Kontrolleri

### Roller ve İzinler

| Rol | İzinler |
|-----|---------|
| **SUPER_ADMIN** (Master Panel) | - Master Panel ayarlarını değiştirme<br>- Tüm onay taleplerini görme<br>- Talepleri onaylama/reddetme |
| **MANAGER** (Birim Yöneticisi) | - Vardiya düzenleme talebi oluşturma<br>- Onay sonrası 30 dakika düzenleme<br>- Sadece kendi birimini düzenleme |
| **STAFF** (Personel) | - Kendi vardiyasını görme<br>- İzin/mesai talebi oluşturma |

## 📊 Kullanım Senaryoları

### Senaryo 1: Gerçek Zamanlı Personel Takibi
1. Kullanıcı Chronos timeline'ı saat 14:00'e çeker
2. Sistem tüm personelin 14:00'teki mesai durumunu hesaplar
3. Dashboard kartlarında aktif personel sayıları güncellenir:
   - Risk: 38 → 42
   - Bonus: 28 → 31
   - Canlı Destek: 65 → 58

### Senaryo 2: Vardiya Düzenleme Onayı
1. **Birim Yöneticisi**: "Düzenleme İzni Talep Et" butonuna tıklar
2. Modal açılır, saat aralığı (09:00-18:00) ve sebep girilir
3. Talep Master Panel'e gönderilir
4. **Master Panel**: Bekleyen talepleri görür ve onaylar
5. **Birim Yöneticisi**: 30 dakikalık düzenleme yetkisi alır
6. Ekranda "Düzenleme Aktif (27dk)" gösterilir
7. Yönetici vardiya değişikliklerini yapar
8. 30 dakika sonra yetki otomatik kaldırılır

### Senaryo 3: Master Panel Kısıtlaması
1. Master Panel ayarlarında: minEditableHour = 8, maxEditableHour = 20
2. Birim yöneticisi 05:00'deki vardiyaları düzenlemeye çalışır
3. Sistem reddeder: "Bu saat aralığı Master Panel tarafından kısıtlanmıştır"
4. Yönetici sadece 08:00-20:00 arası düzenleme yapabilir

## 🚀 Kurulum ve Başlangıç

### 1. Veritabanı Migration
```bash
npx prisma migrate dev --name add_chronos_module
npx prisma generate
```

### 2. Context Provider Ekleme
```tsx
// app/page.tsx
import { ChronosProvider } from "@/lib/chronos-context"

<ChronosProvider>
  <YourApp />
</ChronosProvider>
```

### 3. Hook Kullanımı
```tsx
import { useChronos } from "@/lib/chronos-context"

function YourComponent() {
  const { 
    selectedHour, 
    activePersonnelCount,
    editingPermission 
  } = useChronos()
  
  return (
    <div>
      Aktif Personel @ {selectedHour}:00 = {activePersonnelCount}
      {editingPermission.hasPermission && (
        <span>Düzenleme yetkisi aktif</span>
      )}
    </div>
  )
}
```

## 📝 Önemli Notlar

1. **Performans**: Timeline her saat için personel hesaplaması yaptığından, büyük veri setlerinde optimize edilmelidir
2. **Gerçek Zamanlı Senkronizasyon**: WebSocket veya Server-Sent Events ile Master Panel onayları gerçek zamanlı iletilmelidir
3. **Timezone**: Tüm saat hesaplamaları kullanıcının timezone'una göre yapılmalıdır
4. **Mobil Uyumluluk**: Timeline touch event'leri için optimize edilmiştir
5. **Güvenlik**: API endpoint'leri JWT token ve rol tabanlı erişim kontrolü ile korunmalıdır

## 🔄 Gelecek Güncellemeler

- [ ] Toplu vardiya düzenleme (çoklu personel seçimi)
- [ ] Vardiya şablonları (haftalık/aylık tekrar eden paternler)
- [ ] Otomatik vardiya önerisi (AI bazlı)
- [ ] Vardiya değişim talepleri (personel arası)
- [ ] Excel/CSV import/export
- [ ] Bildirim sistemi (push notifications)
- [ ] Vardiya çakışma kontrolü
- [ ] Fazla mesai otomatik hesaplama

## 📞 Destek

Herhangi bir sorun veya öneriniz için lütfen iletişime geçin.

---

**Son Güncelleme**: 7 Şubat 2026
**Versiyon**: 1.0.0

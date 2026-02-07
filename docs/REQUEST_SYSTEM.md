# Talep Sistemi (Request System)

## Genel Bakış

Bu sistem, Personel → Admin → Birim Müdürü → Genel Müdür hiyerarşisine uygun bir talep yönetim sistemidir.

## Özellikler

### 1. İzin/Mesai Talebi
- Personel takvim üzerinden tarih seçerek talep oluşturabilir
- Sadece kendi Birim Müdürü'ne gönderilir
- İzin türleri: Yıllık İzin, Sağlık İzni, Kişisel İzin, Mesai
- Onaylanan talepler otomatik olarak Mesai Takvimi'ne yansıtılır

### 2. Avans Talebi
- Hangi birimden gelirse gelsin, tüm avans talepleri direkt Finans Müdürü'ne düşer
- Avans miktarı personelin kayıtlı maaşını aşamaz (kod seviyesinde kontrol)
- Maaş bilgisi `UserSalary` modeli ile yönetilir

### 3. Talep Durumları
- `PENDING`: Beklemede
- `APPROVED`: Onaylandı
- `REJECTED`: Reddedildi
- `CANCELLED`: İptal Edildi

## Database Schema

### Yeni Modeller

1. **Request** - Ana talep modeli
2. **LeaveRequest** - İzin/Mesai talep detayları
3. **AdvanceRequest** - Avans talep detayları
4. **UserSalary** - Kullanıcı maaş bilgisi

### Enum'lar

- `RequestType`: LEAVE, OVERTIME, ADVANCE
- `RequestStatus`: PENDING, APPROVED, REJECTED, CANCELLED
- `LeaveType`: ANNUAL, SICK, PERSONAL, OVERTIME

## API Endpoints

### Talep Yönetimi

#### `GET /api/requests?view={view}`
Talepleri listeler
- `view=my-requests`: Kullanıcının kendi talepleri
- `view=to-approve`: Onaylaması gereken talepler

#### `POST /api/requests`
Yeni talep oluşturur

Request Body:
```json
{
  "type": "LEAVE" | "OVERTIME" | "ADVANCE",
  "reason": "string",
  "leaveData": {
    "leaveType": "ANNUAL" | "SICK" | "PERSONAL" | "OVERTIME",
    "startDate": "2025-01-01",
    "endDate": "2025-01-05",
    "days": 5
  },
  "advanceData": {
    "amount": 5000
  }
}
```

#### `PATCH /api/requests/{id}`
Talebi onayla/reddet

Request Body:
```json
{
  "action": "approve" | "reject",
  "rejectionReason": "string" // sadece reject için
}
```

#### `DELETE /api/requests/{id}`
Talebi iptal et (sadece talep eden kişi)

### Maaş Yönetimi

#### `GET /api/salary?userId={userId}`
Maaş bilgisini getirir

#### `POST /api/salary`
Maaş bilgisi oluşturur/günceller (sadece admin/manager)

Request Body:
```json
{
  "userId": "user_id",
  "monthlySalary": 50000,
  "currency": "TRY"
}
```

## Frontend Components

### 1. CreateRequestForm
Yeni talep oluşturma formu
- Props: `isOpen`, `onClose`, `onSuccess`, `defaultType`
- Kullanım: İzin, Mesai, Avans talepleri için tek form

### 2. RequestManagement
Talep yönetim paneli
- Props: `viewMode`, `onClose`
- `viewMode="my-requests"`: Kullanıcının talepleri
- `viewMode="to-approve"`: Onay bekleyen talepler

### 3. ShiftCalendar (Güncellenmiş)
Mesai takvimi ile entegre
- Personel: "Talep Oluştur" ve "Taleplerim" butonları
- Yönetici: "Onay Bekleyen Talepler" butonu

## Kullanım

### Personel İçin

1. Mesai Takvimi'nden "Talep Oluştur" butonuna tıklayın
2. Talep türünü seçin (İzin, Mesai, Avans)
3. Gerekli bilgileri doldurun
4. "Talep Gönder" ile talebi gönderin
5. "Taleplerim" butonundan talep durumunu takip edin

### Yönetici İçin

1. Mesai Takvimi'nden "Onay Bekleyen Talepler" butonuna tıklayın
2. Talep detaylarını inceleyin
3. "Onayla" veya "Reddet" butonuna tıklayın
4. Onaylanan izin/mesai talepleri otomatik olarak takvime yansıtılır

## İş Akışı

### İzin/Mesai Talebi
1. Personel → Talep oluşturur
2. Sistem → Birim Müdürü'nü otomatik belirler
3. Birim Müdürü → Talebi onaylar/reddeder
4. Onaylanırsa → Mesai Takvimi'ne otomatik yansıtılır

### Avans Talebi
1. Personel → Avans talebi oluşturur
2. Sistem → Maaş kontrolü yapar (maaşı aşamaz)
3. Sistem → Finans Müdürü'nü otomatik belirler
4. Finans Müdürü → Talebi onaylar/reddeder

## Güvenlik ve Kontroller

1. **Maaş Limiti**: Avans miktarı API seviyesinde kontrol edilir
2. **Yetki Kontrolü**: Sadece onaylayıcı onay/red yapabilir
3. **Durum Kontrolü**: Sadece PENDING talepler işlenebilir
4. **İptal Yetkisi**: Sadece talep eden kişi iptal edebilir
5. **Hiyerarşi**: İzin/Mesai → Birim Müdürü, Avans → Finans Müdürü

## Migration

Veritabanı migration'ı için:

```bash
npx prisma migrate dev --name add_request_system
```

## Seed Data (Opsiyonel)

Kullanıcılara maaş bilgisi eklemek için:

```javascript
// prisma/seed.js içine ekleyin
const users = await prisma.user.findMany()

for (const user of users) {
  await prisma.userSalary.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      monthlySalary: 50000 + Math.random() * 50000, // 50k-100k arası random
      currency: "TRY"
    }
  })
}
```

## Notlar

- Sistemde `PersonelType` enum'ı mevcut (PERSONEL, ADMIN, BIRIM_MUDURU, GENEL_MUDUR) ancak mevcut `UserRole` kullanıldı
- Birim Müdürü tespiti için `role: "MANAGER"` ve aynı `departmentId` kontrolü yapılıyor
- Finans Müdürü tespiti için departman adında "Finans" içeren ve `role: "MANAGER"` olan kullanıcı aranıyor
- Onaylanan izin/mesai talepleri `isReflectedToCalendar` flag'i ile işaretlenir
- Gerçek takvim entegrasyonu için `ShiftEntry` veya benzeri bir model oluşturulabilir

## TODO

- [ ] Mesai takvimine entry ekleme sistemi
- [ ] Email/Bildirim gönderimi (onay/red durumlarında)
- [ ] Talep geçmişi ve raporlama
- [ ] Toplu onaylama özelliği
- [ ] Avans ödeme takibi

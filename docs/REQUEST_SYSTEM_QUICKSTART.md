# Talep Sistemi - Hızlı Başlangıç

## 🚀 Kurulum

### 1. Database Migration

```bash
# Migration'ı çalıştır
npx prisma migrate dev

# Veya manuel olarak
npx prisma db push
```

### 2. Seed Data (Opsiyonel)

Sistemde örnek talepler ve maaş bilgileri oluşturmak için:

```bash
node scripts/seed-request-system.js
```

Bu script:
- ✅ Tüm kullanıcılara maaş bilgisi ekler
- ✅ Örnek izin/mesai talepleri oluşturur
- ✅ Örnek avans talepleri oluşturur

## 📋 Personel Kullanımı

### Talep Oluşturma

1. Mesai Takvimi'ne gidin
2. Sağ üstte "Talep Oluştur" butonuna tıklayın
3. Talep türünü seçin:
   - **İzin**: Yıllık, Sağlık veya Kişisel izin
   - **Mesai**: Ekstra mesai talebi
   - **Avans**: Maaş avansı talebi

#### İzin/Mesai Talebi
```
- İzin Türü: Seçin
- Başlangıç Tarihi: Seçin
- Bitiş Tarihi: Seçin
- Açıklama: Yazın
- Gönder
```

➡️ **Birim Müdürü'nüze gider**

#### Avans Talebi
```
- Miktar: Girin (Maaşınızı aşamaz!)
- Açıklama: Yazın
- Gönder
```

➡️ **Finans Müdürü'ne gider**

### Talepleri Takip Etme

1. Mesai Takvimi'nde "Taleplerim" butonuna tıklayın
2. Tüm taleplerinizi görüntüleyin:
   - ⏳ Beklemede (Sarı)
   - ✅ Onaylandı (Yeşil)
   - ❌ Reddedildi (Kırmızı)
   - 🚫 İptal Edildi (Gri)

3. Bekleyen talepleri iptal edebilirsiniz

## 👔 Yönetici Kullanımı

### Talep Onaylama/Reddetme

1. Mesai Takvimi'nde "Onay Bekleyen Talepler" butonuna tıklayın
2. Talep detaylarını inceleyin:
   - Personel bilgisi
   - Talep türü ve detayları
   - Avans için: Maaş limiti bilgisi
3. Karar verin:
   - ✅ **Onayla**: Talep kabul edilir
   - ❌ **Reddet**: Red sebebi yazın ve reddedin

### Onaylanan Talepler

- **İzin/Mesai**: Otomatik olarak Mesai Takvimi'ne yansıtılır
- **Avans**: Finans departmanı tarafından işleme alınır

## 🔒 Güvenlik Kontrolleri

### Avans Talebi Limitleri

```javascript
// Sistem otomatik kontrol eder:
if (avans_miktarı > maaş) {
  ❌ "Avans miktarı maaşınızı aşamaz"
}
```

### Yetki Kontrolleri

- ✅ Sadece ilgili yönetici onay verebilir
- ✅ Sadece talep sahibi iptal edebilir
- ✅ Sadece PENDING talepler işlenebilir
- ✅ Sadece admin/manager maaş güncelleyebilir

## 📊 API Kullanımı

### Talep Oluşturma

```javascript
// POST /api/requests
const response = await fetch('/api/requests', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'LEAVE',
    reason: 'Yıllık izin',
    leaveData: {
      leaveType: 'ANNUAL',
      startDate: '2025-02-10',
      endDate: '2025-02-15',
      days: 6
    }
  })
})
```

### Talep Onaylama

```javascript
// PATCH /api/requests/{id}
const response = await fetch(`/api/requests/${requestId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'approve'
  })
})
```

### Talep Reddetme

```javascript
// PATCH /api/requests/{id}
const response = await fetch(`/api/requests/${requestId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'reject',
    rejectionReason: 'Personel yetersizliği'
  })
})
```

## 🔧 Maaş Yönetimi (Admin)

### Maaş Ekleme/Güncelleme

```javascript
// POST /api/salary
const response = await fetch('/api/salary', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user_id_here',
    monthlySalary: 50000,
    currency: 'TRY'
  })
})
```

### Maaş Sorgulama

```javascript
// GET /api/salary?userId={userId}
const response = await fetch('/api/salary?userId=user_id_here')
const { salary } = await response.json()
```

## ⚙️ Hiyerarşi Akışı

### İzin/Mesai Akışı
```
Personel
    ↓
Talep Oluştur
    ↓
Sistem: Birim Müdürü Belirle
    ↓
Birim Müdürü
    ↓
Onayla/Reddet
    ↓
(Onaylanırsa) Mesai Takvimi'ne Yansıt
```

### Avans Akışı
```
Personel (Herhangi bir birim)
    ↓
Avans Talebi Oluştur
    ↓
Sistem: Maaş Kontrolü
    ↓
Sistem: Finans Müdürü Belirle
    ↓
Finans Müdürü
    ↓
Onayla/Reddet
    ↓
(Onaylanırsa) Ödeme İşlemi
```

## 🎯 Özellikler

### ✅ Tamamlanan
- [x] İzin/Mesai talep oluşturma
- [x] Avans talep oluşturma
- [x] Talep onaylama/reddetme
- [x] Talep iptal etme
- [x] Maaş yönetimi
- [x] Otomatik yetkilendirme (Birim Müdürü/Finans Müdürü)
- [x] Maaş limiti kontrolü
- [x] Takvime otomatik yansıtma flag'i
- [x] Responsive UI/UX

### 🚧 Planlanan
- [ ] Mesai Takvimi'ne gerçek entry ekleme
- [ ] Email/Push bildirimleri
- [ ] Toplu onaylama
- [ ] Talep geçmişi raporları
- [ ] Avans ödeme takibi
- [ ] İzin bakiyesi yönetimi

## 🐛 Troubleshooting

### "Birim Müdürü bulunamadı" Hatası
```bash
# Çözüm: Biriminizde MANAGER rolünde kullanıcı olmalı
# Admin panelinden kontrol edin veya oluşturun
```

### "Finans Müdürü bulunamadı" Hatası
```bash
# Çözüm: "Finans" adında bir birim ve MANAGER rolünde kullanıcı gerekli
# Admin panelinden oluşturun
```

### "Maaş bilgisi bulunamadı" Hatası
```bash
# Çözüm: Kullanıcıya maaş bilgisi ekleyin
node scripts/seed-request-system.js
# veya admin panelinden manuel ekleyin
```

## 📞 Destek

Sorularınız için:
- 📖 Dokümantasyon: `/docs/REQUEST_SYSTEM.md`
- 🐛 Issue: GitHub Issues
- 📧 Email: destek@yourcompany.com

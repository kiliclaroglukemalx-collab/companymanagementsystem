import * as XLSX from "xlsx"

// =============================================
// INTERFACES
// =============================================

export interface PaymentMethodConfig {
  id: string
  name: string
  excelKolonAdi: string
  komisyonOrani: number
  cekimKomisyonOrani: number
  baslangicBakiye: number
}

export interface PaymentRow {
  odemeTuruAdi: string
  borc: number
  kredi: number
}

export interface KasaCardData {
  id: string
  odemeTuruAdi: string
  toplamBorc: number
  toplamKredi: number
  komisyon: number
  komisyonOrani: number
  cekimKomisyon: number
  cekimKomisyonOrani: number
  netBorc: number
  kalanKasa: number
  baslangicBakiye: number
}

// =============================================
// TURKISH CHARACTER NORMALIZATION
// =============================================

const TURKISH_MAP: Record<string, string> = {
  İ: "i",
  I: "i",
  Ö: "o",
  Ü: "u",
  Ş: "s",
  Ç: "c",
  Ğ: "g",
  ı: "i",
  ö: "o",
  ü: "u",
  ş: "s",
  ç: "c",
  ğ: "g",
}

export function normalizeTurkish(str: string): string {
  return str
    .split("")
    .map((char) => TURKISH_MAP[char] || char)
    .join("")
    .toLowerCase()
    .replace(/[\s_\-]+/g, "")
    .trim()
}

// =============================================
// COLUMN NAME ALTERNATIVES
// =============================================

const ODEME_TURU_ALTERNATIVES = [
  "Ödeme Türü Adı",
  "Odeme Turu Adi",
  "OdemeTuruAdi",
  "Odeme Turu",
  "ODEME TURU ADI",
  "Ödeme Türü",
  "odeme_turu_adi",
  "odeme_turu",
  "Payment Method",
  "payment_method",
]

const BORC_ALTERNATIVES = [
  "Borç",
  "Borc",
  "Borc Tutari",
  "Borç Tutarı",
  "borc_tutari",
  "BORC",
  "Yatırım",
  "Yatirim",
  "yatirim",
  "Deposit",
  "deposit",
]

const KREDI_ALTERNATIVES = [
  "Kredi",
  "Kredi Tutari",
  "Kredi Tutarı",
  "kredi_tutari",
  "KREDI",
  "Çekim",
  "Cekim",
  "cekim",
  "Withdrawal",
  "withdrawal",
]

function findColumnKey(
  headers: string[],
  alternatives: string[]
): string | null {
  for (const alt of alternatives) {
    const exact = headers.find((h) => h === alt)
    if (exact) return exact
  }

  for (const alt of alternatives) {
    const normalized = normalizeTurkish(alt)
    const match = headers.find((h) => normalizeTurkish(h) === normalized)
    if (match) return match
  }

  for (const alt of alternatives) {
    const normalized = normalizeTurkish(alt)
    const match = headers.find((h) => normalizeTurkish(h).includes(normalized))
    if (match) return match
  }

  return null
}

// =============================================
// EXCEL PARSING
// =============================================

export function parseExcelFile(buffer: Buffer): PaymentRow[] {
  const workbook = XLSX.read(buffer, { type: "buffer" })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const rawData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet)

  if (rawData.length === 0) return []

  const headers = Object.keys(rawData[0])
  const odemeTuruKey = findColumnKey(headers, ODEME_TURU_ALTERNATIVES)
  const borcKey = findColumnKey(headers, BORC_ALTERNATIVES)
  const krediKey = findColumnKey(headers, KREDI_ALTERNATIVES)

  if (!odemeTuruKey) {
    throw new Error(
      `Excel dosyasında ödeme türü sütunu bulunamadı. Beklenen sütunlardan biri: ${ODEME_TURU_ALTERNATIVES.join(", ")}`
    )
  }

  if (!borcKey && !krediKey) {
    throw new Error(
      `Excel dosyasında borç veya kredi sütunu bulunamadı. Beklenen: ${BORC_ALTERNATIVES.join(", ")} veya ${KREDI_ALTERNATIVES.join(", ")}`
    )
  }

  const rows: PaymentRow[] = []

  for (const row of rawData) {
    const odemeTuruAdi = String(row[odemeTuruKey] || "").trim()
    if (!odemeTuruAdi) continue

    const borc = parseFloat(String(row[borcKey!] || "0").replace(/[,.\s]/g, (m) => m === "," ? "." : m === "." ? "" : "")) || 0
    const kredi = parseFloat(String(row[krediKey!] || "0").replace(/[,.\s]/g, (m) => m === "," ? "." : m === "." ? "" : "")) || 0

    rows.push({ odemeTuruAdi, borc: Math.abs(borc), kredi: Math.abs(kredi) })
  }

  return rows
}

// =============================================
// PAYMENT METHOD MATCHING
// =============================================

export function matchPaymentMethod(
  rowName: string,
  methods: PaymentMethodConfig[]
): PaymentMethodConfig | null {
  // 1. excelKolonAdi exact match
  const exactExcel = methods.find(
    (m) => m.excelKolonAdi && m.excelKolonAdi === rowName
  )
  if (exactExcel) return exactExcel

  // 2. excelKolonAdi normalized match
  const normalizedRow = normalizeTurkish(rowName)
  const normalizedExcel = methods.find(
    (m) => m.excelKolonAdi && normalizeTurkish(m.excelKolonAdi) === normalizedRow
  )
  if (normalizedExcel) return normalizedExcel

  // 3. name exact match
  const exactName = methods.find((m) => m.name === rowName)
  if (exactName) return exactName

  // 4. name normalized match
  const normalizedName = methods.find(
    (m) => normalizeTurkish(m.name) === normalizedRow
  )
  if (normalizedName) return normalizedName

  // 5. Partial match (either direction)
  const partial = methods.find((m) => {
    const normMethod = normalizeTurkish(m.name)
    const normExcel = m.excelKolonAdi
      ? normalizeTurkish(m.excelKolonAdi)
      : ""
    return (
      normalizedRow.includes(normMethod) ||
      normMethod.includes(normalizedRow) ||
      (normExcel &&
        (normalizedRow.includes(normExcel) ||
          normExcel.includes(normalizedRow)))
    )
  })
  if (partial) return partial

  return null
}

// =============================================
// EXCEL DATA PROCESSING
// =============================================

export function processExcelData(
  rows: PaymentRow[],
  methods: PaymentMethodConfig[]
): KasaCardData[] {
  // Group rows by payment method
  const grouped = new Map<
    string,
    { method: PaymentMethodConfig; toplamBorc: number; toplamKredi: number }
  >()

  for (const row of rows) {
    const method = matchPaymentMethod(row.odemeTuruAdi, methods)
    if (!method) continue

    const existing = grouped.get(method.id)
    if (existing) {
      existing.toplamBorc += row.borc
      existing.toplamKredi += row.kredi
    } else {
      grouped.set(method.id, {
        method,
        toplamBorc: row.borc,
        toplamKredi: row.kredi,
      })
    }
  }

  // Also include methods that didn't appear in the Excel (with zero values)
  for (const method of methods) {
    if (!grouped.has(method.id)) {
      grouped.set(method.id, {
        method,
        toplamBorc: 0,
        toplamKredi: 0,
      })
    }
  }

  // Calculate kasa for each method
  const results: KasaCardData[] = []

  for (const [, { method, toplamBorc, toplamKredi }] of grouped) {
    const komisyon = toplamBorc * (method.komisyonOrani / 100)
    const cekimKomisyon = toplamKredi * (method.cekimKomisyonOrani / 100)
    const netBorc = toplamBorc - komisyon
    const kalanKasa =
      method.baslangicBakiye + netBorc - toplamKredi - cekimKomisyon

    results.push({
      id: method.id,
      odemeTuruAdi: method.name,
      toplamBorc,
      toplamKredi,
      komisyon,
      komisyonOrani: method.komisyonOrani,
      cekimKomisyon,
      cekimKomisyonOrani: method.cekimKomisyonOrani,
      netBorc,
      kalanKasa,
      baslangicBakiye: method.baslangicBakiye,
    })
  }

  return results
}

// =============================================
// INITIAL DATA (before any Excel upload)
// =============================================

export function generateInitialData(
  methods: PaymentMethodConfig[]
): KasaCardData[] {
  return methods.map((method) => ({
    id: method.id,
    odemeTuruAdi: method.name,
    toplamBorc: 0,
    toplamKredi: 0,
    komisyon: 0,
    komisyonOrani: method.komisyonOrani,
    cekimKomisyon: 0,
    cekimKomisyonOrani: method.cekimKomisyonOrani,
    netBorc: 0,
    kalanKasa: method.baslangicBakiye,
    baslangicBakiye: method.baslangicBakiye,
  }))
}

// =============================================
// SUMMARY CALCULATIONS
// =============================================

export function calculateSummary(kasaData: KasaCardData[]) {
  return kasaData.reduce(
    (acc, item) => {
      acc.totalYatirim += item.toplamBorc
      acc.totalKomisyon += item.komisyon + item.cekimKomisyon
      acc.totalCekim += item.toplamKredi
      acc.totalKasa += item.kalanKasa
      acc.totalNetBorc += item.netBorc
      return acc
    },
    {
      totalYatirim: 0,
      totalKomisyon: 0,
      totalCekim: 0,
      totalKasa: 0,
      totalNetBorc: 0,
    }
  )
}

// =============================================
// TELEGRAM MESSAGE FORMATTER
// =============================================

export function formatTelegramDaily(
  kasaData: KasaCardData[],
  date?: Date
): string {
  const now = date || new Date()
  const dateStr = now.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  const timeStr = now.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const formatCurrency = (n: number) =>
    `₺${Math.abs(n).toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`

  let msg = `📊 GUN ICI YATIRIM PERFORMANSI\n`
  msg += `📅 ${dateStr} | ⏰ ${timeStr}\n`
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n\n`

  for (const item of kasaData) {
    if (item.toplamBorc === 0 && item.toplamKredi === 0) continue
    msg += `📋 ${item.odemeTuruAdi}\n`
    msg += `   💰 Yatirim: ${formatCurrency(item.toplamBorc)}\n`
    msg += `   📉 Komisyon: -${formatCurrency(item.komisyon)} (%${item.komisyonOrani})\n`
    msg += `   📤 Cekim: ${formatCurrency(item.toplamKredi)}\n`
    msg += `   🏦 Kalan: ${formatCurrency(item.kalanKasa)}\n\n`
  }

  const summary = calculateSummary(kasaData)

  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`
  msg += `💰 Toplam Yatirim: ${formatCurrency(summary.totalYatirim)}\n`
  msg += `📉 Toplam Komisyon: -${formatCurrency(summary.totalKomisyon)}\n`
  msg += `💵 Net Yatirim: ${formatCurrency(summary.totalNetBorc)}\n`
  msg += `📤 Toplam Cekim: ${formatCurrency(summary.totalCekim)}\n`
  msg += `🏦 Toplam Kalan: ${formatCurrency(summary.totalKasa)}\n`
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`

  return msg
}

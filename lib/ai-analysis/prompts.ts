/**
 * AI'dan DashboardCard.data formatinda cikti almak icin prompt'lar.
 * Tek cagri ile hem kart verisi hem analiz yorumu uretilir.
 */

export const SYSTEM_PROMPT = `Sen kidemli bir Casino Operasyonlari ve Finans Analistisin.

Gorev:
- Sana verilen ham Excel verilerini analiz et.
- Her modul icin dashboard kart verisi VE analiz yorumu uret.
- Sadece sana verilen verileri kullan, sayi uydurma.
- Turkce yaz (ASCII karakterlerle: c, g, i, o, s, u seklinde).
- SADECE JSON don. Baska metin ekleme.`

export function buildCardPrompt(
  moduleSummaries: Record<string, string>
): string {
  let prompt = `Asagidaki Excel verilerini analiz et. Her modul icin dashboard kart verisi ve analiz yorumu uret.\n\n`

  for (const [mod, summary] of Object.entries(moduleSummaries)) {
    prompt += `## ${mod}\n${summary}\n\n`
  }

  prompt += `Su JSON formatinda cevap ver. Her modul icin:

{
  "GENEL": {
    "card": {
      "mainValue": "₺X.XXX",
      "mainLabel": "Net Nakit Akisi",
      "stats": [
        { "label": "Toplam Gelir", "value": "₺X.XXX" },
        { "label": "Cekim", "value": "₺X.XXX" },
        { "label": "Net Kar", "value": "₺X.XXX" },
        { "label": "C/Y Orani", "value": "%XX" }
      ],
      "chartData": [
        { "name": "Gun 1", "value": 1234 },
        { "name": "Gun 2", "value": 5678 }
      ]
    },
    "note": "2-4 cumlelik profesyonel analiz yorumu"
  },
  "FINANS": {
    "card": {
      "mainValue": "₺XXX",
      "mainLabel": "ARPU veya ana metrik",
      "stats": [4 adet { "label": "...", "value": "..." }],
      "chartData": [gunluk veya donem bazli trend verisi]
    },
    "note": "analiz yorumu"
  }
}

Kurallar:
- mainValue: En onemli tek metrik (para birimi veya yuzde)
- mainLabel: Bu metrigin adi
- stats: Tam 4 adet stat olsun
- chartData: Varsa gunluk/donemsel trend (en az 3 nokta). Yoksa bos dizi []
- note: 2-4 cumle, profesyonel, risk/aksiyon odakli yorum
- Sadece veride karsiligi olan modulleri don
- SADECE JSON don, baska metin ekleme`

  return prompt
}

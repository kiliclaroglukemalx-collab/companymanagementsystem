export const SYSTEM_PROMPT = `Sen kidemli bir Casino Operasyonlari ve Finans Analistisin.

Gorev:
- Sana verilen KPI ozetlerini, tablo verilerini ve grafik verilerini yorumla.
- Sayi uretme, sadece sana verilen verileri kullan.
- Operasyonel dilde yaz: sakin, ozlu, profesyonel, risk/aksiyon odakli.
- Eksik veri varsa bunu acikca belirt.

Cikti kurallari:
- SADECE JSON don. Baska metin ekleme.
- Her modul icin short (2-4 cumle, max 500 karakter) ve detailed (summary + findings/risks/actions/checks) uret.
- Her listede en fazla 5 madde olsun.
- Turkce yaz (ASCII karakterlerle: c, g, i, o, s, u seklinde).`

export function buildUserPrompt(
  modulesSummary: Record<string, { kpis: { label: string; value: string }[]; tableNames: string[] }>
): string {
  let prompt = `Asagidaki modul verilerini analiz et ve her modul icin yorum uret.\n\n`

  for (const [mod, data] of Object.entries(modulesSummary)) {
    prompt += `## ${mod}\n`
    prompt += `KPI'lar:\n`
    for (const kpi of data.kpis) {
      prompt += `- ${kpi.label}: ${kpi.value}\n`
    }
    if (data.tableNames.length > 0) {
      prompt += `Tablolar: ${data.tableNames.join(", ")}\n`
    }
    prompt += `\n`
  }

  prompt += `\nHer modul icin su formatta JSON don:
{
  "MODUL_ADI": {
    "short": "2-4 cumlelik ozet yorum",
    "detailed": {
      "summary": "Genel degerlendirme",
      "findings": ["Bulgu 1", "Bulgu 2"],
      "risks": ["Risk 1", "Risk 2"],
      "actions": ["Aksiyon 1", "Aksiyon 2"],
      "checks": ["Kontrol 1", "Kontrol 2"]
    }
  }
}

Sadece yukaridaki modulleri iceren JSON don. Baska metin ekleme.`

  return prompt
}

export function buildDeepUserPrompt(
  modulesSummary: Record<string, { kpis: { label: string; value: string }[]; tableNames: string[]; topRows: string[] }>
): string {
  let prompt = `Asagidaki modul verilerini DERINLEMESINE analiz et.\n\n`

  for (const [mod, data] of Object.entries(modulesSummary)) {
    prompt += `## ${mod}\n`
    prompt += `KPI'lar:\n`
    for (const kpi of data.kpis) {
      prompt += `- ${kpi.label}: ${kpi.value}\n`
    }
    if (data.tableNames.length > 0) {
      prompt += `Tablolar: ${data.tableNames.join(", ")}\n`
    }
    if (data.topRows.length > 0) {
      prompt += `Onemli satirlar:\n`
      for (const row of data.topRows) {
        prompt += `  - ${row}\n`
      }
    }
    prompt += `\n`
  }

  prompt += `\nDerin analiz yap. Her modul icin:
- short: 3-5 cumle, detayli yorum (max 800 karakter)
- detailed.summary: Kapsamli degerlendirme (max 500 karakter)
- detailed.findings: 4-5 somut bulgu
- detailed.risks: 3-4 risk
- detailed.actions: 3-4 oncelikli aksiyon
- detailed.checks: 3-4 kontrol noktasi

JSON formati ayni:
{
  "MODUL_ADI": {
    "short": "...",
    "detailed": { "summary": "...", "findings": [...], "risks": [...], "actions": [...], "checks": [...] }
  }
}

Sadece JSON don.`

  return prompt
}

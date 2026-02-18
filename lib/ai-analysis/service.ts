import { SYSTEM_PROMPT, buildCardPrompt } from "./prompts"
import type { ModuleData, AiNote } from "./types"

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

export interface CardData {
  mainValue: string
  mainLabel: string
  stats: { label: string; value: string }[]
  chartData: { name: string; value: number }[]
}

export interface ModuleCardResult {
  card: CardData
  note: string
}

export type CardResults = Record<string, ModuleCardResult>

/**
 * Excel'den cikarilan ham ozet verilerini AI'a gonderip
 * DashboardCard formatinda yapilandirilmis veri + analiz notu alir.
 */
export async function generateCardData(
  moduleSummaries: Record<string, string>
): Promise<CardResults> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.warn("OPENAI_API_KEY not set, returning fallback")
    return buildFallback(moduleSummaries)
  }

  const model = process.env.OPENAI_MINI_MODEL || "gpt-4o-mini"
  const userPrompt = buildCardPrompt(moduleSummaries)

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 2500,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error("OpenAI API error:", response.status, errText)
      return buildFallback(moduleSummaries)
    }

    const json = await response.json()
    const content = json.choices?.[0]?.message?.content || ""
    const parsed = parseJsonResponse(content)

    if (!parsed) {
      console.error("Failed to parse AI response:", content.substring(0, 300))
      return buildFallback(moduleSummaries)
    }

    const result: CardResults = {}
    for (const [mod, data] of Object.entries(parsed)) {
      const d = data as any
      if (d?.card && d?.note) {
        result[mod] = {
          card: {
            mainValue: d.card.mainValue || "—",
            mainLabel: d.card.mainLabel || mod,
            stats: Array.isArray(d.card.stats) ? d.card.stats.slice(0, 4) : [],
            chartData: Array.isArray(d.card.chartData) ? d.card.chartData : [],
          },
          note: d.note || "",
        }
      }
    }

    return result
  } catch (error) {
    console.error("OpenAI call failed:", error)
    return buildFallback(moduleSummaries)
  }
}

function parseJsonResponse(content: string): Record<string, any> | null {
  let text = content.trim()
  const fenceMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)```/)
  if (fenceMatch) text = fenceMatch[1].trim()

  try {
    return JSON.parse(text)
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try { return JSON.parse(jsonMatch[0]) } catch { return null }
    }
    return null
  }
}

/**
 * Yapilandirilmis modul verilerinden AI analiz notlari uretir.
 * deep=true ise daha guclu model kullanilir.
 */
export async function generateNotes(params: {
  modules: Partial<Record<string, ModuleData>>
  deep?: boolean
}): Promise<Partial<Record<string, AiNote>>> {
  const { modules, deep = false } = params
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.warn("OPENAI_API_KEY not set, returning fallback notes")
    return buildNoteFallback(modules)
  }

  const model = deep
    ? (process.env.OPENAI_DEEP_MODEL || "gpt-4o")
    : (process.env.OPENAI_MINI_MODEL || "gpt-4o-mini")

  let userPrompt = `Asagidaki yapilandirilmis verileri analiz et. Her modul icin detayli analiz notu uret.\n\n`

  for (const [mod, data] of Object.entries(modules)) {
    if (!data) continue
    userPrompt += `## ${mod}\n`
    if (data.kpis?.length) {
      userPrompt += `KPI'lar: ${data.kpis.map(k => `${k.label}: ${k.value}${k.unit || ''}`).join(', ')}\n`
    }
    if (data.tables?.length) {
      for (const t of data.tables) {
        userPrompt += `Tablo (${t.title}): ${t.rows.length} satir\n`
      }
    }
    if (data.charts?.length) {
      for (const c of data.charts) {
        userPrompt += `Grafik (${c.title}): ${c.data.length} veri noktasi\n`
      }
    }
    userPrompt += `\n`
  }

  userPrompt += `Su JSON formatinda cevap ver:
{
  "MODUL_ADI": {
    "short": "1-2 cumlelik kisa ozet",
    "detailed": {
      "summary": "3-5 cumlelik genel degerlendirme",
      "findings": ["bulgu 1", "bulgu 2", "bulgu 3"],
      "risks": ["risk 1", "risk 2"],
      "actions": ["aksiyon 1", "aksiyon 2"],
      "checks": ["kontrol edilecek 1", "kontrol edilecek 2"]
    }
  }
}

Kurallar:
- Turkce yaz (ASCII: c, g, i, o, s, u)
- Sadece veride karsiligi olan modulleri don
- Profesyonel, risk/aksiyon odakli yorum yap
- SADECE JSON don, baska metin ekleme`

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: deep ? 4000 : 2000,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error("OpenAI API error:", response.status, errText)
      return buildNoteFallback(modules)
    }

    const json = await response.json()
    const content = json.choices?.[0]?.message?.content || ""
    const parsed = parseJsonResponse(content)

    if (!parsed) {
      console.error("Failed to parse AI notes response:", content.substring(0, 300))
      return buildNoteFallback(modules)
    }

    const result: Partial<Record<string, AiNote>> = {}
    for (const [mod, data] of Object.entries(parsed)) {
      const d = data as any
      if (d?.short && d?.detailed) {
        result[mod] = {
          short: d.short,
          detailed: {
            summary: d.detailed.summary || "",
            findings: Array.isArray(d.detailed.findings) ? d.detailed.findings : [],
            risks: Array.isArray(d.detailed.risks) ? d.detailed.risks : [],
            actions: Array.isArray(d.detailed.actions) ? d.detailed.actions : [],
            checks: Array.isArray(d.detailed.checks) ? d.detailed.checks : [],
          },
        }
      }
    }

    return result
  } catch (error) {
    console.error("OpenAI call for notes failed:", error)
    return buildNoteFallback(modules)
  }
}

function buildNoteFallback(
  modules: Partial<Record<string, ModuleData>>
): Partial<Record<string, AiNote>> {
  const result: Partial<Record<string, AiNote>> = {}
  for (const mod of Object.keys(modules)) {
    result[mod] = {
      short: `${mod} modulu verisi hazirlandi. AI analizi icin OPENAI_API_KEY gerekli.`,
      detailed: {
        summary: "AI analizi henuz uygulanmadi.",
        findings: ["Veri basariyla islendi"],
        risks: [],
        actions: ["OPENAI_API_KEY ortam degiskenini tanimlayin"],
        checks: [],
      },
    }
  }
  return result
}

function buildFallback(moduleSummaries: Record<string, string>): CardResults {
  const result: CardResults = {}
  for (const mod of Object.keys(moduleSummaries)) {
    result[mod] = {
      card: {
        mainValue: "—",
        mainLabel: "Veri isleniyor",
        stats: [
          { label: "Durum", value: "API anahtari gerekli" },
          { label: "Model", value: "GPT-4o-mini" },
          { label: "Maliyet", value: "~$0.003" },
          { label: "Islem", value: "Bekliyor" },
        ],
        chartData: [],
      },
      note: `${mod} modulu verisi hazirlandi. OPENAI_API_KEY ortam degiskenini Vercel'de tanimlayin.`,
    }
  }
  return result
}

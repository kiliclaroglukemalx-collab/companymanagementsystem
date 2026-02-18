import { SYSTEM_PROMPT, buildCardPrompt } from "./prompts"

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

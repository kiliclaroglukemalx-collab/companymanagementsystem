import type { ModuleData, AiNotesMap, ModuleKey } from "./types"
import { SYSTEM_PROMPT, buildUserPrompt, buildDeepUserPrompt } from "./prompts"

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

interface GenerateNotesOptions {
  modules: Partial<Record<ModuleKey, ModuleData>>
  deep?: boolean
}

function buildSummary(modules: Partial<Record<ModuleKey, ModuleData>>) {
  const summary: Record<string, { kpis: { label: string; value: string }[]; tableNames: string[]; topRows: string[] }> = {}

  for (const [mod, data] of Object.entries(modules)) {
    if (!data) continue
    summary[mod] = {
      kpis: data.kpis.map((k) => ({ label: k.label, value: `${k.value}${k.unit ? " " + k.unit : ""}` })),
      tableNames: data.tables.map((t) => t.title),
      topRows: data.tables.flatMap((t) =>
        t.rows.slice(0, 3).map((r) => {
          const vals = Object.values(r).slice(0, 4).join(" | ")
          return `${t.title}: ${vals}`
        })
      ),
    }
  }

  return summary
}

export async function generateNotes(opts: GenerateNotesOptions): Promise<AiNotesMap> {
  const { modules, deep = false } = opts

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.warn("OPENAI_API_KEY not set, returning fallback notes")
    return buildFallbackNotes(modules)
  }

  const model = deep
    ? (process.env.OPENAI_DEEP_MODEL || "gpt-4o")
    : (process.env.OPENAI_MINI_MODEL || "gpt-4o-mini")

  const summary = buildSummary(modules)
  const userPrompt = deep ? buildDeepUserPrompt(summary) : buildUserPrompt(summary)

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
        max_tokens: deep ? 3000 : 1500,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error("OpenAI API error:", response.status, errText)
      return buildFallbackNotes(modules)
    }

    const json = await response.json()
    const content = json.choices?.[0]?.message?.content || ""

    const parsed = parseJsonResponse(content)
    if (!parsed) {
      console.error("Failed to parse AI response:", content.substring(0, 200))
      return buildFallbackNotes(modules)
    }

    const result: AiNotesMap = {}
    for (const mod of Object.keys(modules)) {
      const note = parsed[mod]
      if (note && typeof note.short === "string" && note.detailed) {
        result[mod as ModuleKey] = {
          short: note.short,
          detailed: {
            summary: note.detailed.summary || "",
            findings: Array.isArray(note.detailed.findings) ? note.detailed.findings : [],
            risks: Array.isArray(note.detailed.risks) ? note.detailed.risks : [],
            actions: Array.isArray(note.detailed.actions) ? note.detailed.actions : [],
            checks: Array.isArray(note.detailed.checks) ? note.detailed.checks : [],
          },
        }
      }
    }

    return result
  } catch (error) {
    console.error("OpenAI call failed:", error)
    return buildFallbackNotes(modules)
  }
}

function parseJsonResponse(content: string): Record<string, any> | null {
  let text = content.trim()

  // Remove markdown code fences
  const fenceMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)```/)
  if (fenceMatch) text = fenceMatch[1].trim()

  try {
    return JSON.parse(text)
  } catch {
    // Try to find JSON object in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0])
      } catch {
        return null
      }
    }
    return null
  }
}

function buildFallbackNotes(modules: Partial<Record<ModuleKey, ModuleData>>): AiNotesMap {
  const result: AiNotesMap = {}

  for (const mod of Object.keys(modules) as ModuleKey[]) {
    const data = modules[mod]
    if (!data) continue

    const kpiSummary = data.kpis.map((k) => `${k.label}: ${k.value}${k.unit ? " " + k.unit : ""}`).join(", ")

    result[mod] = {
      short: `${mod} modulu icin veriler islendi. Ozet: ${kpiSummary}. Detayli AI analizi icin API anahtari gereklidir.`,
      detailed: {
        summary: `${mod} modulu verileri basariyla hesaplandi. AI yorum servisi su an kullanilamiyor.`,
        findings: [`Toplam ${data.kpis.length} KPI hesaplandi`, `${data.tables.length} tablo olusturuldu`],
        risks: ["AI yorum servisi baglantisi kontrol edilmeli"],
        actions: ["OPENAI_API_KEY ortam degiskenini kontrol edin"],
        checks: ["API anahtari gecerliligi", "Model erisim yetkisi"],
      },
    }
  }

  return result
}

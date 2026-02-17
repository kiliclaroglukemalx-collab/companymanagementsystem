import { enforceHardLimits } from "@/lib/ai-analysis/limits"
import { getStorageModuleByCanonical, resolveCanonicalModule } from "@/lib/ai-analysis/module-mapper"
import { renderModulePrompt } from "@/lib/ai-analysis/prompt-renderer"
import { getModulePrompt } from "@/lib/ai-analysis/prompts/modules"
import { ANALYST_SYSTEM_PROMPT } from "@/lib/ai-analysis/prompts/system"
import { analyzePayloadSchema, structuredAnalysisSchema } from "@/lib/ai-analysis/schema"
import type { AnalyzeServiceInput, AnalyzeServiceResult, CanonicalAiModule, StructuredAnalysis } from "@/lib/ai-analysis/types"

interface OpenAiCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
  usage?: {
    total_tokens?: number
  }
}

function fallbackAnalysis(module: CanonicalAiModule): StructuredAnalysis {
  return {
    short:
      "Veri ile uyumlu kisa yorum uretildi, ancak model yaniti dogrulanamadi. Bulgularin operasyon tarafinda kontrollu sekilde takip edilmesi onerilir.",
    detailed: {
      summary:
        "Mevcut veri seti yorumlandi. Yanitin bir kismi teknik olarak sinirlandirildigi icin sonuc olasilik diliyle sunuldu.",
      findings: [
        `${module} modulunde backend KPI ve tablolari temel alindi.`,
        "Global context ile uyumlu ve celisen noktalarin kontrol edilmesi gerekir.",
      ],
      risks: [
        "Eksik veya kapsam disi veri, yorum kalitesini dusurebilir.",
        "Anomali kaynaklari dogrulanmadan operasyon karari almak risklidir.",
      ],
      actions: [
        "Top anomali ve period farklarina gore manuel kontrol listesi calistirin.",
        "Bir sonraki periyotta ayni metrikleri tutarli formatta tekrar yukleyin.",
      ],
      checks: [
        "Dosya kapsaminin istenen periodu tam kapsayip kapsamadigini kontrol edin.",
        "Module_data ile global_context arasinda ana KPI uyumunu dogrulayin.",
      ],
    },
  }
}

function extractJsonCandidate(rawContent: string): string {
  const trimmed = rawContent.trim()
  const codeFenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (codeFenceMatch?.[1]) {
    return codeFenceMatch[1].trim()
  }

  const firstBrace = trimmed.indexOf("{")
  const lastBrace = trimmed.lastIndexOf("}")
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1)
  }

  return trimmed
}

function parseStructuredResponse(rawContent: string): StructuredAnalysis | null {
  const candidate = extractJsonCandidate(rawContent)
  try {
    const parsed = JSON.parse(candidate)
    const validated = structuredAnalysisSchema.parse(parsed)
    return {
      short: validated.short,
      detailed: {
        summary: validated.detailed.summary,
        findings: validated.detailed.findings,
        risks: validated.detailed.risks,
        actions: validated.detailed.actions,
        checks: validated.detailed.checks,
      },
    }
  } catch {
    return null
  }
}

async function callOpenAi(systemPrompt: string, userPrompt: string): Promise<{
  model: string
  tokensUsed: number
  content: string
}> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY_MISSING")
  }

  const model = process.env.OPENAI_MODEL || "gpt-4"
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 1200,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content:
            `${userPrompt}\n\n` +
            "Return ONLY valid JSON that matches the required schema. Do not add markdown.",
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`OPENAI_HTTP_${response.status}`)
  }

  const payload = (await response.json()) as OpenAiCompletionResponse
  const content = payload.choices?.[0]?.message?.content?.trim()
  if (!content) {
    throw new Error("OPENAI_EMPTY_CONTENT")
  }

  return {
    model,
    tokensUsed: payload.usage?.total_tokens ?? 0,
    content,
  }
}

export async function runAiAnalysis(input: AnalyzeServiceInput): Promise<AnalyzeServiceResult> {
  const canonicalModule = resolveCanonicalModule(input.module)
  if (!canonicalModule) {
    throw new Error("INVALID_MODULE")
  }

  const payload = analyzePayloadSchema.parse(input.payload)
  const systemPrompt = ANALYST_SYSTEM_PROMPT
  const modulePrompt = getModulePrompt(canonicalModule)
  const userPrompt = renderModulePrompt(modulePrompt, payload)
  const storageModule = getStorageModuleByCanonical(canonicalModule)

  try {
    const aiResponse = await callOpenAi(systemPrompt, userPrompt)
    const parsed = parseStructuredResponse(aiResponse.content)
    const finalAnalysis = enforceHardLimits(parsed ?? fallbackAnalysis(canonicalModule))

    return {
      module: canonicalModule,
      storageModule,
      analysis: finalAnalysis,
      prompt: { system: systemPrompt, user: userPrompt },
      model: parsed ? aiResponse.model : "fallback",
      tokensUsed: parsed ? aiResponse.tokensUsed : 0,
      provider: parsed ? "openai" : "fallback",
    }
  } catch {
    const finalAnalysis = enforceHardLimits(fallbackAnalysis(canonicalModule))
    return {
      module: canonicalModule,
      storageModule,
      analysis: finalAnalysis,
      prompt: { system: systemPrompt, user: userPrompt },
      model: "fallback",
      tokensUsed: 0,
      provider: "fallback",
    }
  }
}

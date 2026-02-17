import type { StructuredAnalysis } from "@/lib/ai-analysis/types"

export const HARD_LIMITS = {
  shortMaxChars: 600,
  detailedTotalMaxChars: 1800,
  detailedSummaryMaxChars: 500,
  listItemMaxChars: 80,
  maxListItems: 4,
} as const

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

function trimToMaxChars(value: string, maxChars: number): string {
  if (value.length <= maxChars) return value
  return value.slice(0, maxChars).trim()
}

function cleanList(items: string[]): string[] {
  return items
    .map((item) => trimToMaxChars(normalizeText(item), HARD_LIMITS.listItemMaxChars))
    .filter((item) => item.length > 0)
    .slice(0, HARD_LIMITS.maxListItems)
}

function getDetailedTotalChars(value: StructuredAnalysis["detailed"]): number {
  const listChars = [...value.findings, ...value.risks, ...value.actions, ...value.checks]
    .join("")
    .length
  return value.summary.length + listChars
}

export function enforceHardLimits(input: StructuredAnalysis): StructuredAnalysis {
  const constrained: StructuredAnalysis = {
    short: trimToMaxChars(normalizeText(input.short), HARD_LIMITS.shortMaxChars),
    detailed: {
      summary: trimToMaxChars(
        normalizeText(input.detailed.summary),
        HARD_LIMITS.detailedSummaryMaxChars
      ),
      findings: cleanList(input.detailed.findings),
      risks: cleanList(input.detailed.risks),
      actions: cleanList(input.detailed.actions),
      checks: cleanList(input.detailed.checks),
    },
  }

  const detailedChars = getDetailedTotalChars(constrained.detailed)
  if (detailedChars <= HARD_LIMITS.detailedTotalMaxChars) {
    return constrained
  }

  const overflow = detailedChars - HARD_LIMITS.detailedTotalMaxChars
  constrained.detailed.summary = trimToMaxChars(
    constrained.detailed.summary,
    Math.max(0, constrained.detailed.summary.length - overflow)
  )

  return constrained
}

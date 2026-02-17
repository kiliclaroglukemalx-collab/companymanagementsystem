import type { CanonicalAiModule, LegacyStorageModule } from "@/lib/ai-analysis/types"

const MODULE_ALIASES: Record<string, CanonicalAiModule> = {
  FINANCIAL: "FINANCIAL",
  FINANCE: "FINANCIAL",
  FINANS: "FINANCIAL",

  BONUS_BTAG: "BONUS_BTAG",
  BONUS: "BONUS_BTAG",
  BON: "BONUS_BTAG",
  BTAG: "BONUS_BTAG",
  BONUSBTAG: "BONUS_BTAG",

  CASINO: "CASINO",

  SPORTS: "SPORTS",
  SPORT: "SPORTS",
  SPOR: "SPORTS",

  PLAYERS: "PLAYERS",
  PLAYER: "PLAYERS",

  GENERAL_SIMULATION: "GENERAL_SIMULATION",
  GENERAL: "GENERAL_SIMULATION",
  GENEL: "GENERAL_SIMULATION",
  SIMULATION: "GENERAL_SIMULATION",
}

const STORAGE_MODULE_MAP: Record<CanonicalAiModule, LegacyStorageModule> = {
  FINANCIAL: "FINANS",
  BONUS_BTAG: "BON",
  CASINO: "CASINO",
  SPORTS: "SPOR",
  PLAYERS: "PLAYERS",
  GENERAL_SIMULATION: "GENEL",
}

export function normalizeModuleInput(value: string): string {
  return value.trim().replace(/[\s-]+/g, "_").toUpperCase()
}

export function resolveCanonicalModule(moduleValue: string): CanonicalAiModule | null {
  const normalized = normalizeModuleInput(moduleValue)
  return MODULE_ALIASES[normalized] ?? null
}

export function resolveStorageModule(moduleValue: string): LegacyStorageModule | null {
  const canonical = resolveCanonicalModule(moduleValue)
  if (!canonical) return null
  return STORAGE_MODULE_MAP[canonical]
}

export function getStorageModuleByCanonical(moduleValue: CanonicalAiModule): LegacyStorageModule {
  return STORAGE_MODULE_MAP[moduleValue]
}

export const SUPPORTED_CANONICAL_MODULES: CanonicalAiModule[] = [
  "FINANCIAL",
  "BONUS_BTAG",
  "CASINO",
  "SPORTS",
  "PLAYERS",
  "GENERAL_SIMULATION",
]

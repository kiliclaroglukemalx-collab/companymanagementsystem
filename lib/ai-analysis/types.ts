export type CanonicalAiModule =
  | "FINANCIAL"
  | "BONUS_BTAG"
  | "CASINO"
  | "SPORTS"
  | "PLAYERS"
  | "GENERAL_SIMULATION"

export type LegacyStorageModule =
  | "FINANS"
  | "BON"
  | "CASINO"
  | "SPOR"
  | "GENEL"
  | "PLAYERS"

export interface AnalyzePayload {
  module_data: Record<string, unknown>
  global_context?: Record<string, unknown>
  uploaded_files_context?: Array<Record<string, unknown>>
  [key: string]: unknown
}

export interface StructuredAnalysis {
  short: string
  detailed: {
    summary: string
    findings: string[]
    risks: string[]
    actions: string[]
    checks: string[]
  }
}

export interface AnalyzeServiceInput {
  module: string
  payload: AnalyzePayload
}

export interface AnalyzeServiceResult {
  module: CanonicalAiModule
  storageModule: LegacyStorageModule
  analysis: StructuredAnalysis
  prompt: {
    system: string
    user: string
  }
  model: string
  tokensUsed: number
  provider: "openai" | "fallback"
}

/* ──────────────────────────────────────────────
 *  Analytics Data Contract
 *  modules  → server-side hesaplanan veri (AI'sız)
 *  aiNotes  → AI tarafından üretilen yorumlar
 * ────────────────────────────────────────────── */

// ── Module keys ──
export const MODULE_KEYS = [
  "GENEL",
  "FINANS",
  "BON",
  "CASINO",
  "SPOR",
  "PLAYERS",
] as const

export type ModuleKey = (typeof MODULE_KEYS)[number]

export const MODULE_LABELS: Record<ModuleKey, string> = {
  GENEL: "Genel Ozet",
  FINANS: "Finansal Analiz",
  BON: "Bonus / BTag",
  CASINO: "Casino Analizi",
  SPOR: "Spor Analizi",
  PLAYERS: "Oyuncular",
}

// ── KPI ──
export interface SectionKpi {
  label: string
  value: string
  unit?: string
  trend?: "up" | "down" | "neutral"
  badge?: string
  color?: string
}

// ── Table ──
export interface TableColumn {
  key: string
  label: string
  align?: "left" | "right" | "center"
}

export interface SectionTable {
  title: string
  columns: TableColumn[]
  rows: Record<string, string | number>[]
}

// ── Chart ──
export interface ChartSeries {
  key: string
  label: string
  color: string
}

export interface SectionChart {
  type: "area" | "bar"
  title: string
  subtitle?: string
  series: ChartSeries[]
  data: Record<string, string | number>[]
}

// ── Module data (server-side, AI'sız) ──
export interface ModuleData {
  kpis: SectionKpi[]
  tables: SectionTable[]
  charts: SectionChart[]
}

// ── AI Notes (AI tarafından üretilen) ──
export interface AiNote {
  short: string
  detailed: {
    summary: string
    findings: string[]
    risks: string[]
    actions: string[]
    checks: string[]
  }
}

// ── Full analytics report (compute çıktısı) ──
export interface AnalyticsReport {
  site: string
  period: { start: string; end: string }
  modules: Partial<Record<ModuleKey, ModuleData>>
  generatedAt: string
}

// ── AI notes response ──
export type AiNotesMap = Partial<Record<ModuleKey, AiNote>>

// ── Full report (DB'ye kaydedilen nihai sonuç) ──
export interface FullReport {
  site: string
  period: { start: string; end: string }
  modules: Partial<Record<ModuleKey, ModuleData>>
  aiNotes: AiNotesMap
  generatedAt: string
}

// ── Hero section data (GENEL'den türetilir) ──
export interface HeroData {
  label: string
  value: string
  unit: string
  trend: "positive" | "negative" | "neutral"
  periodLabel: string
}

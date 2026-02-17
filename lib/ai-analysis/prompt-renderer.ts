import type { AnalyzePayload } from "@/lib/ai-analysis/types"

type RenderContext = Record<string, unknown>

type PeriodRange = {
  start: Date
  end: Date
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value ?? null, null, 2)
  } catch {
    return "null"
  }
}

function getValueForPlaceholder(value: unknown): string {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return safeJson(value)
}

function parseDateValue(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value
  if (typeof value !== "string") return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed
}

function extractPeriodFromEntry(entry: Record<string, unknown>): PeriodRange | null {
  const directStart = parseDateValue(entry.period_start)
  const directEnd = parseDateValue(entry.period_end)
  if (directStart && directEnd) {
    return { start: directStart, end: directEnd }
  }

  const periodValue = typeof entry.period === "string" ? entry.period : null
  if (!periodValue) return null

  const matches = periodValue.match(/\d{4}-\d{2}-\d{2}/g)
  if (matches && matches.length >= 2) {
    const start = parseDateValue(matches[0])
    const end = parseDateValue(matches[1])
    if (start && end) {
      return { start, end }
    }
  }

  return null
}

function buildCoverageNote(payload: AnalyzePayload): string {
  const moduleData = payload.module_data ?? {}
  const requestedStart = parseDateValue((moduleData as Record<string, unknown>).period_start)
  const requestedEnd = parseDateValue((moduleData as Record<string, unknown>).period_end)

  if (!requestedStart || !requestedEnd) {
    return "Requested period is not provided or invalid."
  }

  const files = Array.isArray(payload.uploaded_files_context) ? payload.uploaded_files_context : []
  const ranges = files
    .map((entry) => (typeof entry === "object" && entry ? extractPeriodFromEntry(entry) : null))
    .filter((range): range is PeriodRange => Boolean(range))

  if (ranges.length === 0) {
    return "Uploaded file period coverage is not provided."
  }

  let hasAnyOverlap = false
  let hasFullCoverage = false

  for (const range of ranges) {
    const overlaps = range.end >= requestedStart && range.start <= requestedEnd
    if (overlaps) {
      hasAnyOverlap = true
    }
    const fullCover = range.start <= requestedStart && range.end >= requestedEnd
    if (fullCover) {
      hasFullCoverage = true
    }
  }

  if (!hasAnyOverlap) {
    return "Requested period does not overlap with uploaded file periods; coverage is limited."
  }

  if (!hasFullCoverage) {
    return "Requested period is only partially covered by uploaded file periods."
  }

  return "Uploaded file periods cover the requested period."
}

export function buildPromptContext(payload: AnalyzePayload): RenderContext {
  const moduleData = payload.module_data ?? {}
  const globalContext = payload.global_context ?? {}
  const uploadedFilesContext = payload.uploaded_files_context ?? []
  const moduleDataRecord =
    typeof moduleData === "object" && moduleData ? (moduleData as Record<string, unknown>) : {}

  const context: RenderContext = {
    ...payload,
    ...moduleDataRecord,
    module_data: moduleData,
    module_data_json: moduleData,
    global_context: globalContext,
    global_context_json: globalContext,
    uploaded_files_context: uploadedFilesContext,
    uploaded_files_context_json: uploadedFilesContext,
    top_3_anomalies_json:
      moduleDataRecord.top_3_anomalies ??
      (payload as Record<string, unknown>).top_3_anomalies ??
      [],
    top_3_changes_vs_previous_period_json:
      moduleDataRecord.top_3_changes_vs_previous_period ??
      (payload as Record<string, unknown>).top_3_changes_vs_previous_period ??
      [],
    coverage_note: buildCoverageNote(payload),
  }

  return context
}

export function renderPrompt(template: string, context: RenderContext): string {
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_full, key: string) => {
    const value = context[key]
    return getValueForPlaceholder(value)
  })
}

export function renderModulePrompt(template: string, payload: AnalyzePayload): string {
  const context = buildPromptContext(payload)
  return renderPrompt(template, context)
}

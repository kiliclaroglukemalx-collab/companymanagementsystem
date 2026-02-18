import { z } from "zod"

// ── KPI ──
export const sectionKpiSchema = z.object({
  label: z.string(),
  value: z.string(),
  unit: z.string().optional(),
  trend: z.enum(["up", "down", "neutral"]).optional(),
  badge: z.string().optional(),
  color: z.string().optional(),
})

// ── Table ──
export const tableColumnSchema = z.object({
  key: z.string(),
  label: z.string(),
  align: z.enum(["left", "right", "center"]).optional(),
})

export const sectionTableSchema = z.object({
  title: z.string(),
  columns: z.array(tableColumnSchema),
  rows: z.array(z.record(z.union([z.string(), z.number()]))),
})

// ── Chart ──
export const chartSeriesSchema = z.object({
  key: z.string(),
  label: z.string(),
  color: z.string(),
})

export const sectionChartSchema = z.object({
  type: z.enum(["area", "bar"]),
  title: z.string(),
  subtitle: z.string().optional(),
  series: z.array(chartSeriesSchema),
  data: z.array(z.record(z.union([z.string(), z.number()]))),
})

// ── Module data ──
export const moduleDataSchema = z.object({
  kpis: z.array(sectionKpiSchema),
  tables: z.array(sectionTableSchema),
  charts: z.array(sectionChartSchema),
})

// ── AI Note ──
export const aiNoteSchema = z.object({
  short: z.string(),
  detailed: z.object({
    summary: z.string(),
    findings: z.array(z.string()),
    risks: z.array(z.string()),
    actions: z.array(z.string()),
    checks: z.array(z.string()),
  }),
})

// ── Full report ──
export const analyticsReportSchema = z.object({
  site: z.string(),
  period: z.object({ start: z.string(), end: z.string() }),
  modules: z.record(moduleDataSchema),
  generatedAt: z.string(),
})

export const aiNotesMapSchema = z.record(aiNoteSchema)

export const fullReportSchema = z.object({
  site: z.string(),
  period: z.object({ start: z.string(), end: z.string() }),
  modules: z.record(moduleDataSchema),
  aiNotes: z.record(aiNoteSchema),
  generatedAt: z.string(),
})

// ── API request schemas ──
export const computeRequestSchema = z.object({
  siteId: z.string().min(1),
  uploadIds: z.array(z.string()).min(1),
})

export const aiNoteRequestSchema = z.object({
  reportId: z.string().min(1),
})

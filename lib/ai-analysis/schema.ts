import { z } from "zod"

export const detailedAnalysisSchema = z
  .object({
    summary: z.string(),
    findings: z.array(z.string()),
    risks: z.array(z.string()),
    actions: z.array(z.string()),
    checks: z.array(z.string()),
  })
  .strict()

export const structuredAnalysisSchema = z
  .object({
    short: z.string(),
    detailed: detailedAnalysisSchema,
  })
  .strict()

export const analyzePayloadSchema = z
  .object({
    module_data: z.record(z.string(), z.unknown()),
    global_context: z.record(z.string(), z.unknown()).optional(),
    uploaded_files_context: z.array(z.record(z.string(), z.unknown())).optional(),
  })
  .passthrough()

export const analyzeRequestSchema = z
  .object({
    module: z.string().min(1),
    payload: analyzePayloadSchema,
  })
  .strict()

export type StructuredAnalysisSchema = z.infer<typeof structuredAnalysisSchema>
export type AnalyzePayloadSchema = z.infer<typeof analyzePayloadSchema>
export type AnalyzeRequestSchema = z.infer<typeof analyzeRequestSchema>

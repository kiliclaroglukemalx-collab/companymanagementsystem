import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"
import { readFileSync, existsSync } from "fs"
import { join } from "path"
import * as XLSX from "xlsx"
import { computeRequestSchema } from "@/lib/ai-analysis/schema"
import { generateCardData, type CardResults } from "@/lib/ai-analysis/service"
import { computeModules, type ParsedUpload } from "@/lib/ai-analysis/excel-parser"
import type { ModuleKey, ModuleData } from "@/lib/ai-analysis/types"

const MODULE_MAP: Record<string, string> = {
  FINANS: "FINANS",
  BON: "BON",
  CASINO: "CASINO",
  SPOR: "SPOR",
  PLAYERS: "PLAYERS",
}

function extractTextSummary(buffer: Buffer, maxRows = 30): string {
  try {
    const wb = XLSX.read(buffer, { type: "buffer" })
    const lines: string[] = []

    for (const sheetName of wb.SheetNames) {
      const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
      if (rows.length === 0) continue

      lines.push(`Sheet: ${sheetName} (${rows.length} satir)`)
      const headers = Object.keys(rows[0])
      lines.push(`Sutunlar: ${headers.join(", ")}`)

      const sample = rows.slice(0, maxRows)
      for (const row of sample) {
        const vals = headers.map((h) => `${h}: ${row[h] ?? ""}`).join(" | ")
        lines.push(vals)
      }

      if (rows.length > maxRows) {
        lines.push(`... ve ${rows.length - maxRows} satir daha`)
      }
      lines.push("")
    }

    return lines.join("\n")
  } catch (e) {
    return `[Dosya parse edilemedi: ${e instanceof Error ? e.message : "bilinmeyen hata"}]`
  }
}

function extractFromParsedSheets(parsedSheets: Record<string, Record<string, unknown>[]>, maxRows = 30): string {
  const lines: string[] = []

  for (const [sheetName, rows] of Object.entries(parsedSheets)) {
    if (!Array.isArray(rows) || rows.length === 0) continue

    lines.push(`Sheet: ${sheetName} (${rows.length} satir)`)
    const headers = Object.keys(rows[0])
    lines.push(`Sutunlar: ${headers.join(", ")}`)

    const sample = rows.slice(0, maxRows)
    for (const row of sample) {
      const vals = headers.map((h) => `${h}: ${row[h] ?? ""}`).join(" | ")
      lines.push(vals)
    }

    if (rows.length > maxRows) {
      lines.push(`... ve ${rows.length - maxRows} satir daha`)
    }
    lines.push("")
  }

  return lines.join("\n")
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 403 })
    }

    const body = await req.json()
    const parsed = computeRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Gecersiz istek", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { siteId, uploadIds } = parsed.data

    const site = await basePrisma.site.findUnique({ where: { id: siteId } })
    if (!site) {
      return NextResponse.json({ error: "Site bulunamadi" }, { status: 404 })
    }

    const uploads = await basePrisma.dataUpload.findMany({
      where: { id: { in: uploadIds }, siteId },
      include: { assignments: true },
    })

    if (uploads.length === 0) {
      return NextResponse.json({ error: "Yuklemeler bulunamadi" }, { status: 404 })
    }

    // Extract text summaries + build ParsedUpload array for details
    const moduleSummaries: Record<string, string> = {}
    const parsedUploads: ParsedUpload[] = []
    const uploadsBaseDir = process.env.VERCEL ? "/tmp" : process.cwd()
    const uploadsDir = join(uploadsBaseDir, "uploads")
    const errors: string[] = []

    for (const upload of uploads) {
      const meta = upload.metaData as Record<string, unknown> | null
      const assignedModule = (upload.assignments?.[0]?.analyticModule ||
        upload.analyticModule || "GENEL") as string
      const moduleKey = MODULE_MAP[assignedModule] || "GENEL"

      if (meta?.clientParsed && meta?.parsedSheets) {
        const sheets = meta.parsedSheets as Record<string, Record<string, unknown>[]>
        const summary = extractFromParsedSheets(sheets)

        // Rebuild buffer for computeModules
        try {
          const wb = XLSX.utils.book_new()
          for (const [name, rows] of Object.entries(sheets)) {
            const ws = XLSX.utils.json_to_sheet(rows as Record<string, unknown>[])
            XLSX.utils.book_append_sheet(wb, ws, name.substring(0, 31))
          }
          const buffer = Buffer.from(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }))
          parsedUploads.push({
            uploadId: upload.id, fileName: upload.fileName, buffer,
            assignedModule: moduleKey === "GENEL" ? null : moduleKey as ModuleKey,
          })
        } catch { /* buffer rebuild failed, details won't include this file */ }

        if (summary) {
          moduleSummaries[moduleKey] = (moduleSummaries[moduleKey] || "") + `--- ${upload.fileName} ---\n${summary}\n`
        }
      } else {
        const savedAs = meta?.savedAs as string | undefined
        if (!savedAs) { errors.push(`${upload.fileName}: dosya yolu yok`); continue }
        const filePath = join(uploadsDir, savedAs)
        if (!existsSync(filePath)) { errors.push(`${upload.fileName}: dosya bulunamadi`); continue }
        try {
          const buffer = readFileSync(filePath)
          const summary = extractTextSummary(buffer)
          parsedUploads.push({
            uploadId: upload.id, fileName: upload.fileName, buffer,
            assignedModule: moduleKey === "GENEL" ? null : moduleKey as ModuleKey,
          })
          if (summary) {
            moduleSummaries[moduleKey] = (moduleSummaries[moduleKey] || "") + `--- ${upload.fileName} ---\n${summary}\n`
          }
        } catch { errors.push(`${upload.fileName}: okunamadi`); continue }
      }
    }

    if (!moduleSummaries.GENEL) {
      moduleSummaries.GENEL = Object.entries(moduleSummaries)
        .map(([mod, s]) => `[${mod}]\n${s.substring(0, 500)}`)
        .join("\n\n")
    }

    if (Object.keys(moduleSummaries).length === 0) {
      return NextResponse.json(
        { error: "Islenebilir veri bulunamadi", details: errors },
        { status: 400 }
      )
    }

    // 1) Server-side: compute detailed module data (KPI/table/chart)
    let details: Partial<Record<string, ModuleData>> = {}
    try {
      details = computeModules(parsedUploads) as Partial<Record<string, ModuleData>>
    } catch (e) {
      console.error("computeModules error:", e)
    }

    // 2) AI: generate card summaries + analyst notes
    const cards = await generateCardData(moduleSummaries)

    // Save both to DB
    const fullResponse = { cards, details }

    const analysis = await basePrisma.aIAnalysis.create({
      data: {
        siteId,
        dataUploadId: uploads[0].id,
        analyticModule: "GENEL",
        prompt: JSON.stringify({ uploadIds, modules: Object.keys(moduleSummaries) }),
        response: JSON.stringify(fullResponse),
        model: process.env.OPENAI_MINI_MODEL || "gpt-4o-mini",
        tokensUsed: 0,
        isPublished: true,
      },
    })

    return NextResponse.json({
      success: true,
      reportId: analysis.id,
      cards,
      details,
      warnings: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error("Compute error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Bilinmeyen hata" },
      { status: 500 }
    )
  }
}

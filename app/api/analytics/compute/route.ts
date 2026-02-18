import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"
import { readFileSync, existsSync } from "fs"
import { join } from "path"
import * as XLSX from "xlsx"
import { computeRequestSchema } from "@/lib/ai-analysis/schema"
import { generateCardData, type CardResults } from "@/lib/ai-analysis/service"

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

    // Extract text summaries per module
    const moduleSummaries: Record<string, string> = {}
    const uploadsBaseDir = process.env.VERCEL ? "/tmp" : process.cwd()
    const uploadsDir = join(uploadsBaseDir, "uploads")
    const errors: string[] = []

    for (const upload of uploads) {
      const meta = upload.metaData as Record<string, unknown> | null
      const assignedModule = upload.assignments?.[0]?.analyticModule ||
        upload.analyticModule || "GENEL"

      const moduleKey = MODULE_MAP[assignedModule] || "GENEL"
      let summary = ""

      if (meta?.clientParsed && meta?.parsedSheets) {
        summary = extractFromParsedSheets(meta.parsedSheets as Record<string, Record<string, unknown>[]>)
      } else {
        const savedAs = meta?.savedAs as string | undefined
        if (!savedAs) { errors.push(`${upload.fileName}: dosya yolu yok`); continue }
        const filePath = join(uploadsDir, savedAs)
        if (!existsSync(filePath)) { errors.push(`${upload.fileName}: dosya bulunamadi`); continue }
        try {
          const buffer = readFileSync(filePath)
          summary = extractTextSummary(buffer)
        } catch { errors.push(`${upload.fileName}: okunamadi`); continue }
      }

      if (summary) {
        const header = `--- ${upload.fileName} ---\n`
        moduleSummaries[moduleKey] = (moduleSummaries[moduleKey] || "") + header + summary + "\n"
      }
    }

    // Always include GENEL as a cross-module summary
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

    // Send to AI -> get card data + notes
    const cardResults = await generateCardData(moduleSummaries)

    // Save to DB
    const analysis = await basePrisma.aIAnalysis.create({
      data: {
        siteId,
        dataUploadId: uploads[0].id,
        analyticModule: "GENEL",
        prompt: JSON.stringify({ uploadIds, modules: Object.keys(moduleSummaries) }),
        response: JSON.stringify(cardResults),
        model: process.env.OPENAI_MINI_MODEL || "gpt-4o-mini",
        tokensUsed: 0,
        isPublished: true,
      },
    })

    return NextResponse.json({
      success: true,
      reportId: analysis.id,
      cardResults,
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

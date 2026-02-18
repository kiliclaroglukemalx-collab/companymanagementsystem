import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"
import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { computeModules, type ParsedUpload } from "@/lib/ai-analysis/excel-parser"
import { computeRequestSchema } from "@/lib/ai-analysis/schema"
import type { AnalyticsReport, ModuleKey } from "@/lib/ai-analysis/types"

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

    // Read file buffers
    const uploadsBaseDir = process.env.VERCEL ? "/tmp" : process.cwd()
    const uploadsDir = join(uploadsBaseDir, "uploads")

    const parsedUploads: ParsedUpload[] = []
    const errors: string[] = []

    for (const upload of uploads) {
      const meta = upload.metaData as Record<string, unknown> | null
      const assignedModule = (upload.assignments?.[0]?.analyticModule ||
        upload.analyticModule ||
        null) as ModuleKey | null

      // Client-side parsed files: rebuild buffer from stored JSON
      if (meta?.clientParsed && meta?.parsedSheets) {
        try {
          const XLSX = require("xlsx")
          const wb = XLSX.utils.book_new()
          const sheets = meta.parsedSheets as Record<string, Record<string, unknown>[]>
          for (const [sheetName, rows] of Object.entries(sheets)) {
            const ws = XLSX.utils.json_to_sheet(rows as Record<string, unknown>[])
            XLSX.utils.book_append_sheet(wb, ws, sheetName)
          }
          const buffer = Buffer.from(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }))

          parsedUploads.push({
            uploadId: upload.id,
            fileName: upload.fileName,
            buffer,
            assignedModule: assignedModule === "UNASSIGNED" ? null : assignedModule,
          })
        } catch (err) {
          errors.push(`${upload.fileName}: client-parsed veri islenemedi`)
        }
        continue
      }

      // File-based uploads: read from disk
      const savedAs = meta?.savedAs as string | undefined
      if (!savedAs) {
        errors.push(`${upload.fileName}: dosya yolu bulunamadi`)
        continue
      }

      const filePath = join(uploadsDir, savedAs)
      if (!existsSync(filePath)) {
        errors.push(`${upload.fileName}: dosya mevcut degil`)
        continue
      }

      try {
        const buffer = readFileSync(filePath)
        parsedUploads.push({
          uploadId: upload.id,
          fileName: upload.fileName,
          buffer,
          assignedModule: assignedModule === "UNASSIGNED" ? null : assignedModule,
        })
      } catch (err) {
        errors.push(`${upload.fileName}: dosya okunamadi`)
      }
    }

    if (parsedUploads.length === 0) {
      return NextResponse.json(
        { error: "Islenebilir dosya bulunamadi", details: errors },
        { status: 400 }
      )
    }

    // Compute modules
    const modules = computeModules(parsedUploads)

    // Determine period from upload dates
    const dates = uploads.map((u) => u.createdAt).sort((a, b) => a.getTime() - b.getTime())
    const periodStart = dates[0].toISOString().split("T")[0]
    const periodEnd = dates[dates.length - 1].toISOString().split("T")[0]

    const report: AnalyticsReport = {
      site: site.name,
      period: { start: periodStart, end: periodEnd },
      modules,
      generatedAt: new Date().toISOString(),
    }

    // Save to DB
    const analysis = await basePrisma.aIAnalysis.create({
      data: {
        siteId,
        dataUploadId: uploads[0].id,
        analyticModule: "GENEL",
        prompt: JSON.stringify({ uploadIds, parsedCount: parsedUploads.length }),
        response: JSON.stringify(report),
        model: "server-compute",
        tokensUsed: 0,
        isPublished: false,
      },
    })

    return NextResponse.json({
      success: true,
      reportId: analysis.id,
      report,
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

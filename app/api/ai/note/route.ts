import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"
import { generateNotes } from "@/lib/ai-analysis/service"
import { aiNoteRequestSchema } from "@/lib/ai-analysis/schema"
import type { AnalyticsReport, FullReport } from "@/lib/ai-analysis/types"

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 403 })
    }

    const body = await req.json()
    const parsed = aiNoteRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Gecersiz istek", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { reportId } = parsed.data

    // Check for deep analysis query param
    const url = new URL(req.url)
    const deep = url.searchParams.get("deep") === "true"

    const analysis = await basePrisma.aIAnalysis.findUnique({
      where: { id: reportId },
    })

    if (!analysis) {
      return NextResponse.json({ error: "Rapor bulunamadi" }, { status: 404 })
    }

    let report: AnalyticsReport
    try {
      report = JSON.parse(analysis.response)
    } catch {
      return NextResponse.json({ error: "Rapor verisi okunamadi" }, { status: 500 })
    }

    if (!report.modules || Object.keys(report.modules).length === 0) {
      return NextResponse.json({ error: "Raporda modul verisi yok" }, { status: 400 })
    }

    const aiNotes = await generateNotes({
      modules: report.modules,
      deep,
    })

    // Merge AI notes into the report and update DB
    const fullReport: FullReport = {
      ...report,
      aiNotes,
    }

    const model = deep
      ? (process.env.OPENAI_DEEP_MODEL || "gpt-4o")
      : (process.env.OPENAI_MINI_MODEL || "gpt-4o-mini")

    await basePrisma.aIAnalysis.update({
      where: { id: reportId },
      data: {
        response: JSON.stringify(fullReport),
        model,
        tokensUsed: deep ? 5000 : 2000,
      },
    })

    return NextResponse.json({
      success: true,
      aiNotes,
      deep,
      model,
    })
  } catch (error) {
    console.error("AI note error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Bilinmeyen hata" },
      { status: 500 }
    )
  }
}

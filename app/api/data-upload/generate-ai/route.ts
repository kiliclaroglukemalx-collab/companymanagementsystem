import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"
import { runAiAnalysis } from "@/lib/ai-analysis/service"

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()

    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 403 })
    }

    const body = await req.json()
    const { uploadId, siteId, module } = body

    if (!uploadId || !siteId || !module) {
      return NextResponse.json({ error: "Eksik parametreler" }, { status: 400 })
    }

    const upload = await basePrisma.dataUpload.findUnique({
      where: { id: uploadId },
      include: {
        site: true,
        financialFlows: {
          orderBy: { date: "desc" },
          take: 30,
        }
      }
    })

    if (!upload) {
      return NextResponse.json({ error: "Yukleme bulunamadi" }, { status: 404 })
    }

    const payload = buildAnalyzePayload(upload)
    const aiResult = await runAiAnalysis({
      module,
      payload,
    })

    const analysis = await basePrisma.aIAnalysis.create({
      data: {
        siteId,
        dataUploadId: uploadId,
        analyticModule: aiResult.storageModule as any,
        prompt: JSON.stringify(aiResult.prompt),
        response: JSON.stringify(aiResult.analysis),
        tokensUsed: aiResult.tokensUsed,
        model: aiResult.model,
        isPublished: false,
      },
    })

    return NextResponse.json({
      success: true,
      analysis,
      structured: aiResult.analysis,
    })
  } catch (error) {
    console.error("AI generation error:", error)
    if (error instanceof Error && error.message === "INVALID_MODULE") {
      return NextResponse.json({ error: "Gecersiz module" }, { status: 400 })
    }
    return NextResponse.json({ error: "AI analizi olusturulamadi" }, { status: 500 })
  }
}

function buildAnalyzePayload(upload: {
  id: string
  fileName: string
  fileType: string
  createdAt: Date
  metaData: unknown
  site: { id: string; name: string }
  financialFlows: Array<{
    date: Date
    totalIncome: number
    bankFees: number
    withdrawals: number
    operatingCosts: number
    netProfit: number
    cumulativeProfit: number
  }>
}) {
  const flowCount = upload.financialFlows.length
  const totals = upload.financialFlows.reduce(
    (acc, flow) => {
      acc.totalIncome += flow.totalIncome
      acc.bankFees += flow.bankFees
      acc.withdrawals += flow.withdrawals
      acc.operatingCosts += flow.operatingCosts
      acc.netProfit += flow.netProfit
      return acc
    },
    {
      totalIncome: 0,
      bankFees: 0,
      withdrawals: 0,
      operatingCosts: 0,
      netProfit: 0,
    }
  )

  const periods = upload.financialFlows
    .map((item) => item.date.toISOString().slice(0, 10))
    .sort()

  const periodStart = periods[0] ?? upload.createdAt.toISOString().slice(0, 10)
  const periodEnd = periods[periods.length - 1] ?? upload.createdAt.toISOString().slice(0, 10)

  const moduleData: Record<string, unknown> = {
    period_start: periodStart,
    period_end: periodEnd,
    kpis_json: {
      flow_count: flowCount,
      total_income: totals.totalIncome,
      total_bank_fees: totals.bankFees,
      total_withdrawals: totals.withdrawals,
      total_operating_costs: totals.operatingCosts,
      total_net_profit: totals.netProfit,
      last_cumulative_profit: upload.financialFlows[0]?.cumulativeProfit ?? null,
    },
    tables_json: upload.financialFlows.slice(0, 10).map((item) => ({
      date: item.date.toISOString().slice(0, 10),
      total_income: item.totalIncome,
      bank_fees: item.bankFees,
      withdrawals: item.withdrawals,
      operating_costs: item.operatingCosts,
      net_profit: item.netProfit,
      cumulative_profit: item.cumulativeProfit,
    })),
    anomalies_json: [],
    meta_data: upload.metaData ?? {},
  }

  return {
    module_data: moduleData,
    global_context: {
      site_id: upload.site.id,
      site_name: upload.site.name,
      upload_id: upload.id,
      upload_created_at: upload.createdAt.toISOString(),
    },
    uploaded_files_context: [
      {
        file_name: upload.fileName,
        file_type: upload.fileType,
        period_start: periodStart,
        period_end: periodEnd,
      },
    ],
  }
}

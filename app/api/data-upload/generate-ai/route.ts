import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"
import { runAiAnalysis } from "@/lib/ai-analysis/service"
import { resolveStorageModule } from "@/lib/ai-analysis/module-mapper"

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

    const storageModule = resolveStorageModule(module)
    if (!storageModule) {
      return NextResponse.json({ error: "Gecersiz module" }, { status: 400 })
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

    const assignments = await basePrisma.dataUploadAssignment.findMany({
      where: {
        analyticModule: storageModule as any,
        dataUpload: {
          siteId,
          status: "COMPLETED",
        },
      },
      include: {
        dataUpload: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const payload = buildAnalyzePayload(upload, assignments)
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
}, assignments: Array<{
  id: string
  analyticModule: string
  fileRole: string
  dataUpload: {
    id: string
    fileName: string
    fileType: string
    createdAt: Date
    status: string
    metaData: unknown
  }
}>) {
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

  const uploadedFilesContext =
    assignments.length > 0
      ? assignments.map((assignment) => ({
          file_name: assignment.dataUpload.fileName,
          file_type: assignment.dataUpload.fileType,
          file_role: assignment.fileRole,
          module: assignment.analyticModule,
          upload_id: assignment.dataUpload.id,
          upload_status: assignment.dataUpload.status,
          upload_created_at: assignment.dataUpload.createdAt.toISOString(),
          period_start:
            typeof (assignment.dataUpload.metaData as any)?.period_start === "string"
              ? (assignment.dataUpload.metaData as any).period_start
              : typeof (assignment.dataUpload.metaData as any)?.snapshotDate === "string"
                ? (assignment.dataUpload.metaData as any).snapshotDate
                : null,
          period_end:
            typeof (assignment.dataUpload.metaData as any)?.period_end === "string"
              ? (assignment.dataUpload.metaData as any).period_end
              : typeof (assignment.dataUpload.metaData as any)?.snapshotDate === "string"
                ? (assignment.dataUpload.metaData as any).snapshotDate
                : null,
          meta_data: assignment.dataUpload.metaData ?? {},
        }))
      : [
          {
            file_name: upload.fileName,
            file_type: upload.fileType,
            file_role: "UNSPECIFIED",
            module: upload.analyticModule,
            upload_id: upload.id,
            upload_created_at: upload.createdAt.toISOString(),
            period_start: periodStart,
            period_end: periodEnd,
            meta_data: upload.metaData ?? {},
          },
        ]

  return {
    module_data: moduleData,
    global_context: {
      site_id: upload.site.id,
      site_name: upload.site.name,
      upload_id: upload.id,
      upload_created_at: upload.createdAt.toISOString(),
      assignment_count: assignments.length,
    },
    uploaded_files_context: uploadedFilesContext,
  }
}

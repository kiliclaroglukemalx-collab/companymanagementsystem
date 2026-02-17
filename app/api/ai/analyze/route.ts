import { NextRequest, NextResponse } from "next/server"
import { analyzeRequestSchema } from "@/lib/ai-analysis/schema"
import { runAiAnalysis } from "@/lib/ai-analysis/service"
import { getServerAuthContext } from "@/lib/server-auth"

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 403 })
    }

    const body = await req.json()
    const parsed = analyzeRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Gecersiz istek", details: parsed.error.flatten() }, { status: 400 })
    }

    const result = await runAiAnalysis({
      module: parsed.data.module,
      payload: parsed.data.payload,
    })

    return NextResponse.json({
      success: true,
      module: result.module,
      storageModule: result.storageModule,
      analysis: result.analysis,
      meta: {
        provider: result.provider,
        model: result.model,
        tokensUsed: result.tokensUsed,
      },
    })
  } catch (error) {
    console.error("AI analyze route error:", error)
    return NextResponse.json({ error: "AI analizi olusturulamadi" }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    if (!auth) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
    }

    const url = new URL(req.url)
    const siteId = url.searchParams.get("siteId")

    if (!siteId) {
      return NextResponse.json({ error: "siteId gerekli" }, { status: 400 })
    }

    const analysis = await basePrisma.aIAnalysis.findFirst({
      where: {
        siteId,
        analyticModule: "GENEL",
      },
      orderBy: { createdAt: "desc" },
    })

    if (!analysis) {
      return NextResponse.json({ cardResults: null })
    }

    try {
      const parsed = JSON.parse(analysis.response)
      // Support both old format (flat cardResults) and new format ({ cards, details })
      const cards = parsed.cards || parsed
      const details = parsed.details || null

      return NextResponse.json({
        cardResults: cards,
        details,
        reportId: analysis.id,
        generatedAt: analysis.createdAt,
      })
    } catch {
      return NextResponse.json({ cardResults: null, details: null })
    }
  } catch (error) {
    console.error("Latest analytics error:", error)
    return NextResponse.json(
      { error: "Bilinmeyen hata" },
      { status: 500 }
    )
  }
}

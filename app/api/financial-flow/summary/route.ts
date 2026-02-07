import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    
    if (!auth) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const range = searchParams.get("range") || "monthly"

    // Determine date range
    const now = new Date()
    let startDate: Date
    
    if (range === "daily") {
      // Today
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    } else {
      // This month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    // Get financial flows based on role
    let whereClause: any = {
      date: {
        gte: startDate,
      }
    }

    // If not SUPER_ADMIN, filter by site
    if (auth.role !== "SUPER_ADMIN") {
      whereClause.siteId = auth.siteId
    }

    const flows = await basePrisma.financialFlow.findMany({
      where: whereClause,
      orderBy: {
        date: "desc"
      }
    })

    // Calculate summary
    const summary = flows.reduce(
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
        cumulativeProfit: 0,
        lastUpdated: new Date().toISOString(),
      }
    )

    // Get latest cumulative profit
    if (flows.length > 0) {
      summary.cumulativeProfit = flows[0].cumulativeProfit
    }

    return NextResponse.json({
      summary,
      range,
      recordCount: flows.length,
    })
  } catch (error) {
    console.error("Get financial flow summary error:", error)
    return NextResponse.json(
      { error: "Finansal veri alınamadı" },
      { status: 500 }
    )
  }
}

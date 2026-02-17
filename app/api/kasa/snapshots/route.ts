import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    if (!auth) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const siteId = searchParams.get("siteId")
    const month = searchParams.get("month") // YYYY-MM format
    const dateStr = searchParams.get("date") // YYYY-MM-DD for specific day

    if (!siteId) {
      return NextResponse.json(
        { error: "siteId parametresi gerekli" },
        { status: 400 }
      )
    }

    // Non-super-admins can only see their own site
    if (auth.role !== "SUPER_ADMIN" && auth.siteId !== siteId) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    let startDate: Date
    let endDate: Date

    if (dateStr) {
      // Specific day
      startDate = new Date(dateStr + "T00:00:00Z")
      endDate = new Date(dateStr + "T23:59:59Z")
    } else if (month) {
      // Entire month
      const [year, mon] = month.split("-").map(Number)
      startDate = new Date(Date.UTC(year, mon - 1, 1))
      endDate = new Date(Date.UTC(year, mon, 0, 23, 59, 59))
    } else {
      // Default: current month
      const now = new Date()
      startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1))
      endDate = new Date(
        Date.UTC(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
      )
    }

    const snapshots = await basePrisma.kasaSnapshot.findMany({
      where: {
        siteId,
        snapshotDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { snapshotDate: "asc" },
    })

    return NextResponse.json({ snapshots })
  } catch (error) {
    console.error("Get kasa snapshots error:", error)
    return NextResponse.json(
      { error: "Kasa verileri alınamadı" },
      { status: 500 }
    )
  }
}

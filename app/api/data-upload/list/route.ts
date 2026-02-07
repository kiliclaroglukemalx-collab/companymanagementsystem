import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    
    // Only SUPER_ADMIN can view uploads
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 403 }
      )
    }

    const uploads = await basePrisma.dataUpload.findMany({
      include: {
        site: {
          select: {
            name: true,
          }
        },
        _count: {
          select: {
            aiAnalyses: true,
            financialFlows: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 50,
    })

    return NextResponse.json({
      uploads,
    })
  } catch (error) {
    console.error("List uploads error:", error)
    return NextResponse.json(
      { error: "Yüklemeler listelenemedi" },
      { status: 500 }
    )
  }
}

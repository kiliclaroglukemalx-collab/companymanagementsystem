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

    let sites
    
    if (auth.role === "SUPER_ADMIN") {
      // Super admin can see all sites
      sites = await basePrisma.site.findMany({
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: {
              users: true,
              departments: true,
            }
          }
        }
      })
    } else {
      // Others can only see their own site
      sites = await basePrisma.site.findMany({
        where: { id: auth.siteId },
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: {
              users: true,
              departments: true,
            }
          }
        }
      })
    }

    return NextResponse.json({
      sites,
    })
  } catch (error) {
    console.error("Get sites error:", error)
    return NextResponse.json(
      { error: "Siteler listelenemedi" },
      { status: 500 }
    )
  }
}

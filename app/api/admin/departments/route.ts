import { NextResponse } from "next/server"
import { basePrisma as prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifySessionToken, AUTH_COOKIE } from "@/lib/auth"

async function getServerSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE)?.value
  
  if (!token) return null
  
  try {
    const payload = await verifySessionToken(token)
    return payload ? { user: { id: payload.userId } } : null
  } catch {
    return null
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get("siteId")

    const where = siteId ? { siteId } : {}

    const departments = await prisma.department.findMany({
      where,
      orderBy: { name: "asc" },
      include: {
        site: {
          select: { name: true },
        },
      },
    })

    return NextResponse.json({ departments })
  } catch (error) {
    console.error("Failed to fetch departments:", error)
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    )
  }
}

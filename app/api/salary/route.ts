import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/server-auth"

// GET - Kullanıcının maaş bilgisini getir
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    // Admin veya manager ise başka kullanıcıların maaşını görebilir
    const canViewOthers = currentUser.role === "SUPER_ADMIN" || 
                          currentUser.role === "ADMIN" || 
                          currentUser.role === "MANAGER"

    const targetUserId = userId && canViewOthers ? userId : currentUser.id

    const salary = await prisma.userSalary.findUnique({
      where: { userId: targetUserId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ salary })
  } catch (error) {
    console.error("Error fetching salary:", error)
    return NextResponse.json(
      { error: "Failed to fetch salary" },
      { status: 500 }
    )
  }
}

// POST - Maaş bilgisi oluştur/güncelle (sadece admin ve manager)
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Yetki kontrolü
    if (currentUser.role !== "SUPER_ADMIN" && 
        currentUser.role !== "ADMIN" && 
        currentUser.role !== "MANAGER") {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { userId, monthlySalary, currency = "TRY" } = body

    if (!userId || !monthlySalary) {
      return NextResponse.json(
        { error: "userId ve monthlySalary gerekli" },
        { status: 400 }
      )
    }

    // Maaş bilgisi varsa güncelle, yoksa oluştur
    const salary = await prisma.userSalary.upsert({
      where: { userId },
      update: {
        monthlySalary,
        currency
      },
      create: {
        userId,
        monthlySalary,
        currency
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ salary })
  } catch (error) {
    console.error("Error updating salary:", error)
    return NextResponse.json(
      { error: "Failed to update salary" },
      { status: 500 }
    )
  }
}

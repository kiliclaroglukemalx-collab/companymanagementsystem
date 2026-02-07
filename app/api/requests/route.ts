import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/server-auth"

// GET - Kullanıcının taleplerini getir (kendi talepleri veya onaylaması gerekenler)
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const view = searchParams.get("view") || "my-requests" // "my-requests" veya "to-approve"

    if (view === "to-approve") {
      // Onaylaması gereken talepler
      const requests = await prisma.request.findMany({
        where: {
          approverId: currentUser.id,
          status: "PENDING"
        },
        include: {
          requestedBy: {
            select: {
              id: true,
              name: true,
              email: true,
              department: {
                select: {
                  id: true,
                  name: true
                }
              },
              salary: true
            }
          },
          leaveRequest: true,
          advanceRequest: true
        },
        orderBy: {
          createdAt: "desc"
        }
      })

      return NextResponse.json({ requests })
    } else {
      // Kendi talepleri
      const requests = await prisma.request.findMany({
        where: {
          requestedById: currentUser.id
        },
        include: {
          approver: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          leaveRequest: true,
          advanceRequest: true
        },
        orderBy: {
          createdAt: "desc"
        }
      })

      return NextResponse.json({ requests })
    }
  } catch (error) {
    console.error("Error fetching requests:", error)
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    )
  }
}

// POST - Yeni talep oluştur
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { type, reason, leaveData, advanceData } = body

    // Talep türüne göre onaylayıcıyı belirle
    let approverId: string | null = null

    if (type === "ADVANCE") {
      // Avans talepleri direkt Finans Müdürü'ne gider
      const financeManager = await prisma.user.findFirst({
        where: {
          siteId: currentUser.siteId,
          department: {
            name: {
              contains: "Finans",
              mode: "insensitive"
            }
          },
          role: "MANAGER"
        }
      })

      if (!financeManager) {
        return NextResponse.json(
          { error: "Finans Müdürü bulunamadı" },
          { status: 400 }
        )
      }

      approverId = financeManager.id

      // Avans miktarı kontrolü
      const userSalary = await prisma.userSalary.findUnique({
        where: { userId: currentUser.id }
      })

      if (!userSalary) {
        return NextResponse.json(
          { error: "Maaş bilgisi bulunamadı" },
          { status: 400 }
        )
      }

      if (advanceData.amount > userSalary.monthlySalary) {
        return NextResponse.json(
          { error: "Avans miktarı maaşınızı aşamaz" },
          { status: 400 }
        )
      }
    } else if (type === "LEAVE" || type === "OVERTIME") {
      // İzin/Mesai talepleri Birim Müdürü'ne gider
      if (!currentUser.departmentId) {
        return NextResponse.json(
          { error: "Birim bilgisi bulunamadı" },
          { status: 400 }
        )
      }

      const departmentManager = await prisma.user.findFirst({
        where: {
          departmentId: currentUser.departmentId,
          role: "MANAGER"
        }
      })

      if (!departmentManager) {
        return NextResponse.json(
          { error: "Birim Müdürü bulunamadı" },
          { status: 400 }
        )
      }

      approverId = departmentManager.id
    }

    // Talebi oluştur
    const newRequest = await prisma.request.create({
      data: {
        type,
        requestedById: currentUser.id,
        approverId,
        reason,
        leaveRequest: (type === "LEAVE" || type === "OVERTIME") && leaveData ? {
          create: {
            leaveType: leaveData.leaveType,
            startDate: new Date(leaveData.startDate),
            endDate: new Date(leaveData.endDate),
            days: leaveData.days
          }
        } : undefined,
        advanceRequest: type === "ADVANCE" && advanceData ? {
          create: {
            amount: advanceData.amount,
            userSalary: (await prisma.userSalary.findUnique({
              where: { userId: currentUser.id }
            }))?.monthlySalary || 0
          }
        } : undefined
      },
      include: {
        approver: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        leaveRequest: true,
        advanceRequest: true
      }
    })

    return NextResponse.json({ request: newRequest }, { status: 201 })
  } catch (error) {
    console.error("Error creating request:", error)
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 }
    )
  }
}

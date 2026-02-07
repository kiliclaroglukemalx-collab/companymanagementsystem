import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
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

// POST - Duyuruyu okundu olarak işaretle
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: announcementId } = params

    // Zaten okunmuş mu kontrol et
    const existing = await prisma.announcementRead.findUnique({
      where: {
        announcementId_userId: {
          announcementId,
          userId: session.user.id,
        },
      },
    })

    if (existing) {
      return NextResponse.json({ readRecord: existing })
    }

    // Okunma kaydı oluştur
    const readRecord = await prisma.announcementRead.create({
      data: {
        announcementId,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ readRecord }, { status: 201 })
  } catch (error) {
    console.error("Failed to mark announcement as read:", error)
    return NextResponse.json(
      { error: "Failed to mark announcement as read" },
      { status: 500 }
    )
  }
}

// GET - Duyuru okunma raporunu getir (Sadece Admin)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id: announcementId } = params

    // Duyuruyu getir
    const announcement = await prisma.announcement.findUnique({
      where: { id: announcementId },
      include: {
        targetSite: { select: { name: true } },
        targetDepartment: { select: { name: true } },
      },
    })

    if (!announcement) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      )
    }

    // Hedef kullanıcıları bul
    let targetUsers: any[] = []

    if (announcement.targetType === "ALL") {
      targetUsers = await prisma.user.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          site: { select: { name: true } },
          department: { select: { name: true } },
        },
      })
    } else if (announcement.targetType === "ADMIN_ONLY") {
      targetUsers = await prisma.user.findMany({
        where: {
          isActive: true,
          role: {
            in: announcement.targetRole
              ? [announcement.targetRole]
              : ["SUPER_ADMIN", "ADMIN", "MANAGER"],
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          site: { select: { name: true } },
          department: { select: { name: true } },
        },
      })
    } else if (announcement.targetType === "STAFF_ONLY") {
      targetUsers = await prisma.user.findMany({
        where: {
          isActive: true,
          role: "STAFF",
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          site: { select: { name: true } },
          department: { select: { name: true } },
        },
      })
    } else if (announcement.targetType === "SITE_SPECIFIC" && announcement.targetSiteId) {
      targetUsers = await prisma.user.findMany({
        where: {
          isActive: true,
          siteId: announcement.targetSiteId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          site: { select: { name: true } },
          department: { select: { name: true } },
        },
      })
    } else if (
      announcement.targetType === "DEPARTMENT_SPECIFIC" &&
      announcement.targetDepartmentId
    ) {
      targetUsers = await prisma.user.findMany({
        where: {
          isActive: true,
          departmentId: announcement.targetDepartmentId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          site: { select: { name: true } },
          department: { select: { name: true } },
        },
      })
    } else if (announcement.targetType === "ROLE_SPECIFIC" && announcement.targetRole) {
      targetUsers = await prisma.user.findMany({
        where: {
          isActive: true,
          role: announcement.targetRole,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          site: { select: { name: true } },
          department: { select: { name: true } },
        },
      })
    }

    // Okunma kayıtlarını getir
    const readRecords = await prisma.announcementRead.findMany({
      where: { announcementId },
      include: {
        announcement: { select: { title: true } },
      },
    })

    // Okuyan ve okumayan kullanıcıları ayır
    const readUserIds = new Set(readRecords.map((r) => r.userId))
    const usersWhoRead = targetUsers.filter((u) => readUserIds.has(u.id))
    const usersWhoDidNotRead = targetUsers.filter((u) => !readUserIds.has(u.id))

    // Okunma kayıtlarını kullanıcı bilgileriyle zenginleştir
    const enrichedReadRecords = readRecords.map((record) => {
      const user = usersWhoRead.find((u) => u.id === record.userId)
      return {
        ...record,
        user,
      }
    })

    return NextResponse.json({
      announcement,
      totalTargetUsers: targetUsers.length,
      readCount: usersWhoRead.length,
      unreadCount: usersWhoDidNotRead.length,
      usersWhoRead: enrichedReadRecords,
      usersWhoDidNotRead,
    })
  } catch (error) {
    console.error("Failed to get announcement read report:", error)
    return NextResponse.json(
      { error: "Failed to get announcement read report" },
      { status: 500 }
    )
  }
}

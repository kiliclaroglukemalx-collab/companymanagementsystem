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

// GET - Kullanıcıya göre duyuruları getir
export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get("showAll") === "true" // Admin için tüm duyurular

    // Kullanıcı bilgilerini al
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        site: true,
        department: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Admin tüm duyuruları görebilir
    if (showAll && (user.role === "SUPER_ADMIN" || user.role === "ADMIN")) {
      const announcements = await prisma.announcement.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          targetSite: { select: { name: true } },
          targetDepartment: { select: { name: true } },
          _count: {
            select: { readRecords: true },
          },
        },
      })
      return NextResponse.json({ announcements })
    }

    // Kullanıcı için filtrelenmiş duyurular
    const now = new Date()
    const announcements = await prisma.announcement.findMany({
      where: {
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gte: now } },
        ],
        AND: [
          {
            OR: [
              // Tüm kullanıcılar
              { targetType: "ALL" },
              // Sadece adminler
              {
                targetType: "ADMIN_ONLY",
                AND: [
                  {
                    OR: [
                      { targetRole: user.role },
                      { targetRole: null },
                    ],
                  },
                ],
              },
              // Sadece personel
              {
                targetType: "STAFF_ONLY",
                targetRole: user.role === "STAFF" ? user.role : undefined,
              },
              // Belirli site
              {
                targetType: "SITE_SPECIFIC",
                targetSiteId: user.siteId,
              },
              // Belirli birim
              {
                targetType: "DEPARTMENT_SPECIFIC",
                targetDepartmentId: user.departmentId || undefined,
              },
              // Belirli rol
              {
                targetType: "ROLE_SPECIFIC",
                targetRole: user.role,
              },
            ],
          },
        ],
      },
      orderBy: [
        { severity: "desc" }, // CRITICAL önce
        { createdAt: "desc" },
      ],
      include: {
        readRecords: {
          where: { userId: user.id },
          select: { readAt: true },
        },
      },
    })

    // Kullanıcı tercihlerini kontrol et
    const preferences = await prisma.userNotificationPreference.findUnique({
      where: { userId: user.id },
    })

    // Tercihlere göre filtrele
    const filteredAnnouncements = announcements.filter((ann) => {
      // Kritik duyurular her zaman gösterilir
      if (ann.severity === "CRITICAL") return true

      // Popup kapalıysa ve popup olarak gösterilecekse, gösterme
      if (preferences?.disablePopups && ann.showAsPopup) return false

      // Bilgi bildirimleri kapalıysa
      if (preferences?.disableInfoNotifications && ann.severity === "INFO") return false

      // Uyarı bildirimleri kapalıysa
      if (preferences?.disableWarningNotifications && ann.severity === "WARNING") return false

      return true
    })

    return NextResponse.json({ announcements: filteredAnnouncements })
  } catch (error) {
    console.error("Failed to fetch announcements:", error)
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 }
    )
  }
}

// POST - Yeni duyuru oluştur (Sadece Admin)
export async function POST(request: Request) {
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

    const body = await request.json()
    const {
      title,
      content,
      severity,
      targetType,
      targetSiteId,
      targetDepartmentId,
      targetRole,
      showAsPopup,
      displayMode,
      activeDays,
      removeOnRead,
      expiresAt,
    } = body

    // Validasyon
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      )
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        severity: severity || "INFO",
        targetType: targetType || "ALL",
        targetSiteId: targetSiteId || null,
        targetDepartmentId: targetDepartmentId || null,
        targetRole: targetRole || null,
        showAsPopup: showAsPopup || false,
        displayMode: displayMode || "ONCE",
        activeDays: activeDays || [],
        removeOnRead: removeOnRead ?? true,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        createdByUserId: user.id,
      },
    })

    return NextResponse.json({ announcement }, { status: 201 })
  } catch (error) {
    console.error("Failed to create announcement:", error)
    return NextResponse.json(
      { error: "Failed to create announcement" },
      { status: 500 }
    )
  }
}

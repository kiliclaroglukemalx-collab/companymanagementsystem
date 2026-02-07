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

// GET - Kullanıcının bildirim tercihlerini getir
export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let preferences = await prisma.userNotificationPreference.findUnique({
      where: { userId: session.user.id },
    })

    // Yoksa varsayılan oluştur
    if (!preferences) {
      preferences = await prisma.userNotificationPreference.create({
        data: {
          userId: session.user.id,
          disableInfoNotifications: false,
          disableWarningNotifications: false,
          disablePopups: false,
        },
      })
    }

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error("Failed to fetch notification preferences:", error)
    return NextResponse.json(
      { error: "Failed to fetch notification preferences" },
      { status: 500 }
    )
  }
}

// PATCH - Kullanıcının bildirim tercihlerini güncelle
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { disableInfoNotifications, disableWarningNotifications, disablePopups } = body

    const preferences = await prisma.userNotificationPreference.upsert({
      where: { userId: session.user.id },
      update: {
        disableInfoNotifications:
          disableInfoNotifications !== undefined
            ? disableInfoNotifications
            : undefined,
        disableWarningNotifications:
          disableWarningNotifications !== undefined
            ? disableWarningNotifications
            : undefined,
        disablePopups: disablePopups !== undefined ? disablePopups : undefined,
      },
      create: {
        userId: session.user.id,
        disableInfoNotifications: disableInfoNotifications || false,
        disableWarningNotifications: disableWarningNotifications || false,
        disablePopups: disablePopups || false,
      },
    })

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error("Failed to update notification preferences:", error)
    return NextResponse.json(
      { error: "Failed to update notification preferences" },
      { status: 500 }
    )
  }
}

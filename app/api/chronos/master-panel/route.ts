import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// Get Master Panel settings
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get or create Master Panel settings
    let settings = await prisma.masterPanelSettings.findFirst({
      where: { siteId: user.siteId },
    })

    if (!settings) {
      // Create default settings
      settings = await prisma.masterPanelSettings.create({
        data: {
          siteId: user.siteId,
          minEditableHour: 6,
          maxEditableHour: 23,
          requiresApproval: true,
          editingDurationMinutes: 30,
          sessionTimeoutMinutes: 60,
        },
      })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Error fetching master panel settings:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Update Master Panel settings
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Only super admins can update Master Panel settings
    if (user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Only Master Panel can update settings" },
        { status: 403 }
      )
    }

    const { minEditableHour, maxEditableHour, requiresApproval, editingDurationMinutes, sessionTimeoutMinutes } =
      await req.json()

    const settings = await prisma.masterPanelSettings.upsert({
      where: {
        siteId: user.siteId,
      },
      update: {
        minEditableHour,
        maxEditableHour,
        requiresApproval,
        editingDurationMinutes,
        sessionTimeoutMinutes,
      },
      create: {
        siteId: user.siteId,
        minEditableHour,
        maxEditableHour,
        requiresApproval,
        editingDurationMinutes,
        sessionTimeoutMinutes: sessionTimeoutMinutes || 60,
      },
    })

    return NextResponse.json({
      success: true,
      settings,
      message: "Master Panel settings updated successfully",
    })
  } catch (error) {
    console.error("Error updating master panel settings:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

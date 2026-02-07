import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// Check current user's editing permission status
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

    // Only managers can have editing permissions
    if (user.role !== "MANAGER" && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      return NextResponse.json({
        hasPermission: false,
        message: "Only managers can request editing permissions",
      })
    }

    // Find active approval for this user
    const activeApproval = await prisma.shiftApprovalRequest.findFirst({
      where: {
        requestedById: user.id,
        status: "APPROVED",
        expiresAt: {
          gt: new Date(), // Not expired yet
        },
      },
      orderBy: {
        expiresAt: "desc",
      },
    })

    if (activeApproval) {
      return NextResponse.json({
        hasPermission: true,
        expiresAt: activeApproval.expiresAt,
        allowedStartHour: activeApproval.requestedStartHour,
        allowedEndHour: activeApproval.requestedEndHour,
        approvalId: activeApproval.id,
      })
    }

    // Get Master Panel settings
    const masterSettings = await prisma.masterPanelSettings.findFirst({
      where: { siteId: user.siteId },
    })

    return NextResponse.json({
      hasPermission: false,
      masterSettings: masterSettings || {
        minEditableHour: 6,
        maxEditableHour: 23,
        requiresApproval: true,
      },
    })
  } catch (error) {
    console.error("Error checking editing permission:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

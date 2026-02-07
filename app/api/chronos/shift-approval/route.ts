import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// Request approval from Master Panel to edit shifts
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { reason, requestedStartHour, requestedEndHour } = await req.json()

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { department: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Only managers can request shift editing approval
    if (user.role !== "MANAGER" && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only managers can request shift editing approval" },
        { status: 403 }
      )
    }

    // Create shift approval request
    const approvalRequest = await prisma.shiftApprovalRequest.create({
      data: {
        requestedById: user.id,
        siteId: user.siteId,
        departmentId: user.departmentId,
        reason,
        requestedStartHour,
        requestedEndHour,
        status: "PENDING",
      },
      include: {
        requestedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      request: approvalRequest,
      message: "Approval request sent to Master Panel",
    })
  } catch (error) {
    console.error("Error creating shift approval request:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Get pending approval requests (for Master Panel)
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

    // Only super admins can view all requests
    if (user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Only Master Panel can view approval requests" },
        { status: 403 }
      )
    }

    const requests = await prisma.shiftApprovalRequest.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        requestedBy: {
          select: {
            name: true,
            email: true,
            department: {
              select: {
                name: true,
              },
            },
          },
        },
        site: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ requests })
  } catch (error) {
    console.error("Error fetching approval requests:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

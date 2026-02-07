import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// Approve or reject shift editing request
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { action } = await req.json() // 'approve' or 'reject'

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Only super admins (Master Panel) can approve/reject
    if (user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Only Master Panel can approve/reject requests" },
        { status: 403 }
      )
    }

    const request = await prisma.shiftApprovalRequest.findUnique({
      where: { id: params.id },
    })

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    if (request.status !== "PENDING") {
      return NextResponse.json(
        { error: "Request already processed" },
        { status: 400 }
      )
    }

    if (action === "approve") {
      // Approve and grant 30-minute editing permission
      const updatedRequest = await prisma.shiftApprovalRequest.update({
        where: { id: params.id },
        data: {
          status: "APPROVED",
          approvedById: user.id,
          approvedAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
        },
      })

      return NextResponse.json({
        success: true,
        message: "Request approved. Manager has 30 minutes to edit shifts.",
        request: updatedRequest,
      })
    } else if (action === "reject") {
      const updatedRequest = await prisma.shiftApprovalRequest.update({
        where: { id: params.id },
        data: {
          status: "REJECTED",
          approvedById: user.id,
          approvedAt: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        message: "Request rejected.",
        request: updatedRequest,
      })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error processing approval request:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

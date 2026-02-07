import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/server-auth"

// PATCH - Talebi onayla/reddet
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: requestId } = await params
    const body = await request.json()
    const { action, rejectionReason } = body // action: "approve" veya "reject"

    // Talebi getir
    const existingRequest = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        leaveRequest: true,
        advanceRequest: true
      }
    })

    if (!existingRequest) {
      return NextResponse.json(
        { error: "Talep bulunamadı" },
        { status: 404 }
      )
    }

    // Onaylayıcı kontrolü
    if (existingRequest.approverId !== currentUser.id) {
      return NextResponse.json(
        { error: "Bu talebi onaylama yetkiniz yok" },
        { status: 403 }
      )
    }

    // Durum kontrolü
    if (existingRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: "Bu talep zaten işleme alınmış" },
        { status: 400 }
      )
    }

    if (action === "approve") {
      // Onayla
      const updatedRequest = await prisma.request.update({
        where: { id: requestId },
        data: {
          status: "APPROVED",
          approvedAt: new Date()
        },
        include: {
          requestedBy: true,
          leaveRequest: true,
          advanceRequest: true
        }
      })

      // İzin/Mesai talebiyse takvime yansıt
      if (
        (existingRequest.type === "LEAVE" || existingRequest.type === "OVERTIME") &&
        existingRequest.leaveRequest
      ) {
        // Mesai takvimine yansıtma işlemi
        // Bu kısım ShiftCalendar ile entegre olacak
        await prisma.leaveRequest.update({
          where: { id: existingRequest.leaveRequest.id },
          data: {
            isReflectedToCalendar: true,
            reflectedAt: new Date()
          }
        })
        
        // TODO: Burada ShiftCalendar'a entry eklenebilir
        // Şu an için sadece flag'i set ediyoruz
      }

      return NextResponse.json({
        request: updatedRequest,
        message: "Talep onaylandı"
      })
    } else if (action === "reject") {
      // Reddet
      const updatedRequest = await prisma.request.update({
        where: { id: requestId },
        data: {
          status: "REJECTED",
          rejectedAt: new Date(),
          rejectionReason: rejectionReason || "Sebep belirtilmedi"
        },
        include: {
          requestedBy: true,
          leaveRequest: true,
          advanceRequest: true
        }
      })

      return NextResponse.json({
        request: updatedRequest,
        message: "Talep reddedildi"
      })
    } else {
      return NextResponse.json(
        { error: "Geçersiz işlem" },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Error updating request:", error)
    return NextResponse.json(
      { error: "Failed to update request" },
      { status: 500 }
    )
  }
}

// DELETE - Talebi iptal et (sadece talep eden kişi yapabilir)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: requestId } = await params

    // Talebi getir
    const existingRequest = await prisma.request.findUnique({
      where: { id: requestId }
    })

    if (!existingRequest) {
      return NextResponse.json(
        { error: "Talep bulunamadı" },
        { status: 404 }
      )
    }

    // Talep eden kişi kontrolü
    if (existingRequest.requestedById !== currentUser.id) {
      return NextResponse.json(
        { error: "Bu talebi iptal etme yetkiniz yok" },
        { status: 403 }
      )
    }

    // Durum kontrolü - sadece bekleyen talepler iptal edilebilir
    if (existingRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: "Sadece bekleyen talepler iptal edilebilir" },
        { status: 400 }
      )
    }

    // İptal et
    await prisma.request.update({
      where: { id: requestId },
      data: {
        status: "CANCELLED"
      }
    })

    return NextResponse.json({
      message: "Talep iptal edildi"
    })
  } catch (error) {
    console.error("Error cancelling request:", error)
    return NextResponse.json(
      { error: "Failed to cancel request" },
      { status: 500 }
    )
  }
}

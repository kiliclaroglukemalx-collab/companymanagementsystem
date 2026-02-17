import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getServerAuthContext()
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const { id } = await params
    const body = await req.json()

    const existing = await basePrisma.paymentMethod.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Ödeme yöntemi bulunamadı" },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}

    if (body.name !== undefined) updateData.name = body.name.trim()
    if (body.excelKolonAdi !== undefined)
      updateData.excelKolonAdi = body.excelKolonAdi.trim()
    if (body.komisyonOrani !== undefined)
      updateData.komisyonOrani = parseFloat(body.komisyonOrani) || 0
    if (body.cekimKomisyonOrani !== undefined)
      updateData.cekimKomisyonOrani =
        parseFloat(body.cekimKomisyonOrani) || 0
    if (body.baslangicBakiye !== undefined)
      updateData.baslangicBakiye = parseFloat(body.baslangicBakiye) || 0
    if (body.isActive !== undefined) updateData.isActive = body.isActive

    const method = await basePrisma.paymentMethod.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ method })
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "Bu isimde bir ödeme yöntemi zaten mevcut" },
        { status: 409 }
      )
    }
    console.error("Update payment method error:", error)
    return NextResponse.json(
      { error: "Ödeme yöntemi güncellenemedi" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getServerAuthContext()
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const { id } = await params

    const existing = await basePrisma.paymentMethod.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Ödeme yöntemi bulunamadı" },
        { status: 404 }
      )
    }

    // Soft delete
    await basePrisma.paymentMethod.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete payment method error:", error)
    return NextResponse.json(
      { error: "Ödeme yöntemi silinemedi" },
      { status: 500 }
    )
  }
}

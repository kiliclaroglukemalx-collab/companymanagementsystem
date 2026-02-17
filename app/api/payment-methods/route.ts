import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    if (!auth) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const siteId = searchParams.get("siteId")

    if (!siteId) {
      return NextResponse.json(
        { error: "siteId parametresi gerekli" },
        { status: 400 }
      )
    }

    // Non-super-admins can only see their own site
    if (auth.role !== "SUPER_ADMIN" && auth.siteId !== siteId) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const methods = await basePrisma.paymentMethod.findMany({
      where: { siteId, isActive: true },
      orderBy: { name: "asc" },
    })

    return NextResponse.json({ methods })
  } catch (error) {
    console.error("Get payment methods error:", error)
    return NextResponse.json(
      { error: "Ödeme yöntemleri alınamadı" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const body = await req.json()
    const {
      siteId,
      name,
      excelKolonAdi,
      komisyonOrani,
      cekimKomisyonOrani,
      baslangicBakiye,
    } = body

    if (!siteId || !name) {
      return NextResponse.json(
        { error: "siteId ve name zorunlu" },
        { status: 400 }
      )
    }

    // Verify site exists
    const site = await basePrisma.site.findUnique({ where: { id: siteId } })
    if (!site) {
      return NextResponse.json(
        { error: "Site bulunamadı" },
        { status: 404 }
      )
    }

    const method = await basePrisma.paymentMethod.create({
      data: {
        siteId,
        name: name.trim(),
        excelKolonAdi: excelKolonAdi?.trim() || "",
        komisyonOrani: parseFloat(komisyonOrani) || 0,
        cekimKomisyonOrani: parseFloat(cekimKomisyonOrani) || 0,
        baslangicBakiye: parseFloat(baslangicBakiye) || 0,
      },
    })

    return NextResponse.json({ method })
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "Bu isimde bir ödeme yöntemi zaten mevcut" },
        { status: 409 }
      )
    }
    console.error("Create payment method error:", error)
    return NextResponse.json(
      { error: "Ödeme yöntemi oluşturulamadı" },
      { status: 500 }
    )
  }
}

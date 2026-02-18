import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"

/**
 * Client-side parsed Excel data upload.
 * Receives JSON rows instead of raw Excel file — bypasses Vercel 4.5MB body limit.
 */
export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 403 })
    }

    const body = await req.json()
    const { siteId, fileName, fileSize, analyticModule, parsedSheets } = body

    if (!siteId || !fileName || !parsedSheets) {
      return NextResponse.json({ error: "Eksik parametreler" }, { status: 400 })
    }

    const site = await basePrisma.site.findUnique({ where: { id: siteId } })
    if (!site) {
      return NextResponse.json({ error: "Site bulunamadi" }, { status: 404 })
    }

    const validModules = ["FINANS", "SPOR", "BON", "CASINO", "GENEL", "PLAYERS", "UNASSIGNED"]
    const safeModule = validModules.includes(analyticModule) ? analyticModule : "UNASSIGNED"

    const upload = await basePrisma.dataUpload.create({
      data: {
        siteId,
        uploadedByEmail: auth.userId,
        fileName,
        fileType: "EXCEL",
        analyticModule: safeModule as any,
        fileSize: fileSize || 0,
        status: "COMPLETED",
        metaData: {
          originalName: fileName,
          uploadedBy: auth.userId,
          clientParsed: true,
          parsedSheets,
        },
      },
      include: { site: true },
    })

    return NextResponse.json({
      success: true,
      upload,
      uploads: [upload],
    })
  } catch (error) {
    console.error("Upload-parsed error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Bilinmeyen hata" },
      { status: 500 }
    )
  }
}

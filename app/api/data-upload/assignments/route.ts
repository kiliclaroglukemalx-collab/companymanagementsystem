import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"

type AssignmentInput = {
  dataUploadId: string
  analyticModule: string
  fileRole?: string
}

export async function GET(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const uploadId = searchParams.get("uploadId")

    const whereClause = uploadId ? { dataUploadId: uploadId } : undefined
    const assignments = await basePrisma.dataUploadAssignment.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ assignments })
  } catch (error) {
    console.error("Assignments list error:", error)
    return NextResponse.json({ error: "Eslemeler alinamadi" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 403 })
    }

    const body = await req.json()
    const replaceExisting = Boolean(body.replaceExisting)
    const uploadId = typeof body.uploadId === "string" ? body.uploadId : null

    let assignments: AssignmentInput[] = []

    if (Array.isArray(body.assignments)) {
      assignments = body.assignments
    }

    if (uploadId && assignments.length > 0) {
      assignments = assignments.map((item) => ({
        ...item,
        dataUploadId: uploadId,
      }))
    }

    const normalized = assignments
      .filter((item) => item.dataUploadId && item.analyticModule)
      .map((item) => ({
        dataUploadId: item.dataUploadId,
        analyticModule: item.analyticModule,
        fileRole: item.fileRole && item.fileRole.trim().length > 0 ? item.fileRole.trim() : "UNSPECIFIED",
      }))

    if (normalized.length === 0) {
      if (replaceExisting && uploadId) {
        await basePrisma.dataUploadAssignment.deleteMany({
          where: { dataUploadId: uploadId },
        })
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: "Esleme verisi bulunamadi" }, { status: 400 })
    }

    if (replaceExisting) {
      const uploadIds = Array.from(new Set(normalized.map((item) => item.dataUploadId)))
      await basePrisma.dataUploadAssignment.deleteMany({
        where: {
          dataUploadId: { in: uploadIds },
        },
      })
    }

    await basePrisma.dataUploadAssignment.createMany({
      data: normalized as any,
      skipDuplicates: true,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Assignments save error:", error)
    return NextResponse.json({ error: "Eslemeler kaydedilemedi" }, { status: 500 })
  }
}

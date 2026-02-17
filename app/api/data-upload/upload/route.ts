import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"
import { writeFile, mkdir } from "fs/promises"
import { readFileSync } from "fs"
import { join } from "path"
import { existsSync } from "fs"
import {
  parseExcelFile,
  processExcelData,
  calculateSummary,
  type PaymentMethodConfig,
} from "@/lib/excel-processor"

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()

    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 403 }
      )
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    const siteId = formData.get("siteId") as string
    const fileType = formData.get("fileType") as string
    const analyticModule = formData.get("analyticModule") as string
    const snapshotDateStr = formData.get("snapshotDate") as string | null
    const snapshotHour = (formData.get("snapshotHour") as string) || "daily"

    if (!file || !siteId || !fileType || !analyticModule) {
      return NextResponse.json(
        { error: "Eksik parametreler" },
        { status: 400 }
      )
    }

    const site = await basePrisma.site.findUnique({
      where: { id: siteId },
    })

    if (!site) {
      return NextResponse.json(
        { error: "Site bulunamadı" },
        { status: 404 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = join(process.cwd(), "uploads")
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    const fileName = `${Date.now()}-${file.name}`
    const filePath = join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    const upload = await basePrisma.dataUpload.create({
      data: {
        siteId,
        uploadedByEmail: auth.email,
        fileName: file.name,
        fileType: fileType as any,
        analyticModule: analyticModule as any,
        fileSize: file.size,
        status: "PENDING",
        metaData: {
          originalName: file.name,
          savedAs: fileName,
          uploadedBy: auth.name,
          snapshotDate: snapshotDateStr || null,
          snapshotHour,
        },
      },
      include: {
        site: true,
      },
    })

    processUploadedFile(
      upload.id,
      filePath,
      buffer,
      fileType,
      analyticModule,
      siteId,
      snapshotDateStr,
      snapshotHour
    ).catch((error) => {
      console.error("File processing error:", error)
    })

    return NextResponse.json({
      success: true,
      upload,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Yükleme başarısız" },
      { status: 500 }
    )
  }
}

async function processUploadedFile(
  uploadId: string,
  filePath: string,
  buffer: Buffer,
  fileType: string,
  analyticModule: string,
  siteId: string,
  snapshotDateStr: string | null,
  snapshotHour: string
) {
  try {
    await basePrisma.dataUpload.update({
      where: { id: uploadId },
      data: { status: "PROCESSING" },
    })

    if (analyticModule === "FINANS") {
      await processFinancialDataV2(
        buffer,
        filePath,
        fileType,
        siteId,
        uploadId,
        snapshotDateStr,
        snapshotHour
      )
    } else {
      // Other modules: parse generically for future use
      let data: any[] = []
      if (fileType === "JSON") {
        const fileContent = readFileSync(filePath, "utf-8")
        data = JSON.parse(fileContent)
      } else if (fileType === "CSV" || fileType === "EXCEL") {
        const XLSX = require("xlsx")
        const workbook = XLSX.readFile(filePath)
        const sheetName = workbook.SheetNames[0]
        data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
      }

      await basePrisma.dataUpload.update({
        where: { id: uploadId },
        data: {
          metaData: {
            rowCount: data.length,
            note: "Modül henüz desteklenmiyor, veriler ham olarak kaydedildi",
          },
        },
      })
    }

    await basePrisma.dataUpload.update({
      where: { id: uploadId },
      data: {
        status: "COMPLETED",
        processedAt: new Date(),
      },
    })
  } catch (error) {
    console.error("Processing error:", error)
    await basePrisma.dataUpload.update({
      where: { id: uploadId },
      data: {
        status: "FAILED",
        errorMessage:
          error instanceof Error ? error.message : "Unknown error",
      },
    })
  }
}

async function processFinancialDataV2(
  buffer: Buffer,
  filePath: string,
  fileType: string,
  siteId: string,
  uploadId: string,
  snapshotDateStr: string | null,
  snapshotHour: string
) {
  // 1. Get payment methods for this site
  const dbMethods = await basePrisma.paymentMethod.findMany({
    where: { siteId, isActive: true },
  })

  if (dbMethods.length === 0) {
    throw new Error(
      "Bu site için tanımlı ödeme yöntemi bulunamadı. Önce Komisyon Yönetimi'nden ödeme yöntemlerini ekleyin."
    )
  }

  const methods: PaymentMethodConfig[] = dbMethods.map((m) => ({
    id: m.id,
    name: m.name,
    excelKolonAdi: m.excelKolonAdi,
    komisyonOrani: m.komisyonOrani,
    cekimKomisyonOrani: m.cekimKomisyonOrani,
    baslangicBakiye: m.baslangicBakiye,
  }))

  // 2. Parse Excel file
  const rows = parseExcelFile(buffer)

  if (rows.length === 0) {
    throw new Error("Excel dosyasında işlenebilir veri bulunamadı")
  }

  // 3. Process data with payment method matching
  const kasaData = processExcelData(rows, methods)
  const summary = calculateSummary(kasaData)

  // 4. Determine snapshot date
  const snapshotDate = snapshotDateStr
    ? new Date(snapshotDateStr + "T00:00:00Z")
    : new Date(new Date().toISOString().split("T")[0] + "T00:00:00Z")

  // 5. Delete existing snapshot for this date+hour
  await basePrisma.kasaSnapshot.deleteMany({
    where: {
      siteId,
      snapshotDate,
      snapshotHour,
    },
  })

  // 6. Create new snapshot
  await basePrisma.kasaSnapshot.create({
    data: {
      siteId,
      snapshotDate,
      snapshotHour,
      totalKasa: summary.totalKasa,
      totalYatirim: summary.totalYatirim,
      totalKomisyon: summary.totalKomisyon,
      totalCekim: summary.totalCekim,
      details: kasaData as any,
      dataUploadId: uploadId,
    },
  })

  // 7. Also update FinancialFlow for backward compatibility
  const totalIncome = summary.totalYatirim
  const bankFees = summary.totalKomisyon
  const withdrawals = summary.totalCekim
  const netProfit = summary.totalKasa - kasaData.reduce((s, k) => s + k.baslangicBakiye, 0)
  const month = `${snapshotDate.getFullYear()}-${String(snapshotDate.getMonth() + 1).padStart(2, "0")}`

  const previousFlow = await basePrisma.financialFlow.findFirst({
    where: {
      siteId,
      date: { lt: snapshotDate },
    },
    orderBy: { date: "desc" },
  })

  const cumulativeProfit = (previousFlow?.cumulativeProfit || 0) + netProfit

  await basePrisma.financialFlow.upsert({
    where: {
      siteId_date: { siteId, date: snapshotDate },
    },
    update: {
      totalIncome,
      bankFees,
      withdrawals,
      operatingCosts: 0,
      netProfit,
      cumulativeProfit,
      month,
      dataUploadId: uploadId,
    },
    create: {
      siteId,
      dataUploadId: uploadId,
      date: snapshotDate,
      totalIncome,
      bankFees,
      withdrawals,
      operatingCosts: 0,
      netProfit,
      cumulativeProfit,
      month,
    },
  })
}

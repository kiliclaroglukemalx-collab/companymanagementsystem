import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    
    // Only SUPER_ADMIN can upload data
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

    if (!file || !siteId || !fileType || !analyticModule) {
      return NextResponse.json(
        { error: "Eksik parametreler" },
        { status: 400 }
      )
    }

    // Verify site exists
    const site = await basePrisma.site.findUnique({
      where: { id: siteId }
    })

    if (!site) {
      return NextResponse.json(
        { error: "Site bulunamadı" },
        { status: 404 }
      )
    }

    // Save file to uploads directory
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const uploadsDir = join(process.cwd(), "uploads")
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    const fileName = `${Date.now()}-${file.name}`
    const filePath = join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    // Create upload record
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
        }
      },
      include: {
        site: true,
      }
    })

    // Process the file asynchronously
    processUploadedFile(upload.id, filePath, fileType, analyticModule, siteId)
      .catch(error => {
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
  fileType: string,
  analyticModule: string,
  siteId: string
) {
  try {
    // Update status to processing
    await basePrisma.dataUpload.update({
      where: { id: uploadId },
      data: { status: "PROCESSING" }
    })

    // Parse the file based on type
    let data: any[] = []
    
    if (fileType === "JSON") {
      const fs = require("fs")
      const fileContent = fs.readFileSync(filePath, "utf-8")
      data = JSON.parse(fileContent)
    } else if (fileType === "CSV" || fileType === "EXCEL") {
      // Use xlsx library to parse Excel/CSV
      const XLSX = require("xlsx")
      const workbook = XLSX.readFile(filePath)
      const sheetName = workbook.SheetNames[0]
      data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
    }

    // Process financial data if module is FINANS
    if (analyticModule === "FINANS" && data.length > 0) {
      await processFinancialData(data, siteId, uploadId)
    }

    // Update status to completed
    await basePrisma.dataUpload.update({
      where: { id: uploadId },
      data: {
        status: "COMPLETED",
        processedAt: new Date(),
      }
    })
  } catch (error) {
    console.error("Processing error:", error)
    await basePrisma.dataUpload.update({
      where: { id: uploadId },
      data: {
        status: "FAILED",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      }
    })
  }
}

async function processFinancialData(data: any[], siteId: string, uploadId: string) {
  // Expected columns: date, totalIncome, bankFees, withdrawals, operatingCosts
  // Process each row and create/update FinancialFlow records
  
  for (const row of data) {
    try {
      const date = new Date(row.date || row.tarih || row.Date)
      const totalIncome = parseFloat(row.totalIncome || row.gelir || row.income || "0")
      const bankFees = parseFloat(row.bankFees || row.bankaKesintisi || row.fees || "0")
      const withdrawals = parseFloat(row.withdrawals || row.cekim || row.withdraw || "0")
      const operatingCosts = parseFloat(row.operatingCosts || row.isletmeGideri || row.costs || "0")
      
      const netProfit = totalIncome - bankFees - withdrawals - operatingCosts
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      // Get previous day's cumulative profit
      const previousFlow = await basePrisma.financialFlow.findFirst({
        where: {
          siteId,
          date: {
            lt: date,
          }
        },
        orderBy: {
          date: "desc"
        }
      })

      const cumulativeProfit = (previousFlow?.cumulativeProfit || 0) + netProfit

      // Create or update financial flow
      await basePrisma.financialFlow.upsert({
        where: {
          siteId_date: {
            siteId,
            date,
          }
        },
        update: {
          totalIncome,
          bankFees,
          withdrawals,
          operatingCosts,
          netProfit,
          cumulativeProfit,
          month,
          dataUploadId: uploadId,
        },
        create: {
          siteId,
          dataUploadId: uploadId,
          date,
          totalIncome,
          bankFees,
          withdrawals,
          operatingCosts,
          netProfit,
          cumulativeProfit,
          month,
        }
      })
    } catch (error) {
      console.error("Error processing row:", error, row)
    }
  }
}

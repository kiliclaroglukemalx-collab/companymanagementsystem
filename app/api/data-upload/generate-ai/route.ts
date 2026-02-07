import { NextRequest, NextResponse } from "next/server"
import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuthContext()
    
    // Only SUPER_ADMIN can generate AI analysis
    if (!auth || auth.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { uploadId, siteId, module } = body

    if (!uploadId || !siteId || !module) {
      return NextResponse.json(
        { error: "Eksik parametreler" },
        { status: 400 }
      )
    }

    // Get upload data
    const upload = await basePrisma.dataUpload.findUnique({
      where: { id: uploadId },
      include: {
        site: true,
        financialFlows: {
          orderBy: { date: "desc" },
          take: 30,
        }
      }
    })

    if (!upload) {
      return NextResponse.json(
        { error: "Yükleme bulunamadı" },
        { status: 404 }
      )
    }

    // Prepare data summary for AI
    const dataSummary = prepareDataSummary(upload, module)
    
    // Generate AI analysis
    const aiResponse = await generateAIAnalysis(dataSummary, module, upload.site.name)

    // Save AI analysis
    const analysis = await basePrisma.aIAnalysis.create({
      data: {
        siteId,
        dataUploadId: uploadId,
        analyticModule: module as any,
        prompt: dataSummary,
        response: aiResponse.analysis,
        tokensUsed: aiResponse.tokensUsed,
        model: aiResponse.model,
        isPublished: false,
      }
    })

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("AI generation error:", error)
    return NextResponse.json(
      { error: "AI analizi oluşturulamadı" },
      { status: 500 }
    )
  }
}

function prepareDataSummary(upload: any, module: string): string {
  let summary = `Site: ${upload.site.name}\n`
  summary += `Analitik Modül: ${module}\n`
  summary += `Yüklenen Dosya: ${upload.fileName}\n`
  summary += `Yükleme Tarihi: ${new Date(upload.createdAt).toLocaleDateString("tr-TR")}\n\n`

  if (module === "FINANS" && upload.financialFlows.length > 0) {
    summary += "Finansal Veriler (Son 30 Gün):\n"
    
    const totalIncome = upload.financialFlows.reduce((sum: number, f: any) => sum + f.totalIncome, 0)
    const totalBankFees = upload.financialFlows.reduce((sum: number, f: any) => sum + f.bankFees, 0)
    const totalWithdrawals = upload.financialFlows.reduce((sum: number, f: any) => sum + f.withdrawals, 0)
    const totalOperatingCosts = upload.financialFlows.reduce((sum: number, f: any) => sum + f.operatingCosts, 0)
    const totalNetProfit = upload.financialFlows.reduce((sum: number, f: any) => sum + f.netProfit, 0)
    
    summary += `- Toplam Gelir: ${totalIncome.toLocaleString("tr-TR")} TL\n`
    summary += `- Toplam Banka Kesintisi: ${totalBankFees.toLocaleString("tr-TR")} TL\n`
    summary += `- Toplam Çekim: ${totalWithdrawals.toLocaleString("tr-TR")} TL\n`
    summary += `- Toplam İşletme Gideri: ${totalOperatingCosts.toLocaleString("tr-TR")} TL\n`
    summary += `- Toplam Net Kazanç: ${totalNetProfit.toLocaleString("tr-TR")} TL\n`
    summary += `- Ortalama Günlük Kazanç: ${(totalNetProfit / upload.financialFlows.length).toLocaleString("tr-TR")} TL\n`
    
    if (upload.financialFlows[0]) {
      summary += `- Son Kümülatif Kazanç: ${upload.financialFlows[0].cumulativeProfit.toLocaleString("tr-TR")} TL\n`
    }
  }

  return summary
}

async function generateAIAnalysis(dataSummary: string, module: string, siteName: string): Promise<{
  analysis: string
  tokensUsed: number
  model: string
}> {
  // Check if OpenAI API key is available
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    // Return a fallback analysis without AI
    return {
      analysis: generateFallbackAnalysis(dataSummary, module, siteName),
      tokensUsed: 0,
      model: "fallback",
    }
  }

  try {
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Sen bir finansal ve iş analitiği uzmanısın. ${siteName} sitesi için ${module} modülü verilerini analiz ediyorsun. Detaylı, içgörü dolu ve eylem önerileri içeren Türkçe bir analiz raporu hazırla.`
          },
          {
            role: "user",
            content: `Aşağıdaki verileri analiz et ve detaylı bir rapor hazırla:\n\n${dataSummary}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error("OpenAI API error")
    }

    const data = await response.json()
    
    return {
      analysis: data.choices[0].message.content,
      tokensUsed: data.usage?.total_tokens || 0,
      model: "gpt-4",
    }
  } catch (error) {
    console.error("OpenAI API error:", error)
    // Fallback to rule-based analysis
    return {
      analysis: generateFallbackAnalysis(dataSummary, module, siteName),
      tokensUsed: 0,
      model: "fallback",
    }
  }
}

function generateFallbackAnalysis(dataSummary: string, module: string, siteName: string): string {
  // Generate a basic analysis without AI
  let analysis = `# ${siteName} - ${module} Analiz Raporu\n\n`
  analysis += `## Veri Özeti\n${dataSummary}\n\n`
  
  if (module === "FINANS") {
    analysis += `## Finansal Durum Değerlendirmesi\n\n`
    analysis += `Bu rapor, yüklenen finansal veriler üzerinden otomatik olarak oluşturulmuştur.\n\n`
    analysis += `### Öneriler:\n`
    analysis += `1. Gelir kaynaklarını çeşitlendirme stratejileri değerlendirilmeli\n`
    analysis += `2. Banka kesintilerini azaltmak için alternatif ödeme yöntemleri incelenebilir\n`
    analysis += `3. İşletme giderlerinin optimizasyonu için maliyet analizi yapılmalı\n`
    analysis += `4. Nakit akış yönetimi için günlük takip sistemleri kurulmalı\n\n`
    analysis += `### Sonuç:\n`
    analysis += `Genel finansal performans, yüklenen veriler doğrultusunda analiz edilmiştir. Detaylı öneriler için veri setinin genişletilmesi önerilir.\n`
  } else {
    analysis += `## ${module} Modülü Analizi\n\n`
    analysis += `Bu modül için analiz devam etmektedir. Yüklenen veriler işlenmiş ve sisteme kaydedilmiştir.\n\n`
    analysis += `Gelişmiş analiz özellikleri yakında eklenecektir.\n`
  }
  
  return analysis
}

/**
 * Arena Ay Sonu Şampiyonlar Arşivleme
 * 
 * PDF Gereksinimi:
 * - Her ayın son günü saat 00:00'da çalışır
 * - Mevcut ay skorlarını MonthlyChampion'a kopyala
 * - MonthlyScore ve LeagueRanking tablolarını temizle
 * - Arena'da kutlama ekranı göster
 * 
 * Kullanım:
 * 1. Cron Job (Production): Her ay 1. gün 00:00'da çalıştır
 * 2. Manual (Test): node scripts/archive-monthly-champions.js
 */

const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")
const { Pool } = require("pg")

// DB Connection
const connectionString = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL
if (!connectionString) {
  console.error("❌ DATABASE_URL not found!")
  process.exit(1)
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🏆 Starting monthly champions archival...")

  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const month = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}`

  console.log(`📅 Archiving champions for: ${month}`)

  try {
    // 1. Get all rankings from last month
    const rankings = await prisma.leagueRanking.findMany({
      where: { month },
      include: {
        user: {
          select: {
            name: true,
            siteId: true,
            departmentId: true,
          },
        },
      },
    })

    if (rankings.length === 0) {
      console.log("⚠️ No rankings found for this month. Nothing to archive.")
      return
    }

    console.log(`📊 Found ${rankings.length} rankings to archive`)

    // 2. Archive to MonthlyChampion
    let archivedCount = 0
    for (const ranking of rankings) {
      try {
        await prisma.monthlyChampion.create({
          data: {
            userId: ranking.userId,
            siteId: ranking.user.siteId,
            departmentId: ranking.user.departmentId!,
            personelType: ranking.personelType,
            month: ranking.month,
            category: ranking.category,
            rank: ranking.rank,
            totalScore: ranking.totalScore,
          },
        })
        archivedCount++
      } catch (error) {
        // Skip if already exists (unique constraint)
        if (error.code !== "P2002") {
          console.error(`❌ Failed to archive ${ranking.user.name}:`, error.message)
        }
      }
    }

    console.log(`✅ Archived ${archivedCount} champions`)

    // 3. Clean up old rankings and scores
    const [deletedRankings, deletedScores] = await Promise.all([
      prisma.leagueRanking.deleteMany({ where: { month } }),
      prisma.monthlyScore.deleteMany({ where: { month } }),
    ])

    console.log(`🗑️ Cleaned up ${deletedRankings.count} rankings and ${deletedScores.count} monthly scores`)

    // 4. Create celebration arena events for top 3 in each category
    const topChampions = await prisma.monthlyChampion.findMany({
      where: {
        month,
        rank: { lte: 3 }, // Only top 3
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { category: "asc" },
        { rank: "asc" },
      ],
    })

    // Group by category
    const categoryMap = {
      USTAT: "Üstat",
      ELMAS_1: "Elmas I",
      ELMAS_2: "Elmas II",
      ALTIN_1: "Altın I",
      ALTIN_2: "Altın II",
      GUMUS_1: "Gümüş I",
      GUMUS_2: "Gümüş II",
      BRONZ_1: "Bronz I",
      BRONZ_2: "Bronz II",
      DEMIR: "Demir",
    }

    for (const champion of topChampions) {
      const categoryLabel = categoryMap[champion.category]
      const rankLabel = champion.rank === 1 ? "🥇 Şampiyon" : champion.rank === 2 ? "🥈 İkinci" : "🥉 Üçüncü"

      await prisma.arenaEvent.create({
        data: {
          siteId: champion.siteId,
          type: "LEADER_CHANGED",
          title: `${month} ${categoryLabel} ${rankLabel}!`,
          message: `${champion.user.name} bu ayki ${categoryLabel} liginde ${rankLabel} oldu! 🎉`,
          metaJson: {
            championId: champion.id,
            userId: champion.userId,
            category: champion.category,
            rank: champion.rank,
            totalScore: champion.totalScore,
            month,
          },
        },
      })
    }

    console.log(`🎉 Created ${topChampions.length} celebration events`)
    console.log("✅ Monthly champions archival completed successfully!")
  } catch (error) {
    console.error("❌ Error during archival:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

main()

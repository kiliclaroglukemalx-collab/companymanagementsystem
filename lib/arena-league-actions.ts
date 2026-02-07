"use server"

import { basePrisma } from "@/lib/prisma"
import { getServerAuthContext } from "@/lib/server-auth"
import type { LeagueCategory, PersonelType } from "@prisma/client"

/**
 * Arena Lig Sistemi - Server Actions
 * 
 * PDF Gereksinimleri:
 * - Günlük puanlama → Kümülatif aylık toplam
 * - Yüzdelik dilim hesaplama (en yüksek %1 = Üstat, vb.)
 * - 4 ayrı personel tipi için ayrı liglerr
 * - Ay sonu şampiyonlar + otomatik sıfırlama
 */

// Yüzdelik dilimlere göre kategori belirleme
function calculateCategory(percentile: number): LeagueCategory {
  if (percentile <= 1) return "USTAT"
  if (percentile <= 5) return "ELMAS_1"
  if (percentile <= 10) return "ELMAS_2"
  if (percentile <= 20) return "ALTIN_1"
  if (percentile <= 30) return "ALTIN_2"
  if (percentile <= 40) return "GUMUS_1"
  if (percentile <= 50) return "GUMUS_2"
  if (percentile <= 60) return "BRONZ_1"
  if (percentile <= 70) return "BRONZ_2"
  return "DEMIR"
}

// Kategori Türkçe isimleri
function getCategoryLabel(category: LeagueCategory): string {
  const labels: Record<LeagueCategory, string> = {
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
  return labels[category]
}

// Personel tipine göre role belirleme
function getUserPersonelType(role: string): PersonelType {
  if (role === "SUPER_ADMIN") return "GENEL_MUDUR"
  if (role === "ADMIN") return "ADMIN"
  if (role === "MANAGER") return "BIRIM_MUDURU"
  return "PERSONEL"
}

/**
 * Bir kullanıcının aylık puanını günceller
 * Her yeni rating sonrası çağrılır
 */
export async function updateMonthlyScore(
  userId: string,
  siteId: string,
  departmentId: string,
  scoreToAdd: number
) {
  const now = new Date()
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  const user = await basePrisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })

  if (!user) return

  const personelType = getUserPersonelType(user.role)

  // Upsert monthly score
  await basePrisma.monthlyScore.upsert({
    where: {
      userId_month: { userId, month },
    },
    create: {
      userId,
      siteId,
      departmentId,
      personelType,
      month,
      totalScore: scoreToAdd,
      ratingCount: 1,
      lastRatedAt: now,
    },
    update: {
      totalScore: { increment: scoreToAdd },
      ratingCount: { increment: 1 },
      lastRatedAt: now,
    },
  })

  // Recalculate rankings for this personel type
  await recalculateLeagueRankings(siteId, month, personelType)
}

/**
 * Belirli bir site, ay ve personel tipi için lig sıralamasını hesaplar
 * 
 * PDF Mantığı:
 * - Tüm personelleri puana göre sırala (yüksekten düşüğe)
 * - Yüzdelik dilim hesapla
 * - Kategoriye yerleştir
 */
async function recalculateLeagueRankings(
  siteId: string,
  month: string,
  personelType: PersonelType
) {
  // Bu site, ay ve personel tipindeki tüm skorları al
  const scores = await basePrisma.monthlyScore.findMany({
    where: {
      siteId,
      month,
      personelType,
    },
    orderBy: { totalScore: "desc" },
    select: {
      userId: true,
      departmentId: true,
      totalScore: true,
    },
  })

  const totalCount = scores.length
  if (totalCount === 0) return

  // Her kullanıcı için yüzdelik hesapla ve kategori belirle
  const rankings = scores.map((score, index) => {
    const rank = index + 1
    const percentile = (rank / totalCount) * 100
    const category = calculateCategory(percentile)

    return {
      userId: score.userId,
      siteId,
      departmentId: score.departmentId,
      personelType,
      month,
      category,
      rank,
      totalScore: score.totalScore,
      percentage: percentile,
    }
  })

  // Tüm ranking'leri upsert et
  for (const ranking of rankings) {
    await basePrisma.leagueRanking.upsert({
      where: {
        userId_month_personelType: {
          userId: ranking.userId,
          month: ranking.month,
          personelType: ranking.personelType,
        },
      },
      create: ranking,
      update: {
        category: ranking.category,
        rank: ranking.rank,
        totalScore: ranking.totalScore,
        percentage: ranking.percentage,
      },
    })
  }
}

/**
 * Arena ana sayfa için lig sıralamasını getirir
 * 
 * Güvenlik:
 * - SUPER_ADMIN: Tüm siteler
 * - Diğerleri: Sadece kendi site'leri
 */
export async function getLeagueRankings(personelType?: PersonelType) {
  const auth = await getServerAuthContext()
  if (!auth) {
    return { success: false, error: "Unauthorized" }
  }

  const now = new Date()
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  const whereClause: any = {
    month,
    ...(auth.role !== "SUPER_ADMIN" && { siteId: auth.siteId }),
    ...(personelType && { personelType }),
  }

  try {
    const rankings = await basePrisma.leagueRanking.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarKey: true,
            role: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { category: "asc" },
        { rank: "asc" },
      ],
      take: 100, // İlk 100
    })

    return {
      success: true,
      rankings: rankings.map((r) => ({
        userId: r.userId,
        userName: r.user.name,
        userRole: r.user.role,
        department: r.department.name,
        category: r.category,
        categoryLabel: getCategoryLabel(r.category),
        rank: r.rank,
        totalScore: r.totalScore,
        percentage: r.percentage,
      })),
    }
  } catch (error) {
    console.error("[getLeagueRankings] Error:", error)
    return { success: false, error: "Failed to fetch rankings" }
  }
}

/**
 * Kategori bazında lider tablosunu getirir
 */
export async function getCategoryLeaders() {
  const auth = await getServerAuthContext()
  if (!auth) {
    return { success: false, error: "Unauthorized" }
  }

  const now = new Date()
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  try {
    const categories: LeagueCategory[] = [
      "USTAT", "ELMAS_1", "ELMAS_2", "ALTIN_1", "ALTIN_2",
      "GUMUS_1", "GUMUS_2", "BRONZ_1", "BRONZ_2", "DEMIR"
    ]

    const leaders = await Promise.all(
      categories.map(async (category) => {
        const leader = await basePrisma.leagueRanking.findFirst({
          where: {
            month,
            category,
            ...(auth.role !== "SUPER_ADMIN" && { siteId: auth.siteId }),
          },
          include: {
            user: {
              select: {
                name: true,
                avatarKey: true,
              },
            },
          },
          orderBy: { rank: "asc" },
        })

        return {
          category,
          categoryLabel: getCategoryLabel(category),
          leader: leader ? {
            name: leader.user.name,
            score: leader.totalScore,
            avatarKey: leader.user.avatarKey,
          } : null,
        }
      })
    )

    return { success: true, leaders }
  } catch (error) {
    console.error("[getCategoryLeaders] Error:", error)
    return { success: false, error: "Failed to fetch leaders" }
  }
}

/**
 * Ay sonu şampiyonları arşivle ve sıfırla
 * 
 * PDF: Ayın son günü saat 00:00'da çalışır (cron job)
 * - Mevcut lig sıralamasını MonthlyChampion'a kopyala
 * - MonthlyScore ve LeagueRanking'leri sil
 * - Arena'da kutlama ekranı göster
 */
export async function archiveMonthlyChampions() {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const month = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}`

  try {
    // Geçen ayın tüm ranking'lerini al
    const rankings = await basePrisma.leagueRanking.findMany({
      where: { month },
      include: {
        user: {
          select: {
            siteId: true,
            departmentId: true,
          },
        },
      },
    })

    // Champions tablosuna kaydet
    for (const ranking of rankings) {
      await basePrisma.monthlyChampion.create({
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
    }

    // Geçen ayın verilerini sil
    await basePrisma.leagueRanking.deleteMany({ where: { month } })
    await basePrisma.monthlyScore.deleteMany({ where: { month } })

    console.log(`[archiveMonthlyChampions] Archived ${rankings.length} champions for ${month}`)

    return { success: true, archivedCount: rankings.length }
  } catch (error) {
    console.error("[archiveMonthlyChampions] Error:", error)
    return { success: false, error: "Failed to archive champions" }
  }
}

/**
 * Bu ayın şampiyonlarını getir (ay sonu için)
 */
export async function getMonthlyChampions(month?: string) {
  const auth = await getServerAuthContext()
  if (!auth) {
    return { success: false, error: "Unauthorized" }
  }

  const targetMonth = month || (() => {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    return `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}`
  })()

  try {
    const champions = await basePrisma.monthlyChampion.findMany({
      where: {
        month: targetMonth,
        ...(auth.role !== "SUPER_ADMIN" && { siteId: auth.siteId }),
        category: { in: ["USTAT", "ELMAS_1", "ELMAS_2"] }, // Sadece ilk 3 kategori
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatarKey: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { category: "asc" },
        { rank: "asc" },
      ],
      take: 50,
    })

    return {
      success: true,
      champions: champions.map((c) => ({
        userName: c.user.name,
        userEmail: c.user.email,
        avatarKey: c.user.avatarKey,
        department: c.department.name,
        category: c.category,
        categoryLabel: getCategoryLabel(c.category),
        rank: c.rank,
        totalScore: c.totalScore,
        personelType: c.personelType,
      })),
      month: targetMonth,
    }
  } catch (error) {
    console.error("[getMonthlyChampions] Error:", error)
    return { success: false, error: "Failed to fetch champions" }
  }
}

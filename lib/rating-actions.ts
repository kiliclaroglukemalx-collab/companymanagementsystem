/**
 * Rating Core - Server Actions
 * Günlük puanlama sistemi (Kriter bazlı)
 */

"use server"

import { basePrisma } from "@/lib/prisma"
import { getServerAuthContext, ServerAuthError } from "@/lib/server-auth"
import { createArenaEvent } from "@/lib/arena-actions"
import { revalidatePath } from "next/cache"

// ============================================================================
// TYPES
// ============================================================================

export interface RatingCriteriaData {
  id: string
  name: string
  weight: number
  isActive: boolean
  departmentId: string
}

export interface CreateRatingInput {
  ratedUserId: string
  departmentId: string
  scores: Array<{
    criteriaId: string
    score: number // 1-10
  }>
}

export interface TodayProgressData {
  totalUsers: number
  ratedUsers: number
  completionRate: number
  ratingsGivenToday: number
}

// ============================================================================
// CRITERIA MANAGEMENT
// ============================================================================

/**
 * Liste değerlendirme kriterlerini
 * SUPER_ADMIN: Tüm siteler
 * ADMIN: Sadece kendi sitesi
 * MANAGER/STAFF: Sadece kendi sitesi (read-only)
 */
export async function listCriteria(params?: {
  siteId?: string
  departmentId?: string
}): Promise<{
  success: boolean
  data?: RatingCriteriaData[]
  error?: string
}> {
  try {
    const auth = await getServerAuthContext()
    if (!auth) {
      throw new ServerAuthError(401, "Unauthorized")
    }

    // Build where clause based on role
    let whereClause: any = {}

    if (auth.role === "SUPER_ADMIN") {
      if (params?.siteId) {
        whereClause.department = { siteId: params.siteId }
      }
    } else {
      // Others: only their site
      whereClause.department = { siteId: auth.siteId }
    }

    if (params?.departmentId) {
      whereClause.departmentId = params.departmentId
    }

    const criteria = await basePrisma.ratingCriteria.findMany({
      where: whereClause,
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
    })

    return {
      success: true,
      data: criteria,
    }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    console.error("Error listing criteria:", error)
    return { success: false, error: "Failed to list criteria" }
  }
}

/**
 * Kriter oluştur/güncelle
 * Sadece SUPER_ADMIN ve ADMIN yapabilir
 */
export async function upsertCriteria(input: {
  id?: string
  departmentId: string
  name: string
  weight?: number
  isActive?: boolean
}): Promise<{
  success: boolean
  data?: RatingCriteriaData
  error?: string
}> {
  try {
    const auth = await getServerAuthContext()
    if (!auth) {
      throw new ServerAuthError(401, "Unauthorized")
    }

    // Only SUPER_ADMIN and ADMIN can manage criteria
    if (auth.role !== "SUPER_ADMIN" && auth.role !== "ADMIN") {
      throw new ServerAuthError(403, "Only admins can manage criteria")
    }

    // Verify department belongs to user's site (if not SUPER_ADMIN)
    if (auth.role !== "SUPER_ADMIN") {
      const department = await basePrisma.department.findUnique({
        where: { id: input.departmentId },
        select: { siteId: true },
      })

      if (!department || department.siteId !== auth.siteId) {
        throw new ServerAuthError(403, "Department not found or access denied")
      }
    }

    let criteria

    if (input.id) {
      // Update existing
      criteria = await basePrisma.ratingCriteria.update({
        where: { id: input.id },
        data: {
          name: input.name,
          weight: input.weight ?? 0,
          isActive: input.isActive ?? true,
        },
      })
    } else {
      // Create new
      criteria = await basePrisma.ratingCriteria.create({
        data: {
          departmentId: input.departmentId,
          name: input.name,
          weight: input.weight ?? 0,
          isActive: input.isActive ?? true,
        },
      })
    }

    revalidatePath("/admin/rating-criteria")
    revalidatePath("/arena/rate")

    return {
      success: true,
      data: criteria,
    }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    console.error("Error upserting criteria:", error)
    return { success: false, error: "Failed to save criteria" }
  }
}

/**
 * Kriteri aktif/pasif yap
 */
export async function toggleCriteriaStatus(
  criteriaId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const auth = await getServerAuthContext()
    if (!auth) {
      throw new ServerAuthError(401, "Unauthorized")
    }

    if (auth.role !== "SUPER_ADMIN" && auth.role !== "ADMIN") {
      throw new ServerAuthError(403, "Only admins can manage criteria")
    }

    const criteria = await basePrisma.ratingCriteria.findUnique({
      where: { id: criteriaId },
      include: { department: true },
    })

    if (!criteria) {
      throw new Error("Criteria not found")
    }

    // Check site access
    if (auth.role !== "SUPER_ADMIN" && criteria.department.siteId !== auth.siteId) {
      throw new ServerAuthError(403, "Access denied")
    }

    await basePrisma.ratingCriteria.update({
      where: { id: criteriaId },
      data: { isActive: !criteria.isActive },
    })

    revalidatePath("/admin/rating-criteria")
    revalidatePath("/arena/rate")

    return { success: true }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    console.error("Error toggling criteria:", error)
    return { success: false, error: "Failed to toggle criteria" }
  }
}

// ============================================================================
// RATING CREATION
// ============================================================================

/**
 * Puanlama oluştur
 * 
 * KURALLAR:
 * - Aynı gün aynı kişiyi 2 kere puanlayamaz
 * - Kendini puanlayamaz
 * - Tüm kriterler için puan vermeli
 * - Puanlar 1-10 arası olmalı
 * 
 * SECURITY:
 * - Authenticated user only
 * - Site isolation enforced
 * - Creates Arena event
 */
export async function createRating(
  input: CreateRatingInput
): Promise<{
  success: boolean
  data?: { id: string; totalScore: number }
  error?: string
}> {
  try {
    const auth = await getServerAuthContext()
    if (!auth) {
      throw new ServerAuthError(401, "Unauthorized")
    }

    // Cannot rate yourself
    if (input.ratedUserId === auth.userId) {
      return { success: false, error: "CANNOT_RATE_SELF" }
    }

    // Verify rated user belongs to same site
    const ratedUser = await basePrisma.user.findUnique({
      where: { id: input.ratedUserId },
      select: { id: true, name: true, siteId: true, departmentId: true },
    })

    if (!ratedUser || ratedUser.siteId !== auth.siteId) {
      return { success: false, error: "USER_NOT_FOUND" }
    }

    // Verify department
    const department = await basePrisma.department.findUnique({
      where: { id: input.departmentId },
      select: { id: true, name: true, siteId: true },
    })

    if (!department || department.siteId !== auth.siteId) {
      return { success: false, error: "DEPARTMENT_NOT_FOUND" }
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    // Check if already rated today
    const existingRating = await basePrisma.rating.findUnique({
      where: {
        raterUserId_ratedUserId_date: {
          raterUserId: auth.userId,
          ratedUserId: input.ratedUserId,
          date: today,
        },
      },
    })

    if (existingRating) {
      return { success: false, error: "ALREADY_RATED_TODAY" }
    }

    // Verify all scores are valid (1-10)
    for (const score of input.scores) {
      if (score.score < 1 || score.score > 10) {
        return { success: false, error: "INVALID_SCORE_RANGE" }
      }
    }

    // Calculate total score (average)
    const totalScore =
      input.scores.reduce((sum, s) => sum + s.score, 0) / input.scores.length

    // Create rating with scores
    const rating = await basePrisma.rating.create({
      data: {
        siteId: auth.siteId,
        departmentId: input.departmentId,
        raterUserId: auth.userId,
        ratedUserId: input.ratedUserId,
        date: today,
        totalScore,
        scores: {
          create: input.scores.map((score) => ({
            criteriaId: score.criteriaId,
            score: score.score,
          })),
        },
      },
      include: {
        rater: { select: { name: true } },
        rated: { select: { name: true } },
      },
    })

    // Create Arena event
    await createArenaEvent({
      siteId: auth.siteId,
      type: "RATING_GIVEN",
      title: `${rating.rater.name}, ${rating.rated.name} kişisini puanladı`,
      message: `Ortalama puan: ${totalScore.toFixed(1)}/10`,
      metaJson: {
        ratingId: rating.id,
        raterId: auth.userId,
        ratedId: input.ratedUserId,
        departmentId: input.departmentId,
        totalScore,
        date: today,
      },
    })

    // Calculate and maybe create progress event
    await updateProgressEvent(auth.siteId, input.departmentId)

    // Update Arena monthly score (PDF: Puanlama → Arena entegrasyonu)
    const { updateMonthlyScore } = await import("@/lib/arena-league-actions")
    await updateMonthlyScore(
      input.ratedUserId,
      auth.siteId,
      input.departmentId,
      totalScore
    )

    revalidatePath("/arena")
    revalidatePath("/arena/rate")

    return {
      success: true,
      data: {
        id: rating.id,
        totalScore,
      },
    }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    console.error("Error creating rating:", error)
    return { success: false, error: "FAILED_TO_CREATE_RATING" }
  }
}

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

/**
 * Bugünkü puanlama ilerlemesini getir
 */
export async function getTodayProgress(
  departmentId?: string
): Promise<{
  success: boolean
  data?: TodayProgressData
  error?: string
}> {
  try {
    const auth = await getServerAuthContext()
    if (!auth) {
      throw new ServerAuthError(401, "Unauthorized")
    }

    const today = new Date().toISOString().split("T")[0]

    // Build where clause
    let whereClause: any = { siteId: auth.siteId, isActive: true }
    if (departmentId) {
      whereClause.departmentId = departmentId
    }

    // Count total active users in department
    const totalUsers = await basePrisma.user.count({
      where: whereClause,
    })

    // Count unique users who received ratings today
    const ratingsToday = await basePrisma.rating.findMany({
      where: {
        siteId: auth.siteId,
        date: today,
        ...(departmentId && { departmentId }),
      },
      select: {
        ratedUserId: true,
      },
    })

    const uniqueRatedUsers = new Set(ratingsToday.map((r) => r.ratedUserId))
    const ratedUsers = uniqueRatedUsers.size

    const completionRate = totalUsers > 0 ? (ratedUsers / totalUsers) * 100 : 0

    return {
      success: true,
      data: {
        totalUsers,
        ratedUsers,
        completionRate: Math.round(completionRate),
        ratingsGivenToday: ratingsToday.length,
      },
    }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    console.error("Error getting progress:", error)
    return { success: false, error: "Failed to get progress" }
  }
}

/**
 * Progress event'i güncelle (internal)
 */
async function updateProgressEvent(siteId: string, departmentId: string) {
  try {
    const today = new Date().toISOString().split("T")[0]

    // Get total users in department
    const totalUsers = await basePrisma.user.count({
      where: {
        siteId,
        departmentId,
        isActive: true,
      },
    })

    // Get unique rated users today
    const ratingsToday = await basePrisma.rating.findMany({
      where: {
        siteId,
        departmentId,
        date: today,
      },
      select: { ratedUserId: true },
    })

    const uniqueRatedUsers = new Set(ratingsToday.map((r) => r.ratedUserId))
    const ratedUsers = uniqueRatedUsers.size

    const completionRate = totalUsers > 0 ? (ratedUsers / totalUsers) * 100 : 0

    // Create progress event at certain milestones (25%, 50%, 75%, 100%)
    const milestones = [25, 50, 75, 100]
    const currentMilestone = milestones.find(
      (m) => completionRate >= m && completionRate < m + 5
    )

    if (currentMilestone) {
      await createArenaEvent({
        siteId,
        type: "RATING_PROGRESS",
        title: `Günlük puanlama %${currentMilestone} tamamlandı`,
        message: `${ratedUsers} / ${totalUsers} kişi puanlandı`,
        metaJson: {
          departmentId,
          date: today,
          totalUsers,
          ratedUsers,
          completionRate: Math.round(completionRate),
        },
      })
    }
  } catch (error) {
    console.error("Error updating progress event:", error)
    // Don't throw - progress events are non-critical
  }
}

// ============================================================================
// LIST USERS FOR RATING
// ============================================================================

/**
 * Puanlanabilir kullanıcıları listele
 * (Kendi departmanındaki diğer kullanıcılar, kendisi hariç)
 */
export async function listUsersForRating(
  departmentId: string
): Promise<{
  success: boolean
  data?: Array<{
    id: string
    name: string
    email: string
    alreadyRatedToday: boolean
  }>
  error?: string
}> {
  try {
    const auth = await getServerAuthContext()
    if (!auth) {
      throw new ServerAuthError(401, "Unauthorized")
    }

    const today = new Date().toISOString().split("T")[0]

    // Get all users in department (except self)
    const users = await basePrisma.user.findMany({
      where: {
        siteId: auth.siteId,
        departmentId,
        isActive: true,
        id: { not: auth.userId }, // Exclude self
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: { name: "asc" },
    })

    // Check which users were already rated today
    const ratingsToday = await basePrisma.rating.findMany({
      where: {
        raterUserId: auth.userId,
        date: today,
      },
      select: {
        ratedUserId: true,
      },
    })

    const ratedUserIds = new Set(ratingsToday.map((r) => r.ratedUserId))

    const usersWithStatus = users.map((user) => ({
      ...user,
      alreadyRatedToday: ratedUserIds.has(user.id),
    }))

    return {
      success: true,
      data: usersWithStatus,
    }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    console.error("Error listing users for rating:", error)
    return { success: false, error: "Failed to list users" }
  }
}

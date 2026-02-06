/**
 * Arena Live Feed Server Actions
 * Handles event fetching for Arena module
 * Phase 1.5: Enhanced with summary stats and filtering
 */

"use server"

import { basePrisma } from "@/lib/prisma"
import { getServerAuthContext, ServerAuthError } from "@/lib/server-auth"
import { ArenaEventType } from "@prisma/client"

export interface ArenaEventData {
  id: string
  type: ArenaEventType
  title: string
  message: string | null
  metaJson: any
  createdAt: Date
}

export interface ArenaEventGroup {
  type: ArenaEventType
  userId?: string
  userName?: string
  count: number
  firstEvent: ArenaEventData
  lastEvent: ArenaEventData
  date: string
}

export interface ArenaSummaryStats {
  todayRatingsCount: number
  todayPeopleRated: number
  lastRatingTime: Date | null
  dailyCompletionRate: number
}

export interface ListArenaEventsResult {
  success: boolean
  data?: {
    events: ArenaEventData[]
    groupedEvents?: ArenaEventGroup[]
    total: number
  }
  error?: string
}

export interface GetArenaSummaryResult {
  success: boolean
  data?: ArenaSummaryStats
  error?: string
}

/**
 * List recent arena events
 * 
 * SECURITY:
 * - Requires authentication (checked on line 76-80)
 * - Multi-tenant site isolation enforced (checked on line 87-95)
 * - SUPER_ADMIN: Can view all sites or filter by specific siteId
 * - ADMIN/MANAGER/STAFF: Can ONLY view their own site (auth.siteId)
 * 
 * BEHAVIOR:
 * - Returns last N events (default: 20)
 * - Ordered by newest first (createdAt DESC)
 * - Supports event type filtering
 * - Supports time range filtering
 * - Read-only, no mutations
 * 
 * @param params.limit - Max events to return (default: 20)
 * @param params.siteId - Optional site filter (SUPER_ADMIN only)
 * @param params.eventType - Optional event type filter
 * @param params.timeRange - Optional time range (today, yesterday, last7days, last30days)
 * @param params.groupSimilar - Group similar events by user and type (default: false)
 */
export async function listArenaEvents(params?: {
  limit?: number
  siteId?: string
  eventType?: ArenaEventType
  timeRange?: "today" | "yesterday" | "last7days" | "last30days"
  groupSimilar?: boolean
}): Promise<ListArenaEventsResult> {
  try {
    // SECURITY CHECK 1: Require authentication
    const auth = await getServerAuthContext()
    
    if (!auth) {
      throw new ServerAuthError(401, "Unauthorized")
    }
    
    const limit = params?.limit || 20
    
    // SECURITY CHECK 2: Multi-tenant site isolation
    // Build where clause based on role - this is MANDATORY
    let whereClause: any = {}
    
    if (auth.role === "SUPER_ADMIN") {
      // SUPER_ADMIN can optionally filter by siteId or see all sites
      if (params?.siteId) {
        whereClause.siteId = params.siteId
      }
      // If no siteId param, whereClause stays empty = all sites
    } else {
      // CRITICAL: All other roles MUST be restricted to their own site
      // This prevents cross-site data leakage
      whereClause.siteId = auth.siteId
    }
    
    // Event type filter
    if (params?.eventType) {
      whereClause.type = params.eventType
    }
    
    // Time range filter
    if (params?.timeRange) {
      const now = new Date()
      let startDate: Date
      
      switch (params.timeRange) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0))
          whereClause.createdAt = { gte: startDate }
          break
        case "yesterday":
          const yesterday = new Date(now)
          yesterday.setDate(yesterday.getDate() - 1)
          startDate = new Date(yesterday.setHours(0, 0, 0, 0))
          const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999))
          whereClause.createdAt = {
            gte: startDate,
            lte: endOfYesterday,
          }
          break
        case "last7days":
          startDate = new Date(now)
          startDate.setDate(startDate.getDate() - 7)
          whereClause.createdAt = { gte: startDate }
          break
        case "last30days":
          startDate = new Date(now)
          startDate.setDate(startDate.getDate() - 30)
          whereClause.createdAt = { gte: startDate }
          break
      }
    }
    
    const [events, total] = await Promise.all([
      basePrisma.arenaEvent.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        take: limit,
      }),
      basePrisma.arenaEvent.count({
        where: whereClause,
      }),
    ])
    
    // Group similar events if requested
    if (params?.groupSimilar) {
      const grouped = groupSimilarEvents(events)
      return {
        success: true,
        data: {
          events,
          groupedEvents: grouped,
          total,
        },
      }
    }
    
    return {
      success: true,
      data: {
        events,
        total,
      },
    }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return {
        success: false,
        error: error.message,
      }
    }
    
    console.error("Error fetching arena events:", error)
    return {
      success: false,
      error: "Failed to fetch arena events",
    }
  }
}

/**
 * Create an arena event (internal use only)
 * 
 * USAGE:
 * - Called internally by other system components
 * - NOT exposed as public API
 * - Logs arena activities (ratings, leader changes, etc.)
 * 
 * SECURITY:
 * - Caller must provide valid siteId
 * - No authentication check (internal function)
 * - siteId validation happens at caller level
 * 
 * @param data.siteId - Site ID for multi-tenant isolation
 * @param data.type - Event type (enum)
 * @param data.title - Event headline
 * @param data.message - Optional detail message
 * @param data.metaJson - Optional metadata
 */
export async function createArenaEvent(data: {
  siteId: string
  type: ArenaEventType
  title: string
  message?: string
  metaJson?: any
}): Promise<{ success: boolean; error?: string }> {
  try {
    await basePrisma.arenaEvent.create({
      data: {
        siteId: data.siteId,
        type: data.type,
        title: data.title,
        message: data.message,
        metaJson: data.metaJson,
      },
    })
    
    return { success: true }
  } catch (error) {
    console.error("Error creating arena event:", error)
    return {
      success: false,
      error: "Failed to create arena event",
    }
  }
}

/**
 * Get Arena summary statistics for today
 * 
 * SECURITY:
 * - Requires authentication
 * - Multi-tenant site isolation
 * 
 * Returns:
 * - Today's ratings count
 * - Today's unique people rated
 * - Last rating time
 * - Daily completion rate
 */
export async function getArenaSummary(): Promise<GetArenaSummaryResult> {
  try {
    const auth = await getServerAuthContext()
    
    if (!auth) {
      throw new ServerAuthError(401, "Unauthorized")
    }
    
    // Build where clause for site isolation
    let siteFilter: any = {}
    
    if (auth.role !== "SUPER_ADMIN") {
      siteFilter.siteId = auth.siteId
    }
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Get today's rating events
    const todayRatingEvents = await basePrisma.arenaEvent.findMany({
      where: {
        ...siteFilter,
        type: "RATING_GIVEN",
        createdAt: { gte: today },
      },
      orderBy: { createdAt: "desc" },
    })
    
    // Count unique people rated today (from metaJson.ratedId)
    const uniquePeopleRated = new Set(
      todayRatingEvents
        .map((e) => e.metaJson?.ratedId)
        .filter(Boolean)
    ).size
    
    // Get last rating time
    const lastRatingTime = todayRatingEvents[0]?.createdAt || null
    
    // Calculate daily completion rate (if possible)
    // This requires knowing total users - we'll fetch from Rating model
    let dailyCompletionRate = 0
    
    if (auth.siteId || auth.role === "SUPER_ADMIN") {
      const todayDateString = new Date().toISOString().split("T")[0]
      
      const [totalActiveUsers, ratingsToday] = await Promise.all([
        basePrisma.user.count({
          where: {
            ...siteFilter,
            isActive: true,
          },
        }),
        basePrisma.rating.count({
          where: {
            ...siteFilter,
            date: todayDateString,
          },
        }),
      ])
      
      if (totalActiveUsers > 0) {
        dailyCompletionRate = Math.round(
          (uniquePeopleRated / totalActiveUsers) * 100
        )
      }
    }
    
    return {
      success: true,
      data: {
        todayRatingsCount: todayRatingEvents.length,
        todayPeopleRated: uniquePeopleRated,
        lastRatingTime,
        dailyCompletionRate,
      },
    }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return {
        success: false,
        error: error.message,
      }
    }
    console.error("Error fetching arena summary:", error)
    return {
      success: false,
      error: "Failed to fetch arena summary",
    }
  }
}

/**
 * Group similar events by user and type for same day
 * Internal helper function
 */
function groupSimilarEvents(events: ArenaEventData[]): ArenaEventGroup[] {
  const groups: Map<string, ArenaEventGroup> = new Map()
  
  for (const event of events) {
    const eventDate = event.createdAt.toISOString().split("T")[0]
    const userId = event.metaJson?.raterId || event.metaJson?.userId
    const userName = event.title.split(",")[0] || event.title.split(" ")[0]
    
    // Only group RATING_GIVEN events by same user on same day
    if (event.type === "RATING_GIVEN" && userId) {
      const groupKey = `${event.type}-${userId}-${eventDate}`
      
      if (groups.has(groupKey)) {
        const group = groups.get(groupKey)!
        group.count++
        group.lastEvent = event
      } else {
        groups.set(groupKey, {
          type: event.type,
          userId,
          userName,
          count: 1,
          firstEvent: event,
          lastEvent: event,
          date: eventDate,
        })
      }
    }
  }
  
  // Return only groups with count > 1
  return Array.from(groups.values()).filter((g) => g.count > 1)
}

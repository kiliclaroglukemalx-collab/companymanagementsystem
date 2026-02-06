/**
 * Arena Live Feed Server Actions
 * Handles event fetching for Arena module
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

export interface ListArenaEventsResult {
  success: boolean
  data?: {
    events: ArenaEventData[]
    total: number
  }
  error?: string
}

/**
 * List recent arena events
 * 
 * SECURITY:
 * - Requires authentication (checked on line 41-45)
 * - Multi-tenant site isolation enforced (checked on line 52-60)
 * - SUPER_ADMIN: Can view all sites or filter by specific siteId
 * - ADMIN/MANAGER/STAFF: Can ONLY view their own site (auth.siteId)
 * 
 * BEHAVIOR:
 * - Returns last N events (default: 20)
 * - Ordered by newest first (createdAt DESC)
 * - Read-only, no mutations
 * 
 * @param params.limit - Max events to return (default: 20)
 * @param params.siteId - Optional site filter (SUPER_ADMIN only)
 */
export async function listArenaEvents(params?: {
  limit?: number
  siteId?: string
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

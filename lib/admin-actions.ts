"use server"

/**
 * Admin Server Actions for Organization & User Management
 * All actions enforce role-based access control
 */

import { revalidatePath } from "next/cache"
import { basePrisma } from "@/lib/prisma"
import {
  requireSuperAdmin,
  requireAdminOrAbove,
  assertSiteAccess,
  ServerAuthError,
} from "@/lib/server-auth"
import { UserRole } from "@/lib/auth"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { z } from "zod"

// ============================================
// TYPES
// ============================================

export type ActionResult<T = unknown> = 
  | { success: true; data: T }
  | { success: false; error: string }

// ============================================
// SITE MANAGEMENT (SUPER_ADMIN only)
// ============================================

export async function listSites(): Promise<ActionResult<any[]>> {
  try {
    const auth = await requireSuperAdmin()
    
    const sites = await basePrisma.site.findMany({
      include: {
        _count: {
          select: {
            users: true,
            departments: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
    
    return { success: true, data: sites }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load sites" }
  }
}

export async function createSite(data: {
  name: string
}): Promise<ActionResult<any>> {
  try {
    await requireSuperAdmin()
    
    if (!data.name?.trim()) {
      return { success: false, error: "Site name is required" }
    }
    
    const existing = await basePrisma.site.findUnique({
      where: { name: data.name.trim() },
    })
    
    if (existing) {
      return { success: false, error: "Site name already exists" }
    }
    
    const site = await basePrisma.site.create({
      data: { name: data.name.trim() },
    })
    
    revalidatePath("/admin/sites")
    return { success: true, data: site }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to create site" }
  }
}

export async function updateSite(
  id: string,
  data: { name: string }
): Promise<ActionResult<any>> {
  try {
    await requireSuperAdmin()
    
    if (!data.name?.trim()) {
      return { success: false, error: "Site name is required" }
    }
    
    const site = await basePrisma.site.update({
      where: { id },
      data: { name: data.name.trim() },
    })
    
    revalidatePath("/admin/sites")
    return { success: true, data: site }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to update site" }
  }
}

export async function deleteSite(id: string): Promise<ActionResult<void>> {
  try {
    await requireSuperAdmin()
    
    await basePrisma.site.delete({
      where: { id },
    })
    
    revalidatePath("/admin/sites")
    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to delete site" }
  }
}

// ============================================
// DEPARTMENT MANAGEMENT (SUPER_ADMIN only)
// ============================================

export async function listDepartments(
  siteId?: string
): Promise<ActionResult<any[]>> {
  try {
    const auth = await requireSuperAdmin()
    
    const departments = await basePrisma.department.findMany({
      where: siteId ? { siteId } : undefined,
      include: {
        site: true,
        _count: {
          select: {
            users: true,
            ratingCriteria: true,
          },
        },
      },
      orderBy: [{ siteId: "asc" }, { name: "asc" }],
    })
    
    return { success: true, data: departments }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load departments" }
  }
}

export async function createDepartment(data: {
  siteId: string
  name: string
}): Promise<ActionResult<any>> {
  try {
    await requireSuperAdmin()
    
    if (!data.name?.trim()) {
      return { success: false, error: "Department name is required" }
    }
    
    if (!data.siteId) {
      return { success: false, error: "Site is required" }
    }
    
    const department = await basePrisma.department.create({
      data: {
        siteId: data.siteId,
        name: data.name.trim(),
      },
      include: { site: true },
    })
    
    revalidatePath("/admin/departments")
    return { success: true, data: department }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to create department" }
  }
}

export async function updateDepartment(
  id: string,
  data: { name: string }
): Promise<ActionResult<any>> {
  try {
    await requireSuperAdmin()
    
    if (!data.name?.trim()) {
      return { success: false, error: "Department name is required" }
    }
    
    const department = await basePrisma.department.update({
      where: { id },
      data: { name: data.name.trim() },
      include: { site: true },
    })
    
    revalidatePath("/admin/departments")
    return { success: true, data: department }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to update department" }
  }
}

export async function deleteDepartment(id: string): Promise<ActionResult<void>> {
  try {
    await requireSuperAdmin()
    
    await basePrisma.department.delete({
      where: { id },
    })
    
    revalidatePath("/admin/departments")
    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to delete department" }
  }
}

export async function listDepartmentsForCurrentAdmin(): Promise<ActionResult<any[]>> {
  try {
    const auth = await requireAdminOrAbove()
    
    // SUPER_ADMIN can see all departments
    // ADMIN can only see departments from their site
    const whereClause: any = {}
    
    if (auth.role === "ADMIN") {
      whereClause.siteId = auth.siteId
    }
    
    const departments = await basePrisma.department.findMany({
      where: whereClause,
      include: {
        site: true,
        _count: {
          select: {
            users: true,
            ratingCriteria: true,
          },
        },
      },
      orderBy: { name: "asc" },
    })
    
    return { success: true, data: departments }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load departments" }
  }
}

// ============================================
// USER MANAGEMENT (Role-based access)
// ============================================

export async function listUsers(filters?: {
  siteId?: string
  departmentId?: string
  role?: UserRole
  status?: "active" | "inactive" | "all"
  search?: string
  page?: number
  limit?: number
}): Promise<ActionResult<{ users: any[]; total: number; page: number; totalPages: number }>> {
  try {
    const auth = await requireAdminOrAbove()
    
    const page = filters?.page || 1
    const limit = filters?.limit || 50
    const skip = (page - 1) * limit
    
    // SUPER_ADMIN can see all users
    // ADMIN can only see users from their site
    const whereClause: any = {}
    
    if (auth.role === "ADMIN") {
      whereClause.siteId = auth.siteId
    } else if (filters?.siteId) {
      whereClause.siteId = filters.siteId
    }
    
    if (filters?.departmentId) {
      whereClause.departmentId = filters.departmentId
    }
    
    if (filters?.role) {
      whereClause.role = filters.role
    }
    
    if (filters?.status === "active") {
      whereClause.isActive = true
    } else if (filters?.status === "inactive") {
      whereClause.isActive = false
    }
    
    if (filters?.search) {
      whereClause.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
      ]
    }
    
    const [users, total] = await Promise.all([
      basePrisma.user.findMany({
        where: whereClause,
        include: {
          site: true,
          department: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      basePrisma.user.count({ where: whereClause }),
    ])
    
    return { 
      success: true, 
      data: { 
        users, 
        total, 
        page, 
        totalPages: Math.ceil(total / limit) 
      } 
    }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load users" }
  }
}

export async function getUser(id: string): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdminOrAbove()
    
    const user = await basePrisma.user.findUnique({
      where: { id },
      include: {
        site: true,
        department: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })
    
    if (!user) {
      return { success: false, error: "User not found" }
    }
    
    // Check site access
    assertSiteAccess(auth, user.siteId)
    
    return { success: true, data: user }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load user" }
  }
}

export async function createUser(data: {
  siteId: string
  departmentId?: string
  role: UserRole
  name: string
  email: string
  isActive?: boolean
}): Promise<ActionResult<{ user: any; tempPassword: string }>> {
  try {
    const auth = await requireAdminOrAbove()
    
    // Validate input
    if (!data.name?.trim()) {
      return { success: false, error: "Name is required" }
    }
    
    if (!data.email?.trim()) {
      return { success: false, error: "Email is required" }
    }
    
    if (!data.siteId) {
      return { success: false, error: "Site is required" }
    }
    
    // Check site access
    assertSiteAccess(auth, data.siteId)
    
    // ADMIN cannot create SUPER_ADMIN or ADMIN
    if (auth.role === "ADMIN") {
      if (data.role === "SUPER_ADMIN" || data.role === "ADMIN") {
        return {
          success: false,
          error: "You cannot create users with SUPER_ADMIN or ADMIN role",
        }
      }
    }
    
    // Check if email already exists
    const existing = await basePrisma.user.findUnique({
      where: { email: data.email.trim() },
    })
    
    if (existing) {
      return { success: false, error: "Email already exists" }
    }
    
    // Generate temporary password
    const tempPassword = crypto.randomBytes(9).toString("base64url")
    const passwordHash = await bcrypt.hash(tempPassword, 12)
    
    // Create user with password
    const user = await basePrisma.user.create({
      data: {
        siteId: data.siteId,
        departmentId: data.departmentId || null,
        role: data.role,
        name: data.name.trim(),
        email: data.email.trim(),
        isActive: data.isActive !== undefined ? data.isActive : true,
        mustChangePassword: true,
        createdByUserId: auth.userId,
        passwordCredential: {
          create: {
            passwordHash,
            passwordSetAt: new Date(),
          },
        },
        security: {
          create: {
            twoFactorEnabled: false,
          },
        },
      },
      include: {
        site: true,
        department: true,
      },
    })
    
    revalidatePath("/admin/users")
    return { success: true, data: { user, tempPassword } }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to create user" }
  }
}

export async function updateUser(
  id: string,
  data: {
    name?: string
    departmentId?: string | null
    role?: UserRole
  }
): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdminOrAbove()
    
    // Get user to check site access
    const existingUser = await basePrisma.user.findUnique({
      where: { id },
      select: { siteId: true, role: true },
    })
    
    if (!existingUser) {
      return { success: false, error: "User not found" }
    }
    
    assertSiteAccess(auth, existingUser.siteId)
    
    // ADMIN cannot modify SUPER_ADMIN or ADMIN users
    if (auth.role === "ADMIN") {
      if (existingUser.role === "SUPER_ADMIN" || existingUser.role === "ADMIN") {
        return { success: false, error: "You cannot modify admin users" }
      }
      
      if (data.role && (data.role === "SUPER_ADMIN" || data.role === "ADMIN")) {
        return { success: false, error: "You cannot assign admin roles" }
      }
    }
    
    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name.trim()
    if (data.departmentId !== undefined) updateData.departmentId = data.departmentId
    if (data.role !== undefined) updateData.role = data.role
    
    const user = await basePrisma.user.update({
      where: { id },
      data: updateData,
      include: {
        site: true,
        department: true,
      },
    })
    
    revalidatePath("/admin/users")
    return { success: true, data: user }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to update user" }
  }
}

export async function toggleUserActive(
  id: string,
  isActive: boolean
): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdminOrAbove()
    
    const existingUser = await basePrisma.user.findUnique({
      where: { id },
      select: { siteId: true, role: true },
    })
    
    if (!existingUser) {
      return { success: false, error: "User not found" }
    }
    
    assertSiteAccess(auth, existingUser.siteId)
    
    // ADMIN cannot deactivate SUPER_ADMIN or ADMIN
    if (auth.role === "ADMIN") {
      if (existingUser.role === "SUPER_ADMIN" || existingUser.role === "ADMIN") {
        return { success: false, error: "You cannot modify admin users" }
      }
    }
    
    const user = await basePrisma.user.update({
      where: { id },
      data: { isActive },
      include: {
        site: true,
        department: true,
      },
    })
    
    revalidatePath("/admin/users")
    return { success: true, data: user }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to update user status" }
  }
}

// ============================================
// RATING CRITERIA MANAGEMENT (SUPER_ADMIN only)
// ============================================

export async function listRatingCriteria(
  departmentId?: string
): Promise<ActionResult<any[]>> {
  try {
    await requireSuperAdmin()
    
    const criteria = await basePrisma.ratingCriteria.findMany({
      where: departmentId ? { departmentId } : undefined,
      include: {
        department: {
          include: {
            site: true,
          },
        },
      },
      orderBy: [{ departmentId: "asc" }, { name: "asc" }],
    })
    
    return { success: true, data: criteria }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load criteria" }
  }
}

export async function createRatingCriteria(data: {
  departmentId: string
  name: string
  weight: number
}): Promise<ActionResult<any>> {
  try {
    await requireSuperAdmin()
    
    if (!data.name?.trim()) {
      return { success: false, error: "Criteria name is required" }
    }
    
    if (!data.departmentId) {
      return { success: false, error: "Department is required" }
    }
    
    if (data.weight < 0 || data.weight > 100) {
      return { success: false, error: "Weight must be between 0 and 100" }
    }
    
    const criteria = await basePrisma.ratingCriteria.create({
      data: {
        departmentId: data.departmentId,
        name: data.name.trim(),
        weight: data.weight,
      },
      include: {
        department: {
          include: {
            site: true,
          },
        },
      },
    })
    
    revalidatePath("/admin/criteria")
    return { success: true, data: criteria }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to create criteria" }
  }
}

export async function updateRatingCriteria(
  id: string,
  data: {
    name?: string
    weight?: number
    isActive?: boolean
  }
): Promise<ActionResult<any>> {
  try {
    await requireSuperAdmin()
    
    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name.trim()
    if (data.weight !== undefined) {
      if (data.weight < 0 || data.weight > 100) {
        return { success: false, error: "Weight must be between 0 and 100" }
      }
      updateData.weight = data.weight
    }
    if (data.isActive !== undefined) updateData.isActive = data.isActive
    
    const criteria = await basePrisma.ratingCriteria.update({
      where: { id },
      data: updateData,
      include: {
        department: {
          include: {
            site: true,
          },
        },
      },
    })
    
    revalidatePath("/admin/criteria")
    return { success: true, data: criteria }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to update criteria" }
  }
}

export async function deleteRatingCriteria(id: string): Promise<ActionResult<void>> {
  try {
    await requireSuperAdmin()
    
    await basePrisma.ratingCriteria.delete({
      where: { id },
    })
    
    revalidatePath("/admin/criteria")
    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to delete criteria" }
  }
}

// ============================================
// SESSION MANAGEMENT (Role-based access)
// ============================================

export async function listSessions(): Promise<ActionResult<any[]>> {
  try {
    const auth = await requireAdminOrAbove()
    
    // Build where clause based on role
    const whereClause: any = {
      revokedAt: null, // Only show active sessions
    }
    
    if (auth.role === "ADMIN") {
      // ADMIN can only see sessions from their site
      whereClause.user = {
        siteId: auth.siteId,
      }
    }
    // SUPER_ADMIN can see all sessions (no additional filter)
    
    const sessions = await basePrisma.session.findMany({
      where: whereClause,
      include: {
        user: {
          include: {
            site: true,
            department: true,
          },
        },
      },
      orderBy: { lastSeenAt: "desc" },
    })
    
    return { success: true, data: sessions }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load sessions" }
  }
}

export async function terminateOtherSessions(
  currentSessionId: string
): Promise<ActionResult<{ count: number }>> {
  try {
    const auth = await requireAdminOrAbove()
    
    // Get current user's sessions
    const result = await basePrisma.session.updateMany({
      where: {
        userId: auth.userId,
        id: { not: currentSessionId },
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    })
    
    revalidatePath("/admin/sessions")
    return { success: true, data: { count: result.count } }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to terminate sessions" }
  }
}

export async function terminateSession(
  sessionId: string
): Promise<ActionResult<void>> {
  try {
    const auth = await requireAdminOrAbove()
    
    // Get the session to check access
    const session = await basePrisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    })
    
    if (!session) {
      return { success: false, error: "Session not found" }
    }
    
    // Check site access
    assertSiteAccess(auth, session.user.siteId)
    
    // Revoke the session
    await basePrisma.session.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    })
    
    revalidatePath("/admin/sessions")
    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to terminate session" }
  }
}

// ============================================
// SECURITY EVENTS MANAGEMENT (Role-based access)
// ============================================

// Validation schemas
const listSecurityEventsSchema = z.object({
  siteId: z.string().optional(),
  type: z.string().optional(),
  resolved: z.enum(["all", "open", "resolved"]).optional(),
  timeRange: z.enum(["24h", "7d", "30d", "all"]).optional(),
  search: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
})

const resolveSecurityEventSchema = z.object({
  eventId: z.string().min(1),
  resolution: z.string().optional(),
})

const bulkResolveSecurityEventsSchema = z.object({
  eventIds: z.array(z.string().min(1)).min(1).max(100),
})

export async function listSecurityEvents(filters?: {
  siteId?: string
  type?: string
  resolved?: "all" | "open" | "resolved"
  timeRange?: "24h" | "7d" | "30d" | "all"
  search?: string
  page?: number
  limit?: number
}): Promise<ActionResult<{ events: any[]; total: number; page: number; totalPages: number }>> {
  try {
    // Validate input
    const validated = listSecurityEventsSchema.parse(filters || {})
    
    const auth = await requireAdminOrAbove()
    
    const page = validated.page || 1
    const limit = validated.limit || 50
    const skip = (page - 1) * limit
    
    // SUPER_ADMIN can see all events
    // ADMIN can only see events from their site
    const whereClause: any = {}
    
    if (auth.role === "ADMIN") {
      whereClause.siteId = auth.siteId
    } else if (validated.siteId) {
      whereClause.siteId = validated.siteId
    }
    
    if (validated.type) {
      whereClause.type = validated.type
    }
    
    // Resolved filter
    if (validated.resolved === "open") {
      whereClause.resolvedAt = null
    } else if (validated.resolved === "resolved") {
      whereClause.resolvedAt = { not: null }
    }
    
    // Time range filter
    if (validated.timeRange && validated.timeRange !== "all") {
      const now = new Date()
      let startDate: Date
      
      switch (validated.timeRange) {
        case "24h":
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
          break
        case "7d":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case "30d":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        default:
          startDate = new Date(0)
      }
      
      whereClause.createdAt = { gte: startDate }
    }
    
    // Search functionality (user email/name + IP from metaJson)
    if (validated.search && validated.search.trim()) {
      const searchTerm = validated.search.trim()
      
      whereClause.OR = [
        // Search in user name
        { user: { name: { contains: searchTerm, mode: "insensitive" } } },
        // Search in user email
        { user: { email: { contains: searchTerm, mode: "insensitive" } } },
        // Search in IP (from metaJson)
        { metaJson: { path: ["ip"], string_contains: searchTerm } },
      ]
    }
    
    const [events, total] = await Promise.all([
      basePrisma.securityEvent.findMany({
        where: whereClause,
        include: {
          site: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      basePrisma.securityEvent.count({ where: whereClause }),
    ])
    
    return { 
      success: true, 
      data: { 
        events, 
        total, 
        page, 
        totalPages: Math.ceil(total / limit) 
      } 
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid filter parameters" }
    }
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load security events" }
  }
}

export async function getSecurityEvent(eventId: string): Promise<ActionResult<any>> {
  try {
    // Validate input
    const validated = z.string().min(1).parse(eventId)
    
    const auth = await requireAdminOrAbove()
    
    // Get the event
    const event = await basePrisma.securityEvent.findUnique({
      where: { id: validated },
      include: {
        site: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    })
    
    if (!event) {
      return { success: false, error: "Security event not found" }
    }
    
    // Check site access
    assertSiteAccess(auth, event.siteId)
    
    // Get resolver info if resolved
    let resolverInfo = null
    if (event.resolvedBy) {
      resolverInfo = await basePrisma.user.findUnique({
        where: { id: event.resolvedBy },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      })
    }
    
    return { 
      success: true, 
      data: {
        ...event,
        resolver: resolverInfo,
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid event ID" }
    }
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load security event" }
  }
}

export async function resolveSecurityEvent(
  eventId: string,
  resolution?: string
): Promise<ActionResult<any>> {
  try {
    // Validate input
    const validated = resolveSecurityEventSchema.parse({ eventId, resolution })
    
    const auth = await requireAdminOrAbove()
    
    // Get the event to check access
    const event = await basePrisma.securityEvent.findUnique({
      where: { id: validated.eventId },
    })
    
    if (!event) {
      return { success: false, error: "Security event not found" }
    }
    
    // Check site access
    assertSiteAccess(auth, event.siteId)
    
    // Check if already resolved
    if (event.resolvedAt) {
      return { success: false, error: "Event already resolved" }
    }
    
    // Update the event
    const updatedEvent = await basePrisma.securityEvent.update({
      where: { id: validated.eventId },
      data: { 
        resolvedAt: new Date(),
        resolvedBy: auth.userId,
        metaJson: {
          ...(event.metaJson as object),
          resolution: validated.resolution || "Resolved by admin",
        },
      },
      include: {
        site: true,
        user: true,
      },
    })
    
    revalidatePath("/admin/security-events")
    revalidatePath(`/admin/security-events/${validated.eventId}`)
    return { success: true, data: updatedEvent }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input" }
    }
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to resolve security event" }
  }
}

export async function bulkResolveSecurityEvents(
  eventIds: string[]
): Promise<ActionResult<{ count: number }>> {
  try {
    // Validate input
    const validated = bulkResolveSecurityEventsSchema.parse({ eventIds })
    
    const auth = await requireAdminOrAbove()
    
    // Get all events to check access
    const events = await basePrisma.securityEvent.findMany({
      where: { 
        id: { in: validated.eventIds },
        resolvedAt: null, // Only resolve unresolved events
      },
      select: { id: true, siteId: true },
    })
    
    if (events.length === 0) {
      return { success: false, error: "No unresolved events found" }
    }
    
    // Check site access for each event
    if (auth.role === "ADMIN") {
      const unauthorizedEvent = events.find(e => e.siteId !== auth.siteId)
      if (unauthorizedEvent) {
        return { success: false, error: "Site access denied for one or more events" }
      }
    }
    
    // Update all events
    const result = await basePrisma.securityEvent.updateMany({
      where: { 
        id: { in: events.map(e => e.id) },
      },
      data: { 
        resolvedAt: new Date(),
        resolvedBy: auth.userId,
      },
    })
    
    revalidatePath("/admin/security-events")
    return { success: true, data: { count: result.count } }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid event IDs" }
    }
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to resolve security events" }
  }
}

export async function getSecurityEventStats(): Promise<ActionResult<{
  total: number
  unresolved: number
  bySeverity: Record<string, number>
  byCategory: Record<string, number>
  recentCount: number
}>> {
  try {
    const auth = await requireAdminOrAbove()
    
    // Build where clause for site isolation
    const whereClause: any = {}
    if (auth.role === "ADMIN") {
      whereClause.siteId = auth.siteId
    }
    
    const [total, unresolved, recentCount] = await Promise.all([
      basePrisma.securityEvent.count({ where: whereClause }),
      basePrisma.securityEvent.count({ 
        where: { ...whereClause, resolvedAt: null } 
      }),
      basePrisma.securityEvent.count({
        where: {
          ...whereClause,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      }),
    ])
    
    // Get all events to calculate severity and category stats
    const allEvents = await basePrisma.securityEvent.findMany({
      where: whereClause,
      select: { type: true },
    })
    
    // Import security event metadata
    const { getEventMetadata } = await import("@/lib/security-events")
    
    const bySeverity: Record<string, number> = {}
    const byCategory: Record<string, number> = {}
    
    for (const event of allEvents) {
      const metadata = getEventMetadata(event.type)
      
      bySeverity[metadata.severity] = (bySeverity[metadata.severity] || 0) + 1
      byCategory[metadata.category] = (byCategory[metadata.category] || 0) + 1
    }
    
    return {
      success: true,
      data: {
        total,
        unresolved,
        bySeverity,
        byCategory,
        recentCount,
      },
    }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load security event statistics" }
  }
}

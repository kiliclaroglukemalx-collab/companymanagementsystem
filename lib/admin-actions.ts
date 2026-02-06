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

// ============================================
// USER MANAGEMENT (Role-based access)
// ============================================

export async function listUsers(filters?: {
  siteId?: string
  departmentId?: string
  role?: UserRole
}): Promise<ActionResult<any[]>> {
  try {
    const auth = await requireAdminOrAbove()
    
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
    
    const users = await basePrisma.user.findMany({
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
    })
    
    return { success: true, data: users }
  } catch (error) {
    if (error instanceof ServerAuthError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Failed to load users" }
  }
}

export async function createUser(data: {
  siteId: string
  departmentId?: string
  role: UserRole
  name: string
  email: string
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
        isActive: true,
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

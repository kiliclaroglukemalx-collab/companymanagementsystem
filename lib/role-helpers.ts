/**
 * Role-based access control helpers
 * Central location for all role checks
 */

import type { UserRole } from "@prisma/client"

/**
 * Check if user has admin-like privileges
 * @param role User's role
 * @returns true if SUPER_ADMIN or ADMIN
 */
export function isAdminLike(role: UserRole): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN"
}

/**
 * Check if user is super admin
 * @param role User's role
 * @returns true if SUPER_ADMIN
 */
export function isSuperAdmin(role: UserRole): boolean {
  return role === "SUPER_ADMIN"
}

/**
 * Check if user has limited access (MANAGER or STAFF)
 * @param role User's role
 * @returns true if MANAGER or STAFF
 */
export function isLimitedAccess(role: UserRole): boolean {
  return role === "MANAGER" || role === "STAFF"
}

/**
 * Check if user can manage other users
 * @param role User's role
 * @returns true if SUPER_ADMIN or ADMIN
 */
export function canManageUsers(role: UserRole): boolean {
  return isAdminLike(role)
}

/**
 * Check if user can view all sites
 * @param role User's role
 * @returns true if SUPER_ADMIN
 */
export function canViewAllSites(role: UserRole): boolean {
  return isSuperAdmin(role)
}

/**
 * Check if user can manage criteria
 * @param role User's role
 * @returns true if SUPER_ADMIN or ADMIN
 */
export function canManageCriteria(role: UserRole): boolean {
  return isAdminLike(role)
}

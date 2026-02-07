/**
 * Server-side auth utilities for Server Actions
 */

import { cookies } from "next/headers"
import { AUTH_COOKIE, verifySessionToken, type AuthContext, type UserRole } from "@/lib/auth"
import { basePrisma } from "@/lib/prisma"

export class ServerAuthError extends Error {
  status: number
  
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = "ServerAuthError"
  }
}

/**
 * Get current auth context from cookies in Server Actions/Components
 */
export async function getServerAuthContext(): Promise<AuthContext | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE)?.value
  
  if (!token) {
    return null
  }
  
  const payload = await verifySessionToken(token)
  if (!payload) {
    return null
  }
  
  // Verify session is still valid
  const session = await basePrisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  })
  
  if (!session || session.revokedAt) {
    return null
  }
  
  if (
    !session.user.isActive ||
    session.user.siteId !== payload.siteId ||
    session.user.role !== payload.role
  ) {
    return null
  }
  
  // Update last seen
  await basePrisma.session.update({
    where: { id: session.id },
    data: { lastSeenAt: new Date() },
  })
  
  return payload
}

/**
 * Require auth in Server Actions
 */
export async function requireServerAuth(): Promise<AuthContext> {
  const auth = await getServerAuthContext()
  if (!auth) {
    throw new ServerAuthError(401, "Unauthorized")
  }
  return auth
}

/**
 * Require specific role
 */
export async function requireRole(requiredRole: UserRole): Promise<AuthContext> {
  const auth = await requireServerAuth()
  if (auth.role !== requiredRole) {
    throw new ServerAuthError(403, "Forbidden: Insufficient permissions")
  }
  return auth
}

/**
 * Require SUPER_ADMIN role
 */
export async function requireSuperAdmin(): Promise<AuthContext> {
  return requireRole("SUPER_ADMIN")
}

/**
 * Require SUPER_ADMIN or ADMIN role
 */
export async function requireAdminOrAbove(): Promise<AuthContext> {
  const auth = await requireServerAuth()
  if (auth.role !== "SUPER_ADMIN" && auth.role !== "ADMIN") {
    throw new ServerAuthError(403, "Forbidden: Admin access required")
  }
  return auth
}

/**
 * Check if user has access to a specific site
 */
export function assertSiteAccess(auth: AuthContext, siteId: string) {
  // SUPER_ADMIN can access any site
  if (auth.role === "SUPER_ADMIN") {
    return
  }
  
  // Others can only access their own site
  if (auth.siteId !== siteId) {
    throw new ServerAuthError(403, "Forbidden: Site access denied")
  }
}

/**
 * Get current user with full details (for API routes)
 */
export async function getCurrentUser() {
  const auth = await getServerAuthContext()
  if (!auth) {
    return null
  }
  
  const user = await basePrisma.user.findUnique({
    where: { id: auth.userId },
    include: {
      department: true,
      site: true
    }
  })
  
  return user
}

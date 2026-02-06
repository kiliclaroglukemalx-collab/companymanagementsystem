"use server"

/**
 * Server-side utility for logging security events
 */

import { basePrisma } from "@/lib/prisma"
import { SecurityEventTypeValue } from "@/lib/security-events"

export interface LogSecurityEventParams {
  siteId: string
  userId?: string | null
  type: SecurityEventTypeValue
  metaJson?: Record<string, any>
}

/**
 * Log a security event to the database
 * This is a server-only function that can be called from Server Actions or API routes
 */
export async function logSecurityEvent({
  siteId,
  userId = null,
  type,
  metaJson = {},
}: LogSecurityEventParams): Promise<void> {
  try {
    await basePrisma.securityEvent.create({
      data: {
        siteId,
        userId,
        type,
        metaJson,
      },
    })
  } catch (error) {
    // Log error but don't throw - security event logging should not break main flow
    console.error("Failed to log security event:", error)
  }
}

/**
 * Convenience function to log authentication events
 */
export async function logAuthEvent(
  siteId: string,
  userId: string | null,
  type: SecurityEventTypeValue,
  meta?: {
    ip?: string
    userAgent?: string
    success?: boolean
    reason?: string
  }
) {
  await logSecurityEvent({
    siteId,
    userId,
    type,
    metaJson: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  })
}

/**
 * Convenience function to log session events
 */
export async function logSessionEvent(
  siteId: string,
  userId: string,
  sessionId: string,
  type: SecurityEventTypeValue,
  meta?: {
    ip?: string
    deviceLabel?: string
    reason?: string
  }
) {
  await logSecurityEvent({
    siteId,
    userId,
    type,
    metaJson: {
      sessionId,
      timestamp: new Date().toISOString(),
      ...meta,
    },
  })
}

/**
 * Convenience function to log access control events
 */
export async function logAccessEvent(
  siteId: string,
  userId: string | null,
  type: SecurityEventTypeValue,
  meta: {
    resource: string
    action: string
    ip?: string
    reason?: string
  }
) {
  await logSecurityEvent({
    siteId,
    userId,
    type,
    metaJson: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  })
}

/**
 * Convenience function to log security alerts
 */
export async function logSecurityAlert(
  siteId: string,
  userId: string | null,
  type: SecurityEventTypeValue,
  meta: {
    ip?: string
    endpoint?: string
    payload?: any
    reason?: string
  }
) {
  await logSecurityEvent({
    siteId,
    userId,
    type,
    metaJson: {
      timestamp: new Date().toISOString(),
      severity: "high",
      ...meta,
    },
  })
}

import { basePrisma } from "@/lib/prisma"

export type SecurityEventType =
  | "ip_conflict"
  | "two_factor_enabled"
  | "two_factor_disabled"
  | "password_changed"
  | "password_changed_first"
  | "sessions_revoked_others"

export async function logSecurityEvent(params: {
  siteId: string
  userId?: string
  type: SecurityEventType
  meta?: Record<string, unknown>
}) {
  return basePrisma.securityEvent.create({
    data: {
      siteId: params.siteId,
      userId: params.userId,
      type: params.type,
      metaJson: params.meta ?? {},
    },
  })
}

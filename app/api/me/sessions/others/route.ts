import { NextResponse } from "next/server"
import { basePrisma } from "@/lib/prisma"
import { AuthError, requireAuth } from "@/lib/auth"
import { logSecurityEvent } from "@/lib/log-security-event"

export async function DELETE(request: Request) {
  let auth
  try {
    auth = await requireAuth(request)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    throw error
  }

  await basePrisma.session.updateMany({
    where: {
      userId: auth.userId,
      id: { not: auth.sessionId },
      revokedAt: null,
    },
    data: { revokedAt: new Date() },
  })

  await logSecurityEvent({
    siteId: auth.siteId,
    userId: auth.userId,
    type: "sessions_revoked_others",
  })

  return NextResponse.json({ ok: true })
}

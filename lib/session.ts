import { NextResponse } from "next/server"
import { basePrisma } from "@/lib/prisma"
import { setSessionCookie, signSessionToken, type UserRole } from "@/lib/auth"

export async function createSessionResponse(params: {
  userId: string
  siteId: string
  role: UserRole
  ip: string
  deviceLabel?: string
  deviceFingerprintHash: string
  body?: Record<string, unknown>
}) {
  const session = await basePrisma.session.create({
    data: {
      userId: params.userId,
      ip: params.ip,
      deviceLabel: params.deviceLabel,
      deviceFingerprintHash: params.deviceFingerprintHash,
      lastSeenAt: new Date(),
    },
  })

  const token = await signSessionToken({
    sessionId: session.id,
    userId: params.userId,
    siteId: params.siteId,
    role: params.role,
  })

  const response = NextResponse.json(params.body ?? { ok: true })
  setSessionCookie(response, token)
  return response
}

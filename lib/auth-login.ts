import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

import { basePrisma } from "@/lib/prisma"
import { getRequestIp, hashDeviceFingerprint } from "@/lib/auth"
import { checkRateLimit } from "@/lib/rate-limit"
import { isTrustedIp } from "@/lib/trusted-ip"
import { logSecurityEvent } from "@/lib/security-events"
import { createSessionResponse } from "@/lib/session"

export async function handlePasswordLogin(params: {
  request: Request
  email: string
  password: string
  deviceLabel?: string
}) {
  const { request, email, password, deviceLabel } = params
  const ip = getRequestIp(request)

  if (!checkRateLimit(`login:${ip}:${email}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 })
  }

  const user = await basePrisma.user.findUnique({
    where: { email },
    include: { passwordCredential: true },
  })

  if (!user || !user.isActive || !user.passwordCredential) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.passwordCredential.passwordHash
  )

  if (!passwordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  if (user.mustChangePassword) {
    return NextResponse.json(
      { error: "MUST_CHANGE_PASSWORD" },
      { status: 409 }
    )
  }

  const conflictSession = await basePrisma.session.findFirst({
    where: {
      ip,
      revokedAt: null,
      userId: { not: user.id },
      user: { siteId: user.siteId },
    },
    select: { userId: true },
  })

  if (conflictSession) {
    const trusted = await isTrustedIp(user.siteId, ip)
    await logSecurityEvent({
      siteId: user.siteId,
      userId: user.id,
      type: "ip_conflict",
      meta: {
        ip,
        conflictingUserId: conflictSession.userId,
        trusted,
      },
    })

    if (!trusted) {
      return NextResponse.json({ error: "IP_CONFLICT" }, { status: 403 })
    }
  }

  const deviceFingerprintHash = hashDeviceFingerprint(
    request.headers.get("x-device-fingerprint")
  )

  return createSessionResponse({
    userId: user.id,
    siteId: user.siteId,
    role: user.role,
    ip,
    deviceLabel,
    deviceFingerprintHash,
  })
}

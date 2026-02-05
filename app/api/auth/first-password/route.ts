import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcrypt"

import { basePrisma } from "@/lib/prisma"
import { getRequestIp, hashDeviceFingerprint } from "@/lib/auth"
import { checkRateLimit } from "@/lib/rate-limit"
import { createSessionResponse } from "@/lib/session"
import { logSecurityEvent } from "@/lib/security-events"

const firstPasswordSchema = z.object({
  email: z.string().email(),
  temp_password: z.string().min(1),
  new_password: z.string().min(8),
  device_label: z.string().optional(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = firstPasswordSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const { email, temp_password, new_password, device_label } = parsed.data
  const ip = getRequestIp(request)

  if (!checkRateLimit(`first-password:${ip}:${email}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 })
  }

  const user = await basePrisma.user.findUnique({
    where: { email },
    include: { passwordCredential: true },
  })

  if (!user || !user.isActive || !user.passwordCredential) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  if (!user.mustChangePassword) {
    return NextResponse.json({ error: "NOT_REQUIRED" }, { status: 409 })
  }

  const tempMatch = await bcrypt.compare(
    temp_password,
    user.passwordCredential.passwordHash
  )

  if (!tempMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const newHash = await bcrypt.hash(new_password, 12)

  await basePrisma.user.update({
    where: { id: user.id },
    data: { mustChangePassword: false },
  })

  await basePrisma.passwordCredential.update({
    where: { userId: user.id },
    data: {
      passwordHash: newHash,
      passwordSetAt: new Date(),
    },
  })

  await logSecurityEvent({
    siteId: user.siteId,
    userId: user.id,
    type: "password_changed_first",
  })

  const deviceFingerprintHash = hashDeviceFingerprint(
    request.headers.get("x-device-fingerprint")
  )

  return createSessionResponse({
    userId: user.id,
    siteId: user.siteId,
    role: user.role,
    ip,
    deviceLabel: device_label,
    deviceFingerprintHash,
  })
}

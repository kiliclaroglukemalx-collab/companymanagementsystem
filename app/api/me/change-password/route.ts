import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcrypt"

import { basePrisma, getSiteScopedPrisma } from "@/lib/prisma"
import { AuthError, requireAuth } from "@/lib/auth"
import { logSecurityEvent } from "@/lib/log-security-event"

const changePasswordSchema = z.object({
  current_password: z.string().min(1),
  new_password: z.string().min(8),
})

export async function POST(request: Request) {
  let auth
  try {
    auth = await requireAuth(request)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    throw error
  }
  const body = await request.json().catch(() => null)
  const parsed = changePasswordSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const prisma = getSiteScopedPrisma(auth.siteId)
  const user = await prisma.user.findFirst({
    where: { id: auth.userId },
    include: { passwordCredential: true },
  })

  if (!user || !user.passwordCredential) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const ok = await bcrypt.compare(
    parsed.data.current_password,
    user.passwordCredential.passwordHash
  )

  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const newHash = await bcrypt.hash(parsed.data.new_password, 12)
  await basePrisma.passwordCredential.update({
    where: { userId: user.id },
    data: {
      passwordHash: newHash,
      passwordSetAt: new Date(),
    },
  })

  await prisma.user.update({
    where: { id: user.id, siteId: auth.siteId },
    data: { mustChangePassword: false },
  })

  await logSecurityEvent({
    siteId: user.siteId,
    userId: user.id,
    type: "password_changed",
  })

  return NextResponse.json({ ok: true })
}

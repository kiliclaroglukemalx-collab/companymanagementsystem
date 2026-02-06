import { NextResponse } from "next/server"
import { z } from "zod"
import { basePrisma } from "@/lib/prisma"
import { AuthError, requireAuth } from "@/lib/auth"
import { logSecurityEvent } from "@/lib/log-security-event"

const schema = z.object({
  enabled: z.boolean(),
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
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const updated = await basePrisma.userSecurity.upsert({
    where: { userId: auth.userId },
    update: { twoFactorEnabled: parsed.data.enabled },
    create: {
      userId: auth.userId,
      twoFactorEnabled: parsed.data.enabled,
    },
  })

  await logSecurityEvent({
    siteId: auth.siteId,
    userId: auth.userId,
    type: parsed.data.enabled ? "two_factor_enabled" : "two_factor_disabled",
  })

  return NextResponse.json({ ok: true, twoFactorEnabled: updated.twoFactorEnabled })
}

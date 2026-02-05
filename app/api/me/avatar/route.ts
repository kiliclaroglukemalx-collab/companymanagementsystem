import { NextResponse } from "next/server"
import { z } from "zod"
import { getSiteScopedPrisma } from "@/lib/prisma"
import { AuthError, requireAuth } from "@/lib/auth"

const avatarSchema = z.object({
  avatar_key: z.string().min(1),
})

export async function PATCH(request: Request) {
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
  const parsed = avatarSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const prisma = getSiteScopedPrisma(auth.siteId)
  const user = await prisma.user.updateMany({
    where: { id: auth.userId },
    data: { avatarKey: parsed.data.avatar_key },
  })

  if (user.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}

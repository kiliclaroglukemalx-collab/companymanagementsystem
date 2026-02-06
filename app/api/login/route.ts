import { NextResponse } from "next/server"
import { z } from "zod"
import { handlePasswordLogin } from "@/lib/auth-login"

const legacySchema = z.object({
  password: z.string().min(1),
  device_label: z.string().optional(),
  email: z.string().email().optional(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = legacySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const fallbackEmail = process.env.DEFAULT_ADMIN_EMAIL
  const email = parsed.data.email || fallbackEmail

  if (!email) {
    return NextResponse.json(
      { error: "Email required. Use /api/auth/login." },
      { status: 400 }
    )
  }

  return handlePasswordLogin({
    request,
    email,
    password: parsed.data.password,
    deviceLabel: parsed.data.device_label,
  })
}

import { NextResponse } from "next/server"
import { z } from "zod"
import { handlePasswordLogin } from "@/lib/auth-login"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  device_label: z.string().optional(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const { email, password, device_label } = parsed.data
  return handlePasswordLogin({
    request,
    email,
    password,
    deviceLabel: device_label,
  })
}

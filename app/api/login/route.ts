import { NextResponse } from "next/server"
import { SignJWT } from "jose"

const AUTH_COOKIE = "cms-auth"

export async function POST(request: Request) {
  const ADMIN_PASSWORD = "1530Bb_4560"
  const secret = process.env.AUTH_SECRET_KEY
  if (!secret) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 })
  }

  const body = await request.json().catch(() => null)
  const password = body?.password

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(secret))

  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  })
  return response
}

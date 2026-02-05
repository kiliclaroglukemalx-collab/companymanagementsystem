import { NextResponse } from "next/server"
import { basePrisma } from "@/lib/prisma"
import { AuthError, clearSessionCookie, getAuthContext } from "@/lib/auth"

export async function POST(request: Request) {
  let auth = null
  try {
    auth = await getAuthContext(request)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    throw error
  }
  const response = NextResponse.json({ ok: true })

  if (auth?.sessionId) {
    await basePrisma.session.update({
      where: { id: auth.sessionId },
      data: { revokedAt: new Date() },
    })
  }

  clearSessionCookie(response)
  return response
}

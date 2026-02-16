import { NextResponse } from "next/server"
import { basePrisma } from "@/lib/prisma"
import { clearSessionCookie, getAuthContext } from "@/lib/auth"

export async function POST(request: Request) {
  const response = NextResponse.json({ ok: true })

  try {
    const auth = await getAuthContext(request)
    if (auth?.sessionId) {
      await basePrisma.session.update({
        where: { id: auth.sessionId },
        data: { revokedAt: new Date() },
      })
    }
  } catch {
    // Auth or DB errors should not prevent logout
  }

  clearSessionCookie(response)
  return response
}

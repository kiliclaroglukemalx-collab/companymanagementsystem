import { NextResponse } from "next/server"
import { basePrisma } from "@/lib/prisma"
import { AuthError, requireAuth } from "@/lib/auth"

export async function GET(request: Request) {
  let auth
  try {
    auth = await requireAuth(request)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    throw error
  }

  const sessions = await basePrisma.session.findMany({
    where: { userId: auth.userId },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({
    currentSessionId: auth.sessionId,
    sessions: sessions.map((session) => ({
      id: session.id,
      ip: session.ip,
      deviceLabel: session.deviceLabel,
      createdAt: session.createdAt,
      lastSeenAt: session.lastSeenAt,
      revokedAt: session.revokedAt,
    })),
  })
}

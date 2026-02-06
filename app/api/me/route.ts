import { NextResponse } from "next/server"
import { getSiteScopedPrisma } from "@/lib/prisma"
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

  const prisma = getSiteScopedPrisma(auth.siteId)
  const user = await prisma.user.findFirst({
    where: { id: auth.userId },
    include: { department: true },
  })

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    siteId: user.siteId,
    department: user.department
      ? { id: user.department.id, name: user.department.name }
      : null,
    avatarKey: user.avatarKey,
  })
}

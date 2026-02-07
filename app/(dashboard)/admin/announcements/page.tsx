import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifySessionToken, AUTH_COOKIE } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AnnouncementsManagement } from "@/components/admin/announcements-management"

async function getServerSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE)?.value
  
  if (!token) return null
  
  try {
    const payload = await verifySessionToken(token)
    return payload ? { user: { id: payload.userId } } : null
  } catch {
    return null
  }
}

export default async function AnnouncementsPage() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    redirect("/login")
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
    redirect("/")
  }

  const isManager = user.role === "SUPER_ADMIN" || user.role === "ADMIN"

  return <AnnouncementsManagement isManager={isManager} />
}

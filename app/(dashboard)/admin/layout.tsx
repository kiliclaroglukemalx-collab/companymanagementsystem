import { redirect } from "next/navigation"
import { getServerAuthContext } from "@/lib/server-auth"
import { AdminNav } from "@/components/admin/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = await getServerAuthContext()
  
  // Require authentication
  if (!auth) {
    redirect("/login")
  }
  
  // Require ADMIN or SUPER_ADMIN role
  if (auth.role !== "SUPER_ADMIN" && auth.role !== "ADMIN") {
    redirect("/")
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <AdminNav auth={auth} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

import { redirect } from "next/navigation"
import { getServerAuthContext } from "@/lib/server-auth"
import { ArenaNav } from "@/components/arena/arena-nav"

export default async function ArenaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = await getServerAuthContext()
  
  // Require authentication
  if (!auth) {
    redirect("/login")
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <ArenaNav auth={auth} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

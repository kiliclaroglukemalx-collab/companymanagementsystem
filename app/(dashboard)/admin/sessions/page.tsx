import { listSessions } from "@/lib/admin-actions"
import { SessionsManagement } from "@/components/admin/sessions-management"
import { getServerAuthContext } from "@/lib/server-auth"
import { AlertCircle } from "lucide-react"

export default async function SessionsPage() {
  const auth = await getServerAuthContext()
  
  if (!auth) {
    return null
  }
  
  const sessionsResult = await listSessions()
  
  if (!sessionsResult.success) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">Access Denied</div>
          <div className="text-sm">{sessionsResult.error}</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Session Management</h1>
        <p className="mt-2 text-slate-600">
          Monitor and manage active user sessions
        </p>
      </div>
      
      <SessionsManagement
        initialSessions={sessionsResult.data}
        currentSessionId={auth.sessionId}
        currentUserRole={auth.role}
      />
    </div>
  )
}

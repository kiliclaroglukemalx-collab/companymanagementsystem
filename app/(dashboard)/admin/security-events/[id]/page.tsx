import { getSecurityEvent, resolveSecurityEvent } from "@/lib/admin-actions"
import { getServerAuthContext } from "@/lib/server-auth"
import { SecurityEventDetail } from "@/components/admin/security-event-detail"
import { AlertCircle } from "lucide-react"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default async function SecurityEventDetailPage({ params }: PageProps) {
  const auth = await getServerAuthContext()
  
  if (!auth) {
    return null
  }
  
  // Block MANAGER and STAFF
  if (auth.role === "MANAGER" || auth.role === "STAFF") {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">Access Denied</div>
          <div className="text-sm">
            You do not have permission to access security events.
          </div>
        </div>
      </div>
    )
  }
  
  const eventResult = await getSecurityEvent(params.id)
  
  if (!eventResult.success) {
    if (eventResult.error.includes("not found")) {
      notFound()
    }
    
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">Error</div>
          <div className="text-sm">{eventResult.error}</div>
        </div>
      </div>
    )
  }
  
  return (
    <SecurityEventDetail
      event={eventResult.data}
      currentUserId={auth.userId}
      currentUserRole={auth.role}
    />
  )
}

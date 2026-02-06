import { listSecurityEvents, listSites } from "@/lib/admin-actions"
import { getServerAuthContext } from "@/lib/server-auth"
import { SecurityEventsTable } from "@/components/admin/security-events-table"
import { AlertCircle, Shield } from "lucide-react"

interface SearchParams {
  search?: string
  type?: string
  resolved?: string
  timeRange?: string
  siteId?: string
  page?: string
}

export default async function SecurityEventsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
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
  
  const page = parseInt(searchParams.page || "1")
  
  const [eventsResult, sitesResult] = await Promise.all([
    listSecurityEvents({
      type: searchParams.type,
      resolved: searchParams.resolved as any,
      timeRange: searchParams.timeRange as any,
      search: searchParams.search,
      siteId: searchParams.siteId,
      page,
      limit: 50,
    }),
    auth.role === "SUPER_ADMIN" ? listSites() : Promise.resolve({ success: true, data: [] }),
  ])
  
  if (!eventsResult.success) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">Error</div>
          <div className="text-sm">{eventsResult.error}</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          Security Events
        </h1>
        <p className="mt-2 text-slate-600">
          Monitor and manage security events across the system
        </p>
      </div>
      
      <SecurityEventsTable
        events={eventsResult.data.events}
        total={eventsResult.data.total}
        page={eventsResult.data.page}
        totalPages={eventsResult.data.totalPages}
        sites={sitesResult.success ? sitesResult.data : []}
        currentUserRole={auth.role}
        searchParams={searchParams}
      />
    </div>
  )
}

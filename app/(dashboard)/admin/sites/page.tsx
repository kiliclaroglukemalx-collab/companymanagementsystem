import { listSites } from "@/lib/admin-actions"
import { SitesManagement } from "@/components/admin/sites-management"
import { AlertCircle } from "lucide-react"

export default async function SitesPage() {
  const result = await listSites()
  
  if (!result.success) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">Access Denied</div>
          <div className="text-sm">{result.error}</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Site Management</h1>
        <p className="mt-2 text-slate-600">
          Manage all sites in the system (SUPER_ADMIN only)
        </p>
      </div>
      
      <SitesManagement initialSites={result.data} />
    </div>
  )
}

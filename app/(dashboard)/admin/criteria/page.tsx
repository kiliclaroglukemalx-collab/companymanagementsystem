import { listRatingCriteria, listDepartments } from "@/lib/admin-actions"
import { CriteriaManagement } from "@/components/admin/criteria-management"
import { AlertCircle } from "lucide-react"

export default async function CriteriaPage() {
  const [criteriaResult, departmentsResult] = await Promise.all([
    listRatingCriteria(),
    listDepartments(),
  ])
  
  if (!criteriaResult.success) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">Access Denied</div>
          <div className="text-sm">{criteriaResult.error}</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Rating Criteria Management
        </h1>
        <p className="mt-2 text-slate-600">
          Define rating criteria for departments (SUPER_ADMIN only)
        </p>
      </div>
      
      <CriteriaManagement
        initialCriteria={criteriaResult.data}
        departments={departmentsResult.success ? departmentsResult.data : []}
      />
    </div>
  )
}

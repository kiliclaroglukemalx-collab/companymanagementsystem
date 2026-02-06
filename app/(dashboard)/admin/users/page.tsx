import { listUsers, listSites, listDepartments } from "@/lib/admin-actions"
import { UsersManagement } from "@/components/admin/users-management"
import { getServerAuthContext } from "@/lib/server-auth"
import { AlertCircle } from "lucide-react"

export default async function UsersPage() {
  const auth = await getServerAuthContext()
  
  if (!auth) {
    return null
  }
  
  const [usersResult, sitesResult, departmentsResult] = await Promise.all([
    listUsers(),
    listSites(),
    listDepartments(),
  ])
  
  if (!usersResult.success) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">Access Denied</div>
          <div className="text-sm">{usersResult.error}</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
        <p className="mt-2 text-slate-600">
          Manage users across the system
        </p>
      </div>
      
      <UsersManagement
        initialUsers={usersResult.data}
        sites={sitesResult.success ? sitesResult.data : []}
        departments={departmentsResult.success ? departmentsResult.data : []}
        currentUserRole={auth.role}
      />
    </div>
  )
}

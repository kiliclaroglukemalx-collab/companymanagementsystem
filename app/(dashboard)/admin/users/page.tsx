import { listUsers, listSites, listDepartmentsForCurrentAdmin } from "@/lib/admin-actions"
import { getServerAuthContext } from "@/lib/server-auth"
import { isSuperAdmin } from "@/lib/role-helpers"
import { UsersTable } from "@/components/admin/users-table"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { TR } from "@/lib/tr-constants"

interface SearchParams {
  search?: string
  role?: string
  status?: "active" | "inactive" | "all"
  departmentId?: string
  page?: string
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const auth = await getServerAuthContext()
  
  if (!auth) {
    return null
  }
  
  // Only SUPER_ADMIN can access user management
  if (!isSuperAdmin(auth.role)) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">{TR.errors.accessDenied}</div>
          <div className="text-sm">
            {TR.errors.userManagementDenied}
          </div>
        </div>
      </div>
    )
  }
  
  const page = parseInt(searchParams.page || "1")
  
  const [usersResult, sitesResult, departmentsResult] = await Promise.all([
    listUsers({
      search: searchParams.search,
      role: searchParams.role as any,
      status: searchParams.status || "all",
      departmentId: searchParams.departmentId,
      page,
      limit: 50,
    }),
    isSuperAdmin(auth.role) ? listSites() : Promise.resolve({ success: true, data: [] }),
    listDepartmentsForCurrentAdmin(),
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{TR.users.title}</h1>
          <p className="mt-2 text-slate-600">
            {TR.users.subtitle}
          </p>
        </div>
        
        {/* Only SUPER_ADMIN can create users */}
        {isSuperAdmin(auth.role) && (
          <Link href="/admin/users/new">
            <Button className="gap-2 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4" />
              {TR.users.createNew}
            </Button>
          </Link>
        )}
      </div>
      
      <UsersTable
        users={usersResult.data.users}
        total={usersResult.data.total}
        page={usersResult.data.page}
        totalPages={usersResult.data.totalPages}
        sites={sitesResult.success ? sitesResult.data : []}
        departments={departmentsResult.success ? departmentsResult.data : []}
        currentUserRole={auth.role}
        searchParams={searchParams}
      />
    </div>
  )
}

import { getServerAuthContext } from "@/lib/server-auth"
import { listSites, listDepartmentsForCurrentAdmin } from "@/lib/admin-actions"
import { UserCreateForm } from "@/components/admin/user-create-form"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewUserPage() {
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
            You do not have permission to create users.
          </div>
        </div>
      </div>
    )
  }
  
  const [sitesResult, departmentsResult] = await Promise.all([
    auth.role === "SUPER_ADMIN" ? listSites() : Promise.resolve({ success: true, data: [] }),
    listDepartmentsForCurrentAdmin(),
  ])
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create User</h1>
          <p className="mt-2 text-slate-600">
            Add a new user to the system
          </p>
        </div>
      </div>
      
      <UserCreateForm
        sites={sitesResult.success ? sitesResult.data : []}
        departments={departmentsResult.success ? departmentsResult.data : []}
        currentUserRole={auth.role}
        currentUserSiteId={auth.siteId}
      />
    </div>
  )
}

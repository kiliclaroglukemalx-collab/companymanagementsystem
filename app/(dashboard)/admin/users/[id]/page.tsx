import { getServerAuthContext } from "@/lib/server-auth"
import { getUser, listDepartmentsForCurrentAdmin } from "@/lib/admin-actions"
import { UserEditForm } from "@/components/admin/user-edit-form"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export default async function EditUserPage({
  params,
}: {
  params: { id: string }
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
            You do not have permission to edit users.
          </div>
        </div>
      </div>
    )
  }
  
  const [userResult, departmentsResult] = await Promise.all([
    getUser(params.id),
    listDepartmentsForCurrentAdmin(),
  ])
  
  if (!userResult.success) {
    if (userResult.error === "User not found") {
      notFound()
    }
    
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">Access Denied</div>
          <div className="text-sm">{userResult.error}</div>
        </div>
      </div>
    )
  }
  
  const user = userResult.data
  
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
          <h1 className="text-3xl font-bold text-slate-900">Edit User</h1>
          <p className="mt-2 text-slate-600">
            Update user information for {user.name}
          </p>
        </div>
      </div>
      
      <UserEditForm
        user={user}
        departments={departmentsResult.success ? departmentsResult.data : []}
        currentUserRole={auth.role}
      />
    </div>
  )
}

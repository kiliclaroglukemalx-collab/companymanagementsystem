import { getServerAuthContext } from "@/lib/server-auth"
import { listCriteria } from "@/lib/rating-actions"
import { basePrisma } from "@/lib/prisma"
import { CriteriaManagement } from "@/components/admin/criteria-management-new"
import { BarChart3, AlertCircle } from "lucide-react"
import { TR } from "@/lib/tr-constants"

export default async function RatingCriteriaPage() {
  const auth = await getServerAuthContext()
  
  if (!auth) {
    return null
  }
  
  // Block MANAGER and STAFF from managing criteria
  if (auth.role === "MANAGER" || auth.role === "STAFF") {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">{TR.errors.accessDenied}</div>
          <div className="text-sm">
            Sadece yöneticiler kriter yönetimi yapabilir.
          </div>
        </div>
      </div>
    )
  }
  
  // Get departments
  const departments = await basePrisma.department.findMany({
    where: auth.role === "SUPER_ADMIN" ? {} : { siteId: auth.siteId },
    include: {
      site: { select: { name: true } },
      _count: { select: { ratingCriteria: true } },
    },
    orderBy: { name: "asc" },
  })
  
  // Get all criteria
  const criteriaResult = await listCriteria()
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-purple-600" />
          {TR.rating.criteriaManagement}
        </h1>
        <p className="mt-2 text-slate-600">
          Departmanlar için değerlendirme kriterlerini tanımlayın ve yönetin
        </p>
      </div>
      
      <CriteriaManagement
        departments={departments}
        criteria={criteriaResult.success ? criteriaResult.data || [] : []}
        currentUserRole={auth.role}
      />
    </div>
  )
}

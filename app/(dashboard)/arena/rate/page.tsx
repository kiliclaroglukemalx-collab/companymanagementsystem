import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"
import { listCriteria, listUsersForRating, getTodayProgress } from "@/lib/rating-actions"
import { RatingForm } from "@/components/arena/rating-form"
import { Star, AlertCircle, TrendingUp } from "lucide-react"
import { redirect } from "next/navigation"
import { TR } from "@/lib/tr-constants"
import { Badge } from "@/components/ui/badge"

export default async function RatePage() {
  const auth = await getServerAuthContext()
  
  if (!auth) {
    redirect("/login")
  }

  // PDF: Puanlama sadece 00:00-17:00 arası yapılabilir
  const now = new Date()
  const istanbulTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }))
  const currentHour = istanbulTime.getHours()
  
  const isRatingAllowed = currentHour >= 0 && currentHour < 17
  
  // Get user's department
  const user = await basePrisma.user.findUnique({
    where: { id: auth.userId },
    select: {
      departmentId: true,
      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  
  if (!user?.departmentId || !user.department) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <div className="font-semibold">{TR.rating.selectDepartmentFirst}</div>
              <div className="text-sm">{TR.rating.selectDepartmentDesc}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Get criteria for this department
  const criteriaResult = await listCriteria({
    departmentId: user.departmentId,
  })
  
  const activeCriteria = criteriaResult.success
    ? (criteriaResult.data || []).filter((c) => c.isActive)
    : []
  
  if (activeCriteria.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <div className="font-semibold">{TR.rating.noCriteria}</div>
              <div className="text-sm">{TR.rating.noCriteriaDesc}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Get users to rate
  const usersResult = await listUsersForRating(user.departmentId)
  const usersToRate = usersResult.success ? usersResult.data || [] : []
  
  // Get today's progress
  const progressResult = await getTodayProgress(user.departmentId)
  const progress = progressResult.success ? progressResult.data : null

  // PDF: Saat kontrolü - puanlama sadece 00:00-17:00 arası
  if (!isRatingAllowed) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <div className="font-semibold">Puanlama Saati Dışında</div>
              <div className="text-sm">
                Puanlama sadece her gün saat <strong>00:00 - 17:00</strong> arası yapılabilir.
                <br />
                Şu an İstanbul saati: <strong>{istanbulTime.toLocaleTimeString("tr-TR")}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-600 via-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{TR.rating.rateToday}</h1>
              <p className="text-orange-100 mt-1">
                {user.department.name} {TR.rating.criteriaFor}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          {progress && (
            <div className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-100" />
                  <span className="text-sm font-medium text-white">
                    {TR.rating.todayProgress}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  %{progress.completionRate}
                </Badge>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progress.completionRate}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-orange-100">
                {progress.ratedUsers} / {progress.totalUsers} {TR.rating.peopleRated}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <RatingForm
          departmentId={user.departmentId}
          criteria={activeCriteria}
          users={usersToRate}
        />
      </div>
    </div>
  )
}

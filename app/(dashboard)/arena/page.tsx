import { getServerAuthContext } from "@/lib/server-auth"
import { listArenaEvents, getArenaSummary } from "@/lib/arena-actions"
import { ArenaLiveFeedEnhanced } from "@/components/arena/arena-live-feed-enhanced"
import { Trophy, AlertCircle, Activity, Star, TrendingUp, Shield } from "lucide-react"
import { TR } from "@/lib/tr-constants"

export default async function ArenaPage() {
  const auth = await getServerAuthContext()
  
  if (!auth) {
    return null // Layout will handle redirect
  }
  
  // Fetch full user data for debug
  const { basePrisma } = await import("@/lib/prisma")
  const currentUser = await basePrisma.user.findUnique({
    where: { id: auth.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      siteId: true,
      departmentId: true,
      isActive: true,
      mustChangePassword: true,
      department: {
        select: { name: true }
      },
      site: {
        select: { name: true }
      }
    }
  })
  
  // Console log for server-side debugging
  console.log('🔍 [Arena Debug] Current User:', {
    email: currentUser?.email,
    name: currentUser?.name,
    role: currentUser?.role,
    siteId: currentUser?.siteId,
    siteName: currentUser?.site?.name,
    departmentId: currentUser?.departmentId,
    departmentName: currentUser?.department?.name,
    isActive: currentUser?.isActive,
    mustChangePassword: currentUser?.mustChangePassword,
    userId: currentUser?.id,
  })
  
  // Fetch arena events and summary
  const [eventsResult, summaryResult] = await Promise.all([
    listArenaEvents({ limit: 20, timeRange: "today" }),
    getArenaSummary(),
  ])
  
  if (!eventsResult.success) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <div className="font-semibold">{TR.errors.errorLoadingArena}</div>
              <div className="text-sm">{eventsResult.error}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{TR.arena.title}</h1>
              <p className="text-blue-100 mt-1">
                {TR.arena.subtitle}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">🏆</div>
              <div className="text-sm text-blue-100">{TR.arena.rankings}</div>
              <div className="text-xs text-blue-200 mt-1">
                {TR.arena.rankingsDesc}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">⚡</div>
              <div className="text-sm text-blue-100">{TR.arena.liveEvents}</div>
              <div className="text-xs text-blue-200 mt-1">
                {TR.arena.liveEventsDesc}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">📊</div>
              <div className="text-sm text-blue-100">{TR.arena.analytics}</div>
              <div className="text-xs text-blue-200 mt-1">
                {TR.arena.analyticsDesc}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Debug Panel - Only in Development/Preview */}
        {process.env.NODE_ENV !== 'production' && currentUser && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔍</span>
              <h3 className="text-sm font-bold text-yellow-900">DEBUG: Ben Kimim? (Sadece Dev/Preview)</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="font-semibold text-yellow-900">Email:</span>
                <div className="text-yellow-800">{currentUser.email}</div>
              </div>
              <div>
                <span className="font-semibold text-yellow-900">Name:</span>
                <div className="text-yellow-800">{currentUser.name}</div>
              </div>
              <div>
                <span className="font-semibold text-yellow-900">Role:</span>
                <div className="text-yellow-800 font-bold">{currentUser.role}</div>
              </div>
              <div>
                <span className="font-semibold text-yellow-900">Site:</span>
                <div className="text-yellow-800">{currentUser.site?.name || '-'}</div>
              </div>
              <div>
                <span className="font-semibold text-yellow-900">Department:</span>
                <div className="text-yellow-800">{currentUser.department?.name || '-'}</div>
              </div>
              <div>
                <span className="font-semibold text-yellow-900">Active:</span>
                <div className="text-yellow-800">{currentUser.isActive ? '✅ Yes' : '❌ No'}</div>
              </div>
              <div>
                <span className="font-semibold text-yellow-900">Must Change Password:</span>
                <div className="text-yellow-800">{currentUser.mustChangePassword ? '⚠️ Yes' : '✅ No'}</div>
              </div>
              <div>
                <span className="font-semibold text-yellow-900">User ID:</span>
                <div className="text-yellow-800 font-mono text-[10px]">{currentUser.id}</div>
              </div>
              <div>
                <span className="font-semibold text-yellow-900">Site ID:</span>
                <div className="text-yellow-800 font-mono text-[10px]">{currentUser.siteId}</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Summary Stats Bar - Bugün Bazında */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bugün Toplam Event */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-600 mb-1">
                  {TR.arena.todayEvents || "Bugün Toplam Event"}
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {eventsResult.data.events.length}
                </div>
              </div>
            </div>
          </div>

          {/* Bugün Puanlama Sayısı */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-600 mb-1">
                  {TR.arena.todayRatings || "Bugün Puanlama"}
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {summaryResult.success ? summaryResult.data?.todayRatingsCount || 0 : 0}
                </div>
              </div>
            </div>
          </div>

          {/* Günlük İlerleme */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-600 mb-1">
                  {TR.arena.dailyProgress}
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  %{summaryResult.success ? summaryResult.data?.dailyCompletionRate || 0 : 0}
                </div>
              </div>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-600 mb-1">
                  {TR.arena.todaySecurityAlerts || "Bugün Güvenlik Uyarıları"}
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {eventsResult.data.events.filter((e) => e.type === "SECURITY_ALERT").length}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Phase 1 Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-semibold text-sm">v1</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                {TR.arena.phase1}
              </h3>
              <p className="text-xs text-blue-700 leading-relaxed">
                {TR.arena.phase1Desc}
              </p>
            </div>
          </div>
        </div>
        
        {/* Live Feed with Enhanced Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ArenaLiveFeedEnhanced 
              events={eventsResult.data.events}
              summary={summaryResult.success ? summaryResult.data : undefined}
              isLoading={false}
            />
          </div>
          
          {/* Sidebar - Coming Soon Features */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                {TR.arena.comingSoon}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🏅</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">
                      {TR.arena.leagueSystem}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {TR.arena.leagueSystemDesc}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">⚡</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">
                      {TR.arena.scoreEngine}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {TR.arena.scoreEngineDesc}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">📈</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">
                      {TR.arena.performanceCharts}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {TR.arena.performanceChartsDesc}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🤖</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">
                      {TR.arena.aiInsights}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {TR.arena.aiInsightsDesc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* User Context Info */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                {TR.arena.yourAccess}
              </h3>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>{TR.users.role}: <strong className="text-slate-900">{TR.roles[auth.role as keyof typeof TR.roles]}</strong></span>
                </div>
                {auth.role === "SUPER_ADMIN" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span><strong className="text-slate-900">{TR.arena.viewingAllSites}</strong></span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span><strong className="text-slate-900">{TR.arena.viewingYourSite}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span><strong className="text-slate-900">{eventsResult.data.total}</strong> {TR.arena.total} {TR.arena.events}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

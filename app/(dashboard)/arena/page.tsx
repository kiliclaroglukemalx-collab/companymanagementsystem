import { getServerAuthContext } from "@/lib/server-auth"
import { listArenaEvents, getArenaSummary } from "@/lib/arena-actions"
import { ArenaLiveFeedEnhanced } from "@/components/arena/arena-live-feed-enhanced"
import { Trophy, AlertCircle } from "lucide-react"
import { redirect } from "next/navigation"
import { TR } from "@/lib/tr-constants"

export default async function ArenaPage() {
  const auth = await getServerAuthContext()
  
  // Require authentication
  if (!auth) {
    redirect("/login")
  }
  
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

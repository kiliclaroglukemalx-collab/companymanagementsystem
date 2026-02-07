import { getServerAuthContext } from "@/lib/server-auth"
import { getLeagueRankings, getCategoryLeaders } from "@/lib/arena-league-actions"
import { ArenaLeagueTable } from "@/components/arena/arena-league-table"
import { Trophy, Users, BarChart3, Calendar } from "lucide-react"
import { redirect } from "next/navigation"

export default async function ArenaPage() {
  const auth = await getServerAuthContext()
  
  if (!auth) {
    return null // Layout handles redirect
  }

  // Fetch league data
  const [
    personelResult,
    adminResult,
    birimMuduruResult,
    genelMudurResult,
  ] = await Promise.all([
    getLeagueRankings("PERSONEL"),
    getLeagueRankings("ADMIN"),
    getLeagueRankings("BIRIM_MUDURU"),
    getLeagueRankings("GENEL_MUDUR"),
  ])

  const now = new Date()
  const monthName = now.toLocaleDateString("tr-TR", { month: "long", year: "numeric" })

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-xl p-8 border border-slate-600">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Şampiyonlar Ligi</h1>
            <p className="text-slate-300 mt-1">
              {monthName} • Gerçek Zamanlı Sıralama
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <Users className="w-5 h-5 text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-white">
              {(personelResult.success ? personelResult.rankings?.length : 0) || 0}
            </div>
            <div className="text-xs text-slate-400">Personel</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <BarChart3 className="w-5 h-5 text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-white">
              {(adminResult.success ? adminResult.rankings?.length : 0) || 0}
            </div>
            <div className="text-xs text-slate-400">Admin</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <Trophy className="w-5 h-5 text-green-400 mb-2" />
            <div className="text-2xl font-bold text-white">
              {(birimMuduruResult.success ? birimMuduruResult.rankings?.length : 0) || 0}
            </div>
            <div className="text-xs text-slate-400">Birim Müdürü</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <Calendar className="w-5 h-5 text-orange-400 mb-2" />
            <div className="text-2xl font-bold text-white">
              {monthName.split(" ")[0]}
            </div>
            <div className="text-xs text-slate-400">Bu Ay</div>
          </div>
        </div>
      </div>

      {/* PDF: Personel Ligi */}
      {personelResult.success && personelResult.rankings && personelResult.rankings.length > 0 && (
        <ArenaLeagueTable
          rankings={personelResult.rankings}
          personelType="PERSONEL"
        />
      )}

      {/* PDF: Birim Müdürü Ligi */}
      {birimMuduruResult.success && birimMuduruResult.rankings && birimMuduruResult.rankings.length > 0 && (
        <ArenaLeagueTable
          rankings={birimMuduruResult.rankings}
          personelType="BIRIM_MUDURU"
        />
      )}

      {/* PDF: Admin Ligi */}
      {adminResult.success && adminResult.rankings && adminResult.rankings.length > 0 && (
        <ArenaLeagueTable
          rankings={adminResult.rankings}
          personelType="ADMIN"
        />
      )}

      {/* PDF: Genel Müdür Ligi */}
      {genelMudurResult.success && genelMudurResult.rankings && genelMudurResult.rankings.length > 0 && (
        <ArenaLeagueTable
          rankings={genelMudurResult.rankings}
          personelType="GENEL_MUDUR"
        />
      )}

      {/* Boş State */}
      {!personelResult.rankings?.length && 
       !adminResult.rankings?.length && 
       !birimMuduruResult.rankings?.length && 
       !genelMudurResult.rankings?.length && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            Henüz Puanlama Yapılmadı
          </h3>
          <p className="text-slate-400">
            Puanlama başladığında ligde yerini alacaksın!
          </p>
        </div>
      )}
    </div>
  )
}

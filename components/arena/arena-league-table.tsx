"use client"

import { Trophy, Medal, Award, Star } from "lucide-react"
import type { LeagueCategory } from "@prisma/client"

interface LeagueRankingData {
  userId: string
  userName: string
  userRole: string
  department: string
  category: LeagueCategory
  categoryLabel: string
  rank: number
  totalScore: number
  percentage: number
}

interface Props {
  rankings: LeagueRankingData[]
  personelType: string
}

// Kategori renkleri (gradient)
const categoryColors: Record<LeagueCategory, { bg: string; border: string; text: string; icon: string }> = {
  USTAT: { 
    bg: "from-yellow-400 via-amber-500 to-orange-500", 
    border: "border-yellow-500/50", 
    text: "text-yellow-900",
    icon: "text-yellow-600"
  },
  ELMAS_1: { 
    bg: "from-cyan-400 via-blue-500 to-indigo-500", 
    border: "border-cyan-500/50", 
    text: "text-cyan-900",
    icon: "text-cyan-600"
  },
  ELMAS_2: { 
    bg: "from-cyan-300 via-blue-400 to-indigo-400", 
    border: "border-cyan-400/50", 
    text: "text-cyan-800",
    icon: "text-cyan-500"
  },
  ALTIN_1: { 
    bg: "from-yellow-300 via-amber-400 to-orange-400", 
    border: "border-yellow-400/50", 
    text: "text-yellow-800",
    icon: "text-yellow-500"
  },
  ALTIN_2: { 
    bg: "from-yellow-200 via-amber-300 to-orange-300", 
    border: "border-yellow-300/50", 
    text: "text-yellow-700",
    icon: "text-yellow-400"
  },
  GUMUS_1: { 
    bg: "from-slate-300 via-gray-400 to-slate-400", 
    border: "border-slate-400/50", 
    text: "text-slate-800",
    icon: "text-slate-500"
  },
  GUMUS_2: { 
    bg: "from-slate-200 via-gray-300 to-slate-300", 
    border: "border-slate-300/50", 
    text: "text-slate-700",
    icon: "text-slate-400"
  },
  BRONZ_1: { 
    bg: "from-orange-300 via-amber-400 to-orange-400", 
    border: "border-orange-400/50", 
    text: "text-orange-800",
    icon: "text-orange-500"
  },
  BRONZ_2: { 
    bg: "from-orange-200 via-amber-300 to-orange-300", 
    border: "border-orange-300/50", 
    text: "text-orange-700",
    icon: "text-orange-400"
  },
  DEMIR: { 
    bg: "from-gray-400 via-slate-500 to-gray-500", 
    border: "border-gray-500/50", 
    text: "text-gray-800",
    icon: "text-gray-600"
  },
}

// Kategori ikonları
function getCategoryIcon(category: LeagueCategory) {
  if (category === "USTAT") return Trophy
  if (category.startsWith("ELMAS")) return Star
  if (category.startsWith("ALTIN")) return Award
  return Medal
}

export function ArenaLeagueTable({ rankings, personelType }: Props) {
  // Kategorilere göre grupla
  const groupedByCategory = rankings.reduce((acc, ranking) => {
    if (!acc[ranking.category]) {
      acc[ranking.category] = []
    }
    acc[ranking.category].push(ranking)
    return acc
  }, {} as Record<LeagueCategory, LeagueRankingData[]>)

  const categories: LeagueCategory[] = [
    "USTAT", "ELMAS_1", "ELMAS_2", "ALTIN_1", "ALTIN_2",
    "GUMUS_1", "GUMUS_2", "BRONZ_1", "BRONZ_2", "DEMIR"
  ]

  return (
    <div className="space-y-6">
      {/* Personel Tipi Başlık */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {personelType === "PERSONEL" && "Personel Ligi"}
          {personelType === "ADMIN" && "Admin Ligi"}
          {personelType === "BIRIM_MUDURU" && "Birim Müdürü Ligi"}
          {personelType === "GENEL_MUDUR" && "Genel Müdür Ligi"}
        </h2>
        <p className="text-slate-400 text-sm">
          Bu ayki kümülatif puanlama sıralaması
        </p>
      </div>

      {/* Kategoriler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const categoryRankings = groupedByCategory[category] || []
          if (categoryRankings.length === 0) return null

          const colors = categoryColors[category]
          const Icon = getCategoryIcon(category)
          const topThree = categoryRankings.slice(0, 3)

          return (
            <div
              key={category}
              className={`bg-gradient-to-br ${colors.bg} rounded-xl p-6 border-2 ${colors.border} shadow-lg`}
            >
              {/* Kategori Başlık */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${colors.text}`}>
                    {categoryRankings[0]?.categoryLabel}
                  </h3>
                  <p className="text-xs text-black/60">
                    {categoryRankings.length} Personel
                  </p>
                </div>
              </div>

              {/* Top 3 */}
              <div className="space-y-2">
                {topThree.map((ranking, idx) => (
                  <div
                    key={ranking.userId}
                    className="bg-white/30 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3"
                  >
                    {/* Rank Badge */}
                    <div className={`w-8 h-8 rounded-full ${
                      idx === 0 ? "bg-yellow-500" :
                      idx === 1 ? "bg-gray-400" :
                      "bg-orange-600"
                    } flex items-center justify-center text-white font-bold text-sm`}>
                      {ranking.rank}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm ${colors.text} truncate`}>
                        {ranking.userName}
                      </div>
                      <div className="text-xs text-black/60 truncate">
                        {ranking.department}
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className={`font-bold text-sm ${colors.text}`}>
                        {ranking.totalScore.toFixed(0)}
                      </div>
                      <div className="text-xs text-black/60">
                        puan
                      </div>
                    </div>
                  </div>
                ))}

                {/* Daha fazla varsa */}
                {categoryRankings.length > 3 && (
                  <div className="text-center pt-2">
                    <button className="text-xs text-black/60 hover:text-black/80 font-medium">
                      +{categoryRankings.length - 3} kişi daha
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { Trophy, Star, Award, Sparkles, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import type { LeagueCategory, PersonelType } from "@prisma/client"

interface ChampionData {
  userName: string
  userEmail: string
  avatarKey: string | null
  department: string
  category: LeagueCategory
  categoryLabel: string
  rank: number
  totalScore: number
  personelType: PersonelType
}

interface Props {
  champions: ChampionData[]
  month: string
}

const categoryColors: Record<LeagueCategory, string> = {
  USTAT: "from-yellow-400 via-amber-500 to-orange-500",
  ELMAS_1: "from-cyan-400 via-blue-500 to-indigo-500",
  ELMAS_2: "from-cyan-300 via-blue-400 to-indigo-400",
  ALTIN_1: "from-yellow-300 via-amber-400 to-orange-400",
  ALTIN_2: "from-yellow-200 via-amber-300 to-orange-300",
  GUMUS_1: "from-slate-300 via-gray-400 to-slate-400",
  GUMUS_2: "from-slate-200 via-gray-300 to-slate-300",
  BRONZ_1: "from-orange-300 via-amber-400 to-orange-400",
  BRONZ_2: "from-orange-200 via-amber-300 to-orange-300",
  DEMIR: "from-gray-400 via-slate-500 to-gray-500",
}

export function ChampionsCelebration({ champions, month }: Props) {
  const monthFormatted = new Date(month + "-01").toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
          <Trophy className="w-16 h-16 text-yellow-500" />
          <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-3">
          🎉 ŞAMPİYONLAR KUTLAMASI 🎉
        </h1>
        
        <div className="flex items-center justify-center gap-2 text-slate-300">
          <Calendar className="w-5 h-5" />
          <p className="text-xl">{monthFormatted}</p>
        </div>
      </motion.div>

      {/* Champions Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {champions.map((champion, index) => {
            const gradient = categoryColors[champion.category]
            const isFirst = champion.rank === 1
            const rankIcon = champion.rank === 1 ? "🥇" : champion.rank === 2 ? "🥈" : "🥉"

            return (
              <motion.div
                key={`${champion.userEmail}-${champion.category}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gradient-to-br ${gradient} rounded-2xl p-6 shadow-2xl ${
                  isFirst ? "ring-4 ring-yellow-400 ring-offset-4 ring-offset-slate-900" : ""
                }`}
              >
                {isFirst && (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4"
                  >
                    <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                )}

                {/* Rank Badge */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{rankIcon}</div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {champion.rank === 1 ? "ŞAMPİYON" : champion.rank === 2 ? "İKİNCİ" : "ÜÇÜNCÜ"}
                  </div>
                  <div className="text-sm font-semibold text-white/80">
                    {champion.categoryLabel}
                  </div>
                </div>

                {/* User Info */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-bold text-white text-lg mb-1 truncate">
                    {champion.userName}
                  </div>
                  <div className="text-sm text-white/70 mb-3 truncate">
                    {champion.department}
                  </div>

                  {/* Score */}
                  <div className="flex items-baseline justify-center gap-2 bg-black/20 rounded-lg py-3">
                    <Trophy className="w-5 h-5 text-yellow-300" />
                    <span className="text-3xl font-bold text-white">
                      {champion.totalScore.toFixed(0)}
                    </span>
                    <span className="text-sm text-white/70">puan</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: champions.length * 0.1 + 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-300 text-lg">
            Tüm şampiyonlarımızı kutluyoruz! 🎊
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Yeni ay yeni hedefler için hazır olun!
          </p>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { motion, LayoutGroup } from "framer-motion"
import { useState } from "react"
import { TrendingUp, TrendingDown, Minus, Eye, Globe, Users, Shield } from "lucide-react"
import { arenaLeagueData, type ArenaLeagueEntry } from "@/lib/dashboard-data"

interface ArenaLeagueProps {
  onViewDetails?: (entry: ArenaLeagueEntry) => void
}

export function ArenaLeague({ onViewDetails }: ArenaLeagueProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [leagueData] = useState(arenaLeagueData)

  const getRiskBadge = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return { border: 'border-cyan-500/40', text: 'text-cyan-400', label: 'Dusuk' }
      case 'medium': return { border: 'border-amber-500/40', text: 'text-amber-400', label: 'Orta' }
      case 'high': return { border: 'border-red-500/40', text: 'text-red-400', label: 'Yuksek' }
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
      case 'down': return <TrendingDown className="w-3 h-3 text-red-400" strokeWidth={1.5} />
      case 'stable': return <Minus className="w-3 h-3 text-neutral-500" strokeWidth={1.5} />
    }
  }

  return (
    <section 
      className="relative min-h-screen"
      style={{ 
        background: "#000000",
      }}
    >

      {/* Content Container */}
      <div className="relative px-8 py-10 max-w-7xl mx-auto">
        {/* Minimal Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-extralight text-white tracking-wide mb-1">
            Arena Ligi
          </h1>
          <p className="text-sm font-light text-neutral-500">
            Aylik Verimlilik Siralaması
          </p>
        </motion.div>

        <LayoutGroup>
          {/* Table Header */}
          <motion.div 
            className="grid grid-cols-12 gap-4 px-6 py-4 mb-1 border-b border-neutral-800/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="col-span-1 text-[10px] font-medium text-neutral-500 tracking-[0.2em] uppercase">
              Sira
            </div>
            <div className="col-span-2 text-[10px] font-medium text-neutral-500 tracking-[0.2em] uppercase">
              Site
            </div>
            <div className="col-span-3 text-[10px] font-medium text-neutral-500 tracking-[0.2em] uppercase">
              Verimlilik
            </div>
            <div className="col-span-3 text-[10px] font-medium text-neutral-500 tracking-[0.2em] uppercase">
              Parametreler
            </div>
            <div className="col-span-1 text-[10px] font-medium text-neutral-500 tracking-[0.2em] uppercase text-center">
              Bugun
            </div>
            <div className="col-span-2 text-[10px] font-medium text-neutral-500 tracking-[0.2em] uppercase text-right">
              Toplam
            </div>
          </motion.div>

          {/* Table Rows */}
          <div className="divide-y divide-neutral-800/30">
            {leagueData.map((entry, index) => {
              const isLeader = entry.rank === 1
              const isHovered = hoveredRow === entry.id
              const riskBadge = getRiskBadge(entry.riskScore)

              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.04,
                  }}
                  onMouseEnter={() => setHoveredRow(entry.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`relative grid grid-cols-12 gap-4 px-6 py-5 cursor-pointer transition-colors duration-200 ${
                    isHovered ? 'bg-white/[0.02]' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex items-center gap-2">
                    <span 
                      className={`text-2xl font-extralight tabular-nums ${
                        isLeader ? 'text-white' : 'text-neutral-400'
                      }`}
                    >
                      {entry.rank}
                    </span>
                    <div className="flex items-center opacity-60">
                      {getTrendIcon(entry.trend)}
                    </div>
                  </div>

                  {/* Site Name */}
                  <div className="col-span-2 flex flex-col justify-center">
                    <span className="text-sm font-normal text-white tracking-wide">
                      {entry.siteName}
                    </span>
                    {isLeader && (
                      <motion.div 
                        className="mt-1.5 inline-flex"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span 
                          className="text-[9px] font-medium tracking-[0.15em] uppercase px-2 py-0.5 rounded border border-amber-500/30 text-amber-400/90"
                        >
                          Aylik Lider
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Efficiency Score Bar */}
                  <div className="col-span-3 flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-neutral-800/50 rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full rounded-full relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${entry.efficiencyScore}%` }}
                        transition={{ duration: 0.8, delay: index * 0.04 + 0.2, ease: "easeOut" }}
                        style={{
                          background: "linear-gradient(90deg, #06b6d4 0%, #22d3ee 50%, #a5f3fc 100%)",
                        }}
                      >
                        {/* Glow effect */}
                        <div 
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #06b6d4 0%, #22d3ee 50%, #a5f3fc 100%)",
                            filter: "blur(4px)",
                            opacity: 0.6,
                          }}
                        />
                      </motion.div>
                    </div>
                    <span className="text-sm font-light text-neutral-300 tabular-nums min-w-[32px] text-right">
                      {entry.efficiencyScore}
                    </span>
                  </div>

                  {/* Key Parameters */}
                  <div className="col-span-3 flex items-center gap-3">
                    {/* BTag ROI */}
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-neutral-500" strokeWidth={1.5} />
                      <span className="text-xs font-light text-neutral-300">%{entry.btagROI}</span>
                    </div>
                    
                    {/* Retention */}
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-neutral-500" strokeWidth={1.5} />
                      <span className="text-xs font-light text-neutral-300">{entry.retention}</span>
                    </div>
                    
                    {/* Risk Badge */}
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded border ${riskBadge.border}`}>
                      <Shield className={`w-3 h-3 ${riskBadge.text}`} strokeWidth={1.5} />
                      <span className={`text-[10px] font-medium ${riskBadge.text}`}>
                        {riskBadge.label}
                      </span>
                    </div>
                  </div>

                  {/* Daily Points */}
                  <div className="col-span-1 flex items-center justify-center">
                    <span className="text-sm font-light text-emerald-400">
                      +{entry.dailyPoints}
                    </span>
                  </div>

                  {/* Total Points */}
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <span className="text-2xl font-extralight text-white tabular-nums">
                      {entry.totalPoints}
                    </span>
                    <span className="text-[10px] font-medium text-neutral-600 uppercase tracking-wider">
                      Puan
                    </span>
                    
                    {/* View Details Button - appears on hover */}
                    <motion.button
                      className="ml-3 p-1.5 rounded-md border border-neutral-700/50 hover:border-neutral-600 transition-colors"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : 10,
                      }}
                      transition={{ duration: 0.2 }}
                      onClick={() => onViewDetails?.(entry)}
                    >
                      <Eye className="w-3.5 h-3.5 text-neutral-500" strokeWidth={1.5} />
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </LayoutGroup>

        {/* Minimal Footer */}
        <motion.div 
          className="mt-10 pt-6 border-t border-neutral-800/30 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-light text-neutral-500 tracking-wide">Dusuk Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] font-light text-neutral-500 tracking-wide">Orta Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="text-[10px] font-light text-neutral-500 tracking-wide">Yuksek Risk</span>
            </div>
          </div>
          <span className="text-[10px] font-light text-neutral-600 tracking-wide">
            Son Guncelleme: Bugun 14:32
          </span>
        </motion.div>
      </div>
    </section>
  )
}

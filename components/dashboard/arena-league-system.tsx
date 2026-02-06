"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo } from "react"
import { 
  Trophy, Crown, Gem, Award, Medal, Shield, Sparkles, 
  TrendingUp, TrendingDown, Minus, ChevronDown, Check,
  Users, Building2, Briefcase, Settings, Globe,
  ArrowUp, ArrowDown, Flame, Zap, Target, BarChart3
} from "lucide-react"
import { 
  leaguePlayers, leagueRanks, leagueActivities, 
  type LeaguePlayer, type LeagueRank, type UserRole, type LeagueActivity
} from "@/lib/dashboard-data"

// Role labels
const roleLabels: Record<UserRole, string> = {
  personnel: 'Personeller',
  unit_manager: 'Birim Mudurler',
  general_manager: 'Genel Mudurler',
  admin: 'Adminler'
}

const roleIcons: Record<UserRole, typeof Users> = {
  personnel: Users,
  unit_manager: Briefcase,
  general_manager: Building2,
  admin: Settings
}

// Tier icons
const getTierIcon = (tier: string) => {
  switch (tier) {
    case 'master': return Sparkles
    case 'diamond': return Gem
    case 'gold': return Crown
    case 'silver': return Award
    case 'bronze': return Medal
    default: return Shield
  }
}

// Sites data
const sites = [
  { id: 'all', name: 'Tum Siteler' },
  { id: '1', name: 'Golden Palace' },
  { id: '2', name: 'Victory Games' },
  { id: '3', name: 'Lucky Stars' },
]

// Units data
const units = [
  { id: 'all', name: 'Tum Birimler' },
  { id: 'u1', name: 'Musteri Hizmetleri' },
  { id: 'u2', name: 'Teknik Destek' },
  { id: 'u3', name: 'Satis' },
]

export function ArenaLeagueSystem() {
  const [activeRole, setActiveRole] = useState<UserRole>('personnel')
  const [selectedSite, setSelectedSite] = useState('all')
  const [selectedUnit, setSelectedUnit] = useState('all')
  const [showSiteDropdown, setShowSiteDropdown] = useState(false)
  const [showUnitDropdown, setShowUnitDropdown] = useState(false)

  // Filter players by role, site, and unit
  const filteredPlayers = useMemo(() => {
    return leaguePlayers
      .filter(p => p.role === activeRole)
      .filter(p => selectedSite === 'all' || p.siteId === selectedSite)
      .filter(p => selectedUnit === 'all' || p.unitId === selectedUnit)
      .sort((a, b) => b.points - a.points)
  }, [activeRole, selectedSite, selectedUnit])

  // Group players by tier
  const playersByTier = useMemo(() => {
    const grouped: Record<string, LeaguePlayer[]> = {}
    leagueRanks.slice().reverse().forEach(rank => {
      const tierKey = `${rank.tier}-${rank.division}`
      grouped[tierKey] = filteredPlayers.filter(p => 
        p.rank.tier === rank.tier && p.rank.division === rank.division
      )
    })
    return grouped
  }, [filteredPlayers])

  return (
    <section className="relative min-h-screen" style={{ background: "#000000" }}>
      {/* Live Activity Ticker */}
      <div 
        className="sticky top-0 z-30 py-2 px-4 overflow-hidden"
        style={{ 
          background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%)',
          borderBottom: '1px solid rgba(168, 85, 247, 0.2)'
        }}
      >
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...leagueActivities, ...leagueActivities].map((activity, idx) => {
            const isPromotion = activity.type === 'promoted'
            return (
              <span 
                key={`${activity.id}-${idx}`}
                className="flex items-center gap-2 text-xs font-medium"
              >
                {isPromotion ? (
                  <ArrowUp className="w-3 h-3 text-emerald-400" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-400" />
                )}
                <span style={{ color: isPromotion ? '#10b981' : '#ef4444' }}>
                  {activity.message}
                </span>
                <span className="text-neutral-600">•</span>
              </span>
            )
          })}
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative px-6 py-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-light text-white tracking-wide mb-0.5 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Sampiyonlar Ligi
              </h1>
              <p className="text-xs font-light text-neutral-500">
                Site bazli performans rekabeti
              </p>
            </div>
          </div>

          {/* Role Tabs */}
          <div className="flex gap-1.5 mb-4">
            {(Object.keys(roleLabels) as UserRole[]).map(role => {
              const Icon = roleIcons[role]
              const isActive = activeRole === role
              const playerCount = leaguePlayers.filter(p => p.role === role).length
              return (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))'
                      : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255,255,255,0.06)'}`,
                    color: isActive ? '#a855f7' : '#737373',
                  }}
                >
                  <Icon size={12} />
                  {roleLabels[role]}
                  <span 
                    className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold"
                    style={{ 
                      background: isActive ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255,255,255,0.05)',
                      color: isActive ? '#c084fc' : '#525252'
                    }}
                  >
                    {playerCount}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-4">
              {/* Site Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSiteDropdown(!showSiteDropdown)}
                  className="px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all min-w-[140px]"
                  style={{ 
                    background: 'rgba(6, 182, 212, 0.1)', 
                    border: '1px solid rgba(6, 182, 212, 0.3)' 
                  }}
                >
                  <Globe size={12} className="text-cyan-400" />
                  <span className="text-xs text-cyan-400 flex-1 text-left">
                    {sites.find(s => s.id === selectedSite)?.name}
                  </span>
                  <ChevronDown size={12} className="text-cyan-400" />
                </button>
                
                <AnimatePresence>
                  {showSiteDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 w-full rounded-lg overflow-hidden z-20"
                      style={{ 
                        background: 'rgba(15, 15, 15, 0.98)', 
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {sites.map(site => (
                        <button
                          key={site.id}
                          onClick={() => {
                            setSelectedSite(site.id)
                            setShowSiteDropdown(false)
                          }}
                          className="w-full px-3 py-2 text-left text-xs transition-all flex items-center gap-2"
                          style={{ 
                            background: selectedSite === site.id ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                            color: selectedSite === site.id ? '#06b6d4' : '#a3a3a3'
                          }}
                        >
                          {selectedSite === site.id && <Check size={12} />}
                          {site.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Unit Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUnitDropdown(!showUnitDropdown)}
                  className="px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all min-w-[140px]"
                  style={{ 
                    background: 'rgba(168, 85, 247, 0.1)', 
                    border: '1px solid rgba(168, 85, 247, 0.3)' 
                  }}
                >
                  <Building2 size={12} className="text-purple-400" />
                  <span className="text-xs text-purple-400 flex-1 text-left">
                    {units.find(u => u.id === selectedUnit)?.name}
                  </span>
                  <ChevronDown size={12} className="text-purple-400" />
                </button>
                
                <AnimatePresence>
                  {showUnitDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 w-full rounded-lg overflow-hidden z-20"
                      style={{ 
                        background: 'rgba(15, 15, 15, 0.98)', 
                        border: '1px solid rgba(168, 85, 247, 0.2)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {units.map(unit => (
                        <button
                          key={unit.id}
                          onClick={() => {
                            setSelectedUnit(unit.id)
                            setShowUnitDropdown(false)
                          }}
                          className="w-full px-3 py-2 text-left text-xs transition-all flex items-center gap-2"
                          style={{ 
                            background: selectedUnit === unit.id ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                            color: selectedUnit === unit.id ? '#a855f7' : '#a3a3a3'
                          }}
                        >
                          {selectedUnit === unit.id && <Check size={12} />}
                          {unit.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
        </motion.div>

        {/* League Tiers Display */}
        <div className="space-y-3">
          {leagueRanks.slice().reverse().map((rank, tierIndex) => {
            const tierKey = `${rank.tier}-${rank.division}`
            const players = playersByTier[tierKey] || []
            const TierIcon = getTierIcon(rank.tier)
            
            if (players.length === 0) return null
            
            return (
              <motion.div
                key={tierKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: tierIndex * 0.05 }}
                className="rounded-xl overflow-hidden"
                style={{ 
                  background: 'rgba(255,255,255,0.01)',
                  border: `1px solid ${rank.color}20`
                }}
              >
                {/* Tier Header */}
                <div 
                  className="px-3 py-2 flex items-center justify-between"
                  style={{ background: rank.gradient }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.2)' }}
                    >
                      <TierIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{rank.name}</h3>
                      <p className="text-[10px] text-white/70">{rank.minPoints} - {rank.maxPoints === 99999 ? '∞' : rank.maxPoints} puan</p>
                    </div>
                  </div>
                  <span 
                    className="px-2 py-1 rounded-full text-[10px] font-semibold"
                    style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                  >
                    {players.length} oyuncu
                  </span>
                </div>

                {/* Players List */}
                {players.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {players.map((player, playerIndex) => (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: tierIndex * 0.05 + playerIndex * 0.02 }}
                        whileHover={{ 
                          scale: 1.02, 
                          zIndex: 10,
                          transition: { duration: 0.2 }
                        }}
                        className="group relative px-3 py-2 flex items-center gap-3 cursor-pointer transition-all"
                        style={{ transformOrigin: 'center' }}
                      >
                        {/* Hover Background */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"
                          style={{ 
                            background: `linear-gradient(135deg, ${rank.glow}20, transparent)`,
                            border: `1px solid ${rank.color}40`
                          }}
                        />
                        
                        {/* Rank Position */}
                        <div className="relative w-6 text-center">
                          <span className="text-xs font-medium text-neutral-500 group-hover:text-white transition-colors">
                            #{filteredPlayers.findIndex(p => p.id === player.id) + 1}
                          </span>
                        </div>

                        {/* Avatar */}
                        <div className="relative">
                          <div 
                            className="w-8 h-8 group-hover:w-10 group-hover:h-10 rounded-full flex items-center justify-center text-xs group-hover:text-sm font-semibold transition-all duration-200"
                            style={{ 
                              background: rank.gradient,
                              color: 'white',
                              boxShadow: `0 0 0 0 ${rank.glow}`
                            }}
                          >
                            {player.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          {player.isPromoted && (
                            <motion.div 
                              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 group-hover:w-4 group-hover:h-4 rounded-full flex items-center justify-center bg-emerald-500 transition-all"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowUp className="w-2 h-2 group-hover:w-2.5 group-hover:h-2.5 text-white" />
                            </motion.div>
                          )}
                          {player.isDemoted && (
                            <motion.div 
                              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 group-hover:w-4 group-hover:h-4 rounded-full flex items-center justify-center bg-red-500 transition-all"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowDown className="w-2 h-2 group-hover:w-2.5 group-hover:h-2.5 text-white" />
                            </motion.div>
                          )}
                        </div>

                        {/* Name & Info */}
                        <div className="relative flex-1 min-w-0">
                          <p className="text-xs group-hover:text-sm font-medium text-white truncate transition-all">{player.name}</p>
                          <p className="text-[10px] text-neutral-500 truncate">{player.siteName} • {player.unitName}</p>
                        </div>

                        {/* Stats - Compact (default) / Expanded (hover) */}
                        <div className="relative flex items-center gap-3">
                          {/* Streak */}
                          {player.streak > 0 && (
                            <div className="flex items-center gap-1">
                              <Flame className="w-3 h-3 group-hover:w-4 group-hover:h-4 text-orange-400 transition-all" />
                              <span className="text-[10px] group-hover:text-xs font-medium text-orange-400 transition-all">{player.streak}</span>
                            </div>
                          )}

                          {/* Weekly Change */}
                          <div className="flex items-center gap-1 min-w-[40px]">
                            {player.weeklyChange > 0 ? (
                              <>
                                <TrendingUp className="w-3 h-3 group-hover:w-4 group-hover:h-4 text-emerald-400 transition-all" />
                                <span className="text-[10px] group-hover:text-xs text-emerald-400 transition-all">+{player.weeklyChange}</span>
                              </>
                            ) : player.weeklyChange < 0 ? (
                              <>
                                <TrendingDown className="w-3 h-3 group-hover:w-4 group-hover:h-4 text-red-400 transition-all" />
                                <span className="text-[10px] group-hover:text-xs text-red-400 transition-all">{player.weeklyChange}</span>
                              </>
                            ) : (
                              <>
                                <Minus className="w-3 h-3 group-hover:w-4 group-hover:h-4 text-neutral-500 transition-all" />
                                <span className="text-[10px] group-hover:text-xs text-neutral-500 transition-all">0</span>
                              </>
                            )}
                          </div>

                          {/* Performance Stats - Expands on hover */}
                          <div className="flex items-center gap-2 text-[10px] group-hover:text-xs transition-all">
                            <div className="flex flex-col items-center group-hover:flex-row group-hover:gap-1">
                              <span className="hidden group-hover:inline text-neutral-500">Verimlilik:</span>
                              <span className="text-cyan-400 font-medium">%{player.stats.efficiency}</span>
                            </div>
                            <span className="text-neutral-600">|</span>
                            <div className="flex flex-col items-center group-hover:flex-row group-hover:gap-1">
                              <span className="hidden group-hover:inline text-neutral-500">Performans:</span>
                              <span className="text-purple-400 font-medium">%{player.stats.performance}</span>
                            </div>
                          </div>

                          {/* Extra stats on hover */}
                          <div className="hidden group-hover:flex items-center gap-2 text-xs">
                            <span className="text-neutral-600">|</span>
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3 text-amber-400" />
                              <span className="text-amber-400">{player.stats.tasksCompleted}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BarChart3 className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">%{player.stats.attendance}</span>
                            </div>
                          </div>

                          {/* Total Points */}
                          <div className="relative text-right min-w-[50px] group-hover:min-w-[70px] transition-all">
                            <p className="text-sm group-hover:text-lg font-semibold text-white transition-all" style={{ color: rank.color }}>{player.points}</p>
                            <p className="hidden group-hover:block text-[9px] text-neutral-500">PUAN</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-xs text-neutral-500">Bu ligde henuz oyuncu yok</p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* League Info Footer */}
        <motion.div 
          className="mt-6 p-4 rounded-xl"
          style={{ 
            background: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(255,255,255,0.06)' 
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-xs font-semibold text-white mb-3">Lig Seviyeleri</h4>
<div className="grid grid-cols-6 gap-2">
  {['iron', 'bronze', 'silver', 'gold', 'diamond', 'master'].map(tier => {
  const rank = leagueRanks.find(r => r.tier === tier && (r.division === 'I' || tier === 'master'))
  if (!rank) return null
  const TierIcon = getTierIcon(tier)
  return (
  <div
  key={tier}
  className="px-2 py-1.5 rounded-lg text-center"
  style={{ background: rank.gradient }}
  >
  <TierIcon className="w-4 h-4 text-white mx-auto mb-1" />
  <p className="text-[10px] font-semibold text-white">
  {tier === 'iron' ? 'Demir' : tier === 'bronze' ? 'Bronz' : tier === 'silver' ? 'Gumus' : tier === 'gold' ? 'Altin' : tier === 'diamond' ? 'Elmas' : 'Ustat'}
  </p>
  <p className="text-[9px] text-white/70">{rank.minPoints}+</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

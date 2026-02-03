export interface Brand {
  id: string
  name: string
  status: 'active' | 'inactive'
  themeColor: string
  rgbGlow: string
}

export interface DashboardCard {
  id: string
  title: string
  subtitle: string
  icon: string
  rank: string
  glowColor: string
  videoUrl: string
  gradient: {
    from: string
    to: string
    glow: string
  }
  data: {
    mainValue: string
    mainLabel: string
    stats: { label: string; value: string }[]
    chartData: { name: string; value: number }[]
  }
}

export const brands: Brand[] = [
  { id: '1', name: 'BetMaster TR', status: 'active', themeColor: '#3b82f6', rgbGlow: 'rgba(59, 130, 246, 0.8)' },
  { id: '2', name: 'Casino Royal', status: 'inactive', themeColor: '#f59e0b', rgbGlow: 'rgba(245, 158, 11, 0.8)' },
  { id: '3', name: 'Spor Arena', status: 'inactive', themeColor: '#10b981', rgbGlow: 'rgba(16, 185, 129, 0.8)' },
  { id: '4', name: 'Lucky Stars', status: 'inactive', themeColor: '#ec4899', rgbGlow: 'rgba(236, 72, 153, 0.8)' },
  { id: '5', name: 'Golden Palace', status: 'inactive', themeColor: '#eab308', rgbGlow: 'rgba(234, 179, 8, 0.8)' },
  { id: '6', name: 'Diamond Bet', status: 'inactive', themeColor: '#06b6d4', rgbGlow: 'rgba(6, 182, 212, 0.8)' },
  { id: '7', name: 'Victory Games', status: 'inactive', themeColor: '#8b5cf6', rgbGlow: 'rgba(139, 92, 246, 0.8)' },
  { id: '8', name: 'Mega Win', status: 'inactive', themeColor: '#ef4444', rgbGlow: 'rgba(239, 68, 68, 0.8)' },
  { id: '9', name: 'Elite Casino', status: 'inactive', themeColor: '#a855f7', rgbGlow: 'rgba(168, 85, 247, 0.8)' },
  { id: '10', name: 'Jackpot City', status: 'inactive', themeColor: '#f97316', rgbGlow: 'rgba(249, 115, 22, 0.8)' },
  { id: '11', name: 'Royal Flush', status: 'inactive', themeColor: '#14b8a6', rgbGlow: 'rgba(20, 184, 166, 0.8)' },
  { id: '12', name: 'Bet Empire', status: 'inactive', themeColor: '#6366f1', rgbGlow: 'rgba(99, 102, 241, 0.8)' },
  { id: '13', name: 'Fortune Club', status: 'inactive', themeColor: '#84cc16', rgbGlow: 'rgba(132, 204, 22, 0.8)' },
  { id: '14', name: 'Star Casino', status: 'inactive', themeColor: '#d946ef', rgbGlow: 'rgba(217, 70, 239, 0.8)' },
  { id: '15', name: 'Thunder Bet', status: 'inactive', themeColor: '#0ea5e9', rgbGlow: 'rgba(14, 165, 233, 0.8)' },
  { id: '16', name: 'Platinum Play', status: 'inactive', themeColor: '#94a3b8', rgbGlow: 'rgba(148, 163, 184, 0.8)' },
  { id: '17', name: 'Crown Games', status: 'inactive', themeColor: '#fbbf24', rgbGlow: 'rgba(251, 191, 36, 0.8)' },
  { id: '18', name: 'Ace High', status: 'inactive', themeColor: '#22c55e', rgbGlow: 'rgba(34, 197, 94, 0.8)' },
  { id: '19', name: 'Neon Vegas', status: 'inactive', themeColor: '#f43f5e', rgbGlow: 'rgba(244, 63, 94, 0.8)' },
  { id: '20', name: 'Wild Card', status: 'inactive', themeColor: '#7c3aed', rgbGlow: 'rgba(124, 58, 237, 0.8)' },
  { id: '21', name: 'Cash Flow', status: 'inactive', themeColor: '#059669', rgbGlow: 'rgba(5, 150, 105, 0.8)' },
  { id: '22', name: 'Silver Edge', status: 'inactive', themeColor: '#64748b', rgbGlow: 'rgba(100, 116, 139, 0.8)' },
  { id: '23', name: 'Gold Rush', status: 'inactive', themeColor: '#ca8a04', rgbGlow: 'rgba(202, 138, 4, 0.8)' },
  { id: '24', name: 'Prime Slots', status: 'inactive', themeColor: '#2563eb', rgbGlow: 'rgba(37, 99, 235, 0.8)' },
  { id: '25', name: 'Lucky Spin', status: 'inactive', themeColor: '#db2777', rgbGlow: 'rgba(219, 39, 119, 0.8)' },
]

export const navItems = [
  { id: 'analytics', label: 'ANALİTİK', icon: 'chart' },
  { id: 'arena', label: 'ARENA', icon: 'trophy' },
  { id: 'personnel', label: 'PERSONEL MERKEZİ', icon: 'users' },
  { id: 'schedule', label: 'MESAİ TAKVİMİ', icon: 'calendar' },
]

// Brand-specific ticker data for Living Data Footer
export const brandTickerData: Record<string, string[]> = {
  '1': [ // BetMaster TR
    "BETMASTER TR: Gunluk ciro +18% yukseldi",
    "AKTIF OYUNCU: 2,840 (Anlik)",
    "SPOR BAHIS: Futbol kategorisi lider",
    "CANLI BAHIS: 847 aktif etkinlik",
    "ODEME SISTEMI: Tum islemler stabil",
  ],
  '2': [ // Casino Royal
    "CASINO ROYAL: VIP oyuncu sayisi +24%",
    "JACKPOT HAVUZU: ₺1.2M aktif",
    "CANLI CASINO: 156 aktif masa",
    "SLOT PERFORMANS: %96.8 RTP ortalama",
    "OZEL TURNUVA: Haftalik finaller bugun",
  ],
  '3': [ // Spor Arena
    "SPOR ARENA: Canli mac sayisi 234",
    "BAHIS HACMI: ₺4.2M gunluk",
    "FUTBOL: Super Lig en populer",
    "BASKETBOL: NBA sezon finalleri aktif",
    "TENIS: Grand Slam ozel oranlari",
  ],
  '4': [ // Lucky Stars
    "LUCKY STARS: Kampanya verimliligi %85",
    "BTAG PERFORMANSI: 12 aktif kampanya",
    "BONUS KULLANIM: %72 oran",
    "YENI KAYIT: Gunluk +340 uye",
    "PROMOSYON: Hosgeldin bonusu aktif",
  ],
  '5': [ // Golden Palace
    "GOLDEN PALACE: Altin uye sayisi +156",
    "VIP LOUNGE: 89 aktif oturum",
    "OZEL MASALAR: High roller aktif",
    "SADAKAT PUANI: 2.4M dagitildi",
    "CONCIERGE: 7/24 destek aktif",
  ],
  '6': [ // Diamond Bet
    "DIAMOND BET: Premium segment +32%",
    "ELMAS SEVIYE: 234 uye",
    "OZEL ORANLAR: Secili maclarda aktif",
    "HIZLI CEKIM: Ortalama 12 dakika",
    "MUSTERI MEMNUNIYETI: %94",
  ],
  '7': [ // Victory Games
    "VICTORY GAMES: E-spor bahisleri +45%",
    "CS2 TURNUVA: Major finalleri canli",
    "DOTA 2: TI ozel oranlari",
    "LOL: Worlds 2024 aktif",
    "VALORANT: Champions Tour canli",
  ],
  '8': [ // Mega Win
    "MEGA WIN: Jackpot kazanani ₺890K",
    "SLOT TURNUVASI: 1,240 katilimci",
    "GUNUN OYUNU: Sweet Bonanza",
    "MEGA SPIN: 50 bedava donus aktif",
    "PROGRESSIVE: 3 jackpot havuzu",
  ],
  '9': [ // Elite Casino
    "ELITE CASINO: Ozel masa rezervasyonu aktif",
    "BLACKJACK VIP: 12 aktif masa",
    "RULET: Lightning Roulette populer",
    "BACCARAT: Squeeze modu aktif",
    "POKER: Texas Hold'em turnuvasi",
  ],
  '10': [ // Jackpot City
    "JACKPOT CITY: Gunluk ₺2.1M dagitim",
    "MEGA MOOLAH: ₺4.5M havuz",
    "DIVINE FORTUNE: Yerel jackpot aktif",
    "HALL OF GODS: Nordic jackpot",
    "KAZANAN SAYISI: Bugun 847",
  ],
  'default': [
    "SISTEM DURUMU: Tum moduller aktif",
    "CANLI VERI AKISI: Senkronize",
    "PERFORMANS: Optimum seviyede",
    "GUVENLIK: Tum sistemler guvenli",
    "SON GUNCELLEME: Veriler guncel",
  ],
}

// Data Wall detailed metrics for each brand
export interface DataWallMetrics {
  revenue: {
    daily: string
    weekly: string
    monthly: string
    change: string
  }
  players: {
    active: string
    new: string
    vip: string
    retention: string
  }
  btag: {
    campaigns: string
    conversion: string
    cost: string
    roi: string
  }
  security: {
    status: 'green' | 'yellow' | 'red'
    alerts: string
    blocked: string
    verified: string
  }
}

export const brandDataWallMetrics: Record<string, DataWallMetrics> = {
  '1': { // BetMaster TR
    revenue: { daily: '₺847K', weekly: '₺4.2M', monthly: '₺18.5M', change: '+18%' },
    players: { active: '2,840', new: '340', vip: '156', retention: '%78' },
    btag: { campaigns: '12', conversion: '%4.2', cost: '₺45K', roi: '%284' },
    security: { status: 'green', alerts: '3', blocked: '12', verified: '%99.2' },
  },
  '2': { // Casino Royal
    revenue: { daily: '₺1.2M', weekly: '₺6.8M', monthly: '₺28.4M', change: '+24%' },
    players: { active: '1,560', new: '220', vip: '89', retention: '%82' },
    btag: { campaigns: '8', conversion: '%5.1', cost: '₺62K', roi: '%312' },
    security: { status: 'green', alerts: '1', blocked: '8', verified: '%99.8' },
  },
  '3': { // Spor Arena
    revenue: { daily: '₺4.2M', weekly: '₺21.5M', monthly: '₺86.2M', change: '+15%' },
    players: { active: '4,120', new: '520', vip: '234', retention: '%75' },
    btag: { campaigns: '18', conversion: '%3.8', cost: '₺78K', roi: '%256' },
    security: { status: 'green', alerts: '5', blocked: '23', verified: '%98.9' },
  },
  '4': { // Lucky Stars
    revenue: { daily: '₺520K', weekly: '₺2.8M', monthly: '₺11.2M', change: '+22%' },
    players: { active: '1,840', new: '340', vip: '67', retention: '%85' },
    btag: { campaigns: '15', conversion: '%6.2', cost: '₺32K', roi: '%345' },
    security: { status: 'green', alerts: '2', blocked: '5', verified: '%99.5' },
  },
  '5': { // Golden Palace
    revenue: { daily: '₺2.1M', weekly: '₺10.5M', monthly: '₺42.8M', change: '+28%' },
    players: { active: '890', new: '156', vip: '234', retention: '%91' },
    btag: { campaigns: '6', conversion: '%8.4', cost: '₺95K', roi: '%420' },
    security: { status: 'green', alerts: '0', blocked: '2', verified: '%99.9' },
  },
  '6': { // Diamond Bet
    revenue: { daily: '₺680K', weekly: '₺3.4M', monthly: '₺14.2M', change: '+32%' },
    players: { active: '1,120', new: '180', vip: '156', retention: '%88' },
    btag: { campaigns: '10', conversion: '%5.8', cost: '₺48K', roi: '%298' },
    security: { status: 'green', alerts: '1', blocked: '4', verified: '%99.6' },
  },
  '7': { // Victory Games
    revenue: { daily: '₺1.8M', weekly: '₺9.2M', monthly: '₺38.5M', change: '+45%' },
    players: { active: '3,240', new: '680', vip: '178', retention: '%72' },
    btag: { campaigns: '22', conversion: '%4.5', cost: '₺56K', roi: '%312' },
    security: { status: 'green', alerts: '4', blocked: '18', verified: '%98.7' },
  },
  '8': { // Mega Win
    revenue: { daily: '₺890K', weekly: '₺4.5M', monthly: '₺18.8M', change: '+19%' },
    players: { active: '2,560', new: '420', vip: '89', retention: '%76' },
    btag: { campaigns: '14', conversion: '%4.8', cost: '₺42K', roi: '%276' },
    security: { status: 'yellow', alerts: '8', blocked: '34', verified: '%97.8' },
  },
  'default': {
    revenue: { daily: '₺1.2M', weekly: '₺6.5M', monthly: '₺26.4M', change: '+16%' },
    players: { active: '2,450', new: '380', vip: '145', retention: '%79' },
    btag: { campaigns: '12', conversion: '%4.8', cost: '₺52K', roi: '%295' },
    security: { status: 'green', alerts: '3', blocked: '15', verified: '%99.1' },
  },
}

// Arena League Data
export interface ArenaLeagueEntry {
  id: string
  rank: number
  siteName: string
  siteColor: string
  efficiencyScore: number
  btagROI: number
  retention: number
  riskScore: 'low' | 'medium' | 'high'
  dailyPoints: number
  totalPoints: number
  trend: 'up' | 'down' | 'stable'
  trendValue: number
}

export const arenaLeagueData: ArenaLeagueEntry[] = [
  { id: '1', rank: 1, siteName: 'Golden Palace', siteColor: '#eab308', efficiencyScore: 94, btagROI: 420, retention: 91, riskScore: 'low', dailyPoints: 3, totalPoints: 87, trend: 'up', trendValue: 2 },
  { id: '2', rank: 2, siteName: 'Victory Games', siteColor: '#8b5cf6', efficiencyScore: 89, btagROI: 312, retention: 72, riskScore: 'low', dailyPoints: 2, totalPoints: 82, trend: 'up', trendValue: 1 },
  { id: '3', rank: 3, siteName: 'Lucky Stars', siteColor: '#ec4899', efficiencyScore: 87, btagROI: 345, retention: 85, riskScore: 'low', dailyPoints: 3, totalPoints: 79, trend: 'stable', trendValue: 0 },
  { id: '4', rank: 4, siteName: 'Diamond Bet', siteColor: '#06b6d4', efficiencyScore: 85, btagROI: 298, retention: 88, riskScore: 'low', dailyPoints: 2, totalPoints: 74, trend: 'up', trendValue: 3 },
  { id: '5', rank: 5, siteName: 'BetMaster TR', siteColor: '#3b82f6', efficiencyScore: 82, btagROI: 284, retention: 78, riskScore: 'low', dailyPoints: 1, totalPoints: 71, trend: 'down', trendValue: 1 },
  { id: '6', rank: 6, siteName: 'Casino Royal', siteColor: '#f59e0b', efficiencyScore: 80, btagROI: 312, retention: 82, riskScore: 'low', dailyPoints: 2, totalPoints: 68, trend: 'stable', trendValue: 0 },
  { id: '7', rank: 7, siteName: 'Spor Arena', siteColor: '#10b981', efficiencyScore: 78, btagROI: 256, retention: 75, riskScore: 'medium', dailyPoints: 1, totalPoints: 64, trend: 'down', trendValue: 2 },
  { id: '8', rank: 8, siteName: 'Mega Win', siteColor: '#ef4444', efficiencyScore: 75, btagROI: 276, retention: 76, riskScore: 'medium', dailyPoints: 1, totalPoints: 59, trend: 'up', trendValue: 1 },
  { id: '9', rank: 9, siteName: 'Elite Casino', siteColor: '#a855f7', efficiencyScore: 72, btagROI: 245, retention: 79, riskScore: 'low', dailyPoints: 2, totalPoints: 55, trend: 'stable', trendValue: 0 },
  { id: '10', rank: 10, siteName: 'Jackpot City', siteColor: '#f97316', efficiencyScore: 68, btagROI: 234, retention: 71, riskScore: 'medium', dailyPoints: 1, totalPoints: 48, trend: 'down', trendValue: 3 },
]

// ==========================================
// LEAGUE SYSTEM DATA
// ==========================================

export type LeagueTier = 'iron' | 'bronze' | 'silver' | 'gold' | 'diamond' | 'master'
export type LeagueDivision = 'I' | 'II'
export type UserRole = 'personnel' | 'unit_manager' | 'general_manager' | 'admin'

export interface LeagueRank {
  tier: LeagueTier
  division: LeagueDivision
  name: string
  minPoints: number
  maxPoints: number
  color: string
  gradient: string
  icon: string
  glow: string
}

export interface LeaguePlayer {
  id: string
  name: string
  avatar: string
  role: UserRole
  siteId: string
  siteName: string
  unitId: string
  unitName: string
  points: number
  rank: LeagueRank
  previousRank: LeagueRank | null
  weeklyChange: number
  monthlyChange: number
  streak: number
  isPromoted: boolean
  isDemoted: boolean
  lastActivity: Date
  stats: {
    tasksCompleted: number
    efficiency: number
    attendance: number
    performance: number
  }
}

export interface LeagueActivity {
  id: string
  playerId: string
  playerName: string
  type: 'promoted' | 'demoted' | 'achievement' | 'milestone'
  fromRank?: LeagueRank
  toRank?: LeagueRank
  message: string
  timestamp: Date
}

export const leagueRanks: LeagueRank[] = [
  { tier: 'iron', division: 'II', name: 'Demir II', minPoints: 0, maxPoints: 99, color: '#6b7280', gradient: 'linear-gradient(135deg, #4b5563 0%, #6b7280 50%, #9ca3af 100%)', icon: 'shield', glow: 'rgba(107, 114, 128, 0.5)' },
  { tier: 'iron', division: 'I', name: 'Demir I', minPoints: 100, maxPoints: 199, color: '#9ca3af', gradient: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 50%, #d1d5db 100%)', icon: 'shield', glow: 'rgba(156, 163, 175, 0.5)' },
  { tier: 'bronze', division: 'II', name: 'Bronz II', minPoints: 200, maxPoints: 349, color: '#b45309', gradient: 'linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)', icon: 'medal', glow: 'rgba(180, 83, 9, 0.5)' },
  { tier: 'bronze', division: 'I', name: 'Bronz I', minPoints: 350, maxPoints: 499, color: '#d97706', gradient: 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)', icon: 'medal', glow: 'rgba(217, 119, 6, 0.5)' },
  { tier: 'silver', division: 'II', name: 'Gumus II', minPoints: 500, maxPoints: 699, color: '#64748b', gradient: 'linear-gradient(135deg, #475569 0%, #64748b 50%, #94a3b8 100%)', icon: 'award', glow: 'rgba(100, 116, 139, 0.5)' },
  { tier: 'silver', division: 'I', name: 'Gumus I', minPoints: 700, maxPoints: 899, color: '#94a3b8', gradient: 'linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)', icon: 'award', glow: 'rgba(148, 163, 184, 0.5)' },
  { tier: 'gold', division: 'II', name: 'Altin II', minPoints: 900, maxPoints: 1199, color: '#eab308', gradient: 'linear-gradient(135deg, #ca8a04 0%, #eab308 50%, #facc15 100%)', icon: 'crown', glow: 'rgba(234, 179, 8, 0.5)' },
  { tier: 'gold', division: 'I', name: 'Altin I', minPoints: 1200, maxPoints: 1499, color: '#facc15', gradient: 'linear-gradient(135deg, #eab308 0%, #facc15 50%, #fde047 100%)', icon: 'crown', glow: 'rgba(250, 204, 21, 0.5)' },
  { tier: 'diamond', division: 'II', name: 'Elmas II', minPoints: 1500, maxPoints: 1899, color: '#06b6d4', gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)', icon: 'gem', glow: 'rgba(6, 182, 212, 0.5)' },
  { tier: 'diamond', division: 'I', name: 'Elmas I', minPoints: 1900, maxPoints: 2299, color: '#22d3ee', gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #67e8f9 100%)', icon: 'gem', glow: 'rgba(34, 211, 238, 0.5)' },
  { tier: 'master', division: 'I', name: 'Ustat', minPoints: 2300, maxPoints: 99999, color: '#a855f7', gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)', icon: 'sparkles', glow: 'rgba(168, 85, 247, 0.5)' },
]

export const getRankByPoints = (points: number): LeagueRank => {
  for (let i = leagueRanks.length - 1; i >= 0; i--) {
    if (points >= leagueRanks[i].minPoints) {
      return leagueRanks[i]
    }
  }
  return leagueRanks[0]
}

// Mock League Players Data
export const leaguePlayers: LeaguePlayer[] = [
  // Personnel
  { id: 'p1', name: 'Ahmet Yilmaz', avatar: '/avatars/1.jpg', role: 'personnel', siteId: '1', siteName: 'Golden Palace', unitId: 'u1', unitName: 'Musteri Hizmetleri', points: 2450, rank: leagueRanks[10], previousRank: leagueRanks[9], weeklyChange: 85, monthlyChange: 320, streak: 12, isPromoted: true, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 234, efficiency: 96, attendance: 98, performance: 94 } },
  { id: 'p2', name: 'Zeynep Kaya', avatar: '/avatars/2.jpg', role: 'personnel', siteId: '1', siteName: 'Golden Palace', unitId: 'u1', unitName: 'Musteri Hizmetleri', points: 2180, rank: leagueRanks[9], previousRank: leagueRanks[9], weeklyChange: 45, monthlyChange: 180, streak: 8, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 198, efficiency: 92, attendance: 96, performance: 91 } },
  { id: 'p3', name: 'Mehmet Demir', avatar: '/avatars/3.jpg', role: 'personnel', siteId: '2', siteName: 'Victory Games', unitId: 'u2', unitName: 'Teknik Destek', points: 1950, rank: leagueRanks[9], previousRank: leagueRanks[10], weeklyChange: -65, monthlyChange: -120, streak: 0, isPromoted: false, isDemoted: true, lastActivity: new Date(), stats: { tasksCompleted: 156, efficiency: 88, attendance: 92, performance: 85 } },
  { id: 'p4', name: 'Elif Ozturk', avatar: '/avatars/4.jpg', role: 'personnel', siteId: '2', siteName: 'Victory Games', unitId: 'u3', unitName: 'Satis', points: 1680, rank: leagueRanks[8], previousRank: leagueRanks[8], weeklyChange: 32, monthlyChange: 95, streak: 5, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 178, efficiency: 90, attendance: 94, performance: 88 } },
  { id: 'p5', name: 'Can Arslan', avatar: '/avatars/5.jpg', role: 'personnel', siteId: '3', siteName: 'Lucky Stars', unitId: 'u1', unitName: 'Musteri Hizmetleri', points: 1420, rank: leagueRanks[7], previousRank: leagueRanks[6], weeklyChange: 78, monthlyChange: 245, streak: 7, isPromoted: true, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 145, efficiency: 85, attendance: 90, performance: 82 } },
  { id: 'p6', name: 'Selin Yildiz', avatar: '/avatars/6.jpg', role: 'personnel', siteId: '3', siteName: 'Lucky Stars', unitId: 'u2', unitName: 'Teknik Destek', points: 1150, rank: leagueRanks[6], previousRank: leagueRanks[6], weeklyChange: 28, monthlyChange: 85, streak: 3, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 132, efficiency: 82, attendance: 88, performance: 80 } },
  { id: 'p7', name: 'Burak Celik', avatar: '/avatars/7.jpg', role: 'personnel', siteId: '1', siteName: 'Golden Palace', unitId: 'u3', unitName: 'Satis', points: 980, rank: leagueRanks[6], previousRank: leagueRanks[7], weeklyChange: -42, monthlyChange: -85, streak: 0, isPromoted: false, isDemoted: true, lastActivity: new Date(), stats: { tasksCompleted: 98, efficiency: 78, attendance: 85, performance: 75 } },
  { id: 'p8', name: 'Deniz Sahin', avatar: '/avatars/8.jpg', role: 'personnel', siteId: '2', siteName: 'Victory Games', unitId: 'u1', unitName: 'Musteri Hizmetleri', points: 750, rank: leagueRanks[5], previousRank: leagueRanks[5], weeklyChange: 18, monthlyChange: 65, streak: 2, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 87, efficiency: 75, attendance: 82, performance: 72 } },
  { id: 'p9', name: 'Ayse Korkmaz', avatar: '/avatars/9.jpg', role: 'personnel', siteId: '3', siteName: 'Lucky Stars', unitId: 'u3', unitName: 'Satis', points: 520, rank: leagueRanks[4], previousRank: leagueRanks[3], weeklyChange: 55, monthlyChange: 140, streak: 4, isPromoted: true, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 76, efficiency: 72, attendance: 80, performance: 70 } },
  { id: 'p10', name: 'Emre Yildirim', avatar: '/avatars/10.jpg', role: 'personnel', siteId: '1', siteName: 'Golden Palace', unitId: 'u2', unitName: 'Teknik Destek', points: 380, rank: leagueRanks[3], previousRank: leagueRanks[3], weeklyChange: 12, monthlyChange: 45, streak: 1, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 54, efficiency: 68, attendance: 78, performance: 65 } },
  { id: 'p11', name: 'Fatma Aksoy', avatar: '/avatars/11.jpg', role: 'personnel', siteId: '2', siteName: 'Victory Games', unitId: 'u3', unitName: 'Satis', points: 220, rank: leagueRanks[2], previousRank: leagueRanks[2], weeklyChange: 8, monthlyChange: 32, streak: 1, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 42, efficiency: 65, attendance: 75, performance: 62 } },
  { id: 'p12', name: 'Murat Eren', avatar: '/avatars/12.jpg', role: 'personnel', siteId: '3', siteName: 'Lucky Stars', unitId: 'u1', unitName: 'Musteri Hizmetleri', points: 85, rank: leagueRanks[0], previousRank: leagueRanks[1], weeklyChange: -28, monthlyChange: -55, streak: 0, isPromoted: false, isDemoted: true, lastActivity: new Date(), stats: { tasksCompleted: 28, efficiency: 58, attendance: 70, performance: 55 } },
  
  // Unit Managers
  { id: 'um1', name: 'Ali Ozdogan', avatar: '/avatars/13.jpg', role: 'unit_manager', siteId: '1', siteName: 'Golden Palace', unitId: 'u1', unitName: 'Musteri Hizmetleri', points: 2680, rank: leagueRanks[10], previousRank: leagueRanks[10], weeklyChange: 95, monthlyChange: 380, streak: 15, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 312, efficiency: 97, attendance: 99, performance: 96 } },
  { id: 'um2', name: 'Hande Koc', avatar: '/avatars/14.jpg', role: 'unit_manager', siteId: '2', siteName: 'Victory Games', unitId: 'u2', unitName: 'Teknik Destek', points: 2320, rank: leagueRanks[10], previousRank: leagueRanks[9], weeklyChange: 72, monthlyChange: 285, streak: 10, isPromoted: true, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 278, efficiency: 94, attendance: 97, performance: 93 } },
  { id: 'um3', name: 'Kerem Aydin', avatar: '/avatars/15.jpg', role: 'unit_manager', siteId: '3', siteName: 'Lucky Stars', unitId: 'u3', unitName: 'Satis', points: 1850, rank: leagueRanks[8], previousRank: leagueRanks[8], weeklyChange: 48, monthlyChange: 165, streak: 6, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 245, efficiency: 91, attendance: 95, performance: 89 } },
  { id: 'um4', name: 'Tugce Polat', avatar: '/avatars/16.jpg', role: 'unit_manager', siteId: '1', siteName: 'Golden Palace', unitId: 'u2', unitName: 'Teknik Destek', points: 1520, rank: leagueRanks[8], previousRank: leagueRanks[9], weeklyChange: -38, monthlyChange: -95, streak: 0, isPromoted: false, isDemoted: true, lastActivity: new Date(), stats: { tasksCompleted: 198, efficiency: 86, attendance: 92, performance: 84 } },
  { id: 'um5', name: 'Serkan Tas', avatar: '/avatars/17.jpg', role: 'unit_manager', siteId: '2', siteName: 'Victory Games', unitId: 'u1', unitName: 'Musteri Hizmetleri', points: 1180, rank: leagueRanks[6], previousRank: leagueRanks[6], weeklyChange: 25, monthlyChange: 78, streak: 3, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 165, efficiency: 83, attendance: 89, performance: 81 } },
  { id: 'um6', name: 'Pinar Gunes', avatar: '/avatars/18.jpg', role: 'unit_manager', siteId: '3', siteName: 'Lucky Stars', unitId: 'u2', unitName: 'Teknik Destek', points: 890, rank: leagueRanks[5], previousRank: leagueRanks[4], weeklyChange: 62, monthlyChange: 195, streak: 5, isPromoted: true, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 134, efficiency: 79, attendance: 86, performance: 77 } },
  
  // General Managers
  { id: 'gm1', name: 'Ozge Basar', avatar: '/avatars/19.jpg', role: 'general_manager', siteId: '1', siteName: 'Golden Palace', unitId: '', unitName: 'Genel Yonetim', points: 2890, rank: leagueRanks[10], previousRank: leagueRanks[10], weeklyChange: 110, monthlyChange: 420, streak: 18, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 456, efficiency: 98, attendance: 100, performance: 97 } },
  { id: 'gm2', name: 'Volkan Kaplan', avatar: '/avatars/20.jpg', role: 'general_manager', siteId: '2', siteName: 'Victory Games', unitId: '', unitName: 'Genel Yonetim', points: 2540, rank: leagueRanks[10], previousRank: leagueRanks[10], weeklyChange: 88, monthlyChange: 345, streak: 14, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 398, efficiency: 96, attendance: 98, performance: 95 } },
  { id: 'gm3', name: 'Canan Duman', avatar: '/avatars/21.jpg', role: 'general_manager', siteId: '3', siteName: 'Lucky Stars', unitId: '', unitName: 'Genel Yonetim', points: 2180, rank: leagueRanks[9], previousRank: leagueRanks[8], weeklyChange: 95, monthlyChange: 380, streak: 11, isPromoted: true, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 345, efficiency: 93, attendance: 96, performance: 92 } },
  
  // Admins
  { id: 'a1', name: 'Ozan Yalcin', avatar: '/avatars/22.jpg', role: 'admin', siteId: '', siteName: 'Sistem', unitId: '', unitName: 'IT Yonetimi', points: 3120, rank: leagueRanks[10], previousRank: leagueRanks[10], weeklyChange: 125, monthlyChange: 480, streak: 22, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 567, efficiency: 99, attendance: 100, performance: 98 } },
  { id: 'a2', name: 'Berna Kara', avatar: '/avatars/23.jpg', role: 'admin', siteId: '', siteName: 'Sistem', unitId: '', unitName: 'Operasyon', points: 2780, rank: leagueRanks[10], previousRank: leagueRanks[10], weeklyChange: 98, monthlyChange: 395, streak: 16, isPromoted: false, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 489, efficiency: 97, attendance: 99, performance: 96 } },
  { id: 'a3', name: 'Tamer Cetin', avatar: '/avatars/24.jpg', role: 'admin', siteId: '', siteName: 'Sistem', unitId: '', unitName: 'Guvenlik', points: 2450, rank: leagueRanks[10], previousRank: leagueRanks[9], weeklyChange: 82, monthlyChange: 320, streak: 12, isPromoted: true, isDemoted: false, lastActivity: new Date(), stats: { tasksCompleted: 412, efficiency: 95, attendance: 97, performance: 94 } },
]

// League Activities (for ticker)
export const leagueActivities: LeagueActivity[] = [
  { id: 'la1', playerId: 'p1', playerName: 'Ahmet Yilmaz', type: 'promoted', fromRank: leagueRanks[9], toRank: leagueRanks[10], message: 'Ahmet Yilmaz USTAT ligine yukseldi!', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 'la2', playerId: 'p3', playerName: 'Mehmet Demir', type: 'demoted', fromRank: leagueRanks[10], toRank: leagueRanks[9], message: 'Mehmet Demir Elmas I ligine dustu', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
  { id: 'la3', playerId: 'um2', playerName: 'Hande Koc', type: 'promoted', fromRank: leagueRanks[9], toRank: leagueRanks[10], message: 'Hande Koc USTAT ligine yukseldi!', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 'la4', playerId: 'p5', playerName: 'Can Arslan', type: 'promoted', fromRank: leagueRanks[6], toRank: leagueRanks[7], message: 'Can Arslan Altin II ligine yukseldi', timestamp: new Date(Date.now() - 1000 * 60 * 45) },
  { id: 'la5', playerId: 'p7', playerName: 'Burak Celik', type: 'demoted', fromRank: leagueRanks[7], toRank: leagueRanks[6], message: 'Burak Celik Gumus I ligine dustu', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
  { id: 'la6', playerId: 'gm3', playerName: 'Canan Duman', type: 'promoted', fromRank: leagueRanks[8], toRank: leagueRanks[9], message: 'Canan Duman Elmas I ligine yukseldi', timestamp: new Date(Date.now() - 1000 * 60 * 90) },
  { id: 'la7', playerId: 'um4', playerName: 'Tugce Polat', type: 'demoted', fromRank: leagueRanks[9], toRank: leagueRanks[8], message: 'Tugce Polat Elmas II ligine dustu', timestamp: new Date(Date.now() - 1000 * 60 * 120) },
  { id: 'la8', playerId: 'a3', playerName: 'Tamer Cetin', type: 'promoted', fromRank: leagueRanks[9], toRank: leagueRanks[10], message: 'Tamer Cetin USTAT ligine yukseldi!', timestamp: new Date(Date.now() - 1000 * 60 * 150) },
  { id: 'la9', playerId: 'p9', playerName: 'Ayse Korkmaz', type: 'promoted', fromRank: leagueRanks[3], toRank: leagueRanks[4], message: 'Ayse Korkmaz Gumus II ligine yukseldi', timestamp: new Date(Date.now() - 1000 * 60 * 180) },
  { id: 'la10', playerId: 'p12', playerName: 'Murat Eren', type: 'demoted', fromRank: leagueRanks[1], toRank: leagueRanks[0], message: 'Murat Eren Demir II ligine dustu', timestamp: new Date(Date.now() - 1000 * 60 * 210) },
]

export const dashboardCards: DashboardCard[] = [
  {
    id: 'aylik-simulasyon',
    title: 'AYLIK GENEL SİMÜLASYON',
    subtitle: 'Analitik Modülü',
    icon: 'brain',
    rank: 'I',
    glowColor: '#8b5cf6',
    videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/genell.mp4',
    gradient: {
      from: '#9333ea',
      to: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.5)',
    },
    data: {
      mainValue: '₺2.4M',
      mainLabel: 'Toplam Gelir',
      stats: [
        { label: 'Net Kâr', value: '₺847K' },
        { label: 'Yatırım', value: '₺1.8M' },
        { label: 'Çekim', value: '₺956K' },
        { label: 'Oran', value: '%35.2' },
      ],
      chartData: [
        { name: 'Oca', value: 320 },
        { name: 'Şub', value: 450 },
        { name: 'Mar', value: 380 },
        { name: 'Nis', value: 520 },
        { name: 'May', value: 680 },
        { name: 'Haz', value: 750 },
      ],
    },
  },
  {
    id: 'finansal-analiz',
    title: 'FİNANSAL ANALİZ',
    subtitle: 'Analitik Modülü',
    icon: 'dollar',
    rank: 'II',
    glowColor: '#fbbf24',
    videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/finans.mp4',
    gradient: {
      from: '#fbbf24',
      to: '#f8fafc',
      glow: 'rgba(251, 191, 36, 0.5)',
    },
    data: {
      mainValue: '₺142',
      mainLabel: 'ARPU',
      stats: [
        { label: 'ROI', value: '%284' },
        { label: 'CAC', value: '₺45' },
        { label: 'LTV', value: '₺890' },
        { label: 'Aktif', value: '12.4K' },
      ],
      chartData: [
        { name: 'Oca', value: 120 },
        { name: 'Şub', value: 145 },
        { name: 'Mar', value: 132 },
        { name: 'Nis', value: 168 },
        { name: 'May', value: 142 },
        { name: 'Haz', value: 189 },
      ],
    },
  },
  {
    id: 'bonus-btag',
    title: 'BONUS / BTAG ANALİZİ',
    subtitle: 'Analitik Modülü',
    icon: 'gift',
    rank: 'III',
    glowColor: '#ec4899',
    videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/bonus.mp4',
    gradient: {
      from: '#ec4899',
      to: '#8b5cf6',
      glow: 'rgba(236, 72, 153, 0.5)',
    },
    data: {
      mainValue: '%96.4',
      mainLabel: 'Ortalama RTP',
      stats: [
        { label: 'En Yüksek', value: '%98.2' },
        { label: 'En Düşük', value: '%94.1' },
        { label: 'Sağlayıcı', value: '47' },
        { label: 'Aktif Oyun', value: '2.3K' },
      ],
      chartData: [
        { name: 'Oca', value: 96.2 },
        { name: 'Şub', value: 95.8 },
        { name: 'Mar', value: 96.5 },
        { name: 'Nis', value: 96.1 },
        { name: 'May', value: 96.8 },
        { name: 'Haz', value: 96.4 },
      ],
    },
  },
  {
    id: 'spor-analizi',
    title: 'SPOR ANALİZİ',
    subtitle: 'Analitik Modülü',
    icon: 'activity',
    rank: 'IV',
    glowColor: '#10b981',
    videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/Gen-4_5%20A%20futuristic%20holographic%20visualization%20of%20real-time%20sports%20player%20tracking%20data%20on%20an%20abstract%20dark%20arena%20grid%20surface%20Glowing%20fiery%20orange%20and%20electric%20blue%20kinetic%20energy%20trails%20and%20heatmap.gen-4_5%20a%20futuristic%20holographic%20visuali.mp4',
    gradient: {
      from: '#10b981',
      to: '#f8fafc',
      glow: 'rgba(16, 185, 129, 0.5)',
    },
    data: {
      mainValue: '23',
      mainLabel: 'Aktif Uyarı',
      stats: [
        { label: 'Kilitli', value: '156' },
        { label: 'Fraud', value: '12' },
        { label: 'İnceleme', value: '34' },
        { label: 'Çözüldü', value: '89%' },
      ],
      chartData: [
        { name: 'Oca', value: 45 },
        { name: 'Şub', value: 38 },
        { name: 'Mar', value: 52 },
        { name: 'Nis', value: 31 },
        { name: 'May', value: 28 },
        { name: 'Haz', value: 23 },
      ],
    },
  },
  {
    id: 'casino-analizi',
    title: 'CASINO ANALİZİ',
    subtitle: 'Analitik Modülü',
    icon: 'gamepad',
    rank: 'V',
    glowColor: '#ef4444',
    videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/casino.mp4',
    gradient: {
      from: '#ef4444',
      to: '#f59e0b',
      glow: 'rgba(239, 68, 68, 0.5)',
    },
    data: {
      mainValue: '%98.7',
      mainLabel: 'Başarı Oranı',
      stats: [
        { label: 'İşlem', value: '45.2K' },
        { label: 'Hacim', value: '₺8.4M' },
        { label: 'Ort. Süre', value: '2.3s' },
        { label: 'Aktif', value: '12' },
      ],
      chartData: [
        { name: 'Oca', value: 97.2 },
        { name: 'Şub', value: 98.1 },
        { name: 'Mar', value: 97.8 },
        { name: 'Nis', value: 98.5 },
        { name: 'May', value: 98.9 },
        { name: 'Haz', value: 98.7 },
      ],
    },
  },
  {
    id: 'oyuncular-analizi',
    title: 'OYUNCULAR ANALİZİ',
    subtitle: 'Analitik Modülü',
    icon: 'shield',
    rank: 'VI',
    glowColor: '#06b6d4',
    videoUrl: 'https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/random.mp4',
    gradient: {
      from: '#06b6d4',
      to: '#2563eb',
      glow: 'rgba(6, 182, 212, 0.5)',
    },
    data: {
      mainValue: '₺245K',
      mainLabel: 'Toplam Dağıtım',
      stats: [
        { label: 'Kullanım', value: '%72' },
        { label: 'Wagering', value: '₺1.2M' },
        { label: 'Maliyet', value: '₺89K' },
        { label: 'Kampanya', value: '8' },
      ],
      chartData: [
        { name: 'Oca', value: 180 },
        { name: 'Şub', value: 220 },
        { name: 'Mar', value: 195 },
        { name: 'Nis', value: 240 },
        { name: 'May', value: 260 },
        { name: 'Haz', value: 245 },
      ],
    },
  },
  ]

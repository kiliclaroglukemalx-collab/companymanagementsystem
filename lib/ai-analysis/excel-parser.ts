import * as XLSX from "xlsx"
import { normalizeTurkish } from "@/lib/excel-processor"
import type { ModuleData, ModuleKey, SectionKpi, SectionTable, SectionChart } from "./types"

// ── Helpers ──

function fmt(n: number): string {
  return Math.abs(n).toLocaleString("tr-TR", { maximumFractionDigits: 0 })
}

function findCol(headers: string[], alts: string[]): string | null {
  for (const alt of alts) {
    const exact = headers.find((h) => h === alt)
    if (exact) return exact
  }
  for (const alt of alts) {
    const norm = normalizeTurkish(alt)
    const match = headers.find((h) => normalizeTurkish(h) === norm)
    if (match) return match
  }
  for (const alt of alts) {
    const norm = normalizeTurkish(alt)
    const match = headers.find((h) => normalizeTurkish(h).includes(norm))
    if (match) return match
  }
  return null
}

function num(val: unknown): number {
  if (typeof val === "number") return val
  if (!val) return 0
  const s = String(val).replace(/[^\d.,-]/g, "").replace(",", ".")
  return parseFloat(s) || 0
}

function str(val: unknown): string {
  if (!val) return ""
  return String(val).trim()
}

type RawRow = Record<string, unknown>

function readSheet(buffer: Buffer, sheetIndex = 0): { headers: string[]; rows: RawRow[] } {
  const wb = XLSX.read(buffer, { type: "buffer" })
  const name = wb.SheetNames[sheetIndex]
  if (!name) return { headers: [], rows: [] }
  const rows: RawRow[] = XLSX.utils.sheet_to_json(wb.Sheets[name])
  const headers = rows.length > 0 ? Object.keys(rows[0]) : []
  return { headers, rows }
}

function readAllSheets(buffer: Buffer): Map<string, { headers: string[]; rows: RawRow[] }> {
  const wb = XLSX.read(buffer, { type: "buffer" })
  const result = new Map<string, { headers: string[]; rows: RawRow[] }>()
  for (const name of wb.SheetNames) {
    const rows: RawRow[] = XLSX.utils.sheet_to_json(wb.Sheets[name])
    const headers = rows.length > 0 ? Object.keys(rows[0]) : []
    result.set(name, { headers, rows })
  }
  return result
}

// ── Column alternatives per domain ──

const COL = {
  paymentMethod: ["Ödeme Türü Adı", "Odeme Turu Adi", "OdemeTuruAdi", "Odeme Turu", "Payment Method", "Yontem"],
  deposit: ["Borç", "Borc", "Yatırım", "Yatirim", "Deposit", "deposit", "Yatirma", "Total Deposit"],
  withdraw: ["Kredi", "Çekim", "Cekim", "Withdrawal", "withdrawal", "Total Withdraw", "Cekim Tutari"],
  count: ["Adet", "Count", "islem", "İşlem Sayısı", "Islem Sayisi", "Transaction Count"],
  date: ["Tarih", "Date", "Gün", "Gun", "Day", "Period"],
  player: ["Player", "Oyuncu", "Player ID", "Oyuncu ID", "UserId", "User ID", "user_id"],
  btag: ["BTag", "btag", "Affiliate", "Kaynak", "Source", "Tag"],
  provider: ["Provider", "Sağlayıcı", "Saglayici", "Game Provider"],
  game: ["Game", "Oyun", "Game Name", "Oyun Adi"],
  ggr: ["GGR", "Gross Gaming Revenue", "Brut Gelir", "Net Revenue", "Revenue"],
  ngr: ["NGR", "Net Gaming Revenue", "Net Gelir"],
  bet: ["Bet", "Bahis", "Stake", "Wager", "Bahis Tutari", "Total Bet"],
  win: ["Win", "Kazanc", "Kazanç", "Payout", "Odeme"],
  rtp: ["RTP", "Return to Player", "Donus Orani"],
  league: ["Lig", "League", "Turnuva", "Tournament"],
  odds: ["Odds", "Oran", "Bahis Orani"],
  bonusType: ["Bonus Tipi", "Bonus Type", "Bonus Turu", "Bonus Türü", "Type"],
  bonusAmount: ["Tutar", "Amount", "Bonus Tutari", "Bonus Amount", "Verilen"],
  bonusUsed: ["Kullanilan", "Used", "Kullanılan", "Redeemed"],
  balance: ["Bakiye", "Balance", "Current Balance", "Guncel Bakiye"],
  rounds: ["Rounds", "Tur", "Round Count", "Tur Sayisi"],
  segment: ["Segment", "Kategori", "Category", "Tier"],
  status: ["Durum", "Status", "State"],
  share: ["Pay", "Share", "Oran", "Percentage"],
  avg: ["Ortalama", "Avg", "Average"],
  p95: ["P95", "p95", "95th Percentile"],
}

// ══════════════════════════════════════
//  Module-specific parsers
// ══════════════════════════════════════

export function parseFinansalData(buffers: Buffer[]): ModuleData {
  const allPaymentRows: { method: string; deposit: number; withdraw: number; count?: number; avg?: string; p95?: string }[] = []
  const dailyData: { day: string; deposit: number; withdraw: number }[] = []

  for (const buf of buffers) {
    const sheets = readAllSheets(buf)
    for (const [, { headers, rows }] of sheets) {
      const methodCol = findCol(headers, COL.paymentMethod)
      const depositCol = findCol(headers, COL.deposit)
      const withdrawCol = findCol(headers, COL.withdraw)
      const dateCol = findCol(headers, COL.date)
      const countCol = findCol(headers, COL.count)

      if (methodCol && (depositCol || withdrawCol)) {
        for (const row of rows) {
          const method = str(row[methodCol])
          if (!method) continue
          const dep = depositCol ? num(row[depositCol]) : 0
          const wd = withdrawCol ? num(row[withdrawCol]) : 0
          const cnt = countCol ? num(row[countCol]) : undefined
          const existing = allPaymentRows.find((r) => r.method === method)
          if (existing) {
            existing.deposit += dep
            existing.withdraw += wd
          } else {
            allPaymentRows.push({ method, deposit: dep, withdraw: wd, count: cnt })
          }
        }
      }

      if (dateCol && (depositCol || withdrawCol)) {
        for (const row of rows) {
          const day = str(row[dateCol])
          if (!day) continue
          const dep = depositCol ? num(row[depositCol]) : 0
          const wd = withdrawCol ? num(row[withdrawCol]) : 0
          const existing = dailyData.find((d) => d.day === day)
          if (existing) {
            existing.deposit += dep
            existing.withdraw += wd
          } else {
            dailyData.push({ day, deposit: dep, withdraw: wd })
          }
        }
      }
    }
  }

  const totalDeposit = allPaymentRows.reduce((s, r) => s + r.deposit, 0)
  const totalWithdraw = allPaymentRows.reduce((s, r) => s + r.withdraw, 0)
  const net = totalDeposit - totalWithdraw
  const totalCount = allPaymentRows.reduce((s, r) => s + (r.count || 0), 0)
  const depositCount = allPaymentRows.filter((r) => r.deposit > 0).length
  const withdrawCount = allPaymentRows.filter((r) => r.withdraw > 0).length

  const kpis: SectionKpi[] = [
    { label: "Toplam Yatirma", value: fmt(totalDeposit), unit: "TRY", trend: "up", badge: `+${fmt(net)} Net`, color: "#34c759" },
    { label: "Toplam Cekim", value: fmt(totalWithdraw), unit: "TRY", trend: "down", badge: `%${totalDeposit > 0 ? ((totalWithdraw / totalDeposit) * 100).toFixed(1) : "0"} C/Y`, color: "#ff453a" },
    { label: "Yatirma Adet", value: fmt(totalCount || depositCount), unit: "islem", color: "#0071e3" },
    { label: "Cekim Adet", value: fmt(withdrawCount), unit: "islem", color: "#ff9f0a" },
  ]

  const topDeposit = [...allPaymentRows].sort((a, b) => b.deposit - a.deposit).slice(0, 5)
  const topWithdraw = [...allPaymentRows].sort((a, b) => b.withdraw - a.withdraw).slice(0, 5)

  const tables: SectionTable[] = [
    {
      title: "En Cok Kullanilan Yatirma Yontemleri",
      columns: [
        { key: "method", label: "Yontem" },
        { key: "count", label: "Adet", align: "right" },
        { key: "amount", label: "Tutar (TRY)", align: "right" },
      ],
      rows: topDeposit.map((r) => ({ method: r.method, count: r.count || 0, amount: fmt(r.deposit) })),
    },
    {
      title: "En Cok Kullanilan Cekim Yontemleri",
      columns: [
        { key: "method", label: "Yontem" },
        { key: "count", label: "Adet", align: "right" },
        { key: "amount", label: "Tutar (TRY)", align: "right" },
      ],
      rows: topWithdraw.map((r) => ({ method: r.method, count: r.count || 0, amount: fmt(r.withdraw) })),
    },
  ]

  const charts: SectionChart[] = []
  if (dailyData.length > 0) {
    charts.push({
      type: "area",
      title: `${dailyData.length} Gunluk Nakit Akisi`,
      subtitle: "Yatirma ve Cekim egilimi",
      series: [
        { key: "deposit", label: "Yatirma", color: "#0071e3" },
        { key: "withdraw", label: "Cekim", color: "#ff453a" },
      ],
      data: dailyData.map((d) => ({ day: d.day, deposit: d.deposit, withdraw: d.withdraw })),
    })
  }

  return { kpis, tables, charts }
}

export function parseBonusData(buffers: Buffer[]): ModuleData {
  const bonusRows: { type: string; count: number; amount: number; used: number }[] = []
  const btagRows: { tag: string; deposit: number; withdraw: number }[] = []

  for (const buf of buffers) {
    const sheets = readAllSheets(buf)
    for (const [, { headers, rows }] of sheets) {
      const bonusTypeCol = findCol(headers, COL.bonusType)
      const amountCol = findCol(headers, COL.bonusAmount)
      const usedCol = findCol(headers, COL.bonusUsed)
      const countCol = findCol(headers, COL.count)

      if (bonusTypeCol && amountCol) {
        for (const row of rows) {
          const type = str(row[bonusTypeCol])
          if (!type) continue
          bonusRows.push({
            type,
            count: countCol ? num(row[countCol]) : 1,
            amount: num(row[amountCol]),
            used: usedCol ? num(row[usedCol]) : 0,
          })
        }
      }

      const btagCol = findCol(headers, COL.btag)
      const depositCol = findCol(headers, COL.deposit)
      const withdrawCol = findCol(headers, COL.withdraw)

      if (btagCol && depositCol) {
        for (const row of rows) {
          const tag = str(row[btagCol])
          if (!tag) continue
          const existing = btagRows.find((b) => b.tag === tag)
          const dep = num(row[depositCol])
          const wd = withdrawCol ? num(row[withdrawCol]) : 0
          if (existing) {
            existing.deposit += dep
            existing.withdraw += wd
          } else {
            btagRows.push({ tag, deposit: dep, withdraw: wd })
          }
        }
      }
    }
  }

  const totalGiven = bonusRows.reduce((s, r) => s + r.amount, 0)
  const totalUsed = bonusRows.reduce((s, r) => s + r.used, 0)
  const convRate = totalGiven > 0 ? (totalUsed / totalGiven) * 100 : 0

  const kpis: SectionKpi[] = [
    { label: "Toplam Verilen Bonus", value: fmt(totalGiven), unit: "TRY", color: "#ff9f0a" },
    { label: "Kullanilan Bonus", value: fmt(totalUsed), unit: "TRY", color: "#34c759" },
    { label: "Bonus Donusum", value: convRate.toFixed(1), unit: "%", color: "#0071e3" },
  ]

  const tables: SectionTable[] = []

  if (bonusRows.length > 0) {
    const grouped = new Map<string, { count: number; amount: number; used: number }>()
    for (const r of bonusRows) {
      const ex = grouped.get(r.type)
      if (ex) { ex.count += r.count; ex.amount += r.amount; ex.used += r.used }
      else grouped.set(r.type, { count: r.count, amount: r.amount, used: r.used })
    }
    tables.push({
      title: "Bonus Turu Dagilimi",
      columns: [
        { key: "type", label: "Bonus Turu" },
        { key: "count", label: "Adet", align: "right" },
        { key: "amount", label: "Tutar (TRY)", align: "right" },
        { key: "rate", label: "Donusum %", align: "right" },
      ],
      rows: Array.from(grouped.entries()).map(([type, d]) => ({
        type,
        count: d.count,
        amount: fmt(d.amount),
        rate: d.amount > 0 ? `${((d.used / d.amount) * 100).toFixed(1)}%` : "0%",
      })),
    })
  }

  if (btagRows.length > 0) {
    const sorted = [...btagRows].sort((a, b) => b.deposit - a.deposit).slice(0, 10)
    tables.push({
      title: "BTag Performans Tablosu",
      columns: [
        { key: "tag", label: "BTag" },
        { key: "deposit", label: "Deposit (TRY)", align: "right" },
        { key: "withdraw", label: "Withdraw (TRY)", align: "right" },
        { key: "wdRatio", label: "C/Y Orani", align: "right" },
        { key: "ngr", label: "NGR (TRY)", align: "right" },
      ],
      rows: sorted.map((r) => ({
        tag: r.tag,
        deposit: fmt(r.deposit),
        withdraw: fmt(r.withdraw),
        wdRatio: r.deposit > 0 ? `${((r.withdraw / r.deposit) * 100).toFixed(1)}%` : "0%",
        ngr: `${r.deposit - r.withdraw >= 0 ? "+" : ""}${fmt(r.deposit - r.withdraw)}`,
      })),
    })
  }

  return { kpis, tables, charts: [] }
}

export function parseCasinoData(buffers: Buffer[]): ModuleData {
  const providerRows: { name: string; players: number; revenue: number; ggr: number; topGame: string }[] = []
  const gameRows: { name: string; provider: string; rounds: number; ggr: number; rtp: number }[] = []

  for (const buf of buffers) {
    const sheets = readAllSheets(buf)
    for (const [, { headers, rows }] of sheets) {
      const providerCol = findCol(headers, COL.provider)
      const ggrCol = findCol(headers, COL.ggr)
      const playerCol = findCol(headers, COL.player)
      const gameCol = findCol(headers, COL.game)
      const roundsCol = findCol(headers, COL.rounds)
      const betCol = findCol(headers, COL.bet)
      const winCol = findCol(headers, COL.win)
      const rtpCol = findCol(headers, COL.rtp)
      const depositCol = findCol(headers, COL.deposit)

      if (gameCol) {
        for (const row of rows) {
          const gameName = str(row[gameCol])
          if (!gameName) continue
          const prov = providerCol ? str(row[providerCol]) : ""
          const ggr = ggrCol ? num(row[ggrCol]) : (betCol && winCol ? num(row[betCol]) - num(row[winCol]) : 0)
          const rounds = roundsCol ? num(row[roundsCol]) : 0
          const rtp = rtpCol ? num(row[rtpCol]) : 0
          gameRows.push({ name: gameName, provider: prov, rounds, ggr, rtp })
        }
      } else if (providerCol) {
        for (const row of rows) {
          const name = str(row[providerCol])
          if (!name) continue
          const revenue = depositCol ? num(row[depositCol]) : 0
          const ggr = ggrCol ? num(row[ggrCol]) : 0
          const players = playerCol ? num(row[playerCol]) : 0
          providerRows.push({ name, players, revenue, ggr, topGame: "" })
        }
      }
    }
  }

  if (providerRows.length === 0 && gameRows.length > 0) {
    const byProvider = new Map<string, { players: number; revenue: number; ggr: number; topGame: string }>()
    for (const g of gameRows) {
      const key = g.provider || "Diger"
      const ex = byProvider.get(key)
      if (ex) { ex.ggr += g.ggr; ex.revenue += g.ggr }
      else byProvider.set(key, { players: 0, revenue: g.ggr, ggr: g.ggr, topGame: g.name })
    }
    for (const [name, d] of byProvider) {
      providerRows.push({ name, ...d })
    }
  }

  const totalGGR = providerRows.reduce((s, r) => s + r.ggr, 0)
  const totalPlayers = providerRows.reduce((s, r) => s + r.players, 0)
  const activeGames = gameRows.length

  const kpis: SectionKpi[] = [
    { label: "Casino GGR", value: fmt(totalGGR), unit: "TRY", color: "#34c759" },
    { label: "Casino Oyuncu", value: fmt(totalPlayers), color: "#ff9f0a" },
    { label: "Aktif Oyun Sayisi", value: fmt(activeGames || providerRows.length), color: "#0071e3" },
  ]

  const tables: SectionTable[] = []

  if (providerRows.length > 0) {
    const sorted = [...providerRows].sort((a, b) => b.ggr - a.ggr).slice(0, 8)
    tables.push({
      title: "Saglayici Performansi",
      columns: [
        { key: "name", label: "Saglayici" },
        { key: "players", label: "Oyuncu", align: "right" },
        { key: "ggr", label: "GGR (TRY)", align: "right" },
        { key: "share", label: "Pay %", align: "right" },
      ],
      rows: sorted.map((r) => ({
        name: r.name,
        players: r.players,
        ggr: fmt(r.ggr),
        share: totalGGR > 0 ? `${((r.ggr / totalGGR) * 100).toFixed(1)}%` : "0%",
      })),
    })
  }

  if (gameRows.length > 0) {
    const sorted = [...gameRows].sort((a, b) => b.ggr - a.ggr).slice(0, 8)
    tables.push({
      title: "En Populer Oyunlar",
      columns: [
        { key: "name", label: "Oyun" },
        { key: "provider", label: "Saglayici" },
        { key: "rounds", label: "Tur", align: "right" },
        { key: "ggr", label: "GGR (TRY)", align: "right" },
      ],
      rows: sorted.map((r) => ({
        name: r.name,
        provider: r.provider,
        rounds: r.rounds,
        ggr: fmt(r.ggr),
      })),
    })
  }

  const charts: SectionChart[] = []
  if (providerRows.length > 0) {
    const sorted = [...providerRows].sort((a, b) => b.ggr - a.ggr).slice(0, 6)
    charts.push({
      type: "bar",
      title: "Pazar Payi (%)",
      series: [{ key: "pay", label: "Pay %", color: "#0071e3" }],
      data: sorted.map((r) => ({
        name: r.name.length > 12 ? r.name.substring(0, 12) + "." : r.name,
        pay: totalGGR > 0 ? parseFloat(((r.ggr / totalGGR) * 100).toFixed(1)) : 0,
      })),
    })
  }

  return { kpis, tables, charts }
}

export function parseSporData(buffers: Buffer[]): ModuleData {
  const leagueRows: { name: string; bets: number; volume: number }[] = []
  const oddsData: number[] = []
  let totalBet = 0
  let totalWin = 0
  let totalPlayers = 0

  for (const buf of buffers) {
    const sheets = readAllSheets(buf)
    for (const [, { headers, rows }] of sheets) {
      const leagueCol = findCol(headers, COL.league)
      const betCol = findCol(headers, COL.bet)
      const winCol = findCol(headers, COL.win)
      const oddsCol = findCol(headers, COL.odds)
      const countCol = findCol(headers, COL.count)
      const playerCol = findCol(headers, COL.player)

      for (const row of rows) {
        if (betCol) totalBet += num(row[betCol])
        if (winCol) totalWin += num(row[winCol])
        if (oddsCol) oddsData.push(num(row[oddsCol]))
        if (playerCol) totalPlayers++

        if (leagueCol) {
          const league = str(row[leagueCol])
          if (!league) continue
          const vol = betCol ? num(row[betCol]) : 0
          const cnt = countCol ? num(row[countCol]) : 1
          const ex = leagueRows.find((l) => l.name === league)
          if (ex) { ex.bets += cnt; ex.volume += vol }
          else leagueRows.push({ name: league, bets: cnt, volume: vol })
        }
      }
    }
  }

  const avgOdds = oddsData.length > 0 ? oddsData.reduce((s, o) => s + o, 0) / oddsData.length : 0
  const sporGGR = totalBet - totalWin
  const winRate = totalBet > 0 ? (totalWin / totalBet) * 100 : 0

  const kpis: SectionKpi[] = [
    { label: "Spor Oyuncu", value: fmt(totalPlayers), color: "#34c759" },
    { label: "Toplam Bahis", value: fmt(totalBet), unit: "TRY", color: "#0071e3" },
    { label: "Spor GGR", value: fmt(sporGGR), unit: "TRY", color: "#34c759" },
    { label: "Kazanma Orani", value: winRate.toFixed(1), unit: "%", color: "#ff9f0a" },
  ]

  if (avgOdds > 0) {
    kpis.push({ label: "Ort. Odds", value: avgOdds.toFixed(2), color: avgOdds > 10 ? "#ff453a" : "#34c759" })
  }

  const tables: SectionTable[] = []
  if (leagueRows.length > 0) {
    const sorted = [...leagueRows].sort((a, b) => b.volume - a.volume).slice(0, 8)
    const totalVol = leagueRows.reduce((s, l) => s + l.volume, 0)
    tables.push({
      title: "Populer Ligler",
      columns: [
        { key: "name", label: "Lig" },
        { key: "bets", label: "Bahis Adet", align: "right" },
        { key: "volume", label: "Hacim (TRY)", align: "right" },
        { key: "share", label: "Pay", align: "right" },
      ],
      rows: sorted.map((l) => ({
        name: l.name,
        bets: l.bets,
        volume: fmt(l.volume),
        share: totalVol > 0 ? `${((l.volume / totalVol) * 100).toFixed(1)}%` : "0%",
      })),
    })
  }

  return { kpis, tables, charts: [] }
}

export function parsePlayersData(buffers: Buffer[]): ModuleData {
  const playerRows: { id: string; btag: string; deposit: number; withdraw: number; casinoNgr: number; sportNgr: number; balance: number }[] = []

  for (const buf of buffers) {
    const sheets = readAllSheets(buf)
    for (const [, { headers, rows }] of sheets) {
      const playerCol = findCol(headers, COL.player)
      const depositCol = findCol(headers, COL.deposit)
      const withdrawCol = findCol(headers, COL.withdraw)
      const btagCol = findCol(headers, COL.btag)
      const balanceCol = findCol(headers, COL.balance)
      const ngrCol = findCol(headers, COL.ngr)
      const ggrCol = findCol(headers, COL.ggr)

      if (playerCol && depositCol) {
        for (const row of rows) {
          const id = str(row[playerCol])
          if (!id) continue
          playerRows.push({
            id,
            btag: btagCol ? str(row[btagCol]) || "(bos)" : "(bos)",
            deposit: num(row[depositCol]),
            withdraw: withdrawCol ? num(row[withdrawCol]) : 0,
            casinoNgr: ngrCol ? num(row[ngrCol]) : (ggrCol ? num(row[ggrCol]) : 0),
            sportNgr: 0,
            balance: balanceCol ? num(row[balanceCol]) : 0,
          })
        }
      }
    }
  }

  const totalPlayers = playerRows.length
  const totalDeposit = playerRows.reduce((s, r) => s + r.deposit, 0)
  const activePlayers = playerRows.filter((r) => r.deposit > 0 || r.balance > 0).length

  const segments = [
    { label: "VIP (50K+ TRY)", min: 50000, max: Infinity },
    { label: "Yuksek (10K-50K)", min: 10000, max: 50000 },
    { label: "Orta (1K-10K)", min: 1000, max: 10000 },
    { label: "Dusuk (0-1K)", min: 0, max: 1000 },
  ]

  const segmentData = segments.map((s) => {
    const players = playerRows.filter((r) => r.deposit >= s.min && r.deposit < s.max)
    const totalDep = players.reduce((sum, r) => sum + r.deposit, 0)
    return {
      segment: s.label,
      players: players.length,
      deposit: fmt(totalDep),
      avgDeposit: players.length > 0 ? fmt(totalDep / players.length) : "0",
    }
  })

  const kpis: SectionKpi[] = [
    { label: "Kayitli Oyuncu", value: fmt(totalPlayers), color: "#0071e3" },
    { label: "Aktif Oyuncu", value: fmt(activePlayers), color: "#34c759", badge: `%${totalPlayers > 0 ? ((activePlayers / totalPlayers) * 100).toFixed(1) : "0"} retansiyon` },
  ]

  const tables: SectionTable[] = [
    {
      title: "Oyuncu Segmentasyonu",
      columns: [
        { key: "segment", label: "Segment" },
        { key: "players", label: "Oyuncu", align: "right" },
        { key: "deposit", label: "Toplam Dep.", align: "right" },
        { key: "avgDeposit", label: "Ort. Dep.", align: "right" },
      ],
      rows: segmentData,
    },
  ]

  if (playerRows.length > 0) {
    const top20 = [...playerRows].sort((a, b) => b.deposit - a.deposit).slice(0, 20)
    tables.push({
      title: "Top 20 Oyuncu",
      columns: [
        { key: "rank", label: "#" },
        { key: "id", label: "Player ID" },
        { key: "btag", label: "BTag" },
        { key: "deposit", label: "Deposit", align: "right" },
        { key: "withdraw", label: "Withdraw", align: "right" },
        { key: "casinoNgr", label: "Casino NGR", align: "right" },
        { key: "balance", label: "Bakiye", align: "right" },
      ],
      rows: top20.map((r, i) => ({
        rank: i + 1,
        id: r.id,
        btag: r.btag,
        deposit: fmt(r.deposit),
        withdraw: fmt(r.withdraw),
        casinoNgr: `${r.casinoNgr >= 0 ? "+" : ""}${fmt(r.casinoNgr)}`,
        balance: fmt(r.balance),
      })),
    })
  }

  return { kpis, tables, charts: [] }
}

// ══════════════════════════════════════
//  Main entry point
// ══════════════════════════════════════

export interface ParsedUpload {
  uploadId: string
  fileName: string
  buffer: Buffer
  assignedModule: ModuleKey | null
}

export function computeModules(
  uploads: ParsedUpload[]
): Partial<Record<ModuleKey, ModuleData>> {
  const grouped: Partial<Record<ModuleKey, Buffer[]>> = {}

  for (const u of uploads) {
    const mod = u.assignedModule
    if (!mod || mod === "GENEL") continue
    if (!grouped[mod]) grouped[mod] = []
    grouped[mod]!.push(u.buffer)
  }

  const result: Partial<Record<ModuleKey, ModuleData>> = {}

  if (grouped.FINANS?.length)  result.FINANS  = parseFinansalData(grouped.FINANS)
  if (grouped.BON?.length)     result.BON     = parseBonusData(grouped.BON)
  if (grouped.CASINO?.length)  result.CASINO  = parseCasinoData(grouped.CASINO)
  if (grouped.SPOR?.length)    result.SPOR    = parseSporData(grouped.SPOR)
  if (grouped.PLAYERS?.length) result.PLAYERS = parsePlayersData(grouped.PLAYERS)

  // GENEL: derive from other modules
  const genelKpis: SectionKpi[] = []
  let heroValue = 0

  if (result.FINANS?.kpis) {
    const depKpi = result.FINANS.kpis.find((k) => k.label.includes("Yatirma"))
    const wdKpi = result.FINANS.kpis.find((k) => k.label.includes("Cekim"))
    if (depKpi && wdKpi) {
      const dep = num(depKpi.value.replace(/\./g, ""))
      const wd = num(wdKpi.value.replace(/\./g, ""))
      heroValue = dep - wd
      genelKpis.push({ label: "Net Nakit Akisi", value: `+${fmt(heroValue)}`, unit: "TRY", trend: "up", color: "#34c759" })
    }
  }
  if (result.CASINO?.kpis) {
    const ggrKpi = result.CASINO.kpis.find((k) => k.label.includes("GGR"))
    if (ggrKpi) genelKpis.push({ ...ggrKpi, label: "Casino GGR" })
  }
  if (result.SPOR?.kpis) {
    const ggrKpi = result.SPOR.kpis.find((k) => k.label.includes("GGR"))
    if (ggrKpi) genelKpis.push({ ...ggrKpi, label: "Spor GGR" })
  }
  if (result.PLAYERS?.kpis) {
    const playerKpi = result.PLAYERS.kpis.find((k) => k.label.includes("Aktif"))
    if (playerKpi) genelKpis.push(playerKpi)
  }

  result.GENEL = { kpis: genelKpis, tables: [], charts: [] }

  return result
}

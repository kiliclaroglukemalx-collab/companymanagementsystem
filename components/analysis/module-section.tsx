"use client"

import { motion } from "framer-motion"
import {
  CircleDollarSign, Gift, Gamepad2, Trophy, Users, BarChart3,
} from "lucide-react"
import type { ModuleData, AiNote, ModuleKey } from "@/lib/ai-analysis/types"
import { DynamicKpiRow } from "./dynamic-kpi-row"
import { DynamicTable } from "./dynamic-table"
import { DynamicChart } from "./dynamic-chart"
import { AnalystNote } from "./analyst-note"

const MODULE_CONFIG: Record<string, { id: string; icon: typeof CircleDollarSign; color: string; title: string; subtitle: string; author: string }> = {
  FINANS: {
    id: "finansal",
    icon: CircleDollarSign,
    color: "#0071e3",
    title: "Finansal Analiz",
    subtitle: "Yatirma, cekim ve nakit akisi detaylari",
    author: "Finans Ekibi",
  },
  BON: {
    id: "bonus",
    icon: Gift,
    color: "#ff9f0a",
    title: "Bonus / BTag Analizi",
    subtitle: "Bonus performansi, donusum oranlari ve BTag bazli kazanc analizi",
    author: "Bonus ve Pazarlama Ekibi",
  },
  CASINO: {
    id: "casino",
    icon: Gamepad2,
    color: "#ff9f0a",
    title: "Casino Analizi",
    subtitle: "Saglayici performansi, en populer oyunlar ve GGR dagilimi",
    author: "Casino Operasyon Ekibi",
  },
  SPOR: {
    id: "spor",
    icon: Trophy,
    color: "#34c759",
    title: "Spor Analizi",
    subtitle: "Bahis dagilimi, risk profili, populer ligler ve bahis turleri",
    author: "Risk Yonetim Ekibi",
  },
  PLAYERS: {
    id: "oyuncular",
    icon: Users,
    color: "#0071e3",
    title: "Oyuncular Analizi",
    subtitle: "Oyuncu segmentasyonu, retansiyon oranlari ve en aktif oyuncular",
    author: "CRM ve Oyuncu Analiz Ekibi",
  },
  GENEL: {
    id: "genel",
    icon: BarChart3,
    color: "#0071e3",
    title: "Genel Ozet",
    subtitle: "Tum modullerin ozet metrikleri",
    author: "Kidemli Analist",
  },
}

interface ModuleSectionProps {
  moduleKey: ModuleKey
  data: ModuleData
  aiNote?: AiNote | null
  aiLoading?: boolean
}

export function ModuleSection({ moduleKey, data, aiNote, aiLoading }: ModuleSectionProps) {
  const config = MODULE_CONFIG[moduleKey]
  if (!config) return null

  const Icon = config.icon

  return (
    <section id={config.id} className="scroll-mt-24 space-y-6">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-1 flex items-center gap-2">
          <Icon className="h-5 w-5" style={{ color: config.color }} />
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">
            {config.title}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">{config.subtitle}</p>
      </motion.div>

      {/* KPIs */}
      <DynamicKpiRow kpis={data.kpis} />

      {/* Charts */}
      {data.charts.map((chart, i) => (
        <DynamicChart key={`chart-${i}`} chart={chart} />
      ))}

      {/* Tables */}
      {data.tables.length > 1 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {data.tables.map((table, i) => (
            <DynamicTable key={`table-${i}`} table={table} />
          ))}
        </div>
      ) : (
        data.tables.map((table, i) => (
          <DynamicTable key={`table-${i}`} table={table} />
        ))
      )}

      {/* AI Note */}
      <AnalystNote note={aiNote} author={config.author} loading={aiLoading} />
    </section>
  )
}

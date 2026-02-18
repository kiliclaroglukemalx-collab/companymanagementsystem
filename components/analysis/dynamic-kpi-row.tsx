"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import type { SectionKpi } from "@/lib/ai-analysis/types"

interface DynamicKpiRowProps {
  kpis: SectionKpi[]
}

const trendIcons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus,
}

export function DynamicKpiRow({ kpis }: DynamicKpiRowProps) {
  if (!kpis || kpis.length === 0) return null

  const cols = kpis.length <= 2 ? "grid-cols-2" : kpis.length === 3 ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"

  return (
    <div className={`grid gap-3 ${cols}`}>
      {kpis.map((kpi, i) => {
        const TrendIcon = kpi.trend ? trendIcons[kpi.trend] : null
        const color = kpi.color || "#0071e3"

        return (
          <motion.div
            key={`${kpi.label}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="rounded-[1.75rem] bg-card p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">{kpi.label}</span>
              {TrendIcon && (
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <TrendIcon className="h-3.5 w-3.5" style={{ color }} />
                </div>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold tracking-tighter text-foreground">{kpi.value}</span>
              {kpi.unit && <span className="text-xs text-muted-foreground">{kpi.unit}</span>}
            </div>
            {kpi.badge && (
              <span
                className="mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ color, backgroundColor: `${color}15` }}
              >
                {kpi.badge}
              </span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts"
import type { SectionChart } from "@/lib/ai-analysis/types"

interface DynamicChartProps {
  chart: SectionChart
}

function ChartTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string; color: string }>
  label?: string
}) {
  if (!active || !payload) return null
  return (
    <div className="rounded-2xl bg-secondary/90 px-4 py-3 text-sm backdrop-blur-xl">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      {payload.map((e) => (
        <div key={e.dataKey} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: e.color }} />
          <span className="text-foreground">
            {e.dataKey}: {typeof e.value === "number" ? e.value.toLocaleString("tr-TR") : e.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function DynamicChart({ chart }: DynamicChartProps) {
  if (!chart.data || chart.data.length === 0) return null

  const xKey = Object.keys(chart.data[0]).find(
    (k) => !chart.series.some((s) => s.key === k)
  ) || "name"

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="rounded-[2.5rem] bg-card p-5 md:p-7"
    >
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">{chart.title}</h3>
          {chart.subtitle && <p className="text-xs text-muted-foreground">{chart.subtitle}</p>}
        </div>
        <div className="flex items-center gap-4 text-xs">
          {chart.series.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[280px] md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          {chart.type === "area" ? (
            <AreaChart data={chart.data as Record<string, unknown>[]} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                {chart.series.map((s) => (
                  <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: "#86868b", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#86868b", fontSize: 12 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<ChartTooltip />} />
              {chart.series.map((s) => (
                <Area key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2} fill={`url(#grad-${s.key})`} />
              ))}
            </AreaChart>
          ) : (
            <BarChart data={chart.data as Record<string, unknown>[]} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#86868b", fontSize: 11 }} />
              <YAxis dataKey={xKey} type="category" axisLine={false} tickLine={false} tick={{ fill: "#86868b", fontSize: 11 }} width={80} />
              <Tooltip content={<ChartTooltip />} />
              {chart.series.map((s) => (
                <Bar key={s.key} dataKey={s.key} radius={[0, 8, 8, 0]} barSize={16}>
                  {(chart.data as Record<string, unknown>[]).map((_, index) => (
                    <Cell key={index} fill={s.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

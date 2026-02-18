"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"
import type { ModuleData } from "@/lib/ai-analysis/types"

interface HeroSectionProps {
  data?: ModuleData | null
  periodLabel?: string
}

export function HeroSection({ data, periodLabel }: HeroSectionProps) {
  const netKpi = data?.kpis?.find((k) => k.label.includes("Net"))
  const value = netKpi?.value || "0"
  const trend = netKpi?.trend || "up"

  return (
    <section className="relative flex flex-col items-center py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center"
      >
        {periodLabel && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {periodLabel}
            {trend === "up" ? (
              <TrendingUp className="h-3.5 w-3.5 text-[#34c759]" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-[#ff453a]" />
            )}
          </div>
        )}
        <h2 className="mb-3 text-lg font-medium tracking-tight text-muted-foreground">
          Net Nakit Akisi
        </h2>
        <p
          className="text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl"
          style={{
            background: trend === "up"
              ? "linear-gradient(135deg, #0071e3 0%, #34c759 50%, #00d4aa 100%)"
              : "linear-gradient(135deg, #ff453a 0%, #ff9f0a 50%, #ff6b35 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {value}
        </p>
        <p className="mt-2 text-xl font-medium tracking-tight text-muted-foreground md:text-2xl">
          TRY
        </p>
      </motion.div>
    </section>
  )
}

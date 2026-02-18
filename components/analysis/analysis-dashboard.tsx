"use client"

import { motion } from "framer-motion"
import type { FullReport, ModuleKey } from "@/lib/ai-analysis/types"
import { MODULE_KEYS } from "@/lib/ai-analysis/types"
import { HeroSection } from "./hero-section"
import { SectionNav } from "./section-nav"
import { ModuleSection } from "./module-section"

interface AnalysisDashboardProps {
  report: FullReport
  aiLoading?: boolean
  onBack?: () => void
  onDeepAnalysis?: () => void
  deepLoading?: boolean
}

export function AnalysisDashboard({
  report,
  aiLoading,
  onBack,
  onDeepAnalysis,
  deepLoading,
}: AnalysisDashboardProps) {
  const displayOrder: ModuleKey[] = ["FINANS", "BON", "CASINO", "SPOR", "PLAYERS"]
  const activeModules = displayOrder.filter((k) => report.modules[k])

  const periodDays = (() => {
    try {
      const start = new Date(report.period.start)
      const end = new Date(report.period.end)
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
      return `${diff} Gunluk Donem Analizi`
    } catch {
      return "Donem Analizi"
    }
  })()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
              <span className="text-xs font-bold text-primary-foreground">SYS</span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              {report.site} - Analiz Raporu
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onDeepAnalysis && (
              <button
                onClick={onDeepAnalysis}
                disabled={deepLoading}
                className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-xs font-medium text-white transition-all hover:brightness-110 disabled:opacity-50"
              >
                {deepLoading ? "Analiz ediliyor..." : "Derin Analiz"}
              </button>
            )}
            {onBack && (
              <button
                onClick={onBack}
                className="rounded-full bg-secondary px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Yeni Rapor
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Section Nav */}
      <SectionNav activeModules={activeModules} />

      {/* Dashboard Content */}
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-8 xl:pl-52">
        {/* Hero */}
        <HeroSection data={report.modules.GENEL} periodLabel={periodDays} />

        {/* Module Sections */}
        <div className="space-y-16">
          {activeModules.map((moduleKey, i) => {
            const data = report.modules[moduleKey]
            if (!data) return null

            return (
              <div key={moduleKey}>
                {i > 0 && <div className="mx-auto mb-16 h-px w-2/3 bg-border/20" />}
                <ModuleSection
                  moduleKey={moduleKey}
                  data={data}
                  aiNote={report.aiNotes?.[moduleKey]}
                  aiLoading={aiLoading}
                />
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 border-t border-border/20 pt-8 text-center text-xs text-muted-foreground"
        >
          {report.site} — Yonetici Analitik Raporu — {new Date(report.generatedAt).toLocaleDateString("tr-TR")}
        </motion.footer>
      </div>
    </motion.div>
  )
}

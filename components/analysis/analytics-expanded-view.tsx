"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import type { DashboardCard } from "@/lib/dashboard-data"
import type { ModuleData, ModuleKey, AiNote } from "@/lib/ai-analysis/types"
import { ModuleSection } from "./module-section"
import { useSite } from "@/lib/site-context"

const CARD_MODULE_MAP: Record<string, ModuleKey> = {
  "aylik-simulasyon": "GENEL",
  "finansal-analiz": "FINANS",
  "bonus-btag": "BON",
  "spor-analizi": "SPOR",
  "casino-analizi": "CASINO",
  "oyuncular-analizi": "PLAYERS",
}

interface AnalyticsExpandedViewProps {
  card: DashboardCard
  onClose: () => void
}

export function AnalyticsExpandedView({ card, onClose }: AnalyticsExpandedViewProps) {
  const { selectedSite } = useSite()
  const [moduleData, setModuleData] = useState<ModuleData | null>(null)
  const [aiNote, setAiNote] = useState<AiNote | null>(null)
  const [loading, setLoading] = useState(true)

  const moduleKey = CARD_MODULE_MAP[card.id]

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true)
      try {
        const res = await fetch(`/api/analytics/latest?siteId=${selectedSite.id}`)
        if (!res.ok) { setLoading(false); return }

        const data = await res.json()
        if (data.details && moduleKey && data.details[moduleKey]) {
          setModuleData(data.details[moduleKey])
        }
        if (data.cardResults && moduleKey && data.cardResults[moduleKey]?.note) {
          setAiNote({
            short: data.cardResults[moduleKey].note,
            detailed: { summary: "", findings: [], risks: [], actions: [], checks: [] },
          })
        }
      } catch (e) {
        console.error("Failed to fetch details:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [selectedSite.id, moduleKey])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "#0a0a0a" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      <div className="h-full flex flex-col overflow-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 lg:px-12">
          {selectedSite && (
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{
                background: `linear-gradient(135deg, ${card.glowColor}20, ${card.glowColor}05)`,
                border: `1px solid ${card.glowColor}30`,
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.glowColor }} />
              <span className="text-sm font-medium" style={{ color: card.glowColor }}>
                {selectedSite.name}
              </span>
            </motion.div>
          )}

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-2xl font-bold text-white tracking-wide">{card.title}</h1>
            <span className="text-3xl font-bold text-neutral-700 font-mono">{card.rank}</span>
          </motion.div>
          <p className="text-neutral-500 mt-1">{card.subtitle}</p>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 pb-12 lg:px-12">
          {loading ? (
            <motion.div
              className="flex flex-col items-center justify-center py-24 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-8 h-8 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />
              <p className="text-neutral-500 text-sm">Veriler yukleniyor...</p>
            </motion.div>
          ) : moduleData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ModuleSection
                moduleKey={moduleKey || "GENEL"}
                data={moduleData}
                aiNote={aiNote}
              />
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-24 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-neutral-400 text-lg font-medium">Henuz detayli analiz verisi yok</p>
              <p className="text-neutral-600 text-sm max-w-md text-center">
                Veri Yukleme Merkezi'nden Excel dosyalarinizi yukleyip &quot;Analiz Olustur&quot; butonuna tiklayin.
                Sonuclar burada gosterilecek.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import { useState, useCallback, Suspense, lazy } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence, LayoutGroup, cubicBezier } from "framer-motion"
import { MicroHeader } from "@/components/dashboard/micro-header"
import { useTheme } from "@/lib/theme-context"
import { HybridBrandSelector } from "@/components/dashboard/hybrid-brand-selector"
import { SimpleCarousel } from "@/components/dashboard/simple-carousel"
import { 
  ArenaSkeleton, 
  ShiftCalendarSkeleton, 
  PersonnelSkeleton,
  MonolithSkeleton 
} from "@/components/ui/skeleton-loaders"
import { dashboardCards, brands, type DashboardCard, type Brand } from "@/lib/dashboard-data"


// Dynamic imports for heavy components - Apple style lazy loading
const NeonExpandedView = dynamic(
  () => import("@/components/dashboard/neon-expanded-view").then(mod => ({ default: mod.NeonExpandedView })),
  { ssr: false }
)

const LivingDataFooter = dynamic(
  () => import("@/components/dashboard/living-data-footer").then(mod => ({ default: mod.LivingDataFooter })),
  { ssr: false }
)

const DataWallModal = dynamic(
  () => import("@/components/dashboard/data-wall-modal").then(mod => ({ default: mod.DataWallModal })),
  { ssr: false }
)

const ArenaLeagueSystem = dynamic(
  () => import("@/components/dashboard/arena-league-system").then(mod => ({ default: mod.ArenaLeagueSystem })),
  { 
    ssr: false,
    loading: () => <ArenaSkeleton />
  }
)

const ShiftCalendar = dynamic(
  () => import("@/components/dashboard/shift-calendar").then(mod => ({ default: mod.ShiftCalendar })),
  { 
    ssr: false,
    loading: () => <ShiftCalendarSkeleton />
  }
)

const PersonnelCenter = dynamic(
  () => import("@/components/dashboard/personnel-center").then(mod => ({ default: mod.PersonnelCenter })),
  { 
    ssr: false,
    loading: () => <PersonnelSkeleton />
  }
)

const GlobalPerformanceMonolith = dynamic(
  () => import("@/components/dashboard/global-performance-monolith").then(mod => ({ default: mod.GlobalPerformanceMonolith })),
  { 
    ssr: false,
    loading: () => <MonolithSkeleton />
  }
)

const SettingsPanel = dynamic(
  () => import("@/components/dashboard/settings-panel").then(mod => ({ default: mod.SettingsPanel })),
  { ssr: false }
)

const AnnouncementPopup = dynamic(
  () => import("@/components/dashboard/announcement-popup").then(mod => ({ default: mod.AnnouncementPopup })),
  { ssr: false }
)

// Optimized page transitions - GPU accelerated
const pageTransition = {
  initial: { opacity: 0, y: 20, willChange: "opacity, transform" },
  animate: { opacity: 1, y: 0, willChange: "auto" },
  exit: { opacity: 0, y: -20, willChange: "opacity, transform" },
  transition: { duration: 0.4, ease: cubicBezier(0.25, 0.1, 0.25, 1) }
}

export default function DashboardPage() {
  const { currentTheme, settings } = useTheme()
  const [activeTab, setActiveTab] = useState("analytics")
  const [selectedBrand, setSelectedBrand] = useState<Brand>(brands[0])
  const [selectedCard, setSelectedCard] = useState<DashboardCard | null>(null)
  const [isDataWallOpen, setIsDataWallOpen] = useState(false)
  const [lockedBrand, setLockedBrand] = useState<Brand | null>(null)

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  const handleBrandChange = useCallback((brand: Brand) => {
    setSelectedBrand(brand)
  }, [])

  const handleCardClick = useCallback((card: DashboardCard) => {
    setSelectedCard(card)
  }, [])

  const handleCloseExpanded = useCallback(() => {
    setSelectedCard(null)
  }, [])

  const handleOpenDataWall = useCallback(() => {
    setLockedBrand(selectedBrand)
    setIsDataWallOpen(true)
  }, [selectedBrand])

  const handleCloseDataWall = useCallback(() => {
    setIsDataWallOpen(false)
    setLockedBrand(null)
  }, [])

  return (
    <LayoutGroup>
      <div 
        className="min-h-screen overflow-hidden transition-all duration-500"
        style={{ 
          background: currentTheme ? currentTheme.gradient : '#000000'
        }}
      >
        {/* Micro Header - Always visible, loaded immediately */}
        <MicroHeader activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Tab Content with optimized transitions */}
        <AnimatePresence mode="wait">
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              {...pageTransition}
            >
              {/* Brand Selector - Critical, loaded immediately */}
              <section className="relative py-8 px-6" style={{ background: "#000000" }}>
                <HybridBrandSelector
                  selectedBrand={selectedBrand}
                  onBrandChange={handleBrandChange}
                />
              </section>

              {/* Analytics Module Vitrine */}
              <section 
                className="relative"
                style={{ 
                  background: "#FFFFFF",
                  minHeight: "420px",
                }}
              >
                <div className="pt-10 pb-2 px-8">
                  <motion.h2
                    className="text-xs font-semibold text-neutral-500 tracking-[0.25em] uppercase"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Analitik Modulleri
                  </motion.h2>
                </div>

                <SimpleCarousel
                  cards={dashboardCards}
                  onCardClick={handleCardClick}
                />

                <motion.div
                  className="flex justify-center pb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 text-[10px] text-neutral-400 tracking-[0.2em] uppercase font-medium">
                    <motion.div
                      className="w-6 h-0.5 rounded-full bg-neutral-300"
                      animate={{ x: [0, -4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span>Kaydirin</span>
                    <motion.div
                      className="w-6 h-0.5 rounded-full bg-neutral-300"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </section>

              {/* Below-fold content - lazy loaded */}
              <LivingDataFooter
                selectedBrand={selectedBrand} 
                onOpenDataWall={handleOpenDataWall}
              />

              <GlobalPerformanceMonolith />
            </motion.div>
          )}

          {activeTab === "arena" && (
            <motion.div key="arena" {...pageTransition}>
              <ArenaLeagueSystem />
            </motion.div>
          )}

          {activeTab === "schedule" && (
            <motion.div key="schedule" {...pageTransition}>
              <ShiftCalendar isManager={true} />
            </motion.div>
          )}

          {activeTab === "personnel" && (
            <motion.div key="personnel" {...pageTransition}>
              <PersonnelCenter isManager={true} />
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div key="education" {...pageTransition}>
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))',
                      border: '1px solid rgba(168, 85, 247, 0.3)'
                    }}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <svg className="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </motion.div>
                  <h2 className="text-2xl font-light text-white mb-2">Egitim Merkezi</h2>
                  <p className="text-neutral-500 mb-6">Cok Yakinda...</p>
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                    style={{ 
                      background: 'rgba(168, 85, 247, 0.1)',
                      border: '1px solid rgba(168, 85, 247, 0.2)',
                      color: '#a855f7'
                    }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    Gelistirme Asamasinda
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div key="settings" {...pageTransition}>
              <SettingsPanel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals - only loaded when needed */}
        <AnimatePresence>
          {selectedCard && (
            <NeonExpandedView card={selectedCard} onClose={handleCloseExpanded} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDataWallOpen && lockedBrand && (
            <DataWallModal
              isOpen={isDataWallOpen}
              onClose={handleCloseDataWall}
              selectedBrand={lockedBrand}
            />
          )}
        </AnimatePresence>

        {/* Announcement Popup - shows on page load if there are active announcements */}
        <AnnouncementPopup />
      </div>
    </LayoutGroup>
  )
}

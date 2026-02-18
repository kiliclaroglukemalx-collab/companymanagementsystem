"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DollarSign, Gift, Gamepad2, Trophy, Users } from "lucide-react"
import type { ModuleKey } from "@/lib/ai-analysis/types"

interface NavItem {
  id: string
  moduleKey: ModuleKey
  label: string
  icon: typeof DollarSign
}

const sections: NavItem[] = [
  { id: "finansal", moduleKey: "FINANS", label: "Finansal Analiz", icon: DollarSign },
  { id: "bonus", moduleKey: "BON", label: "Bonus / BTag", icon: Gift },
  { id: "casino", moduleKey: "CASINO", label: "Casino Analizi", icon: Gamepad2 },
  { id: "spor", moduleKey: "SPOR", label: "Spor Analizi", icon: Trophy },
  { id: "oyuncular", moduleKey: "PLAYERS", label: "Oyuncular", icon: Users },
]

interface SectionNavProps {
  activeModules?: ModuleKey[]
}

export function SectionNav({ activeModules }: SectionNavProps) {
  const [active, setActive] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const filteredSections = activeModules
    ? sections.filter((s) => activeModules.includes(s.moduleKey))
    : sections

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
      const offsets = filteredSections.map((s) => {
        const el = document.getElementById(s.id)
        if (!el) return { id: s.id, top: Infinity }
        return { id: s.id, top: el.getBoundingClientRect().top }
      })
      const closest = offsets.reduce((prev, curr) =>
        Math.abs(curr.top - 100) < Math.abs(prev.top - 100) ? curr : prev
      )
      setActive(closest.id)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [filteredSections])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1 xl:flex"
        >
          <div className="rounded-[1.5rem] bg-card/80 p-2 backdrop-blur-xl">
            {filteredSections.map((s) => {
              const isActive = active === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors"
                  style={{ backgroundColor: isActive ? "rgba(0,113,227,0.12)" : "transparent" }}
                >
                  <s.icon
                    className="h-4 w-4 shrink-0 transition-colors"
                    style={{ color: isActive ? "#0071e3" : "#86868b" }}
                  />
                  <span
                    className="whitespace-nowrap text-xs font-medium transition-colors"
                    style={{ color: isActive ? "#f5f5f7" : "#86868b" }}
                  >
                    {s.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

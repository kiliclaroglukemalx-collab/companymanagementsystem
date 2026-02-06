"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, ArrowRight, Minus, Equal, Wallet, Users, Building2, Receipt, Crown } from "lucide-react"

interface FlowStep {
  id: string
  label: string
  turkishLabel: string
  description: string
  value: number
  prefix?: string
  suffix?: string
  type: "income" | "expense" | "fee" | "result"
  icon: React.ElementType
}

const flowSteps: FlowStep[] = [
  {
    id: "deposit",
    label: "GELEN PARA",
    turkishLabel: "Yatirimlar",
    description: "Musterilerden gelen toplam para",
    value: 12847650,
    prefix: "₺",
    type: "income",
    icon: Wallet,
  },
  {
    id: "withdrawal",
    label: "GIDEN PARA",
    turkishLabel: "Cekimler",
    description: "Musterilere odenen miktar",
    value: 8234120,
    prefix: "₺",
    type: "expense",
    icon: Users,
  },
  {
    id: "commission",
    label: "BANKA KESINTISI",
    turkishLabel: "Komisyon",
    description: "Odeme sistemleri payi",
    value: 129340,
    prefix: "₺",
    type: "fee",
    icon: Building2,
  },
  {
    id: "expenses",
    label: "ISLETME GIDERI",
    turkishLabel: "Faturalar",
    description: "Maas, kira, yazilim vs.",
    value: 1250000,
    prefix: "₺",
    type: "expense",
    icon: Receipt,
  },
  {
    id: "netProfit",
    label: "NET KAZANC",
    turkishLabel: "Kalan Para",
    description: "Cebimize kalan net tutar",
    value: 3234190,
    prefix: "₺",
    type: "result",
    icon: Crown,
  },
]

// Animated counter
function AnimatedValue({ 
  value, 
  prefix = "",
  isLarge = false,
  color = "white",
}: { 
  value: number
  prefix?: string
  isLarge?: boolean
  color?: string
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M"
    if (num >= 1000) return (num / 1000).toFixed(0) + "K"
    return num.toLocaleString("tr-TR")
  }

  return (
    <span 
      className={`font-bold tabular-nums ${isLarge ? "text-[28px]" : "text-[22px]"}`}
      style={{ color }}
    >
      {prefix}{formatNumber(displayValue)}
    </span>
  )
}

// Flow connector arrow - compact version
function FlowArrow({ type, isAnimating }: { type: "minus" | "equals", isAnimating: boolean }) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center px-1 shrink-0"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isAnimating ? 1 : 0.3, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <motion.div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: type === "minus" 
            ? "rgba(239, 68, 68, 0.15)" 
            : "rgba(16, 185, 129, 0.15)",
          border: `1px solid ${type === "minus" ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}`,
        }}
        animate={isAnimating ? { 
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        {type === "minus" ? (
          <Minus size={16} className="text-red-400" strokeWidth={2.5} />
        ) : (
          <Equal size={16} className="text-emerald-400" strokeWidth={2.5} />
        )}
      </motion.div>
    </motion.div>
  )
}

// Individual metric card
function MetricCard({ 
  step, 
  index, 
  isHovered,
  onHover,
  isVisible,
}: { 
  step: FlowStep
  index: number
  isHovered: boolean
  onHover: (id: string | null) => void
  isVisible: boolean
}) {
  const getTypeStyles = () => {
    switch (step.type) {
      case "income":
        return {
          gradient: "from-emerald-500/20 to-emerald-500/5",
          border: "border-emerald-500/30",
          glow: "rgba(16, 185, 129, 0.4)",
          iconBg: "rgba(16, 185, 129, 0.2)",
          valueColor: "#34d399",
          labelColor: "#6ee7b7",
        }
      case "expense":
        return {
          gradient: "from-red-500/20 to-red-500/5",
          border: "border-red-500/30",
          glow: "rgba(239, 68, 68, 0.4)",
          iconBg: "rgba(239, 68, 68, 0.2)",
          valueColor: "#f87171",
          labelColor: "#fca5a5",
        }
      case "fee":
        return {
          gradient: "from-amber-500/20 to-amber-500/5",
          border: "border-amber-500/30",
          glow: "rgba(245, 158, 11, 0.4)",
          iconBg: "rgba(245, 158, 11, 0.2)",
          valueColor: "#fbbf24",
          labelColor: "#fcd34d",
        }
      case "result":
        return {
          gradient: "from-yellow-400/30 via-amber-300/20 to-yellow-500/10",
          border: "border-yellow-400/50",
          glow: "rgba(250, 204, 21, 0.6)",
          iconBg: "rgba(250, 204, 21, 0.25)",
          valueColor: "#fde047",
          labelColor: "#fef08a",
        }
      default:
        return {
          gradient: "from-white/10 to-white/5",
          border: "border-white/20",
          glow: "rgba(255, 255, 255, 0.3)",
          iconBg: "rgba(255, 255, 255, 0.1)",
          valueColor: "#ffffff",
          labelColor: "#e5e5e5",
        }
    }
  }

  const styles = getTypeStyles()
  const isResult = step.type === "result"

  return (
    <motion.div
      className={`relative flex-1 min-w-0 ${isResult ? "flex-[1.15]" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 50,
      }}
      transition={{ 
        delay: 0.3 + index * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      onMouseEnter={() => onHover(step.id)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        className={`relative h-full rounded-2xl overflow-hidden cursor-default
          bg-gradient-to-b ${styles.gradient} ${styles.border} border
          backdrop-blur-xl transition-all duration-300`}
        style={{
          boxShadow: isHovered 
            ? `0 0 40px ${styles.glow}, 0 20px 40px rgba(0,0,0,0.3)` 
            : "0 10px 30px rgba(0,0,0,0.2)",
        }}
        animate={{ 
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Shimmer effect for result card */}
        {isResult && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(45deg, transparent 30%, rgba(250,204,21,0.1) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        <div className="relative z-10 p-4 h-full flex flex-col min-h-[140px]">
          {/* Icon */}
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: styles.iconBg }}
            animate={isHovered ? { 
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <step.icon size={20} style={{ color: styles.valueColor }} strokeWidth={1.5} />
          </motion.div>

          {/* Label */}
          <div className="mb-0.5">
            <span 
              className="text-[9px] font-bold tracking-[0.15em]"
              style={{ color: styles.labelColor }}
            >
              {step.label}
            </span>
          </div>

          {/* Turkish Label */}
          <div className="mb-2">
            <span className="text-[11px] font-medium text-white/50">
              {step.turkishLabel}
            </span>
          </div>

          {/* Value */}
          <div className="flex-1 flex items-end">
            <AnimatedValue 
              value={step.value} 
              prefix={step.prefix}
              isLarge={isResult}
              color={styles.valueColor}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function GlobalPerformanceMonolith() {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section 
      className="relative w-full py-16 overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <motion.div
        className="px-10 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-500">
            Aylik Finansal Ozet
          </span>
        </div>
        <h2 className="text-[28px] font-light text-white tracking-tight">
          Para Nasil Akiyor?
        </h2>
        <p className="text-[14px] text-neutral-500 mt-1">
          Bu ay basından bugune kadar paranin yolculugu
        </p>
      </motion.div>

      {/* Flow Diagram */}
      <div className="px-6">
        <div className="flex items-stretch gap-1">
          {/* Income Card */}
          <MetricCard 
            step={flowSteps[0]} 
            index={0}
            isHovered={hoveredMetric === flowSteps[0].id}
            onHover={setHoveredMetric}
            isVisible={isVisible}
          />

          {/* Minus Arrow */}
          <FlowArrow type="minus" isAnimating={isVisible} />

          {/* Expense Card */}
          <MetricCard 
            step={flowSteps[1]} 
            index={1}
            isHovered={hoveredMetric === flowSteps[1].id}
            onHover={setHoveredMetric}
            isVisible={isVisible}
          />

          {/* Minus Arrow */}
          <FlowArrow type="minus" isAnimating={isVisible} />

          {/* Fee Card */}
          <MetricCard 
            step={flowSteps[2]} 
            index={2}
            isHovered={hoveredMetric === flowSteps[2].id}
            onHover={setHoveredMetric}
            isVisible={isVisible}
          />

          {/* Minus Arrow */}
          <FlowArrow type="minus" isAnimating={isVisible} />

          {/* Expenses Card */}
          <MetricCard 
            step={flowSteps[3]} 
            index={3}
            isHovered={hoveredMetric === flowSteps[3].id}
            onHover={setHoveredMetric}
            isVisible={isVisible}
          />

          {/* Equals Arrow */}
          <FlowArrow type="equals" isAnimating={isVisible} />

          {/* Net Profit Card */}
          <MetricCard 
            step={flowSteps[4]} 
            index={4}
            isHovered={hoveredMetric === flowSteps[4].id}
            onHover={setHoveredMetric}
            isVisible={isVisible}
          />
        </div>
      </div>

      {/* Formula Text */}
      <motion.div
        className="px-10 mt-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div 
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="text-emerald-400 font-semibold text-[13px]">Gelen</span>
          <Minus size={14} className="text-neutral-600" />
          <span className="text-red-400 font-semibold text-[13px]">Giden</span>
          <Minus size={14} className="text-neutral-600" />
          <span className="text-amber-400 font-semibold text-[13px]">Kesinti</span>
          <Minus size={14} className="text-neutral-600" />
          <span className="text-red-400 font-semibold text-[13px]">Gider</span>
          <Equal size={14} className="text-neutral-600" />
          <span className="text-yellow-400 font-bold text-[13px]">Net Kar</span>
        </div>
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(250,204,21,0.3), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isVisible ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
      />
    </section>
  )
}

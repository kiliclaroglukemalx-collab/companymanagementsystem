"use client"

import React from "react"

import { motion } from "framer-motion"
import {
  DollarSign,
  Tag,
  Gamepad2,
  Shield,
  CreditCard,
  Gift,
  Settings,
  Activity,
  Brain,
} from "lucide-react"
import type { DashboardCard } from "@/lib/dashboard-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dollar: DollarSign,
  tag: Tag,
  gamepad: Gamepad2,
  shield: Shield,
  "credit-card": CreditCard,
  gift: Gift,
  settings: Settings,
  activity: Activity,
  brain: Brain,
}

interface PremiumCardProps {
  card: DashboardCard
  onClick: () => void
}

export function PremiumCard({ card, onClick }: PremiumCardProps) {
  const Icon = iconMap[card.icon] || DollarSign

  return (
    <motion.div
      layoutId={`card-${card.id}`}
      onClick={onClick}
      className="relative cursor-pointer w-[280px] h-[200px] flex-shrink-0 rounded-3xl overflow-hidden group"
      style={{
        background: "linear-gradient(165deg, #0c0c0c 0%, #050505 50%, #000000 100%)",
        boxShadow: `
          0 1px 0 0 rgba(255,255,255,0.04) inset,
          0 -1px 0 0 rgba(0,0,0,0.8) inset,
          0 4px 8px -2px rgba(0,0,0,0.5),
          0 8px 16px -4px rgba(0,0,0,0.5),
          0 16px 32px -8px rgba(0,0,0,0.6),
          0 32px 64px -16px rgba(0,0,0,0.7)
        `,
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
        boxShadow: `
          0 1px 0 0 rgba(255,255,255,0.06) inset,
          0 -1px 0 0 rgba(0,0,0,0.8) inset,
          0 8px 16px -4px rgba(0,0,0,0.5),
          0 16px 32px -8px rgba(0,0,0,0.6),
          0 32px 64px -16px rgba(0,0,0,0.7),
          0 48px 96px -24px rgba(0,0,0,0.8),
          0 0 60px ${card.glowColor}15
        `,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      {/* Glass Reflection Layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, transparent 100%)",
        }}
      />

      {/* Subtle Top Edge Highlight */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-auto">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(145deg, ${card.glowColor}18, ${card.glowColor}05)`,
              boxShadow: `0 4px 12px ${card.glowColor}10, inset 0 1px 0 0 rgba(255,255,255,0.05)`,
            }}
            layoutId={`icon-${card.id}`}
          >
            <Icon className="w-5 h-5" style={{ color: card.glowColor }} />
          </motion.div>

          <motion.div
            className="text-3xl font-bold font-mono"
            style={{ 
              color: "rgba(255,255,255,0.08)",
              textShadow: `0 0 30px ${card.glowColor}20`,
            }}
            layoutId={`rank-${card.id}`}
          >
            {card.rank}
          </motion.div>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-auto">
          <motion.h3
            className="text-sm font-bold text-white tracking-wide mb-1"
            layoutId={`title-${card.id}`}
          >
            {card.title}
          </motion.h3>

          <motion.p
            className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2 mb-3"
            layoutId={`subtitle-${card.id}`}
          >
            {card.subtitle}
          </motion.p>

          {/* Action Indicator */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: card.glowColor }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-[10px] text-neutral-600 font-medium tracking-wider uppercase">
              Detayli Analiz
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Glow Line on Hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${card.glowColor} 50%, transparent 95%)`,
          boxShadow: `0 0 20px ${card.glowColor}50, 0 0 40px ${card.glowColor}30`,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

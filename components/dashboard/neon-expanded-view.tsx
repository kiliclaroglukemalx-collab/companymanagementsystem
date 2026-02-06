"use client"

import React from "react"

import { motion } from "framer-motion"
import { X, TrendingUp, TrendingDown } from "lucide-react"
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
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
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

interface NeonExpandedViewProps {
  card: DashboardCard
  onClose: () => void
}

export function NeonExpandedView({ card, onClose }: NeonExpandedViewProps) {
  const Icon = iconMap[card.icon] || DollarSign

  // Calculate trend
  const lastTwo = card.data.chartData.slice(-2)
  const trend = lastTwo.length === 2 ? lastTwo[1].value - lastTwo[0].value : 0
  const trendPercent = lastTwo.length === 2 ? ((trend / lastTwo[0].value) * 100).toFixed(1) : "0"

  return (
    <motion.div
      layoutId={`card-${card.id}`}
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close Button */}
      <motion.button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      <div className="h-full flex flex-col p-8 lg:p-12 overflow-auto">
        {/* Header Section */}
        <motion.div
          className="flex items-start gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            layoutId={`icon-${card.id}`}
            className="w-16 h-16 rounded-2xl flex items-center justify-center border border-neutral-700/50"
            style={{
              background: `linear-gradient(145deg, ${card.glowColor}20, ${card.glowColor}05)`,
              boxShadow: `0 0 40px ${card.glowColor}30`,
            }}
          >
            <Icon className="w-8 h-8" style={{ color: card.glowColor }} />
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <motion.h1
                layoutId={`title-${card.id}`}
                className="text-2xl font-bold text-white tracking-wide"
              >
                {card.title}
              </motion.h1>
              <motion.span
                layoutId={`rank-${card.id}`}
                className="text-3xl font-bold text-neutral-700 font-mono"
              >
                {card.rank}
              </motion.span>
            </div>
            <motion.p
              layoutId={`subtitle-${card.id}`}
              className="text-neutral-500 max-w-xl"
            >
              {card.subtitle}
            </motion.p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
          {/* Main Value Card */}
          <motion.div
            className="lg:col-span-1 flex flex-col items-center justify-center p-8 rounded-3xl border border-neutral-800/50"
            style={{
              background: `radial-gradient(ellipse at center, ${card.glowColor}08, transparent 70%)`,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight"
              style={{
                textShadow: `0 0 60px ${card.glowColor}60, 0 0 120px ${card.glowColor}30`,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              {card.data.mainValue}
            </motion.div>
            <span className="text-neutral-500 text-lg">{card.data.mainLabel}</span>

            {/* Trend Indicator */}
            <motion.div
              className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full"
              style={{
                backgroundColor: trend >= 0 ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {trend >= 0 ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={trend >= 0 ? "text-emerald-500" : "text-red-500"}>
                {trend >= 0 ? "+" : ""}{trendPercent}%
              </span>
            </motion.div>
          </motion.div>

          {/* Chart Section */}
          <motion.div
            className="lg:col-span-2 p-6 rounded-3xl border border-neutral-800/50 bg-neutral-950/50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-neutral-400 mb-6 tracking-wide">
              PERFORMANS GRAFİĞİ
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={card.data.chartData}>
                  <defs>
                    <linearGradient id={`gradient-${card.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={card.glowColor} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={card.glowColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#525252", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#525252", fontSize: 12 }}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10, 10, 10, 0.95)",
                      border: `1px solid ${card.glowColor}40`,
                      borderRadius: "12px",
                      boxShadow: `0 0 20px ${card.glowColor}20`,
                    }}
                    labelStyle={{ color: "#fff", fontWeight: 600 }}
                    itemStyle={{ color: card.glowColor }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={card.glowColor}
                    strokeWidth={3}
                    fill={`url(#gradient-${card.id})`}
                    style={{
                      filter: `drop-shadow(0 0 8px ${card.glowColor})`,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {card.data.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-5 rounded-2xl border border-neutral-800/50 bg-neutral-950/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{
                borderColor: `${card.glowColor}40`,
                boxShadow: `0 0 20px ${card.glowColor}10`,
              }}
            >
              <div className="text-xs text-neutral-500 mb-2 tracking-wide uppercase">
                {stat.label}
              </div>
              <div
                className="text-2xl font-bold text-white"
                style={{
                  textShadow: `0 0 20px ${card.glowColor}30`,
                }}
              >
                {stat.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

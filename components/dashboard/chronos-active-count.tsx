"use client"

import React from "react"
import { motion } from "framer-motion"
import { Users, Clock } from "lucide-react"
import { useChronos } from "@/lib/chronos-context"

const COLORS = {
  electricBlue: "#3B82F6",
  champagneGold: "#D4AF37",
  goldLight: "#F5E6C8",
}

interface ChronosActiveCountBadgeProps {
  className?: string
}

export function ChronosActiveCountBadge({ className = "" }: ChronosActiveCountBadgeProps) {
  const { selectedHour, realHour, activePersonnelCount } = useChronos()
  
  const isTimeChanged = selectedHour !== realHour

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${className}`}
      style={{
        background: isTimeChanged 
          ? `${COLORS.electricBlue}20`
          : "rgba(255, 255, 255, 0.05)",
        border: isTimeChanged
          ? `1px solid ${COLORS.electricBlue}40`
          : "1px solid rgba(255, 255, 255, 0.1)",
      }}
      animate={{
        boxShadow: isTimeChanged 
          ? `0 0 20px ${COLORS.electricBlue}30`
          : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      {isTimeChanged && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Clock 
            className="w-3.5 h-3.5" 
            style={{ color: COLORS.electricBlue }} 
          />
        </motion.div>
      )}
      <Users 
        className="w-3.5 h-3.5" 
        style={{ color: isTimeChanged ? COLORS.electricBlue : COLORS.goldLight }} 
      />
      <motion.span 
        className="text-[12px] font-bold"
        style={{ color: isTimeChanged ? COLORS.electricBlue : COLORS.goldLight }}
        key={activePersonnelCount}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {activePersonnelCount}
      </motion.span>
      {isTimeChanged && (
        <motion.span 
          className="text-[10px] font-medium"
          style={{ color: COLORS.electricBlue }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
        >
          @ {selectedHour.toString().padStart(2, '0')}:00
        </motion.span>
      )}
    </motion.div>
  )
}

interface ChronosDepartmentCountProps {
  departmentId: string
  className?: string
}

export function ChronosDepartmentCount({ departmentId, className = "" }: ChronosDepartmentCountProps) {
  const { departmentActiveCounts, selectedHour, realHour } = useChronos()
  
  const activeCount = departmentActiveCounts[departmentId] || 0
  const isTimeChanged = selectedHour !== realHour

  return (
    <motion.div
      className={`inline-flex items-center gap-1.5 ${className}`}
      key={activeCount}
      initial={{ scale: 1.1, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Users 
        className="w-3 h-3" 
        style={{ color: isTimeChanged ? COLORS.electricBlue : COLORS.champagneGold }} 
      />
      <span 
        className="text-[11px] font-bold"
        style={{ color: isTimeChanged ? COLORS.electricBlue : COLORS.goldLight }}
      >
        {activeCount}
      </span>
      {isTimeChanged && (
        <motion.div
          className="w-1 h-1 rounded-full ml-0.5"
          style={{ background: COLORS.electricBlue }}
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  )
}

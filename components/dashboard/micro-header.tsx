"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const navItems = [
  { id: "analytics", label: "Analizler" },
  { id: "arena", label: "Arena" },
  { id: "personnel", label: "Personel Merkezi" },
  { id: "schedule", label: "Mesai Takvimi" },
  { id: "education", label: "Egitim" },
  { id: "settings", label: "Ayarlar" },
]

interface MicroHeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MicroHeader({ activeTab, onTabChange }: MicroHeaderProps) {
  const [isLogoExpanded, setIsLogoExpanded] = useState(false)
  const [time, setTime] = useState(new Date())
  const [isClockHovered, setIsClockHovered] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", hour12: false })
  }

  const formatDate = (date: Date) => {
    const days = ["Pazar", "Pazartesi", "Sali", "Carsamba", "Persembe", "Cuma", "Cumartesi"]
    const months = ["Oca", "Sub", "Mar", "Nis", "May", "Haz", "Tem", "Agu", "Eyl", "Eki", "Kas", "Ara"]
    return `${date.getDate()} ${months[date.getMonth()]} ${days[date.getDay()]}`
  }

  return (
    <>
      <header className="h-16 bg-[#FAFAFA] w-full flex items-center justify-between px-8 relative z-50">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setIsLogoExpanded(true)}
        >
          <motion.div 
            className="w-11 h-11 relative flex-shrink-0"
            whileHover={{ 
              scale: 1.15,
              rotate: [0, -5, 5, 0],
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              rotate: {
                type: "tween",
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
          >
            <Image
              src="/logo.png"
              alt="CMS Logo"
              fill
              className="object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300"
              priority
            />
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                filter: "blur(8px)",
                transform: "scale(1.5)",
              }}
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-neutral-900 tracking-[0.15em] group-hover:text-neutral-700 transition-colors">CMS</span>
            <span className="text-[9px] font-medium text-neutral-500 tracking-[0.08em] -mt-0.5">COMPANY MANAGEMENT SYSTEM</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-lg ${
                activeTab === item.id
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-neutral-200/80 rounded-lg"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Live Clock - Integrated with LIVE indicator */}
        <motion.div 
          className="relative flex items-center gap-3 cursor-default select-none"
          onMouseEnter={() => setIsClockHovered(true)}
          onMouseLeave={() => setIsClockHovered(false)}
        >
          {/* Time Display */}
          <AnimatePresence mode="wait">
            {isClockHovered ? (
              <motion.span
                key="date"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="text-[13px] font-medium text-neutral-500 tracking-wide min-w-[120px] text-right"
              >
                {formatDate(time)}
              </motion.span>
            ) : (
              <motion.span
                key="time"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="text-[15px] font-light text-neutral-600 tracking-[0.1em] min-w-[120px] text-right tabular-nums"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatTime(time)}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="w-px h-4 bg-neutral-300" />

          {/* LIVE Pulse */}
          <motion.div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: "rgba(16, 185, 129, 0.08)" }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0)",
                "0 0 0 4px rgba(16, 185, 129, 0.1)",
                "0 0 0 0 rgba(16, 185, 129, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[10px] font-semibold text-emerald-600 tracking-wider">LIVE</span>
          </motion.div>
        </motion.div>
      </header>

      {/* Fullscreen Logo Modal */}
      <AnimatePresence>
        {isLogoExpanded && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsLogoExpanded(false)}
            style={{ background: "rgba(0, 0, 0, 0.95)" }}
          >
            {/* Ambient glow background */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 70%)",
              }}
            />

            {/* Orbiting particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400/60"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.cos(i * 45 * Math.PI / 180) * 200],
                  y: [0, Math.sin(i * 45 * Math.PI / 180) * 200],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}

            {/* Main Logo */}
            <motion.div
              className="relative"
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: "340px",
                  height: "340px",
                  marginLeft: "-20px",
                  marginTop: "-20px",
                  background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Second glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: "400px",
                  height: "400px",
                  marginLeft: "-50px",
                  marginTop: "-50px",
                  background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 60%)",
                  filter: "blur(40px)",
                }}
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Logo Image */}
              <motion.div
                className="relative w-[300px] h-[300px]"
                animate={{
                  rotateZ: [0, 360],
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="CMS Logo"
                  fill
                  className="object-contain"
                  style={{
                    filter: "drop-shadow(0 0 40px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 80px rgba(139, 92, 246, 0.3))",
                  }}
                />
              </motion.div>

              {/* Company name below logo */}
              <motion.div
                className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 
                  className="text-3xl font-bold tracking-[0.3em] mb-2"
                  style={{
                    background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #60a5fa 100%)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "gradient-shift 3s ease infinite",
                  }}
                >
                  CMS
                </h1>
                <p className="text-neutral-500 text-sm tracking-[0.2em] uppercase">
                  Company Management System
                </p>
              </motion.div>
            </motion.div>

            {/* Close hint */}
            <motion.p
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neutral-600 text-xs tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Kapatmak icin tiklayin
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

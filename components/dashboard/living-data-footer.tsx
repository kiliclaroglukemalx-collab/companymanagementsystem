"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useMemo } from "react"
import { brandTickerData, type Brand } from "@/lib/dashboard-data"
import { useSite } from "@/lib/site-context"

interface LivingDataFooterProps {
  onOpenDataWall?: (brand: Brand) => void
}

export function LivingDataFooter({ onOpenDataWall }: LivingDataFooterProps) {
  const { selectedSite } = useSite()
  
  // Get brand-specific ticker data or default
  const tickerItems = useMemo(() => {
    if (selectedSite) {
      return brandTickerData[selectedSite.id] || brandTickerData['default']
    }
    return brandTickerData['default']
  }, [selectedSite])

  // Duplicate items for seamless loop
  const duplicatedItems = useMemo(() => [...tickerItems, ...tickerItems], [tickerItems])

  const handleClick = () => {
    if (onOpenDataWall && selectedSite) {
      onOpenDataWall(selectedSite)
    }
  }

  return (
    <footer 
      className="relative overflow-hidden cursor-pointer group"
      style={{ 
        height: "180px",
        background: "#000000",
      }}
      onClick={handleClick}
    >
      {/* Top Border - Subtle gradient line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #1a1a1a 20%, #3b3b3b 50%, #1a1a1a 80%, transparent 100%)",
        }}
      />

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/arka%20plan.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        style={{ 
          opacity: 0.35,
          filter: "brightness(0.8) contrast(1.1)",
        }}
      />

      {/* Dark Overlay for better text legibility */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        {/* Section Label */}
        <div className="px-8 mb-4">
          <motion.span
            className="text-[10px] font-medium tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,255,255,0.4)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Canli Veri Akisi
          </motion.span>
        </div>

        {/* Ticker Container */}
        <div className="relative overflow-hidden">
          {/* Left Fade */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }}
          />
          
          {/* Right Fade */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #000000 0%, transparent 100%)" }}
          />

          {/* Scrolling Ticker */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSite?.id || 'default'}
              className="flex items-center gap-16 whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                x: [0, -50 * tickerItems.length + "%"],
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                opacity: { duration: 0.3 },
                y: { type: "spring", stiffness: 260, damping: 20 },
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.3,
                },
              }}
            >
              {duplicatedItems.map((item, index) => (
                <motion.div 
                  key={`${selectedSite?.id || 'default'}-${index}`}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: (index % tickerItems.length) * 0.1, // Stagger effect matching cards
                  }}
                >
                  {/* Pulse Indicator */}
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                    style={{
                      backgroundColor: selectedSite?.themeColor || "#10b981",
                      boxShadow: `0 0 8px ${selectedSite?.rgbGlow || "rgba(16, 185, 129, 0.6)"}`,
                    }}
                  />
                  
                  {/* Ticker Text */}
                  <span 
                    className="text-sm font-light tracking-wide"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      textShadow: "0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.05)",
                    }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timestamp */}
        <div className="px-8 mt-4">
          <motion.span
            className="text-[9px] font-mono tracking-wider"
            style={{ color: "rgba(255,255,255,0.25)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Son Guncelleme: {new Date().toLocaleTimeString('tr-TR')} UTC+3
          </motion.span>
        </div>
      </div>
    </footer>
  )
}

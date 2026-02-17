"use client"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Search, Building2, Check, X } from "lucide-react"
import { type Brand } from "@/lib/dashboard-data"
import { useSite } from "@/lib/site-context"

const AUTO_CYCLE_INTERVAL = 5000 // 5 seconds

export function HybridBrandSelector() {
  const { selectedSite: selectedBrand, setSelectedSite: onBrandChange, sites } = useSite()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isAutoCyclePaused, setIsAutoCyclePaused] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const autoCycleTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const availableSites = useMemo(() => {
    if (sites.length > 0) return sites
    return selectedBrand ? [selectedBrand] : []
  }, [sites, selectedBrand])

  const currentIndex = useMemo(() => {
    const index = availableSites.findIndex((b) => b.id === selectedBrand.id)
    return index >= 0 ? index : 0
  }, [availableSites, selectedBrand.id])

  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return availableSites
    return availableSites.filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, availableSites])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isSearchOpen])

  // Auto-cycle effect - Ghost Cycle
  useEffect(() => {
    if (isSearchOpen || isAutoCyclePaused || availableSites.length <= 1) {
      if (autoCycleTimeoutRef.current) {
        clearTimeout(autoCycleTimeoutRef.current)
      }
      return
    }

    autoCycleTimeoutRef.current = setTimeout(() => {
      const nextIndex = currentIndex === availableSites.length - 1 ? 0 : currentIndex + 1
      setSlideDirection("right")
      const nextSite = availableSites[nextIndex]
      if (nextSite) {
        triggerMorphTransition(nextSite)
      }
    }, AUTO_CYCLE_INTERVAL)

    return () => {
      if (autoCycleTimeoutRef.current) {
        clearTimeout(autoCycleTimeoutRef.current)
      }
    }
  }, [isSearchOpen, isAutoCyclePaused, currentIndex, availableSites])

  // Pause auto-cycle temporarily on user interaction
  const pauseAutoCycle = useCallback(() => {
    setIsAutoCyclePaused(true)
    setTimeout(() => setIsAutoCyclePaused(false), 10000) // Resume after 10s of inactivity
  }, [])

  const triggerMorphTransition = useCallback((newBrand: Brand) => {
    if (newBrand.id === selectedBrand.id) return
    setIsTransitioning(true)
    setTimeout(() => {
      onBrandChange(newBrand)
      setTimeout(() => setIsTransitioning(false), 500)
    }, 250)
  }, [selectedBrand.id, onBrandChange])

  const triggerLiquidTransition = useCallback((newBrand: Brand) => {
    if (newBrand.id === selectedBrand.id) return
    setIsTransitioning(true)
    setTimeout(() => {
      onBrandChange(newBrand)
      setTimeout(() => setIsTransitioning(false), 500)
    }, 250)
  }, [selectedBrand.id, onBrandChange])

  const handlePrevious = useCallback(() => {
    if (availableSites.length === 0) return
    pauseAutoCycle()
    setSlideDirection("left")
    const prevIndex = currentIndex === 0 ? availableSites.length - 1 : currentIndex - 1
    const previousSite = availableSites[prevIndex]
    if (previousSite) {
      triggerMorphTransition(previousSite)
    }
  }, [availableSites, currentIndex, triggerMorphTransition, pauseAutoCycle])

  const handleNext = useCallback(() => {
    if (availableSites.length === 0) return
    pauseAutoCycle()
    setSlideDirection("right")
    const nextIndex = currentIndex === availableSites.length - 1 ? 0 : currentIndex + 1
    const nextSite = availableSites[nextIndex]
    if (nextSite) {
      triggerMorphTransition(nextSite)
    }
  }, [availableSites, currentIndex, triggerMorphTransition, pauseAutoCycle])

  const handleSelectFromList = (brand: Brand) => {
    pauseAutoCycle()
    triggerMorphTransition(brand)
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
      {/* Main Selector Container */}
      <div className="relative flex items-center justify-center gap-4">
        {/* Left Arrow */}
        <motion.button
          onClick={handlePrevious}
          className="relative w-12 h-12 rounded-full flex items-center justify-center border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm"
          whileHover={{ 
            scale: 1.1,
            borderColor: selectedBrand.themeColor,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ChevronLeft className="w-5 h-5 text-neutral-400" />
          {/* Soft rounded glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${selectedBrand.rgbGlow}20, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </motion.button>

        {/* Central Brand Display - Clickable for Search */}
        <motion.button
          onClick={() => setIsSearchOpen(true)}
          className="relative flex-1 max-w-xs py-4 px-6 rounded-full overflow-hidden"
          style={{
            background: "rgba(10, 10, 10, 0.9)",
            backdropFilter: "blur(20px)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Soft Rounded Ambient Glow - ALWAYS ROUNDED */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${selectedBrand.rgbGlow}30, transparent 70%)`,
            }}
            animate={{
              opacity: isTransitioning ? 0.8 : 0.4,
              scale: isTransitioning ? 1.2 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Pulsing Aura during transition - ROUNDED */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${selectedBrand.rgbGlow}60, transparent 60%)`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* Border Glow - Rounded */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: `1px solid ${selectedBrand.themeColor}40`,
              boxShadow: `0 0 20px ${selectedBrand.rgbGlow}20, inset 0 0 20px ${selectedBrand.rgbGlow}10`,
            }}
          />

          {/* Brand Content */}
          <div className="relative z-10 flex items-center justify-center gap-3">
            {/* Icon */}
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(145deg, ${selectedBrand.themeColor}30, ${selectedBrand.themeColor}10)`,
                boxShadow: `0 0 15px ${selectedBrand.rgbGlow}30`,
              }}
              layoutId="brand-icon-hybrid"
            >
              <Building2 className="w-4 h-4" style={{ color: selectedBrand.themeColor }} />
            </motion.div>

            {/* Brand Name with Morphing Slide Effect */}
            <div className="flex flex-col items-start overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={selectedBrand.id}
                  className="text-lg font-bold text-white tracking-tight"
                  initial={{ 
                    opacity: 0, 
                    filter: "blur(16px)", 
                    scale: 0.85, 
                    x: slideDirection === "right" ? 30 : -30,
                  }}
                  animate={{ 
                    opacity: 1, 
                    filter: "blur(0px)", 
                    scale: 1, 
                    x: 0,
                  }}
                  exit={{ 
                    opacity: 0, 
                    filter: "blur(16px)", 
                    scale: 0.85, 
                    x: slideDirection === "right" ? -30 : 30,
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.34, 1.56, 0.64, 1], // Spring bounce easing
                  }}
                >
                  {selectedBrand.name}
                </motion.span>
              </AnimatePresence>
              <motion.span
                className="text-[10px] font-medium tracking-wider uppercase"
                style={{ color: selectedBrand.themeColor }}
              >
                Aktif
              </motion.span>
            </div>

            {/* Search Hint */}
            <Search className="w-4 h-4 text-neutral-600 ml-2" />
          </div>
        </motion.button>

        {/* Right Arrow */}
        <motion.button
          onClick={handleNext}
          className="relative w-12 h-12 rounded-full flex items-center justify-center border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm"
          whileHover={{ 
            scale: 1.1,
            borderColor: selectedBrand.themeColor,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ChevronRight className="w-5 h-5 text-neutral-400" />
          {/* Soft rounded glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${selectedBrand.rgbGlow}20, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </motion.button>
      </div>

      {/* Search Overlay / Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery("")
              }}
            />

            {/* Search Modal */}
            <motion.div
              className="absolute top-full left-1/2 mt-4 w-full max-w-md rounded-3xl border border-neutral-800/50 overflow-hidden z-50"
              style={{
                background: "rgba(8, 8, 8, 0.98)",
                backdropFilter: "blur(24px)",
                boxShadow: `0 8px 60px rgba(0,0,0,0.8), 0 0 80px ${selectedBrand.rgbGlow}15`,
                x: "-50%",
              }}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {/* Search Header */}
              <div className="relative p-4 border-b border-neutral-800/50">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Site ara..."
                    className="flex-1 bg-transparent text-base text-white placeholder-neutral-600 focus:outline-none"
                  />
                  <motion.button
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery("")
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4 text-neutral-400" />
                  </motion.button>
                </div>
              </div>

              {/* Brand List */}
              <div className="max-h-80 overflow-y-auto">
                {filteredBrands.length === 0 ? (
                  <div className="py-12 text-center text-sm text-neutral-600">
                    Sonuc bulunamadi
                  </div>
                ) : (
                  <div className="py-2">
                    {filteredBrands.map((brand, index) => (
                      <motion.button
                        key={brand.id}
                        onClick={() => handleSelectFromList(brand)}
                        className="relative w-full flex items-center gap-4 px-5 py-3 hover:bg-neutral-800/40 transition-colors group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        {/* Brand Color Dot with soft rounded glow */}
                        <div className="relative">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: brand.themeColor }}
                          />
                          {/* Soft aura around dot */}
                          <div
                            className="absolute inset-0 rounded-full opacity-50 blur-sm"
                            style={{ 
                              backgroundColor: brand.themeColor,
                              transform: "scale(2)",
                            }}
                          />
                        </div>

                        {/* Brand Name */}
                        <span
                          className="flex-1 text-left text-sm font-medium transition-colors"
                          style={{
                            color: selectedBrand.id === brand.id ? brand.themeColor : "#d4d4d4",
                          }}
                        >
                          {brand.name}
                        </span>

                        {/* Selected Check */}
                        {selectedBrand.id === brand.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <Check className="w-4 h-4" style={{ color: brand.themeColor }} />
                          </motion.div>
                        )}

                        {/* Hover Glow - Rounded */}
                        <motion.div
                          className="absolute inset-y-0 right-0 w-32 rounded-l-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${brand.rgbGlow}15)`,
                          }}
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-neutral-800/50 bg-neutral-900/30">
                <span className="text-[10px] text-neutral-600 tracking-wider uppercase">
                  {availableSites.length} site mevcut • Ok tuslari ile gezin
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

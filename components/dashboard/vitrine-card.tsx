"use client"

import React from "react"
import { useState, useRef, useEffect, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play } from "lucide-react"
import type { DashboardCard } from "@/lib/dashboard-data"
import { useVideoContext } from "@/lib/video-context"
import { 
  useIsMobile, 
  usePrefersReducedMotion, 
  useIntersectionObserver 
} from "@/hooks/use-media-optimization"

interface VitrineCardProps {
  card: DashboardCard
  onClick: () => void
  isPriority?: boolean
}

function VitrineCardComponent({ card, onClick, isPriority = false }: VitrineCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [mobileFocusActive, setMobileFocusActive] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const mobileFocusTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Hooks for optimization
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { activeVideoId, focusedCardId, setActiveVideo, setFocusedCard } = useVideoContext()
  
  // Intersection observer for lazy loading
  const { ref: intersectionRef, hasIntersected } = useIntersectionObserver<HTMLDivElement>()
  
  const isThisVideoActive = activeVideoId === card.id
  const isThisCardFocused = focusedCardId === card.id
  const isAnyCardFocused = focusedCardId !== null
  const shouldDim = isAnyCardFocused && !isThisCardFocused

  // Combined ref for intersection observer
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    (intersectionRef as React.MutableRefObject<HTMLDivElement | null>).current = node
    ;(cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node
  }, [intersectionRef])

  const handleLoadedData = useCallback(() => {
    setVideoLoaded(true)
  }, [])

  // Handle video playback - Desktop only, on hover
  useEffect(() => {
    const video = videoRef.current
    if (!video || isMobile || prefersReducedMotion) return

    if (isHovered && isThisVideoActive) {
      if (video.preload === "none") {
        video.preload = "auto"
        video.load()
      }
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      video.currentTime = 0
      setIsPlaying(false)
    }
  }, [isHovered, isThisVideoActive, isMobile, prefersReducedMotion])

  // Stop this video if another one becomes active
  useEffect(() => {
    if (activeVideoId && activeVideoId !== card.id) {
      const video = videoRef.current
      if (video) {
        video.pause()
        video.currentTime = 0
        setIsPlaying(false)
      }
    }
  }, [activeVideoId, card.id])

  // Cleanup mobile focus timer
  useEffect(() => {
    return () => {
      if (mobileFocusTimerRef.current) {
        clearTimeout(mobileFocusTimerRef.current)
      }
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (isMobile || prefersReducedMotion) return
    setIsHovered(true)
    setActiveVideo(card.id)
    setFocusedCard(card.id)
  }, [isMobile, prefersReducedMotion, setActiveVideo, setFocusedCard, card.id])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (isThisVideoActive) {
      setActiveVideo(null)
    }
    if (isThisCardFocused) {
      setFocusedCard(null)
    }
  }, [isThisVideoActive, isThisCardFocused, setActiveVideo, setFocusedCard])

  // Mobile tap to play with focus effect
  const handleMobileTap = useCallback((e: React.MouseEvent) => {
    if (!isMobile) return
    
    // Prevent click from bubbling to card onClick
    e.stopPropagation()
    
    const video = videoRef.current
    if (!video || !card.videoUrl) return

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
      setMobileFocusActive(false)
      setFocusedCard(null)
    } else {
      if (video.preload === "none") {
        video.preload = "auto"
        video.load()
      }
      setActiveVideo(card.id)
      setFocusedCard(card.id)
      setMobileFocusActive(true)
      video.play().catch(() => setVideoError(true))
      setIsPlaying(true)
      
      // Auto-disable focus effect after 2.5 seconds on mobile
      if (mobileFocusTimerRef.current) {
        clearTimeout(mobileFocusTimerRef.current)
      }
      mobileFocusTimerRef.current = setTimeout(() => {
        setMobileFocusActive(false)
        setFocusedCard(null)
      }, 2500)
    }
  }, [isMobile, card.videoUrl, card.id, isPlaying, setActiveVideo, setFocusedCard])

  const handleVideoError = useCallback(() => {
    setVideoError(true)
  }, [])

  // Determine visual states
  const isFocused = isHovered || mobileFocusActive
  const showFocusOverlay = isFocused && isPlaying && !prefersReducedMotion

  return (
    <motion.div
      ref={setRefs}
      layoutId={`card-${card.id}`}
      onPointerUp={(e) => {
        if (e.button === 0 && !isMobile) {
          onClick()
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative select-none w-[320px] h-[220px] flex-shrink-0 rounded-3xl overflow-hidden group"
      style={{
        background: "#000000",
        willChange: "transform, opacity, filter",
        transformStyle: "preserve-3d",
        // Layered shadow - softer but deeper on hover
        boxShadow: isFocused && !prefersReducedMotion
          ? `0 8px 24px -6px rgba(0,0,0,0.4), 0 24px 48px -12px rgba(0,0,0,0.35), 0 0 40px ${card.glowColor}15`
          : `0 2px 8px -2px rgba(0,0,0,0.2), 0 4px 16px -4px rgba(0,0,0,0.15)`,
        // Apple-like transition
        transition: "box-shadow 450ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      animate={!prefersReducedMotion ? {
        // Hover card: slight lift with 3D tilt (desktop), minimal on mobile
        scale: isFocused 
          ? (isMobile ? 1.015 : 1.03) 
          : (shouldDim ? (isMobile ? 1 : 0.99) : 1),
        y: isFocused ? (isMobile ? -3 : -6) : 0,
        rotateX: isFocused && !isMobile ? 2 : 0,
        // Very subtle dim for non-focused cards (almost none on mobile)
        opacity: shouldDim ? (isMobile ? 0.95 : 0.9) : 1,
        filter: shouldDim 
          ? (isMobile ? "brightness(0.98)" : "brightness(0.95) saturate(0.9)") 
          : "brightness(1) saturate(1)",
      } : undefined}
      whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
      transition={{
        // Apple-style smooth easing
        duration: 0.45,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {/* Subtle depth glow - Apple style */}
      <AnimatePresence>
        {isFocused && !prefersReducedMotion && (
          <motion.div 
            className="absolute -inset-4 -z-10 rounded-[40px] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              background: `radial-gradient(ellipse at center, ${card.glowColor}25 0%, transparent 70%)`,
              filter: "blur(24px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Shine sweep effect on hover */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-30"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ 
          x: isHovered ? "200%" : "-100%",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          background: `linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.05) 40%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.05) 60%,
            transparent 80%
          )`,
          width: "50%",
        }}
      />

      {/* Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${card.gradient.from}30 0%, #000 50%, ${card.gradient.to}30 100%)`,
        }}
      />

      {/* Video Background - subtle zoom for depth */}
      {hasIntersected && !videoError && card.videoUrl && (
        <motion.div
          className="absolute inset-0 origin-center"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: isFocused ? 1 : 0,
            scale: isFocused && !prefersReducedMotion ? 1.08 : 1,
          }}
          transition={{ 
            opacity: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
            scale: { 
              duration: 0.45,
              ease: [0.2, 0.8, 0.2, 1],
            }
          }}
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={handleLoadedData}
            onError={handleVideoError}
            className="w-full h-full object-cover"
            style={{
              filter: "brightness(0.9) contrast(1.1) saturate(1.1)",
            }}
          >
            <source src={card.videoUrl} type="video/mp4" />
          </video>
          
          {/* Dark vignette overlay for depth */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                ellipse 80% 80% at center,
                transparent 0%,
                transparent 40%,
                rgba(0,0,0,0.3) 70%,
                rgba(0,0,0,0.6) 100%
              )`,
            }}
          />
        </motion.div>
      )}

      {/* Subtle vignette overlay - 10-15% edge darkening */}
      <AnimatePresence>
        {showFocusOverlay && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* Light vignette - center clear, edges 10-15% darker */}
            <div 
              className="absolute inset-0"
              style={{
                background: `radial-gradient(
                  ellipse 70% 70% at center,
                  transparent 0%,
                  transparent 50%,
                  rgba(0, 0, 0, 0.1) 75%,
                  rgba(0, 0, 0, 0.15) 100%
                )`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Play Button */}
      {isMobile && card.videoUrl && !prefersReducedMotion && (
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleMobileTap}
            >
              <motion.div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Mobile Stop/Pause indicator when playing */}
      {isMobile && isPlaying && (
        <motion.div
          className="absolute top-4 right-4 z-25"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleMobileTap}
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center gap-0.5"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="w-1 h-3 bg-white rounded-full" />
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </motion.div>
      )}

      {/* Top Edge Highlight */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-15 h-full flex flex-col items-center justify-center p-6">
        <motion.h3
          className="text-center font-bold tracking-wide leading-tight"
          style={{
            fontSize: "24px",
            letterSpacing: "0.08em",
            background: `linear-gradient(135deg, ${card.gradient.from} 0%, ${card.gradient.to} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: `drop-shadow(0 0 20px ${card.gradient.glow}) drop-shadow(0 0 40px ${card.gradient.glow})`,
          }}
          initial={false}
          animate={!prefersReducedMotion ? {
            y: isFocused ? -40 : 0,
            opacity: isFocused ? 0 : 1,
          } : undefined}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          layoutId={`title-${card.id}`}
        >
          {card.title}
        </motion.h3>

        <motion.p
          className="text-center mt-4 text-xs font-medium uppercase"
          style={{ 
            color: "#666666",
            letterSpacing: "0.25em",
          }}
          initial={false}
          animate={!prefersReducedMotion ? {
            opacity: isFocused ? 0 : 1,
            y: isFocused ? -20 : 0,
          } : undefined}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          layoutId={`subtitle-${card.id}`}
        >
          {card.subtitle}
        </motion.p>
      </div>

      {/* Bottom Glow Line on Focus */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: isFocused ? 1 : 0,
            scaleX: isFocused ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          style={{
            background: `linear-gradient(90deg, transparent 5%, ${card.glowColor} 50%, transparent 95%)`,
            boxShadow: `0 0 30px ${card.glowColor}60, 0 0 60px ${card.glowColor}30`,
          }}
        />
      )}

      {/* Click overlay for card navigation (mobile) */}
      {isMobile && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 z-30"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">
              Detay icin dokun
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export const VitrineCard = memo(VitrineCardComponent)

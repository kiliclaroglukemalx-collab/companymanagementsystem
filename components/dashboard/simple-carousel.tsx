"use client"

import React from "react"
import { useRef, useCallback, useState } from "react"
import { motion } from "framer-motion"
import { VitrineCard } from "./vitrine-card"
import { VideoProvider } from "@/lib/video-context"
import type { DashboardCard } from "@/lib/dashboard-data"

interface SimpleCarouselProps {
  cards: DashboardCard[]
  onCardClick: (card: DashboardCard) => void
}

const DRAG_THRESHOLD = 5 // pixels - if dragged more than this, it's a drag not a click

export function SimpleCarousel({ cards, onCardClick }: SimpleCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const scrollStartX = useRef(0)
  const hasDragged = useRef(false)

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    dragStartX.current = e.clientX
    scrollStartX.current = containerRef.current.scrollLeft
    hasDragged.current = false
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const dx = e.clientX - dragStartX.current
    containerRef.current.scrollLeft = scrollStartX.current - dx
    
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      hasDragged.current = true
    }
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    // Reset hasDragged after a short delay to allow click events to check the flag
    setTimeout(() => {
      hasDragged.current = false
    }, 100)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      setTimeout(() => {
        hasDragged.current = false
      }, 100)
    }
  }, [isDragging])

  const handleCardClick = useCallback((card: DashboardCard) => {
    // Only trigger click if we haven't dragged
    if (!hasDragged.current) {
      onCardClick(card)
    }
  }, [onCardClick])

  return (
    <VideoProvider>
      <div 
        ref={containerRef}
        className={`overflow-x-auto ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          // Hide scrollbar while maintaining functionality
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hide webkit scrollbar */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        <motion.div 
          className="flex gap-6 px-8 py-10"
          style={{ perspective: "900px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
              },
            },
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="flex-shrink-0"
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 20,
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <VitrineCard
                card={card}
                onClick={() => handleCardClick(card)}
                isPriority={index < 2}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </VideoProvider>
  )
}

"use client"

import { motion } from "framer-motion"

// Apple-style shimmer effect
const shimmer = {
  initial: { x: "-100%" },
  animate: { x: "100%" },
  transition: { 
    repeat: Infinity, 
    duration: 1.5, 
    ease: "easeInOut",
  }
}

// Base skeleton with shimmer
function SkeletonBase({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-900 rounded-2xl ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  )
}

// Header skeleton
export function HeaderSkeleton() {
  return (
    <div className="h-16 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SkeletonBase className="w-10 h-10 rounded-full !bg-neutral-100" />
        <SkeletonBase className="w-32 h-4 !bg-neutral-100" />
      </div>
      <div className="flex items-center gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonBase key={i} className="w-20 h-4 !bg-neutral-100" />
        ))}
      </div>
    </div>
  )
}

// Brand selector skeleton
export function BrandSelectorSkeleton() {
  return (
    <div className="py-8 px-6 bg-black">
      <div className="flex items-center justify-center gap-4">
        <SkeletonBase className="w-10 h-10 rounded-full" />
        <SkeletonBase className="w-64 h-14 rounded-2xl" />
        <SkeletonBase className="w-10 h-10 rounded-full" />
      </div>
    </div>
  )
}

// Card skeleton for carousel
export function CardSkeleton() {
  return (
    <div className="w-[350px] h-[280px] flex-shrink-0">
      <SkeletonBase className="w-full h-full">
        <div className="p-6 h-full flex flex-col">
          <SkeletonBase className="w-24 h-3 mb-4 !bg-neutral-800" />
          <SkeletonBase className="w-48 h-6 mb-2 !bg-neutral-800" />
          <SkeletonBase className="w-32 h-4 !bg-neutral-800" />
        </div>
      </SkeletonBase>
    </div>
  )
}

// Carousel skeleton
export function CarouselSkeleton() {
  return (
    <div className="bg-white py-10 px-8">
      <SkeletonBase className="w-40 h-3 mb-8 !bg-neutral-100" />
      <div className="flex gap-6 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

// Full page skeleton
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderSkeleton />
      <BrandSelectorSkeleton />
      <CarouselSkeleton />
      <div className="h-64 bg-black" />
    </div>
  )
}

// Arena skeleton
export function ArenaSkeleton() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <SkeletonBase className="w-48 h-8 mb-8" />
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <SkeletonBase key={i} className="h-64 rounded-3xl" />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <SkeletonBase key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Shift calendar skeleton
export function ShiftCalendarSkeleton() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <SkeletonBase className="w-64 h-8 mb-4" />
        <SkeletonBase className="w-96 h-4 mb-8" />
        <SkeletonBase className="w-full h-16 mb-8 rounded-xl" />
        <div className="grid grid-cols-7 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <SkeletonBase key={i} className="h-96 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Personnel center skeleton  
export function PersonnelSkeleton() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <SkeletonBase className="w-64 h-8 mb-8" />
        <div className="flex gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBase key={i} className="w-48 h-24 rounded-2xl" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonBase key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Monolith skeleton
export function MonolithSkeleton() {
  return (
    <div className="py-16 px-6 bg-black">
      <SkeletonBase className="w-48 h-4 mb-2 mx-auto" />
      <SkeletonBase className="w-64 h-8 mb-8 mx-auto" />
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonBase key={i} className="w-40 h-36 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Activity, 
  Star, 
  Trophy, 
  TrendingUp, 
  Shield, 
  UserPlus,
  Clock
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import type { ArenaEventData } from "@/lib/arena-actions"
import { ArenaEventType } from "@prisma/client"
import { TR } from "@/lib/tr-constants"

interface ArenaLiveFeedProps {
  events: ArenaEventData[]
  isLoading?: boolean
}

// Event type icon mappings - centralized for easy maintenance
const EVENT_ICONS = {
  RATING_GIVEN: Star,
  LEADER_CHANGED: Trophy,
  RATING_PROGRESS: TrendingUp,
  SECURITY_ALERT: Shield,
  USER_CREATED: UserPlus,
  USER_JOINED: UserPlus,
} as const

// Event type visual mappings - aligned with admin panel color tokens
const EVENT_COLORS = {
  RATING_GIVEN: "text-amber-600 bg-amber-50 border-amber-200",
  LEADER_CHANGED: "text-purple-600 bg-purple-50 border-purple-200",
  RATING_PROGRESS: "text-blue-600 bg-blue-50 border-blue-200",
  SECURITY_ALERT: "text-red-600 bg-red-50 border-red-200",
  USER_CREATED: "text-green-600 bg-green-50 border-green-200",
  USER_JOINED: "text-green-600 bg-green-50 border-green-200",
} as const

const EVENT_BADGE_COLORS = {
  RATING_GIVEN: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  LEADER_CHANGED: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  RATING_PROGRESS: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  SECURITY_ALERT: "bg-red-100 text-red-800 hover:bg-red-100",
  USER_CREATED: "bg-green-100 text-green-800 hover:bg-green-100",
  USER_JOINED: "bg-green-100 text-green-800 hover:bg-green-100",
} as const

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000)
  
  if (diffInSeconds < 60) return TR.arena.justNow
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} ${TR.arena.minutesAgo}`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ${TR.arena.hoursAgo}`
  return `${Math.floor(diffInSeconds / 86400)} ${TR.arena.daysAgo}`
}

function ArenaEventItem({ event, index }: { event: ArenaEventData; index: number }) {
  const Icon = EVENT_ICONS[event.type] || Activity
  const colorClass = EVENT_COLORS[event.type] || "text-slate-500 bg-slate-50 border-slate-200"
  const badgeColor = EVENT_BADGE_COLORS[event.type] || "bg-slate-100 text-slate-700"
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-slate-900 leading-tight">
            {event.title}
          </p>
          <Badge variant="secondary" className={`text-xs flex-shrink-0 ${badgeColor}`}>
            {formatTimeAgo(event.createdAt)}
          </Badge>
        </div>
        
        {event.message && (
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {event.message}
          </p>
        )}
      </div>
    </motion.div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <Activity className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-sm font-medium text-slate-900 mb-1">
        {TR.arena.noRecentActivity}
      </h3>
      <p className="text-xs text-slate-500">
        {TR.arena.noActivityDesc}
      </p>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ArenaLiveFeed({ events, isLoading }: ArenaLiveFeedProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted || isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {TR.arena.liveFeed}
                </h2>
                <p className="text-xs text-slate-500">
                  {TR.arena.liveFeedDesc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>{TR.arena.live}</span>
            </div>
          </div>
        </div>
        <LoadingSkeleton />
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Arena Live Feed
              </h2>
              <p className="text-xs text-slate-500">
                Real-time activity stream
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">{TR.arena.live}</span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {events.length} {TR.arena.event}
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Events List */}
      <ScrollArea className="h-[400px]">
        {events.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="p-4 space-y-1">
            <AnimatePresence mode="popLayout">
              {events.map((event, index) => (
                <ArenaEventItem key={event.id} event={event} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </ScrollArea>
      
      {/* Footer */}
      {events.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>{TR.arena.showingLast} {Math.min(events.length, 20)} {TR.arena.eventsShown}</span>
            </div>
            <span className="text-slate-400">{TR.arena.newestFirst}</span>
          </div>
        </div>
      )}
    </div>
  )
}

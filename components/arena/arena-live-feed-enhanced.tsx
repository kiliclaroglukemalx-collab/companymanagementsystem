"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Activity, 
  Star, 
  Trophy, 
  TrendingUp, 
  Shield, 
  UserPlus,
  Clock,
  Filter,
  Users,
  BarChart3,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ArenaEventData, ArenaSummaryStats } from "@/lib/arena-actions"
import { ArenaEventType } from "@prisma/client"
import { TR } from "@/lib/tr-constants"

interface ArenaLiveFeedEnhancedProps {
  events: ArenaEventData[]
  summary?: ArenaSummaryStats
  isLoading?: boolean
  onFilterChange?: (filters: { type?: ArenaEventType; timeRange?: string }) => void
}

// Event type icon mappings
const EVENT_ICONS = {
  RATING_GIVEN: Star,
  LEADER_CHANGED: Trophy,
  RATING_PROGRESS: TrendingUp,
  SECURITY_ALERT: Shield,
  USER_CREATED: UserPlus,
  USER_JOINED: UserPlus,
} as const

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

// Summary Bar Component
function SummaryBar({ summary, isLoading }: { summary?: ArenaSummaryStats; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!summary) return null

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Daily Progress */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-600 mb-1">{TR.arena.dailyProgress}</div>
            <div className="text-2xl font-bold text-slate-900">%{summary.dailyCompletionRate}</div>
          </div>
        </div>

        {/* People Rated Today */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-600 mb-1">{TR.arena.peopleRatedToday}</div>
            <div className="text-2xl font-bold text-slate-900">{summary.todayPeopleRated}</div>
          </div>
        </div>

        {/* Today Ratings Count */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-600 mb-1">{TR.rating.ratingHistory}</div>
            <div className="text-2xl font-bold text-slate-900">{summary.todayRatingsCount}</div>
          </div>
        </div>

        {/* Last Rating */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-600 mb-1">{TR.arena.lastRating}</div>
            <div className="text-sm font-semibold text-slate-900">
              {summary.lastRatingTime ? formatTimeAgo(summary.lastRatingTime) : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Filter Bar Component
function FilterBar({ onFilterChange }: { onFilterChange?: (filters: any) => void }) {
  const [eventType, setEventType] = useState<string>("all")
  const [timeRange, setTimeRange] = useState<string>("today")

  const handleEventTypeChange = (value: string) => {
    setEventType(value)
    onFilterChange?.({
      type: value === "all" ? undefined : (value as ArenaEventType),
      timeRange,
    })
  }

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    onFilterChange?.({
      type: eventType === "all" ? undefined : (eventType as ArenaEventType),
      timeRange: value,
    })
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Filter className="w-4 h-4" />
          <span>{TR.common.filter}</span>
        </div>

        <div className="flex-1 flex items-center gap-3">
          {/* Event Type Filter */}
          <Select value={eventType} onValueChange={handleEventTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={TR.arena.filterByType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{TR.arena.allTypes}</SelectItem>
              <SelectItem value="RATING_GIVEN">{TR.arena.ratingsOnly}</SelectItem>
              <SelectItem value="SECURITY_ALERT">{TR.arena.securityOnly}</SelectItem>
              <SelectItem value="USER_CREATED">{TR.arena.userEventsOnly}</SelectItem>
            </SelectContent>
          </Select>

          {/* Time Range Filter */}
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={TR.arena.filterByTime} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{TR.arena.today}</SelectItem>
              <SelectItem value="yesterday">{TR.arena.yesterday}</SelectItem>
              <SelectItem value="last7days">{TR.arena.last7Days}</SelectItem>
              <SelectItem value="last30days">{TR.arena.last30Days}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

// Event Item Component
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
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm font-semibold text-slate-900 leading-tight">
            {event.title}
          </h4>
          <Badge variant="secondary" className={`text-xs flex-shrink-0 ${badgeColor}`}>
            {formatTimeAgo(event.createdAt)}
          </Badge>
        </div>
        {event.message && (
          <p className="text-xs text-slate-600 leading-relaxed">{event.message}</p>
        )}
      </div>
    </motion.div>
  )
}

// Empty State Component
function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
        <Activity className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {TR.arena.noActivityToday}
      </h3>
      <p className="text-sm text-slate-600">
        {TR.arena.noActivityTodayDesc}
      </p>
    </div>
  )
}

// Loading Skeleton Component
function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-start gap-3 p-3">
          <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Main Component
export function ArenaLiveFeedEnhanced({
  events,
  summary,
  isLoading,
  onFilterChange,
}: ArenaLiveFeedEnhancedProps) {
  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      <SummaryBar summary={summary} isLoading={isLoading} />

      {/* Filter Bar */}
      <FilterBar onFilterChange={onFilterChange} />

      {/* Live Feed */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-200 p-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">{TR.arena.liveFeed}</h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 ml-auto">
              {TR.arena.live}
            </Badge>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            {TR.arena.showingLast} 20 {TR.arena.event} • {TR.arena.newestFirst}
          </p>
        </div>

        {/* Events List */}
        <ScrollArea className="h-[500px]">
          <div className="p-4">
            {isLoading ? (
              <LoadingSkeleton />
            ) : events.length === 0 ? (
              <EmptyState />
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="space-y-2">
                  {events.map((event, index) => (
                    <ArenaEventItem key={event.id} event={event} index={index} />
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

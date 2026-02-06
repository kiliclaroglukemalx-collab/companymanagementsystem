"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, AlertTriangle, Info, AlertCircle, Check } from "lucide-react"
import { announcementsStore, dismissedAnnouncements, addReadRecord, readRecordsStore, type Announcement } from "./settings-panel"

// Session storage key for tracking shown announcements this session
const SESSION_SHOWN_KEY = 'cms_shown_announcements_session'

// Get shown announcements from sessionStorage (persists for browser tab/session)
const getSessionShown = (): Set<string> => {
  if (typeof window === 'undefined') return new Set()
  try {
    const stored = sessionStorage.getItem(SESSION_SHOWN_KEY)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

// Add to session shown and persist
const addToSessionShown = (id: string): void => {
  if (typeof window === 'undefined') return
  try {
    const current = getSessionShown()
    current.add(id)
    sessionStorage.setItem(SESSION_SHOWN_KEY, JSON.stringify([...current]))
  } catch {}
}

// Check if current day matches announcement's active days
const isDayActive = (activeDays?: string[]): boolean => {
  if (!activeDays || activeDays.length === 0) return true // Default: all days active
  
  const dayMap: Record<number, string> = {
    0: 'Paz', 1: 'Pzt', 2: 'Sal', 3: 'Car', 4: 'Per', 5: 'Cum', 6: 'Cmt'
  }
  const today = dayMap[new Date().getDay()]
  return activeDays.includes(today)
}

export function AnnouncementPopup() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [shownThisSession, setShownThisSession] = useState<Set<string>>(new Set())

  useEffect(() => {
    setShownThisSession(getSessionShown())
  }, [])

  useEffect(() => {
    // Small delay for better UX
    const timer = setTimeout(() => {
      // Get session shown set
      const sessionShown = getSessionShown()
      
      // Filter announcements that should be shown as popup
      const activePopups = announcementsStore.filter(ann => {
        // Must be active and have popup enabled
        if (!ann.isActive || !ann.showAsPopup) return false
        
        // Check expiry date
        if (ann.expiresAt && new Date(ann.expiresAt) < new Date()) return false
        
        // Check if today is an active day for this announcement
        if (!isDayActive(ann.activeDays)) return false
        
        // Check display mode
        if (ann.displayMode === 'once') {
          // Already dismissed permanently (stored in localStorage)
          if (dismissedAnnouncements.has(ann.id)) return false
        } else if (ann.displayMode === 'every_login') {
          // Already shown this session (stored in sessionStorage)
          if (sessionShown.has(ann.id)) return false
        }
        
        // Check removeOnRead - if user marked as read, don't show again
        if (ann.removeOnRead && dismissedAnnouncements.has(ann.id)) return false
        
        return true
      })

      // Sort by severity (critical first)
      const sorted = activePopups.sort((a, b) => {
        const order = { critical: 0, warning: 1, info: 2 }
        return order[a.severity] - order[b.severity]
      })

      if (sorted.length > 0) {
        setAnnouncements(sorted)
        setIsVisible(true)
        // Mark first one as shown this session (persisted to sessionStorage)
        addToSessionShown(sorted[0].id)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [shownThisSession])

  const currentAnnouncement = announcements[currentIndex]

  const dismissCurrent = (markAsRead: boolean = false) => {
    if (!currentAnnouncement) return

    // If marking as read, add to read records and permanently dismiss
    if (markAsRead) {
      addReadRecord(currentAnnouncement.id, currentAnnouncement.title)
      // User confirmed reading - don't show this again regardless of displayMode
      dismissedAnnouncements.add(currentAnnouncement.id)
    } else {
      // Just closing without reading - only dismiss if "once" mode
      if (currentAnnouncement.displayMode === 'once') {
        dismissedAnnouncements.add(currentAnnouncement.id)
      }
    }

    // Move to next or close
    if (currentIndex < announcements.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      // Mark next one as shown this session (persisted to sessionStorage)
      addToSessionShown(announcements[nextIndex].id)
    } else {
      setIsVisible(false)
    }
  }

  const dismissAll = (markAllAsRead: boolean = false) => {
    announcements.forEach(ann => {
      if (markAllAsRead) {
        addReadRecord(ann.id, ann.title)
        // User confirmed reading all - don't show these again (saved to localStorage)
        dismissedAnnouncements.add(ann.id)
      } else {
        if (ann.displayMode === 'once') {
          dismissedAnnouncements.add(ann.id)
        }
      }
      // Mark as shown this session (saved to sessionStorage)
      addToSessionShown(ann.id)
    })
    setIsVisible(false)
  }

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { 
          color: '#ef4444', 
          bgColor: 'rgba(239, 68, 68, 0.1)', 
          borderColor: 'rgba(239, 68, 68, 0.3)',
          icon: AlertCircle,
          label: 'Kritik Duyuru'
        }
      case 'warning':
        return { 
          color: '#f59e0b', 
          bgColor: 'rgba(245, 158, 11, 0.1)', 
          borderColor: 'rgba(245, 158, 11, 0.3)',
          icon: AlertTriangle,
          label: 'Onemli Duyuru'
        }
      default:
        return { 
          color: '#3b82f6', 
          bgColor: 'rgba(59, 130, 246, 0.1)', 
          borderColor: 'rgba(59, 130, 246, 0.3)',
          icon: Info,
          label: 'Bilgilendirme'
        }
    }
  }

  if (!currentAnnouncement) return null

  const config = getSeverityConfig(currentAnnouncement.severity)
  const IconComponent = config.icon

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissCurrent}
          />

          {/* Popup */}
          <motion.div
            className="fixed top-1/2 left-1/2 w-full max-w-md z-[101] p-6 rounded-3xl"
            style={{ 
              background: '#0a0a0a', 
              border: `1px solid ${config.borderColor}`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${config.color}15`,
              x: '-50%', 
              y: '-50%' 
            }}
            initial={{ opacity: 0, scale: 0.9, y: '-45%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: '-45%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div 
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{ background: config.bgColor }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: config.color }} />
                </div>
                <div>
                  <span 
                    className="text-[10px] font-semibold tracking-wider uppercase"
                    style={{ color: config.color }}
                  >
                    {config.label}
                  </span>
                  <h2 className="text-lg font-semibold text-white mt-0.5">
                    {currentAnnouncement.title}
                  </h2>
                </div>
              </div>
              <button 
                onClick={dismissCurrent}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            {/* Content */}
            <div 
              className="p-4 rounded-2xl mb-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-sm text-neutral-300 leading-relaxed">
                {currentAnnouncement.content}
              </p>
            </div>

            {/* Display mode indicator */}
            <div 
              className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <Bell className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-[11px] text-neutral-500">
                {currentAnnouncement.displayMode === 'every_login' 
                  ? 'Bu duyuru her giriste gosterilir' 
                  : 'Bu duyuru sadece bir kez gosterilir'}
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-[11px] text-neutral-500">
                <span>{currentAnnouncement.createdBy}</span>
                <span className="mx-2">•</span>
                <span>{currentAnnouncement.createdAt.toLocaleDateString('tr-TR')}</span>
              </div>

              {announcements.length > 1 && (
                <div className="flex items-center gap-1.5">
                  {announcements.map((_, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full transition-colors"
                      style={{ 
                        background: idx === currentIndex ? config.color : 'rgba(255,255,255,0.2)' 
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => dismissCurrent(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#a3a3a3' }}
              >
                Kapat
              </button>
              <motion.button
                onClick={() => dismissCurrent(true)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                style={{ 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  border: '1px solid rgba(16, 185, 129, 0.4)', 
                  color: '#10b981' 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Check className="w-4 h-4" />
                Okudum
              </motion.button>
            </div>
            {announcements.length > 1 && (
              <button
                onClick={() => dismissAll(true)}
                className="w-full mt-2 py-2 rounded-xl text-xs font-medium transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)', color: '#737373' }}
              >
                Tumunu okudum olarak isaretle ({announcements.length} duyuru)
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

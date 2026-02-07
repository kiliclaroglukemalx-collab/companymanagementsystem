"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, AlertTriangle, Info, AlertCircle, Check } from "lucide-react"

interface Announcement {
  id: string
  title: string
  content: string
  severity: "INFO" | "WARNING" | "CRITICAL"
  displayMode: "ONCE" | "EVERY_LOGIN" | "DAILY"
  showAsPopup: boolean
  createdAt: string
  readRecords: { readAt: string }[]
}

// Session storage key for tracking shown announcements this session
const SESSION_SHOWN_KEY = "cms_shown_announcements_session"

// Get shown announcements from sessionStorage (persists for browser tab/session)
const getSessionShown = (): Set<string> => {
  if (typeof window === "undefined") return new Set()
  try {
    const stored = sessionStorage.getItem(SESSION_SHOWN_KEY)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

// Add to session shown and persist
const addToSessionShown = (id: string): void => {
  if (typeof window === "undefined") return
  try {
    const current = getSessionShown()
    current.add(id)
    sessionStorage.setItem(SESSION_SHOWN_KEY, JSON.stringify([...current]))
  } catch {}
}

// LocalStorage for dismissed announcements (permanent)
const DISMISSED_KEY = "cms_dismissed_announcements"

const getDismissed = (): Set<string> => {
  if (typeof window === "undefined") return new Set()
  try {
    const stored = localStorage.getItem(DISMISSED_KEY)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

const addToDismissed = (id: string): void => {
  if (typeof window === "undefined") return
  try {
    const current = getDismissed()
    current.add(id)
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...current]))
  } catch {}
}

export function AnnouncementPopup() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnnouncements()
  }, [])

  const loadAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements")
      if (!response.ok) throw new Error("Failed to fetch announcements")

      const data = await response.json()
      const sessionShown = getSessionShown()
      const dismissed = getDismissed()

      // Filter announcements that should be shown as popup
      const activePopups = (data.announcements || []).filter((ann: Announcement) => {
        // Must have popup enabled
        if (!ann.showAsPopup) return false

        // Already read
        if (ann.readRecords && ann.readRecords.length > 0) return false

        // Check display mode
        if (ann.displayMode === "ONCE") {
          // Already dismissed permanently
          if (dismissed.has(ann.id)) return false
        } else if (ann.displayMode === "EVERY_LOGIN") {
          // Already shown this session
          if (sessionShown.has(ann.id)) return false
        }

        return true
      })

      // Sort by severity (critical first)
      const sorted = activePopups.sort((a: Announcement, b: Announcement) => {
        const order = { CRITICAL: 0, WARNING: 1, INFO: 2 }
        return order[a.severity] - order[b.severity]
      })

      if (sorted.length > 0) {
        setAnnouncements(sorted)
        setIsVisible(true)
        // Mark first one as shown this session
        addToSessionShown(sorted[0].id)
      }
    } catch (error) {
      console.error("Failed to load announcements:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (announcementId: string) => {
    try {
      await fetch(`/api/announcements/${announcementId}/read`, {
        method: "POST",
      })
    } catch (error) {
      console.error("Failed to mark announcement as read:", error)
    }
  }

  const currentAnnouncement = announcements[currentIndex]

  const dismissCurrent = async (markRead: boolean = false) => {
    if (!currentAnnouncement) return

    // If marking as read, send API request and permanently dismiss
    if (markRead) {
      await markAsRead(currentAnnouncement.id)
      // Don't show this again
      addToDismissed(currentAnnouncement.id)
    } else {
      // Just closing without reading - only dismiss if "once" mode
      if (currentAnnouncement.displayMode === "ONCE") {
        addToDismissed(currentAnnouncement.id)
      }
    }

    // Move to next or close
    if (currentIndex < announcements.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      // Mark next one as shown this session
      addToSessionShown(announcements[nextIndex].id)
    } else {
      setIsVisible(false)
    }
  }

  const dismissAll = async (markAllRead: boolean = false) => {
    for (const ann of announcements) {
      if (markAllRead) {
        await markAsRead(ann.id)
        addToDismissed(ann.id)
      } else {
        if (ann.displayMode === "ONCE") {
          addToDismissed(ann.id)
        }
      }
      addToSessionShown(ann.id)
    }
    setIsVisible(false)
  }

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return {
          color: "#ef4444",
          bgColor: "rgba(239, 68, 68, 0.1)",
          borderColor: "rgba(239, 68, 68, 0.3)",
          icon: AlertCircle,
          label: "Kritik Duyuru",
        }
      case "WARNING":
        return {
          color: "#f59e0b",
          bgColor: "rgba(245, 158, 11, 0.1)",
          borderColor: "rgba(245, 158, 11, 0.3)",
          icon: AlertTriangle,
          label: "Önemli Duyuru",
        }
      default:
        return {
          color: "#3b82f6",
          bgColor: "rgba(59, 130, 246, 0.1)",
          borderColor: "rgba(59, 130, 246, 0.3)",
          icon: Info,
          label: "Bilgilendirme",
        }
    }
  }

  if (loading || !currentAnnouncement) return null

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
            onClick={() => dismissCurrent(false)}
          />

          {/* Popup */}
          <motion.div
            className="fixed top-1/2 left-1/2 w-full max-w-md z-[101] p-6 rounded-3xl"
            style={{
              background: "#0a0a0a",
              border: `1px solid ${config.borderColor}`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${config.color}15`,
              x: "-50%",
              y: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.9, y: "-45%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: "-45%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
                onClick={() => dismissCurrent(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            {/* Content */}
            <div
              className="p-4 rounded-2xl mb-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-sm text-neutral-300 leading-relaxed">{currentAnnouncement.content}</p>
            </div>

            {/* Display mode indicator */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <Bell className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-[11px] text-neutral-500">
                {currentAnnouncement.displayMode === "EVERY_LOGIN"
                  ? "Bu duyuru her girişte gösterilir"
                  : "Bu duyuru sadece bir kez gösterilir"}
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-[11px] text-neutral-500">
                <span>{new Date(currentAnnouncement.createdAt).toLocaleDateString("tr-TR")}</span>
              </div>

              {announcements.length > 1 && (
                <div className="flex items-center gap-1.5">
                  {announcements.map((_, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full transition-colors"
                      style={{
                        background: idx === currentIndex ? config.color : "rgba(255,255,255,0.2)",
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
                style={{ background: "rgba(255,255,255,0.05)", color: "#a3a3a3" }}
              >
                Kapat
              </button>
              <motion.button
                onClick={() => dismissCurrent(true)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  color: "#10b981",
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
                style={{ background: "rgba(255,255,255,0.03)", color: "#737373" }}
              >
                Tümünü okudum olarak işaretle ({announcements.length} duyuru)
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

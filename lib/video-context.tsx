"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface VideoContextType {
  activeVideoId: string | null
  focusedCardId: string | null
  setActiveVideo: (id: string | null) => void
  setFocusedCard: (id: string | null) => void
  stopAllVideos: () => void
}

const VideoContext = createContext<VideoContextType | null>(null)

export function VideoProvider({ children }: { children: ReactNode }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null)

  const setActiveVideo = useCallback((id: string | null) => {
    setActiveVideoId(id)
  }, [])

  const setFocusedCard = useCallback((id: string | null) => {
    setFocusedCardId(id)
  }, [])

  const stopAllVideos = useCallback(() => {
    setActiveVideoId(null)
    setFocusedCardId(null)
  }, [])

  return (
    <VideoContext.Provider value={{ 
      activeVideoId, 
      focusedCardId, 
      setActiveVideo, 
      setFocusedCard,
      stopAllVideos 
    }}>
      {children}
    </VideoContext.Provider>
  )
}

export function useVideoContext() {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error("useVideoContext must be used within VideoProvider")
  }
  return context
}

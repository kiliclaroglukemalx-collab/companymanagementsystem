"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Brand } from '@/lib/dashboard-data'

interface SiteContextType {
  selectedSite: Brand | null
  setSelectedSite: (site: Brand) => void
  isLoading: boolean
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)

export function SiteProvider({ 
  children,
  initialSite 
}: { 
  children: ReactNode
  initialSite: Brand
}) {
  const [selectedSite, setSelectedSiteState] = useState<Brand>(initialSite)
  const [isLoading, setIsLoading] = useState(false)

  const setSelectedSite = useCallback((site: Brand) => {
    setIsLoading(true)
    // Simulate a brief transition for smooth UX
    setTimeout(() => {
      setSelectedSiteState(site)
      setIsLoading(false)
    }, 150)
  }, [])

  return (
    <SiteContext.Provider value={{ selectedSite, setSelectedSite, isLoading }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const context = useContext(SiteContext)
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider')
  }
  return context
}

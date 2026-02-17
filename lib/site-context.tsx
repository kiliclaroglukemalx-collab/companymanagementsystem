"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from 'react'
import { Brand, brands } from '@/lib/dashboard-data'

type ApiSite = {
  id: string
  name: string
  _count?: {
    users?: number
  }
}

const SITE_COLOR_PALETTE = [
  '#3b82f6',
  '#f59e0b',
  '#10b981',
  '#ec4899',
  '#eab308',
  '#06b6d4',
  '#8b5cf6',
  '#ef4444',
  '#a855f7',
  '#f97316',
  '#14b8a6',
  '#6366f1',
]

function stringHash(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '')
  const bigint = Number.parseInt(normalized, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function mapSiteToBrand(site: ApiSite): Brand {
  const colorIndex = stringHash(site.id || site.name) % SITE_COLOR_PALETTE.length
  const themeColor = SITE_COLOR_PALETTE[colorIndex]

  return {
    id: site.id,
    name: site.name,
    status: (site._count?.users ?? 0) > 0 ? 'active' : 'inactive',
    themeColor,
    rgbGlow: hexToRgba(themeColor, 0.8),
  }
}

interface SiteContextType {
  selectedSite: Brand
  sites: Brand[]
  setSelectedSite: (site: Brand) => void
  refreshSites: () => Promise<void>
  isLoading: boolean
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)

export function SiteProvider({ 
  children,
  initialSite = brands[0],
}: { 
  children: ReactNode
  initialSite?: Brand
}) {
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [selectedSite, setSelectedSiteState] = useState<Brand>(initialSite)
  const [sites, setSites] = useState<Brand[]>([initialSite])
  const [isLoading, setIsLoading] = useState(false)

  const refreshSites = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/sites', { cache: 'no-store' })
      if (!response.ok) {
        setSites(brands)
        setSelectedSiteState((current) => brands.find((site) => site.id === current.id) ?? brands[0])
        return
      }

      const payload = await response.json()
      const apiSites: ApiSite[] = Array.isArray(payload?.sites) ? payload.sites : []
      if (apiSites.length === 0) return

      const mappedSites = apiSites.map(mapSiteToBrand)
      setSites(mappedSites)
      setSelectedSiteState((current) => mappedSites.find((site) => site.id === current.id) ?? mappedSites[0])
    } catch (error) {
      console.error('[site-context] Failed to refresh sites', error)
      setSites(brands)
      setSelectedSiteState((current) => brands.find((site) => site.id === current.id) ?? brands[0])
    }
  }, [])

  useEffect(() => {
    void refreshSites()
  }, [refreshSites])

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  const setSelectedSite = useCallback((site: Brand) => {
    const nextSite = sites.find((item) => item.id === site.id)
    if (!nextSite) return

    setIsLoading(true)

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    // Simulate a brief transition for smooth UX.
    transitionTimeoutRef.current = setTimeout(() => {
      setSelectedSiteState(nextSite)
      setIsLoading(false)
      transitionTimeoutRef.current = null
    }, 150)
  }, [sites])

  return (
    <SiteContext.Provider value={{ selectedSite, sites, setSelectedSite, refreshSites, isLoading }}>
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

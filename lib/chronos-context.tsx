"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'

interface ChronosContextType {
  // Current selected hour (can be different from real time when user drags timeline)
  selectedHour: number
  setSelectedHour: (hour: number) => void
  
  // Real current hour (system time)
  realHour: number
  
  // Active personnel count at selected hour (updates when timeline changes)
  activePersonnelCount: number
  updateActivePersonnelCount: (count: number) => void
  
  // Department-wise active counts
  departmentActiveCounts: Record<string, number>
  updateDepartmentActiveCount: (deptId: string, count: number) => void
  
  // Countdown timer for spring back to real time
  countdown: number
  setCountdown: (value: number) => void
  
  // Editing permissions for managers
  editingPermission: {
    hasPermission: boolean
    expiresAt: Date | null
    allowedStartHour: number | null
    allowedEndHour: number | null
  }
  grantEditingPermission: (startHour: number, endHour: number, durationMinutes: number) => void
  revokeEditingPermission: () => void
  
  // Master Panel settings
  masterPanelSettings: {
    minEditableHour: number
    maxEditableHour: number
    requiresApproval: boolean
  }
  updateMasterPanelSettings: (settings: Partial<ChronosContextType['masterPanelSettings']>) => void
}

const ChronosContext = createContext<ChronosContextType | undefined>(undefined)

export function ChronosProvider({ children }: { children: ReactNode }) {
  const [realHour, setRealHour] = useState(() => new Date().getHours())
  const [selectedHour, setSelectedHour] = useState(() => new Date().getHours())
  const [activePersonnelCount, setActivePersonnelCount] = useState(0)
  const [departmentActiveCounts, setDepartmentActiveCounts] = useState<Record<string, number>>({})
  const [countdown, setCountdown] = useState(0)
  
  // Editing permission state
  const [editingPermission, setEditingPermission] = useState({
    hasPermission: false,
    expiresAt: null as Date | null,
    allowedStartHour: null as number | null,
    allowedEndHour: null as number | null,
  })
  
  // Master Panel settings (default values)
  const [masterPanelSettings, setMasterPanelSettings] = useState({
    minEditableHour: 6,  // 06:00
    maxEditableHour: 23, // 23:00
    requiresApproval: true,
  })

  // Update real time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setRealHour(new Date().getHours())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Check if editing permission has expired
  useEffect(() => {
    if (editingPermission.hasPermission && editingPermission.expiresAt) {
      const checkExpiration = setInterval(() => {
        if (new Date() >= editingPermission.expiresAt!) {
          setEditingPermission({
            hasPermission: false,
            expiresAt: null,
            allowedStartHour: null,
            allowedEndHour: null,
          })
        }
      }, 1000)
      return () => clearInterval(checkExpiration)
    }
  }, [editingPermission])

  const updateActivePersonnelCount = useCallback((count: number) => {
    setActivePersonnelCount(count)
  }, [])

  const updateDepartmentActiveCount = useCallback((deptId: string, count: number) => {
    setDepartmentActiveCounts(prev => ({
      ...prev,
      [deptId]: count,
    }))
  }, [])

  const grantEditingPermission = useCallback((
    startHour: number, 
    endHour: number, 
    durationMinutes: number = 30
  ) => {
    const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000)
    setEditingPermission({
      hasPermission: true,
      expiresAt,
      allowedStartHour: startHour,
      allowedEndHour: endHour,
    })
  }, [])

  const revokeEditingPermission = useCallback(() => {
    setEditingPermission({
      hasPermission: false,
      expiresAt: null,
      allowedStartHour: null,
      allowedEndHour: null,
    })
  }, [])

  const updateMasterPanelSettings = useCallback((
    settings: Partial<ChronosContextType['masterPanelSettings']>
  ) => {
    setMasterPanelSettings(prev => ({
      ...prev,
      ...settings,
    }))
  }, [])

  return (
    <ChronosContext.Provider
      value={{
        selectedHour,
        setSelectedHour,
        realHour,
        activePersonnelCount,
        updateActivePersonnelCount,
        departmentActiveCounts,
        updateDepartmentActiveCount,
        countdown,
        setCountdown,
        editingPermission,
        grantEditingPermission,
        revokeEditingPermission,
        masterPanelSettings,
        updateMasterPanelSettings,
      }}
    >
      {children}
    </ChronosContext.Provider>
  )
}

export function useChronos() {
  const context = useContext(ChronosContext)
  if (context === undefined) {
    throw new Error('useChronos must be used within a ChronosProvider')
  }
  return context
}

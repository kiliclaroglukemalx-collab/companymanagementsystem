"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Theme definitions
export const femaleThemes = [
  { id: 'f1', name: 'Gul Bahcesi', gradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 50%, #f48fb1 100%)', primary: '#ec407a', textDark: true },
  { id: 'f2', name: 'Lavanta Ruyasi', gradient: 'linear-gradient(135deg, #ede7f6 0%, #d1c4e9 50%, #b39ddb 100%)', primary: '#7e57c2', textDark: true },
  { id: 'f3', name: 'Seftali Gunbatimi', gradient: 'linear-gradient(135deg, #fff3e0 0%, #ffccbc 50%, #ffab91 100%)', primary: '#ff7043', textDark: true },
  { id: 'f4', name: 'Sakura', gradient: 'linear-gradient(135deg, #ffeef8 0%, #ffb6c1 50%, #ff69b4 100%)', primary: '#ff1493', textDark: true },
  { id: 'f5', name: 'Mint Ferahligi', gradient: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 50%, #80cbc4 100%)', primary: '#26a69a', textDark: true },
  { id: 'f6', name: 'Pembe Kristal', gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d1f3d 50%, #4a1942 100%)', primary: '#ff6b9d', textDark: false },
  { id: 'f7', name: 'Mor Gece', gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', primary: '#a855f7', textDark: false },
  { id: 'f8', name: 'Coral Essence', gradient: 'linear-gradient(135deg, #2c1810 0%, #4a2c2a 50%, #5d3a3a 100%)', primary: '#ff6b6b', textDark: false },
  { id: 'f9', name: 'Berry Dream', gradient: 'linear-gradient(135deg, #1f1c2c 0%, #3a2d4d 50%, #553c5c 100%)', primary: '#c471ed', textDark: false },
  { id: 'f10', name: 'Rose Gold', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2a2e 50%, #3d3035 100%)', primary: '#f4a0a0', textDark: false },
]

export const maleThemes = [
  { id: 'm1', name: 'Okyanus Derinligi', gradient: 'linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #2c5282 100%)', primary: '#4299e1', textDark: false },
  { id: 'm2', name: 'Karanlik Orman', gradient: 'linear-gradient(135deg, #0a0f0d 0%, #1a2f23 50%, #2d4a3e 100%)', primary: '#48bb78', textDark: false },
  { id: 'm3', name: 'Celik Grisi', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 50%, #434343 100%)', primary: '#a0aec0', textDark: false },
  { id: 'm4', name: 'Gece Mavisi', gradient: 'linear-gradient(135deg, #000428 0%, #001f54 50%, #034078 100%)', primary: '#63b3ed', textDark: false },
  { id: 'm5', name: 'Karbon', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #262626 100%)', primary: '#ed8936', textDark: false },
  { id: 'm6', name: 'Buz Dagı', gradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)', primary: '#1976d2', textDark: true },
  { id: 'm7', name: 'Kum Firtinasi', gradient: 'linear-gradient(135deg, #faf3e0 0%, #e8d5b7 50%, #d4b896 100%)', primary: '#8d6e63', textDark: true },
  { id: 'm8', name: 'Arctic', gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 50%, #a8b5c7 100%)', primary: '#546e7a', textDark: true },
  { id: 'm9', name: 'Volkanik', gradient: 'linear-gradient(135deg, #1a0a0a 0%, #3d1515 50%, #5c1f1f 100%)', primary: '#e53935', textDark: false },
  { id: 'm10', name: 'Cyberpunk', gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #16213e 100%)', primary: '#00d9ff', textDark: false },
]

export const allThemes = [...femaleThemes, ...maleThemes]

export interface ThemeSettings {
  themeId: string | null
  sidebarPosition: 'left' | 'right'
  viewMode: 'comfortable' | 'compact'
  fontSize: 'small' | 'medium' | 'large'
  animationsEnabled: boolean
  defaultPage: string
  cardStyle: 'grid' | 'list'
}

const defaultSettings: ThemeSettings = {
  themeId: null,
  sidebarPosition: 'left',
  viewMode: 'comfortable',
  fontSize: 'medium',
  animationsEnabled: true,
  defaultPage: 'dashboard',
  cardStyle: 'grid'
}

interface ThemeContextType {
  settings: ThemeSettings
  currentTheme: typeof allThemes[0] | null
  updateSettings: (newSettings: Partial<ThemeSettings>) => void
  applyTheme: (themeId: string | null) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings)
  const [mounted, setMounted] = useState(false)

  const currentTheme = settings.themeId ? allThemes.find(t => t.id === settings.themeId) || null : null

  // Load settings from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('panelSettings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSettings(prev => ({ ...prev, ...parsed }))
      } catch (e) {
        console.log('[v0] Failed to load theme settings')
      }
    }
  }, [])

  // Apply theme whenever it changes
  useEffect(() => {
    if (!mounted) return
    
    if (currentTheme) {
      document.documentElement.style.setProperty('--theme-gradient', currentTheme.gradient)
      document.documentElement.style.setProperty('--theme-primary', currentTheme.primary)
      document.documentElement.setAttribute('data-theme-dark', currentTheme.textDark ? 'false' : 'true')
    } else {
      document.documentElement.style.removeProperty('--theme-gradient')
      document.documentElement.style.removeProperty('--theme-primary')
      document.documentElement.removeAttribute('data-theme-dark')
    }
  }, [currentTheme, mounted])

  // Apply font size
  useEffect(() => {
    if (!mounted) return
    const scale = settings.fontSize === 'small' ? '0.9' : settings.fontSize === 'large' ? '1.1' : '1'
    document.documentElement.style.setProperty('--font-scale', scale)
  }, [settings.fontSize, mounted])

  // Apply animations setting
  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-animations', settings.animationsEnabled ? 'true' : 'false')
  }, [settings.animationsEnabled, mounted])

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings }
      localStorage.setItem('panelSettings', JSON.stringify(updated))
      return updated
    })
  }

  const applyTheme = (themeId: string | null) => {
    updateSettings({ themeId })
  }

  return (
    <ThemeContext.Provider value={{ settings, currentTheme, updateSettings, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

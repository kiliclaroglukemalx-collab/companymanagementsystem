"use client"

import { useEffect } from "react"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, 
  Shield, 
  Bell, 
  Users, 
  KeyRound, 
  Upload, 
  FileText, 
  Clock,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Building2,
  Camera,
  Check,
  AlertTriangle,
  Info,
  Settings,
  Crown,
  X,
  LogOut,
  KeySquare,
  Smartphone,
  ChevronDown,
  UserMinus,
  History,
  ShieldAlert,
  Pause,
  Play,
  Calendar,
  CalendarDays,
  Banknote,
  Send,
  ChevronLeft,
  Briefcase,
  Globe,
  Inbox,
  CheckCheck,
  Trash2,
  Palette,
  Monitor,
  Moon,
  Sun,
  Sparkles,
  Layout,
  Type,
  Zap,
  Home,
  Grid,
  List,
  PanelLeft,
  PanelRight,
  Percent,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import Image from "next/image"
import { useTheme, femaleThemes, maleThemes } from "@/lib/theme-context"

// isManagementUser removed - now handled via isSuperAdmin React state in SettingsPanel

// Global management notification events (mock)
interface ManagementEvent {
  id: string
  type: 'security' | 'user' | 'system'
  action: string
  target: string
  admin: string
  timestamp: Date
  details?: string
}

// Create a simple event emitter for cross-component communication
const managementEvents: ManagementEvent[] = []

const addManagementEvent = (event: Omit<ManagementEvent, 'id' | 'timestamp'>) => {
  managementEvents.unshift({
    ...event,
    id: `evt-${Date.now()}`,
    timestamp: new Date(),
  })
}

// User data with extended security info
interface UserData {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'suspended'
  suspendedUntil?: Date
  suspendReason?: string
  twoFactorEnabled: boolean
  twoFactorRequired: boolean
  lastLogin: Date
  forcePasswordChange: boolean
  activeSessions: number
}

const mockUserData: UserData[] = [
  { 
    id: 'u1', 
    name: 'Mehmet Kaya', 
    email: 'mehmet.kaya@sirket.com',
    role: 'Birim Muduru', 
    department: 'Finans', 
    status: 'active',
    twoFactorEnabled: true,
    twoFactorRequired: false,
    lastLogin: new Date('2026-01-29T14:30:00'),
    forcePasswordChange: false,
    activeSessions: 2
  },
  { 
    id: 'u2', 
    name: 'Ayse Demir', 
    email: 'ayse.demir@sirket.com',
    role: 'Personel', 
    department: 'Risk', 
    status: 'active',
    twoFactorEnabled: false,
    twoFactorRequired: false,
    lastLogin: new Date('2026-01-30T09:15:00'),
    forcePasswordChange: false,
    activeSessions: 1
  },
  { 
    id: 'u3', 
    name: 'Can Ozturk', 
    email: 'can.ozturk@sirket.com',
    role: 'Personel', 
    department: 'Bonus', 
    status: 'suspended',
    suspendedUntil: new Date('2026-02-05'),
    suspendReason: 'Guvenlik ihlali',
    twoFactorEnabled: true,
    twoFactorRequired: true,
    lastLogin: new Date('2026-01-25T11:00:00'),
    forcePasswordChange: true,
    activeSessions: 0
  },
  { 
    id: 'u4', 
    name: 'Elif Yildiz', 
    email: 'elif.yildiz@sirket.com',
    role: 'Genel Mudur', 
    department: 'Yonetim', 
    status: 'active',
    twoFactorEnabled: true,
    twoFactorRequired: true,
    lastLogin: new Date('2026-01-30T08:00:00'),
    forcePasswordChange: false,
    activeSessions: 3
  },
]

// Mock audit log for users
interface AuditEntry {
  id: string
  date: Date
  admin: string
  action: string
  reason?: string
}

const getMockAuditLog = (userId: string): AuditEntry[] => {
  return [
    { id: 'a1', date: new Date('2026-01-28T10:30:00'), admin: 'Ahmet Yilmaz', action: 'Rol degistirildi: Personel -> Birim Muduru', reason: 'Terfi' },
    { id: 'a2', date: new Date('2026-01-20T14:15:00'), admin: 'Sistem', action: '2FA aktif edildi', reason: undefined },
    { id: 'a3', date: new Date('2026-01-15T09:00:00'), admin: 'Ahmet Yilmaz', action: 'Hesap olusturuldu', reason: 'Yeni ise alim' },
  ]
}

interface TabItem {
  id: string
  label: string
  icon: React.ElementType
  isAdminOnly?: boolean
}

const tabs: TabItem[] = [
  { id: "profil", label: "Profil", icon: User },
  { id: "guvenlik", label: "Guvenlik", icon: Shield },
  { id: "bildirimler", label: "Bildirimler", icon: Bell },
  { id: "ozellestirme", label: "Ozellestirme", icon: Palette },
  { id: "taleplerim", label: "Taleplerim", icon: FileText },
  // Admin-only tabs
  { id: "yonetim-bildirim", label: "Yonetim Bildirim Merkezi", icon: Crown, isAdminOnly: true },
  { id: "site-yonetimi", label: "Site Yonetimi", icon: Building2, isAdminOnly: true },
  { id: "kullanicilar", label: "Kullanicilar", icon: Users, isAdminOnly: true },
  { id: "yetkilendirme", label: "Yetkilendirme", icon: KeyRound, isAdminOnly: true },
  { id: "veri-yukleme", label: "Veri Yukleme Merkezi", icon: Upload, isAdminOnly: true },
  { id: "guvenlik-politikalari", label: "Guvenlik Politikalari", icon: FileText, isAdminOnly: true },
  { id: "giris-kayitlari", label: "Giris Kayitlari", icon: Clock, isAdminOnly: true },
]

// Profile Tab Content
function ProfilContent() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (!file) return
    
    // Validate file type
    if (!file.type.match(/^image\/(png|svg\+xml)$/)) {
      alert('Sadece PNG veya SVG dosyalari yuklenebilir')
      return
    }
    
    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Dosya boyutu 2MB\'dan kucuk olmali')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const removeLogo = () => {
    setLogoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-8">
      {/* Site Logo Section */}
      <div 
        className="p-5 rounded-2xl"
        style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(168, 85, 247, 0.15)" }}>
            <Building2 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Site Logosu</h4>
            <p className="text-xs text-neutral-500 mt-0.5">Sitenize ait logo gorseli</p>
          </div>
        </div>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileSelect(file)
          }}
        />

        {logoPreview ? (
          // Logo Preview
          <div className="flex items-center gap-4">
            <div 
              className="w-24 h-24 rounded-xl overflow-hidden flex items-center justify-center"
              style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
            >
              <Image 
                src={logoPreview || "/placeholder.svg"} 
                alt="Site Logo" 
                width={96} 
                height={96} 
                className="object-contain w-full h-full p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                style={{ background: "rgba(168, 85, 247, 0.15)", color: "#a855f7", border: "1px solid rgba(168, 85, 247, 0.3)" }}
              >
                Degistir
              </button>
              <button
                onClick={removeLogo}
                className="px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)" }}
              >
                Kaldir
              </button>
            </div>
          </div>
        ) : (
          // Upload Area
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className="w-full h-36 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
            style={{ 
              background: isDragging ? "rgba(168, 85, 247, 0.1)" : "rgba(255, 255, 255, 0.03)", 
              border: isDragging ? "2px dashed rgba(168, 85, 247, 0.5)" : "1px dashed rgba(255, 255, 255, 0.1)" 
            }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(168, 85, 247, 0.1)" }}
            >
              <Upload className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-center">
              <p className="text-sm text-white font-medium">
                {isDragging ? "Birakin" : "Tiklayin veya surukleyin"}
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">PNG veya SVG, max 2MB, 200x200px onerilen</p>
            </div>
          </div>
        )}
      </div>

      {/* Profile Form - Simplified */}
      <div className="space-y-5">
        <InputField label="Kullanici Adi" defaultValue="Ahmet Yilmaz" icon={User} />
        <InputField label="Departman" defaultValue="Risk Yonetimi" icon={Building2} disabled />
        <InputField label="E-posta" defaultValue="ahmet.yilmaz@sirket.com" icon={Mail} />
      </div>

      {/* Logout Section */}
      <div 
        className="p-5 rounded-2xl"
        style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(239, 68, 68, 0.15)" }}>
              <LogOut className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Oturumu Kapat</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Bu cihazdan cikis yap</p>
            </div>
          </div>
          <button
            onClick={async () => {
              if (confirm('Cikis yapmak istediginize emin misiniz?')) {
                try {
                  const res = await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                  })
                  if (res.ok) {
                    window.location.href = '/login'
                  } else {
                    alert('Cikis yapilamadi. Lutfen tekrar deneyin.')
                  }
                } catch (error) {
                  console.error('Logout error:', error)
                  alert('Bir hata olustu. Lutfen tekrar deneyin.')
                }
              }
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ 
              background: "rgba(239, 68, 68, 0.15)", 
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)"
            }}
          >
            Cikis Yap
          </button>
        </div>
      </div>

      <SaveButton />
    </div>
  )
}

// Security Tab Content
function GuvenlikContent() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-8">
      {/* Password Section */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-400" />
          Sifre Degistir
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <InputField 
              label="Mevcut Sifre" 
              type={showPassword ? "text" : "password"}
              placeholder="********"
            />
            <button 
              className="absolute right-4 top-9 text-neutral-500 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <InputField label="Yeni Sifre" type="password" placeholder="********" />
          <InputField label="Yeni Sifre (Tekrar)" type="password" placeholder="********" />
        </div>
      </div>

      {/* Two Factor */}
      <div 
        className="p-5 rounded-2xl"
        style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16, 185, 129, 0.15)" }}>
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Iki Faktorlu Dogrulama</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Hesabinizi ek guvenlik katmaniyla koruyun</p>
            </div>
          </div>
          <ToggleSwitch defaultChecked />
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Aktif Oturumlar</h3>
        <div className="space-y-3">
          <SessionItem device="MacBook Pro" location="Istanbul, TR" current />
          <SessionItem device="iPhone 15 Pro" location="Istanbul, TR" />
          <SessionItem device="Windows PC" location="Ankara, TR" />
        </div>
      </div>

      <SaveButton />
    </div>
  )
}

// User role check for showing shift notifications
const canSeeShiftNotifications = (role: string) => {
  return ['Admin', 'Genel Mudur', 'Birim Muduru', 'Mudur'].includes(role)
}

// Mock current user role
const currentUserRole = 'Birim Muduru'

// User Notifications Store (for received announcements)
interface UserNotification {
  id: string
  announcementId: string
  title: string
  content: string
  severity: 'info' | 'warning' | 'critical'
  isRead: boolean
  receivedAt: Date
  createdBy: string
}

const userNotificationsStore: UserNotification[] = [
  {
    id: 'notif-1',
    announcementId: 'ann1',
    title: 'Sistem Bakimi Duyurusu',
    content: 'Yarin 02:00-04:00 arasi planlı sistem bakimi yapilacaktir.',
    severity: 'warning',
    isRead: false,
    receivedAt: new Date('2026-01-29T10:00:00'),
    createdBy: 'Ahmet Yilmaz',
  },
  {
    id: 'notif-2',
    announcementId: 'ann2',
    title: 'Yeni Performans Modulu',
    content: 'Arena bolumu yeni ozelliklerle guncellendi. Artik detayli performans analizleri yapabilirsiniz.',
    severity: 'info',
    isRead: false,
    receivedAt: new Date('2026-01-28T14:30:00'),
    createdBy: 'Sistem',
  },
  {
    id: 'notif-3',
    announcementId: 'ann3',
    title: 'Guvenlik Guncellemesi',
    content: 'Hesap guvenliginizi artirmak icin iki faktorlu dogrulama aktif edildi.',
    severity: 'critical',
    isRead: true,
    receivedAt: new Date('2026-01-25T09:00:00'),
    createdBy: 'Guvenlik Ekibi',
  },
  {
    id: 'notif-4',
    announcementId: 'ann4',
    title: 'Mesai Degisikligi Bildirimi',
    content: 'Subat ayi mesai cizelgesi guncellendi. Lutfen kontrol ediniz.',
    severity: 'info',
    isRead: true,
    receivedAt: new Date('2026-01-22T16:00:00'),
    createdBy: 'IK Departmani',
  },
]

// Notifications Tab Content - Redesigned with Notification Center
function BildirimlerContent() {
  const [activeSection, setActiveSection] = useState<'inbox' | 'settings'>('inbox')
  const [userNotifications, setUserNotifications] = useState<UserNotification[]>(userNotificationsStore)
  const [selectedNotification, setSelectedNotification] = useState<UserNotification | null>(null)
  const [notifications, setNotifications] = useState({
    importantUpdates: true,
    securityAlerts: true,
    newFeatures: false,
    teamActivities: false,
    shiftChanges: true,
  })
  const [preferences, setPreferences] = useState<any>(null)
  const [loadingPreferences, setLoadingPreferences] = useState(true)

  // Load notification preferences from API
  useEffect(() => {
    loadPreferences()
  }, [])

  const loadPreferences = async () => {
    try {
      const response = await fetch('/api/notifications/preferences')
      if (response.ok) {
        const data = await response.json()
        setPreferences(data.preferences)
      }
    } catch (error) {
      console.error('Failed to load preferences:', error)
    } finally {
      setLoadingPreferences(false)
    }
  }

  const updatePreference = async (key: string, value: boolean) => {
    try {
      const payload = { [key]: value }
      const response = await fetch('/api/notifications/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      
      if (response.ok) {
        const data = await response.json()
        setPreferences(data.preferences)
      }
    } catch (error) {
      console.error('Failed to update preference:', error)
    }
  }

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const showShiftOption = canSeeShiftNotifications(currentUserRole)

  const unreadCount = userNotifications.filter(n => !n.isRead).length

  const markAsRead = (id: string) => {
    setUserNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  const markAllAsRead = () => {
    setUserNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setUserNotifications(prev => prev.filter(n => n.id !== id))
    setSelectedNotification(null)
  }

  const getSeverityConfig = (severity: 'info' | 'warning' | 'critical') => {
    switch (severity) {
      case 'critical': return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: AlertTriangle, label: 'Kritik' }
      case 'warning': return { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', icon: AlertTriangle, label: 'Uyari' }
      default: return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', icon: Info, label: 'Bilgi' }
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Bugun'
    if (days === 1) return 'Dun'
    if (days < 7) return `${days} gun once`
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="space-y-6">
      {/* Header with Tab Switch */}
      <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
            <Bell className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Bildirim Merkezi</h3>
            <p className="text-[11px] text-neutral-500">Gelen duyurular ve bildirim tercihleri</p>
          </div>
        </div>

        {/* Section Toggle */}
        <div 
          className="flex p-1 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={() => setActiveSection('inbox')}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2"
            style={{
              background: activeSection === 'inbox' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
              color: activeSection === 'inbox' ? '#a855f7' : '#737373',
            }}
          >
            <Inbox size={14} />
            Gelen Kutusu
            {unreadCount > 0 && (
              <span 
                className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                style={{ background: '#ef4444', color: 'white' }}
              >
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSection('settings')}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2"
            style={{
              background: activeSection === 'settings' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
              color: activeSection === 'settings' ? '#a855f7' : '#737373',
            }}
          >
            <Settings size={14} />
            Tercihler
          </button>
        </div>
      </div>

      {/* Inbox Section */}
      {activeSection === 'inbox' && (
        <div className="space-y-4">
          {/* Inbox Header */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500">{userNotifications.length} bildirim, {unreadCount} okunmamis</p>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[11px] font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
              >
                <CheckCheck size={12} />
                Tumunu okundu isaretle
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="grid grid-cols-1 gap-3">
            {userNotifications.length === 0 ? (
              <div 
                className="p-8 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                  <Inbox className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-sm text-neutral-400">Bildirim kutunuz bos</p>
                <p className="text-[11px] text-neutral-600 mt-1">Yeni duyurular burada gorunecek</p>
              </div>
            ) : (
              userNotifications.map(notif => {
                const config = getSeverityConfig(notif.severity)
                const SeverityIcon = config.icon
                return (
                  <motion.button
                    key={notif.id}
                    onClick={() => {
                      setSelectedNotification(notif)
                      markAsRead(notif.id)
                    }}
                    className="w-full p-4 rounded-xl text-left transition-all relative overflow-hidden"
                    style={{ 
                      background: notif.isRead ? 'rgba(255,255,255,0.02)' : config.bg,
                      border: `1px solid ${notif.isRead ? 'rgba(255,255,255,0.06)' : config.color}40`,
                    }}
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* Unread Indicator */}
                    {!notif.isRead && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                        style={{ background: config.color }}
                      />
                    )}

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: config.bg }}
                      >
                        <SeverityIcon size={16} style={{ color: config.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`text-sm font-medium truncate ${notif.isRead ? 'text-neutral-400' : 'text-white'}`}>
                            {notif.title}
                          </p>
                          <span 
                            className="px-1.5 py-0.5 rounded text-[8px] font-semibold flex-shrink-0"
                            style={{ background: config.bg, color: config.color }}
                          >
                            {config.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-1">{notif.content}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] text-neutral-600">{notif.createdBy}</span>
                          <span className="text-[10px] text-neutral-600">{formatDate(notif.receivedAt)}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-neutral-600 flex-shrink-0" />
                    </div>
                  </motion.button>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Settings Section */}
      {activeSection === 'settings' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {loadingPreferences ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-neutral-500">Yükleniyor...</p>
            </div>
          ) : (
            <>
              {/* System Notifications Section */}
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-neutral-500 tracking-wider">SISTEM DUYURULARI</p>
                <div 
                  className="p-4 rounded-xl"
                  style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white mb-1">Kritik Duyurular</h4>
                      <p className="text-xs text-neutral-400">
                        Kritik önem seviyesindeki duyurular her zaman gösterilir ve kapatılamaz. 
                        Bu, sistem güvenliği ve acil güncellemeler içindir.
                      </p>
                    </div>
                    <div 
                      className="px-3 py-1 rounded-lg text-[10px] font-bold"
                      style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                    >
                      ZORUNLU
                    </div>
                  </div>
                </div>
              </div>

              {/* User Preference Controls */}
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-neutral-500 tracking-wider">BILDIRIM TERCIHLERI</p>
                
                {/* Disable Popups */}
                <NotificationToggleRow
                  icon={<Bell className="w-4 h-4" />}
                  label="Popup Bildirimleri"
                  description="Ana sayfada açılan bildirim popup'larını göster"
                  checked={!preferences?.disablePopups}
                  onChange={() => updatePreference('disablePopups', !preferences?.disablePopups)}
                  optional
                />

                {/* Info Notifications */}
                <NotificationToggleRow
                  icon={<Info className="w-4 h-4" />}
                  label="Bilgilendirme Duyuruları"
                  description="Genel bilgi ve güncellemeler"
                  checked={!preferences?.disableInfoNotifications}
                  onChange={() => updatePreference('disableInfoNotifications', !preferences?.disableInfoNotifications)}
                  optional
                />

                {/* Warning Notifications */}
                <NotificationToggleRow
                  icon={<AlertTriangle className="w-4 h-4" />}
                  label="Uyarı Duyuruları"
                  description="Önemli uyarılar ve dikkat gerektiren durumlar"
                  checked={!preferences?.disableWarningNotifications}
                  onChange={() => updatePreference('disableWarningNotifications', !preferences?.disableWarningNotifications)}
                  optional
                />
              </div>

              {/* Legacy Settings (kept for backward compatibility) */}
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-neutral-500 tracking-wider">DIĞER BILDIRIMLER</p>
                <NotificationToggleRow
                  icon={<Shield className="w-4 h-4" />}
                  label="Güvenlik uyarıları"
                  description="Hesap ve sistem güvenlik bildirimleri"
                  checked={notifications.securityAlerts}
                  onChange={() => toggleNotification('securityAlerts')}
                  required
                />
                <NotificationToggleRow
                  icon={<Bell className="w-4 h-4" />}
                  label="Yeni özellikler"
                  description="Platform yenilikleri hakkında bilgi"
                  checked={notifications.newFeatures}
                  onChange={() => toggleNotification('newFeatures')}
                  optional
                />
                <NotificationToggleRow
                  icon={<Users className="w-4 h-4" />}
                  label="Ekip aktiviteleri"
                  description="Departman ve takım bildirimleri"
                  checked={notifications.teamActivities}
                  onChange={() => toggleNotification('teamActivities')}
                  optional
                />
                {showShiftOption && (
                  <NotificationToggleRow
                    icon={<Clock className="w-4 h-4" />}
                    label="Vardiya değişiklikleri"
                    description="Mesai takvimi ve vardiya güncellemeleri"
                    checked={notifications.shiftChanges}
                    onChange={() => toggleNotification('shiftChanges')}
                  />
                )}
              </div>

              {/* Help Text */}
              <div 
                className="p-4 rounded-xl"
                style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}
              >
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-neutral-400">
                    <p className="mb-2">
                      <strong className="text-blue-400">Not:</strong> Kritik önem seviyesindeki duyurular, 
                      tercihlerinize bakılmaksızın her zaman gösterilir. Bu ayarlar sadece bilgi ve uyarı 
                      seviyesindeki duyurular için geçerlidir.
                    </p>
                    <p>
                      Yönetici tarafından gönderilen özel hedefli duyurular da tercihlerinizden bağımsız olarak 
                      size ulaştırılabilir.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Notification Detail Modal */}
      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            onClick={() => setSelectedNotification(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl overflow-hidden"
              style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div 
                className="p-5 flex items-start justify-between"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: getSeverityConfig(selectedNotification.severity).bg }}
                  >
                    {(() => {
                      const Icon = getSeverityConfig(selectedNotification.severity).icon
                      return <Icon size={18} style={{ color: getSeverityConfig(selectedNotification.severity).color }} />
                    })()}
                  </div>
                  <div>
                    <span 
                      className="px-2 py-0.5 rounded text-[9px] font-semibold mb-1 inline-block"
                      style={{ 
                        background: getSeverityConfig(selectedNotification.severity).bg, 
                        color: getSeverityConfig(selectedNotification.severity).color 
                      }}
                    >
                      {getSeverityConfig(selectedNotification.severity).label.toUpperCase()}
                    </span>
                    <h3 className="text-base font-semibold text-white">{selectedNotification.title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="p-2 rounded-lg transition-colors hover:bg-white/5"
                >
                  <X size={18} className="text-neutral-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-5">
                <div 
                  className="p-4 rounded-xl mb-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="text-sm text-neutral-300 leading-relaxed">{selectedNotification.content}</p>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-neutral-500">
                  <span>Gonderen: {selectedNotification.createdBy}</span>
                  <span>{selectedNotification.receivedAt.toLocaleDateString('tr-TR', { 
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                  })}</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div 
                className="p-4 flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              >
                <button
                  onClick={() => deleteNotification(selectedNotification.id)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2"
                  style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                >
                  <Trash2 size={14} />
                  Sil
                </button>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="px-5 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}
                >
                  Tamam
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Employee Requests Store
export interface EmployeeRequest {
  id: string
  type: 'izin' | 'mesai' | 'avans'
  userId: string
  userName: string
  department: string
  startDate?: Date
  endDate?: Date
  amount?: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
  reviewedBy?: string
  reviewedAt?: Date
}

export const employeeRequestsStore: EmployeeRequest[] = [
  {
    id: 'req1',
    type: 'izin',
    userId: 'current-user',
    userName: 'Ahmet Yilmaz',
    department: 'Risk',
    startDate: new Date('2026-02-10'),
    endDate: new Date('2026-02-12'),
    reason: 'Aile ziyareti',
    status: 'pending',
    createdAt: new Date('2026-01-28'),
  },
  {
    id: 'req2',
    type: 'avans',
    userId: 'current-user',
    userName: 'Ahmet Yilmaz',
    department: 'Risk',
    amount: 5000,
    reason: 'Acil ihtiyac',
    status: 'approved',
    createdAt: new Date('2026-01-20'),
    reviewedBy: 'Elif Yildiz',
    reviewedAt: new Date('2026-01-21'),
  },
]

// Ozellestirme (Customization) Content
function OzellestirmeContent() {
  const { settings, currentTheme, updateSettings, applyTheme } = useTheme()
  const [themeCategory, setThemeCategory] = useState<'female' | 'male'>('male')

  const currentThemes = themeCategory === 'female' ? femaleThemes : maleThemes

  const defaultPageOptions = [
    { id: 'analytics', label: 'Analiz', icon: Monitor },
    { id: 'arena', label: 'Arena', icon: Zap },
    { id: 'personnel', label: 'Personel', icon: Users },
    { id: 'schedule', label: 'Mesai', icon: Calendar },
    { id: 'education', label: 'Egitim', icon: Briefcase },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ] as const

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
          <Palette className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Panel Ozellestirme</h3>
          <p className="text-[11px] text-neutral-500">Degisiklikler anlik uygulanir</p>
        </div>
        <div 
          className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
          style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
        >
          <motion.div 
            className="w-2 h-2 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] font-medium text-emerald-500">Canli Onizleme</span>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-neutral-500 tracking-wider">TEMA SECIMI</p>
            <p className="text-[11px] text-neutral-600 mt-0.5">Panelimiz icin arka plan temasi secin</p>
          </div>
          
          {/* Category Toggle */}
          <div 
            className="flex p-1 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <button
              onClick={() => setThemeCategory('female')}
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2"
              style={{
                background: themeCategory === 'female' ? 'rgba(236, 72, 153, 0.15)' : 'transparent',
                color: themeCategory === 'female' ? '#ec4899' : '#737373',
              }}
            >
              <Sparkles size={14} />
              Kadinlar
            </button>
            <button
              onClick={() => setThemeCategory('male')}
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2"
              style={{
                background: themeCategory === 'male' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: themeCategory === 'male' ? '#3b82f6' : '#737373',
              }}
            >
              <Zap size={14} />
              Erkekler
            </button>
          </div>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-5 gap-3">
          {currentThemes.map(theme => (
            <motion.button
              key={theme.id}
onClick={() => applyTheme(theme.id)}
  className="relative aspect-[4/3] rounded-xl overflow-hidden group"
  style={{
  background: theme.gradient,
  border: settings.themeId === theme.id
  ? `2px solid ${theme.primary}`
  : '2px solid rgba(255,255,255,0.06)'
  }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Theme Preview Content */}
              <div className="absolute inset-0 p-2 flex flex-col justify-between">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: theme.primary }} />
                  <div className="w-4 h-2 rounded-full" style={{ background: `${theme.primary}60` }} />
                </div>
                <div className="space-y-1">
                  <div className="w-full h-1 rounded" style={{ background: `${theme.primary}40` }} />
                  <div className="w-3/4 h-1 rounded" style={{ background: `${theme.primary}30` }} />
                </div>
              </div>

{/* Selected Check */}
  {settings.themeId === theme.id && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: theme.primary }}
                >
                  <Check size={12} className="text-white" />
                </motion.div>
              )}

              {/* Hover Overlay with Name */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(0,0,0,0.6)' }}
              >
                <span className="text-[10px] font-medium text-white text-center px-1">{theme.name}</span>
              </div>
            </motion.button>
          ))}
        </div>

{/* Selected Theme Info */}
  {settings.themeId && currentTheme && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl flex items-center justify-between"
style={{ 
  background: currentTheme.gradient,
  border: `1px solid ${currentTheme.primary}40`
  }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
style={{ background: 'rgba(255,255,255,0.15)' }}
  >
  <Palette size={16} style={{ color: currentTheme.primary }} />
              </div>
              <div>
<p className="text-sm font-medium" style={{ color: currentTheme.textDark ? '#1a1a1a' : 'white' }}>
  {currentTheme.name}
                </p>
                <p className="text-[10px]" style={{ color: currentTheme.textDark ? '#525252' : 'rgba(255,255,255,0.6)' }}>
                  Secili tema
                </p>
              </div>
            </div>
            <button
onClick={() => applyTheme(null)}
  className="px-3 py-1.5 rounded-lg text-[10px] font-semibold"
  style={{ 
  background: 'rgba(255,255,255,0.15)', 
  color: currentTheme.textDark ? '#1a1a1a' : 'white'
  }}
            >
              Sifirla
            </button>
          </motion.div>
        )}
      </div>

      {/* Available Settings */}
      <div className="space-y-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-[10px] font-semibold text-neutral-500 tracking-wider">GENEL AYARLAR</p>

        {/* Font Size */}
        <div 
          className="p-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Type size={16} className="text-neutral-400" />
              <div>
                <p className="text-sm font-medium text-white">Yazi Boyutu</p>
                <p className="text-[10px] text-neutral-500">Genel font boyutu tercihi</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['small', 'medium', 'large'] as const).map(size => (
              <button
                key={size}
onClick={() => updateSettings({ fontSize: size })}
  className="p-3 rounded-lg flex flex-col items-center gap-2 transition-all"
  style={{
  background: settings.fontSize === size ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.03)',
  border: `1px solid ${settings.fontSize === size ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255,255,255,0.06)'}`,
  color: settings.fontSize === size ? '#3b82f6' : '#737373',
  }}
              >
                <span style={{ fontSize: size === 'small' ? '10px' : size === 'medium' ? '13px' : '16px', fontWeight: 600 }}>Aa</span>
                <span className="text-[10px] font-medium">{size === 'small' ? 'Kucuk' : size === 'medium' ? 'Orta' : 'Buyuk'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Default Page */}
        <div 
          className="p-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Home size={16} className="text-neutral-400" />
              <div>
                <p className="text-sm font-medium text-white">Varsayilan Sayfa</p>
                <p className="text-[10px] text-neutral-500">Giris yaptiginda acilacak sayfa</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {defaultPageOptions.map(page => (
              <button
                key={page.id}
onClick={() => updateSettings({ defaultPage: page.id })}
  className="p-3 rounded-lg flex flex-col items-center gap-2 transition-all"
  style={{
  background: settings.defaultPage === page.id ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.03)',
  border: `1px solid ${settings.defaultPage === page.id ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255,255,255,0.06)'}`,
  color: settings.defaultPage === page.id ? '#a855f7' : '#737373',
  }}
              >
                <page.icon size={18} />
                <span className="text-[10px] font-medium">{page.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Taleplerim (My Requests) Content
  function TaleplerimContent() {
  const [activeView, setActiveView] = useState<'list' | 'izin' | 'mesai' | 'avans'>('list')
  const [requests, setRequests] = useState<EmployeeRequest[]>(employeeRequestsStore)
  
  // Form states
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [reason, setReason] = useState('')
  const [amount, setAmount] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const resetForm = () => {
    setSelectedDates([])
    setReason('')
    setAmount('')
  }

  const submitRequest = (type: 'izin' | 'mesai' | 'avans') => {
    if (type === 'avans' && !amount) return
    if ((type === 'izin' || type === 'mesai') && selectedDates.length === 0) return
    if (!reason) return

    const newRequest: EmployeeRequest = {
      id: `req-${Date.now()}`,
      type,
      userId: 'current-user',
      userName: 'Ahmet Yilmaz',
      department: 'Risk',
      startDate: type !== 'avans' ? selectedDates[0] : undefined,
      endDate: type !== 'avans' && selectedDates.length > 1 ? selectedDates[selectedDates.length - 1] : selectedDates[0],
      amount: type === 'avans' ? parseFloat(amount) : undefined,
      reason,
      status: 'pending',
      createdAt: new Date(),
    }

    setRequests(prev => [newRequest, ...prev])
    employeeRequestsStore.unshift(newRequest)

    // Add to management events
    addManagementEvent({
      type: 'user',
      action: `Yeni ${type === 'izin' ? 'izin' : type === 'mesai' ? 'mesai' : 'avans'} talebi`,
      target: 'Ahmet Yilmaz',
      admin: 'Sistem',
      details: type === 'avans' ? `${amount} TL` : `${selectedDates.length} gun`,
    })

    resetForm()
    setActiveView('list')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10b981'
      case 'rejected': return '#ef4444'
      default: return '#f59e0b'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Onaylandi'
      case 'rejected': return 'Reddedildi'
      default: return 'Bekliyor'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'izin': return 'Izin Talebi'
      case 'mesai': return 'Mesai Talebi'
      default: return 'Avans Talebi'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'izin': return <CalendarDays className="w-4 h-4" />
      case 'mesai': return <Briefcase className="w-4 h-4" />
      default: return <Banknote className="w-4 h-4" />
    }
  }

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []
    
    // Add empty slots for days before the first day
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const isDateSelected = (date: Date) => {
    return selectedDates.some(d => d.toDateString() === date.toDateString())
  }

  const toggleDate = (date: Date) => {
    if (isDateSelected(date)) {
      setSelectedDates(prev => prev.filter(d => d.toDateString() !== date.toDateString()))
    } else {
      setSelectedDates(prev => [...prev, date].sort((a, b) => a.getTime() - b.getTime()))
    }
  }

  const monthNames = ['Ocak', 'Subat', 'Mart', 'Nisan', 'Mayis', 'Haziran', 'Temmuz', 'Agustos', 'Eylul', 'Ekim', 'Kasim', 'Aralik']
  const dayNames = ['Pz', 'Pt', 'Sa', 'Ca', 'Pe', 'Cu', 'Ct']

  // Calendar Component
  const CalendarPicker = () => (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-400" />
        </button>
        <span className="text-sm font-semibold text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5"
        >
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(day => (
          <div key={day} className="text-center text-[10px] font-semibold text-neutral-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(currentMonth).map((date, i) => (
          <div key={i}>
            {date ? (
              <button
                onClick={() => toggleDate(date)}
                disabled={date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="w-full aspect-square rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: isDateSelected(date) ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                  border: isDateSelected(date) ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid transparent',
                  color: isDateSelected(date) ? '#a855f7' : '#e5e5e5',
                }}
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="w-full aspect-square" />
            )}
          </div>
        ))}
      </div>

      {/* Selected Dates Summary */}
      {selectedDates.length > 0 && (
        <div className="p-3 rounded-xl" style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <p className="text-xs text-purple-400 font-medium">
            Secilen: {selectedDates.length} gun
          </p>
          <p className="text-[11px] text-neutral-400 mt-1">
            {selectedDates[0].toLocaleDateString('tr-TR')}
            {selectedDates.length > 1 && ` - ${selectedDates[selectedDates.length - 1].toLocaleDateString('tr-TR')}`}
          </p>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {activeView === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Taleplerim</h3>
                <p className="text-[11px] text-neutral-500">Izin, mesai ve avans taleplerinizi yonetin</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setActiveView('izin')}
                className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                  <CalendarDays className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-sm font-semibold text-emerald-500">Izin Talebi</p>
                <p className="text-[10px] text-neutral-500 mt-1">Yillik izin, mazeret izni</p>
              </button>

              <button
                onClick={() => setActiveView('mesai')}
                className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
                  <Briefcase className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-sm font-semibold text-blue-500">Mesai Talebi</p>
                <p className="text-[10px] text-neutral-500 mt-1">Fazla mesai talebi</p>
              </button>

              <button
                onClick={() => setActiveView('avans')}
                className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.2)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
                  <Banknote className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-sm font-semibold text-amber-500">Avans Talebi</p>
                <p className="text-[10px] text-neutral-500 mt-1">Maas avansi</p>
              </button>
            </div>

            {/* Request History */}
            <div className="space-y-3">
              <span className="text-[10px] font-semibold text-neutral-500 tracking-wider">TALEP GECMISI</span>
              {requests.length === 0 ? (
                <div className="p-8 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <FileText className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-500">Henuz talep yok</p>
                </div>
              ) : (
                requests.map(req => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ 
                            background: req.type === 'izin' ? 'rgba(16, 185, 129, 0.15)' : 
                                       req.type === 'mesai' ? 'rgba(59, 130, 246, 0.15)' : 
                                       'rgba(251, 191, 36, 0.15)' 
                          }}
                        >
                          <span style={{ 
                            color: req.type === 'izin' ? '#10b981' : 
                                   req.type === 'mesai' ? '#3b82f6' : 
                                   '#fbbf24' 
                          }}>
                            {getTypeIcon(req.type)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{getTypeLabel(req.type)}</p>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            {req.type === 'avans' 
                              ? `${req.amount?.toLocaleString('tr-TR')} TL`
                              : `${req.startDate?.toLocaleDateString('tr-TR')}${req.endDate && req.endDate !== req.startDate ? ` - ${req.endDate.toLocaleDateString('tr-TR')}` : ''}`
                            }
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span 
                          className="px-2 py-1 rounded-full text-[10px] font-semibold"
                          style={{ background: `${getStatusColor(req.status)}15`, color: getStatusColor(req.status) }}
                        >
                          {getStatusLabel(req.status)}
                        </span>
                        <p className="text-[10px] text-neutral-500 mt-1">
                          {req.createdAt.toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    {req.reason && (
                      <p className="text-[11px] text-neutral-400 mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                        Sebep: {req.reason}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {(activeView === 'izin' || activeView === 'mesai') && (
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Back Button */}
            <button
              onClick={() => { resetForm(); setActiveView('list') }}
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Geri
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center" 
                style={{ background: activeView === 'izin' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)' }}
              >
                {activeView === 'izin' 
                  ? <CalendarDays className="w-5 h-5 text-emerald-500" />
                  : <Briefcase className="w-5 h-5 text-blue-500" />
                }
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {activeView === 'izin' ? 'Izin Talebi' : 'Mesai Talebi'}
                </h3>
                <p className="text-[11px] text-neutral-500">
                  {activeView === 'izin' ? 'Izin almak istediginiz gunleri secin' : 'Fazla mesai yapmak istediginiz gunleri secin'}
                </p>
              </div>
            </div>

            {/* Calendar */}
            <div 
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <CalendarPicker />
            </div>

            {/* Reason */}
            <div>
              <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">SEBEP</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={activeView === 'izin' ? 'Izin sebebinizi yazin...' : 'Mesai sebebinizi yazin...'}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none resize-none"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>

            {/* Submit */}
            <motion.button
              onClick={() => submitRequest(activeView)}
              disabled={selectedDates.length === 0 || !reason}
              className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: activeView === 'izin' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)', 
                border: activeView === 'izin' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(59, 130, 246, 0.4)', 
                color: activeView === 'izin' ? '#10b981' : '#3b82f6' 
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Send className="w-4 h-4" />
              Talep Gonder
            </motion.button>
          </motion.div>
        )}

        {activeView === 'avans' && (
          <motion.div
            key="avans"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Back Button */}
            <button
              onClick={() => { resetForm(); setActiveView('list') }}
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Geri
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
                <Banknote className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Avans Talebi</h3>
                <p className="text-[11px] text-neutral-500">Maas avansi talep edin</p>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">TALEP EDILEN MIKTAR (TL)</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-4 rounded-xl text-2xl font-bold text-white placeholder:text-neutral-700 outline-none text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">TL</span>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex gap-2">
              {[1000, 2500, 5000, 10000].map(val => (
                <button
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: amount === val.toString() ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${amount === val.toString() ? 'rgba(251, 191, 36, 0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: amount === val.toString() ? '#fbbf24' : '#a3a3a3',
                  }}
                >
                  {val.toLocaleString('tr-TR')} TL
                </button>
              ))}
            </div>

            {/* Reason */}
            <div>
              <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">SEBEP</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Avans talep sebebinizi yazin..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none resize-none"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>

            {/* Submit */}
            <motion.button
              onClick={() => submitRequest('avans')}
              disabled={!amount || !reason}
              className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.4)', color: '#fbbf24' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Send className="w-4 h-4" />
              Talep Gonder
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Notification Toggle Row Component
function NotificationToggleRow({ 
  icon, 
  label, 
  description, 
  checked, 
  onChange,
  required = false,
  optional = false
}: { 
  icon: React.ReactNode
  label: string
  description: string
  checked: boolean
  onChange: () => void
  required?: boolean
  optional?: boolean
}) {
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-xl transition-colors"
      style={{ 
        background: checked ? 'rgba(168, 85, 247, 0.05)' : 'rgba(255,255,255,0.02)', 
        border: `1px solid ${checked ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.06)'}` 
      }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: checked ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.05)' }}
        >
          <span style={{ color: checked ? '#a855f7' : '#737373' }}>{icon}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-white">{label}</p>
            {required && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                Zorunlu
              </span>
            )}
            {optional && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: '#737373' }}>
                Opsiyonel
              </span>
            )}
          </div>
          <p className="text-[11px] text-neutral-500 mt-0.5">{description}</p>
        </div>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  )
}



// Admin: Management Notifications Center - Database Connected
export interface Announcement {
  id: string
  title: string
  content: string
  severity: string
  targetType: string
  targetSiteId: string | null
  targetDepartmentId: string | null
  targetRole: string | null
  showAsPopup: boolean
  displayMode: string
  removeOnRead: boolean
  activeDays: string[]
  isActive: boolean
  expiresAt: string | null
  createdAt: string
  createdByUserId: string
  targetSite?: { name: string } | null
  targetDepartment?: { name: string } | null
  _count?: { readRecords: number }
}


function YonetimBildirimContent() {
  const [activeSubTab, setActiveSubTab] = useState<'announcements' | 'history' | 'operations'>('announcements')
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  
  // Create form state
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [formSeverity, setFormSeverity] = useState<'INFO' | 'WARNING' | 'CRITICAL'>('INFO')
  const [formTargetType, setFormTargetType] = useState<string>('ALL')
  const [formShowPopup, setFormShowPopup] = useState(false)
  const [formDisplayMode, setFormDisplayMode] = useState<'EVERY_LOGIN' | 'ONCE'>('ONCE')
  const [formRemoveOnRead, setFormRemoveOnRead] = useState(false)
  const [formActiveDays, setFormActiveDays] = useState<string[]>(['Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmt', 'Paz'])
  const [formExpiresAt, setFormExpiresAt] = useState('')

  // Operations state
  const [shiftWindowStart, setShiftWindowStart] = useState('Cumartesi 20:00')
  const [shiftWindowEnd, setShiftWindowEnd] = useState('Pazar 17:00')
  const [requireChangeReason, setRequireChangeReason] = useState(true)
  const [notifyOnWindowStart, setNotifyOnWindowStart] = useState(true)
  const [escalationEnabled, setEscalationEnabled] = useState(true)

  // Fetch announcements from API
  const fetchAnnouncements = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/announcements?showAll=true')
      if (res.ok) {
        const data = await res.json()
        setAnnouncements(data.announcements || [])
      }
    } catch (err) {
      console.error('Failed to fetch announcements:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAnnouncements()
  }, [fetchAnnouncements])

  const resetForm = () => {
    setFormTitle('')
    setFormContent('')
    setFormSeverity('INFO')
    setFormTargetType('ALL')
    setFormShowPopup(false)
    setFormDisplayMode('ONCE')
    setFormRemoveOnRead(false)
    setFormActiveDays(['Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmt', 'Paz'])
    setFormExpiresAt('')
    setShowCreateForm(false)
  }

  const createAnnouncement = async () => {
    if (!formTitle.trim() || !formContent.trim()) return

    setIsSaving(true)
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formTitle,
          content: formContent,
          severity: formSeverity,
          targetType: formTargetType,
          showAsPopup: formShowPopup,
          displayMode: formDisplayMode,
          removeOnRead: formRemoveOnRead,
          activeDays: formActiveDays,
          expiresAt: formExpiresAt || null,
        }),
      })

      if (res.ok) {
        await fetchAnnouncements()
        resetForm()
      }
    } catch (err) {
      console.error('Failed to create announcement:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const deleteAnnouncement = async (id: string) => {
    try {
      const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setAnnouncements(prev => prev.filter(a => a.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete announcement:', err)
    }
  }

  const toggleAnnouncementActive = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      })
      if (res.ok) {
        setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, isActive } : a))
      }
    } catch (err) {
      console.error('Failed to toggle announcement:', err)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL': return '#ef4444'
      case 'WARNING': return '#f59e0b'
      default: return '#3b82f6'
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL': return 'Kritik'
      case 'WARNING': return 'Uyari'
      default: return 'Bilgi'
    }
  }

  const getTargetTypeLabel = (targetType: string) => {
    switch (targetType) {
      case 'ALL': return 'Tum kullanicilar'
      case 'ADMIN_ONLY': return 'Sadece Admin'
      case 'STAFF_ONLY': return 'Sadece Personel'
      case 'SITE_SPECIFIC': return 'Belirli Site'
      case 'DEPARTMENT_SPECIFIC': return 'Belirli Birim'
      case 'ROLE_SPECIFIC': return 'Belirli Rol'
      default: return targetType
    }
  }

  return (
    <div className="space-y-6">
      <AdminBadge />

      {/* Sub-tabs */}
      <div className="flex gap-2 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <button
          onClick={() => setActiveSubTab('announcements')}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            background: activeSubTab === 'announcements' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
            color: activeSubTab === 'announcements' ? '#a855f7' : '#737373',
          }}
        >
          Duyurular
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all relative"
          style={{
            background: activeSubTab === 'history' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
            color: activeSubTab === 'history' ? '#a855f7' : '#737373',
          }}
        >
          Okunma Gecmisi
          {announcements.length > 0 && (
            <span 
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
              style={{ background: '#10b981', color: '#fff' }}
            >
              {announcements.reduce((sum, a) => sum + (a._count?.readRecords || 0), 0)}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('operations')}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            background: activeSubTab === 'operations' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
            color: activeSubTab === 'operations' ? '#a855f7' : '#737373',
          }}
        >
          Operasyon Ayarlari
        </button>
      </div>

      {activeSubTab === 'announcements' && (
        <div className="space-y-5">
          {/* Create Button */}
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full p-4 rounded-xl text-left transition-colors"
              style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px dashed rgba(168, 85, 247, 0.3)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>
                  <Bell className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-purple-400">+ Yeni Duyuru Olustur</p>
                  <p className="text-[11px] text-neutral-500">Kullanicilara bildirim gonderin</p>
                </div>
              </div>
            </button>
          )}

          {/* Create Form */}
          <AnimatePresence>
            {showCreateForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Yeni Duyuru</h4>
                    <button onClick={resetForm} className="text-neutral-500 hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">BASLIK</label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Duyuru basligi..."
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">ICERIK</label>
                    <textarea
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      placeholder="Duyuru icerigi..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none resize-none"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  {/* Severity */}
                  <div>
                    <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">ONEM SEVIYESI</label>
                    <div className="flex gap-2">
                      {(['INFO', 'WARNING', 'CRITICAL'] as const).map(sev => (
                        <button
                          key={sev}
                          onClick={() => setFormSeverity(sev)}
                          className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-all"
                          style={{
                            background: formSeverity === sev ? `${getSeverityColor(sev)}15` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${formSeverity === sev ? `${getSeverityColor(sev)}40` : 'rgba(255,255,255,0.08)'}`,
                            color: formSeverity === sev ? getSeverityColor(sev) : '#737373',
                          }}
                        >
                          {getSeverityLabel(sev)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Type */}
                  <div>
                    <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">HEDEF KITLE</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'ALL', label: 'Tum Kullanicilar' },
                        { id: 'ADMIN_ONLY', label: 'Sadece Admin' },
                        { id: 'STAFF_ONLY', label: 'Sadece Personel' },
                        { id: 'ROLE_SPECIFIC', label: 'Belirli Rol' },
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setFormTargetType(opt.id)}
                          className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
                          style={{
                            background: formTargetType === opt.id ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${formTargetType === opt.id ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255,255,255,0.08)'}`,
                            color: formTargetType === opt.id ? '#a855f7' : '#737373',
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Show as Popup Toggle */}
                  <div 
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div>
                      <p className="text-sm font-medium text-white">Ana Sayfada Popup Goster</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">Kullanicilar giris yapinca popup olarak gosterilir</p>
                    </div>
                    <ToggleSwitch checked={formShowPopup} onChange={() => setFormShowPopup(!formShowPopup)} />
                  </div>

                  {/* Display Mode - only visible when popup is enabled */}
                  {formShowPopup && (
                    <div className="space-y-3">
                      <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">GOSTERIM MODU</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setFormDisplayMode('ONCE')}
                          className="flex-1 p-4 rounded-xl text-left transition-all"
                          style={{
                            background: formDisplayMode === 'ONCE' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${formDisplayMode === 'ONCE' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.06)'}`,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div 
                              className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                              style={{ borderColor: formDisplayMode === 'ONCE' ? '#10b981' : '#525252' }}
                            >
                              {formDisplayMode === 'ONCE' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                            </div>
                            <span className="text-sm font-medium" style={{ color: formDisplayMode === 'ONCE' ? '#10b981' : '#e5e5e5' }}>
                              Sadece Bir Kez
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-500 ml-6">Kullanici kapattiktan sonra tekrar gosterilmez</p>
                        </button>
                        <button
                          onClick={() => setFormDisplayMode('EVERY_LOGIN')}
                          className="flex-1 p-4 rounded-xl text-left transition-all"
                          style={{
                            background: formDisplayMode === 'EVERY_LOGIN' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${formDisplayMode === 'EVERY_LOGIN' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(255,255,255,0.06)'}`,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div 
                              className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                              style={{ borderColor: formDisplayMode === 'EVERY_LOGIN' ? '#fbbf24' : '#525252' }}
                            >
                              {formDisplayMode === 'EVERY_LOGIN' && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                            </div>
                            <span className="text-sm font-medium" style={{ color: formDisplayMode === 'EVERY_LOGIN' ? '#fbbf24' : '#e5e5e5' }}>
                              Her Giriste
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-500 ml-6">Her oturum actiginda tekrar gosterilir</p>
                        </button>
</div>
  </div>
  )}

  {/* Remove on Read Option */}
  {formShowPopup && (
  <div 
    className="p-4 rounded-xl flex items-center justify-between"
    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
  >
    <div>
      <p className="text-sm font-medium text-white">Okundu Yapilinca Kaldir</p>
      <p className="text-[11px] text-neutral-500 mt-0.5">Kullanici okundu isaretlerse duyuru listesinden kaldirilir</p>
    </div>
    <ToggleSwitch checked={formRemoveOnRead} onChange={() => setFormRemoveOnRead(!formRemoveOnRead)} />
  </div>
  )}

  {/* Active Days Selection */}
  {formShowPopup && (
  <div className="space-y-3">
    <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">AKTIF GUNLER</label>
    <p className="text-[11px] text-neutral-500 -mt-1 mb-3">Duyurunun hangi gunlerde gosterilecegini secin</p>
    <div className="flex gap-2">
      {['Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => {
        const isSelected = formActiveDays.includes(day)
        const isWeekend = day === 'Cmt' || day === 'Paz'
        return (
          <button
            key={day}
            onClick={() => {
              if (isSelected) {
                setFormActiveDays(prev => prev.filter(d => d !== day))
              } else {
                setFormActiveDays(prev => [...prev, day])
              }
            }}
            className="flex-1 py-3 rounded-xl text-center transition-all"
            style={{
              background: isSelected 
                ? isWeekend ? 'rgba(251, 191, 36, 0.15)' : 'rgba(16, 185, 129, 0.15)'
                : 'rgba(255,255,255,0.02)',
              border: `1px solid ${isSelected 
                ? isWeekend ? 'rgba(251, 191, 36, 0.4)' : 'rgba(16, 185, 129, 0.4)'
                : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            <span 
              className="text-xs font-semibold"
              style={{ color: isSelected 
                ? isWeekend ? '#fbbf24' : '#10b981'
                : '#737373' 
              }}
            >
              {day}
            </span>
          </button>
        )
      })}
    </div>
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => setFormActiveDays(['Pzt', 'Sal', 'Car', 'Per', 'Cum'])}
        className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
        style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981' }}
      >
        Hafta Ici
      </button>
      <button
        onClick={() => setFormActiveDays(['Cmt', 'Paz'])}
        className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
        style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}
      >
        Hafta Sonu
      </button>
      <button
        onClick={() => setFormActiveDays(['Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmt', 'Paz'])}
        className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
        style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', color: '#a855f7' }}
      >
        Tum Gunler
      </button>
    </div>
  </div>
  )}
  
  {/* Expiry Date */}
  {formShowPopup && (
  <div>
  <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">BITIS TARIHI (OPSIYONEL)</label>
                      <input
                        type="datetime-local"
                        value={formExpiresAt}
                        onChange={(e) => setFormExpiresAt(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                      />
                      <p className="text-[10px] text-neutral-500 mt-2">Bu tarihten sonra popup otomatik olarak gosterilmez</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={resetForm}
                      className="flex-1 py-3 rounded-xl text-sm font-medium"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#a3a3a3' }}
                    >
                      Iptal
                    </button>
                    <button
                      onClick={createAnnouncement}
                      disabled={!formTitle.trim() || !formContent.trim() || isSaving}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold disabled:opacity-50"
                      style={{ background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#a855f7' }}
                    >
                      {isSaving ? 'Gonderiliyor...' : 'Gonder'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Announcement List */}
          <div className="space-y-3">
            <span className="text-[10px] font-semibold text-neutral-500 tracking-wider">GONDERILEN DUYURULAR</span>
            {isLoading ? (
              <div className="p-8 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <Loader2 className="w-6 h-6 text-purple-400 mx-auto mb-2 animate-spin" />
                <p className="text-sm text-neutral-500">Duyurular yukleniyor...</p>
              </div>
            ) : announcements.length === 0 ? (
              <div className="p-8 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <Bell className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                <p className="text-sm text-neutral-500">Henuz duyuru yok</p>
              </div>
            ) : (
              announcements.map(ann => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl"
                  style={{ 
                    background: 'rgba(255,255,255,0.02)', 
                    border: `1px solid ${ann.isActive ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)'}`,
                    opacity: ann.isActive ? 1 : 0.6,
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: getSeverityColor(ann.severity) }}
                      />
                      <h4 className="text-sm font-semibold text-white">{ann.title}</h4>
                      <span 
                        className="px-2 py-0.5 rounded text-[9px] font-semibold"
                        style={{ background: `${getSeverityColor(ann.severity)}15`, color: getSeverityColor(ann.severity) }}
                      >
                        {getSeverityLabel(ann.severity)}
                      </span>
                      {ann.showAsPopup && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-medium" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
                          Popup
                        </span>
                      )}
                      {!ann.isActive && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-medium" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                          Pasif
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-neutral-500">{new Date(ann.createdAt).toLocaleDateString('tr-TR')}</span>
                      <button
                        onClick={() => toggleAnnouncementActive(ann.id, !ann.isActive)}
                        className="p-1 rounded hover:bg-white/5 transition-colors"
                        title={ann.isActive ? 'Pasif yap' : 'Aktif yap'}
                      >
                        {ann.isActive ? <Pause size={12} className="text-amber-400" /> : <Play size={12} className="text-emerald-400" />}
                      </button>
                      <button
                        onClick={() => deleteAnnouncement(ann.id)}
                        className="p-1 rounded hover:bg-white/5 transition-colors"
                        title="Sil"
                      >
                        <Trash2 size={12} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 mb-3">{ann.content}</p>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                    <span>Hedef: {getTargetTypeLabel(ann.targetType)}</span>
                    {ann._count && (
                      <>
                        <span>•</span>
                        <span>Okunma: {ann._count.readRecords}</span>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'history' && (
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                <Check className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Duyuru Istatistikleri</h4>
                <p className="text-[11px] text-neutral-500">Duyurularin okunma bilgileri</p>
              </div>
            </div>
            <button
              onClick={fetchAnnouncements}
              className="px-3 py-2 rounded-lg text-xs font-medium"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#a3a3a3' }}
            >
              Yenile
            </button>
          </div>

          {/* Stats from announcements */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-2xl font-bold text-white">{announcements.length}</p>
              <p className="text-[11px] text-neutral-500 mt-1">Toplam Duyuru</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-2xl font-bold text-emerald-500">{announcements.filter(a => a.isActive).length}</p>
              <p className="text-[11px] text-neutral-500 mt-1">Aktif Duyuru</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-2xl font-bold text-purple-400">{announcements.reduce((sum, a) => sum + (a._count?.readRecords || 0), 0)}</p>
              <p className="text-[11px] text-neutral-500 mt-1">Toplam Okunma</p>
            </div>
          </div>

          {/* Per-announcement read stats */}
          <div className="space-y-2">
            <span className="text-[10px] font-semibold text-neutral-500 tracking-wider">DUYURU BAZLI OKUNMA</span>
            {announcements.length === 0 ? (
              <div className="p-8 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <History className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                <p className="text-sm text-neutral-500">Henuz duyuru yok</p>
              </div>
            ) : (
              announcements.map(ann => (
                <motion.div
                  key={ann.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ background: `${getSeverityColor(ann.severity)}15` }}
                      >
                        <Bell size={14} style={{ color: getSeverityColor(ann.severity) }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">{ann.title}</p>
                          <span 
                            className="px-1.5 py-0.5 rounded text-[9px] font-medium" 
                            style={{ background: `${getSeverityColor(ann.severity)}15`, color: getSeverityColor(ann.severity) }}
                          >
                            {getSeverityLabel(ann.severity)}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          <span className="text-emerald-500">{ann._count?.readRecords || 0}</span> kisi okudu
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-neutral-500">
                        {new Date(ann.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                      <p className="text-[10px]" style={{ color: ann.isActive ? '#10b981' : '#ef4444' }}>
                        {ann.isActive ? 'Aktif' : 'Pasif'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'operations' && (
        <div className="space-y-5">
          {/* Shift Window Settings */}
          <div 
            className="p-5 rounded-2xl space-y-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
                <Clock className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Vardiya Duzenleme Penceresi</h4>
                <p className="text-[11px] text-neutral-500">Haftalik vardiya duzenleme zaman araligi</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">BASLANGIC</label>
                <input
                  type="text"
                  value={shiftWindowStart}
                  onChange={(e) => setShiftWindowStart(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">BITIS</label>
                <input
                  type="text"
                  value={shiftWindowEnd}
                  onChange={(e) => setShiftWindowEnd(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>
            </div>

            {/* Window Start Notification */}
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <p className="text-xs font-medium text-white">Pencere basladiginda bildirim</p>
                <p className="text-[10px] text-neutral-500">Yetkili kisilere popup gonder</p>
              </div>
              <ToggleSwitch checked={notifyOnWindowStart} onChange={() => setNotifyOnWindowStart(!notifyOnWindowStart)} small />
            </div>

            {/* Escalation */}
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <p className="text-xs font-medium text-white">Escalation bildirimi</p>
                <p className="text-[10px] text-neutral-500">Pencere sonunda vardiya hazir degilse yonetime bildir</p>
              </div>
              <ToggleSwitch checked={escalationEnabled} onChange={() => setEscalationEnabled(!escalationEnabled)} small />
            </div>
          </div>

          {/* Change Reason Settings */}
          <div 
            className="p-5 rounded-2xl space-y-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Degisiklik Sebep Zorunlulugu</h4>
                <p className="text-[11px] text-neutral-500">Mesai degisikliklerinde sebep isteme</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <p className="text-xs font-medium text-white">Sebep modalı zorunlu</p>
                <p className="text-[10px] text-neutral-500">Her degisiklikte sebep secimi gerekli</p>
              </div>
              <ToggleSwitch checked={requireChangeReason} onChange={() => setRequireChangeReason(!requireChangeReason)} small />
            </div>

            <div className="p-3 rounded-xl" style={{ background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.15)' }}>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-amber-400">Degisiklik sonrasi bildirim</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Her mesai degisikligi otomatik olarak yonetime bildirilir</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mock Preview: Window Started */}
          <div 
            className="p-4 rounded-2xl"
            style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400">Ornek Bildirim Onizleme</span>
            </div>
            <p className="text-sm text-white">Vardiya duzenleme penceresi basladi!</p>
            <p className="text-[11px] text-neutral-400 mt-1">{shiftWindowStart} - {shiftWindowEnd} arasi degisiklik yapabilirsiniz.</p>
          </div>

          <SaveButton />
        </div>
      )}
    </div>
  )
}

function SiteYonetimiContent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[18px] font-semibold text-white">Site Yonetimi</h3>
        <p className="text-sm text-neutral-500 mt-1">
          Yeni site olusturma ve kurulum sihirbazi islemlerini buradan yonetebilirsiniz.
        </p>
      </div>

      <div
        className="p-5 rounded-2xl"
        style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              <p className="text-sm font-semibold text-white">Site Kurulum Sihirbazi</p>
            </div>
            <p className="text-xs text-neutral-400 max-w-xl">
              Yeni site eklendiginde birimler, ilk yonetici, vardiya ayarlari ve temel
              entegre moduller tek akista olusturulur.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] px-2 py-1 rounded-full border border-purple-500/30 text-purple-300">Birimler</span>
              <span className="text-[10px] px-2 py-1 rounded-full border border-blue-500/30 text-blue-300">Yonetici</span>
              <span className="text-[10px] px-2 py-1 rounded-full border border-emerald-500/30 text-emerald-300">Chronos</span>
              <span className="text-[10px] px-2 py-1 rounded-full border border-cyan-500/30 text-cyan-300">Arena Senkron</span>
            </div>
          </div>

          <motion.button
            onClick={() => window.location.assign("/admin/sites")}
            className="shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.22), rgba(59,130,246,0.22))",
              border: "1px solid rgba(168, 85, 247, 0.35)",
              color: "#e9d5ff",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Site Ekle
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// Admin: Users with Security Drawer
function KullanicilarContent() {
  const [users, setUsers] = useState<UserData[]>(mockUserData)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [showDrawer, setShowDrawer] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Suspend modal state
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [suspendDuration, setSuspendDuration] = useState<'1' | '7' | 'indefinite'>('1')
  const [suspendReason, setSuspendReason] = useState('')
  const [suspendNote, setSuspendNote] = useState('')

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openUserDrawer = (user: UserData) => {
    setSelectedUser(user)
    setShowDrawer(true)
  }

  const closeDrawer = () => {
    setShowDrawer(false)
    setTimeout(() => setSelectedUser(null), 300)
  }

  // Security Actions
  const toggleUserStatus = () => {
    if (!selectedUser) return
    const newStatus = selectedUser.status === 'active' ? 'suspended' : 'active'
    
    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id 
        ? { ...u, status: newStatus, suspendedUntil: undefined, suspendReason: undefined } 
        : u
    ))
    setSelectedUser(prev => prev ? { ...prev, status: newStatus, suspendedUntil: undefined, suspendReason: undefined } : null)
    
    addManagementEvent({
      type: 'security',
      action: newStatus === 'suspended' ? 'Hesap askiya alindi' : 'Hesap aktif edildi',
      target: selectedUser.name,
      admin: 'Ahmet Yilmaz',
    })
  }

  const suspendAccount = () => {
    if (!selectedUser) return
    
    let untilDate: Date | undefined
    if (suspendDuration === '1') {
      untilDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
    } else if (suspendDuration === '7') {
      untilDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }

    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id 
        ? { ...u, status: 'suspended', suspendedUntil: untilDate, suspendReason: suspendReason || suspendNote } 
        : u
    ))
    setSelectedUser(prev => prev ? { ...prev, status: 'suspended', suspendedUntil: untilDate, suspendReason: suspendReason || suspendNote } : null)
    
    addManagementEvent({
      type: 'security',
      action: `Hesap askiya alindi (${suspendDuration === 'indefinite' ? 'suresiz' : suspendDuration + ' gun'})`,
      target: selectedUser.name,
      admin: 'Ahmet Yilmaz',
      details: suspendReason || suspendNote,
    })

    setShowSuspendModal(false)
    setSuspendDuration('1')
    setSuspendReason('')
    setSuspendNote('')
  }

  const logoutAllDevices = () => {
    if (!selectedUser) return
    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id ? { ...u, activeSessions: 0 } : u
    ))
    setSelectedUser(prev => prev ? { ...prev, activeSessions: 0 } : null)
    
    addManagementEvent({
      type: 'security',
      action: 'Tum cihazlardan cikis yapildi',
      target: selectedUser.name,
      admin: 'Ahmet Yilmaz',
    })
  }

  const forcePasswordChange = () => {
    if (!selectedUser) return
    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id ? { ...u, forcePasswordChange: true } : u
    ))
    setSelectedUser(prev => prev ? { ...prev, forcePasswordChange: true } : null)
    
    addManagementEvent({
      type: 'security',
      action: 'Sifre degisimi zorunlu kilinidi',
      target: selectedUser.name,
      admin: 'Ahmet Yilmaz',
    })
  }

  const toggle2FARequired = () => {
    if (!selectedUser) return
    const newValue = !selectedUser.twoFactorRequired
    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id ? { ...u, twoFactorRequired: newValue } : u
    ))
    setSelectedUser(prev => prev ? { ...prev, twoFactorRequired: newValue } : null)
    
    addManagementEvent({
      type: 'security',
      action: newValue ? '2FA zorunlu kilinidi' : '2FA zorunlulugu kaldirildi',
      target: selectedUser.name,
      admin: 'Ahmet Yilmaz',
    })
  }

  const reset2FA = () => {
    if (!selectedUser) return
    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id ? { ...u, twoFactorEnabled: false } : u
    ))
    setSelectedUser(prev => prev ? { ...prev, twoFactorEnabled: false } : null)
    
    addManagementEvent({
      type: 'security',
      action: '2FA sifirlandi',
      target: selectedUser.name,
      admin: 'Ahmet Yilmaz',
    })
  }

  const demoteToViewer = () => {
    if (!selectedUser) return
    const oldRole = selectedUser.role
    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id ? { ...u, role: 'Izleyici' } : u
    ))
    setSelectedUser(prev => prev ? { ...prev, role: 'Izleyici' } : null)
    
    addManagementEvent({
      type: 'user',
      action: `Rol dusuruldu: ${oldRole} -> Izleyici`,
      target: selectedUser.name,
      admin: 'Ahmet Yilmaz',
    })
  }

  const auditLog = selectedUser ? getMockAuditLog(selectedUser.id) : []

  return (
    <div className="space-y-6">
      <AdminBadge />
      
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="Kullanici ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none"
            style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
          />
        </div>
        <button 
          className="px-4 py-2.5 rounded-xl text-sm font-medium"
          style={{ background: "rgba(168, 85, 247, 0.15)", color: "#a855f7", border: "1px solid rgba(168, 85, 247, 0.3)" }}
        >
          + Yeni Kullanici
        </button>
      </div>

      <div className="space-y-2">
        {filteredUsers.map(user => (
          <motion.div
            key={user.id}
            onClick={() => openUserDrawer(user)}
            className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors"
            style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
            whileHover={{ background: "rgba(255, 255, 255, 0.04)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                <span className="text-sm font-medium text-neutral-400">{user.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-neutral-500">{user.role} - {user.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user.forcePasswordChange && (
                <span className="px-2 py-1 rounded-full text-[10px] font-semibold" style={{ background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" }}>
                  Sifre Degisimi
                </span>
              )}
              <span
                className="px-2 py-1 rounded-full text-[10px] font-semibold"
                style={{
                  background: user.status === "active" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                  color: user.status === "active" ? "#10b981" : "#ef4444"
                }}
              >
                {user.status === "active" ? "Aktif" : "Askida"}
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* User Detail Drawer */}
      <AnimatePresence>
        {showDrawer && selectedUser && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-xl z-50 overflow-y-auto"
              style={{ background: "#0a0a0a", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Drawer Header */}
              <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center">
                    <span className="text-lg font-semibold text-neutral-300">{selectedUser.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selectedUser.name}</h2>
                    <p className="text-xs text-neutral-500">{selectedUser.email}</p>
                  </div>
                </div>
                <button onClick={closeDrawer} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors">
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <Building2 className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-xs text-neutral-400">{selectedUser.department}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <Shield className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-xs text-neutral-400">{selectedUser.role}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: selectedUser.status === 'active' ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)" }}>
                    {selectedUser.status === 'active' ? <Play className="w-3.5 h-3.5 text-emerald-500" /> : <Pause className="w-3.5 h-3.5 text-red-400" />}
                    <span className="text-xs" style={{ color: selectedUser.status === 'active' ? '#10b981' : '#ef4444' }}>
                      {selectedUser.status === 'active' ? 'Aktif' : 'Askida'}
                    </span>
                  </div>
                </div>

                {/* Suspended Info Banner */}
                {selectedUser.status === 'suspended' && (
                  <div className="p-4 rounded-xl" style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="w-5 h-5 text-red-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-400">Hesap Askida</p>
                        <p className="text-xs text-neutral-400 mt-1">
                          {selectedUser.suspendedUntil 
                            ? `Bitis: ${selectedUser.suspendedUntil.toLocaleDateString('tr-TR')}`
                            : 'Suresiz askida'}
                        </p>
                        {selectedUser.suspendReason && (
                          <p className="text-xs text-neutral-500 mt-1">Sebep: {selectedUser.suspendReason}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Security / Emergency Response Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <h3 className="text-sm font-semibold text-white">Guvenlik / Acil Mudahale</h3>
                  </div>

                  {/* Account Status Toggle */}
                  <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Hesap Durumu</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">Hesabi hizli aktif/askiya al</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-400">{selectedUser.status === 'active' ? 'Aktif' : 'Askida'}</span>
                        <ToggleSwitch 
                          checked={selectedUser.status === 'active'}
                          onChange={toggleUserStatus}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Suspend with Options */}
                  <button
                    onClick={() => setShowSuspendModal(true)}
                    className="w-full p-4 rounded-xl text-left transition-colors"
                    style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.15)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(239, 68, 68, 0.1)" }}>
                          <Pause className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-400">Hesabi Askiya Al</p>
                          <p className="text-[11px] text-neutral-500">Sure ve sebep belirle</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-600" />
                    </div>
                  </button>

                  {/* Quick Actions Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <SecurityActionButton 
                      icon={LogOut}
                      label="Tum Cihazlardan Cikis"
                      description={`${selectedUser.activeSessions} aktif oturum`}
                      onClick={logoutAllDevices}
                      color="#f59e0b"
                    />
                    <SecurityActionButton 
                      icon={KeySquare}
                      label="Sifre Degisimi Zorla"
                      description={selectedUser.forcePasswordChange ? "Zaten aktif" : "Sonraki giriste"}
                      onClick={forcePasswordChange}
                      color="#3b82f6"
                      disabled={selectedUser.forcePasswordChange}
                    />
                    <SecurityActionButton 
                      icon={Smartphone}
                      label={selectedUser.twoFactorRequired ? "2FA Zorunlu" : "2FA Zorunlu Kil"}
                      description={selectedUser.twoFactorEnabled ? "2FA aktif" : "2FA pasif"}
                      onClick={toggle2FARequired}
                      color="#10b981"
                      active={selectedUser.twoFactorRequired}
                    />
                    <SecurityActionButton 
                      icon={Shield}
                      label="2FA Sifirla"
                      description="Yeniden kurulum gerekir"
                      onClick={reset2FA}
                      color="#8b5cf6"
                      disabled={!selectedUser.twoFactorEnabled}
                    />
                  </div>

                  {/* Demote Role */}
                  <button
                    onClick={demoteToViewer}
                    disabled={selectedUser.role === 'Izleyici'}
                    className="w-full p-4 rounded-xl text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "rgba(251, 191, 36, 0.05)", border: "1px solid rgba(251, 191, 36, 0.15)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(251, 191, 36, 0.1)" }}>
                          <UserMinus className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-amber-400">Rolu Dusur (Izleyici)</p>
                          <p className="text-[11px] text-neutral-500">Hizli yetki kisitlama</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-600" />
                    </div>
                  </button>
                </div>

                {/* Audit Log */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-neutral-500" />
                    <h3 className="text-sm font-semibold text-white">Islem Gecmisi (Audit)</h3>
                  </div>

                  <div className="space-y-2">
                    {auditLog.map(entry => (
                      <div 
                        key={entry.id}
                        className="p-3 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-medium text-neutral-300">{entry.action}</p>
                            {entry.reason && (
                              <p className="text-[10px] text-neutral-500 mt-0.5">Sebep: {entry.reason}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-neutral-500">{entry.date.toLocaleDateString('tr-TR')}</p>
                            <p className="text-[10px] text-neutral-600">{entry.admin}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Suspend Modal */}
      <AnimatePresence>
        {showSuspendModal && selectedUser && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuspendModal(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 w-full max-w-md z-50 p-6 rounded-2xl"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.1)", x: "-50%", y: "-50%" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Hesabi Askiya Al</h3>
              <p className="text-sm text-neutral-400 mb-5">{selectedUser.name} hesabini askiya almak uzeresiniz.</p>

              {/* Duration Selection */}
              <div className="mb-4">
                <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">SURE</label>
                <div className="flex gap-2">
                  {[
                    { value: '1', label: '1 Gun' },
                    { value: '7', label: '7 Gun' },
                    { value: 'indefinite', label: 'Suresiz' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSuspendDuration(opt.value as typeof suspendDuration)}
                      className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: suspendDuration === opt.value ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${suspendDuration === opt.value ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: suspendDuration === opt.value ? '#ef4444' : '#a3a3a3',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reason Dropdown */}
              <div className="mb-4">
                <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">SEBEP</label>
                <div className="relative">
                  <select
                    value={suspendReason}
                    onChange={(e) => setSuspendReason(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none appearance-none"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#e5e5e5" }}
                  >
                    <option value="">Sebep secin...</option>
                    <option value="Guvenlik ihlali">Guvenlik ihlali</option>
                    <option value="Politika ihlali">Politika ihlali</option>
                    <option value="Supheli aktivite">Supheli aktivite</option>
                    <option value="Izinsiz veri erisimi">Izinsiz veri erisimi</option>
                    <option value="Diger">Diger</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                </div>
              </div>

              {/* Note */}
              <div className="mb-6">
                <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">NOT (OPSIYONEL)</label>
                <textarea
                  value={suspendNote}
                  onChange={(e) => setSuspendNote(e.target.value)}
                  placeholder="Ek aciklama..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#e5e5e5" }}
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuspendModal(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium"
                  style={{ background: "rgba(255,255,255,0.05)", color: "#a3a3a3" }}
                >
                  Iptal
                </button>
                <button
                  onClick={suspendAccount}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(239, 68, 68, 0.2)", border: "1px solid rgba(239, 68, 68, 0.4)", color: "#ef4444" }}
                >
                  Askiya Al
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Security Action Button Component
function SecurityActionButton({ 
  icon: Icon, 
  label, 
  description, 
  onClick, 
  color, 
  disabled = false,
  active = false 
}: { 
  icon: React.ElementType
  label: string
  description: string
  onClick: () => void
  color: string
  disabled?: boolean
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-3 rounded-xl text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ 
        background: active ? `${color}15` : "rgba(255,255,255,0.02)", 
        border: `1px solid ${active ? `${color}30` : 'rgba(255,255,255,0.06)'}` 
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-4 h-4" style={{ color: active ? color : '#737373' }} />
        <span className="text-xs font-medium" style={{ color: active ? color : '#e5e5e5' }}>{label}</span>
      </div>
      <p className="text-[10px] text-neutral-500">{description}</p>
    </button>
  )
}

// Permission Catalog Types and Data
type RoleType = 'admin' | 'genel_mudur' | 'mudur' | 'personel' | 'izleyici'

interface Permission {
  id: string
  label: string
  enabled: boolean
}

interface ModulePermissions {
  menuAccess: boolean
  view: boolean
  create: boolean
  edit: boolean
  delete: boolean
  customActions: Permission[]
}

interface RolePermissions {
  [moduleId: string]: ModulePermissions
}

const roles: { id: RoleType; label: string; color: string }[] = [
  { id: 'admin', label: 'Admin', color: '#a855f7' },
  { id: 'genel_mudur', label: 'Genel Mudur', color: '#10b981' },
  { id: 'mudur', label: 'Mudur', color: '#3b82f6' },
  { id: 'personel', label: 'Personel', color: '#f59e0b' },
  { id: 'izleyici', label: 'Izleyici', color: '#737373' },
]

const mockUsers = [
  { id: 'u1', name: 'Ahmet Yilmaz', role: 'mudur' as RoleType },
  { id: 'u2', name: 'Mehmet Kaya', role: 'personel' as RoleType },
  { id: 'u3', name: 'Elif Yildiz', role: 'genel_mudur' as RoleType },
  { id: 'u4', name: 'Can Ozturk', role: 'izleyici' as RoleType },
]

const modules = [
  { id: 'analizler', label: 'Analizler', icon: '📊' },
  { id: 'arena', label: 'Arena', icon: '🏆' },
  { id: 'personel', label: 'Personel Merkezi', icon: '👥' },
  { id: 'mesai', label: 'Mesai Takvimi', icon: '📅' },
  { id: 'ayarlar', label: 'Ayarlar', icon: '⚙️' },
]

const moduleCustomActions: { [key: string]: { id: string; label: string }[] } = {
  analizler: [
    { id: 'rapor_goruntule', label: 'Rapor goruntule' },
    { id: 'rapor_calistir', label: 'Rapor calistir' },
    { id: 'sunum_ekrani', label: 'Sunum ekranini gor' },
    { id: 'excel_yukle', label: 'Excel yukle (yonetim)' },
    { id: 'lig_ekrani', label: 'Lig ekranini gor' },
  ],
  arena: [
    { id: 'arena_goruntule', label: 'Goruntule' },
    { id: 'arena_duzenle', label: 'Duzenle (yarisma/lig ayarlari)' },
    { id: 'arena_yayinla', label: 'Yayinla' },
  ],
  personel: [
    { id: 'personel_ekle', label: 'Personel ekle' },
    { id: 'personel_pasif', label: 'Personel cikar/pasife al' },
    { id: 'personel_sil', label: 'Personel sil' },
    { id: 'rol_ata', label: 'Rol ata' },
  ],
  mesai: [
    { id: 'mesai_goruntule', label: 'Mesai goruntule' },
    { id: 'mesai_duzenle', label: 'Mesai duzenle' },
    { id: 'toplu_duzenleme', label: 'Toplu duzenleme' },
    { id: 'onayla_iptal', label: 'Onayla/iptal et' },
  ],
  ayarlar: [
    { id: 'kullanici_yonet', label: 'Kullanici yonet' },
    { id: 'yetki_yonet', label: 'Yetki yonet' },
    { id: 'guvenlik_yonet', label: 'Guvenlik politikalari yonet' },
    { id: 'veri_yukleme_yonet', label: 'Veri yukleme yonet' },
  ],
}

// Default permissions by role
const getDefaultPermissions = (role: RoleType): RolePermissions => {
  const base: RolePermissions = {}
  
  modules.forEach(mod => {
    const customActions = (moduleCustomActions[mod.id] || []).map(action => ({
      id: action.id,
      label: action.label,
      enabled: role === 'admin',
    }))
    
    if (role === 'admin') {
      base[mod.id] = { menuAccess: true, view: true, create: true, edit: true, delete: true, customActions }
    } else if (role === 'genel_mudur') {
      base[mod.id] = { 
        menuAccess: true, 
        view: true, 
        create: mod.id !== 'ayarlar', 
        edit: mod.id !== 'ayarlar', 
        delete: false, 
        customActions: customActions.map(a => ({ ...a, enabled: !a.id.includes('sil') && !a.id.includes('yonet') }))
      }
    } else if (role === 'mudur') {
      base[mod.id] = { 
        menuAccess: mod.id !== 'ayarlar', 
        view: mod.id !== 'ayarlar', 
        create: mod.id === 'personel' || mod.id === 'mesai', 
        edit: mod.id === 'personel' || mod.id === 'mesai', 
        delete: false, 
        customActions: customActions.map(a => ({ ...a, enabled: a.id.includes('goruntule') || a.id.includes('duzenle') }))
      }
    } else if (role === 'personel') {
      base[mod.id] = { 
        menuAccess: mod.id !== 'ayarlar' && mod.id !== 'arena', 
        view: mod.id !== 'ayarlar' && mod.id !== 'arena', 
        create: false, 
        edit: false, 
        delete: false, 
        customActions: customActions.map(a => ({ ...a, enabled: a.id.includes('goruntule') }))
      }
    } else {
      base[mod.id] = { 
        menuAccess: mod.id === 'analizler', 
        view: mod.id === 'analizler', 
        create: false, 
        edit: false, 
        delete: false, 
        customActions: customActions.map(a => ({ ...a, enabled: false }))
      }
    }
  })
  
  return base
}

// Permission templates
const permissionTemplates = [
  { id: 'sadece_goruntule', label: 'Sadece Goruntule', color: '#737373' },
  { id: 'operasyon', label: 'Operasyon', color: '#3b82f6' },
  { id: 'analist', label: 'Analist', color: '#10b981' },
  { id: 'yonetim', label: 'Yonetim', color: '#a855f7' },
]

// Admin: Authorization - Permission Catalog
function YetkilendirmeContent() {
  const [selectedRole, setSelectedRole] = useState<RoleType>('mudur')
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedModule, setSelectedModule] = useState('analizler')
  const [permissions, setPermissions] = useState<RolePermissions>(() => getDefaultPermissions('mudur'))
  const [hasChanges, setHasChanges] = useState(false)

  // Handle role change
  const handleRoleChange = (role: RoleType) => {
    setSelectedRole(role)
    setSelectedUser(null)
    setPermissions(getDefaultPermissions(role))
    setHasChanges(false)
  }

  // Handle template apply
  const applyTemplate = (templateId: string) => {
    const newPerms = { ...permissions }
    const mod = newPerms[selectedModule]
    
    if (templateId === 'sadece_goruntule') {
      mod.menuAccess = true
      mod.view = true
      mod.create = false
      mod.edit = false
      mod.delete = false
      mod.customActions = mod.customActions.map(a => ({ ...a, enabled: a.id.includes('goruntule') }))
    } else if (templateId === 'operasyon') {
      mod.menuAccess = true
      mod.view = true
      mod.create = true
      mod.edit = true
      mod.delete = false
      mod.customActions = mod.customActions.map(a => ({ ...a, enabled: !a.id.includes('sil') && !a.id.includes('yonet') }))
    } else if (templateId === 'analist') {
      mod.menuAccess = true
      mod.view = true
      mod.create = true
      mod.edit = false
      mod.delete = false
      mod.customActions = mod.customActions.map(a => ({ ...a, enabled: a.id.includes('rapor') || a.id.includes('goruntule') || a.id.includes('sunum') }))
    } else if (templateId === 'yonetim') {
      mod.menuAccess = true
      mod.view = true
      mod.create = true
      mod.edit = true
      mod.delete = true
      mod.customActions = mod.customActions.map(a => ({ ...a, enabled: true }))
    }
    
    setPermissions(newPerms)
    setHasChanges(true)
  }

  // Toggle permission
  const togglePermission = (field: keyof ModulePermissions | string, customActionId?: string) => {
    const newPerms = { ...permissions }
    const mod = newPerms[selectedModule]
    
    if (customActionId) {
      mod.customActions = mod.customActions.map(a => 
        a.id === customActionId ? { ...a, enabled: !a.enabled } : a
      )
    } else {
      (mod as Record<string, unknown>)[field] = !(mod as Record<string, boolean>)[field as keyof ModulePermissions]
    }
    
    setPermissions(newPerms)
    setHasChanges(true)
  }

  // Get active permissions count
  const getActivePermissionsCount = () => {
    let count = 0
    Object.values(permissions).forEach(mod => {
      if (mod.menuAccess) count++
      if (mod.view) count++
      if (mod.create) count++
      if (mod.edit) count++
      if (mod.delete) count++
      mod.customActions.forEach(a => { if (a.enabled) count++ })
    })
    return count
  }

  const currentModule = permissions[selectedModule]
  const currentRoleInfo = roles.find(r => r.id === selectedRole)

  return (
    <div className="space-y-6">
      <AdminBadge />
      
      {/* Top Selectors */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Role Selector */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">ROL SEC</label>
          <div className="flex gap-2 flex-wrap">
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => handleRoleChange(role.id)}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: selectedRole === role.id ? `${role.color}20` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selectedRole === role.id ? `${role.color}50` : 'rgba(255,255,255,0.08)'}`,
                  color: selectedRole === role.id ? role.color : '#a3a3a3',
                }}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        {/* User Override Selector */}
        <div className="min-w-[180px]">
          <label className="text-[10px] font-semibold text-neutral-500 mb-2 block tracking-wider">KULLANICI (OVERRIDE)</label>
          <select
            value={selectedUser || ''}
            onChange={(e) => setSelectedUser(e.target.value || null)}
            className="w-full px-3 py-2 rounded-lg text-xs font-medium outline-none"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#e5e5e5',
            }}
          >
            <option value="">Rol bazli (varsayilan)</option>
            {mockUsers.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Template Buttons */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-neutral-500 tracking-wider">HAZIR SABLONLAR</span>
        <div className="flex gap-2">
          {permissionTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => applyTemplate(template.id)}
              className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:opacity-80"
              style={{
                background: `${template.color}15`,
                border: `1px solid ${template.color}30`,
                color: template.color,
              }}
            >
              {template.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Module List + Permission Panel */}
      <div className="flex gap-4">
        {/* Left - Module List */}
        <div 
          className="w-48 shrink-0 rounded-2xl p-3"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-[10px] font-semibold text-neutral-500 tracking-wider px-2 mb-2 block">MODULLER</span>
          <div className="space-y-1">
            {modules.map(mod => {
              const modPerms = permissions[mod.id]
              const isActive = modPerms?.menuAccess
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod.id)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
                  style={{
                    background: selectedModule === mod.id ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                    border: selectedModule === mod.id ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid transparent',
                  }}
                >
                  <span className="text-sm">{mod.icon}</span>
                  <span 
                    className="text-xs font-medium flex-1"
                    style={{ color: selectedModule === mod.id ? '#a855f7' : '#a3a3a3' }}
                  >
                    {mod.label}
                  </span>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ background: isActive ? '#10b981' : '#525252' }}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Right - Permissions Panel */}
        <div 
          className="flex-1 rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Module Header */}
          <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{modules.find(m => m.id === selectedModule)?.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-white">{modules.find(m => m.id === selectedModule)?.label}</h3>
                <p className="text-[10px] text-neutral-500 mt-0.5">Izin ayarlarini yapilandirin</p>
              </div>
            </div>
            <div 
              className="px-3 py-1.5 rounded-lg flex items-center gap-2"
              style={{ background: currentModule?.menuAccess ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}
            >
              {currentModule?.menuAccess ? (
                <Eye className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-red-400" />
              )}
              <span 
                className="text-[11px] font-semibold"
                style={{ color: currentModule?.menuAccess ? '#10b981' : '#ef4444' }}
              >
                {currentModule?.menuAccess ? 'Menu Gorunur' : 'Menu Gizli'}
              </span>
            </div>
          </div>

          {/* Menu Access Toggle */}
          <div 
            className="flex items-center justify-between p-4 rounded-xl mb-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div>
              <p className="text-sm font-medium text-white">Menu Erisimi</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">Bu modul ana menude gorunsun mu?</p>
            </div>
            <ToggleSwitch 
              checked={currentModule?.menuAccess || false}
              onChange={() => togglePermission('menuAccess')}
            />
          </div>

          {/* CRUD Permissions */}
          <div className="mb-5">
            <span className="text-[10px] font-semibold text-neutral-500 tracking-wider mb-3 block">TEMEL ISLEMLER</span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: 'view', label: 'Goruntule', icon: Eye },
                { key: 'create', label: 'Olustur', icon: () => <span className="text-sm">+</span> },
                { key: 'edit', label: 'Duzenle', icon: () => <span className="text-sm">✎</span> },
                { key: 'delete', label: 'Sil', icon: () => <span className="text-sm">🗑</span> },
              ].map(perm => {
                const isEnabled = currentModule?.[perm.key as keyof ModulePermissions] as boolean
                return (
                  <button
                    key={perm.key}
                    onClick={() => togglePermission(perm.key)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                    style={{
                      background: isEnabled ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isEnabled ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: isEnabled ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)' }}
                    >
                      {typeof perm.icon === 'function' ? <perm.icon /> : <perm.icon className="w-4 h-4" style={{ color: isEnabled ? '#10b981' : '#737373' }} />}
                    </div>
                    <span 
                      className="text-[11px] font-medium"
                      style={{ color: isEnabled ? '#10b981' : '#737373' }}
                    >
                      {perm.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Custom Actions */}
          <div>
            <span className="text-[10px] font-semibold text-neutral-500 tracking-wider mb-3 block">MODULE OZEL AKSIYONLAR</span>
            <div className="space-y-2">
              {currentModule?.customActions.map(action => (
                <div 
                  key={action.id}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="text-xs text-neutral-300">{action.label}</span>
                  <ToggleSwitch 
                    checked={action.enabled}
                    onChange={() => togglePermission('custom', action.id)}
                    small
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div 
        className="p-4 rounded-2xl"
        style={{ background: `${currentRoleInfo?.color}10`, border: `1px solid ${currentRoleInfo?.color}25` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${currentRoleInfo?.color}20` }}
            >
              <KeyRound className="w-5 h-5" style={{ color: currentRoleInfo?.color }} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {currentRoleInfo?.label} - Etkin Yetkiler Ozeti
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Toplam {getActivePermissionsCount()} izin aktif
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="text-[11px] text-amber-500 font-medium">Kaydedilmemis degisiklikler</span>
            )}
            <motion.button
              onClick={() => setHasChanges(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{
                background: hasChanges ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))' : 'rgba(255,255,255,0.03)',
                border: hasChanges ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid rgba(255,255,255,0.08)',
                color: hasChanges ? '#a855f7' : '#525252',
              }}
              whileHover={hasChanges ? { scale: 1.02 } : {}}
              whileTap={hasChanges ? { scale: 0.98 } : {}}
            >
              Kaydet
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Admin: Data Upload Center
function VeriYuklemeContent() {
  const [activeTab, setActiveTab] = useState<'upload' | 'commission'>('upload')
  // Upload state
  const [selectedSite, setSelectedSite] = useState('')
  const [showSiteDropdown, setShowSiteDropdown] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })
  const [uploadMode, setUploadMode] = useState<'daily' | 'custom'>('daily')
  const [customDate, setCustomDate] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  // Commission state
  const [commissionSite, setCommissionSite] = useState('')
  const [showCommissionSiteDropdown, setShowCommissionSiteDropdown] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [isLoadingMethods, setIsLoadingMethods] = useState(false)
  const [editingMethod, setEditingMethod] = useState<string | null>(null)
  const [newMethodName, setNewMethodName] = useState('')
  const [newMethodExcelName, setNewMethodExcelName] = useState('')
  const [newMethodRate, setNewMethodRate] = useState('')
  const [newMethodCekimRate, setNewMethodCekimRate] = useState('')
  const [newMethodBakiye, setNewMethodBakiye] = useState('')
  const [testGrossAmount, setTestGrossAmount] = useState('')
  // Shared state
  const [sites, setSites] = useState<any[]>([])
  const [isLoadingSites, setIsLoadingSites] = useState(true)
  const [recentUploads, setRecentUploads] = useState<any[]>([])
  const [isLoadingUploads, setIsLoadingUploads] = useState(true)

  const loadSites = useCallback(async () => {
    try {
      setIsLoadingSites(true)
      const res = await fetch('/api/admin/sites')
      if (res.ok) {
        const data = await res.json()
        setSites(data.sites || [])
      }
    } catch (error) {
      console.error('Failed to load sites:', error)
    } finally {
      setIsLoadingSites(false)
    }
  }, [])

  const loadRecentUploads = useCallback(async () => {
    try {
      setIsLoadingUploads(true)
      const res = await fetch('/api/data-upload/list')
      if (res.ok) {
        const data = await res.json()
        setRecentUploads(data.uploads || [])
      }
    } catch (error) {
      console.error('Failed to load uploads:', error)
    } finally {
      setIsLoadingUploads(false)
    }
  }, [])

  const loadPaymentMethods = useCallback(async (siteId: string) => {
    try {
      setIsLoadingMethods(true)
      const res = await fetch(`/api/payment-methods?siteId=${siteId}`)
      if (res.ok) {
        const data = await res.json()
        setPaymentMethods(data.methods || [])
      }
    } catch (error) {
      console.error('Failed to load payment methods:', error)
    } finally {
      setIsLoadingMethods(false)
    }
  }, [])

  useEffect(() => {
    loadSites()
    loadRecentUploads()
  }, [loadSites, loadRecentUploads])

  useEffect(() => {
    if (commissionSite) {
      loadPaymentMethods(commissionSite)
    }
  }, [commissionSite, loadPaymentMethods])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setUploadStatus({ type: null, message: '' })
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedSite) {
      setUploadStatus({ type: 'error', message: 'Dosya ve site seciniz' })
      return
    }

    setIsUploading(true)
    setUploadStatus({ type: null, message: '' })

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('siteId', selectedSite)
      formData.append('fileType', 'EXCEL')
      formData.append('analyticModule', 'FINANS')
      if (uploadMode === 'custom' && customDate) {
        formData.append('snapshotDate', customDate)
      }
      formData.append('snapshotHour', 'daily')

      const res = await fetch('/api/data-upload/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        setUploadStatus({ type: 'success', message: 'Dosya basariyla yuklendi ve isleniyor' })
        setSelectedFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
        loadRecentUploads()
      } else {
        setUploadStatus({ type: 'error', message: data.error || 'Yukleme basarisiz' })
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus({ type: 'error', message: 'Yukleme basarisiz' })
    } finally {
      setIsUploading(false)
    }
  }

  const addPaymentMethod = async () => {
    if (!newMethodName || !commissionSite) return
    try {
      const res = await fetch('/api/payment-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId: commissionSite,
          name: newMethodName,
          excelKolonAdi: newMethodExcelName || newMethodName,
          komisyonOrani: parseFloat(newMethodRate) || 0,
          cekimKomisyonOrani: parseFloat(newMethodCekimRate) || 0,
          baslangicBakiye: parseFloat(newMethodBakiye) || 0,
        }),
      })
      if (res.ok) {
        setNewMethodName('')
        setNewMethodExcelName('')
        setNewMethodRate('')
        setNewMethodCekimRate('')
        setNewMethodBakiye('')
        loadPaymentMethods(commissionSite)
      } else {
        const data = await res.json()
        alert(data.error || 'Eklenemedi')
      }
    } catch (error) {
      console.error('Add method error:', error)
    }
  }

  const updateMethodField = async (id: string, field: string, value: string | number) => {
    try {
      await fetch(`/api/payment-methods/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      })
      loadPaymentMethods(commissionSite)
      setEditingMethod(null)
    } catch (error) {
      console.error('Update method error:', error)
    }
  }

  const deleteMethod = async (id: string) => {
    try {
      await fetch(`/api/payment-methods/${id}`, { method: 'DELETE' })
      loadPaymentMethods(commissionSite)
    } catch (error) {
      console.error('Delete method error:', error)
    }
  }

  const calculateCommission = (grossAmount: number, rate: number) => {
    const commission = grossAmount * (rate / 100)
    const netAmount = grossAmount - commission
    return { commission, netAmount }
  }

  // Site dropdown renderer (reused in both tabs)
  const renderSiteDropdown = (
    value: string,
    setValue: (v: string) => void,
    isOpen: boolean,
    setIsOpen: (v: boolean) => void,
    color: 'purple' | 'cyan' = 'purple'
  ) => {
    const colors = color === 'purple'
      ? { bg: 'rgba(168, 85, 247, 0.08)', border: 'rgba(168, 85, 247, 0.2)', text: '#a855f7', class: 'text-purple-400' }
      : { bg: 'rgba(6, 182, 212, 0.08)', border: 'rgba(6, 182, 212, 0.2)', text: '#06b6d4', class: 'text-cyan-400' }

    return (
      <div className="relative">
        <label className="text-xs font-medium text-neutral-500 mb-2 block">Site Secimi</label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 rounded-xl text-sm text-left flex items-center justify-between transition-all"
          style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
        >
          <span className={value ? 'text-white' : 'text-neutral-500'}>
            {isLoadingSites ? 'Yukleniyor...' : (value ? sites.find(s => s.id === value)?.name : 'Site seciniz...')}
          </span>
          <ChevronDown size={16} className={colors.class} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-full rounded-xl overflow-hidden z-20"
              style={{ background: 'rgba(15, 15, 15, 0.98)', border: `1px solid ${colors.border}`, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' }}
            >
              {sites.map(site => (
                <button
                  key={site.id}
                  onClick={() => { setValue(site.id); setIsOpen(false) }}
                  className="w-full px-4 py-3 text-left text-sm transition-all flex items-center gap-2"
                  style={{ background: value === site.id ? `${colors.text}26` : 'transparent', color: value === site.id ? colors.text : '#a3a3a3' }}
                >
                  {value === site.id && <Check size={14} />}
                  {site.name}
                </button>
              ))}
              {sites.length === 0 && !isLoadingSites && (
                <p className="px-4 py-3 text-sm text-neutral-500">Site bulunamadi</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AdminBadge />

      {/* Tab Switcher */}
      <div
        className="flex p-1 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <button
          onClick={() => setActiveTab('upload')}
          className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
          style={{ background: activeTab === 'upload' ? 'rgba(168, 85, 247, 0.15)' : 'transparent', color: activeTab === 'upload' ? '#a855f7' : '#737373' }}
        >
          <Upload size={16} />
          Veri Yukleme
        </button>
        <button
          onClick={() => setActiveTab('commission')}
          className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
          style={{ background: activeTab === 'commission' ? 'rgba(6, 182, 212, 0.15)' : 'transparent', color: activeTab === 'commission' ? '#06b6d4' : '#737373' }}
        >
          <Percent size={16} />
          Komisyon Yonetimi
        </button>
      </div>

      {activeTab === 'upload' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Site Selector */}
          {renderSiteDropdown(selectedSite, setSelectedSite, showSiteDropdown, setShowSiteDropdown, 'purple')}

          {/* Upload Mode Tabs */}
          {selectedSite && (
            <div className="flex gap-2">
              <button
                onClick={() => setUploadMode('daily')}
                className="px-4 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ background: uploadMode === 'daily' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255,255,255,0.03)', color: uploadMode === 'daily' ? '#a855f7' : '#737373' }}
              >
                Gunluk Excel
              </button>
              <button
                onClick={() => setUploadMode('custom')}
                className="px-4 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ background: uploadMode === 'custom' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255,255,255,0.03)', color: uploadMode === 'custom' ? '#a855f7' : '#737373' }}
              >
                Gecmis Gun Yukle
              </button>
            </div>
          )}

          {/* Date Picker for Custom Mode */}
          {selectedSite && uploadMode === 'custom' && (
            <div>
              <label className="text-xs font-medium text-neutral-500 mb-2 block">Tarih Secimi</label>
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-white"
                style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.2)', colorScheme: 'dark' }}
              />
            </div>
          )}

          {/* Upload Area */}
          <div
            className={`p-8 rounded-2xl border-2 border-dashed text-center transition-all ${selectedSite ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}
            style={{ borderColor: 'rgba(168, 85, 247, 0.3)', background: 'rgba(168, 85, 247, 0.03)' }}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
            onDrop={(e) => {
              e.preventDefault(); e.stopPropagation()
              if (e.dataTransfer.files?.[0]) {
                setSelectedFile(e.dataTransfer.files[0])
                setUploadStatus({ type: null, message: '' })
              }
            }}
          >
            {isUploading ? (
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-purple-400 animate-spin" />
            ) : (
              <Upload className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            )}
            <h3 className="text-white font-semibold mb-2">
              {selectedFile ? selectedFile.name : 'Dosya Yukle'}
            </h3>
            <p className="text-sm text-neutral-500 mb-2">
              {selectedSite
                ? selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(1)} KB - ${sites.find(s => s.id === selectedSite)?.name}`
                  : `${sites.find(s => s.id === selectedSite)?.name} icin Excel dosyasi yukleyin`
                : 'Oncelikle site seciniz'}
            </p>
            <p className="text-xs text-neutral-600 mb-4">Excel (.xlsx, .xls) veya CSV dosyalarini surukleyin</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}
                disabled={isUploading}
              >
                Dosya Sec
              </button>
              {selectedFile && (
                <button
                  onClick={handleUpload}
                  disabled={isUploading || (uploadMode === 'custom' && !customDate)}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                  style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}
                >
                  {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  Yukle
                </button>
              )}
            </div>
          </div>

          {/* Upload Status */}
          {uploadStatus.type && (
            <div
              className="flex items-center gap-2 p-3 rounded-xl text-sm"
              style={{
                background: uploadStatus.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${uploadStatus.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                color: uploadStatus.type === 'success' ? '#10b981' : '#ef4444',
              }}
            >
              {uploadStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {uploadStatus.message}
            </div>
          )}

          {/* Recent Uploads */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Son Yuklemeler</h3>
              <button onClick={loadRecentUploads} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <RefreshCw size={14} className={`text-neutral-500 ${isLoadingUploads ? 'animate-spin' : ''}`} />
              </button>
            </div>
            {isLoadingUploads ? (
              <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-purple-400" /></div>
            ) : recentUploads.length === 0 ? (
              <p className="text-sm text-neutral-500 text-center py-6">Henuz yukleme yapilmamis</p>
            ) : (
              <div className="space-y-2">
                {recentUploads.slice(0, 10).map((upload: any) => (
                  <UploadHistoryItem
                    key={upload.id}
                    name={upload.fileName}
                    date={new Date(upload.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    status={upload.status === 'COMPLETED' ? 'success' : upload.status === 'FAILED' ? 'error' : 'processing'}
                    site={upload.site?.name}
                    dataType={upload.analyticModule}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {activeTab === 'commission' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Commission Site Selector */}
          {renderSiteDropdown(commissionSite, setCommissionSite, showCommissionSiteDropdown, setShowCommissionSiteDropdown, 'cyan')}

          {commissionSite && (
            <>
              {/* Payment Methods List */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white">Odeme Yontemleri</h4>
                  <span className="text-xs text-neutral-500">
                    {isLoadingMethods ? 'Yukleniyor...' : `${paymentMethods.length} yontem kayitli`}
                  </span>
                </div>

                {isLoadingMethods ? (
                  <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 animate-spin text-cyan-400" /></div>
                ) : paymentMethods.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {paymentMethods.map((method: any) => (
                      <div key={method.id} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
                              <Building2 size={14} className="text-cyan-400" />
                            </div>
                            <div>
                              <span className="text-sm text-white">{method.name}</span>
                              {method.excelKolonAdi && method.excelKolonAdi !== method.name && (
                                <p className="text-[10px] text-neutral-600">Excel: {method.excelKolonAdi}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {editingMethod === method.id ? (
                              <input
                                type="number"
                                step="0.1"
                                defaultValue={method.komisyonOrani}
                                className="w-16 px-2 py-1 rounded-lg text-xs text-white text-center"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(6, 182, 212, 0.3)' }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') updateMethodField(method.id, 'komisyonOrani', parseFloat((e.target as HTMLInputElement).value))
                                  if (e.key === 'Escape') setEditingMethod(null)
                                }}
                                autoFocus
                              />
                            ) : (
                              <span
                                className="px-2 py-1 rounded-lg text-xs font-medium cursor-pointer"
                                style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}
                                onClick={() => setEditingMethod(method.id)}
                                title="Yatirim komisyonu"
                              >
                                Y%{method.komisyonOrani}
                              </span>
                            )}
                            <span className="px-2 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }} title="Cekim komisyonu">
                              C%{method.cekimKomisyonOrani}
                            </span>
                            <span className="px-2 py-1 rounded-lg text-xs font-mono" style={{ background: 'rgba(255,255,255,0.05)', color: '#a3a3a3' }} title="Baslangic bakiye">
                              {method.baslangicBakiye.toLocaleString('tr-TR')}
                            </span>
                            <button onClick={() => deleteMethod(method.id)} className="p-1.5 rounded-lg transition-colors hover:bg-red-500/20">
                              <Trash2 size={14} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 text-center py-4 mb-4">Bu site icin kayitli odeme yontemi yok</p>
                )}

                {/* Add New Method */}
                <div className="space-y-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-xs text-neutral-500 mb-2">Yeni Odeme Yontemi Ekle</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Yontem adi (orn: Papara)"
                      value={newMethodName}
                      onChange={(e) => setNewMethodName(e.target.value)}
                      className="px-3 py-2 rounded-xl text-sm text-white placeholder:text-neutral-600"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                    <input
                      type="text"
                      placeholder="Excel kolon adi (opsiyonel)"
                      value={newMethodExcelName}
                      onChange={(e) => setNewMethodExcelName(e.target.value)}
                      className="px-3 py-2 rounded-xl text-sm text-white placeholder:text-neutral-600"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Yatirim %"
                      value={newMethodRate}
                      onChange={(e) => setNewMethodRate(e.target.value)}
                      className="px-3 py-2 rounded-xl text-sm text-white placeholder:text-neutral-600 text-center"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Cekim %"
                      value={newMethodCekimRate}
                      onChange={(e) => setNewMethodCekimRate(e.target.value)}
                      className="px-3 py-2 rounded-xl text-sm text-white placeholder:text-neutral-600 text-center"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                    <input
                      type="number"
                      placeholder="Baslangic bakiye"
                      value={newMethodBakiye}
                      onChange={(e) => setNewMethodBakiye(e.target.value)}
                      className="px-3 py-2 rounded-xl text-sm text-white placeholder:text-neutral-600 text-center"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>
                  <button
                    onClick={addPaymentMethod}
                    disabled={!newMethodName}
                    className="w-full px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}
                  >
                    <Plus size={14} />
                    Ekle
                  </button>
                </div>
              </div>

              {/* Commission Calculator */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 className="text-sm font-semibold text-white mb-4">Komisyon Hesaplayici</h4>
                <p className="text-xs text-neutral-500 mb-4">
                  Formul: Net Yatirim = Brut Yatirim - (Brut Yatirim x Komisyon Orani / 100)
                </p>
                <div className="flex gap-3 mb-4">
                  <input
                    type="number"
                    placeholder="Brut Yatirim Tutari"
                    value={testGrossAmount}
                    onChange={(e) => setTestGrossAmount(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>
                {testGrossAmount && paymentMethods.length > 0 && (
                  <div className="space-y-2">
                    {paymentMethods.map((method: any) => {
                      const { commission, netAmount } = calculateCommission(parseFloat(testGrossAmount), method.komisyonOrani)
                      return (
                        <div key={method.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <span className="text-sm text-neutral-400">{method.name} (%{method.komisyonOrani})</span>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-red-400">-{commission.toLocaleString('tr-TR')} TL</span>
                            <span className="text-emerald-400 font-medium">{netAmount.toLocaleString('tr-TR')} TL</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  )
}

// Admin: Security Policies
function GuvenlikPolitikalariContent() {
  return (
    <div className="space-y-6">
      <AdminBadge />
      
      <div className="space-y-4">
        <PolicyItem 
          title="Sifre Politikasi" 
          description="Minimum 8 karakter, buyuk/kucuk harf, rakam ve ozel karakter"
          enabled 
        />
        <PolicyItem 
          title="Oturum Zaman Asimi" 
          description="30 dakika inaktivite sonrasi otomatik cikis"
          enabled 
        />
        <PolicyItem 
          title="IP Kisitlamasi" 
          description="Sadece beyaz listedeki IP adreslerinden erisim"
          enabled={false}
        />
        <PolicyItem 
          title="Coklu Oturum Engeli" 
          description="Ayni anda tek cihazdan giris"
          enabled={false}
        />
      </div>
    </div>
  )
}

// Admin: Login Records
function GirisKayitlariContent() {
  return (
    <div className="space-y-6">
      <AdminBadge />
      
      <div className="space-y-2">
        <LogRow user="Ahmet Yilmaz" action="Giris" ip="192.168.1.1" time="14:32" status="success" />
        <LogRow user="Mehmet Kaya" action="Giris" ip="192.168.1.45" time="14:28" status="success" />
        <LogRow user="Bilinmeyen" action="Giris Denemesi" ip="45.67.89.123" time="14:15" status="failed" />
        <LogRow user="Ayse Demir" action="Cikis" ip="192.168.1.22" time="13:45" status="success" />
        <LogRow user="Can Ozturk" action="Sifre Degisikligi" ip="192.168.1.33" time="12:30" status="success" />
      </div>
    </div>
  )
}

// Reusable Components
function InputField({ label, icon: Icon, ...props }: { label: string; icon?: React.ElementType; [key: string]: unknown }) {
  return (
    <div>
      <label className="text-xs font-medium text-neutral-500 mb-2 block">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />}
        <input 
          className={`w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none transition-all ${Icon ? "pl-11" : ""}`}
          style={{ 
            background: "rgba(255, 255, 255, 0.03)", 
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
          {...props}
        />
      </div>
    </div>
  )
}

function ToggleSwitch({ 
  defaultChecked = false, 
  checked: controlledChecked, 
  onChange,
  small = false 
}: { 
  defaultChecked?: boolean
  checked?: boolean
  onChange?: () => void
  small?: boolean
}) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked
  
  const handleClick = () => {
    if (onChange) {
      onChange()
    } else {
      setInternalChecked(!internalChecked)
    }
  }

  return (
    <button 
      onClick={handleClick}
      className={`${small ? 'w-9 h-5' : 'w-12 h-7'} rounded-full p-0.5 transition-colors`}
      style={{ background: isChecked ? "#10b981" : "rgba(255, 255, 255, 0.1)" }}
    >
      <motion.div 
        className={`${small ? 'w-4 h-4' : 'w-6 h-6'} rounded-full bg-white`}
        animate={{ x: isChecked ? (small ? 16 : 20) : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  )
}

function SaveButton() {
  return (
    <motion.button
      className="w-full py-3.5 rounded-xl text-sm font-semibold"
      style={{ 
        background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))",
        border: "1px solid rgba(168, 85, 247, 0.4)",
        color: "#a855f7",
      }}
      whileHover={{ 
        background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(139, 92, 246, 0.3))",
      }}
      whileTap={{ scale: 0.98 }}
    >
      Degisiklikleri Kaydet
    </motion.button>
  )
}

function SessionItem({ device, location, current = false }: { device: string; location: string; current?: boolean }) {
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-xl"
      style={{ background: "rgba(255, 255, 255, 0.02)", border: current ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
          <Settings className="w-5 h-5 text-neutral-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{device}</p>
          <p className="text-xs text-neutral-500">{location}</p>
        </div>
      </div>
      {current ? (
        <span className="text-xs font-medium text-emerald-500">Bu Cihaz</span>
      ) : (
        <button className="text-xs text-red-400 hover:text-red-300">Sonlandir</button>
      )}
    </div>
  )
}

function NotificationGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function NotificationItem({ label, description, defaultChecked = false }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-xl"
      style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
      </div>
      <ToggleSwitch defaultChecked={defaultChecked} />
    </div>
  )
}

function AdminBadge() {
  return (
    <div 
      className="flex items-center gap-2 px-3 py-2 rounded-xl w-fit"
      style={{ background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.2)" }}
    >
      <Crown className="w-4 h-4 text-purple-400" />
      <span className="text-xs font-semibold text-purple-400">Yonetici Paneli</span>
    </div>
  )
}

function NotificationCard({ type, title, message, time }: { type: "warning" | "info" | "success"; title: string; message: string; time: string }) {
  const colors = {
    warning: { bg: "rgba(251, 191, 36, 0.1)", border: "rgba(251, 191, 36, 0.2)", icon: AlertTriangle, iconColor: "#fbbf24" },
    info: { bg: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.2)", icon: Info, iconColor: "#3b82f6" },
    success: { bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.2)", icon: Check, iconColor: "#10b981" },
  }
  const config = colors[type]
  const IconComponent = config.icon

  return (
    <div className="p-4 rounded-xl" style={{ background: config.bg, border: `1px solid ${config.border}` }}>
      <div className="flex items-start gap-3">
        <IconComponent className="w-5 h-5 mt-0.5" style={{ color: config.iconColor }} />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <p className="text-xs text-neutral-400 mt-1">{message}</p>
          <span className="text-[10px] text-neutral-500 mt-2 block">{time}</span>
        </div>
      </div>
    </div>
  )
}



function RoleCard({ role, permissions, color }: { role: string; permissions: string[]; color: string }) {
  return (
    <div 
      className="p-4 rounded-xl"
      style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
        <h4 className="text-sm font-semibold text-white">{role}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {permissions.map((perm, i) => (
          <span 
            key={i}
            className="px-2.5 py-1 rounded-lg text-[10px] font-medium"
            style={{ background: "rgba(255, 255, 255, 0.05)", color: "#a3a3a3" }}
          >
            {perm}
          </span>
        ))}
      </div>
    </div>
  )
}

function PolicyItem({ title, description, enabled }: { title: string; description: string; enabled: boolean }) {
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-xl"
      style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
      </div>
      <ToggleSwitch defaultChecked={enabled} />
    </div>
  )
}

function UploadHistoryItem({ name, date, status, site, dataType }: { name: string; date: string; status: "success" | "error" | "processing"; site?: string; dataType?: string }) {
  const statusConfig = {
    success: { color: '#10b981', label: 'Basarili' },
    error: { color: '#ef4444', label: 'Hata' },
    processing: { color: '#a855f7', label: 'Isleniyor' },
  }
  const cfg = statusConfig[status] || statusConfig.processing
  return (
    <div
      className="flex items-center justify-between p-3 rounded-xl"
      style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-neutral-500" />
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-neutral-500">{date}</p>
            {site && (
              <>
                <span className="text-neutral-600">•</span>
                <span className="text-xs text-purple-400">{site}</span>
              </>
            )}
            {dataType && (
              <>
                <span className="text-neutral-600">•</span>
                <span className="text-xs text-cyan-400">{dataType}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <span className="text-xs font-medium" style={{ color: cfg.color }}>
        {cfg.label}
      </span>
    </div>
  )
}

function LogRow({ user, action, ip, time, status }: { user: string; action: string; ip: string; time: string; status: "success" | "failed" }) {
  return (
    <div 
      className="flex items-center justify-between p-3 rounded-xl"
      style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-white w-32 truncate">{user}</span>
        <span className="text-xs text-neutral-500 w-32">{action}</span>
        <span className="text-xs text-neutral-600 font-mono">{ip}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-neutral-500">{time}</span>
        <span 
          className="w-2 h-2 rounded-full"
          style={{ background: status === "success" ? "#10b981" : "#ef4444" }}
        />
      </div>
    </div>
  )
}

// Main Component
export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState("profil")
  const [isSuperAdmin, setIsSuperAdmin] = useState(true)

  useEffect(() => {
    fetch("/api/me")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.role) {
          setIsSuperAdmin(data.role === "SUPER_ADMIN")
        }
      })
      .catch(() => {})
  }, [])

  const visibleTabs = isSuperAdmin ? tabs : tabs.filter(tab => !tab.isAdminOnly)

  const renderContent = () => {
    switch (activeTab) {
case "profil": return <ProfilContent />
  case "guvenlik": return <GuvenlikContent />
  case "bildirimler": return <BildirimlerContent />
  case "ozellestirme": return <OzellestirmeContent />
  case "taleplerim": return <TaleplerimContent />
  case "yonetim-bildirim": return <YonetimBildirimContent />
      case "site-yonetimi": return <SiteYonetimiContent />
      case "kullanicilar": return <KullanicilarContent />
      case "yetkilendirme": return <YetkilendirmeContent />
      case "veri-yukleme": return <VeriYuklemeContent />
      case "guvenlik-politikalari": return <GuvenlikPolitikalariContent />
      case "giris-kayitlari": return <GirisKayitlariContent />
      default: return <ProfilContent />
    }
  }

  return (
    <div className="min-h-screen py-8 px-6" style={{ background: "#000000" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Ayarlar</h1>
          <p className="text-sm text-neutral-500">Hesap ve sistem ayarlarinizi yonetin</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Tabs */}
          <div className="w-64 shrink-0">
            <div className="space-y-1">
              {/* Regular Tabs */}
              {visibleTabs.filter(t => !t.isAdminOnly).map((tab) => (
                <TabButton 
                  key={tab.id} 
                  tab={tab} 
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  isAdmin={isSuperAdmin}
                />
              ))}

              {/* Admin Divider */}
              {isSuperAdmin && (
                <div className="pt-4 pb-2">
                  <div className="flex items-center gap-2 px-3 mb-2">
                    <div className="flex-1 h-px bg-neutral-800" />
                    <span className="text-[10px] font-semibold tracking-wider text-neutral-600">YONETIM</span>
                    <div className="flex-1 h-px bg-neutral-800" />
                  </div>
                </div>
              )}

              {/* Admin Tabs */}
              {visibleTabs.filter(t => t.isAdminOnly).map((tab) => (
                <TabButton 
                  key={tab.id} 
                  tab={tab} 
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  isAdmin={isSuperAdmin}
                />
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div 
              className="p-8 rounded-2xl"
              style={{ 
                background: "rgba(255, 255, 255, 0.02)", 
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TabButton({ tab, isActive, onClick, isAdmin = false }: { tab: TabItem; isActive: boolean; onClick: () => void; isAdmin?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors"
      style={{
        background: isActive ? "rgba(168, 85, 247, 0.1)" : "transparent",
        border: isActive ? "1px solid rgba(168, 85, 247, 0.2)" : "1px solid transparent",
      }}
      whileHover={{ background: isActive ? "rgba(168, 85, 247, 0.1)" : "rgba(255, 255, 255, 0.03)" }}
    >
      <tab.icon 
        className="w-4 h-4" 
        style={{ color: isActive ? "#a855f7" : "#737373" }} 
      />
      <span 
        className="text-sm font-medium"
        style={{ color: isActive ? "#a855f7" : "#a3a3a3" }}
      >
        {tab.label}
      </span>
      {tab.isAdminOnly && !isAdmin && (
        <Lock className="w-3 h-3 ml-auto" style={{ color: "#525252" }} />
      )}
    </motion.button>
  )
}

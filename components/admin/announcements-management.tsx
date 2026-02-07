"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  Plus,
  Edit2,
  Trash2,
  Eye,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Calendar,
  Users,
  Building2,
  Briefcase,
  Shield,
  Check,
  Save,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Announcement {
  id: string
  title: string
  content: string
  severity: "INFO" | "WARNING" | "CRITICAL"
  targetType: "ALL" | "ADMIN_ONLY" | "STAFF_ONLY" | "SITE_SPECIFIC" | "DEPARTMENT_SPECIFIC" | "ROLE_SPECIFIC"
  targetSiteId: string | null
  targetDepartmentId: string | null
  targetRole: string | null
  showAsPopup: boolean
  displayMode: "ONCE" | "EVERY_LOGIN" | "DAILY"
  activeDays: string[]
  removeOnRead: boolean
  isActive: boolean
  expiresAt: string | null
  createdAt: string
  targetSite?: { name: string }
  targetDepartment?: { name: string }
  _count?: { readRecords: number }
}

interface Site {
  id: string
  name: string
}

interface Department {
  id: string
  name: string
  siteId: string
}

const severityConfig = {
  INFO: {
    label: "Bilgi",
    icon: Info,
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  WARNING: {
    label: "Uyarı",
    icon: AlertTriangle,
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  CRITICAL: {
    label: "Kritik",
    icon: AlertCircle,
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
}

const targetTypeConfig = {
  ALL: { label: "Tüm Kullanıcılar", icon: Users },
  ADMIN_ONLY: { label: "Sadece Yöneticiler", icon: Shield },
  STAFF_ONLY: { label: "Sadece Personel", icon: Users },
  SITE_SPECIFIC: { label: "Belirli Site", icon: Building2 },
  DEPARTMENT_SPECIFIC: { label: "Belirli Birim", icon: Briefcase },
  ROLE_SPECIFIC: { label: "Belirli Rol", icon: Shield },
}

const displayModeLabels = {
  ONCE: "Bir Kez",
  EVERY_LOGIN: "Her Giriş",
  DAILY: "Günlük",
}

const allDays = ["Pzt", "Sal", "Car", "Per", "Cum", "Cmt", "Paz"]
const roles = ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF"]

interface AnnouncementsManagementProps {
  isManager: boolean
}

export function AnnouncementsManagement({ isManager }: AnnouncementsManagementProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [viewReadReport, setViewReadReport] = useState<string | null>(null)
  const [readReportData, setReadReportData] = useState<any>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    severity: "INFO" as const,
    targetType: "ALL" as const,
    targetSiteId: "",
    targetDepartmentId: "",
    targetRole: "",
    showAsPopup: false,
    displayMode: "ONCE" as const,
    activeDays: [] as string[],
    removeOnRead: true,
    expiresAt: "",
  })

  useEffect(() => {
    loadAnnouncements()
    loadSites()
  }, [])

  const loadAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements?showAll=true")
      const data = await response.json()
      setAnnouncements(data.announcements || [])
    } catch (error) {
      console.error("Failed to load announcements:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadSites = async () => {
    try {
      const response = await fetch("/api/admin/sites")
      const data = await response.json()
      setSites(data.sites || [])
    } catch (error) {
      console.error("Failed to load sites:", error)
    }
  }

  useEffect(() => {
    if (formData.targetSiteId) {
      loadDepartments(formData.targetSiteId)
    }
  }, [formData.targetSiteId])

  const loadDepartments = async (siteId: string) => {
    try {
      const response = await fetch(`/api/admin/departments?siteId=${siteId}`)
      const data = await response.json()
      setDepartments(data.departments || [])
    } catch (error) {
      console.error("Failed to load departments:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      severity: "INFO",
      targetType: "ALL",
      targetSiteId: "",
      targetDepartmentId: "",
      targetRole: "",
      showAsPopup: false,
      displayMode: "ONCE",
      activeDays: [],
      removeOnRead: true,
      expiresAt: "",
    })
    setEditingAnnouncement(null)
  }

  const handleCreate = () => {
    resetForm()
    setIsCreateModalOpen(true)
  }

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      content: announcement.content,
      severity: announcement.severity,
      targetType: announcement.targetType,
      targetSiteId: announcement.targetSiteId || "",
      targetDepartmentId: announcement.targetDepartmentId || "",
      targetRole: announcement.targetRole || "",
      showAsPopup: announcement.showAsPopup,
      displayMode: announcement.displayMode,
      activeDays: announcement.activeDays,
      removeOnRead: announcement.removeOnRead,
      expiresAt: announcement.expiresAt
        ? new Date(announcement.expiresAt).toISOString().slice(0, 16)
        : "",
    })
    setIsCreateModalOpen(true)
  }

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        targetSiteId: formData.targetSiteId || null,
        targetDepartmentId: formData.targetDepartmentId || null,
        targetRole: formData.targetRole || null,
        expiresAt: formData.expiresAt || null,
      }

      if (editingAnnouncement) {
        await fetch(`/api/announcements/${editingAnnouncement.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch("/api/announcements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      setIsCreateModalOpen(false)
      resetForm()
      loadAnnouncements()
    } catch (error) {
      console.error("Failed to save announcement:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu duyuruyu silmek istediğinizden emin misiniz?")) return

    try {
      await fetch(`/api/announcements/${id}`, { method: "DELETE" })
      loadAnnouncements()
    } catch (error) {
      console.error("Failed to delete announcement:", error)
    }
  }

  const handleToggleActive = async (announcement: Announcement) => {
    try {
      await fetch(`/api/announcements/${announcement.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !announcement.isActive }),
      })
      loadAnnouncements()
    } catch (error) {
      console.error("Failed to toggle announcement:", error)
    }
  }

  const loadReadReport = async (announcementId: string) => {
    try {
      const response = await fetch(`/api/announcements/${announcementId}/read`)
      const data = await response.json()
      setReadReportData(data)
      setViewReadReport(announcementId)
    } catch (error) {
      console.error("Failed to load read report:", error)
    }
  }

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      activeDays: prev.activeDays.includes(day)
        ? prev.activeDays.filter((d) => d !== day)
        : [...prev.activeDays, day],
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Duyuru Yönetimi</h1>
            <p className="text-slate-600">Sistem genelinde duyuru oluşturun ve yönetin</p>
          </div>
          <motion.button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Yeni Duyuru
          </motion.button>
        </div>

        {/* Announcements List */}
        <div className="grid gap-4">
          {announcements.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Henüz duyuru yok</h3>
              <p className="text-slate-600 mb-6">İlk duyurunuzu oluşturun</p>
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Duyuru Oluştur
              </button>
            </div>
          ) : (
            announcements.map((announcement) => {
              const config = severityConfig[announcement.severity]
              const Icon = config.icon
              const targetConfig = targetTypeConfig[announcement.targetType]
              const TargetIcon = targetConfig.icon

              return (
                <motion.div
                  key={announcement.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Severity Badge */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: config.bgColor }}
                      >
                        <Icon className="w-6 h-6" style={{ color: config.color }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{announcement.title}</h3>
                          <span
                            className="px-2 py-1 text-xs font-semibold rounded-lg"
                            style={{ background: config.bgColor, color: config.color }}
                          >
                            {config.label}
                          </span>
                          {announcement.showAsPopup && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-purple-100 text-purple-600">
                              Popup
                            </span>
                          )}
                          {!announcement.isActive && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-600">
                              Pasif
                            </span>
                          )}
                        </div>

                        <p className="text-slate-600 text-sm mb-3 line-clamp-2">{announcement.content}</p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <TargetIcon className="w-3.5 h-3.5" />
                            <span>{targetConfig.label}</span>
                            {announcement.targetSite && (
                              <span className="text-slate-700">: {announcement.targetSite.name}</span>
                            )}
                            {announcement.targetDepartment && (
                              <span className="text-slate-700">: {announcement.targetDepartment.name}</span>
                            )}
                            {announcement.targetRole && (
                              <span className="text-slate-700">: {announcement.targetRole}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{displayModeLabels[announcement.displayMode]}</span>
                          </div>
                          {announcement.expiresAt && (
                            <div className="flex items-center gap-1">
                              <span>Son: {new Date(announcement.expiresAt).toLocaleDateString("tr-TR")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => loadReadReport(announcement.id)}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors group relative"
                        title="Okunma Raporu"
                      >
                        <BarChart3 className="w-5 h-5 text-slate-600" />
                        {announcement._count && announcement._count.readRecords > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-[10px] rounded-full flex items-center justify-center">
                            {announcement._count.readRecords}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Düzenle"
                      >
                        <Edit2 className="w-5 h-5 text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(announcement)}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          announcement.isActive
                            ? "hover:bg-yellow-100 text-yellow-600"
                            : "hover:bg-green-100 text-green-600"
                        )}
                        title={announcement.isActive ? "Devre Dışı Bırak" : "Aktif Et"}
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-51 p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingAnnouncement ? "Duyuru Düzenle" : "Yeni Duyuru Oluştur"}
                </h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Başlık *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Duyuru başlığı"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">İçerik *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                    placeholder="Duyuru içeriği"
                  />
                </div>

                {/* Severity */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Önem Seviyesi</label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(severityConfig).map(([key, config]) => {
                      const Icon = config.icon
                      return (
                        <button
                          key={key}
                          onClick={() => setFormData({ ...formData, severity: key as any })}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all",
                            formData.severity === key
                              ? "border-current shadow-lg"
                              : "border-slate-200 hover:border-slate-300"
                          )}
                          style={{
                            color: formData.severity === key ? config.color : "#64748b",
                            background: formData.severity === key ? config.bgColor : "white",
                          }}
                        >
                          <Icon className="w-6 h-6 mx-auto mb-2" />
                          <div className="text-sm font-medium">{config.label}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Target Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Hedef Kitle</label>
                  <select
                    value={formData.targetType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        targetType: e.target.value as any,
                        targetSiteId: "",
                        targetDepartmentId: "",
                        targetRole: "",
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(targetTypeConfig).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Site Specific */}
                {formData.targetType === "SITE_SPECIFIC" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Site Seç</label>
                    <select
                      value={formData.targetSiteId}
                      onChange={(e) => setFormData({ ...formData, targetSiteId: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Site seçin</option>
                      {sites.map((site) => (
                        <option key={site.id} value={site.id}>
                          {site.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Department Specific */}
                {formData.targetType === "DEPARTMENT_SPECIFIC" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Site Seç</label>
                      <select
                        value={formData.targetSiteId}
                        onChange={(e) =>
                          setFormData({ ...formData, targetSiteId: e.target.value, targetDepartmentId: "" })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Önce site seçin</option>
                        {sites.map((site) => (
                          <option key={site.id} value={site.id}>
                            {site.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formData.targetSiteId && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Birim Seç</label>
                        <select
                          value={formData.targetDepartmentId}
                          onChange={(e) => setFormData({ ...formData, targetDepartmentId: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Birim seçin</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}

                {/* Role Specific */}
                {formData.targetType === "ROLE_SPECIFIC" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Rol Seç</label>
                    <select
                      value={formData.targetRole}
                      onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Rol seçin</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Display Mode */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Gösterim Modu</label>
                  <select
                    value={formData.displayMode}
                    onChange={(e) => setFormData({ ...formData, displayMode: e.target.value as any })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(displayModeLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Active Days */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Aktif Günler (boş = her gün)
                  </label>
                  <div className="flex gap-2">
                    {allDays.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={cn(
                          "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                          formData.activeDays.includes(day)
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showAsPopup}
                      onChange={(e) => setFormData({ ...formData, showAsPopup: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">Ana sayfada popup olarak göster</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.removeOnRead}
                      onChange={(e) => setFormData({ ...formData, removeOnRead: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">Okunduğunda kaldır</span>
                  </label>
                </div>

                {/* Expires At */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Son Geçerlilik Tarihi (opsiyonel)
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!formData.title || !formData.content}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-5 h-5" />
                    {editingAnnouncement ? "Güncelle" : "Oluştur"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Read Report Modal */}
      <AnimatePresence>
        {viewReadReport && readReportData && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setViewReadReport(null)
                setReadReportData(null)
              }}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-51 p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Okunma Raporu</h2>
                  <p className="text-slate-600">{readReportData.announcement.title}</p>
                </div>
                <button
                  onClick={() => {
                    setViewReadReport(null)
                    setReadReportData(null)
                  }}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600">{readReportData.totalTargetUsers}</div>
                  <div className="text-sm text-blue-600/70">Hedef Kullanıcı</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600">{readReportData.readCount}</div>
                  <div className="text-sm text-green-600/70">Okuyan</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-600">{readReportData.unreadCount}</div>
                  <div className="text-sm text-orange-600/70">Okumayan</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-200 mb-6">
                <div className="flex gap-4">
                  <button className="px-4 py-2 border-b-2 border-green-600 text-green-600 font-medium">
                    Okuyanlar ({readReportData.readCount})
                  </button>
                </div>
              </div>

              {/* Read Users List */}
              <div className="space-y-2">
                {readReportData.usersWhoRead.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500">Henüz kimse okumadı</p>
                  </div>
                ) : (
                  readReportData.usersWhoRead.map((record: any) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                    >
                      <div>
                        <div className="font-medium text-slate-900">{record.user?.name}</div>
                        <div className="text-sm text-slate-600">
                          {record.user?.email} • {record.user?.role}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600">
                          {new Date(record.readAt).toLocaleString("tr-TR")}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

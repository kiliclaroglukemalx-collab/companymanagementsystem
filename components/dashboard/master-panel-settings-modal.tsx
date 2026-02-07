"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Settings, 
  Clock, 
  AlertCircle, 
  Check, 
  X,
  Shield,
  Timer,
  Bell
} from "lucide-react"
import { toast } from "sonner"

const COLORS = {
  background: "#000000",
  electricBlue: "#3B82F6",
  champagneGold: "#D4AF37",
  goldLight: "#F5E6C8",
  glass: "rgba(255, 255, 255, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  glassHover: "rgba(255, 255, 255, 0.06)",
}

interface MasterPanelSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MasterPanelSettingsModal({ isOpen, onClose }: MasterPanelSettingsModalProps) {
  const [settings, setSettings] = useState({
    minEditableHour: 6,
    maxEditableHour: 23,
    requiresApproval: true,
    editingDurationMinutes: 30,
  })
  const [loading, setLoading] = useState(false)
  const [pendingRequests, setPendingRequests] = useState<any[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchSettings()
      fetchPendingRequests()
    }
  }, [isOpen])

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/chronos/master-panel")
      const data = await res.json()
      if (data.settings) {
        setSettings(data.settings)
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
    }
  }

  const fetchPendingRequests = async () => {
    try {
      const res = await fetch("/api/chronos/shift-approval")
      const data = await res.json()
      if (data.requests) {
        setPendingRequests(data.requests)
      }
    } catch (error) {
      console.error("Error fetching requests:", error)
    }
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/chronos/master-panel", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      
      if (data.success) {
        toast.success("Master Panel ayarları güncellendi")
        onClose()
      } else {
        toast.error(data.error || "Ayarlar güncellenemedi")
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleApproveRequest = async (requestId: string) => {
    try {
      const res = await fetch(`/api/chronos/shift-approval/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      })
      const data = await res.json()
      
      if (data.success) {
        toast.success("Talep onaylandı - 30 dakikalık düzenleme yetkisi verildi")
        fetchPendingRequests()
      } else {
        toast.error(data.error || "Talep onaylanamadı")
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    }
  }

  const handleRejectRequest = async (requestId: string) => {
    try {
      const res = await fetch(`/api/chronos/shift-approval/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject" }),
      })
      const data = await res.json()
      
      if (data.success) {
        toast.info("Talep reddedildi")
        fetchPendingRequests()
      } else {
        toast.error(data.error || "Talep reddedilemedi")
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div 
          className="absolute inset-0"
          style={{ background: "rgba(0, 0, 0, 0.85)" }}
          onClick={onClose}
        />
        
        <motion.div
          className="relative w-[900px] max-h-[85vh] overflow-y-auto rounded-3xl"
          style={{
            background: COLORS.background,
            border: `1px solid ${COLORS.glassBorder}`,
            boxShadow: `0 0 80px ${COLORS.champagneGold}10`,
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div 
            className="p-6 border-b"
            style={{ borderColor: COLORS.glassBorder }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${COLORS.champagneGold}20` }}
                >
                  <Shield className="w-6 h-6" style={{ color: COLORS.champagneGold }} />
                </div>
                <div>
                  <h2 
                    className="text-[20px] font-bold"
                    style={{ color: COLORS.goldLight }}
                  >
                    Master Panel - Chronos Ayarları
                  </h2>
                  <p className="text-[13px] text-neutral-500">
                    Vardiya yönetimi ve onay sistemi ayarları
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: COLORS.glass,
                  border: `1px solid ${COLORS.glassBorder}`,
                }}
              >
                <X className="w-5 h-5" style={{ color: COLORS.goldLight }} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Settings Section */}
            <div>
              <h3 
                className="text-[16px] font-bold mb-4"
                style={{ color: COLORS.goldLight }}
              >
                Genel Ayarlar
              </h3>
              
              <div className="space-y-4">
                {/* Editable Hour Range */}
                <div>
                  <label 
                    className="block text-[13px] font-medium mb-2"
                    style={{ color: COLORS.goldLight }}
                  >
                    Düzenlenebilir Saat Aralığı
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div 
                        className="px-4 py-3 rounded-xl"
                        style={{
                          background: COLORS.glass,
                          border: `1px solid ${COLORS.glassBorder}`,
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-neutral-500">Başlangıç Saati</span>
                          <span 
                            className="text-[14px] font-bold"
                            style={{ color: COLORS.electricBlue }}
                          >
                            {settings.minEditableHour.toString().padStart(2, '0')}:00
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="23"
                          value={settings.minEditableHour}
                          onChange={(e) => setSettings({ ...settings, minEditableHour: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div 
                        className="px-4 py-3 rounded-xl"
                        style={{
                          background: COLORS.glass,
                          border: `1px solid ${COLORS.glassBorder}`,
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-neutral-500">Bitiş Saati</span>
                          <span 
                            className="text-[14px] font-bold"
                            style={{ color: COLORS.electricBlue }}
                          >
                            {settings.maxEditableHour.toString().padStart(2, '0')}:00
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="23"
                          value={settings.maxEditableHour}
                          onChange={(e) => setSettings({ ...settings, maxEditableHour: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requires Approval */}
                <div>
                  <label 
                    className="flex items-center justify-between p-4 rounded-xl cursor-pointer"
                    style={{
                      background: COLORS.glass,
                      border: `1px solid ${COLORS.glassBorder}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5" style={{ color: COLORS.champagneGold }} />
                      <div>
                        <span 
                          className="text-[14px] font-medium block"
                          style={{ color: COLORS.goldLight }}
                        >
                          Onay Sistemi Aktif
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          Birim yöneticileri vardiya değiştirmeden önce onay almak zorunda
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.requiresApproval}
                      onChange={(e) => setSettings({ ...settings, requiresApproval: e.target.checked })}
                      className="w-5 h-5"
                    />
                  </label>
                </div>

                {/* Editing Duration */}
                <div>
                  <label 
                    className="block text-[13px] font-medium mb-2"
                    style={{ color: COLORS.goldLight }}
                  >
                    Düzenleme Yetkisi Süresi
                  </label>
                  <div 
                    className="px-4 py-3 rounded-xl"
                    style={{
                      background: COLORS.glass,
                      border: `1px solid ${COLORS.glassBorder}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-neutral-500">Onay sonrası düzenleme süresi</span>
                      <span 
                        className="text-[14px] font-bold"
                        style={{ color: COLORS.champagneGold }}
                      >
                        {settings.editingDurationMinutes} dakika
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      step="10"
                      value={settings.editingDurationMinutes}
                      onChange={(e) => setSettings({ ...settings, editingDurationMinutes: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Requests Section */}
            <div>
              <h3 
                className="text-[16px] font-bold mb-4 flex items-center gap-2"
                style={{ color: COLORS.goldLight }}
              >
                Onay Bekleyen Talepler
                {pendingRequests.length > 0 && (
                  <span 
                    className="px-2 py-0.5 rounded-full text-[11px] font-bold text-white"
                    style={{ background: "#ef4444" }}
                  >
                    {pendingRequests.length}
                  </span>
                )}
              </h3>
              
              {pendingRequests.length === 0 ? (
                <div 
                  className="p-8 rounded-xl text-center"
                  style={{
                    background: COLORS.glass,
                    border: `1px solid ${COLORS.glassBorder}`,
                  }}
                >
                  <Check className="w-12 h-12 mx-auto mb-3" style={{ color: COLORS.electricBlue }} />
                  <p className="text-[13px] text-neutral-500">
                    Şu anda onay bekleyen talep bulunmuyor
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 rounded-xl"
                      style={{
                        background: COLORS.glass,
                        border: `1px solid ${COLORS.glassBorder}`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p 
                            className="text-[14px] font-bold mb-1"
                            style={{ color: COLORS.goldLight }}
                          >
                            {request.requestedBy.name}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            {request.requestedBy.department?.name} • {request.site.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p 
                            className="text-[13px] font-bold"
                            style={{ color: COLORS.electricBlue }}
                          >
                            {request.requestedStartHour.toString().padStart(2, '0')}:00 - {request.requestedEndHour.toString().padStart(2, '0')}:00
                          </p>
                          <p className="text-[10px] text-neutral-500">
                            {new Date(request.createdAt).toLocaleString('tr-TR')}
                          </p>
                        </div>
                      </div>
                      <p className="text-[12px] text-neutral-400 mb-3">
                        {request.reason}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveRequest(request.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[13px] font-bold transition-all"
                          style={{
                            background: COLORS.electricBlue,
                            color: "#000000",
                          }}
                        >
                          <Check className="w-4 h-4" />
                          Onayla
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all"
                          style={{
                            background: COLORS.glass,
                            border: `1px solid ${COLORS.glassBorder}`,
                            color: COLORS.goldLight,
                          }}
                        >
                          <X className="w-4 h-4" />
                          Reddet
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div 
            className="p-6 border-t"
            style={{ borderColor: COLORS.glassBorder }}
          >
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full text-[14px] font-medium"
                style={{
                  background: COLORS.glass,
                  border: `1px solid ${COLORS.glassBorder}`,
                  color: COLORS.goldLight,
                }}
              >
                İptal
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={loading}
                className="px-6 py-2.5 rounded-full text-[14px] font-bold"
                style={{
                  background: COLORS.champagneGold,
                  color: COLORS.background,
                }}
              >
                {loading ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

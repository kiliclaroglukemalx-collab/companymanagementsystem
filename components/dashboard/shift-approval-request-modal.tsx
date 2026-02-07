"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Clock, 
  AlertCircle, 
  X,
  CheckCircle
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

interface ShiftApprovalRequestModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function ShiftApprovalRequestModal({ 
  isOpen, 
  onClose,
  onSuccess 
}: ShiftApprovalRequestModalProps) {
  const [reason, setReason] = useState("")
  const [startHour, setStartHour] = useState(9)
  const [endHour, setEndHour] = useState(18)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reason.trim()) {
      toast.error("Lütfen talep sebebini belirtin")
      return
    }

    if (startHour >= endHour) {
      toast.error("Bitiş saati başlangıç saatinden büyük olmalıdır")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/chronos/shift-approval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason,
          requestedStartHour: startHour,
          requestedEndHour: endHour,
        }),
      })
      
      const data = await res.json()
      
      if (data.success) {
        toast.success("Onay talebi Master Panel'e gönderildi")
        setReason("")
        setStartHour(9)
        setEndHour(18)
        onSuccess?.()
        onClose()
      } else {
        toast.error(data.error || "Talep gönderilemedi")
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setLoading(false)
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
          className="relative w-[600px] rounded-3xl"
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
                  style={{ background: `${COLORS.electricBlue}20` }}
                >
                  <Clock className="w-6 h-6" style={{ color: COLORS.electricBlue }} />
                </div>
                <div>
                  <h2 
                    className="text-[20px] font-bold"
                    style={{ color: COLORS.goldLight }}
                  >
                    Vardiya Düzenleme Talebi
                  </h2>
                  <p className="text-[13px] text-neutral-500">
                    Master Panel'den onay almak için talepte bulunun
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Info Banner */}
            <div 
              className="p-4 rounded-xl flex items-start gap-3"
              style={{
                background: `${COLORS.electricBlue}10`,
                border: `1px solid ${COLORS.electricBlue}30`,
              }}
            >
              <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: COLORS.electricBlue }} />
              <div>
                <p 
                  className="text-[13px] font-medium mb-1"
                  style={{ color: COLORS.electricBlue }}
                >
                  Onay Süreci Hakkında
                </p>
                <p className="text-[12px] text-neutral-400">
                  Master Panel talebinizi onaylarsa, belirttiğiniz saat aralığında 30 dakika süreyle vardiya düzenleme yetkisi alacaksınız.
                </p>
              </div>
            </div>

            {/* Hour Range Selection */}
            <div>
              <label 
                className="block text-[13px] font-medium mb-3"
                style={{ color: COLORS.goldLight }}
              >
                Düzenlemek İstediğiniz Saat Aralığı
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
                      <span className="text-[11px] text-neutral-500">Başlangıç</span>
                      <span 
                        className="text-[16px] font-bold"
                        style={{ color: COLORS.electricBlue }}
                      >
                        {startHour.toString().padStart(2, '0')}:00
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="23"
                      value={startHour}
                      onChange={(e) => setStartHour(parseInt(e.target.value))}
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
                      <span className="text-[11px] text-neutral-500">Bitiş</span>
                      <span 
                        className="text-[16px] font-bold"
                        style={{ color: COLORS.champagneGold }}
                      >
                        {endHour.toString().padStart(2, '0')}:00
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="23"
                      value={endHour}
                      onChange={(e) => setEndHour(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label 
                className="block text-[13px] font-medium mb-2"
                style={{ color: COLORS.goldLight }}
              >
                Talep Sebebi
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Vardiya değişikliği yapmak istediğiniz sebebi detaylı olarak açıklayın..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-[14px] outline-none resize-none"
                style={{
                  background: COLORS.glass,
                  border: `1px solid ${COLORS.glassBorder}`,
                  color: COLORS.goldLight,
                }}
              />
            </div>

            {/* Expected Duration */}
            <div 
              className="p-4 rounded-xl"
              style={{
                background: `${COLORS.champagneGold}10`,
                border: `1px solid ${COLORS.champagneGold}30`,
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" style={{ color: COLORS.champagneGold }} />
                <span 
                  className="text-[13px] font-medium"
                  style={{ color: COLORS.champagneGold }}
                >
                  Onaylandığında 30 dakika düzenleme yetkisi verilecektir
                </span>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div 
            className="p-6 border-t"
            style={{ borderColor: COLORS.glassBorder }}
          >
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
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
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2.5 rounded-full text-[14px] font-bold"
                style={{
                  background: COLORS.champagneGold,
                  color: COLORS.background,
                }}
              >
                {loading ? "Gönderiliyor..." : "Talep Gönder"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

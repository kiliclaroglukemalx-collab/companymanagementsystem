"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  DollarSign,
  Clock,
  X,
  Loader2,
  AlertCircle,
  Info
} from "lucide-react"

const COLORS = {
  background: "#000000",
  electricBlue: "#3B82F6",
  champagneGold: "#D4AF37",
  goldLight: "#F5E6C8",
  glass: "rgba(255, 255, 255, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  glassHover: "rgba(255, 255, 255, 0.06)",
}

type RequestType = "LEAVE" | "OVERTIME" | "ADVANCE"
type LeaveType = "ANNUAL" | "SICK" | "PERSONAL" | "OVERTIME"

interface CreateRequestFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  defaultType?: RequestType
}

export function CreateRequestForm({ isOpen, onClose, onSuccess, defaultType = "LEAVE" }: CreateRequestFormProps) {
  const [requestType, setRequestType] = useState<RequestType>(defaultType)
  const [leaveType, setLeaveType] = useState<LeaveType>("ANNUAL")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [userSalary, setUserSalary] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen && requestType === "ADVANCE") {
      fetchUserSalary()
    }
  }, [isOpen, requestType])

  const fetchUserSalary = async () => {
    try {
      const response = await fetch("/api/salary")
      const data = await response.json()
      if (data.salary) {
        setUserSalary(data.salary.monthlySalary)
      }
    } catch (error) {
      console.error("Error fetching salary:", error)
    }
  }

  const calculateDays = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!reason.trim()) {
      setError("Lütfen açıklama girin")
      return
    }

    if (requestType === "LEAVE" || requestType === "OVERTIME") {
      if (!startDate || !endDate) {
        setError("Lütfen başlangıç ve bitiş tarihi seçin")
        return
      }
      if (new Date(startDate) > new Date(endDate)) {
        setError("Başlangıç tarihi bitiş tarihinden önce olmalı")
        return
      }
    }

    if (requestType === "ADVANCE") {
      const amountNum = parseFloat(amount)
      if (!amount || amountNum <= 0) {
        setError("Lütfen geçerli bir miktar girin")
        return
      }
      if (userSalary && amountNum > userSalary) {
        setError(`Avans miktarı maaşınızı (${userSalary.toLocaleString("tr-TR")} ₺) aşamaz`)
        return
      }
    }

    try {
      setLoading(true)

      const requestData: any = {
        type: requestType,
        reason
      }

      if (requestType === "LEAVE" || requestType === "OVERTIME") {
        requestData.leaveData = {
          leaveType: requestType === "OVERTIME" ? "OVERTIME" : leaveType,
          startDate,
          endDate,
          days: calculateDays()
        }
      }

      if (requestType === "ADVANCE") {
        requestData.advanceData = {
          amount: parseFloat(amount)
        }
      }

      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        onSuccess?.()
        onClose()
        // Reset form
        setReason("")
        setStartDate("")
        setEndDate("")
        setAmount("")
        setLeaveType("ANNUAL")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Talep oluşturulamadı")
      }
    } catch (error) {
      console.error("Error creating request:", error)
      setError("Bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0, 0, 0, 0.8)" }}
        onClick={onClose}
      />
      <motion.div
        className="relative w-[500px] max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: COLORS.background,
          border: `1px solid ${COLORS.glassBorder}`,
          boxShadow: `0 0 80px ${COLORS.electricBlue}20`
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: COLORS.glassBorder }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold" style={{ color: COLORS.goldLight }}>
              Yeni Talep Oluştur
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: COLORS.glass }}
            >
              <X className="w-4 h-4" style={{ color: COLORS.goldLight }} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div
              className="p-4 rounded-xl flex items-start gap-3"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)"
              }}
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Request Type Selection */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: COLORS.champagneGold }}>
              Talep Türü
            </label>
            <div className="grid grid-cols-3 gap-3">
              <motion.button
                type="button"
                onClick={() => setRequestType("LEAVE")}
                className="p-4 rounded-xl flex flex-col items-center gap-2"
                style={{
                  background: requestType === "LEAVE" ? `${COLORS.electricBlue}20` : COLORS.glass,
                  border: `1px solid ${requestType === "LEAVE" ? COLORS.electricBlue : COLORS.glassBorder}`
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-5 h-5" style={{ color: requestType === "LEAVE" ? COLORS.electricBlue : COLORS.champagneGold }} />
                <span className="text-sm font-semibold" style={{ color: requestType === "LEAVE" ? COLORS.electricBlue : COLORS.goldLight }}>
                  İzin
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setRequestType("OVERTIME")}
                className="p-4 rounded-xl flex flex-col items-center gap-2"
                style={{
                  background: requestType === "OVERTIME" ? `${COLORS.electricBlue}20` : COLORS.glass,
                  border: `1px solid ${requestType === "OVERTIME" ? COLORS.electricBlue : COLORS.glassBorder}`
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Clock className="w-5 h-5" style={{ color: requestType === "OVERTIME" ? COLORS.electricBlue : COLORS.champagneGold }} />
                <span className="text-sm font-semibold" style={{ color: requestType === "OVERTIME" ? COLORS.electricBlue : COLORS.goldLight }}>
                  Mesai
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setRequestType("ADVANCE")}
                className="p-4 rounded-xl flex flex-col items-center gap-2"
                style={{
                  background: requestType === "ADVANCE" ? `${COLORS.electricBlue}20` : COLORS.glass,
                  border: `1px solid ${requestType === "ADVANCE" ? COLORS.electricBlue : COLORS.glassBorder}`
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <DollarSign className="w-5 h-5" style={{ color: requestType === "ADVANCE" ? COLORS.electricBlue : COLORS.champagneGold }} />
                <span className="text-sm font-semibold" style={{ color: requestType === "ADVANCE" ? COLORS.electricBlue : COLORS.goldLight }}>
                  Avans
                </span>
              </motion.button>
            </div>
          </div>

          {/* Leave Type (only for LEAVE) */}
          {requestType === "LEAVE" && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: COLORS.champagneGold }}>
                İzin Türü
              </label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                className="w-full p-3 rounded-xl text-sm outline-none"
                style={{
                  background: COLORS.glass,
                  border: `1px solid ${COLORS.glassBorder}`,
                  color: COLORS.goldLight
                }}
              >
                <option value="ANNUAL">Yıllık İzin</option>
                <option value="SICK">Sağlık İzni</option>
                <option value="PERSONAL">Kişisel İzin</option>
              </select>
            </div>
          )}

          {/* Date Range (for LEAVE and OVERTIME) */}
          {(requestType === "LEAVE" || requestType === "OVERTIME") && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: COLORS.champagneGold }}>
                    Başlangıç Tarihi
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 rounded-xl text-sm outline-none"
                    style={{
                      background: COLORS.glass,
                      border: `1px solid ${COLORS.glassBorder}`,
                      color: COLORS.goldLight
                    }}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: COLORS.champagneGold }}>
                    Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 rounded-xl text-sm outline-none"
                    style={{
                      background: COLORS.glass,
                      border: `1px solid ${COLORS.glassBorder}`,
                      color: COLORS.goldLight
                    }}
                    min={startDate || new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              {startDate && endDate && (
                <div
                  className="p-3 rounded-xl flex items-center gap-2"
                  style={{
                    background: `${COLORS.champagneGold}10`,
                    border: `1px solid ${COLORS.champagneGold}30`
                  }}
                >
                  <Info className="w-4 h-4" style={{ color: COLORS.champagneGold }} />
                  <span className="text-sm" style={{ color: COLORS.champagneGold }}>
                    Toplam {calculateDays()} gün
                  </span>
                </div>
              )}
            </>
          )}

          {/* Amount (for ADVANCE) */}
          {requestType === "ADVANCE" && (
            <>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: COLORS.champagneGold }}>
                  Avans Miktarı (₺)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  max={userSalary || undefined}
                  className="w-full p-3 rounded-xl text-sm outline-none"
                  style={{
                    background: COLORS.glass,
                    border: `1px solid ${COLORS.glassBorder}`,
                    color: COLORS.goldLight
                  }}
                />
              </div>
              {userSalary !== null && (
                <div
                  className="p-3 rounded-xl flex items-start gap-2"
                  style={{
                    background: `${COLORS.electricBlue}10`,
                    border: `1px solid ${COLORS.electricBlue}30`
                  }}
                >
                  <Info className="w-4 h-4 mt-0.5" style={{ color: COLORS.electricBlue }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: COLORS.electricBlue }}>
                      Maaş Limitiniz: {userSalary.toLocaleString("tr-TR")} ₺
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Avans miktarı kayıtlı maaşınızı aşamaz
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Reason */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: COLORS.champagneGold }}>
              Açıklama
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Talep sebebinizi açıklayın..."
              className="w-full p-3 rounded-xl text-sm outline-none resize-none"
              style={{
                background: COLORS.glass,
                border: `1px solid ${COLORS.glassBorder}`,
                color: COLORS.goldLight
              }}
              rows={4}
            />
          </div>

          {/* Info Box */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: `${COLORS.champagneGold}10`,
              border: `1px solid ${COLORS.champagneGold}30`
            }}
          >
            <p className="text-xs" style={{ color: COLORS.champagneGold }}>
              {requestType === "ADVANCE"
                ? "Avans talepleri direkt Finans Müdürü'ne gönderilir."
                : "Talep, Birim Müdürü'nüze gönderilecektir."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <motion.button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3 rounded-full text-sm font-medium"
              style={{
                background: COLORS.glass,
                border: `1px solid ${COLORS.glassBorder}`,
                color: COLORS.goldLight
              }}
              whileHover={{ borderColor: COLORS.champagneGold }}
              whileTap={{ scale: 0.98 }}
            >
              İptal
            </motion.button>
            <motion.button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold"
              style={{
                background: COLORS.champagneGold,
                color: COLORS.background
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                "Talep Gönder"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

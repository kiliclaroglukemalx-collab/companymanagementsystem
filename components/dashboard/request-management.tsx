"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  DollarSign,
  Clock,
  Check,
  X,
  AlertCircle,
  FileText,
  Loader2,
  ChevronDown,
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
type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED"
type LeaveType = "ANNUAL" | "SICK" | "PERSONAL" | "OVERTIME"

interface Request {
  id: string
  type: RequestType
  status: RequestStatus
  reason: string
  createdAt: string
  approvedAt?: string
  rejectedAt?: string
  rejectionReason?: string
  requestedBy?: {
    id: string
    name: string
    email: string
    department?: {
      name: string
    }
    salary?: {
      monthlySalary: number
    }
  }
  approver?: {
    id: string
    name: string
    email: string
  }
  leaveRequest?: {
    leaveType: LeaveType
    startDate: string
    endDate: string
    days: number
    isReflectedToCalendar: boolean
  }
  advanceRequest?: {
    amount: number
    userSalary: number
    isPaid: boolean
  }
}

interface RequestManagementProps {
  viewMode?: "my-requests" | "to-approve"
  onClose?: () => void
}

export function RequestManagement({ viewMode = "my-requests", onClose }: RequestManagementProps) {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    fetchRequests()
  }, [viewMode])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/requests?view=${viewMode}`)
      const data = await response.json()
      setRequests(data.requests || [])
    } catch (error) {
      console.error("Error fetching requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (requestId: string) => {
    try {
      setProcessing(requestId)
      const response = await fetch(`/api/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" })
      })

      if (response.ok) {
        await fetchRequests()
        setSelectedRequest(null)
      } else {
        const error = await response.json()
        alert(error.error || "Onaylama başarısız")
      }
    } catch (error) {
      console.error("Error approving request:", error)
      alert("Bir hata oluştu")
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (requestId: string) => {
    if (!rejectionReason.trim()) {
      alert("Lütfen red sebebi belirtin")
      return
    }

    try {
      setProcessing(requestId)
      const response = await fetch(`/api/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", rejectionReason })
      })

      if (response.ok) {
        await fetchRequests()
        setSelectedRequest(null)
        setRejectionReason("")
      } else {
        const error = await response.json()
        alert(error.error || "Reddetme başarısız")
      }
    } catch (error) {
      console.error("Error rejecting request:", error)
      alert("Bir hata oluştu")
    } finally {
      setProcessing(null)
    }
  }

  const handleCancel = async (requestId: string) => {
    if (!confirm("Talebi iptal etmek istediğinizden emin misiniz?")) {
      return
    }

    try {
      setProcessing(requestId)
      const response = await fetch(`/api/requests/${requestId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        await fetchRequests()
        setSelectedRequest(null)
      } else {
        const error = await response.json()
        alert(error.error || "İptal başarısız")
      }
    } catch (error) {
      console.error("Error cancelling request:", error)
      alert("Bir hata oluştu")
    } finally {
      setProcessing(null)
    }
  }

  const getRequestTypeIcon = (type: RequestType) => {
    switch (type) {
      case "LEAVE":
      case "OVERTIME":
        return <Calendar className="w-5 h-5" />
      case "ADVANCE":
        return <DollarSign className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getRequestTypeLabel = (type: RequestType) => {
    switch (type) {
      case "LEAVE":
        return "İzin Talebi"
      case "OVERTIME":
        return "Mesai Talebi"
      case "ADVANCE":
        return "Avans Talebi"
      default:
        return "Talep"
    }
  }

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "APPROVED":
        return "#10b981"
      case "REJECTED":
        return "#ef4444"
      case "CANCELLED":
        return "#6b7280"
      case "PENDING":
      default:
        return COLORS.champagneGold
    }
  }

  const getStatusLabel = (status: RequestStatus) => {
    switch (status) {
      case "APPROVED":
        return "Onaylandı"
      case "REJECTED":
        return "Reddedildi"
      case "CANCELLED":
        return "İptal Edildi"
      case "PENDING":
      default:
        return "Beklemede"
    }
  }

  const getLeaveTypeLabel = (leaveType: LeaveType) => {
    switch (leaveType) {
      case "ANNUAL":
        return "Yıllık İzin"
      case "SICK":
        return "Sağlık İzni"
      case "PERSONAL":
        return "Kişisel İzin"
      case "OVERTIME":
        return "Mesai"
      default:
        return leaveType
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: COLORS.champagneGold }} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.goldLight }}>
          {viewMode === "my-requests" ? "Taleplerim" : "Onay Bekleyen Talepler"}
        </h2>
        {requests.length > 0 && (
          <span
            className="px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: `${COLORS.champagneGold}20`,
              color: COLORS.champagneGold
            }}
          >
            {requests.length} Talep
          </span>
        )}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div
            className="p-8 rounded-2xl text-center"
            style={{
              background: COLORS.glass,
              border: `1px solid ${COLORS.glassBorder}`
            }}
          >
            <AlertCircle className="w-12 h-12 mx-auto mb-3" style={{ color: COLORS.champagneGold + "60" }} />
            <p className="text-neutral-400">
              {viewMode === "my-requests" ? "Henüz talep oluşturmadınız" : "Onay bekleyen talep yok"}
            </p>
          </div>
        ) : (
          requests.map((request) => (
            <motion.div
              key={request.id}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: COLORS.glass,
                border: `1px solid ${COLORS.glassBorder}`,
                backdropFilter: "blur(20px)"
              }}
              whileHover={{
                background: COLORS.glassHover,
                borderColor: COLORS.electricBlue + "40"
              }}
              onClick={() => setSelectedRequest(request)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: `${COLORS.champagneGold}20` }}
                    >
                      <div style={{ color: COLORS.champagneGold }}>
                        {getRequestTypeIcon(request.type)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold" style={{ color: COLORS.goldLight }}>
                        {getRequestTypeLabel(request.type)}
                      </h3>
                      {viewMode === "to-approve" && request.requestedBy && (
                        <p className="text-sm text-neutral-400">
                          {request.requestedBy.name} • {request.requestedBy.department?.name}
                        </p>
                      )}
                      {viewMode === "my-requests" && request.approver && (
                        <p className="text-sm text-neutral-400">
                          Onaylayıcı: {request.approver.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: `${getStatusColor(request.status)}20`,
                      color: getStatusColor(request.status)
                    }}
                  >
                    {getStatusLabel(request.status)}
                  </span>
                </div>

                <div className="space-y-2">
                  {request.leaveRequest && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-300">
                        {getLeaveTypeLabel(request.leaveRequest.leaveType)} •{" "}
                        {new Date(request.leaveRequest.startDate).toLocaleDateString("tr-TR")} -{" "}
                        {new Date(request.leaveRequest.endDate).toLocaleDateString("tr-TR")} •{" "}
                        {request.leaveRequest.days} gün
                      </span>
                    </div>
                  )}
                  {request.advanceRequest && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-300">
                        {request.advanceRequest.amount.toLocaleString("tr-TR")} ₺
                        {viewMode === "to-approve" && (
                          <span className="text-neutral-500 ml-2">
                            (Maaş: {request.advanceRequest.userSalary.toLocaleString("tr-TR")} ₺)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-sm">
                    <FileText className="w-4 h-4 text-neutral-400 mt-0.5" />
                    <span className="text-neutral-300">{request.reason}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    {new Date(request.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                  {request.leaveRequest?.isReflectedToCalendar && (
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: `${COLORS.electricBlue}20`,
                        color: COLORS.electricBlue
                      }}
                    >
                      Takvimde Yansıtıldı
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0, 0, 0, 0.8)" }}
              onClick={() => setSelectedRequest(null)}
            />
            <motion.div
              className="relative w-[500px] max-h-[80vh] overflow-y-auto rounded-3xl"
              style={{
                background: COLORS.background,
                border: `1px solid ${COLORS.glassBorder}`,
                boxShadow: `0 0 80px ${COLORS.electricBlue}20`
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6 border-b" style={{ borderColor: COLORS.glassBorder }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold" style={{ color: COLORS.goldLight }}>
                    Talep Detayı
                  </h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: COLORS.glass }}
                  >
                    <X className="w-4 h-4" style={{ color: COLORS.goldLight }} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Status */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                    Durum
                  </label>
                  <span
                    className="inline-block px-4 py-2 rounded-full text-sm font-bold"
                    style={{
                      background: `${getStatusColor(selectedRequest.status)}20`,
                      color: getStatusColor(selectedRequest.status)
                    }}
                  >
                    {getStatusLabel(selectedRequest.status)}
                  </span>
                </div>

                {/* Details */}
                {selectedRequest.leaveRequest && (
                  <>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                        İzin Türü
                      </label>
                      <p style={{ color: COLORS.goldLight }}>
                        {getLeaveTypeLabel(selectedRequest.leaveRequest.leaveType)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                        Tarih Aralığı
                      </label>
                      <p style={{ color: COLORS.goldLight }}>
                        {new Date(selectedRequest.leaveRequest.startDate).toLocaleDateString("tr-TR")} -{" "}
                        {new Date(selectedRequest.leaveRequest.endDate).toLocaleDateString("tr-TR")}
                        <span className="text-neutral-400 ml-2">({selectedRequest.leaveRequest.days} gün)</span>
                      </p>
                    </div>
                  </>
                )}

                {selectedRequest.advanceRequest && (
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                      Avans Miktarı
                    </label>
                    <p className="text-2xl font-bold" style={{ color: COLORS.champagneGold }}>
                      {selectedRequest.advanceRequest.amount.toLocaleString("tr-TR")} ₺
                    </p>
                    {viewMode === "to-approve" && (
                      <div
                        className="mt-2 p-3 rounded-xl flex items-start gap-2"
                        style={{
                          background: `${COLORS.electricBlue}10`,
                          border: `1px solid ${COLORS.electricBlue}30`
                        }}
                      >
                        <Info className="w-4 h-4 mt-0.5" style={{ color: COLORS.electricBlue }} />
                        <p className="text-sm" style={{ color: COLORS.electricBlue }}>
                          Personelin kayıtlı maaşı: {selectedRequest.advanceRequest.userSalary.toLocaleString("tr-TR")} ₺
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                    Açıklama
                  </label>
                  <p className="text-neutral-300">{selectedRequest.reason}</p>
                </div>

                {selectedRequest.rejectionReason && (
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                      Red Sebebi
                    </label>
                    <p className="text-red-400">{selectedRequest.rejectionReason}</p>
                  </div>
                )}

                {/* Actions */}
                {viewMode === "to-approve" && selectedRequest.status === "PENDING" && (
                  <div className="pt-4 space-y-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                        Red Sebebi (Opsiyonel)
                      </label>
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Reddetme sebebini yazın..."
                        className="w-full p-3 rounded-xl text-sm outline-none resize-none"
                        style={{
                          background: COLORS.glass,
                          border: `1px solid ${COLORS.glassBorder}`,
                          color: COLORS.goldLight
                        }}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => handleApprove(selectedRequest.id)}
                        disabled={processing === selectedRequest.id}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold"
                        style={{
                          background: "#10b981",
                          color: "#fff"
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {processing === selectedRequest.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        Onayla
                      </motion.button>
                      <motion.button
                        onClick={() => handleReject(selectedRequest.id)}
                        disabled={processing === selectedRequest.id}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold"
                        style={{
                          background: "#ef4444",
                          color: "#fff"
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {processing === selectedRequest.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        Reddet
                      </motion.button>
                    </div>
                  </div>
                )}

                {viewMode === "my-requests" && selectedRequest.status === "PENDING" && (
                  <motion.button
                    onClick={() => handleCancel(selectedRequest.id)}
                    disabled={processing === selectedRequest.id}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold"
                    style={{
                      background: "#6b7280",
                      color: "#fff"
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {processing === selectedRequest.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    Talebi İptal Et
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

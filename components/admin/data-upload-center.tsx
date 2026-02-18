"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as XLSX from "xlsx"
import { AuthContext } from "@/lib/auth"
import {
  Upload, FileText, Loader2, Sparkles, CheckCircle2, AlertCircle, ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { type ModuleKey } from "@/lib/ai-analysis/types"

const MAX_RAW_UPLOAD_SIZE = 4 * 1024 * 1024 // 4MB - safe limit for Vercel

function parseExcelInBrowser(file: File): Promise<Record<string, Record<string, unknown>[]>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })
        const sheets: Record<string, Record<string, unknown>[]> = {}
        for (const name of workbook.SheetNames) {
          sheets[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name])
        }
        resolve(sheets)
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = () => reject(new Error("Dosya okunamadi"))
    reader.readAsArrayBuffer(file)
  })
}

interface DataUploadCenterProps {
  auth: AuthContext
}

type Phase = "upload" | "assign" | "computing" | "dashboard"

interface UploadRecord {
  id: string
  fileName: string
  siteId: string
  analyticModule: string
  status: string
  createdAt: string
  site?: { name: string }
  assignments?: { analyticModule: string }[]
}

const MODULE_OPTIONS: { value: ModuleKey; label: string }[] = [
  { value: "FINANS", label: "Finansal Analiz" },
  { value: "BON", label: "Bonus / BTag" },
  { value: "CASINO", label: "Casino Analizi" },
  { value: "SPOR", label: "Spor Analizi" },
  { value: "PLAYERS", label: "Oyuncular" },
]

export function DataUploadCenter({ auth }: DataUploadCenterProps) {
  const [phase, setPhase] = useState<Phase>("upload")
  const [sites, setSites] = useState<{ id: string; name: string }[]>([])
  const [selectedSiteId, setSelectedSiteId] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedRecords, setUploadedRecords] = useState<UploadRecord[]>([])
  const [recentUploads, setRecentUploads] = useState<UploadRecord[]>([])
  const [isLoadingUploads, setIsLoadingUploads] = useState(true)
  const [moduleAssignments, setModuleAssignments] = useState<Record<string, ModuleKey>>({})
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" })

  // Compute state
  const [reportId, setReportId] = useState<string | null>(null)

  useEffect(() => {
    loadSites()
    loadRecentUploads()
  }, [])

  async function loadSites() {
    try {
      const res = await fetch("/api/admin/sites")
      if (res.ok) {
        const data = await res.json()
        setSites(data.sites || [])
      }
    } catch (e) {
      console.error("Failed to load sites:", e)
    }
  }

  async function loadRecentUploads() {
    try {
      setIsLoadingUploads(true)
      const res = await fetch("/api/data-upload/list")
      if (res.ok) {
        const data = await res.json()
        setRecentUploads(data.uploads || [])
      }
    } catch (e) {
      console.error("Failed to load uploads:", e)
    } finally {
      setIsLoadingUploads(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    setSelectedFiles(files)
    setStatusMsg({ type: null, message: "" })
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !selectedSiteId) {
      setStatusMsg({ type: "error", message: "Lutfen dosya ve site secin" })
      return
    }

    setIsUploading(true)
    setStatusMsg({ type: null, message: "" })

    const allUploads: UploadRecord[] = []
    const errors: string[] = []

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      setStatusMsg({ type: null, message: `Yukleniyor: ${i + 1}/${selectedFiles.length} - ${file.name}` })

      try {
        let res: Response

        if (file.size > MAX_RAW_UPLOAD_SIZE) {
          // Large file: parse in browser, send JSON in chunks per sheet
          const parsedSheets = await parseExcelInBrowser(file)
          let chunkUploaded = false

          // Split sheets into chunks that fit under 4MB JSON
          const chunks: Record<string, Record<string, unknown>[]>[] = []
          let currentChunk: Record<string, Record<string, unknown>[]> = {}
          let currentSize = 0

          for (const [sheetName, rows] of Object.entries(parsedSheets)) {
            const sheetJson = JSON.stringify({ [sheetName]: rows })
            const sheetSize = new Blob([sheetJson]).size

            if (currentSize + sheetSize > 3.5 * 1024 * 1024 && Object.keys(currentChunk).length > 0) {
              chunks.push(currentChunk)
              currentChunk = {}
              currentSize = 0
            }

            // If single sheet is still too large, split its rows
            if (sheetSize > 3.5 * 1024 * 1024) {
              const rowsPerChunk = Math.floor(rows.length / Math.ceil(sheetSize / (3 * 1024 * 1024)))
              for (let r = 0; r < rows.length; r += rowsPerChunk) {
                chunks.push({ [`${sheetName}_part${Math.floor(r / rowsPerChunk) + 1}`]: rows.slice(r, r + rowsPerChunk) })
              }
            } else {
              currentChunk[sheetName] = rows
              currentSize += sheetSize
            }
          }
          if (Object.keys(currentChunk).length > 0) chunks.push(currentChunk)

          for (let c = 0; c < chunks.length; c++) {
            const chunkName = chunks.length > 1 ? `${file.name} (parca ${c + 1}/${chunks.length})` : file.name
            setStatusMsg({ type: null, message: `Yukleniyor: ${i + 1}/${selectedFiles.length} - ${chunkName}` })

            const chunkRes = await fetch("/api/data-upload/upload-parsed", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                siteId: selectedSiteId,
                fileName: file.name,
                fileSize: file.size,
                analyticModule: "UNASSIGNED",
                parsedSheets: chunks[c],
              }),
            })
            const chunkData = await chunkRes.json().catch(() => null)
            if (chunkRes.ok && chunkData) {
              const uploads: UploadRecord[] = chunkData.uploads || (chunkData.upload ? [chunkData.upload] : [])
              allUploads.push(...uploads)
              chunkUploaded = true
            }
          }

          if (chunkUploaded) continue
          errors.push(`${file.name}: veri gonderilemedi`)
          continue
        } else {
          // Small file: upload normally
          const formData = new FormData()
          formData.append("file", file)
          formData.append("siteId", selectedSiteId)
          formData.append("fileType", "EXCEL")
          formData.append("analyticModule", "UNASSIGNED")
          res = await fetch("/api/data-upload/upload", { method: "POST", body: formData })
        }

        const data = await res.json().catch(() => null)

        if (res.ok && data) {
          const uploads: UploadRecord[] = data.uploads || (data.upload ? [data.upload] : [])
          allUploads.push(...uploads)
        } else {
          errors.push(`${file.name}: ${data?.error || "basarisiz"}`)
        }
      } catch (e) {
        errors.push(`${file.name}: ${e instanceof Error ? e.message : "baglanti hatasi"}`)
      }
    }

    if (allUploads.length > 0) {
      setUploadedRecords(allUploads)

      const assignments: Record<string, ModuleKey> = {}
      for (const u of allUploads) {
        if (u.analyticModule && u.analyticModule !== "UNASSIGNED") {
          assignments[u.id] = u.analyticModule as ModuleKey
        }
      }
      setModuleAssignments(assignments)

      setSelectedFiles([])
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""

      if (errors.length > 0) {
        setStatusMsg({ type: "error", message: `${allUploads.length} dosya yuklendi, ${errors.length} basarisiz: ${errors.join("; ")}` })
      }

      setPhase("assign")
      loadRecentUploads()
    } else {
      setStatusMsg({ type: "error", message: errors.length > 0 ? errors.join("; ") : "Yukleme basarisiz" })
    }

    setIsUploading(false)
  }

  const handleCompute = async () => {
    // Save assignments first
    for (const [uploadId, moduleKey] of Object.entries(moduleAssignments)) {
      try {
        await fetch("/api/data-upload/assignments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uploadId,
            assignments: [{ analyticModule: moduleKey, fileRole: "MAIN" }],
            replaceExisting: true,
          }),
        })
      } catch (e) {
        console.error("Assignment save error:", e)
      }
    }

    setPhase("computing")
    setStatusMsg({ type: null, message: "" })

    try {
      const uploadIds = uploadedRecords.map((u) => u.id)
      const res = await fetch("/api/analytics/compute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: selectedSiteId, uploadIds }),
      })

      const data = await res.json()
      if (!res.ok) {
        setStatusMsg({ type: "error", message: data.error || "Compute basarisiz" })
        setPhase("assign")
        return
      }

      setReportId(data.reportId)
      setStatusMsg({ type: "success", message: "Analiz basariyla olusturuldu! Anasayfadaki kartlarda gosteriliyor." })
      setPhase("upload")
      setUploadedRecords([])
      setModuleAssignments({})
      loadRecentUploads()
    } catch (e) {
      console.error("Compute error:", e)
      setStatusMsg({ type: "error", message: "Analiz olusturulamadi" })
      setPhase("assign")
    }
  }

  // ═══ RENDER ═══

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Veri Yukleme Merkezi</h1>
        <p className="mt-2 text-muted-foreground">
          Excel dosyalarinizi yukleyin, modullere atayin ve analiz raporunuzu olusturun
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* ═══ PHASE 1: UPLOAD ═══ */}
        {phase === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Upload Card */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Upload className="h-5 w-5 text-primary" />
                Dosya Yukle
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">Site Secimi</label>
                  <select
                    value={selectedSiteId}
                    onChange={(e) => setSelectedSiteId(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
                    disabled={isUploading}
                  >
                    <option value="">Site secin</option>
                    {sites.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">Excel Dosyalari</label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    multiple
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary"
                  />
                  {selectedFiles.length > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {selectedFiles.length} dosya secildi — {selectedFiles.map((f) => f.name).join(", ")}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading || selectedFiles.length === 0 || !selectedSiteId}
                className={cn(
                  "mt-6 flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all",
                  isUploading || selectedFiles.length === 0 || !selectedSiteId
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:brightness-110"
                )}
              >
                {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                {isUploading ? (statusMsg.message || "Yukleniyor...") : "Dosyalari Yukle"}
              </button>
            </div>

            {/* Status */}
            {statusMsg.type && (
              <div className={cn(
                "flex items-center gap-2 rounded-xl border p-4",
                statusMsg.type === "success" ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-red-500/30 bg-red-500/10 text-red-400"
              )}>
                {statusMsg.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                <span className="text-sm font-medium">{statusMsg.message}</span>
              </div>
            )}

            {/* Recent Uploads */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <FileText className="h-5 w-5 text-muted-foreground" />
                Son Yuklemeler
              </h2>
              {isLoadingUploads ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : recentUploads.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">Henuz yukleme yok</p>
              ) : (
                <div className="space-y-2">
                  {recentUploads.slice(0, 10).map((u) => (
                    <div key={u.id} className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{u.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString("tr-TR")} · {u.site?.name || ""}
                        </p>
                      </div>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        u.status === "COMPLETED" ? "bg-green-500/15 text-green-400" :
                        u.status === "FAILED" ? "bg-red-500/15 text-red-400" :
                        "bg-yellow-500/15 text-yellow-400"
                      )}>
                        {u.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ═══ PHASE 2: ASSIGN MODULES ═══ */}
        {phase === "assign" && (
          <motion.div
            key="assign"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Dosya - Modul Eslestirme
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Her dosyanin hangi analiz bolumunde gosterilecegini secin
              </p>

              <div className="space-y-4">
                {uploadedRecords.map((upload) => (
                  <div key={upload.id} className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{upload.fileName}</p>
                        <p className="text-xs text-muted-foreground">{upload.site?.name || ""}</p>
                      </div>
                    </div>
                    <select
                      value={moduleAssignments[upload.id] || ""}
                      onChange={(e) =>
                        setModuleAssignments((prev) => ({
                          ...prev,
                          [upload.id]: e.target.value as ModuleKey,
                        }))
                      }
                      className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                    >
                      <option value="">Bolum sec...</option>
                      {MODULE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setPhase("upload")}
                  className="rounded-xl bg-secondary px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Geri
                </button>
                <button
                  onClick={handleCompute}
                  disabled={Object.keys(moduleAssignments).length === 0}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all",
                    Object.keys(moduleAssignments).length === 0
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:brightness-110"
                  )}
                >
                  <Sparkles className="h-4 w-4" />
                  Analiz Olustur
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {statusMsg.type && (
              <div className={cn(
                "flex items-center gap-2 rounded-xl border p-4",
                statusMsg.type === "error" ? "border-red-500/30 bg-red-500/10 text-red-400" : "border-green-500/30 bg-green-500/10 text-green-400"
              )}>
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{statusMsg.message}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* ═══ PHASE 3: COMPUTING ═══ */}
        {phase === "computing" && (
          <motion.div
            key="computing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-12 w-12 text-primary" />
            </motion.div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">Veriler Analiz Ediliyor</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Excel dosyalari isleniyor, KPI ve tablolar hesaplaniyor...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

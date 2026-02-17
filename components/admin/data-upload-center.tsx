"use client"

import { useState, useEffect } from "react"
import { AuthContext } from "@/lib/auth"
import { TR } from "@/lib/tr-constants"
import { CUSTOM_ROLE_VALUE, getRoleOptions } from "@/lib/data-upload/file-role-config"
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataUploadCenterProps {
  auth: AuthContext
}

type AssignmentDraft = {
  modules: string[]
  roles: Record<string, { role: string; customRole: string }>
}

export function DataUploadCenter({ auth }: DataUploadCenterProps) {
  const [selectedSiteId, setSelectedSiteId] = useState<string>("")
  const [selectedFileType, setSelectedFileType] = useState<string>("EXCEL")
  const [selectedModule, setSelectedModule] = useState<string>("UNASSIGNED")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [mappingStatus, setMappingStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [recentUploads, setRecentUploads] = useState<any[]>([])
  const [isLoadingUploads, setIsLoadingUploads] = useState(true)
  const [sites, setSites] = useState<any[]>([])
  const [assignmentsDraft, setAssignmentsDraft] = useState<Record<string, AssignmentDraft>>({})

  const moduleOptions = [
    { value: "FINANS", label: TR.dataUpload.modules.FINANS },
    { value: "SPOR", label: TR.dataUpload.modules.SPOR },
    { value: "BON", label: TR.dataUpload.modules.BON },
    { value: "CASINO", label: TR.dataUpload.modules.CASINO },
    { value: "GENEL", label: TR.dataUpload.modules.GENEL },
    { value: "PLAYERS", label: TR.dataUpload.modules.PLAYERS },
  ]

  // Load sites and recent uploads on mount
  useEffect(() => {
    loadSites()
    loadRecentUploads()
  }, [])

  useEffect(() => {
    if (recentUploads.length === 0) return
    setAssignmentsDraft((prev) => {
      const next = { ...prev }
      for (const upload of recentUploads) {
        if (next[upload.id]) continue
        const roles: AssignmentDraft["roles"] = {}
        const modules = Array.isArray(upload.assignments)
          ? upload.assignments.map((item: any) => item.analyticModule)
          : []
        if (Array.isArray(upload.assignments)) {
          for (const assignment of upload.assignments) {
            const moduleValue = assignment.analyticModule
            const roleValue = assignment.fileRole || "UNSPECIFIED"
            const roleOptions = getRoleOptions(moduleValue)
            if (roleValue !== "UNSPECIFIED" && !roleOptions.includes(roleValue)) {
              roles[moduleValue] = { role: CUSTOM_ROLE_VALUE, customRole: roleValue }
            } else {
              roles[moduleValue] = { role: roleValue, customRole: "" }
            }
          }
        }
        next[upload.id] = { modules, roles }
      }
      return next
    })
  }, [recentUploads])

  async function loadSites() {
    try {
      const res = await fetch("/api/admin/sites")
      if (res.ok) {
        const data = await res.json()
        setSites(data.sites || [])
      }
    } catch (error) {
      console.error("Failed to load sites:", error)
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
    } catch (error) {
      console.error("Failed to load uploads:", error)
    } finally {
      setIsLoadingUploads(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    setSelectedFiles(files)
    setUploadStatus({ type: null, message: "" })
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !selectedSiteId) {
      setUploadStatus({
        type: "error",
        message: "Lütfen dosya ve site seçin"
      })
      return
    }

    setIsUploading(true)
    setUploadStatus({ type: null, message: "" })

    try {
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append("file", file)
      })
      formData.append("siteId", selectedSiteId)
      formData.append("fileType", selectedFileType)
      formData.append("analyticModule", selectedModule)

      const res = await fetch("/api/data-upload/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        const uploadedCount = Array.isArray(data.uploads)
          ? data.uploads.length
          : data.upload
            ? 1
            : selectedFiles.length
        setUploadStatus({
          type: "success",
          message:
            uploadedCount > 1
              ? `${uploadedCount} dosya yüklendi`
              : TR.dataUpload.uploadSuccess
        })
        setSelectedFiles([])
        // Reset file input
        const fileInput = document.getElementById("file-upload") as HTMLInputElement
        if (fileInput) fileInput.value = ""
        
        // Reload recent uploads
        loadRecentUploads()
      } else {
        setUploadStatus({
          type: "error",
          message: data.error || TR.dataUpload.uploadFailed
        })
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus({
        type: "error",
        message: TR.dataUpload.uploadFailed
      })
    } finally {
      setIsUploading(false)
    }
  }

  const toggleModuleAssignment = (uploadId: string, moduleValue: string, checked: boolean) => {
    setAssignmentsDraft((prev) => {
      const current = prev[uploadId] ?? { modules: [], roles: {} }
      const modules = checked
        ? Array.from(new Set([...current.modules, moduleValue]))
        : current.modules.filter((value) => value !== moduleValue)
      const roles = { ...current.roles }
      if (!checked) {
        delete roles[moduleValue]
      } else if (!roles[moduleValue]) {
        roles[moduleValue] = { role: "UNSPECIFIED", customRole: "" }
      }
      return { ...prev, [uploadId]: { modules, roles } }
    })
  }

  const updateRoleSelection = (uploadId: string, moduleValue: string, roleValue: string) => {
    setAssignmentsDraft((prev) => {
      const current = prev[uploadId] ?? { modules: [], roles: {} }
      const roles = { ...current.roles }
      if (roleValue === CUSTOM_ROLE_VALUE) {
        roles[moduleValue] = {
          role: CUSTOM_ROLE_VALUE,
          customRole: roles[moduleValue]?.customRole || "",
        }
      } else {
        roles[moduleValue] = { role: roleValue, customRole: "" }
      }
      return { ...prev, [uploadId]: { ...current, roles } }
    })
  }

  const updateCustomRole = (uploadId: string, moduleValue: string, customRole: string) => {
    setAssignmentsDraft((prev) => {
      const current = prev[uploadId] ?? { modules: [], roles: {} }
      const roles = { ...current.roles }
      roles[moduleValue] = { role: CUSTOM_ROLE_VALUE, customRole }
      return { ...prev, [uploadId]: { ...current, roles } }
    })
  }

  const saveAssignments = async (uploadId: string) => {
    try {
      const draft = assignmentsDraft[uploadId] ?? { modules: [], roles: {} }
      const assignments = draft.modules.map((moduleValue) => {
        const roleEntry = draft.roles[moduleValue]
        let fileRole = roleEntry?.role || "UNSPECIFIED"
        if (fileRole === CUSTOM_ROLE_VALUE) {
          fileRole = roleEntry?.customRole?.trim() || "UNSPECIFIED"
        }
        return { analyticModule: moduleValue, fileRole }
      })

      const res = await fetch("/api/data-upload/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uploadId,
          assignments,
          replaceExisting: true,
        }),
      })

      if (res.ok) {
        setMappingStatus({
          type: "success",
          message: "Dosya eslemeleri kaydedildi",
        })
        loadRecentUploads()
      } else {
        const data = await res.json()
        setMappingStatus({
          type: "error",
          message: data.error || "Esleme kaydedilemedi",
        })
      }
    } catch (error) {
      console.error("Assignment save error:", error)
      setMappingStatus({
        type: "error",
        message: "Esleme kaydedilemedi",
      })
    }
  }

  const handleGenerateAI = async (uploadId: string, siteId: string, module: string) => {
    try {
      const res = await fetch("/api/data-upload/generate-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uploadId, siteId, module }),
      })

      if (res.ok) {
        setUploadStatus({
          type: "success",
          message: TR.dataUpload.aiReportGenerated
        })
        loadRecentUploads()
      } else {
        const data = await res.json()
        setUploadStatus({
          type: "error",
          message: data.error || "AI raporu oluşturulamadı"
        })
      }
    } catch (error) {
      console.error("AI generation error:", error)
      setUploadStatus({
        type: "error",
        message: "AI raporu oluşturulamadı"
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {TR.dataUpload.title}
        </h1>
        <p className="mt-2 text-slate-600">
          {TR.dataUpload.subtitle}
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>ℹ️ {TR.dataUpload.masterPanelOnly}</strong>
          </p>
          <p className="text-sm text-blue-700 mt-2">
            {TR.dataUpload.uploadInstructions}
          </p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" />
          {TR.dataUpload.uploadData}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Site Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {TR.dataUpload.selectSite}
            </label>
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isUploading}
            >
              <option value="">{TR.dataUpload.selectSite}</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          {/* File Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {TR.dataUpload.selectFileType}
            </label>
            <select
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isUploading}
            >
              <option value="EXCEL">{TR.dataUpload.fileTypes.EXCEL}</option>
              <option value="CSV">{TR.dataUpload.fileTypes.CSV}</option>
              <option value="JSON">{TR.dataUpload.fileTypes.JSON}</option>
            </select>
          </div>

          {/* Analytic Module Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {TR.dataUpload.selectAnalyticModule}
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isUploading}
            >
              <option value="UNASSIGNED">{TR.dataUpload.modules.UNASSIGNED}</option>
              <option value="FINANS">{TR.dataUpload.modules.FINANS}</option>
              <option value="SPOR">{TR.dataUpload.modules.SPOR}</option>
              <option value="BON">{TR.dataUpload.modules.BON}</option>
              <option value="CASINO">{TR.dataUpload.modules.CASINO}</option>
              <option value="GENEL">{TR.dataUpload.modules.GENEL}</option>
              <option value="PLAYERS">{TR.dataUpload.modules.PLAYERS}</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {TR.dataUpload.chooseFile}
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls,.csv,.json"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {selectedFiles.length > 0 && (
              <p className="mt-2 text-sm text-slate-600">
                Seçili: {selectedFiles.length} dosya (
                {(selectedFiles.reduce((sum, file) => sum + file.size, 0) / 1024).toFixed(2)} KB)
                {selectedFiles.length > 0 && (
                  <>
                    {" "}
                    -{" "}
                    {selectedFiles
                      .slice(0, 3)
                      .map((file) => file.name)
                      .join(", ")}
                    {selectedFiles.length > 3
                      ? ` +${selectedFiles.length - 3}`
                      : ""}
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className="mt-6">
          <button
            onClick={handleUpload}
            disabled={isUploading || selectedFiles.length === 0 || !selectedSiteId}
            className={cn(
              "w-full md:w-auto px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all",
              isUploading || selectedFiles.length === 0 || !selectedSiteId
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
            )}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {TR.dataUpload.uploading}
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                {TR.dataUpload.uploadFile}
              </>
            )}
          </button>
        </div>

        {/* Status Message */}
        {uploadStatus.type && (
          <div className={cn(
            "mt-4 p-4 rounded-lg flex items-center gap-2",
            uploadStatus.type === "success" 
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          )}>
            {uploadStatus.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{uploadStatus.message}</span>
          </div>
        )}
      </div>

      {/* Recent Uploads */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-600" />
          {TR.dataUpload.recentUploads}
        </h2>

        {isLoadingUploads ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : recentUploads.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {TR.dataUpload.noUploads}
            </h3>
            <p className="text-slate-600">
              {TR.dataUpload.noUploadsDesc}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    {TR.dataUpload.fileName}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Site
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    {TR.dataUpload.selectFileType}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    {TR.dataUpload.selectAnalyticModule}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    {TR.dataUpload.uploadDate}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    {TR.common.actions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentUploads.map((upload) => (
                  <tr key={upload.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {upload.fileName}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {upload.site?.name || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {TR.dataUpload.fileTypes[upload.fileType as keyof typeof TR.dataUpload.fileTypes]}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {TR.dataUpload.modules[upload.analyticModule as keyof typeof TR.dataUpload.modules]}
                    </td>
                    <td className="py-3 px-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        upload.status === "COMPLETED" && "bg-green-100 text-green-700",
                        upload.status === "PROCESSING" && "bg-blue-100 text-blue-700",
                        upload.status === "PENDING" && "bg-yellow-100 text-yellow-700",
                        upload.status === "FAILED" && "bg-red-100 text-red-700"
                      )}>
                        {upload.status === "PROCESSING" && <Loader2 className="w-3 h-3 animate-spin" />}
                        {TR.dataUpload.status[upload.status as keyof typeof TR.dataUpload.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {new Date(upload.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="py-3 px-4">
                      {upload.status === "COMPLETED" && (
                        <button
                          onClick={() => handleGenerateAI(upload.id, upload.siteId, upload.analyticModule)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all"
                        >
                          <Sparkles className="w-3 h-3" />
                          {TR.dataUpload.aiAnalysis}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Analysis Mapping */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-slate-600" />
          Dosya Eşleme
        </h2>

        {mappingStatus.type && (
          <div className={cn(
            "mb-4 p-4 rounded-lg flex items-center gap-2",
            mappingStatus.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          )}>
            {mappingStatus.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{mappingStatus.message}</span>
          </div>
        )}

        {recentUploads.length === 0 ? (
          <p className="text-sm text-slate-600">Henüz yükleme yok</p>
        ) : (
          <div className="space-y-6">
            {recentUploads.map((upload) => {
              const draft = assignmentsDraft[upload.id] ?? { modules: [], roles: {} }
              return (
                <div key={upload.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{upload.fileName}</p>
                      <p className="text-xs text-slate-500">
                        Site: {upload.site?.name || "-"} · Yükleme: {new Date(upload.createdAt).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <button
                      onClick={() => saveAssignments(upload.id)}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                    >
                      Eşlemeyi Kaydet
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {moduleOptions.map((option) => (
                      <label key={option.value} className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={draft.modules.includes(option.value)}
                          onChange={(e) => toggleModuleAssignment(upload.id, option.value, e.target.checked)}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>

                  {draft.modules.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {draft.modules.map((moduleValue) => {
                        const roleOptions = getRoleOptions(moduleValue)
                        const roleEntry = draft.roles[moduleValue] ?? { role: "UNSPECIFIED", customRole: "" }
                        return (
                          <div key={moduleValue} className="flex flex-col gap-2">
                            <div className="text-xs font-semibold text-slate-600">
                              {TR.dataUpload.modules[moduleValue as keyof typeof TR.dataUpload.modules]}
                            </div>
                            <div className="flex flex-col md:flex-row gap-2">
                              <select
                                value={roleEntry.role}
                                onChange={(e) => updateRoleSelection(upload.id, moduleValue, e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm text-slate-900"
                              >
                                <option value="UNSPECIFIED">Rol seç</option>
                                {roleOptions.map((role) => (
                                  <option key={role} value={role}>
                                    {role}
                                  </option>
                                ))}
                                <option value={CUSTOM_ROLE_VALUE}>Özel...</option>
                              </select>
                              {roleEntry.role === CUSTOM_ROLE_VALUE && (
                                <input
                                  value={roleEntry.customRole}
                                  onChange={(e) => updateCustomRole(upload.id, moduleValue, e.target.value)}
                                  placeholder="Özel rol girin"
                                  className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 placeholder:text-slate-400 flex-1"
                                />
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Link to Financial Flow */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-green-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {TR.financialFlow.title}
            </h3>
            <p className="text-sm text-green-700 mt-1">
              Yüklenen finansal veriler otomatik olarak "Para Nasıl Akıyor?" bölümünü besler
            </p>
          </div>
          <a
            href="/"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Görüntüle
          </a>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  terminateOtherSessions,
  terminateSession,
} from "@/lib/admin-actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Clock,
  Building2,
  Layout,
  LogOut,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"
import { UserRole } from "@/lib/auth"

interface Session {
  id: string
  userId: string
  ip: string
  deviceLabel: string | null
  deviceFingerprintHash: string
  createdAt: string
  lastSeenAt: string
  user: {
    id: string
    name: string
    email: string
    role: UserRole
    siteId: string
    site: {
      id: string
      name: string
    }
    department: {
      id: string
      name: string
    } | null
  }
}

interface SessionsManagementProps {
  initialSessions: Session[]
  currentSessionId: string
  currentUserRole: UserRole
}

function getDeviceIcon(deviceLabel: string | null) {
  if (!deviceLabel) return Globe
  
  const label = deviceLabel.toLowerCase()
  if (label.includes("mobile") || label.includes("phone")) return Smartphone
  if (label.includes("tablet") || label.includes("ipad")) return Tablet
  return Monitor
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
}

const roleColors = {
  SUPER_ADMIN: "bg-red-100 text-red-800 border-red-200",
  ADMIN: "bg-blue-100 text-blue-800 border-blue-200",
  MANAGER: "bg-purple-100 text-purple-800 border-purple-200",
  STAFF: "bg-slate-100 text-slate-800 border-slate-200",
}

export function SessionsManagement({
  initialSessions,
  currentSessionId,
  currentUserRole,
}: SessionsManagementProps) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions)
  const [isTerminateOthersOpen, setIsTerminateOthersOpen] = useState(false)
  const [isTerminateSessionOpen, setIsTerminateSessionOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filterSiteId, setFilterSiteId] = useState<string>("all")
  
  // Get unique sites for filtering (SUPER_ADMIN only)
  const sites = currentUserRole === "SUPER_ADMIN"
    ? Array.from(
        new Map(sessions.map((s) => [s.user.site.id, s.user.site])).values()
      )
    : []
  
  // Filter sessions
  const filteredSessions = sessions.filter((session) => {
    if (filterSiteId !== "all" && session.user.siteId !== filterSiteId) {
      return false
    }
    return true
  })
  
  // Group sessions by user
  const currentUserSessions = filteredSessions.filter(
    (s) => s.userId === sessions.find((session) => session.id === currentSessionId)?.userId
  )
  const otherUsersSessions = filteredSessions.filter(
    (s) => s.userId !== sessions.find((session) => session.id === currentSessionId)?.userId
  )
  
  const handleTerminateOthers = async () => {
    setIsLoading(true)
    const result = await terminateOtherSessions(currentSessionId)
    setIsLoading(false)
    
    if (result.success) {
      // Remove terminated sessions from state
      setSessions(sessions.filter((s) => s.id === currentSessionId || s.userId !== sessions.find(session => session.id === currentSessionId)?.userId))
      setIsTerminateOthersOpen(false)
      toast.success(`Terminated ${result.data.count} session${result.data.count !== 1 ? "s" : ""}`)
    } else {
      toast.error(result.error)
    }
  }
  
  const handleTerminateSession = async () => {
    if (!selectedSession) return
    
    setIsLoading(true)
    const result = await terminateSession(selectedSession.id)
    setIsLoading(false)
    
    if (result.success) {
      setSessions(sessions.filter((s) => s.id !== selectedSession.id))
      setIsTerminateSessionOpen(false)
      setSelectedSession(null)
      toast.success("Session terminated successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const openTerminateSession = (session: Session) => {
    setSelectedSession(session)
    setIsTerminateSessionOpen(true)
  }
  
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-sm text-slate-600">
            Active Sessions:{" "}
            <span className="font-semibold">{filteredSessions.length}</span>
          </div>
          
          {currentUserRole === "SUPER_ADMIN" && sites.length > 1 && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600">Site:</label>
              <Select value={filterSiteId} onValueChange={setFilterSiteId}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sites</SelectItem>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      {site.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        {currentUserSessions.length > 1 && (
          <Button
            onClick={() => setIsTerminateOthersOpen(true)}
            variant="outline"
            className="gap-2 text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700"
          >
            <LogOut className="w-4 h-4" />
            Terminate Other Sessions
          </Button>
        )}
      </div>
      
      {/* Current User Sessions */}
      {currentUserSessions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Your Active Sessions
          </h2>
          
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-200">
              {currentUserSessions.map((session) => {
                const DeviceIcon = getDeviceIcon(session.deviceLabel)
                const isCurrentSession = session.id === currentSessionId
                
                return (
                  <div
                    key={session.id}
                    className={`p-4 ${isCurrentSession ? "bg-green-50" : "hover:bg-slate-50"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-slate-100 rounded-lg">
                          <DeviceIcon className="w-6 h-6 text-slate-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-slate-900">
                              {session.deviceLabel || "Unknown Device"}
                            </h3>
                            {isCurrentSession && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                Current Session
                              </Badge>
                            )}
                          </div>
                          
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Globe className="w-3.5 h-3.5" />
                              <span className="font-mono">{session.ip}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Last active: {formatTimeAgo(session.lastSeenAt)}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <span>Started: {new Date(session.createdAt).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {!isCurrentSession && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openTerminateSession(session)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Other Users' Sessions (visible to admins) */}
      {otherUsersSessions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            Other Active Sessions
          </h2>
          
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-200">
              {otherUsersSessions.map((session) => {
                const DeviceIcon = getDeviceIcon(session.deviceLabel)
                
                return (
                  <div key={session.id} className="p-4 hover:bg-slate-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-slate-100 rounded-lg">
                          <DeviceIcon className="w-6 h-6 text-slate-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <h3 className="font-semibold text-slate-900">
                              {session.user.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className={roleColors[session.user.role]}
                            >
                              {session.user.role.replace("_", " ")}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-slate-600 mb-2">
                            {session.user.email}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5" />
                              {session.user.site.name}
                            </div>
                            
                            {session.user.department && (
                              <div className="flex items-center gap-1">
                                <Layout className="w-3.5 h-3.5" />
                                {session.user.department.name}
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Monitor className="w-3.5 h-3.5" />
                              <span>{session.deviceLabel || "Unknown Device"}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Globe className="w-3.5 h-3.5" />
                              <span className="font-mono">{session.ip}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Last active: {formatTimeAgo(session.lastSeenAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openTerminateSession(session)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Monitor className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No active sessions
          </h3>
          <p className="text-slate-600">
            There are no active sessions matching your filters
          </p>
        </div>
      )}
      
      {/* Terminate Others Dialog */}
      <AlertDialog open={isTerminateOthersOpen} onOpenChange={setIsTerminateOthersOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terminate All Other Sessions</AlertDialogTitle>
            <AlertDialogDescription>
              This will sign you out of all devices except this one. You will need
              to sign in again on those devices.
              <br />
              <br />
              <strong>
                {currentUserSessions.length - 1} session
                {currentUserSessions.length - 1 !== 1 ? "s" : ""} will be
                terminated.
              </strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleTerminateOthers}
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isLoading ? "Terminating..." : "Terminate Sessions"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Terminate Single Session Dialog */}
      <AlertDialog open={isTerminateSessionOpen} onOpenChange={setIsTerminateSessionOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terminate Session</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedSession && (
                <>
                  Are you sure you want to terminate this session?
                  <br />
                  <br />
                  <div className="text-slate-900 space-y-1">
                    <div>
                      <strong>User:</strong> {selectedSession.user.name}
                    </div>
                    <div>
                      <strong>Device:</strong> {selectedSession.deviceLabel || "Unknown"}
                    </div>
                    <div>
                      <strong>IP:</strong> {selectedSession.ip}
                    </div>
                  </div>
                  <br />
                  The user will be signed out immediately.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleTerminateSession}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Terminating..." : "Terminate Session"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

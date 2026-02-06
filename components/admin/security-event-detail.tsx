"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { resolveSecurityEvent } from "@/lib/admin-actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Shield,
  CheckCircle2,
  Clock,
  User,
  Building2,
  ArrowLeft,
  AlertTriangle,
  Info,
} from "lucide-react"
import { toast } from "sonner"
import { UserRole } from "@/lib/auth"
import {
  getEventMetadata,
  getSeverityColor,
  getCategoryColor,
} from "@/lib/security-events"
import Link from "next/link"

interface SecurityEvent {
  id: string
  siteId: string
  userId: string | null
  type: string
  metaJson: any
  createdAt: string
  resolvedAt: string | null
  resolvedBy: string | null
  site: {
    id: string
    name: string
  }
  user: {
    id: string
    name: string
    email: string
    role: UserRole
  } | null
  resolver?: {
    id: string
    name: string
    email: string
    role: UserRole
  } | null
}

interface SecurityEventDetailProps {
  event: SecurityEvent
  currentUserId: string
  currentUserRole: UserRole
}

export function SecurityEventDetail({
  event,
  currentUserId,
  currentUserRole,
}: SecurityEventDetailProps) {
  const router = useRouter()
  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const metadata = getEventMetadata(event.type)
  const isResolved = !!event.resolvedAt
  
  const handleResolve = async () => {
    setIsLoading(true)
    const result = await resolveSecurityEvent(event.id)
    setIsLoading(false)
    
    if (result.success) {
      setIsResolveDialogOpen(false)
      toast.success("Security event resolved successfully")
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/admin/security-events"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Security Events
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            {metadata.severity === "CRITICAL" || metadata.severity === "HIGH" ? (
              <AlertTriangle className="w-8 h-8 text-red-600" />
            ) : (
              <Info className="w-8 h-8 text-blue-600" />
            )}
            <h1 className="text-3xl font-bold text-slate-900">
              {metadata.label}
            </h1>
          </div>
          
          <p className="text-slate-600">
            {metadata.description}
          </p>
        </div>
        
        {!isResolved && (
          <Button
            onClick={() => setIsResolveDialogOpen(true)}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark as Resolved
          </Button>
        )}
      </div>
      
      {/* Status Banner */}
      {isResolved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-green-900">Event Resolved</div>
              <div className="text-sm text-green-700 mt-1">
                This security event was resolved on{" "}
                {new Date(event.resolvedAt!).toLocaleString()}
                {event.resolver && (
                  <>
                    {" "}by <strong>{event.resolver.name}</strong> ({event.resolver.email})
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Information Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Event Information
          </h2>
          
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium text-slate-600 mb-1">Event Type</div>
              <div className="text-slate-900">{metadata.label}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-slate-600 mb-1">Severity</div>
              <Badge
                variant="outline"
                className={getSeverityColor(metadata.severity)}
              >
                {metadata.severity}
              </Badge>
            </div>
            
            <div>
              <div className="text-sm font-medium text-slate-600 mb-1">Category</div>
              <Badge
                variant="outline"
                className={getCategoryColor(metadata.category)}
              >
                {metadata.category}
              </Badge>
            </div>
            
            <div>
              <div className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Created At
              </div>
              <div className="text-slate-900">
                {new Date(event.createdAt).toLocaleString()}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-slate-600 mb-1">Event ID</div>
              <div className="text-xs font-mono text-slate-700 bg-slate-50 px-2 py-1 rounded">
                {event.id}
              </div>
            </div>
          </div>
        </div>
        
        {/* Context Information Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Context Information
          </h2>
          
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Site
              </div>
              <div className="text-slate-900">{event.site.name}</div>
              <div className="text-xs font-mono text-slate-500 mt-0.5">
                {event.site.id}
              </div>
            </div>
            
            {event.user ? (
              <div>
                <div className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Associated User
                </div>
                <div className="text-slate-900">{event.user.name}</div>
                <div className="text-sm text-slate-600">{event.user.email}</div>
                <Badge
                  variant="outline"
                  className="mt-1 bg-slate-100 text-slate-800 border-slate-200"
                >
                  {event.user.role.replace("_", " ")}
                </Badge>
              </div>
            ) : (
              <div>
                <div className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Associated User
                </div>
                <div className="text-slate-500 italic">No user associated</div>
              </div>
            )}
            
            {/* Quick metadata highlights */}
            {event.metaJson && (
              <>
                {event.metaJson.ip && (
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">IP Address</div>
                    <div className="font-mono text-sm text-slate-900 bg-slate-50 px-2 py-1 rounded inline-block">
                      {event.metaJson.ip}
                    </div>
                  </div>
                )}
                
                {event.metaJson.deviceLabel && (
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">Device</div>
                    <div className="text-slate-900">{event.metaJson.deviceLabel}</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Metadata JSON Viewer */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Event Metadata
        </h2>
        
        {event.metaJson && Object.keys(event.metaJson).length > 0 ? (
          <div className="relative">
            <pre className="bg-slate-50 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-slate-800">
                {JSON.stringify(event.metaJson, null, 2)}
              </code>
            </pre>
            
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(event.metaJson, null, 2))
                toast.success("Copied to clipboard")
              }}
            >
              Copy
            </Button>
          </div>
        ) : (
          <div className="text-sm text-slate-500 italic bg-slate-50 rounded-lg p-4">
            No metadata available for this event
          </div>
        )}
      </div>
      
      {/* Resolve Dialog */}
      <AlertDialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resolve Security Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this security event as resolved?
              <br />
              <br />
              <div className="text-slate-900 space-y-1">
                <div>
                  <strong>Event:</strong> {metadata.label}
                </div>
                <div>
                  <strong>Type:</strong> {event.type}
                </div>
                <div>
                  <strong>Created:</strong> {new Date(event.createdAt).toLocaleString()}
                </div>
              </div>
              <br />
              This action will mark the event as resolved with your user ID and the current timestamp.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResolve}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Resolving..." : "Mark as Resolved"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

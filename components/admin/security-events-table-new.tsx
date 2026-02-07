"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { bulkResolveSecurityEvents } from "@/lib/admin-actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Building2,
  ChevronLeft,
  ChevronRight,
  Search as SearchIcon,
  Eye,
} from "lucide-react"
import { toast } from "sonner"
import { UserRole } from "@/lib/auth"
import {
  getEventMetadata,
  getSeverityColor,
  SecurityEventType,
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
}

interface SecurityEventsTableProps {
  events: SecurityEvent[]
  total: number
  page: number
  totalPages: number
  sites: any[]
  currentUserRole: UserRole
  searchParams: any
}

export function SecurityEventsTable({
  events,
  total,
  page,
  totalPages,
  sites,
  currentUserRole,
  searchParams,
}: SecurityEventsTableProps) {
  const router = useRouter()
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set())
  const [isBulkResolveDialogOpen, setIsBulkResolveDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Filter states
  const [searchInput, setSearchInput] = useState(searchParams.search || "")
  const [filterType, setFilterType] = useState(searchParams.type || "all")
  const [filterResolved, setFilterResolved] = useState(searchParams.resolved || "all")
  const [filterTimeRange, setFilterTimeRange] = useState(searchParams.timeRange || "all")
  const [filterSiteId, setFilterSiteId] = useState(searchParams.siteId || "all")
  
  const updateFilters = (updates: Record<string, string> = {}) => {
    const params = new URLSearchParams()
    
    // Apply all current filters
    const allFilters = {
      search: searchInput,
      type: filterType,
      resolved: filterResolved,
      timeRange: filterTimeRange,
      siteId: filterSiteId,
      ...updates,
    }
    
    Object.entries(allFilters).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value)
      }
    })
    
    router.push(`/admin/security-events?${params.toString()}`)
  }
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters()
  }
  
  const handleFilterChange = (key: string, value: string) => {
    if (key === "type") setFilterType(value)
    if (key === "resolved") setFilterResolved(value)
    if (key === "timeRange") setFilterTimeRange(value)
    if (key === "siteId") setFilterSiteId(value)
    
    updateFilters({ [key]: value })
  }
  
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams()
    
    // Preserve all filters
    if (searchInput) params.set("search", searchInput)
    if (filterType !== "all") params.set("type", filterType)
    if (filterResolved !== "all") params.set("resolved", filterResolved)
    if (filterTimeRange !== "all") params.set("timeRange", filterTimeRange)
    if (filterSiteId !== "all") params.set("siteId", filterSiteId)
    params.set("page", newPage.toString())
    
    router.push(`/admin/security-events?${params.toString()}`)
  }
  
  const handleSelectEvent = (eventId: string, isResolved: boolean) => {
    if (isResolved) return // Can't select resolved events
    
    const newSelected = new Set(selectedEvents)
    if (newSelected.has(eventId)) {
      newSelected.delete(eventId)
    } else {
      newSelected.add(eventId)
    }
    setSelectedEvents(newSelected)
  }
  
  const handleSelectAll = () => {
    const unresolvedEvents = events.filter(e => !e.resolvedAt)
    
    if (selectedEvents.size === unresolvedEvents.length && unresolvedEvents.length > 0) {
      setSelectedEvents(new Set())
    } else {
      setSelectedEvents(new Set(unresolvedEvents.map(e => e.id)))
    }
  }
  
  const handleBulkResolve = async () => {
    if (selectedEvents.size === 0) {
      toast.error("No events selected")
      return
    }
    
    setIsLoading(true)
    const result = await bulkResolveSecurityEvents(Array.from(selectedEvents))
    setIsLoading(false)
    
    if (result.success) {
      toast.success(`${result.data.count} event${result.data.count !== 1 ? "s" : ""} resolved successfully`)
      setSelectedEvents(new Set())
      setIsBulkResolveDialogOpen(false)
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }
  
  // Get unique event types from the SecurityEventType enum
  const eventTypes = Object.values(SecurityEventType)
  const unresolvedEvents = events.filter(e => !e.resolvedAt)
  
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by user name, email, or IP address..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          
          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {currentUserRole === "SUPER_ADMIN" && sites.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-600">Site</label>
                  <Select 
                    value={filterSiteId} 
                    onValueChange={(value) => handleFilterChange("siteId", value)}
                  >
                    <SelectTrigger>
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
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-600">Event Type</label>
                <Select 
                  value={filterType} 
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {eventTypes.map((type) => {
                      const metadata = getEventMetadata(type)
                      return (
                        <SelectItem key={type} value={type}>
                          {metadata.label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-600">Status</label>
                <Select 
                  value={filterResolved} 
                  onValueChange={(value) => handleFilterChange("resolved", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-600">Time Range</label>
                <Select 
                  value={filterTimeRange} 
                  onValueChange={(value) => handleFilterChange("timeRange", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {selectedEvents.size > 0 && (
              <div className="flex items-end">
                <Button
                  onClick={() => setIsBulkResolveDialogOpen(true)}
                  disabled={isLoading}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Selected as Resolved ({selectedEvents.size})
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <div>
          Showing <span className="font-semibold">{events.length}</span> of{" "}
          <span className="font-semibold">{total}</span> events
        </div>
      </div>
      
      {/* Events Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {events.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No security events found
            </h3>
            <p className="text-slate-600">
              There are no security events matching your filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left w-12">
                    <input
                      type="checkbox"
                      checked={selectedEvents.size === unresolvedEvents.length && unresolvedEvents.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Site
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Resolved
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {events.map((event) => {
                  const metadata = getEventMetadata(event.type)
                  const isResolved = !!event.resolvedAt
                  
                  return (
                    <tr key={event.id} className={`hover:bg-slate-50 ${isResolved ? "opacity-60" : ""}`}>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedEvents.has(event.id)}
                          onChange={() => handleSelectEvent(event.id, isResolved)}
                          disabled={isResolved}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <div>
                            <div className="text-sm text-slate-900">
                              {new Date(event.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(event.createdAt).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-sm text-slate-900 mb-1">
                            {metadata.label}
                          </div>
                          <Badge
                            variant="outline"
                            className={getSeverityColor(metadata.severity)}
                          >
                            {metadata.severity}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {event.user ? (
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <div>
                              <div className="text-sm text-slate-900">{event.user.name}</div>
                              <div className="text-xs text-slate-500">{event.user.email}</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400 italic">System</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-sm text-slate-900">{event.site.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {isResolved ? (
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600">Yes</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <XCircle className="w-4 h-4 text-orange-600" />
                            <span className="text-sm text-orange-600">No</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/security-events/${event.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Bulk Resolve Dialog */}
      <AlertDialog open={isBulkResolveDialogOpen} onOpenChange={setIsBulkResolveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Selected Events as Resolved</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark {selectedEvents.size} event{selectedEvents.size !== 1 ? "s" : ""} as resolved?
              <br />
              <br />
              This action will update all selected events with your user ID and the current timestamp.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkResolve}
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

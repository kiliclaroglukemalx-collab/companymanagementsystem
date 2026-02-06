"use client"

import { useState } from "react"
import { createSite, updateSite, deleteSite } from "@/lib/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Plus, Pencil, Trash2, Building2, Users, Layout } from "lucide-react"
import { toast } from "sonner"

interface Site {
  id: string
  name: string
  createdAt: string
  _count: {
    users: number
    departments: number
  }
}

interface SitesManagementProps {
  initialSites: Site[]
}

export function SitesManagement({ initialSites }: SitesManagementProps) {
  const [sites, setSites] = useState<Site[]>(initialSites)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)
  const [formData, setFormData] = useState({ name: "" })
  const [isLoading, setIsLoading] = useState(false)
  
  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error("Site name is required")
      return
    }
    
    setIsLoading(true)
    const result = await createSite({ name: formData.name })
    setIsLoading(false)
    
    if (result.success) {
      setSites([result.data, ...sites])
      setIsCreateOpen(false)
      setFormData({ name: "" })
      toast.success("Site created successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const handleUpdate = async () => {
    if (!selectedSite || !formData.name.trim()) {
      return
    }
    
    setIsLoading(true)
    const result = await updateSite(selectedSite.id, { name: formData.name })
    setIsLoading(false)
    
    if (result.success) {
      setSites(
        sites.map((s) => (s.id === selectedSite.id ? result.data : s))
      )
      setIsEditOpen(false)
      setSelectedSite(null)
      setFormData({ name: "" })
      toast.success("Site updated successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const handleDelete = async () => {
    if (!selectedSite) return
    
    setIsLoading(true)
    const result = await deleteSite(selectedSite.id)
    setIsLoading(false)
    
    if (result.success) {
      setSites(sites.filter((s) => s.id !== selectedSite.id))
      setIsDeleteOpen(false)
      setSelectedSite(null)
      toast.success("Site deleted successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const openCreate = () => {
    setFormData({ name: "" })
    setIsCreateOpen(true)
  }
  
  const openEdit = (site: Site) => {
    setSelectedSite(site)
    setFormData({ name: site.name })
    setIsEditOpen(true)
  }
  
  const openDelete = (site: Site) => {
    setSelectedSite(site)
    setIsDeleteOpen(true)
  }
  
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-600">
          Total Sites: <span className="font-semibold">{sites.length}</span>
        </div>
        
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Site
        </Button>
      </div>
      
      {/* Sites Grid */}
      {sites.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No sites yet
          </h3>
          <p className="text-slate-600 mb-4">
            Create your first site to get started
          </p>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Site
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {site.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {new Date(site.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(site)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDelete(site)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">
                    {site._count.users} users
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Layout className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">
                    {site._count.departments} depts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Site</DialogTitle>
            <DialogDescription>
              Add a new site to the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Site Name
              </label>
              <Input
                placeholder="Enter site name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Site"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Site</DialogTitle>
            <DialogDescription>
              Update site information
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Site Name
              </label>
              <Input
                placeholder="Enter site name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Site"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Site</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedSite?.name}</strong>? This will also delete all
              departments, users, and related data. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

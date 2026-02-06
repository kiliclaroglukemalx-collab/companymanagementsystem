"use client"

import { useState } from "react"
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/lib/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Plus, Pencil, Trash2, Layout, Users, Building2, BarChart3 } from "lucide-react"
import { toast } from "sonner"

interface Department {
  id: string
  name: string
  siteId: string
  createdAt: string
  site: {
    id: string
    name: string
  }
  _count: {
    users: number
    ratingCriteria: number
  }
}

interface Site {
  id: string
  name: string
}

interface DepartmentsManagementProps {
  initialDepartments: Department[]
  sites: Site[]
}

export function DepartmentsManagement({
  initialDepartments,
  sites,
}: DepartmentsManagementProps) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [formData, setFormData] = useState({ name: "", siteId: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [filterSiteId, setFilterSiteId] = useState<string>("all")
  
  const filteredDepartments =
    filterSiteId === "all"
      ? departments
      : departments.filter((d) => d.siteId === filterSiteId)
  
  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error("Department name is required")
      return
    }
    
    if (!formData.siteId) {
      toast.error("Site is required")
      return
    }
    
    setIsLoading(true)
    const result = await createDepartment({
      name: formData.name,
      siteId: formData.siteId,
    })
    setIsLoading(false)
    
    if (result.success) {
      setDepartments([result.data, ...departments])
      setIsCreateOpen(false)
      setFormData({ name: "", siteId: "" })
      toast.success("Department created successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const handleUpdate = async () => {
    if (!selectedDepartment || !formData.name.trim()) {
      return
    }
    
    setIsLoading(true)
    const result = await updateDepartment(selectedDepartment.id, {
      name: formData.name,
    })
    setIsLoading(false)
    
    if (result.success) {
      setDepartments(
        departments.map((d) =>
          d.id === selectedDepartment.id ? result.data : d
        )
      )
      setIsEditOpen(false)
      setSelectedDepartment(null)
      setFormData({ name: "", siteId: "" })
      toast.success("Department updated successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const handleDelete = async () => {
    if (!selectedDepartment) return
    
    setIsLoading(true)
    const result = await deleteDepartment(selectedDepartment.id)
    setIsLoading(false)
    
    if (result.success) {
      setDepartments(departments.filter((d) => d.id !== selectedDepartment.id))
      setIsDeleteOpen(false)
      setSelectedDepartment(null)
      toast.success("Department deleted successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const openCreate = () => {
    setFormData({ name: "", siteId: sites[0]?.id || "" })
    setIsCreateOpen(true)
  }
  
  const openEdit = (department: Department) => {
    setSelectedDepartment(department)
    setFormData({ name: department.name, siteId: department.siteId })
    setIsEditOpen(true)
  }
  
  const openDelete = (department: Department) => {
    setSelectedDepartment(department)
    setIsDeleteOpen(true)
  }
  
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600">
            Total Departments:{" "}
            <span className="font-semibold">{filteredDepartments.length}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Filter by Site:</label>
            <Select value={filterSiteId} onValueChange={setFilterSiteId}>
              <SelectTrigger className="w-48">
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
        </div>
        
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Department
        </Button>
      </div>
      
      {/* Departments Grid */}
      {filteredDepartments.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Layout className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No departments yet
          </h3>
          <p className="text-slate-600 mb-4">
            Create your first department to get started
          </p>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Department
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepartments.map((department) => (
            <div
              key={department.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Layout className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {department.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {department.site.name}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(department)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDelete(department)}
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
                    {department._count.users} users
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">
                    {department._count.ratingCriteria} criteria
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
            <DialogTitle>Create New Department</DialogTitle>
            <DialogDescription>
              Add a new department to a site
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Site
              </label>
              <Select
                value={formData.siteId}
                onValueChange={(value) =>
                  setFormData({ ...formData, siteId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a site" />
                </SelectTrigger>
                <SelectContent>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      {site.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Department Name
              </label>
              <Input
                placeholder="Enter department name"
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
              {isLoading ? "Creating..." : "Create Department"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Update department information
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Site
              </label>
              <Input
                value={
                  sites.find((s) => s.id === formData.siteId)?.name || ""
                }
                disabled
                className="bg-slate-50"
              />
              <p className="text-xs text-slate-500">
                Site cannot be changed after creation
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Department Name
              </label>
              <Input
                placeholder="Enter department name"
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
              {isLoading ? "Updating..." : "Update Department"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Department</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedDepartment?.name}</strong>? This will also affect
              all users and rating criteria in this department. This action
              cannot be undone.
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

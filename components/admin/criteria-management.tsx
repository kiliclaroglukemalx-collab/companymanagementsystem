"use client"

import { useState } from "react"
import {
  createRatingCriteria,
  updateRatingCriteria,
  deleteRatingCriteria,
} from "@/lib/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
import {
  Plus,
  Pencil,
  Trash2,
  BarChart3,
  Building2,
  Layout,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"

interface Criteria {
  id: string
  name: string
  weight: number
  isActive: boolean
  departmentId: string
  createdAt: string
  department: {
    id: string
    name: string
    site: {
      id: string
      name: string
    }
  }
}

interface Department {
  id: string
  name: string
  siteId: string
  site: {
    id: string
    name: string
  }
}

interface CriteriaManagementProps {
  initialCriteria: Criteria[]
  departments: Department[]
}

export function CriteriaManagement({
  initialCriteria,
  departments,
}: CriteriaManagementProps) {
  const [criteria, setCriteria] = useState<Criteria[]>(initialCriteria)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedCriteria, setSelectedCriteria] = useState<Criteria | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    weight: 50,
    departmentId: "",
    isActive: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [filterDepartmentId, setFilterDepartmentId] = useState<string>("all")
  
  // Filter criteria
  const filteredCriteria =
    filterDepartmentId === "all"
      ? criteria
      : criteria.filter((c) => c.departmentId === filterDepartmentId)
  
  // Group by department for better visualization
  const groupedCriteria = filteredCriteria.reduce(
    (acc, c) => {
      const key = c.departmentId
      if (!acc[key]) {
        acc[key] = {
          department: c.department,
          criteria: [],
        }
      }
      acc[key].criteria.push(c)
      return acc
    },
    {} as Record<
      string,
      {
        department: Criteria["department"]
        criteria: Criteria[]
      }
    >
  )
  
  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error("Criteria name is required")
      return
    }
    
    if (!formData.departmentId) {
      toast.error("Department is required")
      return
    }
    
    if (formData.weight < 0 || formData.weight > 100) {
      toast.error("Weight must be between 0 and 100")
      return
    }
    
    setIsLoading(true)
    const result = await createRatingCriteria({
      name: formData.name,
      weight: formData.weight,
      departmentId: formData.departmentId,
    })
    setIsLoading(false)
    
    if (result.success) {
      setCriteria([result.data, ...criteria])
      setIsCreateOpen(false)
      setFormData({ name: "", weight: 50, departmentId: "", isActive: true })
      toast.success("Criteria created successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const handleUpdate = async () => {
    if (!selectedCriteria || !formData.name.trim()) {
      return
    }
    
    if (formData.weight < 0 || formData.weight > 100) {
      toast.error("Weight must be between 0 and 100")
      return
    }
    
    setIsLoading(true)
    const result = await updateRatingCriteria(selectedCriteria.id, {
      name: formData.name,
      weight: formData.weight,
      isActive: formData.isActive,
    })
    setIsLoading(false)
    
    if (result.success) {
      setCriteria(
        criteria.map((c) => (c.id === selectedCriteria.id ? result.data : c))
      )
      setIsEditOpen(false)
      setSelectedCriteria(null)
      setFormData({ name: "", weight: 50, departmentId: "", isActive: true })
      toast.success("Criteria updated successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const handleDelete = async () => {
    if (!selectedCriteria) return
    
    setIsLoading(true)
    const result = await deleteRatingCriteria(selectedCriteria.id)
    setIsLoading(false)
    
    if (result.success) {
      setCriteria(criteria.filter((c) => c.id !== selectedCriteria.id))
      setIsDeleteOpen(false)
      setSelectedCriteria(null)
      toast.success("Criteria deleted successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const openCreate = () => {
    setFormData({
      name: "",
      weight: 50,
      departmentId: departments[0]?.id || "",
      isActive: true,
    })
    setIsCreateOpen(true)
  }
  
  const openEdit = (c: Criteria) => {
    setSelectedCriteria(c)
    setFormData({
      name: c.name,
      weight: c.weight,
      departmentId: c.departmentId,
      isActive: c.isActive,
    })
    setIsEditOpen(true)
  }
  
  const openDelete = (c: Criteria) => {
    setSelectedCriteria(c)
    setIsDeleteOpen(true)
  }
  
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600">
            Total Criteria:{" "}
            <span className="font-semibold">{filteredCriteria.length}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Department:</label>
            <Select
              value={filterDepartmentId}
              onValueChange={setFilterDepartmentId}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.site.name} / {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Criteria
        </Button>
      </div>
      
      {/* Criteria Groups */}
      {Object.keys(groupedCriteria).length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No criteria yet
          </h3>
          <p className="text-slate-600 mb-4">
            Create your first rating criteria to get started
          </p>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Criteria
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.values(groupedCriteria).map((group) => (
            <div
              key={group.department.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              {/* Department Header */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 border-b border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Layout className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {group.department.name}
                    </h3>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {group.department.site.name}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="bg-white">
                      {group.criteria.length} criteria
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Criteria List */}
              <div className="divide-y divide-slate-200">
                {group.criteria.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium text-slate-900">
                              {c.name}
                            </h4>
                            {c.isActive ? (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 border-green-200"
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Active
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-slate-100 text-slate-800 border-slate-200"
                              >
                                <XCircle className="w-3 h-3 mr-1" />
                                Inactive
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-slate-600">
                              Weight:
                            </span>
                            <div className="flex-1 max-w-xs">
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                                  style={{ width: `${c.weight}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-slate-900">
                              {c.weight}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(c)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDelete(c)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Criteria</DialogTitle>
            <DialogDescription>
              Add a new rating criteria to a department
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Department *
              </label>
              <Select
                value={formData.departmentId}
                onValueChange={(value) =>
                  setFormData({ ...formData, departmentId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.site.name} / {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Criteria Name *
              </label>
              <Input
                placeholder="e.g., Speed, Accuracy, Communication"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Weight (0-100) *
              </label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-24"
                />
                <div className="flex-1">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                      style={{ width: `${formData.weight}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {formData.weight}%
                </span>
              </div>
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
              {isLoading ? "Creating..." : "Create Criteria"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Criteria</DialogTitle>
            <DialogDescription>
              Update criteria information
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Department
              </label>
              <Input
                value={
                  departments.find((d) => d.id === formData.departmentId)
                    ?.name || ""
                }
                disabled
                className="bg-slate-50"
              />
              <p className="text-xs text-slate-500">
                Department cannot be changed after creation
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Criteria Name
              </label>
              <Input
                placeholder="e.g., Speed, Accuracy, Communication"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Weight (0-100)
              </label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-24"
                />
                <div className="flex-1">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                      style={{ width: `${formData.weight}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {formData.weight}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-slate-900">
                  Active Status
                </label>
                <p className="text-xs text-slate-500">
                  Inactive criteria won't be used for ratings
                </p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
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
              {isLoading ? "Updating..." : "Update Criteria"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Criteria</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedCriteria?.name}</strong>? This action cannot be
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

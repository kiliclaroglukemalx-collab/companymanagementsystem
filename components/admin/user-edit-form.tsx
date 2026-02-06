"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateUser, toggleUserActive } from "@/lib/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Loader2, UserCheck, UserX } from "lucide-react"
import { toast } from "sonner"
import { UserRole } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
  siteId: string
  departmentId: string | null
  createdAt: string
  site: {
    id: string
    name: string
  }
  department: {
    id: string
    name: string
  } | null
}

interface Department {
  id: string
  name: string
  siteId: string
}

interface UserEditFormProps {
  user: User
  departments: Department[]
  currentUserRole: UserRole
}

const roleOptions: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF"]

export function UserEditForm({
  user,
  departments,
  currentUserRole,
}: UserEditFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showToggleDialog, setShowToggleDialog] = useState(false)
  
  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
    departmentId: user.departmentId || "",
  })
  
  // Get available roles based on current user role
  const availableRoles =
    currentUserRole === "SUPER_ADMIN"
      ? roleOptions
      : roleOptions.filter((r) => r !== "SUPER_ADMIN" && r !== "ADMIN")
  
  // Filter departments based on user's site
  const availableDepartments = departments.filter((d) => d.siteId === user.siteId)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error("Name is required")
      return
    }
    
    setIsLoading(true)
    const result = await updateUser(user.id, {
      name: formData.name,
      role: formData.role,
      departmentId: formData.departmentId || null,
    })
    setIsLoading(false)
    
    if (result.success) {
      toast.success("User updated successfully")
      router.push("/admin/users")
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }
  
  const handleToggleActive = async () => {
    setIsLoading(true)
    const result = await toggleUserActive(user.id, !user.isActive)
    setIsLoading(false)
    
    if (result.success) {
      toast.success(`User ${!user.isActive ? "activated" : "deactivated"} successfully`)
      setShowToggleDialog(false)
      router.push("/admin/users")
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }
  
  const hasChanges =
    formData.name !== user.name ||
    formData.role !== user.role ||
    formData.departmentId !== (user.departmentId || "")
  
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              User Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              
              {/* Email (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="bg-slate-50"
                />
                <p className="text-xs text-slate-500">
                  Email cannot be changed
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Site (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="site">Site</Label>
                <Input
                  id="site"
                  value={user.site.name}
                  disabled
                  className="bg-slate-50"
                />
                <p className="text-xs text-slate-500">
                  Site cannot be changed
                </p>
              </div>
              
              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.departmentId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, departmentId: value })
                  }
                  disabled={availableDepartments.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {availableDepartments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500">
                  Optional - Leave empty if not applicable
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">
                  Role <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value as UserRole })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {currentUserRole === "ADMIN" && (
                  <p className="text-xs text-slate-500">
                    You can only assign MANAGER or STAFF roles
                  </p>
                )}
              </div>
              
              {/* Status (Read-only display) */}
              <div className="space-y-2">
                <Label>Current Status</Label>
                <div className="h-10 flex items-center">
                  {user.isActive ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      Inactive
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Read-only Info Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Additional Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-600 mb-1">Created At</div>
              <div className="font-medium text-slate-900">
                {new Date(user.createdAt).toLocaleString()}
              </div>
            </div>
            
            <div>
              <div className="text-slate-600 mb-1">User ID</div>
              <div className="font-mono text-xs text-slate-900">
                {user.id}
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/users")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !hasChanges}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
          
          <Button
            type="button"
            variant={user.isActive ? "destructive" : "default"}
            onClick={() => setShowToggleDialog(true)}
            disabled={isLoading}
          >
            {user.isActive ? (
              <>
                <UserX className="w-4 h-4 mr-2" />
                Deactivate User
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4 mr-2" />
                Activate User
              </>
            )}
          </Button>
        </div>
      </form>
      
      {/* Toggle Active Dialog */}
      <AlertDialog open={showToggleDialog} onOpenChange={setShowToggleDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {user.isActive ? "Deactivate" : "Activate"} User
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {user.isActive ? "deactivate" : "activate"}{" "}
              <strong>{user.name}</strong>?
              {user.isActive && (
                <span className="block mt-2">
                  The user will no longer be able to log in until reactivated.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleToggleActive}
              disabled={isLoading}
              className={user.isActive ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : user.isActive ? (
                "Deactivate"
              ) : (
                "Activate"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

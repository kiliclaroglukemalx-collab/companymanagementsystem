"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { CheckCircle2, Copy, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { UserRole } from "@/lib/auth"

interface Site {
  id: string
  name: string
}

interface Department {
  id: string
  name: string
  siteId: string
}

interface UserCreateFormProps {
  sites: Site[]
  departments: Department[]
  currentUserRole: UserRole
  currentUserSiteId: string
}

const roleOptions: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF"]

export function UserCreateForm({
  sites,
  departments,
  currentUserRole,
  currentUserSiteId,
}: UserCreateFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [tempPassword, setTempPassword] = useState<string | null>(null)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "STAFF" as UserRole,
    siteId: currentUserRole === "ADMIN" ? currentUserSiteId : (sites[0]?.id || ""),
    departmentId: "",
    isActive: true,
  })
  
  // Get available roles based on current user role
  const availableRoles =
    currentUserRole === "SUPER_ADMIN"
      ? roleOptions
      : roleOptions.filter((r) => r !== "SUPER_ADMIN" && r !== "ADMIN")
  
  // Filter departments based on selected site
  const availableDepartments = formData.siteId
    ? departments.filter((d) => d.siteId === formData.siteId)
    : []
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error("Name is required")
      return
    }
    
    if (!formData.email.trim()) {
      toast.error("Email is required")
      return
    }
    
    if (!formData.siteId) {
      toast.error("Site is required")
      return
    }
    
    setIsLoading(true)
    const result = await createUser({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      siteId: formData.siteId,
      departmentId: formData.departmentId || undefined,
      isActive: formData.isActive,
    })
    setIsLoading(false)
    
    if (result.success) {
      setTempPassword(result.data.tempPassword)
      setShowPasswordDialog(true)
      toast.success("User created successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const copyPassword = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword)
      toast.success("Password copied to clipboard")
    }
  }
  
  const handleClose = () => {
    setShowPasswordDialog(false)
    router.push("/admin/users")
  }
  
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
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
            
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Site */}
            <div className="space-y-2">
              <Label htmlFor="site">
                Site <span className="text-red-500">*</span>
              </Label>
              {currentUserRole === "ADMIN" ? (
                <Input
                  value={sites.find((s) => s.id === currentUserSiteId)?.name || "Your Site"}
                  disabled
                  className="bg-slate-50"
                />
              ) : (
                <Select
                  value={formData.siteId}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      siteId: value,
                      departmentId: "",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select site" />
                  </SelectTrigger>
                  <SelectContent>
                    {sites.map((site) => (
                      <SelectItem key={site.id} value={site.id}>
                        {site.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {currentUserRole === "ADMIN" && (
                <p className="text-xs text-slate-500">
                  Users can only be created in your site
                </p>
              )}
            </div>
            
            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.departmentId}
                onValueChange={(value) =>
                  setFormData({ ...formData, departmentId: value })
                }
                disabled={!formData.siteId || availableDepartments.length === 0}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            
            {/* Active Status */}
            <div className="space-y-2">
              <Label htmlFor="isActive">Status</Label>
              <div className="flex items-center gap-3 h-10">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <span className="text-sm text-slate-600">
                  {formData.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Inactive users cannot log in
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="text-sm text-blue-800">
                <strong>Note:</strong> A temporary password will be generated for the user. 
                They will be required to change it on first login.
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/users")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create User"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              User Created Successfully
            </DialogTitle>
            <DialogDescription>
              Save this temporary password. The user must change it on first login.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <Label className="text-xs text-slate-600 mb-2 block">
                Temporary Password
              </Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xl font-mono font-bold text-slate-900 bg-white px-3 py-2 rounded border border-slate-300">
                  {tempPassword}
                </code>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={copyPassword}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-slate-600 space-y-2">
              <p>
                <strong>Important:</strong> This password will not be shown again.
              </p>
              <p>
                Make sure to copy it and share it securely with the user.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={handleClose}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

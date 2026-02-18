"use client"

import { useState } from "react"
import {
  createUser,
  updateUser,
  toggleUserActive,
} from "@/lib/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  UserCheck,
  UserX,
  Users,
  Building2,
  Layout,
  Shield,
  Copy,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"
import { UserRole } from "@/lib/auth"

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
  createdBy: {
    id: string
    name: string
    email: string
  } | null
}

interface Site {
  id: string
  name: string
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

interface UsersManagementProps {
  initialUsers: User[]
  sites: Site[]
  departments: Department[]
  currentUserRole: UserRole
}

const roleOptions: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF"]

const roleColors = {
  SUPER_ADMIN: "bg-red-100 text-red-800 border-red-200",
  ADMIN: "bg-blue-100 text-blue-800 border-blue-200",
  MANAGER: "bg-purple-100 text-purple-800 border-purple-200",
  STAFF: "bg-slate-100 text-slate-800 border-slate-200",
}

export function UsersManagement({
  initialUsers,
  sites,
  departments,
  currentUserRole,
}: UsersManagementProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isToggleActiveOpen, setIsToggleActiveOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [tempPassword, setTempPassword] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "STAFF" as UserRole,
    siteId: "",
    departmentId: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [filterSiteId, setFilterSiteId] = useState<string>("all")
  const [filterRole, setFilterRole] = useState<string>("all")
  
  // All roles available (only SUPER_ADMIN can access this page)
  const availableRoles = roleOptions
  
  // Filter departments based on selected site
  const availableDepartments = formData.siteId
    ? departments.filter((d) => d.siteId === formData.siteId)
    : []
  
  // Filter users
  const filteredUsers = users.filter((user) => {
    if (filterSiteId !== "all" && user.siteId !== filterSiteId) return false
    if (filterRole !== "all" && user.role !== filterRole) return false
    return true
  })
  
  const handleCreate = async () => {
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
    })
    setIsLoading(false)
    
    if (result.success) {
      setUsers([result.data.user, ...users])
      setTempPassword(result.data.tempPassword)
      toast.success("User created successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const handleUpdate = async () => {
    if (!selectedUser || !formData.name.trim()) {
      return
    }
    
    setIsLoading(true)
    const result = await updateUser(selectedUser.id, {
      name: formData.name,
      departmentId: formData.departmentId || null,
      role: formData.role,
    })
    setIsLoading(false)
    
    if (result.success) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? result.data : u)))
      setIsEditOpen(false)
      setSelectedUser(null)
      setFormData({
        name: "",
        email: "",
        role: "STAFF",
        siteId: "",
        departmentId: "",
      })
      toast.success("User updated successfully")
    } else {
      toast.error(result.error)
    }
  }
  
  const handleToggleActive = async () => {
    if (!selectedUser) return
    
    const newStatus = !selectedUser.isActive
    
    setIsLoading(true)
    const result = await toggleUserActive(selectedUser.id, newStatus)
    setIsLoading(false)
    
    if (result.success) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? result.data : u)))
      setIsToggleActiveOpen(false)
      setSelectedUser(null)
      toast.success(
        `User ${newStatus ? "activated" : "deactivated"} successfully`
      )
    } else {
      toast.error(result.error)
    }
  }
  
  const openCreate = () => {
    setFormData({
      name: "",
      email: "",
      role: "STAFF",
      siteId: sites[0]?.id || "",
      departmentId: "",
    })
    setTempPassword(null)
    setIsCreateOpen(true)
  }
  
  const openEdit = (user: User) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      siteId: user.siteId,
      departmentId: user.departmentId || "",
    })
    setIsEditOpen(true)
  }
  
  const openToggleActive = (user: User) => {
    setSelectedUser(user)
    setIsToggleActiveOpen(true)
  }
  
  const copyPassword = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword)
      toast.success("Password copied to clipboard")
    }
  }
  
  const closeCreateDialog = () => {
    setIsCreateOpen(false)
    setTempPassword(null)
    setFormData({
      name: "",
      email: "",
      role: "STAFF",
      siteId: "",
      departmentId: "",
    })
  }
  
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-sm text-slate-600">
            Total Users:{" "}
            <span className="font-semibold">{filteredUsers.length}</span>
          </div>
          
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
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Role:</label>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Create User
        </Button>
      </div>
      
      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No users found
          </h3>
          <p className="text-slate-600 mb-4">
            Create your first user to get started
          </p>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Create User
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Site / Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-slate-900">
                          <Building2 className="w-3 h-3" />
                          {user.site.name}
                        </div>
                        {user.department && (
                          <div className="flex items-center gap-1 text-slate-500">
                            <Layout className="w-3 h-3" />
                            {user.department.name}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={roleColors[user.role]}
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        {user.role.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {user.isActive ? (
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
                          className="bg-red-100 text-red-800 border-red-200"
                        >
                          Inactive
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(user)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openToggleActive(user)}
                          className={
                            user.isActive
                              ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                              : "text-green-600 hover:text-green-700 hover:bg-green-50"
                          }
                        >
                          {user.isActive ? (
                            <UserX className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={closeCreateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system
            </DialogDescription>
          </DialogHeader>
          
          {tempPassword ? (
            <div className="space-y-4 py-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  User Created Successfully
                </div>
                <p className="text-sm text-green-700 mb-3">
                  Save this temporary password. The user must change it on first login.
                </p>
                <div className="bg-white rounded border border-green-300 p-3 flex items-center justify-between">
                  <code className="text-lg font-mono font-bold text-slate-900">
                    {tempPassword}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyPassword}
                    className="text-green-700 hover:bg-green-100"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    Full Name *
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    Site *
                  </label>
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
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    Department
                  </label>
                  <Select
                    value={formData.departmentId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, departmentId: value })
                    }
                    disabled={!formData.siteId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Optional" />
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
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">
                  Role *
                </label>
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
              </div>
            </div>
          )}
          
          <DialogFooter>
            {tempPassword ? (
              <Button onClick={closeCreateDialog}>Close</Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={closeCreateDialog}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create User"}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Full Name
              </label>
              <Input
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                disabled
                className="bg-slate-50"
              />
              <p className="text-xs text-slate-500">
                Email cannot be changed after creation
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Site
              </label>
              <Input
                value={sites.find((s) => s.id === formData.siteId)?.name || ""}
                disabled
                className="bg-slate-50"
              />
              <p className="text-xs text-slate-500">
                Site cannot be changed after creation
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                Department
              </label>
              <Select
                value={formData.departmentId}
                onValueChange={(value) =>
                  setFormData({ ...formData, departmentId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="None" />
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
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Role</label>
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
              {isLoading ? "Updating..." : "Update User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Toggle Active Dialog */}
      <AlertDialog open={isToggleActiveOpen} onOpenChange={setIsToggleActiveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser?.isActive ? "Deactivate" : "Activate"} User
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to{" "}
              {selectedUser?.isActive ? "deactivate" : "activate"}{" "}
              <strong>{selectedUser?.name}</strong>?
              {selectedUser?.isActive &&
                " The user will no longer be able to log in."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleToggleActive} disabled={isLoading}>
              {isLoading
                ? "Processing..."
                : selectedUser?.isActive
                  ? "Deactivate"
                  : "Activate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

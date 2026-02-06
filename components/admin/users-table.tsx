"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
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
  Pencil,
  Search,
  ChevronLeft,
  ChevronRight,
  Shield,
  Building2,
  Layout,
  CheckCircle2,
} from "lucide-react"
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
}

interface Site {
  id: string
  name: string
}

interface Department {
  id: string
  name: string
  siteId: string
}

interface UsersTableProps {
  users: User[]
  total: number
  page: number
  totalPages: number
  sites: Site[]
  departments: Department[]
  currentUserRole: UserRole
  searchParams: {
    search?: string
    role?: string
    status?: string
    departmentId?: string
  }
}

const roleOptions: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF"]

const roleColors = {
  SUPER_ADMIN: "bg-red-100 text-red-800 border-red-200",
  ADMIN: "bg-blue-100 text-blue-800 border-blue-200",
  MANAGER: "bg-purple-100 text-purple-800 border-purple-200",
  STAFF: "bg-slate-100 text-slate-800 border-slate-200",
}

export function UsersTable({
  users,
  total,
  page,
  totalPages,
  sites,
  departments,
  currentUserRole,
  searchParams,
}: UsersTableProps) {
  const router = useRouter()
  const params = useSearchParams()
  const [search, setSearch] = useState(searchParams.search || "")
  
  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString())
    if (value && value !== "all") {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    newParams.delete("page") // Reset to page 1 on filter change
    router.push(`/admin/users?${newParams.toString()}`)
  }
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters("search", search)
  }
  
  const goToPage = (newPage: number) => {
    const newParams = new URLSearchParams(params.toString())
    newParams.set("page", newPage.toString())
    router.push(`/admin/users?${newParams.toString()}`)
  }
  
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          
          {/* Role Filter */}
          <Select
            value={searchParams.role || "all"}
            onValueChange={(value) => updateFilters("role", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Roles" />
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
          
          {/* Status Filter */}
          <Select
            value={searchParams.status || "all"}
            onValueChange={(value) => updateFilters("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Department Filter (full width on second row) */}
        {departments.length > 0 && (
          <div className="mt-4">
            <Select
              value={searchParams.departmentId || "all"}
              onValueChange={(value) => updateFilters("departmentId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <div>
          Showing <span className="font-semibold">{users.length}</span> of{" "}
          <span className="font-semibold">{total}</span> users
        </div>
        {totalPages > 1 && (
          <div className="text-slate-500">
            Page {page} of {totalPages}
          </div>
        )}
      </div>
      
      {/* Table */}
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-slate-500">
                      <div className="font-medium">No users found</div>
                      <div className="text-sm mt-1">
                        Try adjusting your filters or search terms
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
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
                          <div className="flex items-center gap-1 text-slate-500 mt-1">
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
                      <div className="flex justify-end">
                        <Link href={`/admin/users/${user.id}`}>
                          <Button variant="ghost" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (page <= 3) {
                pageNum = i + 1
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = page - 2 + i
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { AuthContext } from "@/lib/auth"
import { Building2, Users, Layout, BarChart3, Home, Monitor, Shield, LogOut, ChevronDown, Upload, Bell } from "lucide-react"
import { logoutAction } from "@/app/(auth)/logout/actions"

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: Home,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    href: "/admin/sites",
    label: "Sites",
    icon: Building2,
    roles: ["SUPER_ADMIN"],
  },
  {
    href: "/admin/departments",
    label: "Departments",
    icon: Layout,
    roles: ["SUPER_ADMIN"],
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    href: "/admin/data-upload",
    label: "Data Upload",
    icon: Upload,
    roles: ["SUPER_ADMIN"],
  },
  {
    href: "/admin/announcements",
    label: "Announcements",
    icon: Bell,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    href: "/admin/sessions",
    label: "Sessions",
    icon: Monitor,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    href: "/admin/security-events",
    label: "Security Events",
    icon: Shield,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    href: "/admin/criteria",
    label: "Rating Criteria",
    icon: BarChart3,
    roles: ["SUPER_ADMIN"],
  },
]

interface AdminNavProps {
  auth: AuthContext
}

export function AdminNav({ auth }: AdminNavProps) {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  // Filter items based on role
  const visibleItems = navItems.filter((item) =>
    item.roles.includes(auth.role)
  )
  
  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logoutAction()
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
    }
  }
  
  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-900 font-semibold text-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">CMS</span>
              </div>
              <span>Master Panel</span>
            </Link>
            
            <div className="flex items-center gap-1">
              {visibleItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">
                    {auth.role.replace("_", " ")}
                  </div>
                  <div className="text-xs text-slate-500">
                    {auth.role === "SUPER_ADMIN" ? "Full Access" : "Site Limited"}
                  </div>
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 text-slate-500 transition-transform",
                  showUserMenu && "rotate-180"
                )} />
              </button>
              
              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowUserMenu(false)}
                  />
                  
                  {/* Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20">
                    <Link
                      href="/arena"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Home className="w-4 h-4" />
                      Arena
                    </Link>
                    
                    <div className="h-px bg-slate-200 my-1" />
                    
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <LogOut className="w-4 h-4" />
                      {isLoggingOut ? "Çıkış yapılıyor..." : "Çıkış Yap"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

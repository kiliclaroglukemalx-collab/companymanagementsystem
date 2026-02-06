"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { AuthContext } from "@/lib/auth"
import { Trophy, Star, Shield, Home, Settings, LogOut, ChevronDown, BarChart3 } from "lucide-react"
import { logoutAction } from "@/app/(auth)/logout/actions"
import { TR } from "@/lib/tr-constants"

const navItems = [
  {
    href: "/arena",
    label: "Canlı Akış",
    icon: Trophy,
    roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF"],
  },
  {
    href: "/arena/rate",
    label: "Bugün Puan Ver",
    icon: Star,
    roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF"],
  },
  {
    href: "/admin",
    label: "Yönetim Paneli",
    icon: Settings,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    href: "/admin/rating-criteria",
    label: "Kriterler",
    icon: BarChart3,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    href: "/admin/security-events",
    label: "Güvenlik",
    icon: Shield,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
]

interface ArenaNavProps {
  auth: AuthContext
}

export function ArenaNav({ auth }: ArenaNavProps) {
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
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/arena"
              className="flex items-center gap-2 text-white font-semibold text-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span>Arena</span>
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
                        ? "bg-blue-500/20 text-blue-300"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
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
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {auth.role.replace("_", " ")}
                  </div>
                  <div className="text-xs text-slate-400">
                    {auth.role === "SUPER_ADMIN" ? "Full Access" : "Limited"}
                  </div>
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 text-slate-400 transition-transform",
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
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-1 z-20">
                    {(auth.role === "SUPER_ADMIN" || auth.role === "ADMIN") && (
                      <>
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700/50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Yönetim Paneli
                        </Link>
                        <div className="h-px bg-slate-700 my-1" />
                      </>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      <LogOut className="w-4 h-4" />
                      {isLoggingOut ? TR.auth.loggingIn : TR.auth.logout}
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

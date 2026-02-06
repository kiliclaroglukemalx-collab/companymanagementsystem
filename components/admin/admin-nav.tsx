"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AuthContext } from "@/lib/auth"
import { Building2, Users, Layout, BarChart3, Home, Monitor, Shield } from "lucide-react"

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
  
  // Filter items based on role
  const visibleItems = navItems.filter((item) =>
    item.roles.includes(auth.role)
  )
  
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
            <div className="text-right">
              <div className="text-sm font-medium text-slate-900">
                {auth.role.replace("_", " ")}
              </div>
              <div className="text-xs text-slate-500">
                {auth.role === "SUPER_ADMIN" ? "Full Access" : "Site Limited"}
              </div>
            </div>
            
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Exit Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

import { getServerAuthContext } from "@/lib/server-auth"
import { basePrisma } from "@/lib/prisma"
import { Building2, Users, Layout, BarChart3 } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const auth = await getServerAuthContext()
  
  if (!auth) {
    return null
  }
  
  // Get stats based on role
  const stats = await getStats(auth)
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Master Panel Dashboard
        </h1>
        <p className="mt-2 text-slate-600">
          Organization & User Management System
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {auth.role === "SUPER_ADMIN" && (
          <StatCard
            title="Total Sites"
            value={stats.sitesCount}
            icon={Building2}
            href="/admin/sites"
            color="blue"
          />
        )}
        
        {auth.role === "SUPER_ADMIN" && (
          <StatCard
            title="Departments"
            value={stats.departmentsCount}
            icon={Layout}
            href="/admin/departments"
            color="purple"
          />
        )}
        
        <StatCard
          title="Total Users"
          value={stats.usersCount}
          icon={Users}
          href="/admin/users"
          color="green"
        />
        
        {auth.role === "SUPER_ADMIN" && (
          <StatCard
            title="Rating Criteria"
            value={stats.criteriaCount}
            icon={BarChart3}
            href="/admin/criteria"
            color="orange"
          />
        )}
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {auth.role === "SUPER_ADMIN" && (
            <>
              <QuickActionCard
                title="Create Site"
                description="Add a new site to the system"
                href="/admin/sites"
              />
              <QuickActionCard
                title="Create Department"
                description="Add a new department to a site"
                href="/admin/departments"
              />
            </>
          )}
          
          <QuickActionCard
            title="Add User"
            description="Create a new user account"
            href="/admin/users"
          />
          
          {auth.role === "SUPER_ADMIN" && (
            <QuickActionCard
              title="Define Criteria"
              description="Set up rating criteria for departments"
              href="/admin/criteria"
            />
          )}
        </div>
      </div>
      
      {/* Role Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Your Access Level: {auth.role.replace("_", " ")}
        </h3>
        <div className="text-sm text-slate-600 space-y-1">
          {auth.role === "SUPER_ADMIN" ? (
            <>
              <p>✓ Full system access</p>
              <p>✓ Manage all sites and departments</p>
              <p>✓ Create and manage all users</p>
              <p>✓ Configure rating criteria</p>
            </>
          ) : (
            <>
              <p>✓ Access to your site only</p>
              <p>✓ Manage users in your site</p>
              <p>✓ Assign roles (MANAGER, STAFF)</p>
              <p>✗ Cannot create sites or departments</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

async function getStats(auth: any) {
  if (auth.role === "SUPER_ADMIN") {
    const [sitesCount, departmentsCount, usersCount, criteriaCount] =
      await Promise.all([
        basePrisma.site.count(),
        basePrisma.department.count(),
        basePrisma.user.count(),
        basePrisma.ratingCriteria.count(),
      ])
    
    return {
      sitesCount,
      departmentsCount,
      usersCount,
      criteriaCount,
    }
  } else {
    // ADMIN can only see their site's stats
    const [usersCount, departmentsCount] = await Promise.all([
      basePrisma.user.count({
        where: { siteId: auth.siteId },
      }),
      basePrisma.department.count({
        where: { siteId: auth.siteId },
      }),
    ])
    
    return {
      sitesCount: 0,
      departmentsCount,
      usersCount,
      criteriaCount: 0,
    }
  }
}

function StatCard({
  title,
  value,
  icon: Icon,
  href,
  color,
}: {
  title: string
  value: number
  icon: any
  href: string
  color: string
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
  }
  
  return (
    <Link
      href={href}
      className="block bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
            colorClasses[color as keyof typeof colorClasses]
          } flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Link>
  )
}

function QuickActionCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="block bg-slate-50 rounded-lg border border-slate-200 p-4 hover:bg-slate-100 transition-colors"
    >
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </Link>
  )
}

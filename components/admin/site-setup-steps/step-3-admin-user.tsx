"use client"

import { memo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TR } from "@/lib/tr-constants"
import type { SiteSetupAdminInput } from "@/components/admin/site-setup-types"

type Step3AdminUserProps = {
  adminUser: SiteSetupAdminInput
  departmentOptions: string[]
  onChange: (adminUser: SiteSetupAdminInput) => void
  errors: Record<string, string>
}

export const Step3AdminUser = memo(function Step3AdminUser({
  adminUser,
  departmentOptions,
  onChange,
  errors,
}: Step3AdminUserProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{TR.siteSetup.step3Title}</h3>
        <p className="mt-1 text-sm text-slate-600">{TR.siteSetup.step3Description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="admin-name">{TR.siteSetup.adminNameLabel}</Label>
          <Input
            id="admin-name"
            value={adminUser.name}
            onChange={(event) => onChange({ ...adminUser, name: event.target.value })}
            placeholder={TR.siteSetup.adminNamePlaceholder}
          />
          {errors.adminName ? <p className="text-sm text-red-600">{errors.adminName}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-email">{TR.siteSetup.adminEmailLabel}</Label>
          <Input
            id="admin-email"
            type="email"
            value={adminUser.email}
            onChange={(event) => onChange({ ...adminUser, email: event.target.value })}
            placeholder={TR.siteSetup.adminEmailPlaceholder}
          />
          {errors.adminEmail ? <p className="text-sm text-red-600">{errors.adminEmail}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>{TR.siteSetup.adminRoleLabel}</Label>
          <Select
            value={adminUser.role}
            onValueChange={(value) =>
              onChange({
                ...adminUser,
                role: value as SiteSetupAdminInput["role"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">{TR.roles.ADMIN}</SelectItem>
              <SelectItem value="MANAGER">{TR.roles.MANAGER}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{TR.siteSetup.adminDepartmentLabel}</Label>
          <Select
            value={adminUser.departmentName || "__none__"}
            onValueChange={(value) =>
              onChange({
                ...adminUser,
                departmentName: value === "__none__" ? "" : value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={TR.siteSetup.adminDepartmentPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">{TR.common.select}</SelectItem>
              {departmentOptions.map((departmentName) => (
                <SelectItem key={departmentName} value={departmentName}>
                  {departmentName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.adminDepartment ? (
            <p className="text-sm text-red-600">{errors.adminDepartment}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
})

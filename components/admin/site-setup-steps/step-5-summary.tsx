"use client"

import { Badge } from "@/components/ui/badge"
import { TR } from "@/lib/tr-constants"
import type { SiteSetupFormState } from "@/components/admin/site-setup-types"

type Step5SummaryProps = {
  data: SiteSetupFormState
}

export function Step5Summary({ data }: Step5SummaryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{TR.siteSetup.step5Title}</h3>
        <p className="mt-1 text-sm text-slate-600">{TR.siteSetup.step5Description}</p>
      </div>

      <div className="space-y-4 rounded-lg border border-slate-200 p-4">
        <h4 className="font-medium text-slate-900">{TR.siteSetup.step1Title}</h4>
        <p className="text-sm text-slate-700">{data.siteName}</p>
      </div>

      <div className="space-y-4 rounded-lg border border-slate-200 p-4">
        <h4 className="font-medium text-slate-900">{TR.siteSetup.step2Title}</h4>
        <div className="flex flex-wrap gap-2">
          {data.departments.map((department) => (
            <Badge key={department.name} variant="outline">
              {department.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-slate-200 p-4">
        <h4 className="font-medium text-slate-900">{TR.siteSetup.step3Title}</h4>
        <div className="grid gap-2 text-sm text-slate-700">
          <p>
            <span className="font-medium text-slate-900">{TR.siteSetup.adminNameLabel}: </span>
            {data.adminUser.name}
          </p>
          <p>
            <span className="font-medium text-slate-900">{TR.siteSetup.adminEmailLabel}: </span>
            {data.adminUser.email}
          </p>
          <p>
            <span className="font-medium text-slate-900">{TR.siteSetup.adminRoleLabel}: </span>
            {TR.roles[data.adminUser.role]}
          </p>
          <p>
            <span className="font-medium text-slate-900">{TR.siteSetup.adminDepartmentLabel}: </span>
            {data.adminUser.departmentName || TR.siteSetup.autoAssignDepartment}
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-slate-200 p-4">
        <h4 className="font-medium text-slate-900">{TR.siteSetup.step4Title}</h4>
        <div className="grid gap-2 text-sm text-slate-700">
          <p>
            <span className="font-medium text-slate-900">{TR.siteSetup.minEditableHourLabel}: </span>
            {data.chronosSettings.minEditableHour}
          </p>
          <p>
            <span className="font-medium text-slate-900">{TR.siteSetup.maxEditableHourLabel}: </span>
            {data.chronosSettings.maxEditableHour}
          </p>
          <p>
            <span className="font-medium text-slate-900">{TR.siteSetup.editingDurationLabel}: </span>
            {data.chronosSettings.editingDurationMinutes}
          </p>
          <p>
            <span className="font-medium text-slate-900">{TR.siteSetup.sessionTimeoutLabel}: </span>
            {data.chronosSettings.sessionTimeoutMinutes}
          </p>
          <p>
            <span className="font-medium text-slate-900">{TR.siteSetup.requiresApprovalLabel}: </span>
            {data.chronosSettings.requiresApproval ? TR.common.yes : TR.common.no}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-900">{TR.siteSetup.shiftDefinitionsLabel}</p>
          <div className="grid gap-2">
            {data.shiftDefinitions.map((shift) => (
              <div
                key={shift.name}
                className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm"
              >
                <span className="font-medium text-slate-900">{shift.name}</span>
                <span className="text-slate-600">
                  {shift.startHour}:00 - {shift.endHour}:00
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

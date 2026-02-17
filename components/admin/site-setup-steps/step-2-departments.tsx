"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { STANDARD_DEPARTMENTS } from "@/lib/site-setup-helpers"
import { TR } from "@/lib/tr-constants"
import type { SiteSetupDepartmentInput } from "@/lib/site-setup-helpers"
import { Plus, RotateCcw, Trash2 } from "lucide-react"

type Step2DepartmentsProps = {
  departments: SiteSetupDepartmentInput[]
  onChange: (departments: SiteSetupDepartmentInput[]) => void
  error?: string
}

export const Step2Departments = memo(function Step2Departments({
  departments,
  onChange,
  error,
}: Step2DepartmentsProps) {
  const handleDepartmentNameChange = (index: number, value: string) => {
    const next = departments.map((department, departmentIndex) =>
      departmentIndex === index
        ? {
            ...department,
            name: value,
          }
        : department
    )
    onChange(next)
  }

  const handleAddDepartment = () => {
    onChange([
      ...departments,
      {
        name: "",
      },
    ])
  }

  const handleRemoveDepartment = (index: number) => {
    onChange(departments.filter((_, departmentIndex) => departmentIndex !== index))
  }

  const handleResetStandard = () => {
    onChange(
      STANDARD_DEPARTMENTS.map((name) => ({
        name,
      }))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{TR.siteSetup.step2Title}</h3>
          <p className="mt-1 text-sm text-slate-600">{TR.siteSetup.step2Description}</p>
        </div>
        <Button type="button" variant="outline" onClick={handleResetStandard} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          {TR.siteSetup.useStandardDepartments}
        </Button>
      </div>

      <div className="space-y-3">
        <Label>{TR.siteSetup.departmentsLabel}</Label>
        {departments.map((department, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={department.name}
              onChange={(event) => handleDepartmentNameChange(index, event.target.value)}
              placeholder={TR.siteSetup.departmentNamePlaceholder}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveDepartment(index)}
              disabled={departments.length <= 1}
              aria-label={TR.siteSetup.removeDepartment}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={handleAddDepartment} className="gap-2">
        <Plus className="h-4 w-4" />
        {TR.siteSetup.addDepartment}
      </Button>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
})

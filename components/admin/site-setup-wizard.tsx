"use client"

import { useMemo, useState } from "react"
import { setupNewSite } from "@/lib/admin-actions"
import {
  DEFAULT_CHRONOS_SETTINGS,
  DEFAULT_SHIFT_DEFINITIONS,
  getStandardDepartmentsForSetup,
} from "@/lib/site-setup-helpers"
import { Step1SiteInfo } from "@/components/admin/site-setup-steps/step-1-site-info"
import { Step2Departments } from "@/components/admin/site-setup-steps/step-2-departments"
import { Step3AdminUser } from "@/components/admin/site-setup-steps/step-3-admin-user"
import { Step4ChronosSettings } from "@/components/admin/site-setup-steps/step-4-chronos-settings"
import { Step5Summary } from "@/components/admin/site-setup-steps/step-5-summary"
import type {
  SiteSetupFieldErrors,
  SiteSetupFormState,
  SiteSetupResult,
} from "@/components/admin/site-setup-types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Copy } from "lucide-react"
import { toast } from "sonner"
import { TR } from "@/lib/tr-constants"

type SiteSetupWizardProps = {
  isOpen: boolean
  onClose: () => void
  onComplete?: (result: SiteSetupResult) => void
}

const STEP_TITLES = [
  TR.siteSetup.step1Title,
  TR.siteSetup.step2Title,
  TR.siteSetup.step3Title,
  TR.siteSetup.step4Title,
  TR.siteSetup.step5Title,
]

function createDefaultFormState(): SiteSetupFormState {
  return {
    siteName: "",
    departments: getStandardDepartmentsForSetup(),
    adminUser: {
      name: "",
      email: "",
      role: "ADMIN",
      departmentName: "",
    },
    chronosSettings: { ...DEFAULT_CHRONOS_SETTINGS },
    shiftDefinitions: DEFAULT_SHIFT_DEFINITIONS.map((item) => ({ ...item })),
  }
}

function normalizeLabel(value: string) {
  return value.trim().replace(/\s+/g, " ")
}

function labelKey(value: string) {
  return normalizeLabel(value).toLocaleLowerCase("tr-TR")
}

function hasShiftOverlap(state: SiteSetupFormState) {
  const coveredHours = new Array<string | null>(24).fill(null)

  for (const shift of state.shiftDefinitions) {
    if (shift.startHour === shift.endHour) {
      return true
    }

    let hour = shift.startHour
    let loopGuard = 0
    while (hour !== shift.endHour && loopGuard < 24) {
      if (coveredHours[hour]) {
        return true
      }
      coveredHours[hour] = shift.name
      hour = (hour + 1) % 24
      loopGuard += 1
    }
  }

  return false
}

function validateStep(step: number, state: SiteSetupFormState): SiteSetupFieldErrors {
  const errors: SiteSetupFieldErrors = {}

  if (step === 0) {
    if (normalizeLabel(state.siteName).length < 3) {
      errors.siteName = TR.siteSetup.validationSiteName
    }
    return errors
  }

  if (step === 1) {
    const names = state.departments.map((department) => normalizeLabel(department.name)).filter(Boolean)
    if (names.length === 0) {
      errors.departments = TR.siteSetup.validationDepartmentsRequired
      return errors
    }

    if (names.length !== state.departments.length) {
      errors.departments = TR.siteSetup.validationDepartmentNameRequired
      return errors
    }

    const uniqueNames = new Set(names.map((name) => labelKey(name)))
    if (uniqueNames.size !== names.length) {
      errors.departments = TR.siteSetup.validationDepartmentUnique
    }
    return errors
  }

  if (step === 2) {
    if (normalizeLabel(state.adminUser.name).length < 2) {
      errors.adminName = TR.siteSetup.validationAdminName
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(state.adminUser.email.trim())) {
      errors.adminEmail = TR.siteSetup.validationAdminEmail
    }

    if (state.adminUser.departmentName) {
      const departmentExists = state.departments.some(
        (department) => labelKey(department.name) === labelKey(state.adminUser.departmentName)
      )
      if (!departmentExists) {
        errors.adminDepartment = TR.siteSetup.validationAdminDepartment
      }
    }
    return errors
  }

  if (step === 3) {
    if (state.chronosSettings.minEditableHour < 0 || state.chronosSettings.minEditableHour > 23) {
      errors.chronos = TR.siteSetup.validationChronosHours
      return errors
    }
    if (state.chronosSettings.maxEditableHour < 0 || state.chronosSettings.maxEditableHour > 23) {
      errors.chronos = TR.siteSetup.validationChronosHours
      return errors
    }
    if (state.chronosSettings.minEditableHour >= state.chronosSettings.maxEditableHour) {
      errors.chronos = TR.siteSetup.validationChronosRange
      return errors
    }
    if (
      state.chronosSettings.editingDurationMinutes < 10 ||
      state.chronosSettings.editingDurationMinutes > 240
    ) {
      errors.chronos = TR.siteSetup.validationEditingDuration
      return errors
    }
    if (
      state.chronosSettings.sessionTimeoutMinutes < 15 ||
      state.chronosSettings.sessionTimeoutMinutes > 720
    ) {
      errors.chronos = TR.siteSetup.validationSessionTimeout
      return errors
    }

    if (state.shiftDefinitions.length === 0) {
      errors.shiftDefinitions = TR.siteSetup.validationShiftRequired
      return errors
    }

    const shiftNames = state.shiftDefinitions.map((shift) => normalizeLabel(shift.name))
    if (shiftNames.some((name) => name.length === 0)) {
      errors.shiftDefinitions = TR.siteSetup.validationShiftNameRequired
      return errors
    }
    if (new Set(shiftNames.map((name) => labelKey(name))).size !== shiftNames.length) {
      errors.shiftDefinitions = TR.siteSetup.validationShiftUnique
      return errors
    }
    if (
      state.shiftDefinitions.some(
        (shift) =>
          shift.startHour < 0 ||
          shift.startHour > 23 ||
          shift.endHour < 0 ||
          shift.endHour > 23
      )
    ) {
      errors.shiftDefinitions = TR.siteSetup.validationShiftHours
      return errors
    }
    if (hasShiftOverlap(state)) {
      errors.shiftDefinitions = TR.siteSetup.validationShiftOverlap
    }
    return errors
  }

  return errors
}

export function SiteSetupWizard({ isOpen, onClose, onComplete }: SiteSetupWizardProps) {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<SiteSetupFieldErrors>({})
  const [formState, setFormState] = useState<SiteSetupFormState>(createDefaultFormState)
  const [result, setResult] = useState<SiteSetupResult | null>(null)

  const progressValue = useMemo(() => ((step + 1) / STEP_TITLES.length) * 100, [step])

  const resetWizard = () => {
    setStep(0)
    setErrors({})
    setResult(null)
    setIsSubmitting(false)
    setFormState(createDefaultFormState())
  }

  const handleClose = () => {
    if (isSubmitting) return
    resetWizard()
    onClose()
  }

  const handleNext = () => {
    const validationErrors = validateStep(step, formState)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return
    setStep((current) => Math.min(current + 1, STEP_TITLES.length - 1))
  }

  const handleBack = () => {
    setErrors({})
    setStep((current) => Math.max(current - 1, 0))
  }

  const handleSubmit = async () => {
    const aggregateErrors = {
      ...validateStep(0, formState),
      ...validateStep(1, formState),
      ...validateStep(2, formState),
      ...validateStep(3, formState),
    }
    setErrors(aggregateErrors)
    if (Object.keys(aggregateErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    const response = await setupNewSite({
      siteName: formState.siteName,
      departments: formState.departments.map((department) => ({
        name: normalizeLabel(department.name),
      })),
      adminUser: {
        name: normalizeLabel(formState.adminUser.name),
        email: formState.adminUser.email.trim(),
        departmentName: formState.adminUser.departmentName || undefined,
        role: formState.adminUser.role,
      },
      chronosSettings: formState.chronosSettings,
      shiftDefinitions: formState.shiftDefinitions.map((shift) => ({
        name: normalizeLabel(shift.name),
        startHour: shift.startHour,
        endHour: shift.endHour,
        color: shift.color,
      })),
    })
    setIsSubmitting(false)

    if (!response.success) {
      toast.error(response.error)
      return
    }

    setResult(response.data)
    onComplete?.(response.data)
    toast.success(TR.siteSetup.setupSuccess)
  }

  const handleCopyPassword = async () => {
    if (!result?.tempPassword) return
    try {
      await navigator.clipboard.writeText(result.tempPassword)
      toast.success(TR.users.tempPasswordCopied)
    } catch {
      toast.error(TR.errors.somethingWentWrong)
    }
  }

  const departmentOptions = formState.departments
    .map((department) => normalizeLabel(department.name))
    .filter(Boolean)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? handleClose() : null)}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-4xl">
        {result ? (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
                {TR.siteSetup.setupCompletedTitle}
              </DialogTitle>
              <DialogDescription>{TR.siteSetup.setupCompletedDescription}</DialogDescription>
            </DialogHeader>

            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-600">{TR.siteSetup.temporaryPasswordLabel}</p>
              <div className="mt-2 flex items-center gap-2">
                <code className="flex-1 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
                  {result.tempPassword}
                </code>
                <Button type="button" variant="outline" onClick={handleCopyPassword}>
                  <Copy className="mr-2 h-4 w-4" />
                  {TR.users.copyPassword}
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
              <p>
                <span className="font-medium text-slate-900">{TR.siteSetup.createdSiteLabel}: </span>
                {result.site.name}
              </p>
              <p>
                <span className="font-medium text-slate-900">{TR.siteSetup.createdDepartmentsLabel}: </span>
                {result.departments.length}
              </p>
              <p>
                <span className="font-medium text-slate-900">{TR.siteSetup.createdAdminLabel}: </span>
                {result.adminUser.name}
              </p>
            </div>

            <DialogFooter>
              <Button type="button" onClick={handleClose}>
                {TR.common.close}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{TR.siteSetup.title}</DialogTitle>
              <DialogDescription>{TR.siteSetup.subtitle}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  {TR.siteSetup.stepLabel} {step + 1} / {STEP_TITLES.length}
                </Badge>
                <span className="text-sm font-medium text-slate-700">{STEP_TITLES[step]}</span>
              </div>
              <Progress value={progressValue} />
            </div>

            <div className="pt-2">
              {step === 0 ? (
                <Step1SiteInfo
                  siteName={formState.siteName}
                  onChange={(siteName) => setFormState((current) => ({ ...current, siteName }))}
                  error={errors.siteName}
                />
              ) : null}

              {step === 1 ? (
                <Step2Departments
                  departments={formState.departments}
                  onChange={(departments) => setFormState((current) => ({ ...current, departments }))}
                  error={errors.departments}
                />
              ) : null}

              {step === 2 ? (
                <Step3AdminUser
                  adminUser={formState.adminUser}
                  departmentOptions={departmentOptions}
                  onChange={(adminUser) => setFormState((current) => ({ ...current, adminUser }))}
                  errors={errors}
                />
              ) : null}

              {step === 3 ? (
                <Step4ChronosSettings
                  chronosSettings={formState.chronosSettings}
                  shiftDefinitions={formState.shiftDefinitions}
                  onChronosSettingsChange={(chronosSettings) =>
                    setFormState((current) => ({ ...current, chronosSettings }))
                  }
                  onShiftDefinitionsChange={(shiftDefinitions) =>
                    setFormState((current) => ({ ...current, shiftDefinitions }))
                  }
                  errors={errors}
                />
              ) : null}

              {step === 4 ? <Step5Summary data={formState} /> : null}
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                {TR.common.cancel}
              </Button>
              {step > 0 ? (
                <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting}>
                  {TR.common.previous}
                </Button>
              ) : null}
              {step < STEP_TITLES.length - 1 ? (
                <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                  {TR.common.next}
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? TR.common.loading : TR.siteSetup.completeSetup}
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { TR } from "@/lib/tr-constants"
import type {
  SiteSetupChronosSettingsInput,
  SiteSetupShiftDefinitionInput,
} from "@/lib/site-setup-helpers"
import { Plus, Trash2 } from "lucide-react"

type Step4ChronosSettingsProps = {
  chronosSettings: SiteSetupChronosSettingsInput
  shiftDefinitions: SiteSetupShiftDefinitionInput[]
  onChronosSettingsChange: (settings: SiteSetupChronosSettingsInput) => void
  onShiftDefinitionsChange: (shifts: SiteSetupShiftDefinitionInput[]) => void
  errors: Record<string, string>
}

export const Step4ChronosSettings = memo(function Step4ChronosSettings({
  chronosSettings,
  shiftDefinitions,
  onChronosSettingsChange,
  onShiftDefinitionsChange,
  errors,
}: Step4ChronosSettingsProps) {
  const handleShiftChange = (
    index: number,
    field: keyof SiteSetupShiftDefinitionInput,
    value: string | number
  ) => {
    const next = shiftDefinitions.map((shift, shiftIndex) =>
      shiftIndex === index
        ? {
            ...shift,
            [field]: value,
          }
        : shift
    )
    onShiftDefinitionsChange(next)
  }

  const handleAddShift = () => {
    onShiftDefinitionsChange([
      ...shiftDefinitions,
      { name: "", startHour: 9, endHour: 18, color: "#64748b" },
    ])
  }

  const handleRemoveShift = (index: number) => {
    onShiftDefinitionsChange(shiftDefinitions.filter((_, shiftIndex) => shiftIndex !== index))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{TR.siteSetup.step4Title}</h3>
        <p className="mt-1 text-sm text-slate-600">{TR.siteSetup.step4Description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="min-hour">{TR.siteSetup.minEditableHourLabel}</Label>
          <Input
            id="min-hour"
            type="number"
            min={0}
            max={23}
            value={chronosSettings.minEditableHour}
            onChange={(event) =>
              onChronosSettingsChange({
                ...chronosSettings,
                minEditableHour: Number(event.target.value),
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-hour">{TR.siteSetup.maxEditableHourLabel}</Label>
          <Input
            id="max-hour"
            type="number"
            min={0}
            max={23}
            value={chronosSettings.maxEditableHour}
            onChange={(event) =>
              onChronosSettingsChange({
                ...chronosSettings,
                maxEditableHour: Number(event.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="editing-duration">{TR.siteSetup.editingDurationLabel}</Label>
          <Input
            id="editing-duration"
            type="number"
            min={10}
            max={240}
            value={chronosSettings.editingDurationMinutes}
            onChange={(event) =>
              onChronosSettingsChange({
                ...chronosSettings,
                editingDurationMinutes: Number(event.target.value),
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="session-timeout">{TR.siteSetup.sessionTimeoutLabel}</Label>
          <Input
            id="session-timeout"
            type="number"
            min={15}
            max={720}
            value={chronosSettings.sessionTimeoutMinutes}
            onChange={(event) =>
              onChronosSettingsChange({
                ...chronosSettings,
                sessionTimeoutMinutes: Number(event.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
        <div>
          <p className="font-medium text-slate-900">{TR.siteSetup.requiresApprovalLabel}</p>
          <p className="text-sm text-slate-600">{TR.siteSetup.requiresApprovalDescription}</p>
        </div>
        <Switch
          checked={chronosSettings.requiresApproval}
          onCheckedChange={(checked) =>
            onChronosSettingsChange({
              ...chronosSettings,
              requiresApproval: checked,
            })
          }
        />
      </div>

      {errors.chronos ? <p className="text-sm text-red-600">{errors.chronos}</p> : null}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-slate-900">{TR.siteSetup.shiftDefinitionsLabel}</h4>
          <Button type="button" variant="outline" onClick={handleAddShift} className="gap-2">
            <Plus className="h-4 w-4" />
            {TR.siteSetup.addShiftDefinition}
          </Button>
        </div>

        <div className="space-y-3">
          {shiftDefinitions.map((shift, index) => (
            <div key={`${index}-${shift.name}`} className="grid gap-2 rounded-lg border border-slate-200 p-3 md:grid-cols-12">
              <div className="space-y-1 md:col-span-4">
                <Label>{TR.siteSetup.shiftNameLabel}</Label>
                <Input
                  value={shift.name}
                  onChange={(event) => handleShiftChange(index, "name", event.target.value)}
                  placeholder={TR.siteSetup.shiftNamePlaceholder}
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <Label>{TR.siteSetup.shiftStartLabel}</Label>
                <Input
                  type="number"
                  min={0}
                  max={23}
                  value={shift.startHour}
                  onChange={(event) =>
                    handleShiftChange(index, "startHour", Number(event.target.value))
                  }
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <Label>{TR.siteSetup.shiftEndLabel}</Label>
                <Input
                  type="number"
                  min={0}
                  max={23}
                  value={shift.endHour}
                  onChange={(event) =>
                    handleShiftChange(index, "endHour", Number(event.target.value))
                  }
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <Label>{TR.siteSetup.shiftColorLabel}</Label>
                <Input
                  type="color"
                  value={shift.color}
                  onChange={(event) => handleShiftChange(index, "color", event.target.value)}
                  className="h-10"
                />
              </div>

              <div className="flex items-end md:col-span-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveShift(index)}
                  disabled={shiftDefinitions.length <= 1}
                  aria-label={TR.siteSetup.removeShiftDefinition}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {errors.shiftDefinitions ? (
          <p className="text-sm text-red-600">{errors.shiftDefinitions}</p>
        ) : null}
      </div>
    </div>
  )
})

"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TR } from "@/lib/tr-constants"

type Step1SiteInfoProps = {
  siteName: string
  onChange: (siteName: string) => void
  error?: string
}

export function Step1SiteInfo({ siteName, onChange, error }: Step1SiteInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{TR.siteSetup.step1Title}</h3>
        <p className="mt-1 text-sm text-slate-600">{TR.siteSetup.step1Description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="site-name">{TR.siteSetup.siteNameLabel}</Label>
        <Input
          id="site-name"
          value={siteName}
          onChange={(event) => onChange(event.target.value)}
          placeholder={TR.siteSetup.siteNamePlaceholder}
          autoFocus
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </div>
  )
}

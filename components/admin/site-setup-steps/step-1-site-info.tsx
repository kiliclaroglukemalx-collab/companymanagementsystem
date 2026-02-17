"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TR } from "@/lib/tr-constants"

type Step1SiteInfoProps = {
  siteName: string
  onChange: (siteName: string) => void
  error?: string
}

const COMMIT_DELAY_MS = 120

export const Step1SiteInfo = memo(function Step1SiteInfo({
  siteName,
  onChange,
  error,
}: Step1SiteInfoProps) {
  const [localSiteName, setLocalSiteName] = useState(siteName)
  const commitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastCommittedRef = useRef(siteName)

  useEffect(() => {
    setLocalSiteName(siteName)
    lastCommittedRef.current = siteName
  }, [siteName])

  useEffect(() => {
    return () => {
      if (commitTimeoutRef.current) {
        clearTimeout(commitTimeoutRef.current)
      }
    }
  }, [])

  const commitIfChanged = useCallback(
    (value: string) => {
      if (value === lastCommittedRef.current) return
      lastCommittedRef.current = value
      onChange(value)
    },
    [onChange]
  )

  const scheduleCommit = useCallback(
    (value: string) => {
      if (commitTimeoutRef.current) {
        clearTimeout(commitTimeoutRef.current)
      }
      commitTimeoutRef.current = setTimeout(() => {
        commitIfChanged(value)
        commitTimeoutRef.current = null
      }, COMMIT_DELAY_MS)
    },
    [commitIfChanged]
  )

  const handleInputChange = useCallback(
    (value: string) => {
      setLocalSiteName(value)
      scheduleCommit(value)
    },
    [scheduleCommit]
  )

  const handleBlur = useCallback(() => {
    if (commitTimeoutRef.current) {
      clearTimeout(commitTimeoutRef.current)
      commitTimeoutRef.current = null
    }
    commitIfChanged(localSiteName)
  }, [commitIfChanged, localSiteName])

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
          value={localSiteName}
          onChange={(event) => handleInputChange(event.target.value)}
          onBlur={handleBlur}
          placeholder={TR.siteSetup.siteNamePlaceholder}
          autoFocus
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </div>
  )
})

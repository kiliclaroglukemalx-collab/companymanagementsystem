"use client"

import { useEffect } from "react"
import { useChronos } from "@/lib/chronos-context"

/**
 * Hook to periodically check and sync editing permission status
 * with the server. This ensures that if a permission is approved
 * in the Master Panel, it's reflected in the UI without requiring
 * a page refresh.
 */
export function useEditingPermissionSync(intervalMs: number = 10000) {
  const { grantEditingPermission, revokeEditingPermission, editingPermission } = useChronos()

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const res = await fetch("/api/chronos/editing-permission")
        const data = await res.json()

        if (data.hasPermission && !editingPermission.hasPermission) {
          // Permission granted - update context
          grantEditingPermission(
            data.allowedStartHour,
            data.allowedEndHour,
            Math.ceil((new Date(data.expiresAt).getTime() - Date.now()) / 60000)
          )
        } else if (!data.hasPermission && editingPermission.hasPermission) {
          // Permission expired or revoked
          revokeEditingPermission()
        }
      } catch (error) {
        console.error("Error checking editing permission:", error)
      }
    }

    // Check immediately on mount
    checkPermission()

    // Then check periodically
    const interval = setInterval(checkPermission, intervalMs)

    return () => clearInterval(interval)
  }, [intervalMs, editingPermission.hasPermission, grantEditingPermission, revokeEditingPermission])
}

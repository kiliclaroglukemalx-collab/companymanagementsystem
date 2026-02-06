import type { UserRole } from "@/lib/auth"

export const MODULE_KEYS = [
  "risk",
  "bonus",
  "finans",
  "mesai",
  "call-center",
  "canli-destek",
  "marketing",
  "personel",
  "arena",
  "egitim",
  "ayarlar",
] as const

export type ModuleKey = (typeof MODULE_KEYS)[number]

export const ROLE_MODULE_ACCESS: Record<UserRole, ModuleKey[]> = {
  SUPER_ADMIN: [...MODULE_KEYS],
  ADMIN: [...MODULE_KEYS],
  MANAGER: [
    "risk",
    "bonus",
    "finans",
    "mesai",
    "call-center",
    "canli-destek",
    "marketing",
    "personel",
    "arena",
    "egitim",
  ],
  STAFF: ["bonus", "finans", "mesai", "personel", "egitim"],
}

export function canAccessModule(role: UserRole, module: ModuleKey) {
  return ROLE_MODULE_ACCESS[role]?.includes(module) ?? false
}

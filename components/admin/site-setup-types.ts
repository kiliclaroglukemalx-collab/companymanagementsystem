import type {
  SiteSetupChronosSettingsInput,
  SiteSetupDepartmentInput,
  SiteSetupShiftDefinitionInput,
} from "@/lib/site-setup-helpers"

export type SiteSetupAdminRole = "ADMIN" | "MANAGER"

export type SiteSetupAdminInput = {
  name: string
  email: string
  departmentName: string
  role: SiteSetupAdminRole
}

export type SiteSetupFormState = {
  siteName: string
  departments: SiteSetupDepartmentInput[]
  adminUser: SiteSetupAdminInput
  chronosSettings: SiteSetupChronosSettingsInput
  shiftDefinitions: SiteSetupShiftDefinitionInput[]
}

export type SiteSetupFieldErrors = Record<string, string>

export type SiteSetupResult = {
  site: any
  departments: any[]
  adminUser: any
  tempPassword: string
}

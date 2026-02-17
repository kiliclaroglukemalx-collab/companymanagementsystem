export type SiteSetupRatingCriteriaInput = {
  name: string
  weight: number
}

export type SiteSetupDepartmentInput = {
  name: string
  ratingCriteria?: SiteSetupRatingCriteriaInput[]
}

export type SiteSetupChronosSettingsInput = {
  minEditableHour: number
  maxEditableHour: number
  requiresApproval: boolean
  editingDurationMinutes: number
  sessionTimeoutMinutes: number
}

export type SiteSetupShiftDefinitionInput = {
  name: string
  startHour: number
  endHour: number
  color: string
}

export const STANDARD_DEPARTMENTS = [
  "Finans",
  "Risk",
  "Bonus",
  "Canli Destek",
  "Call Center",
  "Marketing",
] as const

export const DEFAULT_CHRONOS_SETTINGS: SiteSetupChronosSettingsInput = {
  minEditableHour: 6,
  maxEditableHour: 23,
  requiresApproval: true,
  editingDurationMinutes: 30,
  sessionTimeoutMinutes: 60,
}

export const DEFAULT_SHIFT_DEFINITIONS: SiteSetupShiftDefinitionInput[] = [
  { name: "Sabah", startHour: 8, endHour: 16, color: "#10b981" },
  { name: "Ogle", startHour: 16, endHour: 0, color: "#3b82f6" },
  { name: "Gece", startHour: 0, endHour: 8, color: "#8b5cf6" },
]

export const DEFAULT_RATING_CRITERIA_BY_DEPARTMENT: Record<
  string,
  SiteSetupRatingCriteriaInput[]
> = {
  finans: [
    { name: "Islem Hizi", weight: 30 },
    { name: "Dogruluk", weight: 40 },
    { name: "Musteri Memnuniyeti", weight: 30 },
  ],
  risk: [
    { name: "Risk Analizi", weight: 40 },
    { name: "Raporlama Kalitesi", weight: 30 },
    { name: "Hata Orani", weight: 30 },
  ],
  bonus: [
    { name: "Kampanya Yonetimi", weight: 35 },
    { name: "Operasyon Hizi", weight: 35 },
    { name: "Musteri Geri Bildirimi", weight: 30 },
  ],
  "canli destek": [
    { name: "Cozum Suresi", weight: 30 },
    { name: "Ilk Temasta Cozum", weight: 35 },
    { name: "Musteri Memnuniyeti", weight: 35 },
  ],
  "call center": [
    { name: "Cagri Kalitesi", weight: 35 },
    { name: "Ortalama Cagri Suresi", weight: 30 },
    { name: "Musteri Memnuniyeti", weight: 35 },
  ],
  marketing: [
    { name: "Kampanya Performansi", weight: 40 },
    { name: "Icerik Kalitesi", weight: 30 },
    { name: "Donusum Orani", weight: 30 },
  ],
}

export const DEFAULT_GENERIC_RATING_CRITERIA: SiteSetupRatingCriteriaInput[] = [
  { name: "Performans", weight: 35 },
  { name: "Kalite", weight: 35 },
  { name: "Takim Calismasi", weight: 30 },
]

export function getDefaultCriteriaForDepartment(
  departmentName: string
): SiteSetupRatingCriteriaInput[] {
  const key = departmentName.trim().toLocaleLowerCase("tr-TR")
  const found = DEFAULT_RATING_CRITERIA_BY_DEPARTMENT[key]
  const source = found && found.length > 0 ? found : DEFAULT_GENERIC_RATING_CRITERIA
  return source.map((item) => ({ ...item }))
}

export function getStandardDepartmentsForSetup(): SiteSetupDepartmentInput[] {
  return STANDARD_DEPARTMENTS.map((name) => ({
    name,
    ratingCriteria: getDefaultCriteriaForDepartment(name),
  }))
}

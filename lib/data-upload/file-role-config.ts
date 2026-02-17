export const CUSTOM_ROLE_VALUE = "__CUSTOM__"

export const FILE_ROLE_CONFIG: Record<string, string[]> = {
  FINANS: ["kasa_excel", "payment_methods", "financial_flow"],
  SPOR: ["bet_report", "market_type_report", "players_report"],
  BON: ["bonus_report", "btag_report", "campaign_report"],
  CASINO: ["provider_report", "game_report", "summary_report"],
  GENEL: ["global_kpi", "funnel", "highlights_report"],
  PLAYERS: ["segments_report", "top_players_report", "withdraw_report"],
}

export function getRoleOptions(module: string): string[] {
  return FILE_ROLE_CONFIG[module] ?? []
}

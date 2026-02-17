import type { CanonicalAiModule } from "@/lib/ai-analysis/types"

export const MODULE_PROMPTS: Record<CanonicalAiModule, string> = {
  FINANCIAL: `
MODULE: FINANCIAL ANALYSIS

Period:
{{period_start}} - {{period_end}}

KPI:
{{kpis_json}}

Top Tables:
{{tables_json}}

Anomalies:
{{anomalies_json}}

Top 3 Anomalies:
{{top_3_anomalies_json}}

Top 3 Changes vs Previous Period:
{{top_3_changes_vs_previous_period_json}}

Global Context:
{{global_context_json}}

Uploaded Files Context:
{{uploaded_files_context_json}}

Coverage Note:
{{coverage_note}}

Focus points:
- Deposit vs withdraw balance
- Payment method performance differences
- Rejected transactions and reasons
- Operational delay signals (if present)

Input envelope:
{
  "module_data": {{module_data_json}},
  "global_context": {{global_context_json}},
  "uploaded_files_context": {{uploaded_files_context_json}}
}
`.trim(),

  BONUS_BTAG: `
MODULE: BONUS / BTAG ANALYSIS

Period:
{{period_start}} - {{period_end}}

KPI:
{{kpis_json}}

Top Tables:
{{tables_json}}

Anomalies:
{{anomalies_json}}

Top 3 Anomalies:
{{top_3_anomalies_json}}

Top 3 Changes vs Previous Period:
{{top_3_changes_vs_previous_period_json}}

Global Context:
{{global_context_json}}

Uploaded Files Context:
{{uploaded_files_context_json}}

Coverage Note:
{{coverage_note}}

Focus points:
- Bonus acceptance rate
- Bonus cost impact on NGR
- BTag profitability differences
- Bonus abuse or risky market signals

Input envelope:
{
  "module_data": {{module_data_json}},
  "global_context": {{global_context_json}},
  "uploaded_files_context": {{uploaded_files_context_json}}
}
`.trim(),

  CASINO: `
MODULE: CASINO ANALYSIS

Period:
{{period_start}} - {{period_end}}

KPI:
{{kpis_json}}

Provider Stats:
{{provider_tables_json}}

Anomalies:
{{anomalies_json}}

Top 3 Anomalies:
{{top_3_anomalies_json}}

Top 3 Changes vs Previous Period:
{{top_3_changes_vs_previous_period_json}}

Global Context:
{{global_context_json}}

Uploaded Files Context:
{{uploaded_files_context_json}}

Coverage Note:
{{coverage_note}}

Focus points:
- Casino GGR/NGR relation
- Bet volume and bet count relation
- Average stake behavior
- Provider performance differences
- RTP-like risk signals

Input envelope:
{
  "module_data": {{module_data_json}},
  "global_context": {{global_context_json}},
  "uploaded_files_context": {{uploaded_files_context_json}}
}
`.trim(),

  SPORTS: `
MODULE: SPORTS ANALYSIS (EVENT + MARKET TYPE)

Context (Uploaded Files):
- bet_report_file: {{bet_report_file_name}} (type={{bet_report_type}}, rows={{bet_report_row_count}}, period={{bet_report_period}})
- market_type_report_file: {{market_type_report_file_name}} (type={{market_type_report_type}}, rows={{market_type_report_row_count}}, period={{market_type_report_period}})
- players_report_file (optional): {{players_report_file_name}} (rows={{players_report_row_count}}, period={{players_report_period}})

Analysis Period (requested):
{{period_start}} - {{period_end}}

Deterministic KPIs:
{{kpis_json}}

Bet Report Summary:
{{bet_report_summary_json}}

Market Type Report Stats:
{{market_type_stats_json}}

Optional Cross-checks:
{{cross_checks_json}}

Anomalies / Alerts:
{{anomalies_json}}

Top 3 Anomalies:
{{top_3_anomalies_json}}

Top 3 Changes vs Previous Period:
{{top_3_changes_vs_previous_period_json}}

Global Context:
{{global_context_json}}

Uploaded Files Context:
{{uploaded_files_context_json}}

Coverage Note:
{{coverage_note}}

Interpretation order:
1) Draw sportsbook big picture: volume, profitability (GGR), win/loss balance.
2) Interpret odds behavior (avg odds, high-odds ratio, multi ratio if present).
3) Market type view: highest volume, most profitable, most loss-driving; tie to risk.
4) If cashout/void/refund status metrics exist, add operational risk note.
5) If requested period does not fully overlap file periods, mark coverage as limited.

Input envelope:
{
  "module_data": {{module_data_json}},
  "global_context": {{global_context_json}},
  "uploaded_files_context": {{uploaded_files_context_json}}
}
`.trim(),

  PLAYERS: `
MODULE: PLAYERS ANALYSIS

Period:
{{period_start}} - {{period_end}}

KPI:
{{kpis_json}}

Segments:
{{segments_table}}

Top Players:
{{top_players_table}}

Anomalies:
{{anomalies_json}}

Top 3 Anomalies:
{{top_3_anomalies_json}}

Top 3 Changes vs Previous Period:
{{top_3_changes_vs_previous_period_json}}

Global Context:
{{global_context_json}}

Uploaded Files Context:
{{uploaded_files_context_json}}

Coverage Note:
{{coverage_note}}

Focus points:
- High roller impact
- Bonus hunter signals
- Withdraw behavior
- Segment distribution shifts

Input envelope:
{
  "module_data": {{module_data_json}},
  "global_context": {{global_context_json}},
  "uploaded_files_context": {{uploaded_files_context_json}}
}
`.trim(),

  GENERAL_SIMULATION: `
MODULE: GENERAL SIMULATION ANALYSIS

This report summarizes full-system performance.

Period:
{{period_start}} - {{period_end}}

Global KPIs:
{{kpis_json}}

Funnels:
{{funnel_json}}

Cross Module Highlights:
{{highlights_json}}

Anomalies:
{{anomalies_json}}

Top 3 Anomalies:
{{top_3_anomalies_json}}

Top 3 Changes vs Previous Period:
{{top_3_changes_vs_previous_period_json}}

Global Context:
{{global_context_json}}

Uploaded Files Context:
{{uploaded_files_context_json}}

Coverage Note:
{{coverage_note}}

Focus points:
- Overall cashflow
- GGR to NGR conversion quality
- Bonus impact
- Player lifecycle signals
- Operational risks

Input envelope:
{
  "module_data": {{module_data_json}},
  "global_context": {{global_context_json}},
  "uploaded_files_context": {{uploaded_files_context_json}}
}
`.trim(),
}

export function getModulePrompt(module: CanonicalAiModule): string {
  return MODULE_PROMPTS[module]
}

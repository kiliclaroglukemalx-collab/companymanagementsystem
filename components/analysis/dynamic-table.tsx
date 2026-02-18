"use client"

import { motion } from "framer-motion"
import type { SectionTable } from "@/lib/ai-analysis/types"

interface DynamicTableProps {
  table: SectionTable
}

export function DynamicTable({ table }: DynamicTableProps) {
  if (!table.rows || table.rows.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="rounded-[2rem] bg-card p-5 md:p-6"
    >
      <h4 className="mb-5 text-sm font-semibold tracking-tight text-foreground">
        {table.title}
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border/40 text-[11px] uppercase tracking-wider text-muted-foreground">
              {table.columns.map((col) => (
                <th
                  key={col.key}
                  className={`pb-2.5 pr-4 font-medium ${col.align === "right" ? "text-right" : ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="border-b border-border/15 last:border-none"
              >
                {table.columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-3 pr-4 text-sm ${
                      col.align === "right" ? "text-right" : ""
                    } ${col.key === table.columns[0]?.key ? "font-medium text-foreground" : "text-muted-foreground"}`}
                  >
                    {String(row[col.key] ?? "")}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

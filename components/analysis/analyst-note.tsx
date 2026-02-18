"use client"

import { motion } from "framer-motion"
import { PenLine } from "lucide-react"
import type { AiNote } from "@/lib/ai-analysis/types"

interface AnalystNoteProps {
  note?: AiNote | null
  author?: string
  loading?: boolean
}

export function AnalystNote({ note, author = "Kidemli Analist", loading }: AnalystNoteProps) {
  if (loading) {
    return (
      <div className="relative mt-4 overflow-hidden rounded-[1.5rem] bg-card/60 p-5 backdrop-blur-md animate-pulse">
        <div className="flex items-start gap-3">
          <div className="h-7 w-7 rounded-lg bg-secondary" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded bg-secondary" />
            <div className="h-3 w-full rounded bg-secondary" />
            <div className="h-3 w-3/4 rounded bg-secondary" />
          </div>
        </div>
      </div>
    )
  }

  if (!note) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mt-4 overflow-hidden rounded-[1.5rem] bg-card/60 p-5 backdrop-blur-md"
    >
      <div
        className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 opacity-15 blur-[50px]"
        style={{
          background: "radial-gradient(circle, #ff9f0a 0%, #ff6b35 50%, #0071e3 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 opacity-10 blur-[40px]"
        style={{
          background: "radial-gradient(circle, #34c759 0%, #30d5c8 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex items-start gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <PenLine className="h-3.5 w-3.5 text-[#ff9f0a]" />
        </div>
        <div className="flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#ff9f0a]">
              Analiz Yorumu
            </p>
            <span className="text-[9px] text-muted-foreground/60">{author}</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/85 italic">
            {`"${note.short}"`}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

const ADMIN_PASSWORD = "1530Bb_4560"
const AUTH_COOKIE = "cms-auth"

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputId = useMemo(() => "login-password", [])

  useEffect(() => {
    if (!isShaking) {
      return
    }
    const timer = window.setTimeout(() => setIsShaking(false), 520)
    return () => window.clearTimeout(timer)
  }, [isShaking])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting || isSuccess) {
      return
    }

    if (password === ADMIN_PASSWORD) {
      setError("")
      setIsSubmitting(true)
      setIsSuccess(true)
      document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=604800; samesite=lax`
      window.setTimeout(() => router.push("/"), 500)
      return
    }

    setError("Şifre hatalı. Lütfen tekrar deneyin.")
    setIsShaking(true)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/departments/login-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <motion.div
          className="w-full max-w-md -translate-y-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <form
            onSubmit={handleSubmit}
            className={`space-y-4 ${isShaking ? "shake" : ""}`}
          >
            <div className="rounded-2xl border border-white/15 bg-white/10 px-6 py-5 shadow-[0_14px_45px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
              <label htmlFor={inputId} className="sr-only">
                Şifre
              </label>
              <input
                id={inputId}
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  if (error) {
                    setError("")
                  }
                }}
                placeholder="Password"
                className="w-full bg-transparent text-center text-lg font-medium tracking-[0.2em] text-white placeholder:text-white/55 focus:outline-none"
                autoComplete="current-password"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.45em] text-white transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_28px_rgba(129,140,248,0.7)] focus-visible:shadow-[0_0_28px_rgba(129,140,248,0.7)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSubmitting}
            >
              Giriş Yap
            </button>

            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  className="text-center text-sm text-rose-200"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-white"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              Başarılı
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

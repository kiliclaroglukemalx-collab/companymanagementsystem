"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
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
  const [hasPrefetched, setHasPrefetched] = useState(false)

  const inputId = useMemo(() => "login-password", [])

  const handleFocusPrefetch = useCallback(() => {
    if (hasPrefetched) {
      return
    }
    router.prefetch("/dashboard")
    setHasPrefetched(true)
  }, [hasPrefetched, router])

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
        playsInline
      >
        <source src="/login-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 min-h-screen">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <form onSubmit={handleSubmit} className="absolute inset-0">
            <div
              className={`absolute ${isShaking ? "shake" : ""}`}
              style={{
                top: "calc(45.8% + 345px)",
                left: "calc(50% + 160px)",
                width: "460px",
                transform: "translate(-50%, -50%)",
              }}
            >
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
                onFocus={handleFocusPrefetch}
                placeholder="Password"
                className="w-full rounded-lg border border-white bg-black px-5 py-4 text-white outline-none focus:border-transparent focus:ring-2 focus:ring-white"
                autoComplete="current-password"
                disabled={isSubmitting}
              />

              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    className="mt-2 text-center text-sm text-red-500"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="mt-4 w-full rounded-lg border border-white/70 bg-black/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
                disabled={isSubmitting}
                aria-label="Giriş Yap"
              >
                Giriş Yap
              </button>
            </div>
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

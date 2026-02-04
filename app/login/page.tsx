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
        playsInline
      >
        <source src="/login-bg1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 min-h-screen">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <form
            onSubmit={handleSubmit}
            className={`absolute inset-0 ${isShaking ? "shake" : ""}`}
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
              placeholder="Password"
              className="absolute border border-red-500 bg-transparent text-black"
              style={{
                top: "46.5%",
                left: "50%",
                width: "360px",
                height: "64px",
                transform: "translate(-50%, -50%)",
              }}
              autoComplete="current-password"
              disabled={isSubmitting}
            />

            <button
              type="submit"
              className="absolute opacity-0"
              style={{
                top: "58.5%",
                left: "50%",
                width: "240px",
                height: "52px",
                transform: "translate(-50%, -50%)",
              }}
              disabled={isSubmitting}
              aria-label="Giriş Yap"
            />

            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  className="absolute left-1/2 top-[64%] w-[320px] -translate-x-1/2 text-center text-sm text-rose-200"
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

"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

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

  useEffect(() => {
    if (!error) {
      return
    }
    const timer = window.setTimeout(() => setError(""), 3000)
    return () => window.clearTimeout(timer)
  }, [error])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting || isSuccess) {
      return
    }

    setIsSubmitting(true)
    setError("")
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("invalid")
        }
        throw new Error("server")
      }

      setIsSuccess(true)
      window.setTimeout(() => router.push("/"), 500)
      return
    } catch (err) {
      if (err instanceof Error && err.message === "server") {
        setError("Sunucu ayarı eksik. AUTH_SECRET_KEY kontrol edin.")
        return
      }
      setError("Hatalı şifre, lütfen tekrar deneyin")
      setIsShaking(true)
    } finally {
      setIsSubmitting(false)
    }
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
              className={`absolute left-1/2 top-1/2 w-[450px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 ${isShaking ? "shake" : ""}`}
            >
              <label htmlFor={inputId} className="sr-only">
                Şifre
              </label>
              <div className="relative flex h-12 items-center justify-center">
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
                  placeholder="buraya tıklayıp arayüz şifresini giriniz"
                  className="h-12 w-full bg-transparent px-5 py-0 text-center text-black font-bold leading-[3rem] outline-none border-none focus:outline-none placeholder:font-bold placeholder:text-black focus:placeholder:text-transparent focus:placeholder:opacity-0"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    className="mt-2 text-center text-sm font-bold text-black"
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
                className="mt-4 w-full bg-transparent px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-transparent"
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
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

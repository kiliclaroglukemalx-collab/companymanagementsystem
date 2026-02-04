"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
  const [showHint, setShowHint] = useState(false)
  const [shouldShowHint, setShouldShowHint] = useState(false)
  const [hasTyped, setHasTyped] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const inputId = useMemo(() => "login-password", [])
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hintTimerRef = useRef<number | null>(null)
  const fallbackTimerRef = useRef<number | null>(null)
  const hasTypedRef = useRef(false)
  const isFocusedRef = useRef(false)
  const hasVideoDurationRef = useRef(false)

  useEffect(() => {
    hasTypedRef.current = hasTyped
  }, [hasTyped])

  useEffect(() => {
    isFocusedRef.current = isFocused
  }, [isFocused])

  const handleFocusPrefetch = useCallback(() => {
    if (hasPrefetched) {
      return
    }
    router.prefetch("/dashboard")
    setHasPrefetched(true)
  }, [hasPrefetched, router])

  const showHintNow = useCallback(() => {
    setShouldShowHint(true)
    if (!hasTypedRef.current && !isFocusedRef.current) {
      setShowHint(true)
    }
  }, [])

  const scheduleHint = useCallback(
    (delayMs: number) => {
      if (hintTimerRef.current) {
        window.clearTimeout(hintTimerRef.current)
      }
      hintTimerRef.current = window.setTimeout(() => {
        showHintNow()
      }, delayMs)
    },
    [showHintNow]
  )

  const handleVideoMetadata = useCallback(() => {
    const video = videoRef.current
    if (!video) {
      return
    }
    if (!Number.isFinite(video.duration) || video.duration <= 0) {
      return
    }
    hasVideoDurationRef.current = true
    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current)
    }
    if (!hasTypedRef.current) {
      setShowHint(false)
      setShouldShowHint(false)
    }
    const remainingSeconds = Math.max(video.duration - 1 - video.currentTime, 0)
    scheduleHint(remainingSeconds * 1000)
  }, [scheduleHint])

  useEffect(() => {
    fallbackTimerRef.current = window.setTimeout(() => {
      if (hasVideoDurationRef.current) {
        return
      }
      showHintNow()
    }, 1000)
    return () => {
      if (hintTimerRef.current) {
        window.clearTimeout(hintTimerRef.current)
      }
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current)
      }
    }
  }, [showHintNow])

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

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
    setShowHint(false)
    handleFocusPrefetch()
  }, [handleFocusPrefetch])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    if (shouldShowHint && !hasTyped) {
      setShowHint(true)
    }
  }, [hasTyped, shouldShowHint])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        onLoadedMetadata={handleVideoMetadata}
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
              <div className="relative h-12 w-full">
                <input
                  id={inputId}
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    if (error) {
                      setError("")
                    }
                    if (!hasTyped && event.target.value.length > 0) {
                      setHasTyped(true)
                      setShowHint(false)
                    }
                  }}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder=""
                  className="h-full w-full bg-transparent px-5 py-0 text-center text-black font-bold leading-[3rem] outline-none border-none focus:outline-none"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
                <div
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${showHint ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="flex h-20 w-20 items-center justify-center border border-black/50">
                    <span className="text-[10px] font-bold leading-none tracking-[0.2em] text-black">
                      PASSWORD
                    </span>
                  </div>
                </div>
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

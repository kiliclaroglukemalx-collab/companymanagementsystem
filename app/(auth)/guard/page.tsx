"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const SECURITY_CODE = "1530Bb_4560"

export default function VideoGuardPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)

  // 3 saniye sonra formu göster (video oynarken gözükmesin)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === SECURITY_CODE) {
      sessionStorage.setItem("video-guard-passed", "true")
      router.push("/login")
    } else {
      setError("Yanlış kod!")
      setCode("")
    }
  }

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center">
      {/* Video Background - Tek Seferlik */}
      <video 
        autoPlay 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      >
        <source src="/departments/loginy.mp4" type="video/mp4" />
      </video>

      {/* Hafif Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Form - Animasyonlu */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError("")
              }}
              placeholder="PASSWORD"
              className="w-80 px-6 py-4 bg-black/60 text-white rounded-lg text-center font-mono text-lg placeholder:text-gray-500 focus:outline-none focus:bg-black/80 transition-all backdrop-blur-md border-0"
              autoFocus
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm font-semibold"
              >
                {error}
              </motion.p>
            )}
            <button
              type="submit"
              className="w-80 py-4 bg-black/60 text-white font-bold rounded-lg hover:bg-black/80 transition-all backdrop-blur-md border-0"
            >
              ENTER
            </button>
          </form>
        </motion.div>
      )}
    </div>
  )
}

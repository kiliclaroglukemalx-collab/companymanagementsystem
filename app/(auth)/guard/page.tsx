"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const SECURITY_CODE = "1530Bb_4560"

export default function VideoGuardPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

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
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/departments/loginy.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Simple Password Input - Minimal */}
      <div className="relative z-10 text-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              setError("")
            }}
            placeholder="PASSWORD"
            className="w-80 px-6 py-4 bg-black/70 text-white border-2 border-white/40 rounded-lg text-center font-mono text-lg placeholder:text-gray-400 focus:outline-none focus:border-white transition-colors backdrop-blur-sm"
            autoFocus
          />
          {error && (
            <p className="text-red-400 text-sm font-semibold animate-pulse">{error}</p>
          )}
          <button
            type="submit"
            className="w-80 py-4 bg-black text-white font-bold rounded-lg border-2 border-white/50 hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  )
}

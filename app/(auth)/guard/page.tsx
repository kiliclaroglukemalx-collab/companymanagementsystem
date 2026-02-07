"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

const SECURITY_CODE = "1530Bb_4560"

export default function VideoGuardPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [error, setError] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (code === SECURITY_CODE) {
      // Kod doğru, login sayfasına git
      sessionStorage.setItem("video-guard-passed", "true")
      router.push("/login")
    } else {
      setError("Yanlış güvenlik kodu!")
      setCode("")
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/departments/loginy.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
            COMPANYMANAGEMENTSYSTEM
          </h1>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Güvenlik Doğrulaması
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700 mb-2">
                Güvenlik Kodu
              </label>
              <div className="relative">
                <input
                  id="securityCode"
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    setError("")
                  }}
                  placeholder="Güvenlik kodunu girin"
                  className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              DEVAM ET
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Bu alan sadece yetkili personel içindir
          </p>
        </div>
      </div>
    </div>
  )
}

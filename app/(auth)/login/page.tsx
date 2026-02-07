"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Lock, Eye, EyeOff } from "lucide-react"
import { loginAction } from "./actions"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if user passed video guard
  useEffect(() => {
    const passed = sessionStorage.getItem("video-guard-passed")
    if (!passed) {
      router.push("/guard")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await loginAction(formData)

      if (result.success) {
        router.push("/")
        router.refresh()
      } else {
        setError(result.error)
      }
    } catch (err) {
      console.error("[LoginPage] Error:", err)
      setError("Giriş başarısız")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-12 tracking-wider">
          COMPANYMANAGEMENTSYSTEM
        </h1>

        {/* Login Card */}
        <div className="bg-white rounded-lg p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-4 bg-black text-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-4 bg-black text-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "..." : "LOGIN"}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-black hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

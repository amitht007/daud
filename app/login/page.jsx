"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      if (loginForm.username && loginForm.password) {
        // Mock authentication logic
        const userRole = loginForm.username.toLowerCase() === "admin" ? "admin" : "user"

        // In real app, you'd set this in global state/context
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userRole", userRole)
        localStorage.setItem("username", loginForm.username)

        // Redirect based on role
        if (userRole === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/user/dashboard")
        }
      } else {
        setError("Please enter both username and password")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
              IS
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-slate-100">Infrastructure</div>
              <div className="text-sm text-slate-400">Platform</div>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to access your infrastructure dashboard</p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700/50 text-red-400 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your username"
                disabled={isLoading}
              />
              <p className="text-slate-500 text-xs mt-1">
                Try "admin" for admin access or any other username for user access
              </p>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h3 className="text-slate-100 font-medium mb-2">Demo Credentials:</h3>
          <div className="text-sm text-slate-300 space-y-1">
            <div>
              <strong>Admin:</strong> username: "admin", password: any
            </div>
            <div>
              <strong>User:</strong> username: anything else, password: any
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

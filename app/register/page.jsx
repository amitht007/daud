"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [primaryPass, setPrimaryPass] = useState("");
  const [secondaryPass, setSecondaryPass] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const [warning,setWarning] = useState("")
  const [role, setRole] = useState("majdoor")


const handleRegister = async (e) => {
  console.log('[REGISTER] handleRegister called');
  e.preventDefault();
  setIsLoading(true);
  setError("");
  console.log('[REGISTER] Form values:', loginForm, 'Role:', role);
  if (primaryPass !== secondaryPass) {
    setWarning("Passwords do not match");
    setIsLoading(false);
    console.warn('[REGISTER] Passwords do not match');
    return;
  }
  try {
    console.log('[REGISTER] Sending POST to /api/register...');
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password,
        role,
      }),
    });
    const data = await res.json();
    console.log('[REGISTER] Response:', data);
    if (res.ok) {
      console.log('[REGISTER] Registration successful, redirecting to /login');
      router.push("/login");
    } else {
      setError(data.message || "Registration failed");
      console.warn('[REGISTER] Registration failed:', data.message);
    }
  } catch (err) {
    setError("Registration failed");
    console.error('[REGISTER] Exception during registration:', err);
  }
  setIsLoading(false);
  console.log('[REGISTER] handleRegister finished');
};


  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}

        {/* Login Card */}
        <div className="bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Register</h1>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700/50 text-red-400 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
              <input
                type="text"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                disabled={isLoading}
              />
              <p className="text-slate-500 text-xs mt-1">
                Enter your email..... for verification, and part of our organization.
              </p>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => {
                  setPrimaryPass(e.target.value);
                  setLoginForm({ ...loginForm, password: e.target.value });
                }}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Enter Password Again</label>
              <input
                type="password"
                value={secondaryPass}
                onChange={(e) =>{
                  setSecondaryPass(e.target.value);
                  if (e.target.value !== primaryPass) {
                    setWarning("Passwords do not match");
                  } else {
                    setWarning("");
                  }
                }}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
          <div>
            <p className="text-red-500">{warning}</p>
          </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Checking in...
                </div>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300">
              ← Back to Home
            </Link>
          </div>
        </div>


      </div>
    </div>
  )
}

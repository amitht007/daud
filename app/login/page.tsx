"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";


export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      if (session.user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    // Optionally, show a spinner here
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (status === "authenticated") {
    return null;
  }
  
  const handleLogin = async (e) => {
    console.log('[LOGIN] handleLogin called');
    e.preventDefault();
    setIsLoading(true);
    setError("");
    console.log('[LOGIN] Form values:', loginForm);
    try {
      console.log('[LOGIN] Calling signIn...');
      const result = await signIn("credentials", {
        email: loginForm.email,
        password: loginForm.password,
        redirect: false, // <-- change to false for manual redirect
      });
      console.log('[LOGIN] signIn result:', result);

      if (result?.ok && result.url) {
        // If result.url contains "/login", authentication failed
        if (result.url.includes("/login")) {
          setError("Invalid email or password");
        } else {
          console.log("LLLLLOOOOOOGSSSSSSSS redirect")
          router.push("/admin/dashboard"); // Use router.push for SPA redirect
          router.replace(result.url); // Use router.replace for SPA redirect
        }
      } else if (result?.error) {
        setError(result.error);
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("Login failed");
      console.error('[LOGIN] Exception during login:', err);
    }
    setIsLoading(false);
    console.log('[LOGIN] handleLogin finished');
  };


  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
              ISU
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-slate-100">Self Service Infra</div>
              {/* <div className="text-sm text-slate-400">Infra</div> */}
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
                Enter your registered email address
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

      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { navigationItems } from "@/data/navigation"

export default function Navbar({ onToggleMobileSidebar }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null) // 'admin' or 'user'
  const router = useRouter()

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    setIsProfileOpen(false)
    router.push("/")
  }

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <nav className="fixed top-0 w-full z-[1000] bg-slate-900/95 backdrop-blur-md border-b border-slate-700 px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        {/* Left Section */}
        <div className="flex items-center">
          <button
            className="hidden max-md:block bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition-all duration-300 mr-4"
            onClick={onToggleMobileSidebar}
          >
            <div className="w-5 h-5 flex flex-col justify-between">
              <div className="w-full h-0.5 bg-slate-300 rounded"></div>
              <div className="w-full h-0.5 bg-slate-300 rounded"></div>
              <div className="w-full h-0.5 bg-slate-300 rounded"></div>
            </div>
          </button>

          {/* Logo Section */}
          <Link href="/" className="flex items-center mr-8">
            <div className="relative w-10 h-10 mr-3">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                IS
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold text-slate-100">Infrastructure</div>
              <div className="text-xs text-slate-400 font-medium">Platform</div>
            </div>
          </Link>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center mr-8 bg-green-900/30 border border-green-700 rounded-lg px-3 py-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-green-400 text-xs font-medium">All Systems Operational</span>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex list-none gap-1">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300 font-medium"
              >
                <span className="text-sm">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile Section */}
        <div className="relative">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 bg-slate-800 hover:bg-slate-700 rounded-lg px-3 py-2 transition-all duration-300"
              >
                <div className="relative w-8 h-8">
                  <div
                    className={`w-full h-full ${userRole === "admin" ? "bg-gradient-to-br from-purple-600 to-pink-600" : "bg-gradient-to-br from-blue-600 to-cyan-600"} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                  >
                    {userRole === "admin" ? "A" : "U"}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                </div>
                <span className="text-slate-300 font-medium hidden lg:block">
                  {userRole === "admin" ? "Admin" : "User"}
                </span>
                <div
                  className={`text-slate-400 transition-transform duration-300 hidden lg:block ${isProfileOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-slate-700">
                    <div className="text-slate-100 font-medium">
                      {userRole === "admin" ? "Admin User" : "Regular User"}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {userRole === "admin" ? "admin@company.com" : "user@company.com"}
                    </div>
                    <div
                      className={`text-xs mt-1 px-2 py-1 rounded ${userRole === "admin" ? "bg-purple-900/30 text-purple-400" : "bg-blue-900/30 text-blue-400"}`}
                    >
                      {userRole === "admin" ? "Administrator" : "Standard User"}
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-700 rounded transition-all duration-300">
                      Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-700 rounded transition-all duration-300">
                      Settings
                    </button>
                    {userRole === "admin" && (
                      <Link
                        href="/admin/approvals"
                        className="block w-full text-left px-3 py-2 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 rounded transition-all duration-300"
                      >
                        Manage Approvals
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

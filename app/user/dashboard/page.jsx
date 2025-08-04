"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function UserDashboard() {
  const [userStats, setUserStats] = useState({
    myRequests: 12,
    approved: 8,
    pending: 3,
    rejected: 1,
    resourcesUsed: 67,
    monthlyBudget: 85,
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in (in real app, this would be from global state)
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  const myRequests = [
    {
      id: "REQ-045",
      type: "Web Server Deployment",
      status: "approved",
      date: "2024-01-15",
      resources: "AWS EC2 t3.medium",
    },
    { id: "REQ-046", type: "Database Setup", status: "pending", date: "2024-01-16", resources: "RDS MySQL 8.0" },
    {
      id: "REQ-047",
      type: "Load Balancer Config",
      status: "pending",
      date: "2024-01-16",
      resources: "ALB + Target Groups",
    },
    { id: "REQ-048", type: "SSL Certificate", status: "approved", date: "2024-01-17", resources: "ACM Certificate" },
  ]

  const quickActions = [
    {
      title: "Request Infrastructure",
      icon: "🏗️",
      description: "Deploy new resources",
      href: "/request/infrastructure",
    },
    { title: "Scale Resources", icon: "📈", description: "Modify existing resources", href: "/request/scaling" },
    { title: "Security Scan", icon: "🔒", description: "Run security analysis", href: "/security/scan" },
    { title: "View Patterns", icon: "🔧", description: "Browse deployment patterns", href: "/patterns" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700/50"
      case "approved":
        return "bg-green-900/30 text-green-400 border-green-700/50"
      case "rejected":
        return "bg-red-900/30 text-red-400 border-red-700/50"
      default:
        return "bg-slate-900/30 text-slate-400 border-slate-700/50"
    }
  }

  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">🚀 My Dashboard</h1>
          <p className="text-xl text-slate-300">Welcome back! Here's your infrastructure overview</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-blue-400 mb-2">{userStats.myRequests}</div>
            <div className="text-slate-400 text-sm">My Requests</div>
            <div className="text-blue-400 text-xs mt-1">Total submitted</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-green-400 mb-2">{userStats.approved}</div>
            <div className="text-slate-400 text-sm">Approved</div>
            <div className="text-green-400 text-xs mt-1">Ready to deploy</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-yellow-400 mb-2">{userStats.pending}</div>
            <div className="text-slate-400 text-sm">Pending</div>
            <div className="text-yellow-400 text-xs mt-1">Under review</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-red-400 mb-2">{userStats.rejected}</div>
            <div className="text-slate-400 text-sm">Rejected</div>
            <div className="text-red-400 text-xs mt-1">Needs revision</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-cyan-400 mb-2">{userStats.resourcesUsed}%</div>
            <div className="text-slate-400 text-sm">Resources Used</div>
            <div className="text-cyan-400 text-xs mt-1">Of allocated quota</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-purple-400 mb-2">{userStats.monthlyBudget}%</div>
            <div className="text-slate-400 text-sm">Budget Used</div>
            <div className="text-purple-400 text-xs mt-1">This month</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {action.title}
                </h3>
                <p className="text-slate-300 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* My Recent Requests */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-100">My Recent Requests</h2>
            <Link href="/my-requests" className="text-blue-400 hover:text-blue-300 font-medium">
              View All →
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {myRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-blue-400">{request.id}</span>
                      <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <span className="text-slate-400 text-sm">{request.date}</span>
                  </div>
                  <div className="text-slate-100 font-medium mb-1">{request.type}</div>
                  <div className="text-slate-400 text-sm">{request.resources}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

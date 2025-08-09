"use client"

import { useState } from "react"
import Link from "next/link"
import RequireAuth from "@/components/auth/RequireAuth"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRequests: 1247,
    pendingApprovals: 23,
    approvedToday: 45,
    rejectedToday: 3,
    activeUsers: 156,
    systemHealth: 98.7,
  })

  const recentRequests = [
    { id: "REQ-001", user: "john.doe", type: "Infrastructure Deployment", status: "pending", time: "2 hours ago" },
    { id: "REQ-002", user: "jane.smith", type: "Resource Scaling", status: "approved", time: "4 hours ago" },
    { id: "REQ-003", user: "mike.wilson", type: "Security Update", status: "pending", time: "6 hours ago" },
    { id: "REQ-004", user: "sarah.johnson", type: "Database Migration", status: "rejected", time: "8 hours ago" },
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
    <RequireAuth role="admin">
      <div className="px-8 py-8 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-100 mb-4">👑 Admin Dashboard</h1>
            <p className="text-xl text-slate-300">Administrative control center for infrastructure management</p>
          </div>

          {/* Admin Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <div className="text-2xl font-bold text-blue-400 mb-2">{stats.totalRequests}</div>
              <div className="text-slate-400 text-sm">Total Requests</div>
              <div className="text-green-400 text-xs mt-1">↗ +12.5%</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <div className="text-2xl font-bold text-yellow-400 mb-2">{stats.pendingApprovals}</div>
              <div className="text-slate-400 text-sm">Pending Approvals</div>
              <div className="text-yellow-400 text-xs mt-1">Needs attention</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <div className="text-2xl font-bold text-green-400 mb-2">{stats.approvedToday}</div>
              <div className="text-slate-400 text-sm">Approved Today</div>
              <div className="text-green-400 text-xs mt-1">↗ +8.2%</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <div className="text-2xl font-bold text-red-400 mb-2">{stats.rejectedToday}</div>
              <div className="text-slate-400 text-sm">Rejected Today</div>
              <div className="text-red-400 text-xs mt-1">↘ -2.1%</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <div className="text-2xl font-bold text-cyan-400 mb-2">{stats.activeUsers}</div>
              <div className="text-slate-400 text-sm">Active Users</div>
              <div className="text-cyan-400 text-xs mt-1">↗ +5.7%</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <div className="text-2xl font-bold text-purple-400 mb-2">{stats.systemHealth}%</div>
              <div className="text-slate-400 text-sm">System Health</div>
              <div className="text-green-400 text-xs mt-1">Excellent</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/admin/approvals"
              className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-700/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300"
            >
              <div className="text-3xl mb-4">⏳</div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Pending Approvals</h3>
              <p className="text-slate-300 mb-4">{stats.pendingApprovals} requests waiting for your review</p>
              <div className="text-yellow-400 font-medium">Review Now →</div>
            </Link>

            <Link
              href="/admin/users"
              className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">User Management</h3>
              <p className="text-slate-300 mb-4">Manage user access and permissions</p>
              <div className="text-blue-400 font-medium">Manage Users →</div>
            </Link>

            <Link
              href="/admin/system"
              className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">System Settings</h3>
              <p className="text-slate-300 mb-4">Configure platform settings and policies</p>
              <div className="text-purple-400 font-medium">Configure →</div>
            </Link>
          </div>

          {/* Recent Requests */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-100">Recent Requests</h2>
              <Link href="/admin/approvals" className="text-blue-400 hover:text-blue-300 font-medium">
                View All →
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-blue-400">{request.id}</span>
                        <span className="text-slate-300">{request.user}</span>
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      <span className="text-slate-400 text-sm">{request.time}</span>
                    </div>
                    <div className="text-slate-300">{request.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}
          
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Settings, FileText } from "lucide-react"

interface DashboardStats {
  totalUsers: number
  activeUsers: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({ totalUsers: 0, activeUsers: 0 })
  const [showActive, setShowActive] = useState(false)
  const router = useRouter()

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     // const response = await fetch("/api/auth/signin")
  //     const isAuthenticated = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("admin-auth="))?.split("=")[1] === "true";

  //     if (!isAuthenticated) {
  //       router.push("/isupod/signin")
  //       return
  //     }
  //   }

  //   const fetchStats = async () => {
  //     try {
  //       const response = await fetch("/api/users/stats")
  //       if (response.ok) {
  //         const data = await response.json()
  //         setStats(data)
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch stats:", error)
  //     }
  //   }

  //   checkAuth()
  //   fetchStats()
  // }, [router])


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-400 mb-8 text-center">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total/Active Users Card */}
          <Card className="bg-slate-800 border border-slate-700 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                {showActive ? "Active Users" : "Total Users"}
              </CardTitle>
              <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {showActive ? stats.activeUsers : stats.totalUsers}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-blue-400 hover:text-blue-300"
                onClick={() => setShowActive(!showActive)}
              >
                Switch to {showActive ? "Total" : "Active"} Users
              </Button>
            </CardContent>
          </Card>

          {/* Onboard Users Card */}
          <Card
            className="bg-slate-800 border border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/podxs/onboard")}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Onboard Users
              </CardTitle>
              <UserPlus className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold text-white">Add New</div>
              <p className="text-xs text-slate-400">Click to onboard new users</p>
            </CardContent>
          </Card>

          {/* Manage Users Card */}
          <Card
            className="bg-slate-800 border border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/podxs/manage")}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Manage Users
              </CardTitle>
              <Settings className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold text-white">Edit/Delete</div>
              <p className="text-xs text-slate-400">Click to manage existing users</p>
            </CardContent>
          </Card>

          {/* Operation Logs Card */}
          <Card
            className="bg-slate-800 border border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/podxs/logs")}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Operation Logs
              </CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold text-white">View Logs</div>
              <p className="text-xs text-slate-400">Track all user operations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

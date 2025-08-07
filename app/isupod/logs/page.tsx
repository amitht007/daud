"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Settings, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"

interface DashboardStats {
  totalUsers: number
  activeUsers: number
}

interface Log {
  id: string
  userId?: string
  action: "CREATE" | "UPDATE" | "DELETE"
  timestamp: string
  userDetails: {
    name: string
    email: string
    empCode: string
  }
  previousData?: {
    name: string
    email: string
    empCode: string
  }
}

interface LogsResponse {
  logs: Log[]
}

function formatISTDate(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({ totalUsers: 0, activeUsers: 0 })
  const [showActive, setShowActive] = useState(false)
  const [logs, setLogs] = useState<LogsResponse | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check")
      if (!response.ok) {
        router.push("/isupod/signin")
        return
      }
    }

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/users/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }

    const fetchLogs = async () => {
      try {
        const response = await fetch("/api/logs")
        if (response.ok) {
          const data = await response.json()
          setLogs(data)
        }
      } catch (error) {
        console.error("Failed to fetch logs:", error)
      }
    }

    checkAuth()
    fetchStats()
    fetchLogs()
  }, [router])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="cursor-pointer hover:shadow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {showActive ? "Active Users" : "Total Users"}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showActive ? stats.activeUsers : stats.totalUsers}
              </div>
              <Button variant="ghost" size="sm" className="mt-2 px-0 h-auto" onClick={() => setShowActive(!showActive)}>
                Switch to {showActive ? "Total" : "Active"} Users
              </Button>
            </CardContent>
          </Card>

          <Card onClick={() => router.push("/onboard")} className="cursor-pointer hover:shadow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Onboard Users</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Add New</div>
              <p className="text-xs text-muted-foreground">Click to onboard new users</p>
            </CardContent>
          </Card>

          <Card onClick={() => router.push("/manage")} className="cursor-pointer hover:shadow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Manage Users</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Edit/Delete</div>
              <p className="text-xs text-muted-foreground">Click to manage existing users</p>
            </CardContent>
          </Card>

          <Card onClick={() => router.push("/logs")} className="cursor-pointer hover:shadow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Operation Logs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View Logs</div>
              <p className="text-xs text-muted-foreground">Track all user operations</p>
            </CardContent>
          </Card>
        </div>

        {/* Logs Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {logs?.logs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No operations logged yet</div>
            ) : (
              logs?.logs.map((log) => (
                <div
                  key={log.id}
                  className={`rounded-xl p-4 border shadow-sm
                    ${
                      log.action === "CREATE"
                        ? "bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-600"
                        : log.action === "UPDATE"
                        ? "bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600"
                        : log.action === "DELETE"
                        ? "bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-600"
                        : "bg-muted border-muted"
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="default"
                        className={`text-xs font-medium ${
                          log.action === "CREATE"
                            ? "bg-green-600"
                            : log.action === "UPDATE"
                            ? "bg-blue-600"
                            : log.action === "DELETE"
                            ? "bg-red-600"
                            : "bg-gray-600"
                        } text-white`}
                      >
                        {log.action}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{formatISTDate(log.timestamp)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">ID: {log.id}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold mb-1">User Details</p>
                      <ul className="space-y-0.5">
                        <li><strong>Name:</strong> {log.userDetails.name}</li>
                        <li><strong>Email:</strong> {log.userDetails.email}</li>
                        <li><strong>Emp Code:</strong> {log.userDetails.empCode}</li>
                        {log.userId && <li><strong>User ID:</strong> {log.userId}</li>}
                      </ul>
                    </div>

                    {log.previousData && log.action === "UPDATE" && (
                      <div>
                        <p className="font-semibold mb-1">Previous Data</p>
                        <ul className="space-y-0.5">
                          <li><strong>Name:</strong> {log.previousData.name}</li>
                          <li><strong>Email:</strong> {log.previousData.email}</li>
                          <li><strong>Emp Code:</strong> {log.previousData.empCode}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

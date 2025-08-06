"use client"
import RequireAuth from "@/components/auth/RequireAuth"

export default function DashboardPage() {
  return (
    <RequireAuth role="user">
      <div>
        <h1>User Dashboard</h1>
        {/* ...user dashboard content... */}
      </div>
    </RequireAuth>
  )
}
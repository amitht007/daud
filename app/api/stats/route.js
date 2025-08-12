import { NextResponse } from "next/server"
import { dbHelpers } from "@/lib/db"
import { authHelpers } from "@/lib/auth"

export async function GET(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization")
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      return NextResponse.json({ error: "Access token required" }, { status: 401 })
    }

    const user = authHelpers.verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 })
    }

    let stats

    if (user.role === "admin") {
      // Admin gets system-wide stats
      stats = {
        ...dbHelpers.getRequestStats(),
        activeUsers: dbHelpers.getDatabase().prepare("SELECT COUNT(*) as count FROM users WHERE is_active = 1").get()
          .count,
        systemHealth: 98.7, // This would come from monitoring system
      }
    } else {
      // Users get their personal stats
      stats = {
        ...dbHelpers.getUserStats(user.id),
        resourcesUsed: 67, // This would come from resource monitoring
        monthlyBudget: 85, // This would be calculated from actual usage
      }
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Get stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

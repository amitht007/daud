import { NextResponse } from "next/server"
import { dbHelpers } from "@/lib/database"
import { authHelpers } from "@/lib/auth"

export async function PATCH(request, { params }) {
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

    // Only admins can update request status
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { status, rejectionReason } = await request.json()
    const requestId = params.id

    const result = dbHelpers.updateRequestStatus(requestId, status, user.id, rejectionReason)

    // Log the action
    dbHelpers.logAction(
      user.id,
      "UPDATE_REQUEST_STATUS",
      "INFRASTRUCTURE_REQUEST",
      requestId,
      `Updated status to: ${status}`,
      null,
      null,
    )

    return NextResponse.json({
      success: true,
      message: `Request ${status} successfully`,
    })
  } catch (error) {
    console.error("Update request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

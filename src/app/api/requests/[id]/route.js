import { NextResponse } from "next/server"
import { dbHelpers } from "../../../../../lib/db"
import { authHelpers } from "../../../../../lib/auth"

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
    if (!status) {
      return NextResponse.json({ error: "Missing status parameter" }, { status: 400 })
    }
    const requestId = params.id

    const result = await dbHelpers.updateRequestStatus(requestId, status, user.id, rejectionReason)
    if (!result) {
      return NextResponse.json({ error: "Failed to update request status" }, { status: 500 })
    }

    // Log the action
    await dbHelpers.logAction(
      user.id,
      "UPDATE_REQUEST_STATUS",
      "INFRASTRUCTURE_REQUEST",
      requestId,
      `Updated status to: ${status}`,
      null,
      null,
    )

    return NextResponse.json(
      {
        success: true,
        message: `Request ${status} successfully`,
        data: result,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Update request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

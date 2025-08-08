import { NextResponse } from "next/server";
import { dbOperations } from "../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { status } = await request.json();
    const requestId = params.id;

    dbOperations.updateRequestStatus.run(status, requestId);

    return NextResponse.json({
      success: true,
      message: `Request ${status} successfully`,
    });
  } catch (error) {
    console.error("Update request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

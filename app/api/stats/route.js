import { NextResponse } from "next/server";
import { dbOperations } from "../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const user = session.user;

    let stats;

    if (user.role === "admin") {
      const pendingReqs = dbOperations.getRequestsByStatus.all('pending').length;
      const approvedReqs = dbOperations.getRequestsByStatus.all('approved').length;
      const rejectedReqs = dbOperations.getRequestsByStatus.all('rejected').length;
      const totalUsers = dbOperations.getUserById.all().length;

      stats = {
        pendingRequests: pendingReqs,
        approvedRequests: approvedReqs,
        rejectedRequests: rejectedReqs,
        totalUsers: totalUsers,
        systemHealth: 98.7,
      };
    } else {
      const userReqs = dbOperations.getRequestsByUserId.all(user.id);
      const pendingReqs = userReqs.filter(r => r.status === 'pending').length;
      const approvedReqs = userReqs.filter(r => r.status === 'approved').length;
      const rejectedReqs = userReqs.filter(r => r.status === 'rejected').length;

      stats = {
        pendingRequests: pendingReqs,
        approvedRequests: approvedReqs,
        rejectedRequests: rejectedReqs,
        resourcesUsed: 67,
        monthlyBudget: 85,
      };
    }

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Get stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { dbOperations } from "../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export async function POST(request) {
  console.log('[REQUESTS] ROUTE: POST /api/requests called');
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const user = session.user;
    const requestData = await request.json();
    const requestId = `REQ-${Date.now().toString().slice(-6)}`;
    const newRequest = {
      item: JSON.stringify({ ...requestData, request_id: requestId }),
      user_id: user.id,
      status: 'pending',
    };
    dbOperations.createRequest.run(newRequest.item, newRequest.user_id, newRequest.status);
    return NextResponse.json({
      success: true,
      requestId: requestId,
      message: "Request created successfully",
    });
  } catch (error) {
    console.error('[REQUESTS] Create request error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request) {
  console.log('[REQUESTS] ROUTE: GET /api/requests called');
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const user = session.user;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const userId = searchParams.get("userId");

    let requests;
    if (user.role === "admin") {
      if (userId) {
        requests = dbOperations.getRequestsByUserId.all(userId);
      } else if (status) {
        requests = dbOperations.getRequestsByStatus.all(status);
      } else {
        requests = dbOperations.getAllRequests.all();
      }
    } else {
      requests = dbOperations.getRequestsByUserId.all(user.id);
    }

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('[REQUESTS] Get requests error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

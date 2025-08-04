import { NextResponse } from "next/server"
import { dbHelpers } from "../../../lib/db"
import { authHelpers } from "../../../lib/auth"

export async function POST(request) {
  console.log('[REQUESTS] ROUTE: POST /api/requests called');
  try {
    console.log('[REQUESTS] Importing next-auth/next and authOptions...');
    const { getServerSession } = await import("next-auth/next");
    const { authOptions } = await import("../../../lib/auth");
    console.log('[REQUESTS] getServerSession and authOptions imported');
    console.log('[REQUESTS] Checking session...');
    const session = await getServerSession({ req: request, ...authOptions });
    console.log('[REQUESTS] Session:', session);
    if (!session || !session.user) {
      console.warn('[REQUESTS] No valid session found');
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const user = session.user;
    console.log('[REQUESTS] User:', user);
    console.log('[REQUESTS] Parsing request body...');
    const requestData = await request.json()
    console.log('[REQUESTS] Request body:', requestData)
    // Generate request ID
    const requestId = `REQ-${Date.now().toString().slice(-6)}`
    console.log('[REQUESTS] Generated requestId:', requestId);
    // Insert all request data as JSON string in 'item' field
    const newRequest = {
      item: JSON.stringify({ ...requestData, request_id: requestId }),
      user_id: user.id,
      status: 'pending',
    }
    console.log('[REQUESTS] New request object:', newRequest)
    const dbModule = await import("../../../lib/db");
    console.log('[REQUESTS] dbModule imported:', Object.keys(dbModule));
    console.log('[REQUESTS] Calling dbHelpers.createRequest...');
    const result = dbModule.dbHelpers.createRequest(newRequest)
    console.log('[REQUESTS] DB result:', result)
    // Log the action (should be a no-op)
    if (typeof dbModule.dbHelpers.logAction === 'function') {
      console.log('[REQUESTS] Calling dbHelpers.logAction...');
      dbModule.dbHelpers.logAction(
        user.id,
        "CREATE_REQUEST",
        "INFRASTRUCTURE_REQUEST",
        requestId,
        `Created request`,
        null,
        null,
      )
      console.log('[REQUESTS] Action logged for request:', requestId)
    } else {
      console.log('[REQUESTS] logAction is not a function:', dbModule.dbHelpers.logAction)
    }
    console.log('[REQUESTS] Returning success response...');
    return NextResponse.json({
      success: true,
      requestId: requestId,
      message: "Request created successfully",
    })
  } catch (error) {
    console.error('[REQUESTS] Create request error:', error)
    if (error && error.stack) {
      console.error('[REQUESTS] Error stack:', error.stack)
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request) {
  console.log('[REQUESTS] ROUTE: GET /api/requests called');
  try {
    console.log('[REQUESTS] Checking authorization header...');
    const authHeader = request.headers.get("authorization")
    console.log('[REQUESTS] Authorization header:', authHeader)
    const token = authHeader && authHeader.split(" ")[1]
    console.log('[REQUESTS] Token:', token)
    if (!token) {
      console.warn('[REQUESTS] No access token provided')
      return NextResponse.json({ error: "Access token required" }, { status: 401 })
    }
    console.log('[REQUESTS] Verifying token...');
    const user = authHelpers.verifyToken(token)
    console.log('[REQUESTS] Decoded user from token:', user)
    if (!user) {
      console.warn('[REQUESTS] Invalid token')
      return NextResponse.json({ error: "Invalid token" }, { status: 403 })
    }
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")
    console.log('[REQUESTS] Query params:', { status, userId })
    let requests
    if (userId && user.role === "admin") {
      console.log('[REQUESTS] Admin fetching requests for userId:', userId)
      requests = dbHelpers.getRequestsByUserId(Number.parseInt(userId))
    } else if (userId && user.id === Number.parseInt(userId)) {
      console.log('[REQUESTS] User fetching own requests:', user.id)
      requests = dbHelpers.getRequestsByUserId(user.id)
    } else if (status && user.role === "admin") {
      console.log('[REQUESTS] Admin fetching requests by status:', status)
      requests = dbHelpers.getRequestsByStatus(status)
    } else if (user.role === "admin") {
      console.log('[REQUESTS] Admin fetching all requests')
      requests = dbHelpers.getRequestsByStatus("pending")
        .concat(dbHelpers.getRequestsByStatus("approved"))
        .concat(dbHelpers.getRequestsByStatus("rejected"))
    } else {
      console.log('[REQUESTS] User fetching own requests:', user.id)
      requests = dbHelpers.getRequestsByUserId(user.id)
    }
    console.log('[REQUESTS] Returning requests:', requests);
    return NextResponse.json({ requests })
  } catch (error) {
    console.error('[REQUESTS] Get requests error:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

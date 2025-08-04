import { NextResponse } from "next/server"
import { authHelpers } from "@/lib/auth"

export async function POST(request) {
  console.log('[VERIFY] API HIT: POST /api/auth/verify')
  try {
    const { token } = await request.json()
    console.log('[VERIFY] Parsed token:', token)
    if (!token) {
      console.warn('[VERIFY] No token provided')
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }
    const decoded = authHelpers.verifyToken(token)
    console.log('[VERIFY] Decoded token:', decoded)
    if (!decoded) {
      console.warn('[VERIFY] Invalid or expired token')
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }
    return NextResponse.json({
      success: true,
      user: decoded,
    })
  } catch (error) {
    console.error('[VERIFY] Token verification error:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import bcrypt from 'bcryptjs'
import { dbOperations } from '../../../../lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  console.log('[LOGIN] API HIT: POST /api/auth/login')
  let body
  try {
    body = await req.json()
    console.log('[LOGIN] Parsed request body:', body)
  } catch (err) {
    console.error('[LOGIN] Error parsing JSON body:', err)
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }
  const { email, password } = body
  console.log('[LOGIN] Extracted fields:', { email, password })

  // Validation
  if (!email || !password) {
    console.warn('[LOGIN] Validation failed: missing email or password')
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
  }

  try {
    console.log('[LOGIN] Fetching user from DB:', email)
    const user = dbOperations.getUserByEmail.get(email)
    if (!user) {
      console.warn('[LOGIN] No user found:', email)
      return NextResponse.json({ message: 'No user found with this email' }, { status: 401 })
    }
    console.log('[LOGIN] Comparing password')
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      console.warn('[LOGIN] Invalid password for:', email)
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 })
    }
    console.log('[LOGIN] Login successful:', user.id)
    // Here you should issue a JWT for the user and return it
    // For now, just return user info
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
      // TODO: Add JWT token here for full auth integration
    }, { status: 200 })
  } catch (error) {
    console.error('[LOGIN] Login error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

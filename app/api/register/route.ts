// pages/api/register.js
import bcrypt from 'bcryptjs'
import { dbOperations } from '../../../lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

// Generate unique user ID
function generateUserId() {
  return 'u' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

export async function POST(req: NextRequest) {
  console.log('[REGISTER] ROUTE: POST /api/register called')
  let body
  try {
    console.log('[REGISTER] Parsing request body...')
    body = await req.json()
    console.log('[REGISTER] Parsed request body:', body)
  } catch (err) {
    console.error('[REGISTER] Error parsing JSON body:', err)
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }
  const { email, password, role = 'majdoor' } = body
  console.log('[REGISTER] Extracted fields:', { email, password, role })

  // Validation
  if (!email || !password) {
    console.warn('[REGISTER] Validation failed: missing email or password')
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
  }
  if (password.length < 6) {
    console.warn('[REGISTER] Validation failed: password too short')
    return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 400 })
  }
  if (!['maalik', 'majdoor'].includes(role)) {
    console.warn('[REGISTER] Validation failed: invalid role')
    return NextResponse.json({ message: 'Invalid role' }, { status: 400 })
  }

  try {
    console.log('[REGISTER] Checking if user already exists:', email)
    const existingUser = dbOperations.getUserByEmail.get(email)
    console.log('[REGISTER] DB getUserByEmail result:', existingUser)
    if (existingUser) {
      console.warn('[REGISTER] User already exists:', email)
      return NextResponse.json({ message: 'User already exists with this email' }, { status: 400 })
    }

    console.log('[REGISTER] Hashing password...')
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    console.log('[REGISTER] Password hashed:', hashedPassword)

    const userId = generateUserId()
    console.log('[REGISTER] Generated userId:', userId)

    console.log('[REGISTER] Creating user in DB:', { userId, email, hashedPassword, role })
    const result = dbOperations.createUser.run(userId, email, hashedPassword, role)
    console.log('[REGISTER] DB result:', result)

    if (result.changes > 0) {
      console.log('[REGISTER] User created successfully:', userId)
      return NextResponse.json({
        message: 'User created successfully',
        user: { id: userId, email, role }
      }, { status: 201 })
    } else {
      console.error('[REGISTER] Failed to create user:', userId)
      return NextResponse.json({ message: 'Failed to create user' }, { status: 500 })
    }
  } catch (error) {
    console.error('[REGISTER] Registration error:', error)
    if ((error as any).code === 'SQLITE_CONSTRAINT_UNIQUE') {
      console.warn('[REGISTER] Unique constraint violation:', email)
      return NextResponse.json({ message: 'User already exists with this email' }, { status: 400 })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
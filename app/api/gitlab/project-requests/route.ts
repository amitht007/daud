import { NextRequest, NextResponse } from 'next/server'
import { dbOperations } from '@/lib/db'

// GET /api/gitlab/project-requests
export async function GET(req: NextRequest) {
  try {
    const requests = typeof dbOperations.getPendingGitlabProjectRequests === 'function'
      ? dbOperations.getPendingGitlabProjectRequests()
      : []
    return NextResponse.json({ requests })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
  }
}

// PATCH /api/gitlab/project-requests/:id
export async function PATCH(req: NextRequest) {
  try {
    const { id, status, reviewedBy } = await req.json()
    if (!id || !status || !reviewedBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const reviewedAt = new Date().toISOString()
    if (typeof dbOperations.updateGitlabProjectRequestStatus === 'function') {
      dbOperations.updateGitlabProjectRequestStatus({ id, status, reviewedBy, reviewedAt })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 })
  }
}

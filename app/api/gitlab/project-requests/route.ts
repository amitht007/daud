import { NextRequest, NextResponse } from 'next/server'
import { dbOperations } from '../../../lib/db'

// GET /api/gitlab/project-requests
export async function GET(req: NextRequest) {
  try {
    const requests = dbOperations.getPendingGitlabProjectRequests.all()
    return NextResponse.json({ requests })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
  }
}

// PATCH /api/gitlab/project-requests
export async function PATCH(req: NextRequest) {
  try {
    const { id, status, reviewedBy } = await req.json()
    if (!id || !status || !reviewedBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const reviewedAt = new Date().toISOString()
    dbOperations.updateGitlabProjectRequestStatus.run(status, reviewedBy, reviewedAt, id)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { dbOperations } from '../../../lib/db'

// POST /api/gitlab/project-request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, group, groupId, description, projectName } = body
    if (!email || !group || !groupId || !description || !projectName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    // Save the request to the DB (pending approval)
    const result = dbOperations.createGitlabProjectRequest.run(
      email,
      group,
      groupId,
      description,
      projectName,
      'pending'
    )
    return NextResponse.json({ success: true, request: result })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save request' }, { status: 500 })
  }
}

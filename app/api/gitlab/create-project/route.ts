import { NextRequest, NextResponse } from 'next/server'

// POST /api/gitlab/create-project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    let { groupId, projectName, description } = body
    if (!groupId || !projectName || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    // Ensure groupId is an integer (namespace_id must be int for GitLab)
    if (typeof groupId === 'string') {
      groupId = parseInt(groupId, 10)
    }
    if (typeof groupId !== 'number' || isNaN(groupId)) {
      return NextResponse.json({ error: 'Invalid groupId/namespace_id' }, { status: 400 })
    }
 
    // Use environment variable for GitLab token
    const GITLAB_URL = process.env.GITLAB_URL + "/api/v4/projects"

    const GITLAB_TOKEN = process.env.GITLAB_ACCESS_TOKEN
    const payload = {
      name: projectName,
      description,
      namespace_id: groupId,
      visibility: 'private',
    }
    console.log('[GITLAB][CREATE-PROJECT] Payload:', payload)
    const res = await fetch(GITLAB_URL, {
      method: 'POST',
      headers: {
        'PRIVATE-TOKEN': GITLAB_TOKEN || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const err = await res.text()
      console.error('[GITLAB][CREATE-PROJECT] Error:', err)
      return NextResponse.json({ error: 'GitLab project creation failed', details: err }, { status: 500 })
    }
    const data = await res.json()
    return NextResponse.json({ success: true, project: data })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

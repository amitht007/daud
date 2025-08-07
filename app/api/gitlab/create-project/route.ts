import { NextRequest, NextResponse } from 'next/server'

// POST /api/gitlab/create-project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { groupId, projectName, description } = body
    if (!groupId || !projectName || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const GITLAB_URL = 'https://gitlab.txninfra.com/api/v4/projects'
    const GITLAB_TOKEN = process.env.GITLAB_ACCESS_TOKEN
    const res = await fetch(GITLAB_URL, {
      method: 'POST',
      headers: {
        'PRIVATE-TOKEN': GITLAB_TOKEN || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectName,
        description,
        namespace_id: groupId,
        visibility: 'private',
      })
    })
    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json({ error: 'GitLab project creation failed', details: err }, { status: 500 })
    }
    const data = await res.json()
    return NextResponse.json({ success: true, project: data })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

// GET /api/gitlab/groups?search=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  if (!search || search.length < 2) {
    return NextResponse.json({ groups: [] })
  }
  const GITLAB_URL = 'https://gitlab.txninfra.com/api/v4/groups'
  const GITLAB_TOKEN = process.env.GITLAB_ACCESS_TOKEN
  try {
    const res = await fetch(`${GITLAB_URL}?search=${encodeURIComponent(search)}`, {
      headers: {
        'PRIVATE-TOKEN': GITLAB_TOKEN || ''
      }
    })
    if (!res.ok) throw new Error('GitLab API error')
    const groups = await res.json()
    // Only return id and full_path for autosuggest
    return NextResponse.json({ groups: groups.map(g => ({ id: g.id, full_path: g.full_path })) })
  } catch (err) {
    return NextResponse.json({ groups: [] }, { status: 500 })
  }
}

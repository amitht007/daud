import { NextRequest, NextResponse } from 'next/server';

// GET /api/emails?search=abc
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('search') || '';
  if (!query || query.length < 2) {
    return NextResponse.json({ emails: [] });
  }
  try {
    // Call GitLab API for user search
    const gitlabUrl = process.env.GITLAB_URL || 'https://gitlab.txninfra.com';
    const token = process.env.GITLAB_ACCESS_TOKEN || process.env.GITLAB_A1CCESS_TOKEN;
    const res = await fetch(`${gitlabUrl}/api/v4/users?search=${encodeURIComponent(query)}`, {
      headers: {
        'PRIVATE-TOKEN': token,
      },
    });
    if (!res.ok) {
      console.error('[API/emails] GitLab API error:', res.status, await res.text());
      return NextResponse.json({ emails: [] });
    }
    const users = await res.json();
    const emails = users.map(u => u.email).filter(Boolean);
    return NextResponse.json({ emails });
  } catch (err) {
    console.error('[API/emails] Error:', err);
    return NextResponse.json({ emails: [] });
  }
}

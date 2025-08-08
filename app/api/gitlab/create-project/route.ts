
import { NextRequest, NextResponse } from 'next/server'

// POST /api/gitlab/create-project

// Helper to add members to a GitLab project
async function addProjectMembers(projectId, emails, accessLevel, gitlabUrl, token) {
  for (const email of emails) {
    // Find user by email
    const userRes = await fetch(`${gitlabUrl}/api/v4/users?search=${encodeURIComponent(email)}`, {
      headers: { 'PRIVATE-TOKEN': token },
    });
    const users = await userRes.json();
    const user = users.find(u => u.email === email);
    if (user) {
      await fetch(`${gitlabUrl}/api/v4/projects/${projectId}/members`, {
        method: 'POST',
        headers: { 'PRIVATE-TOKEN': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, access_level: accessLevel })
      });
    }
  }
}

async function createInitialCommit(projectId, gitlabUrl, token) {
  await fetch(`${gitlabUrl}/api/v4/projects/${projectId}/repository/files/README.md`, {
    method: 'POST',
    headers: { 'PRIVATE-TOKEN': token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      branch: 'main',
      content: '# Initial Commit',
      commit_message: 'Initial commit'
    })
  });
}


// Helper to set custom attributes
async function setCustomAttributes(projectId, attributes, gitlabUrl, token) {
  for (const [key, value] of Object.entries(attributes)) {
    await fetch(`${gitlabUrl}/api/v4/projects/${projectId}/custom_attributes/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: { 'PRIVATE-TOKEN': token },
      body: new URLSearchParams({ value: value })
    });
  }
}

// Helper to protect main branch
async function protectMainBranch(projectId, gitlabUrl, token) {
  await fetch(`${gitlabUrl}/api/v4/projects/${projectId}/protected_branches`, {
    method: 'POST',
    headers: { 'PRIVATE-TOKEN': token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'main' })
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { groupId, projectName, description, maintainers = [], developers = [], techStack = '', tags = [] } = body;
    if (!groupId || !projectName || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Ensure groupId is an integer (namespace_id must be int for GitLab)
    if (typeof groupId === 'string') {
      groupId = parseInt(groupId, 10);
    }
    if (typeof groupId !== 'number' || isNaN(groupId)) {
      return NextResponse.json({ error: 'Invalid groupId/namespace_id' }, { status: 400 });
    }

    const GITLAB_URL = process.env.GITLAB_URL;
    const GITLAB_TOKEN = process.env.GITLAB_ACCESS_TOKEN;
    const PROJECTS_URL = GITLAB_URL + "/api/v4/projects";
    const payload = {
      name: projectName,
      description,
      namespace_id: groupId,
      visibility: 'private',
    };
    console.log('[GITLAB][CREATE-PROJECT] Payload:', payload);
    const res = await fetch(PROJECTS_URL, {
      method: 'POST',
      headers: {
        'PRIVATE-TOKEN': GITLAB_TOKEN || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('[GITLAB][CREATE-PROJECT] Error:', err);
      return NextResponse.json({ error: 'GitLab project creation failed', details: err }, { status: 500 });
    }
    const data = await res.json();
    const projectId = data.id;

    // Add maintainers (access_level 40) and developers (access_level 30)
    await addProjectMembers(projectId, maintainers, 40, GITLAB_URL, GITLAB_TOKEN);
    await addProjectMembers(projectId, developers, 30, GITLAB_URL, GITLAB_TOKEN);

    // Set custom attributes (techStack, tags)
    await setCustomAttributes(projectId, { techStack, tags: tags.join(',') }, GITLAB_URL, GITLAB_TOKEN);

    // Protect main branch
    await createInitialCommit(projectId, GITLAB_URL, GITLAB_TOKEN);

    await protectMainBranch(projectId, GITLAB_URL, GITLAB_TOKEN);

    return NextResponse.json({ success: true, project: data });
  } catch (err) {
    console.error('[GITLAB][CREATE-PROJECT] Exception:', err);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

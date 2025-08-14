import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Helper to add members
async function addProjectMembers(projectId, emails, accessLevel, gitlabUrl, token) {
  for (const email of emails) {
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

// Helper: create README dynamically
async function createReadme(projectId, projectName, gitlabUrl, token) {
  const readmeContent = `# ${projectName}

## Project Architecture

\`\`\`
/src
  /components
  /pages
  /services
  /utils
\`\`\`

This project is built with the defined architecture above.
`;

  await fetch(`${gitlabUrl}/api/v4/projects/${projectId}/repository/files/README.md`, {
    method: 'POST',
    headers: { 'PRIVATE-TOKEN': token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      branch: 'main',
      content: readmeContent,
      commit_message: 'Add README.md'
    })
  });
}

// Helper: push all files from boilerplate folder
async function pushBoilerplateFiles(projectId, gitlabUrl, token) {
  const boilerplatePath = path.join(process.cwd(), 'src', 'app', 'boilerplate');

  const files = fs.readdirSync(boilerplatePath, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(boilerplatePath, file.name);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    await fetch(`${gitlabUrl}/api/v4/projects/${projectId}/repository/files/${encodeURIComponent(file.name)}`, {
      method: 'POST',
      headers: { 'PRIVATE-TOKEN': token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        branch: 'main',
        content: fileContent,
        commit_message: `Add ${file.name} from boilerplate`
      })
    });
  }
}

// Helper: protect main branch
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

    // Parse arrays
    tags = Array.isArray(tags) ? tags : (typeof tags === 'string' ? JSON.parse(tags || '[]') : []);
    maintainers = Array.isArray(maintainers) ? maintainers : (typeof maintainers === 'string' ? JSON.parse(maintainers || '[]') : []);
    developers = Array.isArray(developers) ? developers : (typeof developers === 'string' ? JSON.parse(developers || '[]') : []);

    if (!groupId || !projectName || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (typeof groupId === 'string') groupId = parseInt(groupId, 10);
    if (typeof groupId !== 'number' || isNaN(groupId)) {
      return NextResponse.json({ error: 'Invalid groupId/namespace_id' }, { status: 400 });
    }

    const GITLAB_URL = process.env.GITLAB_URL!;
    const GITLAB_TOKEN = process.env.GITLAB_ACCESS_TOKEN!;
    const PROJECTS_URL = `${GITLAB_URL}/api/v4/projects`;

    // Create project
    const res = await fetch(PROJECTS_URL, {
      method: 'POST',
      headers: { 'PRIVATE-TOKEN': GITLAB_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: projectName,
        description,
        namespace_id: groupId,
        visibility: 'private',
      })
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[GITLAB][CREATE-PROJECT] Error:', err);
      return NextResponse.json({ error: 'GitLab project creation failed', details: err }, { status: 500 });
    }

    const projectData = await res.json();
    const projectId = projectData.id;

    // Add members
    await addProjectMembers(projectId, maintainers, 40, GITLAB_URL, GITLAB_TOKEN);
    await addProjectMembers(projectId, developers, 30, GITLAB_URL, GITLAB_TOKEN);

    // Push boilerplate
    await pushBoilerplateFiles(projectId, GITLAB_URL, GITLAB_TOKEN);

    // Create dynamic README
    await createReadme(projectId, projectName, GITLAB_URL, GITLAB_TOKEN);

    // Protect main
    await protectMainBranch(projectId, GITLAB_URL, GITLAB_TOKEN);

    return NextResponse.json({ success: true, project: projectData });

  } catch (err) {
    console.error('[GITLAB][CREATE-PROJECT] Exception:', err);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

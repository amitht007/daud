import { dbHelpers } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'


// POST /api/gitlab/project-request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[PROJECT REQUEST][POST] Received body:', body);
    const email = body.email;
    const group_name = body.group_name || body.group || '';
    const group_id = body.group_id || body.groupId || '';
    const description = body.description;
    const project_name = body.project_name || body.projectName;
    if (!email || !group_name || !group_id || !description || !project_name) {
      console.error('[PROJECT REQUEST][POST] Missing required fields:', { email, group_name, group_id, description, project_name });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const result = dbHelpers.createGitlabProjectRequest({
      email,
      group_name,
      group_id,
      description,
      project_name,
      status: 'pending',
    });
    if (!result) {
      console.error('[PROJECT REQUEST][POST] Failed to insert request');
      return NextResponse.json({ error: 'Failed to insert request' }, { status: 500 });
    }
    console.log('[PROJECT REQUEST][POST] Inserted request:', result);
    return NextResponse.json({ success: true, request: result });
  } catch (err) {
    console.error('[PROJECT REQUEST][POST] Error:', err);
    return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
  }
}

// GET /api/gitlab/project-request
export async function GET() {
  try {
    const requests = dbHelpers.getGitlabProjectRequestsByStatus('all');
    console.log('[PROJECT REQUEST][GET] Returning requests:', requests);
    return NextResponse.json({ requests });
  } catch (err) {
    console.error('[PROJECT REQUEST][GET] Error:', err);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}

// PATCH /api/gitlab/project-request
export async function PATCH(req: NextRequest) {
  try {
    const { id, status, reviewedBy, rejectionReason } = await req.json();
    console.log('[PROJECT REQUEST][PATCH] Received:', { id, status, reviewedBy, rejectionReason });
    if (!id || !status || !reviewedBy) {
      console.error('[PROJECT REQUEST][PATCH] Missing required fields:', { id, status, reviewedBy });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    let updateResult;
    if (status === 'approved') {
      // Approve: update status and trigger project creation
      updateResult = dbHelpers.updateGitlabProjectRequestStatus(id, 'approved', reviewedBy, null);
      console.log('[PROJECT REQUEST][PATCH] Approved request, now creating project...');
      // TODO: Call GitLab project creation logic here
    } else if (status === 'rejected') {
      updateResult = dbHelpers.updateGitlabProjectRequestStatus(id, 'rejected', reviewedBy, rejectionReason || '');
      console.log('[PROJECT REQUEST][PATCH] Rejected request');
    } else {
      console.error('[PROJECT REQUEST][PATCH] Invalid status:', status);
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    if (!updateResult) {
      console.error('[PROJECT REQUEST][PATCH] Failed to update request status');
      return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[PROJECT REQUEST][PATCH] Error:', err);
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}

"use client"
// ...existing code replaced by the correct, working implementation below...
import { useEffect, useState } from "react"
import RequireAuth from "@/components/auth/RequireAuth"

type Request = {
  id: number
  email: string
  group_name: string
  group_id: string
  description: string
  project_name: string
  status: string
  created_at?: string
  updated_at?: string
  approved_by?: string
  approved_at?: string
  rejected_by?: string
  rejected_at?: string
  rejection_reason?: string
}

export default function ProjectRequestsPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>("pending")
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [remark, setRemark] = useState<string>("")
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  useEffect(() => {
    fetchRequests()
  }, [])

  async function fetchRequests() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/gitlab/project-request")
      if (!res.ok) throw new Error("Failed to fetch requests")
      const data = await res.json()
      setRequests(data.requests || [])
    } catch (err: any) {
      setError(err.message || "Failed to fetch requests")
    }
    setLoading(false)
  }

  async function handleAction(request: Request, status: "approved" | "rejected") {
    setActionLoading(request.id);
    setError("");
    setSuccess("");
    try {
      // PATCH request to update status
      const patchRes = await fetch("/api/gitlab/project-request", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: request.id,
          status,
          reviewedBy: "admin", // TODO: use session user
          remark: remark || undefined,
        })
      });
      if (!patchRes.ok) throw new Error("Failed to update request status");

      // If approved, trigger GitLab project creation
      if (status === "approved") {
        const createRes = await fetch("/api/gitlab/create-project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupId: request.group_id,
            projectName: request.project_name,
            description: request.description,
            maintainers: JSON.parse(request.maintainers || "[]"),
            developers: JSON.parse(request.developers || "[]"),
            techStack: request.techStack || "",
            tags: JSON.parse(request.tags || "[]"),
          })
        });
        if (!createRes.ok) {
          const errText = await createRes.text();
          throw new Error("GitLab project creation failed: " + errText);
        }
        setSuccess("Project approved and created in GitLab!");
      } else {
        setSuccess("Project request rejected.");
      }
      // Remove the request from the UI immediately (pending tab)
      setRequests(prev => prev.filter(r => r.id !== request.id));
      setRemark("");
      // Optionally, refetch all requests to update other tabs
      setTimeout(() => fetchRequests(), 500);
    } catch (err: any) {
      setError(err.message || "Action failed");
    }
    setActionLoading(null);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700/50"
      case "approved":
        return "bg-green-900/30 text-green-400 border-green-700/50"
      case "rejected":
        return "bg-red-900/30 text-red-400 border-red-700/50"
      default:
        return "bg-slate-900/30 text-slate-400 border-slate-700/50"
    }
  }

  const filteredRequests = requests.filter(r => r.status === activeTab)

  return (
    <RequireAuth role="admin">
      <div className="px-8 py-8 max-md:px-4">
        <h1 className="text-3xl font-bold text-slate-100 mb-6">GitLab Project Approvals</h1>
        <div className="flex gap-4 mb-6">
          {["pending", "approved", "rejected"].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === tab ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-slate-300">Loading...</div>
        ) : error ? (
          <div className="text-red-400 mb-4">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-700 rounded-lg">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="py-2 px-4 text-slate-300">ID</th>
                  <th className="py-2 px-4 text-slate-300">Email</th>
                  <th className="py-2 px-4 text-slate-300">Group</th>
                  <th className="py-2 px-4 text-slate-300">Project</th>
                  <th className="py-2 px-4 text-slate-300">Description</th>
                  <th className="py-2 px-4 text-slate-300">Status</th>
                  <th className="py-2 px-4 text-slate-300">Created</th>
                  <th className="py-2 px-4 text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr><td colSpan={8} className="text-center text-slate-400 py-6">No requests</td></tr>
                ) : filteredRequests.map(req => (
                  <tr key={req.id} className="border-b border-slate-700/50">
                    <td className="py-2 px-4 text-slate-100">{req.id}</td>
                    <td className="py-2 px-4 text-slate-100">{req.email}</td>
                    <td className="py-2 px-4 text-slate-100">{req.group_name || req.group_id}</td>
                    <td className="py-2 px-4 text-slate-100">{req.project_name}</td>
                    <td className="py-2 px-4 text-slate-100 max-w-xs truncate" title={req.description}>{req.description}</td>
                    <td className={`py-2 px-4 font-semibold border rounded ${getStatusColor(req.status)}`}>{req.status}</td>
                    <td className="py-2 px-4 text-slate-300 text-xs">{req.created_at ? new Date(req.created_at).toLocaleString() : "-"}</td>
                    <td className="py-2 px-4">
                      {req.status === "pending" && (
                        <div className="flex flex-col gap-2">
                          <textarea
                            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs mb-1"
                            placeholder="Remarks (optional)"
                            value={actionLoading === req.id ? remark : ""}
                            onChange={e => setRemark(e.target.value)}
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1 rounded bg-green-700 text-white text-xs font-semibold hover:bg-green-800 disabled:opacity-50"
                              disabled={actionLoading === req.id}
                              onClick={() => handleAction(req, "approved")}
                            >{actionLoading === req.id ? "Approving..." : "Approve"}</button>
                            <button
                              className="px-3 py-1 rounded bg-red-700 text-white text-xs font-semibold hover:bg-red-800 disabled:opacity-50"
                              disabled={actionLoading === req.id}
                              onClick={() => handleAction(req, "rejected")}
                            >{actionLoading === req.id ? "Rejecting..." : "Reject"}</button>
                          </div>
                        </div>
                      )}
                      {req.status === "approved" && (
                        <div className="text-green-400 text-xs">Approved by {req.approved_by || "-"} <br />at {req.approved_at ? new Date(req.approved_at).toLocaleString() : "-"}</div>
                      )}
                      {req.status === "rejected" && (
                        <div className="text-red-400 text-xs">Rejected by {req.rejected_by || "-"} <br />at {req.rejected_at ? new Date(req.rejected_at).toLocaleString() : "-"}<br />Reason: {req.rejection_reason || "-"}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {success && <div className="text-green-400 mt-4">{success}</div>}
        {error && <div className="text-red-400 mt-4">{error}</div>}
      </div>
    </RequireAuth>
  )
}
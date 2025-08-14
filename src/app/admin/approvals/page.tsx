"use client"
import { useEffect, useState } from "react"

type Request = {
  _id: string
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
  maintainers?: string
  developers?: string
  techStack?: string
  tags?: string
}

export default function ProjectRequestsPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>("pending")
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [remark, setRemark] = useState<string>("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)
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
    setActionLoading(request._id)
    setError("")
    setSuccess("")
    try {
      // PATCH request to update status
      const patchRes = await fetch("/api/gitlab/project-request", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: request._id,
          status,
          reviewedBy: "admin", // TODO: use session user
          remark: remark || undefined,
        })
      })
      if (!patchRes.ok) throw new Error("Failed to update request status")

      // If approved, trigger GitLab project creation
      if (status === "approved") {
        const createRes = await fetch("/api/gitlab/create-project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupId: request.group_id,
            projectName: request.project_name,
            description: request.description,
            maintainers: request.maintainers ? JSON.parse(request.maintainers) : [],
            developers: request.developers ? JSON.parse(request.developers) : [],
            techStack: request.techStack || "",
            tags: request.tags ? JSON.parse(request.tags) : [],
          })
        })
        if (!createRes.ok) {
          const errText = await createRes.text()
          throw new Error("GitLab project creation failed: " + errText)
        }
        setSuccess("Project approved and created in GitLab!")
      } else {
        setSuccess("Project request rejected.")
      }

      // Remove the request from the UI immediately (pending tab)
      setRequests(prev => prev.filter(r => r._id !== request._id))
      setRemark("")

      // Optionally, refetch all requests to update other tabs
      setTimeout(() => fetchRequests(), 500)
    } catch (err: any) {
      setError(err.message || "Action failed")
    }
    setActionLoading(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700/50"
      case "approved":
        return "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700/50"
      case "rejected":
        return "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700/50"
      default:
        return "bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700/50"
    }
  }

  const filteredRequests = requests.filter(r => r.status === activeTab)

  return (
    <div className="min-h-screen bg-gray-2 dark:bg-[#020d1a] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">GitLab Project Approvals</h1>
          <p className="text-dark-4 dark:text-dark-6">Review and manage GitLab project requests from your team.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {["pending", "approved", "rejected"].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-[7px] font-medium text-sm transition-all duration-200 ${
                activeTab === tab 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-white dark:bg-gray-dark text-dark dark:text-white border border-stroke dark:border-dark-3 hover:bg-gray-1 dark:hover:bg-dark-2"
              }`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({requests.filter(r => r.status === tab).length})
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-dark rounded-[10px] shadow-1 dark:shadow-card border border-stroke dark:border-dark-3">
          {loading ? (
            <div className="p-8 text-center">
              <div className="text-dark-4 dark:text-dark-6">Loading requests...</div>
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-[7px]">
                <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stroke dark:border-dark-3">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-dark dark:text-white">Request ID</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-dark dark:text-white">Email</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-dark dark:text-white">Group</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-dark dark:text-white">Project</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-dark dark:text-white">Description</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-dark dark:text-white">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-dark dark:text-white">Created</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-dark dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12">
                        <div className="text-dark-4 dark:text-dark-6">
                          No {activeTab} requests found
                        </div>
                      </td>
                    </tr>
                  ) : filteredRequests.map((req, index) => (
                    <tr key={req._id} className={`${index !== filteredRequests.length - 1 ? 'border-b border-stroke dark:border-dark-3' : ''} hover:bg-gray-1 dark:hover:bg-dark-2 transition-colors`}>
                      <td className="py-4 px-6">
                        <div className="text-sm text-dark dark:text-white font-mono">
                          {req._id.slice(-8)}...
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-dark dark:text-white">
                          {req.email}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-dark dark:text-white">
                          {req.group_name || req.group_id}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-dark dark:text-white">
                          {req.project_name}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-dark dark:text-white max-w-xs">
                          <div className="truncate" title={req.description}>
                            {req.description}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-dark-4 dark:text-dark-6">
                          {req.created_at ? new Date(req.created_at).toLocaleDateString() : "-"}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {req.status === "pending" && (
                          <div className="space-y-3 min-w-[200px]">
                            <textarea
                              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-2 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary text-sm resize-none"
                              placeholder="Remarks (optional)"
                              value={actionLoading === req._id ? remark : ""}
                              onChange={e => setRemark(e.target.value)}
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <button
                                className="px-3 py-1.5 rounded-[7px] bg-green-600 text-white text-xs font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                disabled={actionLoading === req._id}
                                onClick={() => handleAction(req, "approved")}
                              >
                                {actionLoading === req._id ? "Approving..." : "Approve"}
                              </button>
                              <button
                                className="px-3 py-1.5 rounded-[7px] bg-red-600 text-white text-xs font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                disabled={actionLoading === req._id}
                                onClick={() => handleAction(req, "rejected")}
                              >
                                {actionLoading === req._id ? "Rejecting..." : "Reject"}
                              </button>
                            </div>
                          </div>
                        )}
                        {req.status === "approved" && (
                          <div className="text-xs space-y-1">
                            <div className="text-green-600 dark:text-green-400 font-medium">
                              Approved by {req.approved_by || "Admin"}
                            </div>
                            <div className="text-dark-4 dark:text-dark-6">
                              {req.approved_at ? new Date(req.approved_at).toLocaleDateString() : "-"}
                            </div>
                          </div>
                        )}
                        {req.status === "rejected" && (
                          <div className="text-xs space-y-1 max-w-[200px]">
                            <div className="text-red-600 dark:text-red-400 font-medium">
                              Rejected by {req.rejected_by || "Admin"}
                            </div>
                            <div className="text-dark-4 dark:text-dark-6">
                              {req.rejected_at ? new Date(req.rejected_at).toLocaleDateString() : "-"}
                            </div>
                            {req.rejection_reason && (
                              <div className="text-dark dark:text-white p-2 bg-gray-1 dark:bg-dark-2 rounded text-xs">
                                <strong>Reason:</strong> {req.rejection_reason}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Messages */}
        {success && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-[7px]">
            <div className="text-green-600 dark:text-green-400 text-sm">{success}</div>
          </div>
        )}
        {error && !loading && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-[7px]">
            <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
          </div>
        )}
      </div>
    </div>
  )
}
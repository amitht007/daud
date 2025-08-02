"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [requests, setRequests] = useState({
    pending: [
      {
        id: "REQ-001",
        user: "john.doe@company.com",
        type: "Infrastructure Deployment",
        description: "Deploy production web application with load balancer and auto-scaling",
        resources: "AWS EC2 (3x t3.large), ALB, Auto Scaling Group",
        estimatedCost: "$450/month",
        priority: "high",
        submittedAt: "2024-01-16 14:30",
        department: "Engineering",
      },
      {
        id: "REQ-002",
        user: "jane.smith@company.com",
        type: "Database Migration",
        description: "Migrate legacy MySQL database to RDS with read replicas",
        resources: "RDS MySQL 8.0 (db.r5.xlarge), 2x Read Replicas",
        estimatedCost: "$680/month",
        priority: "medium",
        submittedAt: "2024-01-16 16:45",
        department: "Data Team",
      },
      {
        id: "REQ-003",
        user: "mike.wilson@company.com",
        type: "Security Enhancement",
        description: "Implement WAF and DDoS protection for public-facing applications",
        resources: "AWS WAF, CloudFront, Shield Advanced",
        estimatedCost: "$320/month",
        priority: "high",
        submittedAt: "2024-01-17 09:15",
        department: "Security",
      },
    ],
    approved: [
      {
        id: "REQ-045",
        user: "sarah.johnson@company.com",
        type: "Development Environment",
        description: "Setup development environment for new microservice",
        resources: "AWS ECS Fargate, RDS PostgreSQL (dev)",
        estimatedCost: "$120/month",
        priority: "low",
        approvedAt: "2024-01-15 11:20",
        approvedBy: "admin",
        department: "Engineering",
      },
    ],
    rejected: [
      {
        id: "REQ-044",
        user: "tom.brown@company.com",
        type: "GPU Cluster",
        description: "High-performance GPU cluster for ML training",
        resources: "10x p3.8xlarge instances",
        estimatedCost: "$12,000/month",
        priority: "low",
        rejectedAt: "2024-01-14 16:30",
        rejectedBy: "admin",
        rejectionReason: "Budget exceeded - please submit cost optimization plan",
        department: "AI/ML",
      },
    ],
  })

  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/login")
    }
  }, [router])

  const handleApprove = (requestId) => {
    const request = requests.pending.find((r) => r.id === requestId)
    if (request) {
      setRequests((prev) => ({
        ...prev,
        pending: prev.pending.filter((r) => r.id !== requestId),
        approved: [...prev.approved, { ...request, approvedAt: new Date().toISOString(), approvedBy: "admin" }],
      }))
    }
  }

  const handleReject = (requestId, reason) => {
    const request = requests.pending.find((r) => r.id === requestId)
    if (request) {
      setRequests((prev) => ({
        ...prev,
        pending: prev.pending.filter((r) => r.id !== requestId),
        rejected: [
          ...prev.rejected,
          {
            ...request,
            rejectedAt: new Date().toISOString(),
            rejectedBy: "admin",
            rejectionReason: reason || "Request rejected",
          },
        ],
      }))
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-900/30 text-red-400 border-red-700/50"
      case "medium":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700/50"
      case "low":
        return "bg-green-900/30 text-green-400 border-green-700/50"
      default:
        return "bg-slate-900/30 text-slate-400 border-slate-700/50"
    }
  }

  const currentRequests = requests[activeTab] || []

  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">⏳ Request Approvals</h1>
          <p className="text-xl text-slate-300">Review and manage infrastructure requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-yellow-400 mb-2">{requests.pending.length}</div>
            <div className="text-slate-400 text-sm">Pending Approval</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-green-400 mb-2">{requests.approved.length}</div>
            <div className="text-slate-400 text-sm">Approved Today</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-red-400 mb-2">{requests.rejected.length}</div>
            <div className="text-slate-400 text-sm">Rejected Today</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg">
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:text-blue-400 hover:bg-slate-700/50"
                }`}
              >
                {tab} ({requests[tab]?.length || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {currentRequests.map((request) => (
            <div key={request.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-blue-400 text-lg">{request.id}</span>
                  <span
                    className={`px-3 py-1 rounded text-xs border font-medium ${getPriorityColor(request.priority)}`}
                  >
                    {request.priority} priority
                  </span>
                  <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs">{request.department}</span>
                </div>
                <div className="text-slate-400 text-sm">
                  {activeTab === "pending" && `Submitted: ${request.submittedAt}`}
                  {activeTab === "approved" && `Approved: ${request.approvedAt}`}
                  {activeTab === "rejected" && `Rejected: ${request.rejectedAt}`}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">{request.type}</h3>
                  <p className="text-slate-300 mb-4">{request.description}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-400 text-sm">Requested by: </span>
                      <span className="text-slate-100">{request.user}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Resources: </span>
                      <span className="text-slate-100">{request.resources}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Estimated Cost: </span>
                      <span className="text-cyan-400 font-medium">{request.estimatedCost}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  {activeTab === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id, "Request rejected by administrator")}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  )}

                  {activeTab === "approved" && (
                    <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                      <div className="text-green-400 font-medium mb-1">✓ Approved</div>
                      <div className="text-slate-400 text-sm">By: {request.approvedBy}</div>
                    </div>
                  )}

                  {activeTab === "rejected" && (
                    <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                      <div className="text-red-400 font-medium mb-1">✗ Rejected</div>
                      <div className="text-slate-400 text-sm mb-2">By: {request.rejectedBy}</div>
                      <div className="text-slate-300 text-sm">{request.rejectionReason}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {currentRequests.length === 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">No {activeTab} requests</h3>
              <p className="text-slate-400">All caught up! No {activeTab} requests at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

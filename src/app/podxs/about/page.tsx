"use client"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-slate-800/70 rounded-xl shadow-lg p-8 border border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">About podXs</h1>
        <div className="text-slate-400 text-base mb-6">In-house Cloud Development Platform</div>
        <p className="text-slate-200 text-lg mb-4">
          <span className="font-semibold text-cyan-400">podXs</span> is an <span className="text-green-400 font-semibold">in-house</span> cloud development environment platform, inspired by solutions like <span className="text-purple-400 font-semibold">Gitpod</span>, but purpose-built for our organization’s unique workflows, privacy, and security needs.
        </p>
        <p className="text-slate-300 mb-4">
          With podXs, teams can instantly launch ready-to-code, containerized workspaces, collaborate securely, and manage infrastructure resources—all within a modern, unified interface. Unlike public SaaS offerings, podXs is fully managed and operated internally, ensuring compliance, privacy, and seamless integration with our internal systems.
        </p>
        <ul className="list-disc pl-6 text-slate-300 mb-4 space-y-2">
          <li>
            <span className="text-blue-300 font-medium">On-Demand Workspaces:</span> Launch isolated, pre-configured development environments in seconds for any project or team.
          </li>
          <li>
            <span className="text-green-300 font-medium">In-House Security:</span> All data and compute remain within our private infrastructure, meeting strict compliance and security requirements.
          </li>
          <li>
            <span className="text-purple-300 font-medium">Role-Based Access:</span> Admins and users have clear, secure boundaries for approvals, monitoring, and collaboration.
          </li>
          <li>
            <span className="text-yellow-300 font-medium">Modern UI:</span> Enjoy a sleek, dark-themed interface with intuitive navigation and real-time insights.
          </li>
        </ul>
        <p className="text-slate-400">
          podXs empowers our developers and operations teams to work efficiently, securely, and collaboratively—bringing the power of cloud workspaces in-house, with the flexibility and control only an internal platform can provide.
        </p>
      </div>
    </div>
  );
}
"use client"

import { useState } from "react"

const vulnerabilities = [
  {
    id: "CVE-2023-1234",
    severity: "HIGH",
    package: "nginx:1.20.1",
    description: "Buffer overflow vulnerability in HTTP request processing",
    fixedVersion: "1.20.2",
    status: "open",
  },
  {
    id: "CVE-2023-5678",
    severity: "MEDIUM",
    package: "openssl:1.1.1k",
    description: "Information disclosure in SSL/TLS handshake",
    fixedVersion: "1.1.1l",
    status: "fixed",
  },
  {
    id: "CVE-2023-9012",
    severity: "CRITICAL",
    package: "apache:2.4.41",
    description: "Remote code execution in mod_rewrite",
    fixedVersion: "2.4.54",
    status: "open",
  },
]

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState("vulnerabilities")

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-900/30 text-red-400 border-red-700/50"
      case "HIGH":
        return "bg-orange-900/30 text-orange-400 border-orange-700/50"
      case "MEDIUM":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700/50"
      case "LOW":
        return "bg-blue-900/30 text-blue-400 border-blue-700/50"
      default:
        return "bg-slate-900/30 text-slate-400 border-slate-700/50"
    }
  }

  return (
    // <div className="px-8 py-8 max-md:px-4">
    //   <div className="max-w-7xl mx-auto">
    //     {/* Header */}
    //     <div className="mb-8">
    //       <h1 className="text-4xl font-bold text-slate-100 mb-4">🛡️ Trivy Security Scanner</h1>
    //       <p className="text-xl text-slate-300">
    //         Comprehensive vulnerability scanning and security analysis for your infrastructure
    //       </p>
    //     </div>

    //     {/* Stats */}
    //     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    //       <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
    //         <div className="text-2xl font-bold text-red-400 mb-2">3</div>
    //         <div className="text-slate-400 text-sm">Critical Issues</div>
    //       </div>
    //       <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
    //         <div className="text-2xl font-bold text-orange-400 mb-2">12</div>
    //         <div className="text-slate-400 text-sm">High Severity</div>
    //       </div>
    //       <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
    //         <div className="text-2xl font-bold text-green-400 mb-2">247</div>
    //         <div className="text-slate-400 text-sm">Images Scanned</div>
    //       </div>
    //       <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
    //         <div className="text-2xl font-bold text-blue-400 mb-2">98.2%</div>
    //         <div className="text-slate-400 text-sm">Security Score</div>
    //       </div>
    //     </div>

    //     {/* Tabs */}
    //     <div className="mb-8">
    //       <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg">
    //         {["vulnerabilities", "compliance", "secrets", "licenses"].map((tab) => (
    //           <button
    //             key={tab}
    //             onClick={() => setActiveTab(tab)}
    //             className={`px-4 py-2 rounded-md font-medium transition-all duration-300 capitalize ${
    //               activeTab === tab
    //                 ? "bg-blue-600 text-white"
    //                 : "text-slate-300 hover:text-blue-400 hover:bg-slate-700/50"
    //             }`}
    //           >
    //             {tab}
    //           </button>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Content */}
    //     {activeTab === "vulnerabilities" && (
    //       <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
    //         <div className="p-6 border-b border-slate-700">
    //           <h2 className="text-2xl font-bold text-slate-100">Vulnerability Report</h2>
    //         </div>
    //         <div className="p-6">
    //           <div className="space-y-4">
    //             {vulnerabilities.map((vuln) => (
    //               <div
    //                 key={vuln.id}
    //                 className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-blue-500/50 transition-all duration-300"
    //               >
    //                 <div className="flex items-start justify-between mb-3">
    //                   <div className="flex items-center space-x-3">
    //                     <span
    //                       className={`px-2 py-1 rounded text-xs font-bold border ${getSeverityColor(vuln.severity)}`}
    //                     >
    //                       {vuln.severity}
    //                     </span>
    //                     <span className="font-mono text-blue-400">{vuln.id}</span>
    //                     <span
    //                       className={`px-2 py-1 rounded text-xs ${
    //                         vuln.status === "fixed" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
    //                       }`}
    //                     >
    //                       {vuln.status}
    //                     </span>
    //                   </div>
    //                 </div>
    //                 <div className="mb-2">
    //                   <span className="text-slate-300 font-medium">Package: </span>
    //                   <span className="font-mono text-cyan-400">{vuln.package}</span>
    //                 </div>
    //                 <div className="mb-2">
    //                   <span className="text-slate-300 font-medium">Description: </span>
    //                   <span className="text-slate-400">{vuln.description}</span>
    //                 </div>
    //                 <div>
    //                   <span className="text-slate-300 font-medium">Fixed in: </span>
    //                   <span className="font-mono text-green-400">{vuln.fixedVersion}</span>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {activeTab === "compliance" && (
    //       <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
    //         <div className="text-center">
    //           <div className="text-6xl mb-4">📋</div>
    //           <h3 className="text-2xl font-bold text-slate-100 mb-4">Compliance Dashboard</h3>
    //           <p className="text-slate-300">Security compliance checks and policy validation</p>
    //         </div>
    //       </div>
    //     )}

    //     {activeTab === "secrets" && (
    //       <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
    //         <div className="text-center">
    //           <div className="text-6xl mb-4">🔐</div>
    //           <h3 className="text-2xl font-bold text-slate-100 mb-4">Secret Detection</h3>
    //           <p className="text-slate-300">Scan for exposed secrets and credentials</p>
    //         </div>
    //       </div>
    //     )}

    //     {activeTab === "licenses" && (
    //       <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
    //         <div className="text-center">
    //           <div className="text-6xl mb-4">📄</div>
    //           <h3 className="text-2xl font-bold text-slate-100 mb-4">License Compliance</h3>
    //           <p className="text-slate-300">Track and manage software licenses</p>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="flex items-center top-20 justify-center h-screen bg-gray-900">
    <h1 class="text-7xl mt-20 font-extrabold">Coming Soon !!!</h1>
   </div>
  )
}

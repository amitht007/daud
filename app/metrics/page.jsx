"use client"

import { useState } from "react"

export default function MetricsPage() {
  const [timeRange, setTimeRange] = useState("24h")

  const metrics = [
    { name: "CPU Usage", value: "67%", change: "+2.3%", trend: "up" },
    { name: "Memory Usage", value: "45%", change: "-1.2%", trend: "down" },
    { name: "Network I/O", value: "1.2 GB/s", change: "+5.7%", trend: "up" },
    { name: "Disk Usage", value: "78%", change: "+0.8%", trend: "up" },
  ]

  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 mb-4">📈 Metrics Board</h1>
            <p className="text-xl text-slate-300">Real-time infrastructure performance metrics and analytics</p>
          </div>
          <div className="flex gap-2">
            {["1h", "24h", "7d", "30d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  timeRange === range ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-slate-400 text-sm font-medium">{metric.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    metric.trend === "up" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-100">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-slate-100 mb-4">System Performance</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-slate-400">Performance chart visualization</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-slate-100 mb-4">Resource Utilization</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-slate-400">Resource usage trends</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-slate-100">Detailed Metrics</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Service</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">CPU</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Memory</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Uptime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-100">API Gateway</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">Healthy</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">23%</td>
                    <td className="py-3 px-4 text-slate-300">512MB</td>
                    <td className="py-3 px-4 text-slate-300">99.9%</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-100">Database</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">Healthy</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">45%</td>
                    <td className="py-3 px-4 text-slate-300">2.1GB</td>
                    <td className="py-3 px-4 text-slate-300">99.8%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-100">Load Balancer</td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded text-xs">Warning</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">78%</td>
                    <td className="py-3 px-4 text-slate-300">1.5GB</td>
                    <td className="py-3 px-4 text-slate-300">98.2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

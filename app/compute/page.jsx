export default function ComputePage() {
  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">💻 Compute Units</h1>
          <p className="text-xl text-slate-300">Manage your virtual machines, containers, and serverless functions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-blue-400 mb-2">24</div>
            <div className="text-slate-400 text-sm">Active Instances</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-cyan-400 mb-2">67%</div>
            <div className="text-slate-400 text-sm">CPU Utilization</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-green-400 mb-2">$1,240</div>
            <div className="text-slate-400 text-sm">Monthly Cost</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">💻</div>
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Compute Resource Management</h3>
            <p className="text-slate-300">Comprehensive compute resource monitoring and management dashboard</p>
          </div>
        </div>
      </div>
    </div>
  )
}

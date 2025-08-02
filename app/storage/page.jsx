export default function StoragePage() {
  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">💾 Storage Vault</h1>
          <p className="text-xl text-slate-300">Monitor and manage your storage resources and data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-blue-400 mb-2">2.4TB</div>
            <div className="text-slate-400 text-sm">Total Storage</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-cyan-400 mb-2">1.8TB</div>
            <div className="text-slate-400 text-sm">Used Space</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-purple-400 mb-2">75%</div>
            <div className="text-slate-400 text-sm">Utilization</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-green-400 mb-2">12</div>
            <div className="text-slate-400 text-sm">Volumes</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">💾</div>
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Storage Management</h3>
            <p className="text-slate-300">Advanced storage monitoring, backup management, and capacity planning</p>
          </div>
        </div>
      </div>
    </div>
  )
}

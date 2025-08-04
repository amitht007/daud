export default function InventoryPage() {
  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Infrastructure Inventory</h1>
          <p className="text-xl text-slate-300">Comprehensive view of all your infrastructure resources and assets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Compute Resources</h3>
            <p className="text-slate-300 mb-4">Virtual machines, containers, and serverless functions</p>
            <div className="text-2xl font-bold text-blue-400">247</div>
            <div className="text-sm text-slate-400">Active instances</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="text-3xl mb-4">💾</div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Storage</h3>
            <p className="text-slate-300 mb-4">Block storage, object storage, and databases</p>
            <div className="text-2xl font-bold text-cyan-400">1.2TB</div>
            <div className="text-sm text-slate-400">Total capacity</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Network</h3>
            <p className="text-slate-300 mb-4">Load balancers, VPCs, and security groups</p>
            <div className="text-2xl font-bold text-purple-400">89</div>
            <div className="text-sm text-slate-400">Network components</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-slate-100">Resource Overview</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Detailed Inventory Coming Soon</h3>
              <p className="text-slate-300">
                We're building a comprehensive inventory management system with real-time resource tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

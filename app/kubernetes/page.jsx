export default function KubernetesPage() {
  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">☸️ K8s Command</h1>
          <p className="text-xl text-slate-300">Kubernetes cluster management and orchestration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-blue-400 mb-2">3</div>
            <div className="text-slate-400 text-sm">Clusters</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-cyan-400 mb-2">47</div>
            <div className="text-slate-400 text-sm">Pods Running</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-purple-400 mb-2">12</div>
            <div className="text-slate-400 text-sm">Services</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-green-400 mb-2">8</div>
            <div className="text-slate-400 text-sm">Namespaces</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">☸️</div>
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Kubernetes Dashboard</h3>
            <p className="text-slate-300">
              Complete Kubernetes cluster monitoring, pod management, and deployment control
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

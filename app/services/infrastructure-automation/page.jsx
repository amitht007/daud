export default function InfrastructureAutomationPage() {
  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Infrastructure Automation</h1>
          <p className="text-xl text-slate-300">
            Streamline your infrastructure deployment with our automated provisioning tools.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Overview</h2>
          <p className="text-slate-300 mb-6">
            Our Infrastructure Automation service provides comprehensive tools for automated provisioning, deployment,
            and management of your infrastructure resources. Deploy, scale, and manage your resources with just a few
            clicks.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">Key Features</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Automated resource provisioning</li>
                <li>• Infrastructure as Code (IaC)</li>
                <li>• Multi-cloud support</li>
                <li>• Template-based deployments</li>
                <li>• Real-time monitoring</li>
              </ul>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">Benefits</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Reduced deployment time</li>
                <li>• Consistent environments</li>
                <li>• Lower operational costs</li>
                <li>• Improved reliability</li>
                <li>• Enhanced scalability</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Get Started</h2>
          <p className="text-slate-300 mb-6">
            Ready to automate your infrastructure? Contact our team to learn more about implementation.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  )
}

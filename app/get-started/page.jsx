export default function GetStartedPage() {
  const steps = [
    {
      number: "01",
      title: "Set Up Your Environment",
      description: "Configure your development environment and install required tools",
      tasks: ["Install Docker", "Set up kubectl", "Configure cloud CLI", "Install Terraform"],
    },
    {
      number: "02",
      title: "Choose Your Infrastructure",
      description: "Select from our pre-built templates or create your own",
      tasks: ["Browse Pattern Hub", "Select deployment model", "Configure parameters", "Review security settings"],
    },
    {
      number: "03",
      title: "Deploy & Monitor",
      description: "Deploy your infrastructure and set up monitoring",
      tasks: ["Execute deployment", "Configure monitoring", "Set up alerts", "Validate deployment"],
    },
  ]

  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">🚀 Get Started</h1>
          <p className="text-xl text-slate-300">
            Get up and running with our infrastructure platform in just a few steps
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-blue-400 mb-1">5 min</div>
            <div className="text-slate-400 text-sm">Average setup time</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-cyan-400 mb-1">3 steps</div>
            <div className="text-slate-400 text-sm">To first deployment</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
            <div className="text-slate-400 text-sm">Security compliant</div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <div className="flex items-start space-x-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-100 mb-3">{step.title}</h3>
                  <p className="text-slate-300 mb-4">{step.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-slate-300 text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Ready to Start?</h2>
          <p className="text-slate-300 mb-6">Choose your preferred way to get started with our platform.</p>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex-1">
              Quick Start Tutorial
            </button>
            <button className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex-1">
              Browse Templates
            </button>
            <button className="border border-slate-600 text-slate-300 hover:bg-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex-1">
              Read Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LearnMorePage() {
  const features = [
    {
      icon: "🏗️",
      title: "Infrastructure as Code",
      description: "Define and manage your infrastructure using declarative configuration files",
    },
    {
      icon: "🔄",
      title: "CI/CD Integration",
      description: "Seamlessly integrate with your existing development and deployment workflows",
    },
    {
      icon: "📊",
      title: "Real-time Monitoring",
      description: "Monitor your infrastructure health and performance with comprehensive dashboards",
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "Built-in security scanning, compliance checks, and access controls",
    },
    {
      icon: "☸️",
      title: "Kubernetes Native",
      description: "First-class support for Kubernetes deployments and container orchestration",
    },
    {
      icon: "🌐",
      title: "Multi-Cloud Support",
      description: "Deploy across AWS, Azure, GCP, and on-premises environments",
    },
  ]

  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">📚 Learn More</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover the full potential of our infrastructure platform and how it can transform your development
            workflow
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-700/50 rounded-xl p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-4">Why Choose Our Platform?</h2>
              <p className="text-slate-300 mb-6">
                Our infrastructure platform combines the power of modern DevOps practices with enterprise-grade security
                and reliability. Built for teams that need to move fast without compromising on quality.
              </p>
              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  Watch Demo
                </button>
                <button className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  Read Case Studies
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🚀</div>
              <div className="text-slate-400">Deploy with confidence</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-100 text-center mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-100 mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">For Developers</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Self-service infrastructure provisioning</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Pre-configured development environments</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Automated testing and deployment</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Real-time feedback and monitoring</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">For Operations</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Centralized infrastructure management</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Automated compliance and security</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Cost optimization and resource tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>24/7 monitoring and alerting</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-slate-100">Learning Resources</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">📖</div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Documentation</h3>
                <p className="text-slate-300 text-sm mb-4">Comprehensive guides and API references</p>
                <button className="text-blue-400 hover:text-blue-300 font-medium">Read Docs →</button>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎥</div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Video Tutorials</h3>
                <p className="text-slate-300 text-sm mb-4">Step-by-step video walkthroughs</p>
                <button className="text-blue-400 hover:text-blue-300 font-medium">Watch Videos →</button>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Community</h3>
                <p className="text-slate-300 text-sm mb-4">Join our developer community</p>
                <button className="text-blue-400 hover:text-blue-300 font-medium">Join Community →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

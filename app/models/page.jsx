"use client"

import { useState } from "react"

const models = [
  {
    id: "terraform-aws",
    name: "Terraform AWS Infrastructure",
    description: "Complete AWS infrastructure setup with VPC, subnets, security groups, and EC2 instances",
    category: "Infrastructure as Code",
    version: "v2.1.0",
    downloads: "15.2K",
    rating: 4.8,
    tags: ["Terraform", "AWS", "VPC", "EC2"],
    icon: "🏗️",
    status: "stable",
  },
  {
    id: "kubernetes-cluster",
    name: "Kubernetes Cluster Model",
    description: "Production-ready Kubernetes cluster with monitoring, logging, and security configurations",
    category: "Container Orchestration",
    version: "v1.8.3",
    downloads: "23.7K",
    rating: 4.9,
    tags: ["Kubernetes", "Docker", "Helm", "Monitoring"],
    icon: "☸️",
    status: "stable",
  },
  {
    id: "cicd-pipeline",
    name: "CI/CD Pipeline Template",
    description: "Complete CI/CD pipeline with automated testing, security scanning, and deployment",
    category: "DevOps",
    version: "v3.0.1",
    downloads: "18.9K",
    rating: 4.7,
    tags: ["Jenkins", "GitLab", "Docker", "Security"],
    icon: "🔄",
    status: "stable",
  },
  {
    id: "monitoring-stack",
    name: "Observability Stack",
    description: "Complete monitoring solution with Prometheus, Grafana, and alerting configurations",
    category: "Monitoring",
    version: "v2.5.2",
    downloads: "12.4K",
    rating: 4.6,
    tags: ["Prometheus", "Grafana", "AlertManager", "Jaeger"],
    icon: "📊",
    status: "stable",
  },
  {
    id: "security-baseline",
    name: "Security Baseline Model",
    description: "Security hardening templates with compliance checks and vulnerability scanning",
    category: "Security",
    version: "v1.9.0",
    downloads: "9.8K",
    rating: 4.8,
    tags: ["Security", "Compliance", "Trivy", "RBAC"],
    icon: "🔒",
    status: "stable",
  },
  {
    id: "serverless-api",
    name: "Serverless API Gateway",
    description: "Serverless API infrastructure with Lambda functions, API Gateway, and DynamoDB",
    category: "Serverless",
    version: "v1.4.1",
    downloads: "7.3K",
    rating: 4.5,
    tags: ["Lambda", "API Gateway", "DynamoDB", "CloudFormation"],
    icon: "⚡",
    status: "beta",
  },
]

const categories = [
  { id: "all", name: "All Models", count: models.length },
  { id: "infrastructure", name: "Infrastructure", count: 2 },
  { id: "container", name: "Containers", count: 1 },
  { id: "devops", name: "DevOps", count: 1 },
  { id: "monitoring", name: "Monitoring", count: 1 },
  { id: "security", name: "Security", count: 1 },
]

export default function ModelHubPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("downloads")

  const filteredModels = models
    .filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || model.category.toLowerCase().includes(selectedCategory)
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "downloads") return Number.parseFloat(b.downloads) - Number.parseFloat(a.downloads)
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="px-8 py-8 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Model Hub</h1>
          <p className="text-xl text-slate-300 mb-6">
            Pre-built infrastructure models and templates ready for deployment
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="downloads">Sort by Downloads</option>
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-blue-400 mb-2">{models.length}</div>
            <div className="text-slate-400 text-sm">Available Models</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-cyan-400 mb-2">87K+</div>
            <div className="text-slate-400 text-sm">Total Downloads</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-purple-400 mb-2">4.7</div>
            <div className="text-slate-400 text-sm">Average Rating</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-green-400 mb-2">99.2%</div>
            <div className="text-slate-400 text-sm">Success Rate</div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{model.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-400 transition-colors duration-300">
                      {model.name}
                    </h3>
                    <div className="text-sm text-slate-400">{model.category}</div>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    model.status === "stable"
                      ? "bg-green-900/30 text-green-400 border border-green-700/50"
                      : "bg-yellow-900/30 text-yellow-400 border border-yellow-700/50"
                  }`}
                >
                  {model.status}
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm mb-4 line-clamp-2">{model.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {model.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-900/30 text-blue-400 border border-blue-700/50 rounded px-2 py-1 text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
                {model.tags.length > 3 && <span className="text-slate-400 text-xs">+{model.tags.length - 3} more</span>}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-slate-400">
                    <span className="mr-1">📥</span>
                    {model.downloads}
                  </div>
                  <div className="flex items-center text-slate-400">
                    <span className="mr-1">⭐</span>
                    {model.rating}
                  </div>
                </div>
                <div className="text-slate-400">{model.version}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-all duration-300 text-sm">
                  Deploy
                </button>
                <button className="border border-slate-600 text-slate-300 hover:bg-slate-700 py-2 px-4 rounded font-medium transition-all duration-300 text-sm">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Infrastructure as Code</h3>
              <p className="text-slate-300 mb-4">Terraform, CloudFormation, and Pulumi templates</p>
              <div className="text-blue-400 font-medium">12 models</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-4">☸️</div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Kubernetes</h3>
              <p className="text-slate-300 mb-4">Container orchestration and deployment models</p>
              <div className="text-cyan-400 font-medium">8 models</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Security</h3>
              <p className="text-slate-300 mb-4">Security hardening and compliance templates</p>
              <div className="text-purple-400 font-medium">6 models</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Can't Find What You Need?</h2>
          <p className="text-slate-300 mb-6">
            Request a custom model or contribute your own infrastructure templates to the community.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
              Request Model
            </button>
            <button className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 px-6 py-3 rounded-lg font-medium transition-all duration-300">
              Contribute
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

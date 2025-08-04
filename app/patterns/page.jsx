"use client"

import { useState } from "react"
import { patterns } from "@/data/patterns"
import PatternCard from "@/components/ui/pattern-card"

export default function PatternHubPage() {
  const [expandedPattern, setExpandedPattern] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Patterns", count: patterns.length },
    { id: "architecture", name: "Architecture", count: 2 },
    { id: "deployment", name: "Deployment", count: 2 },
    { id: "monitoring", name: "Monitoring", count: 2 },
  ]

  const filteredPatterns = patterns.filter((pattern) => {
    const matchesSearch =
      pattern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || pattern.tags.some((tag) => tag.toLowerCase().includes(selectedCategory))
    return matchesSearch && matchesCategory
  })

  const handlePatternToggle = (index) => {
    if (expandedPattern === index) {
      setExpandedPattern(null)
      document.body.style.overflow = "auto"
    } else {
      setExpandedPattern(index)
      document.body.style.overflow = "hidden"
    }
  }

  const handlePatternClose = () => {
    setExpandedPattern(null)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="px-8 py-8 max-md:px-4">
      {/* Backdrop for expanded cards */}
      {expandedPattern !== null && <div className="fixed inset-0 bg-black/80 z-[1999]" onClick={handlePatternClose} />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Pattern Hub</h1>
          <p className="text-xl text-slate-300 mb-6">
            Discover and deploy proven infrastructure patterns for your applications
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search patterns..."
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
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-blue-400 mb-2">{patterns.length}</div>
            <div className="text-slate-400 text-sm">Total Patterns</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-cyan-400 mb-2">12K+</div>
            <div className="text-slate-400 text-sm">Deployments</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-purple-400 mb-2">98%</div>
            <div className="text-slate-400 text-sm">Success Rate</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="text-2xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-slate-400 text-sm">Support</div>
          </div>
        </div>

        {/* Featured Patterns */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Featured Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatterns.map((pattern, index) => (
              <PatternCard
                key={index}
                {...pattern}
                isExpanded={expandedPattern === index}
                onToggle={() => handlePatternToggle(index)}
                onClose={handlePatternClose}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Architecture Patterns</h3>
              <p className="text-slate-300 mb-4">Microservices, serverless, and distributed system patterns</p>
              <div className="text-blue-400 font-medium">2 patterns</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Deployment Patterns</h3>
              <p className="text-slate-300 mb-4">CI/CD, blue-green, and canary deployment strategies</p>
              <div className="text-cyan-400 font-medium">2 patterns</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Monitoring Patterns</h3>
              <p className="text-slate-300 mb-4">Observability, logging, and alerting patterns</p>
              <div className="text-purple-400 font-medium">2 patterns</div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Getting Started with Patterns</h2>
          <p className="text-slate-300 mb-6">
            New to infrastructure patterns? Start with our recommended patterns and best practices guide.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
              View Documentation
            </button>
            <button className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 px-6 py-3 rounded-lg font-medium transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

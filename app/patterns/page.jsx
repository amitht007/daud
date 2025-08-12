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
       <div className="flex items-center top-20 justify-center h-screen bg-gray-900">
    <h1 class="text-7xl mt-12 font-extrabold">Coming Soon !!!</h1>
   </div>
  )
}

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
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <h1 className="text-7xl mt-12 font-extrabold">Coming Soon !!!</h1>
    </div>
  )
}

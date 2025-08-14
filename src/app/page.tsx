"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Banner from "@/components/ui/banner"
import { setupCardAnimations } from "@/utils/animations"
// Add FAQSection import
import FAQSection from "./FAQSection"

export default function HomePage() {
  const [expandedPattern, setExpandedPattern] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const observer = setupCardAnimations()

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedPattern !== null) {
        setExpandedPattern(null)
        document.body.style.overflow = "auto"
      }
    }
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
      observer && observer.disconnect()
    }
  }, [expandedPattern])

  const handlePatternClose = () => {
    setExpandedPattern(null)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="bg-gray-2 dark:bg-[#020d1a] min-h-screen">
      {expandedPattern !== null && <div className="fixed inset-0 bg-black/80 z-[1999]" onClick={handlePatternClose} />}
      <Banner />

      <div className="w-full px-8 py-8 max-md:px-4">
        {/* Hero Section */}
        <section className="text-center py-16 max-md:py-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent max-md:text-4xl tracking-tight">
            Self Service Infra
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed max-md:text-lg">
            Empower your teams with automated infrastructure provisioning, deployment, and management.
            Build, scale, and secure your applications with enterprise-grade tools and best practices.
          </p>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-100">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-animate bg-slate-100/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-300 dark:border-slate-700 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Lightning Fast</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Deploy infrastructure in minutes, not hours. Our optimized workflows ensure rapid provisioning.
              </p>
            </div>
            <div className="card-animate bg-slate-100/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-300 dark:border-slate-700 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Enterprise Security</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Built-in security scanning, compliance checks, and audit trails for enterprise-grade protection.
              </p>
            </div>
            <div className="card-animate bg-slate-100/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-300 dark:border-slate-700 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Auto Scaling</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Intelligent auto-scaling based on demand ensures optimal performance and cost efficiency.
              </p>
            </div>
            <div className="card-animate bg-slate-100/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-300 dark:border-slate-700 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">DevOps Ready</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Seamless integration with your existing CI/CD pipelines and development workflows.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 max-w-4xl mx-auto">
          <FAQSection />
        </section>
      </div>
    </div>
  )
}

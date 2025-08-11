"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Banner from "@/components/ui/banner"
import ServiceCard from "@/components/ui/service-card"
import PatternCard from "@/components/ui/pattern-card"
import FAQItem from "@/components/ui/faq-item"
import { setupCardAnimations } from "@/utils/animations"
import { serviceCards } from "@/data/services"
import { patterns } from "@/data/patterns"
import { faqs } from "@/data/faqs"

export default function HomePage() {
  const [expandedPattern, setExpandedPattern] = useState<number | null>(null)
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Setup card animations
    const observer = setupCardAnimations()

    // Escape key handler for closing expanded pattern
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedPattern !== null) {
        setExpandedPattern(null)
        document.body.style.overflow = "auto"
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [expandedPattern])

  const handlePatternToggle = (index: number) => {
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

  const handleFAQToggle = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index)
  }

  const handleServiceClick = (route: string) => {
    router.push(route)
  }

  const handleGetStarted = () => {
    router.push("/login")
  }

  const handleLearnMore = () => {
    router.push("/learn-more")
  }

  // Public landing page
  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Backdrop for expanded cards */}
      {expandedPattern !== null && <div className="fixed inset-0 bg-black/80 z-[1999]" onClick={handlePatternClose} />}

      <Banner />

      {/* Content Container */}
      <div className="w-full px-8 py-8 max-md:px-4">
        {/* Hero Section */}
        <section className="text-center py-16 max-md:py-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent max-md:text-4xl tracking-tight">
            Self Service Infra
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed max-md:text-lg">
            Empower your teams with automated infrastructure provisioning, deployment, and management. Build, scale, and
            secure your applications with enterprise-grade tools and best practices.
          </p>
          {/*
           <div className="flex gap-4 justify-center max-md:flex-col max-md:items-center max-md:gap-3">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Started
            </button>
            <button
              onClick={handleLearnMore}
              className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Learn More
            </button>
          </div> */}
        </section>

        {/* Service Cards */}
        <section className="py-0">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-100">Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {serviceCards.map((card, index) => (
              <div key={index} onClick={() => handleServiceClick(card.route)}>
                <ServiceCard {...card} />
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-slate-400 text-sm font-medium">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">10K+</div>
              <div className="text-slate-400 text-sm font-medium">Deployments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-slate-400 text-sm font-medium">Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-slate-400 text-sm font-medium">Support</div>
            </div>
          </div>
        </section> */}

        {/* Features Grid */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-100">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-100">Lightning Fast</h3>
              <p className="text-slate-300">
                Deploy infrastructure in minutes, not hours. Our optimized workflows ensure rapid provisioning.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-100">Enterprise Security</h3>
              <p className="text-slate-300">
                Built-in security scanning, compliance checks, and audit trails for enterprise-grade protection.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-100">Auto Scaling</h3>
              <p className="text-slate-300">
                Intelligent auto-scaling based on demand ensures optimal performance and cost efficiency.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-100">DevOps Ready</h3>
              <p className="text-slate-300">
                Seamless integration with your existing CI/CD pipelines and development workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Patterns Section */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-100">Infrastructure Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {patterns.map((pattern, index) => (
              <PatternCard
                key={index}
                {...pattern}
                isExpanded={expandedPattern === index}
                onToggle={() => handlePatternToggle(index)}
                onClose={handlePatternClose}
              />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 max-w-4xl mx-auto max-md:p-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-slate-100 max-md:text-3xl">
              Frequently Asked Questions
            </h2>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isActive={activeFAQ === index}
                onToggle={() => handleFAQToggle(index)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
       
'use client'
import { useState } from 'react'

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What is Self Service Infrastructure?',
      answer: 'Self Service Infrastructure is a platform that enables developers and teams to independently provision, deploy, and manage infrastructure resources without requiring manual intervention from operations teams. It provides automated workflows, pre-configured templates, and standardized processes.'
    },
    {
      question: 'How does automated provisioning work?',
      answer: 'Automated provisioning uses Infrastructure as Code (IaC) principles to define and deploy resources programmatically. Users select from pre-approved templates, configure parameters, and the system automatically creates the required infrastructure using tools like Terraform, Ansible, or cloud-native APIs.'
    },
    {
      question: 'What security measures are in place?',
      answer: 'Our platform includes role-based access control, automated security scanning with Trivy, compliance checks, audit logging, and integration with security policies. All deployments undergo automated security validation before provisioning.'
    },
    {
      question: 'Can I customize infrastructure patterns?',
      answer: 'Yes, the Pattern Hub allows you to create, modify, and share custom infrastructure patterns. You can extend existing patterns or create entirely new ones based on your organization\'s requirements and best practices.'
    },
    {
      question: 'How is cost optimization handled?',
      answer: 'The platform includes automated cost optimization features such as resource right-sizing recommendations, idle resource detection, scheduled scaling policies, and detailed cost tracking with alerts when budgets are exceeded.'
    },
    {
      question: 'What monitoring capabilities are available?',
      answer: 'Comprehensive monitoring includes real-time metrics, custom dashboards, alerting, log aggregation, distributed tracing, and performance analytics. Integration with popular monitoring tools like Prometheus, Grafana, and ELK stack is supported.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="bg-white/90 dark:bg-zinc-900/80 backdrop-blur-lg rounded-2xl p-8 lg:p-12 shadow-2xl border border-slate-300 dark:border-white/10">
      <h2 className="text-4xl font-bold text-center text-slate-800 dark:text-white mb-12">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-slate-200 dark:border-white/10 last:border-b-0">
            <button
              className="w-full py-6 flex justify-between items-center text-left hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold text-slate-800 dark:text-white pr-4">{faq.question}</span>
              <span className={`text-purple-700 dark:text-purple-400 transition-transform duration-300 flex-shrink-0 ${openFAQ === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-48 pb-6' : 'max-h-0'}`}>
              <p className="text-slate-700 dark:text-zinc-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

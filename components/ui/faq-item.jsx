"use client"

export default function FAQItem({ question, answer, isActive, onToggle }) {
  return (
    <div className="border-b border-slate-700 mb-4 group">
      <div
        className="py-6 cursor-pointer flex justify-between items-center font-semibold text-slate-100 transition-all duration-300 hover:text-blue-400"
        onClick={onToggle}
      >
        <span className="text-sm pr-4">{question}</span>
        <div className="flex items-center">
          <span className={`transition-transform duration-300 text-blue-400 font-mono ${isActive ? "rotate-180" : ""}`}>
            ▼
          </span>
        </div>
      </div>
      <div
        className={`
        overflow-hidden transition-all duration-300 text-slate-300 leading-relaxed font-mono text-sm
        ${isActive ? "max-h-[200px] pb-6" : "max-h-0"}
      `}
      >
        <div className="border-l-2 border-blue-500/30 pl-4">{answer}</div>
      </div>
    </div>
  )
}

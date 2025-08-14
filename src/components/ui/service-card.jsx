"use client"

export default function ServiceCard({ icon, title, description }) {
  return (
    <div className="service-card group relative bg-slate-100/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 hover:border-blue-500/50">
      <div className="relative z-10 p-8">
        {/* Icon with gradient design */}
        <div className="relative w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 rounded-full"></div>
          <div className="relative w-full h-full flex items-center justify-center text-2xl text-white">{icon}</div>
        </div>

        {/* Title */}
        <div className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </div>

        {/* Description */}
        <div className="text-slate-800 dark:text-slate-100 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
          {description}
        </div>
      </div>
    </div>
  )
}

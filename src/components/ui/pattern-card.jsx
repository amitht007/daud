"use client"

export default function PatternCard({ icon, title, description, tags, thumbnailText, isExpanded, onToggle, onClose }) {
  return (
    <>
      <div
        className={`
          pattern-card group relative bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] border border-slate-700
          ${
            isExpanded
              ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-w-[700px] min-w-[400px] h-auto max-h-[80vh] z-[2000] overflow-y-auto shadow-2xl m-8 hover:transform hover:-translate-x-1/2 hover:-translate-y-1/2 hover:scale-100 max-lg:w-[70vw] max-md:w-[90vw] max-md:max-w-[90vw] max-md:max-h-[90vh] max-[480px]:w-[95vw] max-[480px]:max-h-[95vh]"
              : "hover:scale-[1.02] hover:border-blue-500/50"
          }
        `}
        onClick={onToggle}
      >
        {isExpanded && (
          <button
            className="absolute top-4 right-4 bg-red-600/80 border border-red-400/50 text-white w-8 h-8 rounded flex items-center justify-center cursor-pointer text-sm z-10 transition-all duration-300 hover:bg-red-500 hover:scale-110 font-mono"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            ×
          </button>
        )}

        {/* Header with gradient background */}
        <div
          className={`
          relative w-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 flex flex-col items-center justify-center text-white overflow-hidden
          ${isExpanded ? "h-[200px]" : "h-40"}
        `}
        >
          <div
            className={`relative z-10 transition-all duration-500 ${isExpanded ? "text-4xl" : "text-3xl group-hover:text-4xl"} mb-3 group-hover:scale-110`}
          >
            {icon}
          </div>
          <div
            className={`relative z-10 text-center px-4 transition-all duration-300 ${isExpanded ? "text-base" : "group-hover:text-base"} font-bold tracking-wide text-slate-100`}
          >
            {thumbnailText}
          </div>

          {/* Status indicators */}
          <div className="absolute top-3 left-3 flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <div className="text-xs text-green-400 font-mono">ACTIVE</div>
          </div>
        </div>

        <div
          className={`
          relative bg-slate-800/50 backdrop-blur-sm transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isExpanded ? "max-h-none p-6" : "max-h-0 overflow-hidden"}
        `}
        >
          <div
            className={`font-bold mb-3 text-slate-100 transition-all duration-300 tracking-wide ${isExpanded ? "text-lg mb-4" : "text-base"}`}
          >
            {title}
          </div>
          <div
            className={`text-slate-300 leading-relaxed mb-4 transition-all duration-300 ${isExpanded ? "text-sm leading-relaxed mb-6" : "text-xs"}`}
          >
            {description}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`bg-blue-900/30 text-blue-400 border border-blue-700/50 rounded font-mono font-medium transition-all duration-300 hover:bg-blue-800/30 hover:scale-105 ${isExpanded ? "px-3 py-1.5 text-xs" : "px-2 py-1 text-xs"}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-50"></div>
        </div>

        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </>
  )
}

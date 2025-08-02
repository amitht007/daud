"use client"

const bannerItems = [
  "Cloud Infrastructure Deployment",
  "Automated System Management",
  "Real-Time Data Analytics",
  "Advanced Security Protocols",
  "High-Performance Computing",
  "Cloud-Native Operations",
]

export default function Banner() {
  return (
    <div className="mt-20 bg-slate-800/90 backdrop-blur-md border-y border-slate-700 h-[60px] flex items-center relative overflow-hidden">
      <div className="flex animate-scroll-continuous whitespace-nowrap absolute">
        {bannerItems.map((item, index) => (
          <div
            key={`first-${index}`}
            className="text-blue-400 font-mono font-medium mx-16 text-base flex-shrink-0 uppercase tracking-wider"
          >
            {item}
          </div>
        ))}
        {bannerItems.map((item, index) => (
          <div
            key={`second-${index}`}
            className="text-blue-400 font-mono font-medium mx-16 text-base flex-shrink-0 uppercase tracking-wider"
          >
            {item}
          </div>
        ))}
        {bannerItems.map((item, index) => (
          <div
            key={`third-${index}`}
            className="text-blue-400 font-mono font-medium mx-16 text-base flex-shrink-0 uppercase tracking-wider"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400 text-xs font-mono uppercase">Operational</span>
      </div>
    </div>
  )
}

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
      {/* Animate the banner using a custom keyframes class */}
      <div className="flex absolute animate-banner-scroll whitespace-nowrap will-change-transform">
        {[...Array(3)].flatMap((_, i) =>
          bannerItems.map((item, index) => (
            <div
              key={`${i}-${index}`}
              className="text-blue-400 font-mono font-medium mx-16 text-base flex-shrink-0 uppercase tracking-wider"
            >
              {item}
            </div>
          ))
        )}
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400 text-xs font-mono uppercase">Operational</span>
      </div>
    </div>
  )
}

// Add this to your global CSS (e.g., src/css/style.css or tailwind config):
// @keyframes banner-scroll {
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-33.333%); }
// }
// .animate-banner-scroll {
//   animation: banner-scroll 30s linear infinite;
// }

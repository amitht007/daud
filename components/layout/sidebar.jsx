"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

const menuSections = [
  {
    title: "OVERVIEW",
    items: [
      { icon: "🏠", text: "Command Center", href: "/", active: true },
      { icon: "📊", text: "Analytics Hub", href: "/analytics" },
      { icon: "📈", text: "Metrics Board", href: "/metrics" },
    ],
  },
  // {
  //   title: "RESOURCES",
  //   items: [
  //     { icon: "💻", text: "Compute Units", href: "/compute" },
  //     { icon: "💾", text: "Storage Vault", href: "/storage" },
  //     { icon: "🌐", text: "Network Grid", href: "/network" },
  //     { icon: "🗄️", text: "Data Fortress", href: "/database" },
  //   ],
  // },
  // {
  //   title: "OPERATIONS",
  //   items: [
  //     { icon: "🚀", text: "Deploy Matrix", href: "/deploy" },
  //     { icon: "🔄", text: "Pipeline Control", href: "/pipeline" },
  //     { icon: "📦", text: "Container Bay", href: "/containers" },
  //     { icon: "☸️", text: "K8s Command", href: "/kubernetes" },
  //   ],
  // },
  // {
  //   title: "SECURITY",
  //   items: [
  //     { icon: "🔒", text: "Access Control", href: "/access" },
  //     { icon: "🛡️", text: "Threat Scanner", href: "/security" },
  //     { icon: "🔑", text: "Secret Vault", href: "/secrets" },
  //     { icon: "📋", text: "Compliance Check", href: "/compliance" },
  //   ],
  // },
  // {
  //   title: "SETTINGS",
  //   items: [
  //     { icon: "⚙️", text: "Core Settings", href: "/settings" },
  //     { icon: "👥", text: "Agent Registry", href: "/agents" },
  //     { icon: "🔔", text: "Alert System", href: "/alerts" },
  //   ],
  // },
]

export default function Sidebar({ isCollapsed, isMobileOpen, onToggle, onMobileClose }) {
  const pathname = usePathname()

  const handleItemClick = () => {
    if (window.innerWidth <= 768) {
      onMobileClose()
    }
  }

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={`
        fixed left-0 top-20 h-[calc(100vh-80px)] bg-slate-900/95 backdrop-blur-md border-r border-slate-700 z-[999] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isCollapsed ? "w-16" : "w-72"}
        ${isMobileOpen ? "translate-x-0" : "max-md:-translate-x-full"}
        max-md:w-72
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between relative z-10">
        <div
          className={`transition-all duration-300 overflow-hidden ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
        >
          <div className="text-lg font-bold text-slate-100 mb-1 whitespace-nowrap font-mono uppercase tracking-wider">
            CONTROL HUB
          </div>
          <div className="text-xs text-slate-400 whitespace-nowrap font-mono uppercase tracking-[0.15em]">
            INFRASTRUCTURE COMMAND
          </div>
        </div>
        <button
          onClick={onToggle}
          className="relative bg-slate-800 border border-slate-700 text-slate-400 cursor-pointer p-2 rounded transition-all duration-300 w-8 h-8 flex items-center justify-center hover:bg-slate-700 hover:scale-105 hover:border-blue-600/50 flex-shrink-0 group"
        >
          <span className="text-xs font-mono">{isCollapsed ? "▶" : "◀"}</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="py-4 h-[calc(100%-100px)] overflow-y-auto relative z-10 custom-scrollbar">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <div
              className={`text-xs font-bold text-slate-500 uppercase tracking-[0.2em] px-4 mb-3 transition-all duration-300 overflow-hidden font-mono ${
                isCollapsed ? "opacity-0 h-0" : "opacity-100 h-auto"
              }`}
            >
              {section.title}
            </div>
            {section.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={item.href}
                onClick={handleItemClick}
                className={`
                  relative flex items-center py-3 text-slate-400 no-underline transition-all duration-300 cursor-pointer group font-mono
                  ${
                    isActive(item.href)
                      ? "bg-blue-900/30 text-blue-400 border-r-2 border-blue-400"
                      : "hover:bg-slate-800/50 hover:text-blue-400"
                  }
                  ${isCollapsed ? "justify-center px-2" : "px-4"}
                `}
              >
                {/* Active indicator */}
                {isActive(item.href) && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-cyan-400"></div>
                )}

                <span className={`text-lg transition-all duration-300 ${isCollapsed ? "mr-0" : "mr-3"}`}>
                  {item.icon}
                </span>
                <span
                  className={`transition-all duration-300 whitespace-nowrap overflow-hidden text-sm uppercase tracking-wider ${
                    isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  {item.text}
                </span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 backdrop-blur-sm text-slate-300 text-sm rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 font-mono uppercase tracking-wider">
                    {item.text}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom status indicator */}
      <div
        className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}
      >
        <div className="bg-slate-800/50 border border-green-700 rounded px-3 py-2 flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
          <span className="text-green-400 text-xs font-mono uppercase tracking-wider">SYSTEM ONLINE</span>
        </div>
      </div>
    </aside>
  )
}

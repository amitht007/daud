"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"
import Footer from "@/components/layout/footer"
import { setupSmoothScrolling, setupNavbarScrollEffect } from "@/utils/animations"

export default function ClientLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    setupSmoothScrolling()
    const navbarCleanup = setupNavbarScrollEffect()

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (navbarCleanup) navbarCleanup()
    }
  }, [])

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleMobileSidebarToggle = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleMobileSidebarClose = () => {
    setIsMobileOpen(false)
  }

  return (
    <html lang="en">
      <body className="font-['Inter',system-ui,sans-serif] bg-slate-900 min-h-screen text-slate-100 antialiased">
        <Navbar onToggleMobileSidebar={handleMobileSidebarToggle} />

        <div className="flex">
          <Sidebar
            isCollapsed={isCollapsed}
            isMobileOpen={isMobileOpen}
            onToggle={handleSidebarToggle}
            onMobileClose={handleMobileSidebarClose}
          />

          <main
            className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-72"} max-md:ml-0 min-h-screen flex flex-col`}
          >
            <div className="flex-1 pt-20">{children}</div>
            <Footer />
          </main>
        </div>
      </body>
    </html>
  )
}

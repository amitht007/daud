// Sidebar utility functions
export const useSidebar = () => {
  const toggleSidebar = (isCollapsed, setIsCollapsed) => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileSidebar = (isMobileOpen, setIsMobileOpen) => {
    setIsMobileOpen(!isMobileOpen)
  }

  const closeMobileSidebar = (setIsMobileOpen) => {
    setIsMobileOpen(false)
  }

  return {
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar,
  }
}

// Setup click outside to close mobile sidebar
export const setupMobileSidebarClose = (sidebarRef, setIsMobileOpen) => {
  const handleClickOutside = (e) => {
    const sidebar = sidebarRef.current
    const menuToggle = document.querySelector(".menu-toggle")

    if (
      window.innerWidth <= 768 &&
      sidebar &&
      !sidebar.contains(e.target) &&
      menuToggle &&
      !menuToggle.contains(e.target)
    ) {
      setIsMobileOpen(false)
    }
  }

  document.addEventListener("click", handleClickOutside)
  return () => document.removeEventListener("click", handleClickOutside)
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import {RequireRole} from "../../../../src/components/Auth/RequireRole"


// Navigation items
export const navigationItems = [
  { name: "INVENTORY", href: "/inventory", icon: "📦" },
  { name: "WIKI", href: "https://gitlab.txninfra.com/one-wiki/all-isu/isu-base/-/wikis/", icon: "📚" },
  { name: "PATTERN HUB", href: "/patterns", icon: "🔧" },
  { name: "MODEL HUB", href: "/models", icon: "🤖" },
  { name: "SECURITY", href: "/security", icon: "🛡️" },
  { name: "podXs", href: "/podxs", icon: "🤖" },
];

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex items-center justify-between px-4 py-2 md:px-5 2xl:px-10">
        {/* Sidebar toggle for mobile */}
        <div className="flex items-center gap-2 min-w-0">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center size-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition md:hidden"
              aria-label="Open sidebar"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          )}
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="relative w-10 h-10 mr-1 shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                ISU
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base font-bold text-slate-800 dark:text-slate-100 truncate max-w-[120px] sm:max-w-none">
                Self Service Infra
              </span>
              <span className="text-xs text-slate-800 dark:text-slate-400 font-medium">
                v0.0.1-preview
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation - hidden on small screens */}
        <nav className="hidden lg:flex gap-10 xl:gap-20 mx-4 flex-1 justify-center">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1 text-sm font-medium text-dark dark:text-white hover:underline"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          <RequireRole role="admin">            
              <Link
                href="/admin/approvals"
                className="flex items-center gap-2 px-4 py-2 text-slate-800 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300 font-medium dark:text-slate-200 dark:hover:text-blue-400 dark:hover:bg-slate-800/50"
              >
                <span className="text-sm">⏳</span>
                APPROVALS
              </Link>  
          </RequireRole>
        </nav>
        

        {/* User controls */}
        <div className="flex items-center gap-2 min-[375px]:gap-4 ml-auto">
          <ThemeToggleSwitch />
          <div className="shrink-0">
            <UserInfo />
          </div>
        </div>
      </div>

      {/* Mobile navigation bar */}
      <nav className="flex lg:hidden justify-center gap-4 border-t border-stroke dark:border-stroke-dark bg-white dark:bg-gray-dark px-2 py-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-0.5 text-xs font-medium text-dark dark:text-white hover:underline"
          >
            <span>{item.icon}</span>
            <span className="truncate">{item.name}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
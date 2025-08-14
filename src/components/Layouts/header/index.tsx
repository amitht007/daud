"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

// Navigation items
export const navigationItems = [
  { name: "INVENTORY", href: "/inventory", icon: "📦" },
  { name: "WIKI", href: "https://gitlab.txninfra.com/one-wiki/all-isu/isu-base/-/wikis/", icon: "📚" },
  { name: "PATTERN HUB", href: "/patterns", icon: "🔧" },
  { name: "MODEL HUB", href: "/models", icon: "🤖" },
  { name: "SECURITY", href: "/security", icon: "🛡️" },
];

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();

  // Example usage of useState/useEffect (can be removed if not needed)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-2 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
    

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      {/* Navigation Items */}
     

      <div className="flex items-center mr-8">
       <div className="relative w-10 h-10 mr-3">
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
            ISU
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-bold text-slate-800 dark:text-slate-100">Self Service Infra</div>
          <div className="text-xs text-slate-800 dark:text-slate-400 font-medium">v0.0.1-preview</div>
        </div>
      </div>

       {/* Center navigation by using absolute positioning and left-1/2 translate-x-1/2 */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-20">
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
      </nav>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <ThemeToggleSwitch />
        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
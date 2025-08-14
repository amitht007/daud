"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon, ChevronUp, MenuIcon } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Only show icons when collapsed
  const sidebarWidth = isOpen ? "w-[260px]" : "w-[64px]";

  // Sidebar overlay for mobile
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-[98] bg-black/40 transition-opacity"
          onClick={toggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}
      <aside
        className={cn(
          "bg-white dark:bg-gray-dark border-r border-gray-200 dark:border-gray-800 transition-all duration-200 z-40 flex flex-col",
          isMobile
            ? [
                isOpen ? "fixed inset-y-0 left-0 w-[260px]" : "hidden",
                "h-full"
              ]
            : [
                // Sticky sidebar for desktop
                "Sticky h-100vh top-[64px]",
                sidebarWidth
              ]
        )}
        aria-label="Sidebar"
        style={{
          // Remove manual top/bottom/height for desktop, only for mobile
          top: isMobile ? 0 : undefined,
          bottom: isMobile ? 0 : undefined,
          height: isMobile ? "100vh" : undefined,
        }}
      >
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              {isOpen && (
                <span className="ml-2 font-bold text-lg text-dark dark:text-white">Self Service Infra</span>
              )}
            </Link>
            <button
              onClick={toggleSidebar}
              className="ml-auto flex items-center justify-center size-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <MenuIcon className={cn("transition-transform", !isOpen && "rotate-180")} />
            </button>
          </div>
          <nav className="flex-1 px-2">
            <ul className="space-y-2">
              {NAV_DATA[0].items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.url || "/"}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                      pathname === item.url
                        ? "bg-primary text-white"
                        : "text-dark-4 dark:text-dark-6 hover:bg-gray-100 hover:text-dark dark:hover:bg-[#FFFFFF1A] dark:hover:text-white"
                    )}
                  >
                    <item.icon className="size-6" aria-hidden="true" />
                    {isOpen && <span>{item.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

"use client";

import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";

export function Footer() {
  return (
    <footer className="w-full bg-white backdrop-bl-sm border-t border-slate-700 dark:bg-gray-dark dark:border-dark-3">
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          {/* Company Info */}
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
              ISU
            </div>
            <span className="text-xl font-bold text-black dark:text-white">Self Service Infra</span>
          </div>
          <p className="text-slate-600 text-sm dark:text-dark-6 text-center">
            Empowering teams with automated infrastructure provisioning, deployment, and management solutions.
          </p>
        </div>
        <div className="max-w-4xl mx-auto border-t border-slate-400 mt-6 pt-6 flex flex-col items-center gap-2 dark:border-dark-3">
          <p className="text-slate-600 text-sm dark:text-dark-6 text-center">
            © 2025 Self Service Infra. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-2">
            {/* Social or other links if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}

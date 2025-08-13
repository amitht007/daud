"use client";

import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";

export function Footer() {

  return (
    <footer className="bg-white backdrop-blur-sm border-t border-slate-700 mt-auto dark:bg-gray-dark dark:border-dark-3">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                ISU
              </div>
              <span className="text-xl font-bold text-black dark:text-white">Self Service Infra</span>
            </div>
            <p className="text-slate-600 mb-4 max-w-md dark:text-dark-6">
              Empowering teams with automated infrastructure provisioning, deployment, and management solutions.
            </p>          
          </div>
        <div className="border-t border-slate-400 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center dark:border-dark-3">
          <p className="text-slate-600 text-sm dark:text-dark-6">© 2025 Self Service Infra. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
          
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

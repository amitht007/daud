"use client"
export default function AboutPage() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 p-10 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              About podXs
            </h1>
          </div>
          
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-full border border-blue-200/30 dark:border-blue-700/30 mb-8">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              In-house Cloud Development Platform
            </span>
          </div>
          
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">podXs</span> is an in-house cloud development environment platform, inspired by solutions like{' '}
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-slate-800 dark:text-slate-200">Gitpod</span>, but purpose-built for our organization's{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">unique workflows</span>,{' '}
            <span className="font-semibold text-green-600 dark:text-green-400">privacy</span>, and{' '}
            <span className="font-semibold text-purple-600 dark:text-purple-400">security needs</span>.
          </p>
          
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            With podXs, teams can{' '}
            <span className="px-2 py-1 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded font-medium text-green-700 dark:text-green-400">instantly launch</span>{' '}
            ready-to-code, containerized workspaces,{' '}
            <span className="px-2 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded font-medium text-blue-700 dark:text-blue-400">collaborate securely</span>, and{' '}
            <span className="px-2 py-1 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded font-medium text-purple-700 dark:text-purple-400">manage infrastructure resources</span>—all within a modern, unified interface.
          </p>
          
          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/30 dark:to-slate-700/30 rounded-xl p-6 mb-6 border border-slate-200/50 dark:border-slate-600/30">
            <div className="grid gap-4">
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-slate-800/50 p-3 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-green-700 dark:text-green-400">On-Demand Workspaces:</span>
                  <span className="text-slate-700 dark:text-slate-300 ml-2">Launch isolated, pre-configured development environments in seconds for any project or team.</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-slate-800/50 p-3 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-red-700 dark:text-red-400">In-House Security:</span>
                  <span className="text-slate-700 dark:text-slate-300 ml-2">All data and compute remain within our private infrastructure, meeting strict compliance and security requirements.</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-slate-800/50 p-3 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-blue-700 dark:text-blue-400">Role-Based Access:</span>
                  <span className="text-slate-700 dark:text-slate-300 ml-2">Admins and users have clear, secure boundaries for approvals, monitoring, and collaboration.</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-slate-800/50 p-3 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-purple-700 dark:text-purple-400">Modern UI:</span>
                  <span className="text-slate-700 dark:text-slate-300 ml-2">Enjoy a sleek, dark-themed interface with intuitive navigation and real-time insights.</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-xl p-6 border border-blue-200/30 dark:border-blue-700/30">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              podXs empowers our{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">developers</span>{' '}
              and{' '}
              <span className="font-semibold text-purple-600 dark:text-purple-400">operations teams</span>{' '}
              to work{' '}
              <span className="px-2 py-1 bg-white/60 dark:bg-slate-800/60 rounded font-medium text-green-700 dark:text-green-400">efficiently</span>,{' '}
              <span className="px-2 py-1 bg-white/60 dark:bg-slate-800/60 rounded font-medium text-red-700 dark:text-red-400">securely</span>, and{' '}
              <span className="px-2 py-1 bg-white/60 dark:bg-slate-800/60 rounded font-medium text-blue-700 dark:text-blue-400">collaboratively</span>—bringing the power of cloud workspaces in-house, with the flexibility and control only an internal platform can provide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
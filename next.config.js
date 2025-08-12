/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Enable standalone output for minimal Docker images
  output: 'standalone',
  
  // Your existing config
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    // Additional image optimizations for Docker
    minimumCacheTTL: 60,
  },
  experimental: {
    // Keep your better-sqlite3 config + add optimizations
    serverComponentsExternalPackages: ["better-sqlite3"],
    // Additional optimizations
    optimizeCss: true,
    // This disables static export for all API routes
    forceDynamic: true,
  },
  
  // Your existing webpack config
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("better-sqlite3")
    }
    return config
  },
  
  // Additional Docker optimizations
  compress: true,
  swcMinify: true,
}

module.exports = nextConfig
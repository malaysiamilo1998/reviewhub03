/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  // images: {
  //   domains: ['lh3.googleusercontent.com']
  // },
  images: {
    domains: ['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
        // port: '',
        // pathname: '/account123/**'
      }
    ]
  },
  webpack (config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    }
    return config
  }
}

module.exports = nextConfig

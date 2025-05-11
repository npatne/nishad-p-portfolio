/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',            // what the browser will call
        destination: 'http://137.131.30.181:8000/:path*'  // your VM
      }
    ];
  }
}

export default nextConfig

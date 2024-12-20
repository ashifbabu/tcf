/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Enable SWC-based minification
  images: {
    domains: ['sgp1.digitaloceanspaces.com', 'res.cloudinary.com'], // Add external domains for optimized images
  },
  experimental: {
    scrollRestoration: true, // Enable scroll restoration
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      minSize: 20000, // Reduce chunk size for smaller JS bundles
    };
    return config;
  },
};

export default nextConfig;

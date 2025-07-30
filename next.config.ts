/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb', // Batas ukuran 10MB
    },
  },
};

export default nextConfig;
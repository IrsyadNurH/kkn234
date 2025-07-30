/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Menaikkan batas menjadi 10MB
    },
  },
};

export default nextConfig;
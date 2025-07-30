/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // TAMBAHKAN BLOK INI
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kqajb4b5foo1vkun.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

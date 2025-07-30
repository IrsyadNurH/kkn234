/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    appDir: true, // ✅ WAJIB: pastikan App Router aktif
  },
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
  reactStrictMode: true, // ✅ Direkomendasikan untuk dev
  swcMinify: true,       // ✅ Build lebih cepat & kecil
};

export default nextConfig;

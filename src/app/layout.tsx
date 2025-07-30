// app/layout.tsx
'use client'; // Jadikan Client Component untuk menggunakan state

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen'; // Impor komponen loading

const inter = Inter({ subsets: ['latin'] });

// Metadata tidak bisa diekspor dari Client Component,
// Anda bisa memindahkannya ke page.tsx atau menaruhnya di sini (statis).
// export const metadata: Metadata = { ... };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  // Jika Anda ingin loading berdasarkan durasi (bukan akhir video)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000); // Loading selama 3 detik
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <html lang="id">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>KKN 234 Mangunarga</title>
        <meta name="description" content="Website resmi kelompok KKN 234 Desa Mangunarga" />
      </head>
      <body className={`${inter.className} bg-emerald-50`}>
        {isLoading ? (
          // Tampilkan layar loading jika isLoading bernilai true
          <LoadingScreen onFinished={() => setIsLoading(false)} />
        ) : (
          // Jika loading selesai, tampilkan konten website
          <>
            <Header />
            <main>{children}</main>
          </>
        )}
      </body>
    </html>
  );
}
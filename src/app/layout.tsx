'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi ini akan dipanggil oleh video ketika selesai
  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // --- PERBAIKAN ---
    // Atur timer sebagai cadangan. Loading screen akan hilang setelah 4 detik,
    // tidak peduli apakah video selesai atau tidak.
    // Ini untuk mencegah macet jika pengguna pindah tab.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4000ms = 4 detik. Sesuaikan durasi ini agar sedikit lebih lama dari video Anda.

    // Membersihkan timer jika komponen di-unmount (praktik terbaik)
    return () => clearTimeout(timer);
  }, []); // [] berarti efek ini hanya dijalankan sekali saat komponen dimuat

  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>KKN 234 Mangunarga</title>
        <meta name="description" content="Website resmi kelompok KKN 234 Desa Mangunarga" />
      </head>
      <body className={`${inter.className}`}>
        {isLoading ? (
          // onFinished tetap ada agar video bisa menyembunyikan loading lebih cepat
          // jika selesai sebelum timeout.
          <LoadingScreen onFinished={handleLoadingFinish} />
        ) : (
          <>
            <Header />
            <main>{children}</main>
          </>
        )}
      </body>
    </html>
  );
}

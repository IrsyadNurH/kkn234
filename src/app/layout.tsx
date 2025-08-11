'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import hook untuk mendapatkan path halaman
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
  const [isLoading, setIsLoading] = useState(true); // Mulai dengan true untuk memeriksa kondisi
  const pathname = usePathname(); // Mendapatkan path halaman saat ini

  // Efek ini hanya berjalan sekali saat aplikasi pertama kali dimuat di tab
  useEffect(() => {
    const hasLoadedOnce = sessionStorage.getItem('kkn_has_loaded_once');

    if (hasLoadedOnce) {
      // Jika loading awal sudah pernah terjadi di sesi ini, jangan tampilkan lagi
      setIsLoading(false);
      return;
    }

    // Jika ini adalah kunjungan pertama di sesi ini,
    // hanya tampilkan loading jika halaman yang dikunjungi adalah beranda atau admin.
    if (pathname === '/' || pathname === '/admin') {
      setIsLoading(true); // Tetap tampilkan loading
    } else {
      // Jika halaman pertama yang dikunjungi bukan beranda/admin,
      // langsung lewati loading dan tandai sudah pernah dimuat.
      setIsLoading(false);
      sessionStorage.setItem('kkn_has_loaded_once', 'true');
    }
  }, []); // Dependency array kosong `[]` memastikan ini hanya berjalan sekali

  // Fungsi ini akan dipanggil saat loading selesai (baik dari video atau timer)
  const handleLoadingFinish = () => {
    setIsLoading(false);
    // Tandai di session storage bahwa loading awal sudah selesai
    sessionStorage.setItem('kkn_has_loaded_once', 'true');
  };

  // Timer cadangan untuk memastikan loading tidak macet
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        handleLoadingFinish();
      }, 10000); // Maksimal loading 10 detik

      return () => clearTimeout(timer);
    }
  }, [isLoading]);


  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>KKN 234 Mangunarga</title>
        <meta name="description" content="Website resmi kelompok KKN 234 Desa Mangunarga" />
      </head>
      <body className={`${inter.className}`}>
        {isLoading ? (
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

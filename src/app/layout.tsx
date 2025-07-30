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

  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>KKN 234 Mangunarga</title>
        <meta name="description" content="Website resmi kelompok KKN 234 Desa Mangunarga" />
      </head>
      {/* PERUBAHAN: Hapus kelas bg-* dari body */}
      <body className={`${inter.className}`}>
        {isLoading ? (
          <LoadingScreen onFinished={() => setIsLoading(false)} />
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

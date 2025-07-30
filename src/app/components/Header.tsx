'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Tambahkan link baru di sini
  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/program-kerja', label: 'Program Kerja' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/artikel', label: 'Artikel' },
    { href: '/profil-anggota', label: 'Profil Anggota' }, // <-- BARIS BARU
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            KKN 234 MANGUNARGA
          </Link>

          {/* Navigasi untuk layar besar (Desktop) */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-blue-500 transition">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Tombol Hamburger untuk layar kecil (Mobile) */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile yang muncul saat tombol di klik */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

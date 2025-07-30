'use client'; // Halaman ini perlu interaktivitas, jadi kita jadikan client component

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dataDivisi, type Anggota } from './data';

// Komponen utama halaman profil
export default function ProfilAnggotaPage() {
  // Mengambil semua anggota dari semua divisi menjadi satu array
  const allAnggota = dataDivisi.flatMap(divisi => divisi.anggota);

  // State untuk melacak anggota mana yang sedang aktif/dipilih
  const [activeAnggota, setActiveAnggota] = useState<Anggota>(allAnggota[0]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Kolom Kiri: Daftar Ikon Anggota */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4 px-4">Daftar Anggota</h2>
            {allAnggota.map((anggota) => (
              <button
                key={anggota.slug}
                onClick={() => setActiveAnggota(anggota)}
                className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-colors ${
                  activeAnggota.slug === anggota.slug
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={anggota.imageUrl}
                    alt={`Ikon ${anggota.nama}`}
                    fill
                    sizes="48px"
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{anggota.nama}</p>
                  <p className="text-sm text-gray-500">{anggota.jabatan || anggota.divisi}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Detail Anggota yang Aktif */}
        <div className="lg:col-span-3">
          {activeAnggota && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Foto Besar */}
              <div>
                <Image
                  src={activeAnggota.profilePicture}
                  alt={`Foto profil ${activeAnggota.nama}`}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-lg shadow-xl"
                />
              </div>

              {/* Informasi Detail */}
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900">{activeAnggota.nama}</h1>
                <p className="text-xl text-blue-600 font-semibold mt-2">{activeAnggota.jabatan || activeAnggota.divisi}</p>
                <p className="text-lg text-gray-500 mt-1">{activeAnggota.jurusan}</p>
                
                <blockquote className="mt-6 p-4 border-l-4 border-gray-300 bg-gray-50 italic text-gray-700">
                  &ldquo;{activeAnggota.quote}&rdquo;
                </blockquote>

                <div className="mt-6 prose max-w-none">
                  <p>{activeAnggota.bio}</p>
                </div>

                {activeAnggota.social.instagram && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-3">Hubungi</h3>
                    <Link href={activeAnggota.social.instagram} target="_blank" className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-500 transition">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm-1.04 2.113a8.896 8.896 0 00-1.258.106c-.836.085-1.4.234-1.844.41a3.102 3.102 0 00-1.153.802c-.345.345-.617.762-.802 1.153-.176.444-.325 1.008-.41 1.844-.091.826-.106 1.123-.106 3.233s.015 2.407.106 3.233c.085.836.234 1.4.41 1.844a3.102 3.102 0 00.802 1.153c.345.345.762.617 1.153.802.444.176 1.008.325 1.844.41.826.091 1.123.106 3.233.106s2.407-.015 3.233-.106c.836-.085 1.4-.234-1.844-.41a3.102 3.102 0 001.153-.802c.345-.345.617-.762-.802-1.153.176-.444-.325-1.008-.41-1.844.091-.826.106-1.123.106-3.233s-.015-2.407-.106-3.233c-.085-.836-.234-1.4-.41-1.844a3.102 3.102 0 00-.802-1.153c-.345-.345-.762-.617-1.153-.802-.444-.176-1.008-.325-1.844-.41-.826-.091-1.123-.106-3.233-.106zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg>
                      <span>Instagram</span>
                    </Link>
                </div>
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

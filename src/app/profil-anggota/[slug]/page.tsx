'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { dataDivisi, type Anggota } from '../data';

// --- Komponen Utama Halaman Profil Detail ---
export default function AnggotaDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const anggota = dataDivisi.flatMap(divisi => divisi.anggota).find(a => a.slug === slug);

  // State untuk melacak gambar mana yang sedang aktif di tengah
  const [activeImage, setActiveImage] = useState(anggota?.profilePicture || '');

  // --- PERBAIKAN UTAMA ---
  // useEffect ini sekarang HANYA akan berjalan saat 'slug' (URL) berubah.
  // Ini akan mengatur ulang gambar ke default saat Anda mengunjungi profil orang lain,
  // tetapi tidak akan mengganggu saat Anda mengklik galeri orang yang sama.
  useEffect(() => {
    if (anggota) {
      setActiveImage(anggota.profilePicture);
    }
  }, [slug]); // Dependensi diubah menjadi 'slug' saja

  if (!anggota) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Kolom Kiri: Galeri Ikon Kecil */}
        <aside className="lg:col-span-2">
          <div className="sticky top-24 space-y-3">
            {anggota.galleryImages.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(imgUrl)} // Langsung set state, tidak perlu fungsi terpisah
                // PERUBAHAN: Mengubah ukuran ikon menjadi lebih kecil
                className={`block w-20 h-20 relative rounded-md overflow-hidden transition-all duration-200 ${
                  activeImage === imgUrl
                    ? 'ring-4 ring-blue-500'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`Galeri ${anggota.nama} ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </aside>

        {/* Kolom Tengah: Gambar Besar */}
        <div className="lg:col-span-5">
            <div className="sticky top-24 aspect-square relative">
                 <Image
                    // 'key' tidak lagi diperlukan di sini dengan logika useEffect yang benar
                    src={activeImage}
                    alt={`Foto profil ${anggota.nama}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover rounded-lg shadow-xl"
                />
            </div>
        </div>

        {/* Kolom Kanan: Detail Informasi */}
        <main className="lg:col-span-5">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">{anggota.nama}</h1>
            <p className="text-xl text-blue-600 font-semibold mt-2">{anggota.jabatan || anggota.divisi}</p>
            <p className="text-lg text-gray-500 mt-1">{anggota.jurusan}</p>
            
            <blockquote className="mt-8 p-4 border-l-4 border-gray-300 bg-gray-50 italic text-gray-700">
              &ldquo;{anggota.quote}&rdquo;
            </blockquote>

            <div className="mt-8 prose prose-lg max-w-none">
              <p>{anggota.bio}</p>
            </div>

            {anggota.social.instagram && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Hubungi</h3>
                <Link href={anggota.social.instagram} target="_blank" className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-500 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 ... Z" clipRule="evenodd" /></svg>
                  <span>Instagram</span>
                </Link>
              </div>
            )}
        </main>
      </div>
    </div>
  );
}

'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Dokumentasi } from '@prisma/client';
import Image from 'next/image'; // Menggunakan komponen Image yang dioptimalkan

// --- Komponen untuk satu item foto ---
// Memisahkan komponen ini membuat kode lebih bersih dan mudah dikelola.
function GalleryItem({ photo, onImageClick }: { photo: Dokumentasi; onImageClick: (photo: Dokumentasi) => void; }) {
  // Jangan render apapun jika URL gambar tidak valid
  if (!photo.imageUrl) {
    return null;
  }

  return (
    // Induk utama yang mengatur ukuran dan rasio aspek.
    // 'relative' sangat penting untuk properti 'fill' pada <Image>.
    <div
      className="group relative cursor-pointer aspect-square overflow-hidden rounded-lg shadow-lg bg-gray-200"
      onClick={() => onImageClick(photo)}
    >
      <Image
        src={photo.imageUrl}
        alt={photo.caption}
        fill // 'fill' membuat gambar mengisi penuh div induk.
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
      {/* Overlay yang muncul saat hover */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="p-4 text-white font-semibold">{photo.caption}</p>
      </div>
    </div>
  );
}

// --- Komponen Lightbox untuk memperbesar gambar ---
function Lightbox({ image, onClose }: { image: Dokumentasi; onClose: () => void; }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white text-4xl hover:opacity-75 transition-opacity"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.imageUrl}
          alt={image.caption}
          className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg"
        />
        <p className="mt-4 text-center text-white">{image.caption}</p>
      </div>
    </div>
  );
}

// --- Komponen Utama Halaman Galeri ---
export default function GalleryClientPage({ photos }: { photos: Dokumentasi[] }) {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<Dokumentasi | null>(null);

  // EFEK UNTUK DEBUGGING: Cek data mentah di konsol browser (F12)
  useEffect(() => {
    console.log("Data mentah diterima:", photos);
  }, [photos]);

  // Logika untuk memfilter foto
  const filteredPhotos = useMemo(() => {
    if (activeFilter === null) {
      return photos;
    }
    return photos.filter(photo => Number(photo.siklus) === activeFilter);
  }, [activeFilter, photos]);

  const filters = [1, 2, 3, 4];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Galeri Dokumentasi
      </h1>
      
      {/* Tombol Filter */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-10 flex-wrap">
        <button onClick={() => setActiveFilter(null)} className={`px-4 py-2 text-sm font-semibold rounded-full transition ${activeFilter === null ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
          Semua
        </button>
        {filters.map((siklus) => (
          <button key={siklus} onClick={() => setActiveFilter(siklus)} className={`px-4 py-2 text-sm font-semibold rounded-full transition ${activeFilter === siklus ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Siklus {siklus}
          </button>
        ))}
      </div>

      {/* Grid Foto */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <GalleryItem key={photo.id} photo={photo} onImageClick={setSelectedImage} />
        ))}
      </div>

      {/* Pesan jika tidak ada foto */}
      {filteredPhotos.length === 0 && (
        <p className="col-span-full text-center text-gray-500 mt-8">
          Tidak ada foto yang ditemukan.
        </p>
      )}

      {/* Tampilkan Lightbox jika ada gambar yang dipilih */}
      {selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
}

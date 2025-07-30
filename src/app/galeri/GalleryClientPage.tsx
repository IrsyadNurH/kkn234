'use client';

import { useState, useMemo } from 'react';
import type { Dokumentasi } from '@prisma/client';
import Image from 'next/image'; // <-- Impor komponen Image

interface GalleryProps {
  photos: Dokumentasi[];
}

export default function GalleryClientPage({ photos }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] =  useState<Dokumentasi | null>(null);

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
        <button
          onClick={() => setActiveFilter(null)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition ${activeFilter === null ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Semua
        </button>
        {filters.map((siklus) => (
          <button
            key={siklus}
            onClick={() => setActiveFilter(siklus)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition ${activeFilter === siklus ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Siklus {siklus}
          </button>
        ))}
      </div>

      {/* Grid Foto */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.filter(p => p.imageUrl).map((photo) => (
          <div
            key={photo.id}
            className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md aspect-square bg-gray-200"
            onClick={() => setSelectedImage(photo)}
          >
            {/* Menggunakan komponen <Image> dari next/image */}
            <Image
              src={photo.imageUrl}
              alt={photo.caption}
              fill // Mengisi div induk
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center p-4">
              <p className="text-white text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.imageUrl} alt={selectedImage.caption} className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg"/>
            <p className="text-white text-center mt-4">{selectedImage.caption}</p>
          </div>
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setSelectedImage(null)}>&times;</button>
        </div>
      )}
    </div>
  );
}

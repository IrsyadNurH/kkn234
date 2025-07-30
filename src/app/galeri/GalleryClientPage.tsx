'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component
import type { Dokumentasi } from '@prisma/client';

interface GalleryProps {
  photos: Dokumentasi[];
}

export default function GalleryClientPage({ photos }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<Dokumentasi | null>(null);

  useEffect(() => {
    console.log("Data foto yang diterima oleh komponen:", photos);
  }, [photos]);

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
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group relative cursor-pointer rounded-lg shadow-md bg-gray-100"
            onClick={() => setSelectedImage(photo)}
          >
            <div className="aspect-square w-full">
              <Image
                src={photo.imageUrl}
                alt={photo.caption}
                layout="fill" // Ensures the image fills the container
                objectFit="cover" // Maintains aspect ratio and covers the container
                className="transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center p-4">
              <p className="text-white text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tampilkan pesan jika filter tidak menemukan hasil */}
      {filteredPhotos.length === 0 && photos.length > 0 && (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">Tidak ada foto yang ditemukan untuk filter Siklus {activeFilter}.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.caption}
              width={800} // Specify width
              height={600} // Specify height
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4">{selectedImage.caption}</p>
          </div>
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setSelectedImage(null)}>&times;</button>
        </div>
      )}
    </div>
  );
}

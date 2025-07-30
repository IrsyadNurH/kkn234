'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Dokumentasi } from '@prisma/client';

// Impor style yang dibutuhkan oleh Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SlideshowProps {
  images: Dokumentasi[];
}

export default function HomepageSlideshow({ images }: SlideshowProps) {
  // Jangan tampilkan apa-apa jika tidak ada gambar
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Swiper
        // Aktifkan modul yang akan digunakan
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation // Menampilkan tombol navigasi (panah kiri/kanan)
        pagination={{ clickable: true }} // Menampilkan titik-titik di bawah
        loop={true} // Membuat slideshow berputar terus menerus
        autoplay={{
          delay: 3500, // Pindah slide setiap 3.5 detik
          disableOnInteraction: false,
        }}
        className="rounded-lg shadow-xl"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            {/* Wrapper untuk menjaga rasio aspek 16:9 */}
            <div className="relative w-full pt-[56.25%]">
              <img
                src={image.imageUrl}
                alt={image.caption}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 text-center">
                <p className="text-lg font-semibold">{image.caption}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// app/admin/actions.ts
'use server'; // Wajib ada untuk menandakan ini adalah Server Actions

import { prisma } from '../../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob'; // <- Impor fungsi 'put'

// Aksi untuk menambah dokumentasi baru dengan UPLOAD FILE
export async function addDokumentasi(formData: FormData) {
  const imageFile = formData.get('imageFile') as File;
  const caption = formData.get('caption') as string;

  if (!imageFile || !caption || imageFile.size === 0) {
    throw new Error('File gambar dan caption wajib diisi');
  }

  // 1. Upload file ke Vercel Blob
  const blob = await put(imageFile.name, imageFile, {
    access: 'public',
  });

  // 2. Simpan URL yang dikembalikan Vercel Blob ke database Prisma Anda
  await prisma.dokumentasi.create({
    data: {
      imageUrl: blob.url, // <- Gunakan URL dari hasil upload
      caption,
    },
  });

  // 3. Refresh halaman galeri
  revalidatePath('/galeri');
}

// Aksi untuk menambah artikel baru
export async function addArtikel(formData: FormData) {
  const judul = formData.get('judul') as string;
  const konten = formData.get('konten') as string;

  if (!judul || !konten) {
    return; // Validasi sederhana
  }

  await prisma.artikel.create({
    data: {
      judul,
      konten,
    },
  });

  // Memberi tahu Next.js untuk merefresh data di halaman artikel
  revalidatePath('/artikel');
}
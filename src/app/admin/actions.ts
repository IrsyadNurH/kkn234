// app/admin/actions.ts
'use server'; // Wajib ada untuk menandakan ini adalah Server Actions

import { prisma } from '../../../lib/prisma';
import { revalidatePath } from 'next/cache';

// Aksi untuk menambah dokumentasi baru
export async function addDokumentasi(formData: FormData) {
  const imageUrl = formData.get('imageUrl') as string;
  const caption = formData.get('caption') as string;

  if (!imageUrl || !caption) {
    return; // Validasi sederhana
  }

  await prisma.dokumentasi.create({
    data: {
      imageUrl,
      caption,
    },
  });

  // Memberi tahu Next.js untuk merefresh data di halaman galeri
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
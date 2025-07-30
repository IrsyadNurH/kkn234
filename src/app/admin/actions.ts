// app/admin/actions.ts
'use server'; // Wajib ada untuk menandakan ini adalah Server Actions

import { prisma } from '../../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { del, put } from '@vercel/blob'; // <- Impor fungsi 'put'

// Aksi untuk menambah dokumentasi baru dengan UPLOAD FILE
export async function addDokumentasi(formData: FormData) {
  const imageFile = formData.get('imageFile') as File;
  const caption = formData.get('caption') as string;
  const siklus = Number(formData.get('siklus')); // Ambil nilai siklus dari form

  if (!imageFile || !caption || !siklus || imageFile.size === 0) {
    throw new Error('File gambar, caption, dan siklus wajib diisi');
  }

  // 1. Upload file ke Vercel Blob
  const blob = await put(imageFile.name, imageFile, {
    access: 'public',
    addRandomSuffix: true,
  });

  // 2. Simpan URL yang dikembalikan Vercel Blob ke database Prisma Anda
  await prisma.dokumentasi.create({
    data: {
      imageUrl: blob.url,
      caption,
      siklus, // Simpan siklus sebagai angka
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

// --- AKSI BARU UNTUK MENGHAPUS ---

// Aksi untuk menghapus dokumentasi
export async function deleteDokumentasi(formData: FormData) {
  const id = Number(formData.get('id'));
  const imageUrl = formData.get('imageUrl') as string;

  if (!id || !imageUrl) {
    throw new Error('ID dan Image URL diperlukan untuk menghapus.');
  }

  // Langkah 1: Hapus file dari Vercel Blob
  await del(imageUrl);

  // Langkah 2: Hapus record dari database
  await prisma.dokumentasi.delete({
    where: { id },
  });

  // Langkah 3: Perbarui halaman publik dan admin
  revalidatePath('/galeri');
  revalidatePath('/admin');
}

// Aksi untuk menghapus artikel
export async function deleteArtikel(formData: FormData) {
  const id = Number(formData.get('id'));

  if (!id) {
    throw new Error('ID diperlukan untuk menghapus.');
  }

  // Hapus record dari database
  await prisma.artikel.delete({
    where: { id },
  });

  // Perbarui halaman publik dan admin
  revalidatePath('/artikel');
  revalidatePath('/admin');
}

// console.log("Dokumentasi:", dokumentasi);
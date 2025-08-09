// app/admin/actions.ts
'use server'; // Wajib ada untuk menandakan ini adalah Server Actions

import { prisma } from '../../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { del, put } from '@vercel/blob'; // <- Impor fungsi 'put'

// --- AKSI UNTUK DOKUMENTASI ---
export async function addDokumentasi(formData: FormData) {
  const imageFile = formData.get('imageFile') as File;
  const caption = formData.get('caption') as string;
  const siklus = Number(formData.get('siklus'));

  if (!imageFile || !caption || !siklus || imageFile.size === 0) {
    throw new Error('File gambar, caption, dan siklus wajib diisi');
  }

  const blob = await put(imageFile.name, imageFile, {
    access: 'public',
    addRandomSuffix: true,
  });

  await prisma.dokumentasi.create({
    data: { imageUrl: blob.url, caption, siklus },
  });

  revalidatePath('/galeri');
  revalidatePath('/admin');
}

export async function deleteDokumentasi(formData: FormData) {
  const id = Number(formData.get('id'));
  const imageUrl = formData.get('imageUrl') as string;

  if (!id || !imageUrl) throw new Error('ID dan Image URL diperlukan.');
  
  await del(imageUrl);
  await prisma.dokumentasi.delete({ where: { id } });

  revalidatePath('/galeri');
  revalidatePath('/admin');
}

// --- AKSI UNTUK ARTIKEL ---
export async function addArtikel(formData: FormData) {
  const judul = formData.get('judul') as string;
  const konten = formData.get('konten') as string;
  const tanggalTerbitString = formData.get('tanggalTerbit') as string;

  if (!judul || !konten || !tanggalTerbitString) {
    throw new Error('Judul, konten, dan tanggal terbit artikel wajib diisi.');
  }

  await prisma.artikel.create({
    data: {
      judul,
      konten,
      tanggalTerbit: new Date(tanggalTerbitString), // Simpan sebagai objek Date
    },
  });

  revalidatePath('/artikel');
  revalidatePath('/admin');
}

export async function deleteArtikel(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) throw new Error('ID diperlukan.');
  
  await prisma.artikel.delete({ where: { id } });

  revalidatePath('/artikel');
  revalidatePath('/admin');
}

// --- AKSI BARU UNTUK PROGRAM KERJA ---
export async function addProgramKerja(formData: FormData) {
  const nama = formData.get('nama') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const penanggungJawab = formData.get('penanggungJawab') as string;
  const tanggalString = formData.get('tanggal') as string;

  if (!nama || !deskripsi || !penanggungJawab || !tanggalString) {
    throw new Error('Semua field program kerja wajib diisi.');
  }

  await prisma.programKerja.create({
    data: {
      nama,
      deskripsi,
      penanggungJawab,
      tanggal: new Date(tanggalString), // Simpan sebagai objek Date
    },
  });

  revalidatePath('/program-kerja');
  revalidatePath('/admin');
}

export async function deleteProgramKerja(formData: FormData) {
    const id = Number(formData.get('id'));
    if (!id) throw new Error('ID diperlukan.');
    
    await prisma.programKerja.delete({ where: { id } });

    revalidatePath('/program-kerja');
    revalidatePath('/admin');
}



'use client';

import { useState, useEffect, FormEvent } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import imageCompression from 'browser-image-compression';
import { 
  addDokumentasi, addArtikel, addProgramKerja,
  deleteDokumentasi, deleteArtikel, deleteProgramKerja
} from './actions';
import type { Dokumentasi, Artikel, ProgramKerja } from '@prisma/client';

// Types
interface AdminClientPageProps {
  initialDokumentasi: Dokumentasi[];
  initialArtikel: Artikel[];
  initialProgramKerja: ProgramKerja[];
}

// Image compression function
async function compressImage(file: File): Promise<File> {
  console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
  
  const options = {
    maxSizeMB: 3,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(file, options);
  console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
  
  return compressedFile;
}

// Loading button component
function LoadingButton({ 
  isLoading, 
  loadingText, 
  defaultText, 
  colorClass = "bg-blue-600 hover:bg-blue-700" 
}: {
  isLoading: boolean;
  loadingText: string;
  defaultText: string;
  colorClass?: string;
}) {
  return (
    <button 
      type="submit" 
      disabled={isLoading} 
      className={`w-full text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-400 ${colorClass}`}
    >
      {isLoading ? loadingText : defaultText}
    </button>
  );
}

// Dashboard Component
function AdminDashboard({ dokumentasi, artikel, programKerja }: { dokumentasi: Dokumentasi[], artikel: Artikel[], programKerja: ProgramKerja[] }) {
  const [isSubmitting, setIsSubmitting] = useState('');

  // Generic form submission handler
  const handleFormSubmit = async (
    event: FormEvent<HTMLFormElement>,
    action: (formData: FormData) => Promise<void>,
    type: 'dok' | 'art' | 'pro',
    requiresImage = false
  ) => {
    event.preventDefault();
    setIsSubmitting(type);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const imageFile = formData.get('imageFile') as File | null;

      if (imageFile?.size) {
        if (imageFile.size > 20 * 1024 * 1024) {
          throw new Error('File terlalu besar (maksimal 20MB)');
        }
        const compressedFile = await compressImage(imageFile);
        formData.set('imageFile', compressedFile, compressedFile.name);
      } else if (requiresImage) {
        throw new Error('Gambar wajib diupload');
      }

      await action(formData);
      form.reset();
      alert('Berhasil ditambahkan!');
    } catch (error) {
      console.error(`Error submitting ${type}:`, error);
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setIsSubmitting('');
    }
  };

  return (
    <div>
      {/* Bagian Form untuk Menambah Konten */}
      <h2 className="text-2xl font-bold mb-6 text-center">Tambah Konten Baru</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Form Dokumentasi */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Foto Dokumentasi</h3>
          <form onSubmit={(e) => handleFormSubmit(e, addDokumentasi, 'dok')} className="space-y-4" encType="multipart/form-data">
            <div>
              <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Pilih Gambar</label>
              <input type="file" name="imageFile" id="imageFile" required accept="image/png, image/jpeg, image/gif" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            <div>
              <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
              <input type="text" name="caption" id="caption" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="siklus" className="block text-sm font-medium text-gray-700">Siklus</label>
              <select name="siklus" id="siklus" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" defaultValue="">
                <option value="" disabled>Pilih Siklus</option>
                <option value="1">Siklus 1</option><option value="2">Siklus 2</option><option value="3">Siklus 3</option><option value="4">Siklus 4</option>
              </select>
            </div>
            <LoadingButton 
              isLoading={isSubmitting === 'dok'} 
              loadingText="Mengompres..." 
              defaultText="Upload Foto" 
            />
          </form>
        </div>
        
        {/* Form Artikel */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Artikel Baru</h3>
          <form onSubmit={(e) => handleFormSubmit(e, addArtikel, 'art')} className="space-y-4">
            <div>
              <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul</label>
              <input type="text" name="judul" id="judul" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            {/* INPUT TANGGAL BARU */}
            <div>
              <label htmlFor="tanggalTerbit" className="block text-sm font-medium text-gray-700">Tanggal Terbit</label>
              <input type="date" name="tanggalTerbit" id="tanggalTerbit" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="konten" className="block text-sm font-medium text-gray-700">Konten</label>
              <textarea name="konten" id="konten" rows={3} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <LoadingButton 
              isLoading={isSubmitting === 'art'} 
              loadingText="Mengompres..." 
              defaultText="Terbitkan Artikel" 
              colorClass="bg-green-600 hover:bg-green-700"
            />
          </form>
        </div>

        {/* Form Program Kerja */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Program Kerja</h3>
          <form onSubmit={(e) => handleFormSubmit(e, addProgramKerja, 'pro')} className="space-y-4">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Program</label>
              <input type="text" name="nama" id="nama" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            {/* INPUT TANGGAL BARU */}
            <div>
              <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">Tanggal Pelaksanaan</label>
              <input type="date" name="tanggal" id="tanggal" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea name="deskripsi" id="deskripsi" rows={2} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="penanggungJawab" className="block text-sm font-medium text-gray-700">Penanggung Jawab</label>
              <input type="text" name="penanggungJawab" id="penanggungJawab" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <LoadingButton 
              isLoading={isSubmitting === 'pro'} 
              loadingText="Mengompres..." 
              defaultText="Simpan Program" 
              colorClass="bg-purple-600 hover:bg-purple-700"
            />
          </form>
        </div>
      </div>

      <hr className="my-12"/>

      {/* Bagian untuk Mengelola Konten */}
      <h2 className="text-2xl font-bold mb-6 text-center">Kelola Konten yang Sudah Ada</h2>
      <div className="space-y-12">
        {/* Kelola Program Kerja */}
        <div>
          <h3 className="text-xl font-bold mb-4">Daftar Program Kerja</h3>
          <div className="space-y-3">
            {programKerja.map((proker) => (
              <div key={proker.id} className="bg-white p-3 rounded-lg shadow-md flex items-center justify-between gap-4">
                <p className="font-medium truncate flex-grow min-w-0">{proker.nama}</p>
                <form action={deleteProgramKerja}><input type="hidden" name="id" value={proker.id} /><button type="submit" className="bg-red-500 text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-red-600 transition flex-shrink-0">Hapus</button></form>
              </div>
            ))}
            {programKerja.length === 0 && <p className="text-gray-500 text-center py-4">Tidak ada program kerja.</p>}
          </div>
        </div>
        
        {/* Kelola Dokumentasi */}
        <div>
          <h3 className="text-xl font-bold mb-4">Daftar Dokumentasi</h3>
          <div className="space-y-3">
            {dokumentasi.map((doc) => (
              <div key={doc.id} className="bg-white p-3 rounded-lg shadow-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  <img src={doc.imageUrl} alt={doc.caption} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                  <p className="font-medium truncate">{doc.caption}</p>
                </div>
                <form action={deleteDokumentasi}><input type="hidden" name="id" value={doc.id} /><input type="hidden" name="imageUrl" value={doc.imageUrl} /><button type="submit" className="bg-red-500 text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-red-600 transition flex-shrink-0">Hapus</button></form>
              </div>
            ))}
            {dokumentasi.length === 0 && <p className="text-gray-500 text-center py-4">Tidak ada dokumentasi.</p>}
          </div>
        </div>

        {/* Kelola Artikel */}
        <div>
          <h3 className="text-xl font-bold mb-4">Daftar Artikel</h3>
          <div className="space-y-3">
            {artikel.map((art) => (
              <div key={art.id} className="bg-white p-3 rounded-lg shadow-md flex items-center justify-between gap-4">
                <p className="font-medium truncate flex-grow min-w-0">{art.judul}</p>
                <form action={deleteArtikel}><input type="hidden" name="id" value={art.id} /><button type="submit" className="bg-red-500 text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-red-600 transition flex-shrink-0">Hapus</button></form>
              </div>
            ))}
            {artikel.length === 0 && <p className="text-gray-500 text-center py-4">Tidak ada artikel.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen utama yang mengatur tampilan login atau dashboard
export default function AdminClientPage({ initialDokumentasi, initialArtikel, initialProgramKerja }: AdminClientPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => { const session = getCookie('kkn-admin-session'); if (session === 'true') setIsLoggedIn(true); }, []);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'PasswordRahasiaKKN234') {
      setCookie('kkn-admin-session', 'true', { maxAge: 60 * 60 * 24 });
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Password salah!');
    }
  };
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Halaman Admin</h1>
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login Admin</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-md">Masuk</button>
          </form>
        </div>
      ) : (
        <AdminDashboard 
          dokumentasi={initialDokumentasi} 
          artikel={initialArtikel} 
          programKerja={initialProgramKerja} 
        />
      )}
    </div>
  );
}
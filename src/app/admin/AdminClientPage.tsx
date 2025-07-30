// app/admin/AdminClientPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
// Impor semua actions, termasuk yang baru
import { addDokumentasi, addArtikel, deleteDokumentasi, deleteArtikel } from './actions';
import type { Dokumentasi, Artikel } from '@prisma/client';

// Definisikan props untuk komponen
interface AdminClientPageProps {
  initialDokumentasi: Dokumentasi[];
  initialArtikel: Artikel[];
}

// Komponen Dashboard Admin yang sesungguhnya
function AdminDashboard({ dokumentasi, artikel }: { dokumentasi: Dokumentasi[], artikel: Artikel[] }) {
  return (
    <div>
      {/* Bagian Form untuk Menambah Konten (tidak berubah) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Form Dokumentasi */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Upload Foto Dokumentasi</h2>
          <form action={addDokumentasi} className="space-y-4" encType="multipart/form-data">
            <div>
              <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Pilih Gambar</label>
              <input
                type="file"
                name="imageFile"
                id="imageFile"
                required
                accept="image/png, image/jpeg, image/gif"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
              <input
                type="text"
                name="caption"
                id="caption"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="siklus" className="block text-sm font-medium text-gray-700">Siklus</label>
              <select
                name="siklus"
                id="siklus"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="" disabled selected>Pilih Siklus</option>
                <option value="1">Siklus 1</option>
                <option value="2">Siklus 2</option>
                <option value="3">Siklus 3</option>
                <option value="4">Siklus 4</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Upload Foto
            </button>
          </form>
        </div>
        {/* Form Artikel */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Tambah Artikel Baru</h2>
          <form action={addArtikel} className="space-y-4">
            <div>
              <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul</label>
              <input type="text" name="judul" id="judul" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="konten" className="block text-sm font-medium text-gray-700">Konten</label>
              <textarea name="konten" id="konten" rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700">Terbitkan Artikel</button>
          </form>
        </div>
      </div>

      <hr className="my-12"/>

      {/* Bagian Baru untuk Mengelola Konten */}
      <div className="space-y-12">
        {/* Kelola Dokumentasi */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Kelola Dokumentasi</h2>
          <div className="space-y-4">
            {dokumentasi.map((doc) => (
              <div key={doc.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  <img src={doc.imageUrl} alt={doc.caption} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                  <p className="font-medium truncate">{doc.caption}</p>
                </div>
                <form action={deleteDokumentasi}>
                  <input type="hidden" name="id" value={doc.id} />
                  <input type="hidden" name="imageUrl" value={doc.imageUrl} />
                    <div>
                    <label htmlFor="siklus" className="block text-sm font-medium text-gray-700">Siklus</label>
                    <select name="siklus" id="siklus" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="1">Siklus 1</option>
                        <option value="2">Siklus 2</option>
                        <option value="3">Siklus 3</option>
                        <option value="4">Siklus 4</option>
                      </select>
                    </div>
                  <button type="submit" className="bg-red-500 text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-red-600 transition flex-shrink-0">Hapus</button>
                
                </form>
              </div>
            ))}
            {dokumentasi.length === 0 && <p className="text-gray-500 text-center">Tidak ada dokumentasi untuk dikelola.</p>}
          </div>
        </div>

        {/* Kelola Artikel */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Kelola Artikel</h2>
          <div className="space-y-4">
            {artikel.map((art) => (
              <div key={art.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
                <p className="font-medium truncate flex-grow min-w-0">{art.judul}</p>
                <form action={deleteArtikel}>
                  <input type="hidden" name="id" value={art.id} />
                  <button type="submit" className="bg-red-500 text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-red-600 transition flex-shrink-0">Hapus</button>
                </form>
              </div>
            ))}
            {artikel.length === 0 && <p className="text-gray-500 text-center">Tidak ada artikel untuk dikelola.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}


// Komponen utama yang mengatur tampilan login atau dashboard (tidak banyak berubah)
export default function AdminClientPage({ initialDokumentasi, initialArtikel }: AdminClientPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const session = getCookie('kkn-admin-session');
    if (session === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Ganti 'PasswordRahasiaKKN234' dengan password Anda, idealnya dari .env
    if (password === 'PasswordRahasiaKKN234') {
      setCookie('kkn-admin-session', 'true', { maxAge: 60 * 60 * 24 }); // Cookie 1 hari
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
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-md">
              Masuk
            </button>
          </form>
        </div>
      ) : (
        <AdminDashboard dokumentasi={initialDokumentasi} artikel={initialArtikel} />
      )}
    </div>
  );
}
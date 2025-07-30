// app/admin/page.tsx
'use client'; // Ubah menjadi client component untuk handle state login

import { useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { addDokumentasi, addArtikel } from './actions';

// Komponen Dashboard Admin yang sesungguhnya
function AdminDashboard() {
    // ... (Salin semua kode form dari Langkah 2 No. 4 ke sini) ...
    // ... (Mulai dari <div className="grid..."> sampai penutupnya) ...
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form untuk Dokumentasi */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Tambah Foto Dokumentasi</h2>
              <form action={addDokumentasi} className="space-y-4">
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL Gambar</label>
                  <input type="text" name="imageUrl" id="imageUrl" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption/Keterangan</label>
                  <input type="text" name="caption" id="caption" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                  Simpan Foto
                </button>
              </form>
            </div>
            {/* Form untuk Artikel */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Tambah Artikel Baru</h2>
              <form action={addArtikel} className="space-y-4">
                <div>
                  <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul Artikel</label>
                  <input type="text" name="judul" id="judul" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="konten" className="block text-sm font-medium text-gray-700">Konten Artikel</label>
                  <textarea name="konten" id="konten" rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                  Terbitkan Artikel
                </button>
              </form>
            </div>
        </div>
    );
}

// Komponen utama yang mengatur tampilan login atau dashboard
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Cek cookie saat komponen pertama kali dimuat
  useEffect(() => {
    const session = getCookie('kkn-admin-session');
    if (session === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Ini adalah cara sederhana, password dikirim ke client.
    // Untuk keamanan lebih, validasi harus dilakukan di server-side.
    // Tapi untuk KKN, ini cukup sebagai penghalang awal.
    // Anda harus memasukkan password yang sama dengan di .env
    const realPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD; // Perlu setup env variable di next.config.js
    // Mari kita hardcode untuk contoh ini agar lebih mudah
    if (password === 'PasswordRahasiaKKN234') { // Ganti dengan password anda
        setCookie('kkn-admin-session', 'true', { maxAge: 60 * 60 * 24 }); // Cookie berlaku 1 hari
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
            <AdminDashboard />
        )}
    </div>
  );
}
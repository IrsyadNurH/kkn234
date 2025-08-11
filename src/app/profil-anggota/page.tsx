import Image from 'next/image';
import Link from 'next/link';
import { dataDivisi, type Anggota } from './data';

function AnggotaCard(props: Anggota) {
  const { nama, jabatan, jurusan, imageUrl, slug } = props;
  const displayImage = imageUrl || `https://placehold.co/128x128/e0e7ff/4f46e5?text=${nama.charAt(0)}`;

  return (
    <Link href={`/profil-anggota/${slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform transform group-hover:-translate-y-2 h-full">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={displayImage}
            alt={`Foto profil ${nama}`}
            fill
            sizes="128px"
            className="rounded-full border-4 border-slate-200 object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{nama}</h3>
        {jabatan && <p className="text-blue-600 font-semibold mt-1">{jabatan}</p>}
        <p className="text-gray-500 mt-2">{jurusan}</p>
      </div>
    </Link>
  );
}

export default function ProfilAnggotaPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Profil Anggota KKN 234 Mangunarga
      </h1>

      <div className="space-y-16">
        {dataDivisi.map((divisi) => (
          <section key={divisi.nama}>
            {/* --- BAGIAN BANNER BARU --- */}
            <div
              className="relative h-48 rounded-lg overflow-hidden flex items-center justify-center p-6 bg-cover bg-center mb-8"
              style={{ backgroundImage: `url(${divisi.bannerUrl})` }}
            >
              {/* Overlay untuk membuat teks lebih mudah dibaca */}
              <div className="absolute inset-0 bg-black opacity-50"></div>
              {/* Judul Divisi */}
              <h2 className="relative text-4xl font-bold text-white z-10 text-center">
                {divisi.nama}
              </h2>
            </div>

            {/* Grid Kartu Anggota */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {divisi.anggota.map((anggota) => (
                <AnggotaCard key={anggota.nama} {...anggota} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

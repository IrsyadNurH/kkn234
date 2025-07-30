import Image from 'next/image';
import Link from 'next/link';
import { dataDivisi, type Anggota } from './data';

function AnggotaCard(props: Anggota) {
  const { nama, jabatan, jurusan, imageUrl, slug } = props;
  return (
    <Link href={`/profil-anggota/${slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform transform group-hover:-translate-y-2">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={imageUrl}
            alt={`Foto profil ${nama}`}
            fill
            sizes="128px"
            className="rounded-full border-4 border-slate-200 object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{nama}</h3>
        {jabatan && (
          <p className="text-blue-600 font-semibold mt-1">{jabatan}</p>
        )}
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
      {dataDivisi.map((divisi) => (
        <section key={divisi.nama} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-4 border-blue-500">
            {divisi.nama}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {divisi.anggota.filter(anggota => anggota.imageUrl).map((anggota) => (
              <AnggotaCard key={anggota.nama} {...anggota} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

import Image from 'next/image';
import { dataDivisi, type Anggota } from '../data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Tipe untuk parameter halaman
type PageParams = {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Fungsi untuk mendapatkan data anggota berdasarkan slug
function getAnggotaBySlug(slug: string): Anggota | undefined {
  for (const divisi of dataDivisi) {
    const anggota = divisi.anggota.find((a) => a.slug === slug);
    if (anggota) return anggota;
  }
  return undefined;
}

// Komponen halaman dengan tipe params yang benar
export default function Page({ params, searchParams }: PageParams) {
  const anggota = getAnggotaBySlug(params.slug);

  if (!anggota) {
    notFound();
  }

  const displayImage = anggota.profilePicture || `https://placehold.co/500x500/e0e7ff/4f46e5?text=${anggota.nama.charAt(0)}`;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Image
              src={displayImage}
              alt={`Foto profil ${anggota.nama}`}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
        <div className="lg:col-span-2">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">{anggota.nama}</h1>
          <p className="text-xl text-blue-600 font-semibold mt-2">{anggota.jabatan || anggota.divisi}</p>
          <p className="text-lg text-gray-500 mt-1">{anggota.jurusan}</p>
          <blockquote className="mt-8 p-4 border-l-4 border-gray-300 bg-gray-50 italic text-gray-700">
            &ldquo;{anggota.quote}&rdquo;
          </blockquote>
          <div className="mt-8 prose prose-lg max-w-none">
            <p>{anggota.bio}</p>
          </div>
          {anggota.social?.instagram && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4">Hubungi</h3>
              <div className="flex space-x-4">
                <Link href={anggota.social.instagram} target="_blank" className="text-gray-600 hover:text-pink-500 transition">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm-1.04 2.113a8.896 8.896 0 00-1.258.106c-.836.085-1.4.234-1.844.41a3.102 3.102 0 00-1.153.802c-.345.345-.617.762-.802 1.153-.176.444-.325 1.008-.41 1.844-.091.826-.106 1.123-.106 3.233s.015 2.407.106 3.233c.085.836.234 1.4.41 1.844a3.102 3.102 0 00.802 1.153c.345.345.762.617 1.153.802.444.176 1.008.325 1.844.41.826.091 1.123.106 3.233.106s2.407-.015 3.233-.106c.836-.085 1.4-.234 1.844-.41a3.102 3.102 0 00.802-1.153c.345-.345.617-.762-.802-1.153.176-.444-.325-1.008-.41-1.844.091-.826.106-1.123.106-3.233s-.015-2.407-.106-3.233c-.085-.836-.234-1.4-.41-1.844a3.102 3.102 0 00-.802-1.153c-.345-.345-.762-.617-1.153-.802-.444-.176-1.008-.325-1.844-.41-.826-.091-1.123-.106-3.233-.106zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Generate metadata untuk SEO (opsional)
export function generateMetadata({ params }: PageParams) {
  const anggota = getAnggotaBySlug(params.slug);
  
  if (!anggota) {
    return {
      title: 'Anggota Tidak Ditemukan',
    };
  }

  return {
    title: `${anggota.nama} - KKN 234 Mangunarga`,
    description: anggota.bio,
  };
}

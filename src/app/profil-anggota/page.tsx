import Image from 'next/image';
import Link from 'next/link';
import { dataDivisi, type Anggota } from './data';

// Komponen Kartu Anggota (sekarang menggunakan anchor link <a>)
function AnggotaCard(props: Anggota) {
  const { id, nama, jabatan, jurusan, imageUrl } = props;
  const displayImage = imageUrl || `https://placehold.co/128x128/e0e7ff/4f46e5?text=${nama.charAt(0)}`;

  return (
    <a href={`#${id}`} className="block group">
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
    </a>
  );
}

// Komponen untuk Profil Detail
function AnggotaDetail(props: Anggota) {
    const { id, nama, jabatan, divisi, jurusan, profilePicture, quote, bio, social } = props;
    const displayImage = profilePicture || `https://placehold.co/500x500/e0e7ff/4f46e5?text=${nama.charAt(0)}`;

    return (
        <section id={id} className="pt-24 -mt-16"> {/* Padding top untuk offset header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                    <Image src={displayImage} alt={`Foto profil ${nama}`} width={500} height={500} className="w-full h-auto object-cover rounded-lg shadow-xl"/>
                </div>
                <div className="lg:col-span-2">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">{nama}</h1>
                    <p className="text-xl text-blue-600 font-semibold mt-2">{jabatan || divisi}</p>
                    <p className="text-lg text-gray-500 mt-1">{jurusan}</p>
                    <blockquote className="mt-8 p-4 border-l-4 border-gray-300 bg-gray-50 italic text-gray-700">&ldquo;{quote}&rdquo;</blockquote>
                    <div className="mt-8 prose prose-lg max-w-none"><p>{bio}</p></div>
                    {social.instagram && (
                        <div className="mt-10">
                            <h3 className="text-2xl font-bold mb-4">Hubungi</h3>
                            <div className="flex space-x-4">
                                <Link href={social.instagram} target="_blank" className="text-gray-600 hover:text-pink-500 transition">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm-1.04 2.113a8.896 8.896 0 00-1.258.106c-.836.085-1.4.234-1.844.41a3.102 3.102 0 00-1.153.802c-.345.345-.617.762-.802 1.153-.176.444-.325 1.008-.41 1.844-.091.826-.106 1.123-.106 3.233s.015 2.407.106 3.233c.085.836.234 1.4.41 1.844a3.102 3.102 0 00.802 1.153c.345.345.762.617 1.153.802.444.176 1.008.325 1.844.41.826.091 1.123.106 3.233.106s2.407-.015 3.233-.106c.836-.085 1.4-.234-1.844-.41a3.102 3.102 0 001.153-.802c.345-.345.617-.762-.802-1.153.176-.444-.325-1.008-.41-1.844.091-.826.106-1.123.106-3.233s-.015-2.407-.106-3.233c-.085-.836-.234-1.4-.41-1.844a3.102 3.102 0 00-.802-1.153c-.345-.345-.762-.617-1.153-.802-.444-.176-1.008-.325-1.844-.41-.826-.091-1.123-.106-3.233-.106zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default function ProfilAnggotaPage() {
  const allAnggota = dataDivisi.flatMap(divisi => divisi.anggota);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Profil Anggota KKN 234 Mangunarga
      </h1>
      
      {/* Grid Kartu Anggota */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allAnggota.map((anggota) => (
          <AnggotaCard key={anggota.id} {...anggota} />
        ))}
      </div>

      <hr className="my-20 border-t-2 border-gray-200" />

      {/* Daftar Profil Detail */}
      <div className="space-y-20">
        {allAnggota.map((anggota) => (
            <AnggotaDetail key={anggota.id} {...anggota} />
        ))}
      </div>
    </div>
  );
}

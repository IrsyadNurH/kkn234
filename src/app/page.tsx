import { prisma } from '../../lib/prisma';
import HomepageSlideshow from './components/HomepageSlideshow';
import ProkerCard from './components/ProkerCard';
import ArtikelCard from './components/ArtikelCard';
import Link from 'next/link';
import { Dokumentasi, ProgramKerja, Artikel } from '@prisma/client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Types for homepage data
interface HomepageData {
  latestPhotos: Dokumentasi[];
  prokerUnggulan: ProgramKerja[];
  latestArtikel: Artikel[];
}

// Function to fetch all required data concurrently
async function getHomepageData(): Promise<HomepageData> {
  try {
    const [latestPhotos, prokerUnggulan, latestArtikel] = await Promise.all([
      prisma.dokumentasi.findMany({
        take: 7,
        orderBy: [
          { siklus: 'desc' },
          { createdAt: 'desc' }
        ],
      }),
      prisma.programKerja.findMany({
        take: 10,
        orderBy: [
          { tanggal: 'desc' }
        ],
      }),
      prisma.artikel.findMany({
        take: 10,
        orderBy: [
          { tanggalTerbit: 'desc' },
          
        ],
      }),
    ]);

    return { latestPhotos, prokerUnggulan, latestArtikel };
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    return {
      latestPhotos: [],
      prokerUnggulan: [],
      latestArtikel: []
    };
  }
}

// Empty state component
const EmptyState = ({ message }: { message: string }) => (
  <div className="w-full text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
    <p>{message}</p>
  </div>
);

// Section header component
const SectionHeader = ({ title, linkHref }: { title: string; linkHref: string }) => (
  <div className="flex justify-between items-center px-4 sm:px-6 mb-8">
    <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    <Link 
      href={linkHref} 
      className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
    >
      Lihat Semua
    </Link>
  </div>
);

export default async function Home() {
  const { latestPhotos, prokerUnggulan, latestArtikel } = await getHomepageData();

  return (
    <main className="w-full min-h-screen">
      {/* Documentation Slideshow Section */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Dokumentasi Kegiatan
        </h1>
        {latestPhotos.length > 0 ? (
          <HomepageSlideshow images={latestPhotos} />
        ) : (
          <EmptyState message="Belum ada dokumentasi kegiatan" />
        )}
      </section>

      {/* Featured Programs Section */}
      <section className="py-16 bg-pattern-proker">
        <div className="container mx-auto">
          <SectionHeader 
            title="Program Kerja Unggulan" 
            linkHref="/program-kerja" 
          />
          <div className="flex gap-6 overflow-x-auto pb-6 px-4 sm:px-6 snap-x snap-mandatory">
            {prokerUnggulan.length > 0 ? (
              prokerUnggulan.map((program) => (
                <div key={program.id} className="snap-start">
                  <ProkerCard program={program} />
                </div>
              ))
            ) : (
              <EmptyState message="Belum ada program kerja" />
            )}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-pattern-artikel">
        <div className="container mx-auto">
          <SectionHeader 
            title="Artikel Terbaru" 
            linkHref="/artikel" 
          />
          <div className="flex gap-6 overflow-x-auto pb-6 px-4 sm:px-6 snap-x snap-mandatory">
            {latestArtikel.length > 0 ? (
              latestArtikel.map((artikel) => (
                <div key={artikel.id} className="snap-start">
                  <ArtikelCard artikel={artikel} />
                </div>
              ))
            ) : (
              <EmptyState message="Belum ada artikel" />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';
import { diseases } from '@/data/knowledgeBase';

// Figma-accurate disease icons from the original assets
const diseaseIconSrc: Record<string, string> = {
  tbc: '/assets/Container.png',
  malaria: '/assets/fluent-emoji-high-contrast_mosquito.png',
  ispa: '/assets/mdi_virus.png',
  gastritis: '/assets/covid_symptoms-virus-diarrhea-2.png',
  hipertensi: '/assets/Vector (1).png',
  diare: '/assets/covid_symptoms-virus-diarrhea-2.png',
  flu: '/assets/mdi_virus.png',
  myalgia: '/assets/icon-park-outline_muscle.png',
  diabetes: '/assets/Vector (2).png',
  dermatitis: '/assets/streamline-ultimate_hair-skin-bold.png',
};

export default function DaftarPenyakitPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = diseases.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.shortDesc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header — back arrow left, title center */}
      <div className="px-5 pt-12 pb-4 md:max-w-7xl md:mx-auto md:px-8">
        <div className="relative flex items-center justify-center mb-4">
          <button
            onClick={() => router.back()}
            className="absolute left-0 p-1 btn-press"
            aria-label="Back"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#171717">
              <path d="M10 12L6 8l4-4" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
          <h1 className="text-neutral-900 text-lg font-bold font-['Poppins'] leading-6">
            Daftar Penyakit
          </h1>
        </div>

        {/* Search bar — sky-300/60 outline, rounded-full */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-300" />
          <input
            id="search-penyakit"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari penyakit..."
            className="w-full h-11 pl-11 pr-4 bg-white rounded-full border-2 border-sky-300/60 text-zinc-500 text-base font-normal font-['Inter'] outline-none focus:border-sky-400 transition-colors placeholder:text-zinc-400"
          />
        </div>
      </div>

      {/* Disease list */}
      <div className="px-4 md:max-w-7xl md:mx-auto md:px-8">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-['Poppins'] text-sm">
            Penyakit tidak ditemukan.
          </div>
        )}
        {filtered.map((disease, index) => (
          <Link
            key={disease.id}
            href={`/daftar-penyakit/${disease.id}`}
            id={`disease-item-${disease.id}`}
            className="flex justify-between items-center min-h-20 px-4 py-3.5 bg-white rounded-3xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)] border border-black/5 card-hover fade-in"
            style={{ animationDelay: `${0.04 * index}s` }}
          >
            <div className="flex items-center gap-4">
              {/* Sky-300/20 circle icon */}
              <div className="w-14 h-14 bg-sky-300/20 rounded-full flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={diseaseIconSrc[disease.id] ?? '/assets/mdi_virus.png'}
                  alt={disease.name}
                  className="w-7 h-7 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="min-w-0">
                <p className="text-neutral-900 text-sm font-bold font-['Poppins'] leading-6">
                  {disease.name}
                </p>
                <p className="text-gray-500 text-xs font-normal font-['Poppins'] leading-4 line-clamp-2 w-48">
                  {disease.shortDesc}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 shrink-0 ml-2" />
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}

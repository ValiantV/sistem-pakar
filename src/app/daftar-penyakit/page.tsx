'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  ChevronRight,
  Wind,
  Bug,
  Heart,
  Droplets,
  Zap,
  Activity,
  Dumbbell,
  Droplet,
  Layers,
} from 'lucide-react';
import { diseases } from '@/data/knowledgeBase';

const iconMap: Record<string, React.ReactNode> = {
  lungs: <Wind size={22} className="text-sky-400" />,
  mosquito: <Bug size={22} className="text-sky-400" />,
  throat: <Activity size={22} className="text-sky-400" />,
  stomach: <Droplets size={22} className="text-sky-400" />,
  heart: <Heart size={22} className="text-sky-400" />,
  diarrhea: <Droplet size={22} className="text-sky-400" />,
  virus: <Zap size={22} className="text-sky-400" />,
  muscle: <Dumbbell size={22} className="text-sky-400" />,
  diabetes: <Layers size={22} className="text-sky-400" />,
  skin: <Activity size={22} className="text-sky-400" />,
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
      {/* Header */}
      <div className="px-5 pt-12 pb-3">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors btn-press"
            aria-label="Back"
          >
            <ArrowLeft size={20} className="text-neutral-900" />
          </button>
          <h1 className="text-neutral-900 text-lg font-bold font-['Poppins'] leading-6">
            Daftar Penyakit
          </h1>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-300">
            <Search size={18} />
          </div>
          <input
            id="search-penyakit"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari penyakit..."
            className="w-full h-11 pl-11 pr-4 bg-white rounded-3xl border-2 border-sky-300/60 text-zinc-500 text-base font-normal font-['Inter'] outline-none focus:border-sky-400 transition-colors"
          />
        </div>
      </div>

      {/* Disease list */}
      <div className="px-4 pt-2 flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-['Poppins']">
            Penyakit tidak ditemukan.
          </div>
        )}
        {filtered.map((disease, index) => (
          <Link
            key={disease.id}
            href={`/daftar-penyakit/${disease.id}`}
            id={`disease-item-${disease.id}`}
            className="flex justify-between items-center min-h-20 px-4 py-3.5 bg-white rounded-3xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)] border border-black/5 card-hover fade-in"
            style={{ animationDelay: `${0.05 * index}s` }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-sky-300/20 rounded-full flex justify-center items-center shrink-0">
                {iconMap[disease.icon ?? ''] ?? <Activity size={22} className="text-sky-400" />}
              </div>
              <div className="min-w-0">
                <p className="text-neutral-900 text-sm font-bold font-['Poppins'] leading-6">
                  {disease.name}
                </p>
                <p className="text-gray-500 text-xs font-normal font-['Poppins'] leading-4 line-clamp-2 mt-0.5">
                  {disease.shortDesc}
                </p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400 shrink-0 ml-2" />
          </Link>
        ))}
      </div>
    </div>
  );
}

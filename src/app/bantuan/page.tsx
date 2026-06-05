'use client';

import { useRouter } from 'next/navigation';

const steps = [
  {
    id: 1,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="3" width="18" height="22" rx="2.5" stroke="#7DD3FC" strokeWidth="2" />
        <path d="M9 9h10M9 13h10M9 17h6" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    desc: 'Buka aplikasi di perangkat Anda.',
  },
  {
    id: 2,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="5" width="18" height="18" rx="3" stroke="#7DD3FC" strokeWidth="2" />
        <path d="M14 10v8M10 14h8" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    desc: 'Tekan tombol "Diagnosis Penyakit" untuk memulai.',
  },
  {
    id: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="5" width="18" height="18" rx="3" stroke="#7DD3FC" strokeWidth="2" />
        <path d="M9 10h10M9 14h6" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
        <path d="M16.5 17.5l2 2 3-3" stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    desc: 'Pilih jawaban dengan jujur sesuai gejala yang Anda rasakan.',
  },
  {
    id: 4,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="5" width="18" height="18" rx="3" stroke="#7DD3FC" strokeWidth="2" />
        <path d="M9 10h10M9 14h10M9 18h6" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
        <circle cx="21" cy="20" r="5" fill="#7DD3FC" />
        <path d="M19 20l1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    desc: 'Setelah selesai menjawab, tekan tombol "Lanjutkan" untuk melihat hasil diagnosis.',
  },
];

const notes = [
  'Hasil diagnosis bergantung pada jawaban yang Anda berikan.',
  'Hasil yang ditampilkan hanya diagnosis awal, bukan keputusan medis.',
  'Jika gejala tidak membaik, semakin parah, atau berlangsung lama, segera periksa ke puskesmas, rumah sakit, atau fasilitas kesehatan terdekat.',
];

export default function BantuanPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header — centered title, back arrow left */}
      <div className="px-5 pt-12 pb-5">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 p-1 btn-press"
            aria-label="Back"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-neutral-900 text-lg font-bold font-['Poppins'] leading-6">
            Bantuan Aplikasi
          </h1>
        </div>
      </div>

      {/* Section heading — "Cara Kerja Aplikasi" in sky-300 */}
      <div className="px-5 mb-3 fade-in">
        <h2 className="text-sky-300 text-base font-bold font-['Poppins'] leading-6">
          Cara Kerja Aplikasi
        </h2>
        <p className="text-neutral-900 text-xs font-normal font-['Poppins'] leading-5 mt-0.5">
          Panduan langkah penggunaan sistem pakar diagnosis.
        </p>
      </div>

      {/* Step cards — bordered, sky-100 bg, icon left + text right */}
      <div className="px-5 flex flex-col gap-3 mb-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center gap-4 px-4 py-4 bg-sky-50 rounded-2xl border border-sky-100 fade-in"
            style={{ animationDelay: `${0.07 * index}s` }}
          >
            {/* Icon box */}
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              {step.icon}
            </div>
            {/* Text */}
            <div className="flex-1">
              <p className="text-sky-400 text-[10px] font-bold font-['Poppins'] tracking-widest uppercase mb-0.5">
                Langkah {step.id}
              </p>
              <p className="text-neutral-900 text-xs font-normal font-['Poppins'] leading-5">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* "Catatan Penting" yellow box */}
      <div className="mx-5 px-5 py-5 bg-amber-50 rounded-3xl border-2 border-dashed border-amber-300 fade-in" style={{ animationDelay: '0.3s' }}>
        {/* Header row */}
        <div className="flex items-center gap-2 mb-4">
          {/* Exclamation mark circle — amber */}
          <div className="w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold font-['Poppins']">!</span>
          </div>
          <p className="text-amber-500 text-base font-bold font-['Poppins']">
            Catatan Penting
          </p>
        </div>
        {/* Numbered list */}
        <div className="flex flex-col gap-3">
          {notes.map((note, i) => (
            <div key={i} className="flex items-start gap-3">
              {/* Numbered orange circle */}
              <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold font-['Poppins']">
                  {i + 1}
                </span>
              </div>
              <p className="text-neutral-900 text-xs font-normal font-['Poppins'] leading-5 flex-1">
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import { diseaseMap } from '@/data/knowledgeBase';
import { use } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function DiseaseDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const disease = diseaseMap[id];

  if (!disease) notFound();

  // Parse bullet points from selfCare string
  const selfCareLines = disease.selfCare.split('\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header — centered title, back arrow far left */}
      <div className="px-5 pt-12 pb-4">
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
            {disease.name}
          </h1>
        </div>
      </div>

      {/* Hero image — full width, no crop */}
      <div className="w-full mb-5 fade-in">
        <Image
          src={disease.image ?? '/assets/Image.png'}
          alt={disease.name}
          width={800}
          height={600}
          className="w-full h-auto object-contain bg-sky-100"
          priority
        />
      </div>

      {/* Full description */}
      <div className="px-5 mb-5 fade-in" style={{ animationDelay: '0.08s' }}>
        <p className="text-neutral-900 text-xs font-normal font-['Poppins'] leading-6">
          {disease.fullDesc}
        </p>
      </div>

      {/* Common Symptoms */}
      <div className="px-5 mb-5 fade-in" style={{ animationDelay: '0.12s' }}>
        <h2 className="text-neutral-900 text-xs font-bold font-['Poppins'] leading-6 mb-2">
          Gejala Umum
        </h2>
        <div className="flex flex-col gap-2">
          {disease.commonSymptoms.map((symptom, index) => (
            <div key={index} className="flex items-start gap-2.5">
              {/* Emerald check circle icon */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                <circle cx="10" cy="10" r="9" stroke="#10B981" strokeWidth="1.5" />
                <path d="M6.5 10L9 12.5L13.5 8" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-neutral-900 text-xs font-normal font-['Poppins'] leading-5">
                {symptom}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Langkah Awal Mandiri box */}
      <div className="mx-5 fade-in" style={{ animationDelay: '0.16s' }}>
        <div className="px-5 py-4 bg-sky-300/10 rounded-3xl border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-2">
            {/* Shield icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
              <path d="M10 2L3 5.5V10c0 4.4 3 7 7 8 4-1 7-3.6 7-8V5.5L10 2z" fill="#7DD3FC" />
            </svg>
            <span className="text-neutral-900 text-xs font-bold font-['Poppins'] leading-5">
              Langkah Awal Mandiri
            </span>
          </div>
          <ul className="flex flex-col gap-1">
            {selfCareLines.map((line, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-neutral-900 text-xs font-normal font-['Poppins'] leading-5">
                  • {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

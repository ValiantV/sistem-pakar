'use client';

import { useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Lightbulb } from 'lucide-react';
import { diseaseMap } from '@/data/knowledgeBase';
import { use } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function DiseaseDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const disease = diseaseMap[id];

  if (!disease) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header bar */}
      <div className="px-5 pt-12 pb-3 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors btn-press"
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-neutral-900" />
        </button>
        <h1 className="text-neutral-900 text-lg font-bold font-['Poppins'] leading-6">
          {disease.name}
        </h1>
      </div>

      {/* Hero image */}
      <div className="mx-5 mb-4 fade-in">
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-sky-50">
          <Image
            src={disease.image ?? '/assets/Image.png'}
            alt={disease.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Description */}
      <div className="px-5 mb-6 fade-in" style={{ animationDelay: '0.1s' }}>
        <p className="text-neutral-900 text-xs font-normal font-['Poppins'] leading-6">
          {disease.fullDesc}
        </p>
      </div>

      {/* Common Symptoms */}
      <div className="px-5 mb-6 fade-in" style={{ animationDelay: '0.15s' }}>
        <h2 className="text-neutral-900 text-xs font-bold font-['Poppins'] leading-6 mb-3">
          Gejala Umum
        </h2>
        <div className="flex flex-col gap-2">
          {disease.commonSymptoms.map((symptom, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-neutral-900 text-xs font-normal font-['Poppins'] leading-5">
                {symptom}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Self-care box */}
      <div className="mx-5 fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="px-6 py-4 bg-sky-300/10 rounded-3xl shadow-sm border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={20} className="text-sky-300 shrink-0" />
            <span className="text-neutral-900 text-xs font-bold font-['Poppins'] leading-5">
              Langkah Awal Mandiri
            </span>
          </div>
          <p className="text-neutral-900 text-xs font-normal font-['Poppins'] leading-6 whitespace-pre-line">
            {disease.selfCare}
          </p>
        </div>
      </div>
    </div>
  );
}

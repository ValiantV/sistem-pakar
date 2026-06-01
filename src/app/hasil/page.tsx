'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  AlertCircle,
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
import { useAppStore } from '@/store/useAppStore';
import { diseaseMap } from '@/data/knowledgeBase';

const diseaseIconMap: Record<string, React.ReactNode> = {
  tbc: <Wind size={28} className="text-white" />,
  malaria: <Bug size={28} className="text-white" />,
  ispa: <Activity size={28} className="text-white" />,
  gastritis: <Droplets size={28} className="text-white" />,
  hipertensi: <Heart size={28} className="text-white" />,
  diare: <Droplet size={28} className="text-white" />,
  flu: <Zap size={28} className="text-white" />,
  myalgia: <Dumbbell size={28} className="text-white" />,
  diabetes: <Layers size={28} className="text-white" />,
  dermatitis: <Activity size={28} className="text-white" />,
};

function getProbabilityColor(prob: number) {
  if (prob >= 75) return 'text-emerald-600';
  if (prob >= 50) return 'text-sky-500';
  if (prob >= 25) return 'text-yellow-600';
  return 'text-red-500';
}

export default function HasilDiagnosaPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const lastResult = useAppStore((s) => s.lastDiagnosisResult);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user?.isLoggedIn) {
      router.replace('/login');
    }
    if (mounted && !lastResult) {
      router.replace('/diagnosa/bio');
    }
  }, [mounted, user, lastResult, router]);

  if (!mounted || !lastResult) return <div className="min-h-screen bg-white" />;

  const disease = diseaseMap[lastResult.resultDiseaseId];

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Sky-300 header */}
      <div className="bg-sky-300 rounded-bl-[48px] rounded-br-[48px] px-6 pt-10 pb-8 fade-in">
        <div className="flex justify-between items-center mb-4 pr-20">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-1 btn-press"
            aria-label="Back"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-white text-xl font-bold font-['Inter'] leading-7">
              Hasil Diagnosa
            </h1>
            <p className="text-white/80 text-xs font-medium font-['Inter'] leading-4">
              Diagnosa - Gejala - Penjelasan
            </p>
          </div>
        </div>
        {/* 3 Icon circles */}
        <div className="flex justify-center items-center gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-20 h-20 bg-sky-400 rounded-full shadow-md outline outline-4 outline-white flex items-center justify-center overflow-hidden"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              {diseaseIconMap[lastResult.resultDiseaseId] ?? (
                <Activity size={28} className="text-white" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Result section */}
      <div className="px-7 py-4 fade-in" style={{ animationDelay: '0.15s' }}>
        <p className="text-slate-900 text-base font-bold font-['Poppins'] leading-7">
          Anda kemungkinan mengalami:
        </p>
        <div className="flex items-baseline gap-3 mt-1">
          <span className="text-blue-500 text-2xl font-black font-['Poppins'] leading-10">
            {lastResult.resultDisease}
          </span>
          <span className={`text-2xl font-bold font-['Poppins'] leading-8 ${getProbabilityColor(lastResult.probability)}`}>
            {lastResult.probability}%
          </span>
        </div>

        {/* Patient info */}
        <div className="mt-2 flex gap-4 text-xs text-gray-500 font-['Poppins']">
          <span>👤 {lastResult.patientName}</span>
          <span>🎂 {lastResult.patientAge} Tahun</span>
          <span>⚧ {lastResult.patientGender}</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5 font-['Poppins']">
          🗓 {lastResult.date}
        </p>
      </div>

      {/* Explanation / matched symptoms */}
      <div className="px-6 fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-slate-900 text-base font-bold font-['Poppins'] leading-7 mb-3">
          Penjelasan:
        </h2>
        <div className="p-5 bg-slate-50 rounded-[32px] shadow-sm border border-slate-200 mb-5">
          {lastResult.matchedSymptomLabels.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {lastResult.matchedSymptomLabels.map((label, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-sky-400 text-xs font-normal font-['Poppins'] leading-6 shrink-0">
                    {index + 1}.
                  </span>
                  <span className="text-slate-600 text-xs font-normal font-['Poppins'] leading-6">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-xs font-['Poppins']">
              Tidak ada gejala yang cocok ditemukan.
            </p>
          )}
        </div>

        {/* Self-care */}
        {disease && (
          <div className="p-5 bg-sky-50 rounded-[32px] border border-sky-200 mb-5 fade-in" style={{ animationDelay: '0.25s' }}>
            <p className="text-neutral-900 text-xs font-bold font-['Poppins'] leading-5 mb-2">
              💊 Langkah Awal Mandiri
            </p>
            <p className="text-neutral-900 text-xs font-normal font-['Poppins'] leading-6 whitespace-pre-line">
              {disease.selfCare}
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="px-4 py-3.5 bg-blue-50 rounded-[32px] border border-blue-100 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-slate-600 text-xs font-normal font-['Poppins'] leading-5">
              Hasil ini hanya sebagai informasi awal. Jika keluhan masih berlanjut atau
              bertambah parah, segera datangi fasilitas kesehatan terdekat untuk
              pemeriksaan lebih lanjut.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/diagnosa/bio"
            id="btn-diagnosa-ulang"
            className="btn-press w-full py-3.5 bg-sky-300 hover:bg-sky-400 rounded-full text-center text-white text-sm font-semibold font-['Poppins'] transition-all"
          >
            → Diagnosa Ulang
          </Link>
          <Link
            href="/riwayat"
            id="btn-lihat-riwayat"
            className="btn-press w-full py-3.5 bg-slate-100 hover:bg-slate-200 rounded-full text-center text-slate-700 text-sm font-semibold font-['Poppins'] transition-all"
          >
            🕐 Lihat Riwayat
          </Link>
          <Link
            href="/dashboard"
            id="btn-ke-beranda"
            className="btn-press w-full py-3.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-full text-center text-slate-700 text-sm font-semibold font-['Poppins'] transition-all"
          >
            🏠 Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

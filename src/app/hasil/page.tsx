'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { diseaseMap } from '@/data/knowledgeBase';

export default function HasilDiagnosaPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const lastResult = useAppStore((s) => s.lastDiagnosisResult);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !user?.isLoggedIn) router.replace('/login');
    if (mounted && !lastResult) router.replace('/diagnosa/bio');
  }, [mounted, user, lastResult, router]);

  if (!mounted || !lastResult) return <div className="min-h-screen bg-white" />;

  const disease = diseaseMap[lastResult.resultDiseaseId];
  const selfCareLines = disease?.selfCare.split('\n').filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-white">
      {/* ── PRIORITY FIX: Sky-300 header with very large bottom-radius ── */}
      <div className="bg-sky-300 rounded-b-[56px] px-6 pb-8 pt-10 fade-in">
        {/* Title row: back arrow left, title center, no right element */}
        <div className="relative flex items-center justify-center mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="absolute left-0 btn-press"
            aria-label="Kembali"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12l6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="text-center">
            <h1 className="text-white text-xl font-bold font-['Inter'] leading-7">
              Hasil Diagnosa
            </h1>
            <p className="text-white/80 text-xs font-medium font-['Inter']">
              Diagnosa - Gejala - Penjelasan
            </p>
          </div>
        </div>

        {/* 3 overlapping white-outlined icon circles */}
        <div className="flex justify-center items-center">
          {/* Left circle */}
          <div className="w-20 h-20 bg-sky-400 rounded-full outline-4 outline-white outline flex items-center justify-center z-10 -mr-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              {/* Ear / stethoscope shape depending on disease — we use a generic medical icon */}
              <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="2" />
              <path d="M11 16c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="21" r="2" fill="white" />
            </svg>
          </div>
          {/* Center circle — larger, raised */}
          <div className="w-24 h-24 bg-sky-400 rounded-full outline-4 outline-white outline flex items-center justify-center z-20">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 8c-5 0-9 3.6-9 8 0 3 1.8 5.6 4.5 7L14 30h12l-1.5-7c2.7-1.4 4.5-4 4.5-7 0-4.4-4-8-9-8z" fill="white" opacity="0.9" />
            </svg>
          </div>
          {/* Right circle */}
          <div className="w-20 h-20 bg-sky-400 rounded-full outline-4 outline-white outline flex items-center justify-center z-10 -ml-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 6C10.5 6 6 10.5 6 16s4.5 10 10 10 10-4.5 10-10S21.5 6 16 6z" stroke="white" strokeWidth="2" />
              <path d="M13 16l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Content below header: desktop = 2-col side-by-side ── */}
      <div className="px-6 pt-5 pb-10 md:max-w-7xl md:mx-auto md:px-12">
        <div className="md:flex md:flex-row md:gap-12 md:items-start">
          {/* LEFT column: disease name, probability */}
          <div className="md:w-1/3">
        {/* Probability result */}
        <p className="text-slate-900 text-base font-bold font-['Poppins'] leading-7 mb-1 fade-in" style={{ animationDelay: '0.1s' }}>
          Anda kemungkinan mengalami :
        </p>
        <div className="flex items-baseline gap-3 mb-5 fade-in" style={{ animationDelay: '0.12s' }}>
          <span className="text-sky-400 text-2xl font-black font-['Poppins'] leading-9">
            {lastResult.resultDisease}
          </span>
          <span className="text-sky-400 text-2xl font-black font-['Poppins'] leading-9">
            {lastResult.probability}%
          </span>
        </div>
          </div>

          {/* RIGHT column: explanation + actions */}
          <div className="md:flex-1">

        {/* Penjelasan */}
        <h2 className="text-slate-900 text-base font-bold font-['Poppins'] leading-7 mb-3 fade-in" style={{ animationDelay: '0.14s' }}>
          Penjelasan :
        </h2>

        {/* Matched symptoms card — white bg, rounded-3xl, light border */}
        <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 mb-4 fade-in" style={{ animationDelay: '0.16s' }}>
          {lastResult.matchedSymptomLabels.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {lastResult.matchedSymptomLabels.map((label, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-sky-400 text-xs font-normal font-['Poppins'] leading-6 shrink-0 min-w-[18px]">
                    {index + 1}.
                  </span>
                  <span className="text-slate-600 text-xs font-normal font-['Poppins'] leading-6">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-xs font-['Poppins']">
              Tidak ada gejala yang cocok ditemukan.
            </p>
          )}
        </div>

        {/* Disclaimer — light blue-gray bg, (i) icon */}
        <div className="px-4 py-4 bg-slate-50 rounded-3xl border border-slate-100 mb-6 fade-in" style={{ animationDelay: '0.18s' }}>
          <div className="flex items-start gap-3">
            {/* Info circle icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
              <circle cx="10" cy="10" r="9" stroke="#60A5FA" strokeWidth="1.5" />
              <path d="M10 9v5" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="6.5" r="0.75" fill="#60A5FA" />
            </svg>
            <p className="text-slate-600 text-xs font-normal font-['Poppins'] leading-5">
              Hasil ini hanya sebagai informasi awal. Jika keluhan masih berlanjut atau bertambah parah, segera datangi fasilitas kesehatan terdekat untuk pemeriksaan lebih lanjut.
            </p>
          </div>
        </div>

        {/* Action buttons — EXACT Figma: "Diagnosa Ulang" + "Lihat Daftar Penyakit" */}
        <div className="flex flex-col gap-3 fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Primary — sky-300 filled, rounded-full, refresh icon + text */}
          <Link
            href="/diagnosa/bio"
            id="btn-diagnosa-ulang"
            className="btn-press w-full h-14 bg-sky-300 hover:bg-sky-400 rounded-full flex items-center justify-center gap-2 text-white text-sm font-semibold font-['Poppins'] transition-all"
          >
            {/* Refresh icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1.5 9A7.5 7.5 0 1 0 3.2 4.1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.5 1.5v3h3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Diagnosa Ulang
          </Link>

          {/* Secondary — white bg, border, list icon + text */}
          <Link
            href="/daftar-penyakit"
            id="btn-lihat-daftar"
            className="btn-press w-full h-14 bg-white border border-slate-200 hover:bg-slate-50 rounded-full flex items-center justify-center gap-2 text-slate-700 text-sm font-semibold font-['Poppins'] transition-all"
          >
            {/* List icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="1.5" rx="0.75" fill="#374151" />
              <rect x="2" y="8.25" width="14" height="1.5" rx="0.75" fill="#374151" />
              <rect x="2" y="12.5" width="9" height="1.5" rx="0.75" fill="#374151" />
            </svg>
            Lihat Daftar Penyakit
          </Link>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

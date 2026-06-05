'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { DiagnosisResult } from '@/types';

function HistoryCard({ item, onDelete }: { item: DiagnosisResult; onDelete: () => void }) {
  return (
    <div
      id={`history-item-${item.id}`}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden fade-in"
    >
      {/* Top section — patient name + date + badge */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="text-gray-400 text-[10px] font-semibold font-['Poppins'] tracking-widest uppercase">
              Nama Pasien
            </p>
            <p className="text-neutral-900 text-base font-bold font-['Poppins'] leading-6 mt-0.5">
              {item.patientName}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-gray-400 text-[10px] font-normal font-['Poppins'] uppercase tracking-wide">
              {item.date}
            </span>
            {/* % Kecocokan badge — sky-300/20 bg */}
            <span className="px-2.5 py-0.5 bg-sky-300/20 rounded-full text-sky-500 text-[11px] font-semibold font-['Poppins']">
              {item.probability}% Kecocokan
            </span>
          </div>
        </div>
      </div>

      {/* Diagnosis result — sky-50 bg, inside inset */}
      <div className="mx-4 mb-3 px-4 py-3 bg-sky-50 rounded-2xl">
        <p className="text-sky-400 text-xs font-semibold font-['Poppins'] mb-1">
          Hasil Diagnosis:
        </p>
        <p className="text-sky-400 text-xl font-bold font-['Poppins'] leading-7">
          {item.resultDisease}
        </p>
      </div>

      {/* Bottom — delete (subtle) + Lihat Detail button */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <button
          onClick={onDelete}
          className="text-gray-300 hover:text-red-400 transition-colors text-xs font-['Poppins'] btn-press"
          aria-label="Hapus"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <Link
          href={`/daftar-penyakit/${item.resultDiseaseId}`}
          className="btn-press px-5 py-2 bg-sky-300 hover:bg-sky-400 rounded-full text-white text-xs font-semibold font-['Poppins'] transition-all"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default function RiwayatPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const history = useAppStore((s) => s.history);
  const deleteHistoryItem = useAppStore((s) => s.deleteHistoryItem);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !user?.isLoggedIn) router.replace('/login');
  }, [mounted, user, router]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  const handleDelete = (id: string) => {
    if (confirm('Hapus riwayat ini?')) deleteHistoryItem(id);
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header — centered title, back arrow left */}
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
            Riwayat Diagnosis
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-5">
        {history.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 gap-5 fade-in">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="8" y="6" width="20" height="24" rx="3" stroke="#94A3B8" strokeWidth="2" />
                <path d="M12 13h12M12 18h12M12 23h7" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm font-medium font-['Poppins'] text-center leading-6">
              Belum ada riwayat diagnosa.<br />Mulai diagnosa terlebih dahulu.
            </p>
            <Link
              href="/diagnosa/bio"
              id="btn-mulai-dari-riwayat"
              className="btn-press px-8 py-3 bg-sky-300 hover:bg-sky-400 rounded-full text-white text-sm font-semibold font-['Poppins'] transition-all"
            >
              Mulai Diagnosa
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {history.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

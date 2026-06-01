'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Trash2, ClipboardList } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

function getProbabilityColor(prob: number) {
  if (prob >= 75) return 'bg-emerald-100 text-emerald-700';
  if (prob >= 50) return 'bg-sky-100 text-sky-700';
  if (prob >= 25) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-600';
}

export default function RiwayatPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const history = useAppStore((s) => s.history);
  const deleteHistoryItem = useAppStore((s) => s.deleteHistoryItem);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user?.isLoggedIn) {
      router.replace('/login');
    }
  }, [mounted, user, router]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  const handleDelete = (id: string) => {
    if (confirm('Hapus riwayat ini?')) {
      deleteHistoryItem(id);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors btn-press"
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-neutral-900" />
        </button>
        <h1 className="text-neutral-900 text-lg font-bold font-['Poppins'] leading-6">
          Riwayat Diagnosis
        </h1>
      </div>

      {/* Content */}
      <div className="px-5">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 fade-in">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
              <ClipboardList size={36} className="text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium font-['Poppins'] text-center">
              Belum ada riwayat diagnosa.
              <br />
              Mulai diagnosa terlebih dahulu.
            </p>
            <Link
              href="/diagnosa/bio"
              id="btn-mulai-dari-riwayat"
              className="btn-press px-6 py-3 bg-sky-300 hover:bg-sky-400 rounded-2xl text-white text-sm font-semibold font-['Poppins'] transition-all"
            >
              Mulai Diagnosa
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {history.map((item, index) => (
              <div
                key={item.id}
                id={`history-item-${item.id}`}
                className="p-4 bg-white rounded-3xl shadow-sm border border-slate-200 fade-in card-hover"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-neutral-900 text-sm font-bold font-['Poppins']">
                        {item.patientName}
                      </span>
                      <span className="text-gray-400 text-xs font-['Poppins']">
                        • {item.patientAge} th • {item.patientGender}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs font-['Poppins']">{item.date}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-300 hover:text-red-400 transition-colors btn-press ml-2"
                    aria-label="Hapus riwayat"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-neutral-900 text-sm font-semibold font-['Poppins']">
                      {item.resultDisease}
                    </p>
                    <p className="text-gray-500 text-xs font-['Poppins'] mt-0.5">
                      {item.matchedSymptomLabels.length} gejala cocok
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold font-['Poppins'] ${getProbabilityColor(
                      item.probability
                    )}`}
                  >
                    {item.probability}%
                  </span>
                </div>

                {/* Matched symptoms preview */}
                {item.matchedSymptomLabels.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-[10px] text-gray-400 font-['Poppins'] mb-1">
                      Gejala yang dialami:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.matchedSymptomLabels.slice(0, 3).map((label, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-100 rounded-full text-[10px] text-slate-600 font-['Poppins']"
                        >
                          {label}
                        </span>
                      ))}
                      {item.matchedSymptomLabels.length > 3 && (
                        <span className="px-2 py-0.5 bg-slate-100 rounded-full text-[10px] text-slate-400 font-['Poppins']">
                          +{item.matchedSymptomLabels.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

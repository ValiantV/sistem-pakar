'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';
import { symptoms } from '@/data/knowledgeBase';
import { getTopDiagnosis, formatDiagnosisResult } from '@/lib/engine';

export default function DiagnosaPertanyaanPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const currentPatient = useAppStore((s) => s.currentPatient);
  const selectedSymptoms = useAppStore((s) => s.selectedSymptoms);
  const toggleSymptom = useAppStore((s) => s.toggleSymptom);
  const setLastDiagnosisResult = useAppStore((s) => s.setLastDiagnosisResult);
  const addToHistory = useAppStore((s) => s.addToHistory);
  const [mounted, setMounted] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !user?.isLoggedIn) router.replace('/login');
    if (mounted && !currentPatient) router.replace('/diagnosa/bio');
  }, [mounted, user, currentPatient, router]);

  if (!mounted || !currentPatient) return <div className="min-h-screen bg-white" />;

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      alert('Harap pilih minimal satu gejala.');
      return;
    }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 600));
    const topMatch = getTopDiagnosis(selectedSymptoms);
    if (!topMatch) {
      alert('Tidak ada penyakit yang cocok dengan gejala yang dipilih.');
      setProcessing(false);
      return;
    }
    const result = formatDiagnosisResult(
      topMatch,
      currentPatient.name,
      currentPatient.age,
      currentPatient.gender,
      selectedSymptoms
    );
    setLastDiagnosisResult(result);
    addToHistory(result);
    router.push('/hasil');
  };

  return (
    <div className="min-h-screen bg-white pb-28">
      <div className="md:max-w-4xl md:mx-auto">
      {/* Header — centered title, back arrow left */}
      <div className="px-5 pt-12 pb-2">
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
            Diagnosa Penyakit - Pertanyaan
          </h1>
        </div>
      </div>

      {/* Illustration */}
      <div className="flex justify-center pt-4 pb-2 fade-in">
        <div className="relative w-40 h-40">
          <Image
            src="/assets/undraw_to-do-list_o3jf 1.png"
            alt="Checklist illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Instruction text */}
      <div className="px-6 pb-4 fade-in" style={{ animationDelay: '0.05s' }}>
        <p className="text-center text-slate-600 text-sm font-normal font-['Poppins'] leading-6">
          Harap mengisi seluruh pertanyaan sesuai kondisi yang dialami sebelum melanjutkan ke tahap berikutnya.
        </p>
      </div>

      {/* Symptoms list — no gap card, just stacked rows */}
      <div className="px-4">
        <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
        {symptoms.map((symptom, index) => {
          const isChecked = selectedSymptoms.includes(symptom.id);
          return (
            <button
              key={symptom.id}
              id={`symptom-${symptom.id}`}
              onClick={() => toggleSymptom(symptom.id)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-3xl shadow-sm border transition-all btn-press text-left fade-in ${
                isChecked
                  ? 'bg-sky-50 border-sky-300/40'
                  : 'bg-white border-slate-200'
              }`}
              style={{ animationDelay: `${0.02 * index}s` }}
            >
              {/* Custom checkbox — emerald/30 border unchecked, sky-300 checked */}
              <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                  isChecked
                    ? 'bg-sky-300 border-sky-300'
                    : 'bg-white border-emerald-500/30'
                }`}
              >
                {isChecked && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-slate-900 text-xs font-normal font-['Poppins'] leading-5 flex-1">
                {symptom.question}
              </span>
            </button>
          );
        })}
        </div>
      </div>
      </div>

      {/* Fixed bottom — "Lihat Hasil Diagnosa →" button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-6 pt-3 bg-white/95 backdrop-blur-sm border-t border-gray-100">
        <button
          id="btn-lihat-hasil"
          onClick={handleSubmit}
          disabled={processing}
          className="btn-press w-full h-14 bg-sky-300 hover:bg-sky-400 text-white text-base font-semibold font-['Poppins'] rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-60"
        >
          {processing ? 'Memproses...' : 'Lihat Hasil Diagnosa →'}
        </button>
      </div>
    </div>
  );
}

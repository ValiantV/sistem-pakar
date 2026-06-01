'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Check } from 'lucide-react';
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user?.isLoggedIn) {
      router.replace('/login');
    }
    if (mounted && !currentPatient) {
      router.replace('/diagnosa/bio');
    }
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

  const checkedCount = selectedSymptoms.length;

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-3 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors btn-press"
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-neutral-900" />
        </button>
        <h1 className="text-neutral-900 text-lg font-bold font-['Poppins'] leading-6">
          Diagnosa Penyakit - Pertanyaan
        </h1>
      </div>

      {/* Illustration + instruction */}
      <div className="flex flex-col items-center px-5 py-4 gap-4 fade-in">
        <div className="relative w-44 h-44">
          <Image
            src="/assets/undraw_to-do-list_o3jf 1.png"
            alt="To-do list illustration"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-center text-slate-600 text-sm font-medium font-['Poppins'] leading-6 max-w-80">
          Harap mengisi seluruh pertanyaan sesuai kondisi yang dialami sebelum
          melanjutkan ke tahap berikutnya.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="px-5 mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500 font-['Poppins']">
            {checkedCount} dari {symptoms.length} gejala dipilih
          </span>
          <span className="text-xs text-sky-400 font-semibold font-['Poppins']">
            {Math.round((checkedCount / symptoms.length) * 100)}%
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-300 rounded-full transition-all duration-500"
            style={{ width: `${(checkedCount / symptoms.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Symptoms list */}
      <div className="px-5 flex flex-col gap-1.5">
        {symptoms.map((symptom, index) => {
          const isChecked = selectedSymptoms.includes(symptom.id);
          return (
            <button
              key={symptom.id}
              id={`symptom-${symptom.id}`}
              onClick={() => toggleSymptom(symptom.id)}
              className={`w-full flex justify-between items-center px-4 py-4 rounded-3xl shadow-sm border transition-all fade-in btn-press text-left ${
                isChecked
                  ? 'bg-sky-50 border-sky-300/60 shadow-sky-100'
                  : 'bg-white border-slate-200'
              }`}
              style={{ animationDelay: `${0.03 * index}s` }}
            >
              <div className="flex items-center gap-3">
                {/* Custom checkbox */}
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    isChecked
                      ? 'bg-sky-300 border-sky-300'
                      : 'bg-white border-emerald-500/30'
                  }`}
                >
                  {isChecked && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-slate-900 text-xs font-normal font-['Poppins'] leading-5 flex-1">
                  {symptom.question}
                </span>
              </div>
              <span className="text-[10px] text-gray-300 font-['Inter'] ml-2 shrink-0">
                {symptom.id}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-12 pb-6 pt-4 bg-white/90 backdrop-blur-sm border-t border-gray-100">
        <button
          id="btn-lihat-hasil"
          onClick={handleSubmit}
          disabled={processing}
          className="btn-press w-full h-14 bg-sky-300 hover:bg-sky-400 text-white text-base font-bold font-['Poppins'] leading-7 rounded-3xl flex items-center justify-center gap-2 transition-all disabled:opacity-60"
        >
          {processing ? 'Memproses...' : 'Lihat Hasil Diagnosa →'}
        </button>
      </div>
    </div>
  );
}

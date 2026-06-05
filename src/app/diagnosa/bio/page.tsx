'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { Patient } from '@/types';

export default function DiagnosaBioPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const setCurrentPatient = useAppStore((s) => s.setCurrentPatient);
  const setSelectedSymptoms = useAppStore((s) => s.setSelectedSymptoms);
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan' | ''>('');
  const [error, setError] = useState('');

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !user?.isLoggedIn) router.replace('/login');
  }, [mounted, user, router]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  const handleSubmit = () => {
    setError('');
    if (!name.trim()) { setError('Nama pasien wajib diisi.'); return; }
    if (!age || isNaN(Number(age)) || Number(age) <= 0) { setError('Usia wajib diisi dengan angka valid.'); return; }
    if (!gender) { setError('Jenis kelamin wajib dipilih.'); return; }
    const patient: Patient = { name: name.trim(), age, gender };
    setCurrentPatient(patient);
    setSelectedSymptoms([]);
    router.push('/diagnosa/pertanyaan');
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header — centered title, back arrow left */}
      <div className="px-5 pt-12 pb-3 md:max-w-2xl md:mx-auto">
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
            Diagnosa Penyakit - Bio
          </h1>
        </div>
      </div>

      {/* Medical bag icon + instruction */}
      <div className="flex flex-col items-center px-5 py-8 gap-3 fade-in md:max-w-2xl md:mx-auto">
        {/* Sky-300/10 circle with medical cross/bag */}
        <div className="w-20 h-20 bg-sky-300/10 rounded-full flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="6" y="12" width="24" height="18" rx="3" fill="#7DD3FC" opacity="0.3" />
            <rect x="6" y="12" width="24" height="18" rx="3" stroke="#7DD3FC" strokeWidth="2" />
            <path d="M13 12V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" stroke="#7DD3FC" strokeWidth="2" />
            <path d="M18 18v6M15 21h6" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-center text-neutral-900 text-base font-medium font-['Poppins'] leading-6 max-w-72">
          Silakan isi data pasien sebelum<br />melanjutkan proses diagnosa.
        </p>
      </div>

      {/* Form Card */}
      <div className="mx-5 md:max-w-2xl md:mx-auto md:px-0 p-5 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-5 fade-in" style={{ animationDelay: '0.08s' }}>
        {/* Nama Pasien */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-0.5">
            <span className="text-neutral-900 text-sm font-semibold font-['Poppins']">Nama Pasien</span>
            <span className="text-red-500 text-sm font-semibold ml-0.5">*</span>
          </label>
          <input
            id="bio-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama lengkap"
            className="w-full h-[52px] px-4 bg-white border border-slate-200 rounded-2xl text-sm font-normal font-['Poppins'] text-neutral-900 placeholder:text-zinc-400 outline-none focus:border-sky-300 transition-colors"
          />
        </div>

        {/* Usia */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-0.5">
            <span className="text-neutral-900 text-sm font-semibold font-['Poppins']">Usia</span>
            <span className="text-red-500 text-sm font-semibold ml-0.5">*</span>
          </label>
          <div className="relative">
            <input
              id="bio-age"
              type="number"
              min={1}
              max={120}
              value={age}
              onChange={(e) => {
                // Allow free typing — only store the raw value, validate on submit
                setAge(e.target.value);
              }}
              placeholder="Masukkan usia"
              className="w-full h-[52px] px-4 pr-24 bg-white border border-slate-200 rounded-2xl text-sm font-normal font-['Poppins'] text-neutral-900 placeholder:text-zinc-400 outline-none focus:border-sky-300 transition-colors"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-zinc-400 text-xs font-medium font-['Poppins'] pointer-events-none">
              Tahun
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#9CA3AF" strokeWidth="1.5" />
                <path d="M5 2v2M11 2v2M2 7h12" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Jenis Kelamin */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-0.5">
            <span className="text-neutral-900 text-sm font-semibold font-['Poppins']">Jenis Kelamin</span>
            <span className="text-red-500 text-sm font-semibold ml-0.5">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              id="gender-laki"
              type="button"
              onClick={() => setGender('Laki-laki')}
              className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all btn-press font-['Poppins'] text-sm font-normal ${
                gender === 'Laki-laki'
                  ? 'border-sky-300 bg-sky-50 text-sky-500'
                  : 'border-slate-200 bg-white text-neutral-900'
              }`}
            >
              {/* Mars icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="7" cy="11" r="5" stroke={gender === 'Laki-laki' ? '#38BDF8' : '#374151'} strokeWidth="1.5" />
                <path d="M11 7l4-4M15 3h-4M15 3v4" stroke={gender === 'Laki-laki' ? '#38BDF8' : '#374151'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Laki-laki
            </button>
            <button
              id="gender-perempuan"
              type="button"
              onClick={() => setGender('Perempuan')}
              className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all btn-press font-['Poppins'] text-sm font-normal ${
                gender === 'Perempuan'
                  ? 'border-sky-300 bg-sky-50 text-sky-500'
                  : 'border-slate-200 bg-white text-neutral-900'
              }`}
            >
              {/* Venus icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="7" r="5" stroke={gender === 'Perempuan' ? '#38BDF8' : '#374151'} strokeWidth="1.5" />
                <path d="M9 12v4M7 14h4" stroke={gender === 'Perempuan' ? '#38BDF8' : '#374151'} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Perempuan
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-['Poppins']">
            {error}
          </div>
        )}
      </div>

      {/* Submit button — full width, sky-300, rounded-full */}
      <div className="px-5 mt-6 fade-in md:max-w-2xl md:mx-auto" style={{ animationDelay: '0.16s' }}>
        <button
          id="btn-lanjutkan-diagnosa"
          onClick={handleSubmit}
          className="btn-press w-full h-14 bg-sky-300 hover:bg-sky-400 text-white text-base font-semibold font-['Poppins'] rounded-full flex items-center justify-center gap-2 transition-all"
        >
          Lanjutkan Diagnosa →
        </button>
      </div>
    </div>
  );
}

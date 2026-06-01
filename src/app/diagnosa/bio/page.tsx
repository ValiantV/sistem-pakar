'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Calendar, Users } from 'lucide-react';
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user?.isLoggedIn) {
      router.replace('/login');
    }
  }, [mounted, user, router]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  const handleSubmit = () => {
    setError('');
    if (!name.trim()) {
      setError('Nama pasien wajib diisi.');
      return;
    }
    if (!age || isNaN(Number(age)) || Number(age) <= 0) {
      setError('Usia wajib diisi dengan angka valid.');
      return;
    }
    if (!gender) {
      setError('Jenis kelamin wajib dipilih.');
      return;
    }

    const patient: Patient = { name: name.trim(), age, gender };
    setCurrentPatient(patient);
    setSelectedSymptoms([]);
    router.push('/diagnosa/pertanyaan');
  };

  return (
    <div className="min-h-screen bg-white pb-10">
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
          Diagnosa Penyakit - Bio
        </h1>
      </div>

      {/* Illustration + instruction */}
      <div className="flex flex-col items-center px-5 py-6 gap-4 fade-in">
        <div className="w-20 h-20 bg-sky-300/10 rounded-full flex items-center justify-center">
          <User size={36} className="text-sky-300" />
        </div>
        <p className="text-center text-neutral-900 text-base font-medium font-['Poppins'] leading-6 max-w-72">
          Silakan isi data pasien sebelum
          <br />
          melanjutkan proses diagnosa.
        </p>
      </div>

      {/* Form Card */}
      <div className="mx-5 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 fade-in" style={{ animationDelay: '0.1s' }}>
        {/* Nama Pasien */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1">
            <span className="text-neutral-900 text-sm font-semibold font-['Poppins'] leading-5">
              Nama Pasien
            </span>
            <span className="text-red-500 text-sm font-semibold">*</span>
          </label>
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="bio-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Usia */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1">
            <span className="text-neutral-900 text-sm font-semibold font-['Poppins'] leading-5">
              Usia
            </span>
            <span className="text-red-500 text-sm font-semibold">*</span>
          </label>
          <div className="relative">
            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="bio-age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Masukkan usia"
              className="input-field pl-10 pr-20"
              min="1"
              max="120"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium font-['Poppins']">
              Tahun
            </span>
          </div>
        </div>

        {/* Jenis Kelamin */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-1">
            <span className="text-neutral-900 text-sm font-semibold font-['Poppins'] leading-5">
              Jenis Kelamin
            </span>
            <span className="text-red-500 text-sm font-semibold">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              id="gender-laki"
              type="button"
              onClick={() => setGender('Laki-laki')}
              className={`h-14 rounded-3xl border flex items-center justify-center gap-2 transition-all btn-press ${
                gender === 'Laki-laki'
                  ? 'border-sky-300 bg-sky-50 text-sky-500'
                  : 'border-gray-200 bg-gray-50 text-neutral-900'
              }`}
            >
              <Users size={18} />
              <span className="text-base font-normal font-['Poppins'] leading-6">Laki-laki</span>
            </button>
            <button
              id="gender-perempuan"
              type="button"
              onClick={() => setGender('Perempuan')}
              className={`h-14 rounded-3xl border flex items-center justify-center gap-2 transition-all btn-press ${
                gender === 'Perempuan'
                  ? 'border-sky-300 bg-sky-50 text-sky-500'
                  : 'border-gray-200 bg-gray-50 text-neutral-900'
              }`}
            >
              <Users size={18} />
              <span className="text-base font-normal font-['Poppins'] leading-6">Perempuan</span>
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm font-['Poppins']">
            {error}
          </div>
        )}
      </div>

      {/* Submit button */}
      <div className="px-12 mt-6 fade-in" style={{ animationDelay: '0.2s' }}>
        <button
          id="btn-lanjutkan-diagnosa"
          onClick={handleSubmit}
          className="btn-press w-full h-14 bg-sky-300 hover:bg-sky-400 text-white text-base font-bold font-['Poppins'] leading-7 rounded-3xl flex items-center justify-center gap-2 transition-all"
        >
          Lanjutkan Diagnosa
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

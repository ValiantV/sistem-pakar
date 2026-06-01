'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  UserPlus,
  LogIn,
  ClipboardList,
  CheckSquare,
  BarChart2,
  AlertTriangle,
  Stethoscope,
  HelpCircle,
} from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <UserPlus size={20} className="text-sky-400" />,
    title: 'Registrasi Akun',
    desc: 'Buat akun baru dengan mengisi nama, email, dan password pada halaman Registrasi. Akun Anda tersimpan aman di perangkat.',
  },
  {
    id: 2,
    icon: <LogIn size={20} className="text-sky-400" />,
    title: 'Login',
    desc: 'Masuk menggunakan email dan password yang telah didaftarkan untuk mengakses semua fitur aplikasi.',
  },
  {
    id: 3,
    icon: <ClipboardList size={20} className="text-sky-400" />,
    title: 'Isi Data Pasien',
    desc: 'Sebelum diagnosa, isi nama, usia, dan jenis kelamin pasien. Data ini digunakan untuk mencatat riwayat pemeriksaan.',
  },
  {
    id: 4,
    icon: <CheckSquare size={20} className="text-sky-400" />,
    title: 'Pilih Gejala',
    desc: 'Centang semua gejala yang sedang dialami dari daftar 23 pertanyaan yang tersedia. Pilih dengan jujur sesuai kondisi.',
  },
  {
    id: 5,
    icon: <BarChart2 size={20} className="text-sky-400" />,
    title: 'Lihat Hasil Diagnosa',
    desc: 'Sistem akan menghitung probabilitas setiap penyakit berdasarkan gejala yang dipilih dan menampilkan hasil tertinggi beserta langkah penanganan awal.',
  },
  {
    id: 6,
    icon: <Stethoscope size={20} className="text-sky-400" />,
    title: 'Cek Riwayat',
    desc: 'Semua hasil diagnosa tersimpan otomatis. Buka menu Riwayat Diagnosis untuk melihat histori pemeriksaan sebelumnya.',
  },
];

export default function BantuanPage() {
  const router = useRouter();

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
          Bantuan Aplikasi
        </h1>
      </div>

      {/* Intro card */}
      <div className="mx-5 mb-6 p-5 bg-gradient-to-br from-sky-300 to-sky-400 rounded-3xl fade-in">
        <div className="flex items-center gap-3 mb-3">
          <HelpCircle size={24} className="text-white" />
          <h2 className="text-white text-base font-bold font-['Poppins']">
            Panduan Penggunaan
          </h2>
        </div>
        <p className="text-white/90 text-xs font-normal font-['Poppins'] leading-5">
          Sistem Pakar Diagnosa Penyakit membantu Anda mengidentifikasi kemungkinan
          penyakit berdasarkan gejala yang dialami menggunakan metode probabilitas
          berbasis aturan.
        </p>
      </div>

      {/* Steps */}
      <div className="px-5 flex flex-col gap-4">
        <h3 className="text-neutral-900 text-base font-bold font-['Poppins']">
          Langkah Penggunaan
        </h3>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex gap-4 fade-in"
            style={{ animationDelay: `${0.08 * index}s` }}
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-full bg-sky-100 mt-1" />
              )}
            </div>
            <div className="pb-6 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sky-300 text-xs font-bold font-['Poppins']">
                  Langkah {step.id}
                </span>
              </div>
              <h4 className="text-neutral-900 text-sm font-semibold font-['Poppins'] mb-1">
                {step.title}
              </h4>
              <p className="text-gray-500 text-xs font-normal font-['Poppins'] leading-5">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mx-5 mt-2 p-4 bg-amber-50 rounded-3xl border border-amber-200 fade-in">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-700 text-xs font-bold font-['Poppins'] mb-1">
              Penting
            </p>
            <p className="text-amber-600 text-xs font-normal font-['Poppins'] leading-5">
              Aplikasi ini hanya sebagai alat bantu informasi awal, bukan pengganti
              diagnosis medis profesional. Selalu konsultasikan kondisi kesehatan Anda
              kepada dokter atau tenaga medis.
            </p>
          </div>
        </div>
      </div>

      {/* Quick start button */}
      <div className="px-5 mt-6">
        <Link
          href="/diagnosa/bio"
          id="btn-mulai-dari-bantuan"
          className="btn-press w-full py-4 bg-sky-300 hover:bg-sky-400 rounded-3xl flex items-center justify-center gap-2 text-white text-base font-bold font-['Poppins'] transition-all"
        >
          <Stethoscope size={20} />
          Mulai Diagnosa Sekarang
        </Link>
      </div>

      {/* Disease list quick link */}
      <div className="px-5 mt-3">
        <Link
          href="/daftar-penyakit"
          id="btn-daftar-dari-bantuan"
          className="btn-press w-full py-4 bg-slate-100 hover:bg-slate-200 rounded-3xl flex items-center justify-center gap-2 text-slate-700 text-sm font-semibold font-['Poppins'] transition-all"
        >
          <ClipboardList size={18} />
          Lihat Daftar Penyakit
        </Link>
      </div>
    </div>
  );
}

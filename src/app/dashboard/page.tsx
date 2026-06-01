'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, List, Stethoscope, History, HelpCircle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const menuItems = [
  {
    id: 'menu-daftar-penyakit',
    href: '/daftar-penyakit',
    title: 'Daftar Penyakit',
    desc: 'Ensiklopedia medis\nlengkap',
    icon: <List size={24} className="text-sky-300" />,
    bg: 'bg-emerald-100',
  },
  {
    id: 'menu-diagnosis',
    href: '/diagnosa/bio',
    title: 'Diagnosis',
    desc: 'Identifikasi Penyakit',
    icon: <Stethoscope size={24} className="text-sky-300" />,
    bg: 'bg-emerald-100',
  },
  {
    id: 'menu-riwayat',
    href: '/riwayat',
    title: 'Riwayat Diagnosis',
    desc: 'Hasil diagnosa pemeriksaan sebelumnya',
    icon: <History size={24} className="text-sky-300" />,
    bg: 'bg-emerald-100',
  },
  {
    id: 'menu-bantuan',
    href: '/bantuan',
    title: 'Bantuan',
    desc: 'Panduan penggunaan',
    icon: <HelpCircle size={24} className="text-sky-300" />,
    bg: 'bg-emerald-100',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user?.isLoggedIn) {
      router.replace('/login');
    }
  }, [mounted, user, router]);

  if (!mounted || !user?.isLoggedIn) {
    return <div className="min-h-screen bg-white" />;
  }

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Top bar */}
      <div className="px-5 pt-8 pb-4 flex justify-between items-start">
        <div>
          <p className="text-sky-300 text-sm font-medium font-['Poppins']">
            Halo, Selamat Datang
          </p>
          <h1 className="text-slate-900 text-2xl font-bold font-['Poppins'] leading-8 mt-0.5">
            Sistem Pakar
            <br />
            Diagnosa Penyakit
          </h1>
        </div>
        <button
          id="btn-logout"
          onClick={handleLogout}
          className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center card-hover btn-press"
          aria-label="Logout"
        >
          <LogOut size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Hero Feature Card */}
      <div className="mx-5 rounded-3xl shadow-sm border border-emerald-500/20 bg-white overflow-hidden fade-in">
        <div className="p-5 flex justify-between items-center">
          <div className="flex flex-col gap-4 max-w-[180px]">
            <span className="px-2 py-0.5 bg-emerald-500/10 rounded-full text-sky-300 text-[10px] font-bold font-['Inter'] uppercase tracking-wide w-fit">
              Fitur Utama
            </span>
            <div>
              <h2 className="text-gray-900 text-xl font-bold font-['Inter'] leading-6">
                Diagnosa
                <br />
                Penyakit
              </h2>
              <p className="text-gray-500 text-xs font-normal font-['Inter'] leading-4 mt-1">
                Identifikasi penyakit
                <br />
                berdasarkan gejala klinis Anda
                <br />
                dengan cepat.
              </p>
            </div>
            <Link
              href="/diagnosa/bio"
              id="btn-mulai-diagnosa"
              className="btn-press h-10 px-4 bg-sky-300 rounded-2xl flex justify-center items-center gap-2 w-fit text-white text-sm font-semibold font-['Inter'] hover:bg-sky-400 transition-colors"
            >
              Mulai Diagnosa
              <span>→</span>
            </Link>
          </div>
          <div className="relative w-36 h-24">
            <Image
              src="/assets/undraw_medicine_hqqg 1.png"
              alt="Medicine illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Menu section */}
      <div className="px-5 mt-6">
        <h3 className="text-gray-900 text-base font-bold font-['Poppins'] capitalize leading-5 mb-4">
          Menu Layanan
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              id={item.id}
              className="p-5 bg-white/70 rounded-[32px] shadow-sm border border-slate-200 backdrop-blur-sm flex flex-col gap-4 card-hover fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className={`w-12 h-12 ${item.bg} rounded-3xl flex justify-center items-center`}>
                {item.icon}
              </div>
              <div>
                <p className="text-slate-900 text-sm font-bold font-['Poppins'] leading-5">
                  {item.title}
                </p>
                <p className="text-slate-500 text-[10px] font-normal font-['Poppins'] leading-3 mt-0.5 whitespace-pre-line">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Greeting */}
      <div className="px-5 mt-6 text-center text-gray-400 text-xs font-['Poppins']">
        Logged in as <span className="text-sky-300 font-semibold">{user.name}</span>
      </div>
    </div>
  );
}

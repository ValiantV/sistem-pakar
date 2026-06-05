'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';

// Figma-accurate icon components using SVG paths from the Figma design
function IconDaftarPenyakit() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="12" height="16" rx="2" fill="#7DD3FC" />
      <rect x="6" y="6" width="8" height="1.5" rx="0.75" fill="white" />
      <rect x="6" y="9" width="8" height="1.5" rx="0.75" fill="white" />
      <rect x="6" y="12" width="5" height="1.5" rx="0.75" fill="white" />
    </svg>
  );
}
function IconDiagnosa() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#7DD3FC" strokeWidth="2" />
      <path d="M12 8v4M12 16h.01" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconRiwayat() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 3v5h5" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7v5l4 2" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconBantuan() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#7DD3FC" strokeWidth="2" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17h.01" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const menuItems = [
  {
    id: 'menu-daftar-penyakit',
    href: '/daftar-penyakit',
    title: 'Daftar Penyakit',
    desc: 'Ensiklopedia medis\nlengkap',
    icon: <IconDaftarPenyakit />,
  },
  {
    id: 'menu-diagnosis',
    href: '/diagnosa/bio',
    title: 'Diagnosis',
    desc: 'Identifikasi Penyakit',
    icon: <IconDiagnosa />,
  },
  {
    id: 'menu-riwayat',
    href: '/riwayat',
    title: 'Riwayat Diagnosis',
    desc: 'Hasil diagnosa\npemeriksaan sebelumnya',
    icon: <IconRiwayat />,
  },
  {
    id: 'menu-bantuan',
    href: '/bantuan',
    title: 'Bantuan',
    desc: 'Panduan penggunaan',
    icon: <IconBantuan />,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !user?.isLoggedIn) router.replace('/login');
  }, [mounted, user, router]);

  if (!mounted || !user?.isLoggedIn) return <div className="min-h-screen bg-white" />;

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="md:max-w-7xl md:mx-auto md:px-8">
      {/* Top bar */}
      <div className="px-5 pt-12 pb-4 flex justify-between items-start">
        <div className="flex flex-col gap-0.5">
          <p className="text-sky-300 text-sm font-medium font-['Poppins'] leading-5">
            Halo, Selamat Datang
          </p>
          <h1 className="text-slate-900 text-2xl font-bold font-['Poppins'] leading-8">
            Sistem Pakar<br />Diagnosa Penyakit
          </h1>
        </div>
        {/* Logout button — square icon style from Figma */}
        <button
          id="btn-logout"
          onClick={handleLogout}
          className="w-12 h-12 bg-white rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-center card-hover btn-press"
          aria-label="Logout"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16 17 21 12 16 7" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Hero Feature Card */}
      <div className="mx-5 rounded-3xl shadow-sm border border-slate-200 bg-white overflow-hidden fade-in">
        <div className="p-5 flex justify-between items-start gap-3">
          <div className="flex flex-col gap-3 flex-1">
            <span className="px-2.5 py-0.5 bg-emerald-50 rounded-full text-sky-400 text-[10px] font-semibold font-['Inter'] uppercase tracking-widest w-fit border border-emerald-100">
              FITUR UTAMA
            </span>
            <div>
              <h2 className="text-gray-900 text-xl font-bold font-['Inter'] leading-7">
                Diagnosa<br />Penyakit
              </h2>
              <p className="text-gray-500 text-xs font-normal font-['Inter'] leading-5 mt-1.5">
                Identifikasi penyakit<br />berdasarkan gejala klinis Anda<br />dengan cepat.
              </p>
            </div>
            <Link
              href="/diagnosa/bio"
              id="btn-mulai-diagnosa"
              className="btn-press h-10 px-5 bg-sky-300 rounded-2xl flex items-center gap-2 w-fit text-white text-sm font-semibold font-['Inter'] hover:bg-sky-400 transition-colors"
            >
              Mulai Diagnosa →
            </Link>
          </div>
          <div className="relative w-36 h-28 shrink-0">
            <Image
              src="/assets/undraw_medicine_hqqg 1.png"
              alt="Medicine illustration"
              fill
              className="object-contain object-right-bottom"
            />
          </div>
        </div>
      </div>

      </div>

      {/* Menu section */}
      <div className="px-5 mt-7 md:max-w-7xl md:mx-auto md:px-8">
        <h3 className="text-gray-900 text-base font-bold font-['Poppins'] leading-5 mb-4">
          Menu Layanan
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              id={item.id}
              className="p-5 bg-white rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-slate-200 flex flex-col gap-4 card-hover fade-in"
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-3xl flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <p className="text-slate-900 text-sm font-bold font-['Poppins'] leading-5">
                  {item.title}
                </p>
                <p className="text-slate-500 text-[11px] font-normal font-['Poppins'] leading-4 mt-0.5 whitespace-pre-line">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { EyeOff, Eye } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      router.replace('/dashboard');
    } else {
      setError(result.error ?? 'Login gagal.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 pt-8 pb-10">
      {/* Hero illustration */}
      <div className="flex justify-center mb-6 fade-in">
        <div className="relative w-64 h-52">
          <Image
            src="/assets/undraw_access-account_aydp 1.png"
            alt="Login illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-8 fade-in" style={{ animationDelay: '0.05s' }}>
        <h1 className="text-2xl font-bold text-neutral-900 font-['Poppins']">
          Selamat Datang!
        </h1>
        <p className="text-zinc-500 text-base font-normal mt-1 font-['Poppins']">
          Silahkan login untuk melanjutkan
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-5 fade-in" style={{ animationDelay: '0.1s' }}>
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-neutral-900 text-sm font-normal font-['Poppins']">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email Anda"
            className="w-full h-[52px] px-4 bg-white border border-slate-200 rounded-xl text-sm font-normal font-['Poppins'] text-zinc-500 placeholder:text-zinc-400 outline-none focus:border-sky-300 transition-colors"
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-neutral-900 text-sm font-normal font-['Poppins']">
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password Anda"
              className="w-full h-[52px] px-4 pr-12 bg-white border border-slate-200 rounded-xl text-sm font-normal font-['Poppins'] text-zinc-500 placeholder:text-zinc-400 outline-none focus:border-sky-300 transition-colors"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <div className="text-right">
            <span className="text-sky-400 text-sm font-normal font-['Poppins'] cursor-pointer">
              Lupa Password ?
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-['Poppins']">
            {error}
          </div>
        )}

        {/* Login button */}
        <button
          id="btn-login"
          type="submit"
          disabled={loading}
          className="btn-press w-full h-14 bg-sky-300 hover:bg-sky-400 text-white font-semibold text-base font-['Poppins'] rounded-2xl transition-all disabled:opacity-60"
        >
          {loading ? 'Memproses...' : 'Login'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-neutral-900 text-sm font-normal font-['Poppins']">Atau</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google button */}
        <button
          type="button"
          id="btn-google"
          className="btn-press w-full h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
        >
          {/* Google G icon */}
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 33 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.4 26.8 36 24 36c-5.2 0-9.6-3-11.3-7.4L6 33.7C9.4 39.8 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.4-2.4 4.4-4.4 5.8l6.2 5.2C40.9 36.2 44 30.6 44 24c0-1.3-.1-2.6-.4-3.9z"/>
          </svg>
          <span className="text-neutral-900 text-base font-bold font-['Poppins']">
            Lanjutkan dengan Google
          </span>
        </button>

        {/* Sign up link */}
        <div className="flex justify-center items-center gap-1">
          <span className="text-neutral-900 text-sm font-normal font-['Poppins']">
            Belum mempunyai akun?
          </span>
          <Link
            href="/register"
            id="link-to-register"
            className="text-sky-400 text-sm font-normal font-['Poppins'] hover:text-sky-500 transition-colors"
          >
            Daftar
          </Link>
        </div>
      </form>
    </div>
  );
}

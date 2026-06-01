'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col px-6 pt-10 pb-8 bg-white">
      {/* Hero illustration */}
      <div className="flex justify-center mb-6 fade-in">
        <div className="relative w-60 h-60">
          <Image
            src="/assets/undraw_access-account_aydp 1.png"
            alt="Login illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-8 fade-in" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-2xl font-bold text-zinc-900 font-['Poppins']">
          Selamat Datang!
        </h1>
        <p className="text-zinc-500 text-base font-medium mt-1 font-['Poppins']">
          Silahkan login untuk melanjutkan
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 fade-in" style={{ animationDelay: '0.15s' }}>
        {/* Email */}
        <div>
          <label className="text-zinc-500 text-xs font-medium font-['Poppins'] mb-1 block">
            Email
          </label>
          <div className="relative">
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email Anda"
              className="input-field"
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-zinc-500 text-xs font-medium font-['Poppins'] mb-1 block">
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password Anda"
              className="input-field pr-12"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="text-right mt-1">
            <span className="text-sky-300 text-xs font-semibold font-['Poppins'] cursor-pointer">
              Lupa Password?
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm font-['Poppins']">
            {error}
          </div>
        )}

        {/* Login button */}
        <button
          id="btn-login"
          type="submit"
          disabled={loading}
          className="btn-press w-full h-12 bg-sky-300 hover:bg-sky-400 text-white font-medium text-sm font-['Poppins'] rounded-[10px] shadow-[0px_0px_0px_1px_rgba(109,189,255,1.00)] transition-all disabled:opacity-60 mt-2"
        >
          {loading ? 'Memproses...' : 'LogIn'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-1">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-zinc-500 text-xs font-['Poppins']">Atau</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Sign up link */}
        <div className="flex justify-center items-center gap-1.5">
          <span className="text-zinc-500 text-xs font-medium font-['Poppins']">
            Belum mempunyai akun?
          </span>
          <Link
            href="/register"
            id="link-to-register"
            className="text-sky-300 text-xs font-semibold font-['Poppins'] hover:text-sky-400 transition-colors"
          >
            Daftar
          </Link>
        </div>
      </form>
    </div>
  );
}

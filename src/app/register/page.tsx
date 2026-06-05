'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { EyeOff, Eye } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAppStore((s) => s.register);
  const login = useAppStore((s) => s.login);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Semua field wajib diisi.');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const result = register({ name, email, password });
    if (result.success) {
      login(email, password);
      router.replace('/dashboard');
    } else {
      setError(result.error ?? 'Registrasi gagal.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 pt-8 pb-10">
      {/* Hero illustration */}
      <div className="flex justify-center mb-5 fade-in">
        <div className="relative w-60 h-48">
          <Image
            src="/assets/undraw_online-profile_v9c1 (1) 1.png"
            alt="Register illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-8 fade-in" style={{ animationDelay: '0.05s' }}>
        <h1 className="text-2xl font-bold text-neutral-900 font-['Poppins']">
          Registrasi Akun
        </h1>
        <p className="text-zinc-500 text-base font-normal mt-1 font-['Poppins']">
          Silakan lengkapi data berikut
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className="flex flex-col gap-5 fade-in" style={{ animationDelay: '0.1s' }}>
        {/* Nama */}
        <div className="flex flex-col gap-1.5">
          <label className="text-neutral-900 text-sm font-normal font-['Poppins']">
            Nama
          </label>
          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan Nama Anda"
            className="w-full h-[52px] px-4 bg-white border border-slate-200 rounded-xl text-sm font-normal font-['Poppins'] text-zinc-500 placeholder:text-zinc-400 outline-none focus:border-sky-300 transition-colors"
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-neutral-900 text-sm font-normal font-['Poppins']">
            Email
          </label>
          <input
            id="register-email"
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
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password Anda"
              className="w-full h-[52px] px-4 pr-12 bg-white border border-slate-200 rounded-xl text-sm font-normal font-['Poppins'] text-zinc-500 placeholder:text-zinc-400 outline-none focus:border-sky-300 transition-colors"
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-neutral-900 text-sm font-normal font-['Poppins']">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              id="register-confirm-password"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Masukkan Password Anda"
              className="w-full h-[52px] px-4 pr-12 bg-white border border-slate-200 rounded-xl text-sm font-normal font-['Poppins'] text-zinc-500 placeholder:text-zinc-400 outline-none focus:border-sky-300 transition-colors"
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-['Poppins']">
            {error}
          </div>
        )}

        {/* Register button */}
        <button
          id="btn-register"
          type="submit"
          disabled={loading}
          className="btn-press w-full h-14 bg-sky-300 hover:bg-sky-400 text-white font-semibold text-base font-['Poppins'] rounded-2xl transition-all disabled:opacity-60 mt-1"
        >
          {loading ? 'Mendaftar...' : 'Daftar'}
        </button>

        {/* Login link */}
        <div className="flex justify-center items-center gap-1">
          <span className="text-neutral-900 text-sm font-normal font-['Poppins']">
            Sudah mempunyai akun?
          </span>
          <Link
            href="/login"
            id="link-to-login"
            className="text-sky-400 text-sm font-normal font-['Poppins'] hover:text-sky-500 transition-colors"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

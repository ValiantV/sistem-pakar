import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistem Pakar Diagnosa Penyakit",
  description:
    "Aplikasi sistem pakar berbasis kecerdasan buatan untuk membantu mengidentifikasi kemungkinan penyakit berdasarkan gejala klinis yang dialami.",
  keywords: "sistem pakar, diagnosa penyakit, kesehatan, gejala, penyakit",
  openGraph: {
    title: "Sistem Pakar Diagnosa Penyakit",
    description:
      "Identifikasi penyakit berdasarkan gejala klinis Anda dengan cepat dan akurat.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="gradient-bg">
        <div className="app-container shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-brand-900 text-white">
      <div className="max-w-5xl mx-auto px-4 pt-5 pb-0">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight leading-tight">
              Türk Müziği Araştırma Öneri Değerlendirme Sistemi
            </h1>
            <p className="text-brand-200 text-sm mt-1">
              Meta-tematik analiz veritabanı destekli yapay zeka ön hakemlik modülü
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end text-right text-xs text-brand-300 gap-0.5">
            <span>Demo Sürümü</span>
            <span>Mock Veri</span>
          </div>
        </div>

        <nav className="flex gap-1 mt-4">
          <Link
            href="/"
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              pathname === '/'
                ? 'bg-slate-900 text-white'
                : 'text-brand-200 hover:text-white hover:bg-brand-800'
            }`}
          >
            Öneri Değerlendirme
          </Link>
          <Link
            href="/veritabani"
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              pathname === '/veritabani'
                ? 'bg-slate-900 text-white'
                : 'text-brand-200 hover:text-white hover:bg-brand-800'
            }`}
          >
            Tez Veritabanı
            <span className="ml-1.5 text-xs bg-brand-700 text-brand-200 px-1.5 py-0.5 rounded-full">78</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

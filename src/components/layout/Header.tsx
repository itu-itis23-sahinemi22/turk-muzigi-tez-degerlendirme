export default function Header() {
  return (
    <header className="bg-brand-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-5">
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
      </div>
    </header>
  );
}

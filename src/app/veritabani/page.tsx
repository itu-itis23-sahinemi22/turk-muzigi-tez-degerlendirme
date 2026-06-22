'use client';
import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import rawData from '@/data/database.json';

interface Thesis {
  ID: number;
  'Yıl': string;
  'Başlık': string;
  'Yazar': string;
  'Tez Türü': string;
  'Anahtar Kelimeler': string;
  'Yöntem': string;
}

const data = rawData as Thesis[];
const ALL_YEARS = Array.from(new Set(data.map(r => r['Yıl']))).sort();
const ALL_TYPES = Array.from(new Set(data.map(r => r['Tez Türü']))).sort();

const TEZ_TURU_SHORT: Record<string, string> = {
  'Yüksek Lisans Tezi': 'YL',
  'Doktora Tezi': 'DR',
  'Sanatta Yeterlik Tezi': 'SY',
  'Doktora (Dissertasiya)': 'DR*',
};

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((p, i) =>
    new RegExp(escaped, 'i').test(p)
      ? <mark key={i} className="bg-yellow-400/30 text-yellow-200 rounded px-0.5">{p}</mark>
      : p
  );
}

export default function VeritabaniPage() {
  const [query, setQuery] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterType, setFilterType] = useState('');
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter(t => {
      if (filterYear && t['Yıl'] !== filterYear) return false;
      if (filterType && t['Tez Türü'] !== filterType) return false;
      if (!q) return true;
      return (
        t['Başlık'].toLowerCase().includes(q) ||
        t['Yazar'].toLowerCase().includes(q) ||
        t['Anahtar Kelimeler'].toLowerCase().includes(q) ||
        t['Yöntem'].toLowerCase().includes(q)
      );
    });
  }, [query, filterYear, filterType]);

  function toggleExpand(id: number) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function clearFilters() {
    setQuery('');
    setFilterYear('');
    setFilterType('');
  }

  const hasFilters = query || filterYear || filterType;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-6">

        {/* Search + Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Başlık, yazar, anahtar kelime veya yöntem ara..."
            className="w-full border border-slate-600 bg-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />

          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={filterYear}
              onChange={e => setFilterYear(e.target.value)}
              className="border border-slate-600 bg-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              <option value="">Tüm Yıllar</option>
              {ALL_YEARS.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="border border-slate-600 bg-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              <option value="">Tüm Tez Türleri</option>
              {ALL_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <span className="text-sm text-slate-400 ml-auto">
              <span className="font-semibold text-slate-200">{results.length}</span> / {data.length} tez
            </span>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-2 transition-colors"
              >
                Filtreleri temizle
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2">
          {results.length === 0 && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-slate-500 text-sm">
              Arama kriterlerinize uygun tez bulunamadı.
            </div>
          )}

          {results.map(thesis => {
            const isOpen = expanded.has(thesis.ID);
            return (
              <div
                key={thesis.ID}
                className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
              >
                {/* Header row */}
                <button
                  onClick={() => toggleExpand(thesis.ID)}
                  className="w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-slate-700/40 transition-colors group"
                >
                  <span className="shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center rounded bg-slate-700 text-xs font-mono text-slate-400">
                    {thesis.ID}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-100 leading-snug">
                      {highlight(thesis['Başlık'], query)}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
                      <span className="text-xs text-slate-400">
                        {highlight(thesis['Yazar'], query)}
                      </span>
                      <span className="text-xs text-slate-500">{thesis['Yıl']}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-brand-900/60 text-brand-300 border border-brand-800 font-medium">
                        {TEZ_TURU_SHORT[thesis['Tez Türü']] ?? thesis['Tez Türü']}
                      </span>
                      <span className="text-xs text-slate-600 hidden sm:inline">{thesis['Tez Türü']}</span>
                    </div>
                  </div>

                  <span className="shrink-0 mt-1 text-slate-500 group-hover:text-slate-300 transition-colors text-xs">
                    {isOpen ? '▲' : '▼'}
                  </span>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="border-t border-slate-700 px-4 py-4 space-y-4 bg-slate-900/40">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                        Anahtar Kelimeler
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {highlight(thesis['Anahtar Kelimeler'], query)}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                        Yöntem
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {highlight(thesis['Yöntem'], query)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-slate-700 bg-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-4 text-xs text-slate-500 flex justify-between items-center">
          <span>Türk Müziği Araştırma Öneri Değerlendirme Sistemi — Demo</span>
          <span>Mock Veri · Next.js</span>
        </div>
      </footer>
    </div>
  );
}

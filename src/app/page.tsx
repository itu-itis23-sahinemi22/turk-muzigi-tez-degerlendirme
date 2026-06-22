'use client';
import { useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import ProposalForm from '@/components/form/ProposalForm';
import ResultsPanel from '@/components/results/ResultsPanel';
import { AnalysisResponse, ProposalInput } from '@/lib/types';

export default function Home() {
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(data: ProposalInput) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentStep(0);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Sunucu hatası. Lütfen tekrar deneyin.');
      }

      const analysisResult: AnalysisResponse = await res.json();
      setResult(analysisResult);

      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

      [1, 2, 3, 4].forEach(step => {
        setTimeout(() => setCurrentStep(step), step * 900);
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-8">
        <div className="bg-indigo-900/30 border border-indigo-700 rounded-xl p-4 text-sm text-indigo-300">
          <strong className="text-indigo-200">Demo Notu:</strong> Bu sistem, lisansüstü tezlerden türetilen meta-tematik analiz verileri kullanılarak geliştirilmiştir. Sonuçlar gerçek LLM veya vektör veritabanı olmaksızın kural tabanlı bir analiz motoru ile üretilmektedir.
        </div>

        <ProposalForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 text-sm text-red-300">
            <strong className="text-red-200">Hata:</strong> {error}
          </div>
        )}

        {isLoading && (
          <div className="space-y-4" aria-busy="true">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-slate-700" />
                  <div className="h-4 bg-slate-700 rounded w-48" />
                </div>
                <div className="pl-11 space-y-2">
                  <div className="h-3 bg-slate-700/60 rounded w-full" />
                  <div className="h-3 bg-slate-700/60 rounded w-3/4" />
                  <div className="h-2 bg-slate-700/60 rounded-full w-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {result && !isLoading && (
          <div ref={resultsRef}>
            <ResultsPanel result={result} currentStep={currentStep} />
          </div>
        )}
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

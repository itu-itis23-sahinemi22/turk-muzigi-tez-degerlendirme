import StepCard from './StepCard';
import ScoreBar from '@/components/ui/ScoreBar';
import Badge from '@/components/ui/Badge';
import { MethodCompatibilityResult } from '@/lib/types';

interface Props {
  result: MethodCompatibilityResult;
  visible: boolean;
}

export default function Step2MethodCompatibility({ result, visible }: Props) {
  return (
    <StepCard
      stepNumber={2}
      title="Yöntem–Problem Uyumu Analizi"
      badge={<Badge level={result.level} />}
      visible={visible}
    >
      <div className="space-y-4">
        <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Tespit Edilen Yöntem</span>
            <span className="font-semibold text-sm text-brand-400">{result.detectedMethod}</span>
          </div>
          <div className="flex items-center justify-between mt-2 mb-1.5">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Uyumluluk Skoru</span>
            <span className="text-lg font-bold text-slate-100">%{Math.round(result.compatibilityScore * 100)}</span>
          </div>
          <ScoreBar score={result.compatibilityScore} showPercent={false} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="border border-emerald-700 rounded-lg p-3 bg-emerald-900/20">
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Uyumlu Temalar</h4>
            {result.compatibleThemes.length > 0 ? (
              <ul className="space-y-1">
                {result.compatibleThemes.map(t => (
                  <li key={t} className="flex items-center gap-1.5 text-sm text-emerald-300">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-emerald-500 italic">Bu yöntem için uyumlu tema tespit edilmedi.</p>
            )}
          </div>

          <div className="border border-red-700 rounded-lg p-3 bg-red-900/20">
            <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">Uyumsuz Temalar</h4>
            {result.incompatibleThemes.length > 0 ? (
              <ul className="space-y-1">
                {result.incompatibleThemes.map(t => (
                  <li key={t} className="flex items-center gap-1.5 text-sm text-red-300">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-red-500 italic">Uyumsuz tema tespit edilmedi.</p>
            )}
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
          <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">Değerlendirme</h4>
          <p className="text-sm text-blue-200">{result.recommendation}</p>
        </div>
      </div>
    </StepCard>
  );
}

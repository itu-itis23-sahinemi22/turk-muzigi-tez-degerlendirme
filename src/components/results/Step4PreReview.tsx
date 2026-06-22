import StepCard from './StepCard';
import { PreReviewReport } from '@/lib/types';

interface Props {
  result: PreReviewReport;
  visible: boolean;
}

const verdictStyle: Record<PreReviewReport['verdict'], string> = {
  'Güçlü Öneri':               'bg-emerald-900/40 border-emerald-600 text-emerald-300',
  'Revizyon Önerilir':          'bg-amber-900/40 border-amber-600 text-amber-300',
  'Önemli Revizyonlar Gerekli': 'bg-red-900/40 border-red-600 text-red-300',
};

const scoreColor = (s: number) =>
  s >= 70 ? 'text-emerald-400' : s >= 45 ? 'text-amber-400' : 'text-red-400';

export default function Step4PreReview({ result, visible }: Props) {
  return (
    <StepCard
      stepNumber={4}
      title="Ön Hakem Görüşü"
      badge={
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full border text-xs font-semibold ${verdictStyle[result.verdict]}`}>
          {result.verdict}
        </span>
      }
      visible={visible}
    >
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className={`text-5xl font-extrabold tabular-nums ${scoreColor(result.overallScore)}`}>
            {result.overallScore}
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Genel Değerlendirme Puanı</div>
            <div className="font-semibold text-slate-200 mt-0.5">{result.verdict}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Güçlü Yönler
            </h4>
            <ul className="space-y-1.5">
              {result.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Geliştirilmesi Gereken Yönler
            </h4>
            <ul className="space-y-1.5">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Özgünlük Değerlendirmesi</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{result.originalityAssessment}</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Yöntemsel Uygunluk</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{result.methodologicalSuitability}</p>
          </div>
        </div>

        <div className="border border-brand-700 rounded-lg p-3 bg-brand-900/20">
          <h4 className="text-xs font-semibold text-brand-300 uppercase tracking-wide mb-2">Önerilen İyileştirmeler</h4>
          <ol className="space-y-1.5 list-none">
            {result.suggestedImprovements.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-700 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </StepCard>
  );
}

import StepCard from './StepCard';
import ScoreBar from '@/components/ui/ScoreBar';
import Badge from '@/components/ui/Badge';
import YearlyBarChart from '@/components/ui/YearlyBarChart';
import { ResearchGapResult } from '@/lib/types';

interface Props {
  result: ResearchGapResult;
  visible: boolean;
}

export default function Step3ResearchGap({ result, visible }: Props) {
  return (
    <StepCard
      stepNumber={3}
      title="Araştırma Boşluğu Analizi"
      badge={<Badge level={result.noveltyLevel} />}
      visible={visible}
    >
      <div className="space-y-4">
        <YearlyBarChart data={result.yearlyData} themeLabel={result.topThemeLabel} />

        <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Boşluk Kapsama Skoru</span>
            <span className="text-lg font-bold text-slate-100">%{Math.round(result.gapCoverageScore * 100)}</span>
          </div>
          <ScoreBar score={result.gapCoverageScore} showPercent={false} />
          <p className="text-sm text-slate-300 mt-2">{result.interpretation}</p>
        </div>

        {result.addressedGaps.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">İlgili Araştırma Boşlukları</h4>
            {result.addressedGaps.map(gap => (
              <div key={gap.themeId} className="border border-slate-700 rounded-lg p-3 bg-slate-900/40">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <span className="font-medium text-sm text-slate-200 leading-tight">{gap.label}</span>
                  <span className="text-xs font-semibold shrink-0 px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                    Boşluk: %{Math.round(gap.gapScore * 100)}
                  </span>
                </div>
                <ScoreBar score={gap.gapScore} />
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{gap.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {gap.undercoveredAspects.map(a => (
                    <span key={a} className="inline-flex items-center px-2 py-0.5 rounded-md bg-orange-900/30 text-orange-300 text-xs font-medium border border-orange-700">{a}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">Araştırma boşluğu verisi bulunan tema eşleşmesi yapılamadı.</p>
        )}
      </div>
    </StepCard>
  );
}

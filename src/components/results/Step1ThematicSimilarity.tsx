import StepCard from './StepCard';
import ScoreBar from '@/components/ui/ScoreBar';
import Badge from '@/components/ui/Badge';
import { ThematicSimilarityResult } from '@/lib/types';

interface Props {
  result: ThematicSimilarityResult;
  visible: boolean;
}

export default function Step1ThematicSimilarity({ result, visible }: Props) {
  const level = result.overallScore >= 0.65 ? 'yüksek' : result.overallScore >= 0.35 ? 'orta' : 'düşük';

  return (
    <StepCard
      stepNumber={1}
      title="Tematik Benzerlik Analizi"
      badge={<Badge level={level} />}
      visible={visible}
    >
      <div className="space-y-4">
        <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Genel Tematik Uyum Skoru</span>
            <span className="text-lg font-bold text-slate-100">%{Math.round(result.overallScore * 100)}</span>
          </div>
          <ScoreBar score={result.overallScore} showPercent={false} />
          <p className="text-sm text-slate-300 mt-2">{result.interpretation}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">En Yakın Temalar</h4>
          <div className="space-y-3">
            {result.topMatches.filter(m => m.similarityScore > 0).map(match => (
              <div key={match.themeId} className="border border-slate-700 rounded-lg p-3 bg-slate-900/40">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm text-slate-200">{match.label}</span>
                  <span className="text-xs text-slate-500 ml-2 shrink-0">{match.thesisCount} tez</span>
                </div>
                <ScoreBar score={match.similarityScore} />
                {match.matchedKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {match.matchedKeywords.slice(0, 6).map(kw => (
                      <span key={kw} className="keyword-chip">{kw}</span>
                    ))}
                    {match.matchedKeywords.length > 6 && (
                      <span className="keyword-chip">+{match.matchedKeywords.length - 6}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
            {result.topMatches.every(m => m.similarityScore === 0) && (
              <p className="text-sm text-slate-500 italic">Eşleşen tema bulunamadı. Anahtar kelimelerinizi genişletmeyi deneyin.</p>
            )}
          </div>
        </div>
      </div>
    </StepCard>
  );
}

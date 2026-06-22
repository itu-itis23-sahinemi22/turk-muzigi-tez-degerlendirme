import { ResearchGapResult, ThemeMatch, GapMatch } from '@/lib/types';
import gapsData from '@/data/gaps.json';

export function analyzeResearchGap(topMatches: ThemeMatch[]): ResearchGapResult {
  const weightedGaps: GapMatch[] = [];

  for (const match of topMatches.slice(0, 4)) {
    const gapEntry = gapsData.gaps.find(g => g.themeId === match.themeId);
    if (!gapEntry) continue;

    const weightedScore = match.similarityScore * gapEntry.gapScore;
    weightedGaps.push({
      themeId: gapEntry.themeId,
      label: gapEntry.label,
      gapScore: gapEntry.gapScore,
      description: gapEntry.description,
      undercoveredAspects: gapEntry.undercoveredAspects,
      weightedScore: Math.round(weightedScore * 100) / 100,
    });
  }

  weightedGaps.sort((a, b) => b.weightedScore - a.weightedScore);

  const totalWeight = weightedGaps.reduce((sum, g) => sum + g.weightedScore, 0);
  const maxPossible = topMatches.slice(0, 4).length * 0.87;
  const gapCoverageScore = maxPossible > 0
    ? Math.min(Math.round((totalWeight / maxPossible) * 100) / 100, 1)
    : 0;

  let noveltyLevel: 'yüksek' | 'orta' | 'düşük';
  if (gapCoverageScore >= 0.55) noveltyLevel = 'yüksek';
  else if (gapCoverageScore >= 0.30) noveltyLevel = 'orta';
  else noveltyLevel = 'düşük';

  let interpretation: string;
  if (noveltyLevel === 'yüksek') {
    const topGap = weightedGaps[0];
    interpretation = `Öneriniz, alanda belirgin araştırma boşlukları bulunan "${topGap?.label.split('—')[0].trim()}" gibi temalara odaklanmaktadır. Bu durum çalışmanın özgünlük potansiyelini güçlendirmektedir.`;
  } else if (noveltyLevel === 'orta') {
    interpretation = `Öneriniz, araştırma boşluğu bulunan bazı temalarla ilişkilendirilebilir. Boşluğa katkının daha net ortaya konulması özgünlük değerlendirmesini olumlu etkileyecektir.`;
  } else {
    interpretation = `Öneriniz ağırlıklı olarak yoğun biçimde çalışılmış temalara girmektedir. Mevcut literatürden nasıl farklılaştığının ve hangi boşluğu doldurduğunun açıkça ifade edilmesi kritik önem taşımaktadır.`;
  }

  return {
    addressedGaps: weightedGaps,
    gapCoverageScore,
    noveltyLevel,
    interpretation,
  };
}

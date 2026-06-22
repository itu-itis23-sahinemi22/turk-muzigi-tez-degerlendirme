import { ProposalInput, ThematicSimilarityResult, ThemeMatch } from '@/lib/types';
import { tokenize, partialMatchScore } from '@/lib/similarity';
import thesesData from '@/data/theses.json';

export function analyzeThematicSimilarity(input: ProposalInput): ThematicSimilarityResult {
  const allText = [
    input.title,
    input.problemStatement,
    input.researchPurpose,
    input.researchQuestions,
    input.proposedMethod,
    input.keywords,
  ].join(' ');

  const inputTokens = tokenize(allText);
  const titleTokens = tokenize(input.title);

  const matches: ThemeMatch[] = thesesData.themes.map(theme => {
    const { score, matched } = partialMatchScore(inputTokens, theme.keywords);

    const labelTokens = tokenize(theme.label);
    const titleLabelOverlap = titleTokens.some(t =>
      labelTokens.some(lt => lt.includes(t) || t.includes(lt))
    );
    const titleBonus = titleLabelOverlap ? 0.08 : 0;

    const finalScore = Math.min(score + titleBonus, 1);

    return {
      themeId: theme.id,
      label: theme.label,
      similarityScore: Math.round(finalScore * 100) / 100,
      matchedKeywords: matched,
      thesisCount: theme.thesisCount,
    };
  });

  const sorted = matches.sort((a, b) => b.similarityScore - a.similarityScore);
  const topMatches = sorted.slice(0, 4);

  const weights = [0.5, 0.3, 0.15, 0.05];
  const overallScore = topMatches.reduce((sum, match, i) => {
    return sum + match.similarityScore * weights[i];
  }, 0);

  const rounded = Math.round(overallScore * 100) / 100;

  let interpretation: string;
  if (rounded >= 0.65) {
    interpretation = `Öneriniz mevcut Türk Müziği literatürüyle güçlü bir tematik örtüşme göstermektedir. Başta "${topMatches[0]?.label}" olmak üzere birden fazla temada yüksek benzerlik tespit edilmiştir.`;
  } else if (rounded >= 0.35) {
    interpretation = `Öneriniz "${topMatches[0]?.label}" ve "${topMatches[1]?.label}" temaları ile orta düzey benzerlik taşımaktadır. Tematik odağın güçlendirilmesi değerlendirmeyi olumlu etkileyecektir.`;
  } else {
    interpretation = `Öneriniz mevcut temalardan belirgin biçimde ayrışmaktadır. Bu durum yenilikçi bir odak işareti olabilir; ancak araştırmanın Türk Müziği literatürüne bağlantısının daha açık ifade edilmesi önerilir.`;
  }

  return {
    topMatches,
    overallScore: rounded,
    interpretation,
  };
}

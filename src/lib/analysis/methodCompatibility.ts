import { MethodCompatibilityResult, ThemeMatch } from '@/lib/types';
import { tokenize, partialMatchScore } from '@/lib/similarity';
import methodsData from '@/data/methods.json';
import thesesData from '@/data/theses.json';

export function analyzeMethodCompatibility(
  proposedMethod: string,
  topMatches: ThemeMatch[]
): MethodCompatibilityResult {
  const methodTokens = tokenize(proposedMethod);

  let bestMethod = methodsData.methods[0];
  let bestScore = 0;

  for (const method of methodsData.methods) {
    const { score } = partialMatchScore(methodTokens, method.keywords);
    const labelTokens = tokenize(method.label);
    const labelHit = labelTokens.some(lt => methodTokens.includes(lt));
    const totalScore = score + (labelHit ? 0.3 : 0);
    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestMethod = method;
    }
  }

  const top3ThemeIds = topMatches.slice(0, 3).map(m => m.themeId);

  const compatibleThemeLabels: string[] = [];
  const incompatibleThemeLabels: string[] = [];

  for (const themeId of top3ThemeIds) {
    const theme = thesesData.themes.find(t => t.id === themeId);
    if (!theme) continue;
    if (bestMethod.compatibleThemes.includes(themeId)) {
      compatibleThemeLabels.push(theme.label);
    }
    if (bestMethod.incompatibleThemes.includes(themeId)) {
      incompatibleThemeLabels.push(theme.label);
    }
  }

  const compatibleCount = compatibleThemeLabels.length;
  const incompatibleCount = incompatibleThemeLabels.length;
  const totalChecked = top3ThemeIds.length || 1;

  const rawScore = (compatibleCount / totalChecked) - (incompatibleCount * 0.2);
  const compatibilityScore = Math.max(0, Math.min(1, Math.round(rawScore * 100) / 100));

  let level: 'yüksek' | 'orta' | 'düşük';
  if (compatibilityScore >= 0.6) level = 'yüksek';
  else if (compatibilityScore >= 0.3) level = 'orta';
  else level = 'düşük';

  let recommendation: string;
  if (level === 'yüksek') {
    recommendation = `"${bestMethod.label}" yöntemi, belirlenen araştırma temasıyla yüksek uyum sergilemektedir. Bu yöntemin seçimi metodolojik açıdan güçlü bir tercih olarak değerlendirilebilir.`;
  } else if (level === 'orta') {
    recommendation = `"${bestMethod.label}" yöntemi araştırma temasıyla kısmen uyumludur. Yöntemin araştırma amacıyla ilişkisinin daha ayrıntılı gerekçelendirilmesi önerilir.`;
  } else {
    recommendation = `"${bestMethod.label}" yöntemi, belirlenen araştırma temasıyla sınırlı uyum göstermektedir. Daha uygun bir yöntemin (örn. ${bestMethod.compatibleThemes.slice(0, 2).map(id => thesesData.themes.find(t => t.id === id)?.label || id).join(', ')} için yaygın yöntemler) değerlendirilmesi tavsiye edilir.`;
  }

  return {
    detectedMethod: bestMethod.label,
    detectedMethodId: bestMethod.id,
    compatibilityScore,
    compatibleThemes: compatibleThemeLabels,
    incompatibleThemes: incompatibleThemeLabels,
    recommendation,
    level,
  };
}

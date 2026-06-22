const STOP_WORDS = new Set([
  've', 'bir', 'bu', 'için', 'ile', 'de', 'da', 'den', 'dan', 'ki', 'ne',
  'var', 'yok', 'olan', 'olan', 'olarak', 'gibi', 'kadar', 'daha', 'çok',
  'en', 'her', 'bazı', 'tüm', 'bütün', 'hiç', 'nasıl', 'neden', 'hangi',
  'ya', 'ya da', 'veya', 'ama', 'fakat', 'ancak', 'çünkü', 'eğer', 'ise',
  'mi', 'mı', 'mu', 'mü', 'değil', 'hem', 'hem de', 'sadece', 'yalnız',
  'tarafından', 'üzerinde', 'üzerine', 'içinde', 'dışında', 'sonra', 'önce',
  'arasında', 'açısından', 'bakımından', 'itibaren', 'göre', 'karşı',
  'the', 'and', 'of', 'in', 'to', 'a', 'is', 'that', 'it', 'with', 'as',
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,!?;:()[\]{}"'«»""''\/\\-]/g, ' ')
    .split(/\s+/)
    .map(t => t.trim())
    .filter(t => t.length > 2 && !STOP_WORDS.has(t));
}

export function jaccardSimilarity(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = a.filter(x => setB.has(x));
  const unionArr = Array.from(setA);
  b.forEach(x => { if (!setA.has(x)) unionArr.push(x); });
  return intersection.length / unionArr.length;
}

export function partialMatchScore(inputTokens: string[], keywords: string[]): {
  score: number;
  matched: string[];
} {
  const matched: string[] = [];
  let hits = 0;

  for (const kw of keywords) {
    const kwTokens = tokenize(kw);
    const kwStr = kw.toLowerCase();

    const directHit = inputTokens.some(t => t === kwStr || kwStr.includes(t) || t.includes(kwStr));
    const tokenHit = kwTokens.some(kt => inputTokens.includes(kt));

    if (directHit || tokenHit) {
      matched.push(kw);
      hits++;
    }
  }

  const score = Math.min(hits / Math.max(keywords.length * 0.5, 1), 1);
  return { score, matched };
}

import {
  PreReviewReport,
  ThematicSimilarityResult,
  MethodCompatibilityResult,
  ResearchGapResult,
  ProposalInput,
} from '@/lib/types';

export function generatePreReview(
  step1: ThematicSimilarityResult,
  step2: MethodCompatibilityResult,
  step3: ResearchGapResult,
  input: ProposalInput
): PreReviewReport {
  const rawScore =
    step1.overallScore * 30 +
    step2.compatibilityScore * 35 +
    step3.gapCoverageScore * 35;

  const overallScore = Math.round(Math.min(Math.max(rawScore * 100, 0), 100));

  let verdict: PreReviewReport['verdict'];
  if (overallScore >= 70) verdict = 'Güçlü Öneri';
  else if (overallScore >= 45) verdict = 'Revizyon Önerilir';
  else verdict = 'Önemli Revizyonlar Gerekli';

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (step1.overallScore >= 0.5) {
    strengths.push(`Araştırma, Türk Müziği literatürüyle iyi tematik uyum sergilemektedir (başat tema: ${step1.topMatches[0]?.label}).`);
  }
  if (step2.level === 'yüksek') {
    strengths.push(`Seçilen "${step2.detectedMethod}" yöntemi araştırma temasıyla metodolojik açıdan uyumludur.`);
  }
  if (step3.noveltyLevel === 'yüksek') {
    strengths.push(`Araştırma, alanda belirgin bir boşluğu hedeflemekte ve özgünlük potansiyeli taşımaktadır.`);
  }
  const titleWords = input.title.trim().split(/\s+/).length;
  if (titleWords >= 7) {
    strengths.push(`Araştırma başlığı yeterince açıklayıcı ve kapsamlıdır.`);
  }
  if (input.researchQuestions.includes('?')) {
    strengths.push(`Araştırma soruları soru biçiminde açıkça ifade edilmiştir.`);
  }
  if (step1.topMatches[0]?.matchedKeywords.length >= 3) {
    strengths.push(`Anahtar kavramlar literatürle güçlü örtüşme sağlamaktadır.`);
  }

  if (step1.overallScore < 0.3) {
    weaknesses.push(`Tematik odak yeterince net değildir; araştırmanın hangi alt alana katkı sunduğu belirsiz kalmaktadır.`);
  }
  if (step2.level === 'düşük') {
    weaknesses.push(`"${step2.detectedMethod}" yöntemi belirlenen araştırma temasıyla sınırlı uyum göstermektedir; yöntem seçimi gerekçelendirilmeli veya revize edilmelidir.`);
  }
  if (step2.incompatibleThemes.length > 0) {
    weaknesses.push(`Önerilen yöntem, ilgili bazı temalarla (${step2.incompatibleThemes.join(', ')}) uyumsuzluk göstermektedir.`);
  }
  if (step3.noveltyLevel === 'düşük') {
    weaknesses.push(`Araştırma boşluğuna katkı sınırlıdır; çalışmanın mevcut literatürden nasıl farklılaştığı daha net ortaya konulmalıdır.`);
  }
  if (!input.researchQuestions.includes('?')) {
    weaknesses.push(`Araştırma soruları soru biçiminde ifade edilmemiştir; bu durum değerlendirmede belirsizliğe yol açmaktadır.`);
  }
  if (input.problemStatement.trim().split(/\s+/).length < 20) {
    weaknesses.push(`Problem durumu çok kısa tutulmuştur; araştırmanın gerekliliğini ortaya koyan kapsamlı bir gerekçe sunulması beklenmektedir.`);
  }

  if (strengths.length === 0) {
    strengths.push('Araştırma konusu Türk Müziği alanında incelenmeye değer bir problem tanımlamaktadır.');
  }
  if (weaknesses.length === 0) {
    weaknesses.push('Araştırma önerisinde büyük bir zayıflık tespit edilmemiş olmakla birlikte küçük metodolojik iyileştirmeler yapılabilir.');
  }

  const topTheme = step1.topMatches[0]?.label || 'belirlenen tema';

  const originalityAssessment = step3.noveltyLevel === 'yüksek'
    ? `Araştırma, "${topTheme}" alanındaki mevcut boşlukları hedeflemesi bakımından özgünlük potansiyeli taşımaktadır. Özellikle ${step3.addressedGaps[0]?.undercoveredAspects.slice(0, 2).join(' ve ')} konularındaki yetersizlik göz önüne alındığında çalışmanın alana özgün bir katkı sunabileceği değerlendirilmektedir.`
    : step3.noveltyLevel === 'orta'
    ? `Araştırmanın özgünlük düzeyi orta olarak değerlendirilmektedir. Odak konunun literatürdeki benzer çalışmalardan ne şekilde ayrıştığının net biçimde ortaya konulması özgünlük gerekçesini güçlendirecektir.`
    : `Araştırma konusu literatürde yoğun çalışılmış bir alana girmektedir. Özgün katkı sunabilmek için niş bir odak belirlenmesi ve mevcut çalışmaları hangi açıdan aştığının açıkça ifade edilmesi zorunludur.`;

  const methodologicalSuitability = step2.level === 'yüksek'
    ? `"${step2.detectedMethod}" yöntemi, "${topTheme}" gibi temalar için literatürde yaygın biçimde kullanılan ve uygunluğu kanıtlanmış bir yaklaşımdır. Veri toplama ve analiz süreçlerinin ayrıntılı tanımlanması yeterlilik açısından önemlidir.`
    : step2.level === 'orta'
    ? `"${step2.detectedMethod}" yöntemi araştırma amacıyla kısmen uyumludur; ancak bu yöntemin tercih gerekçesinin ilgili literatür referanslarıyla desteklenmesi beklenmektedir.`
    : `Seçilen yöntem araştırma problemiyle metodolojik uyumsuzluk işaretleri göstermektedir. Yöntem seçiminin yeniden değerlendirilmesi ya da seçilen yöntemin araştırma soruları bağlamında ayrıntılı biçimde savunulması gereklidir.`;

  const improvementPool: string[] = [
    `Problem durumu bölümü genişletilmeli; araştırmanın pratik ve kuramsal gerekliliği somut verilerle desteklenmelidir.`,
    `Araştırma sorularının ölçülebilir ve sınanabilir biçimde yeniden düzenlenmesi önerilir.`,
    `Anahtar kelimeler, ilgili temaların terminolojisiyle (${step1.topMatches.slice(0, 2).map(m => m.matchedKeywords.slice(0, 2).join(', ')).join('; ')}) zenginleştirilmelidir.`,
    `Araştırmanın sınırlılıkları ve kapsamı başlangıç bölümünde açıkça belirtilmelidir.`,
    `Önerilen yöntemin veri toplama araçları (ölçek, görüşme formu, gözlem protokolü vb.) tanımlanmalıdır.`,
    `Literatür boşluğunu ortaya koyan güncel (son 5 yıl) çalışmalara atıf yapılması önerilir.`,
    `Çalışmanın beklenen katkıları (kuramsal / uygulamalı) ayrı başlıklar altında belirtilmelidir.`,
  ];

  const suggestedImprovements: string[] = [];
  if (input.problemStatement.trim().split(/\s+/).length < 30) suggestedImprovements.push(improvementPool[0]);
  if (!input.researchQuestions.includes('?')) suggestedImprovements.push(improvementPool[1]);
  if (step1.overallScore < 0.5) suggestedImprovements.push(improvementPool[2]);
  suggestedImprovements.push(improvementPool[4]);
  if (suggestedImprovements.length < 3) suggestedImprovements.push(improvementPool[5]);
  if (suggestedImprovements.length < 3) suggestedImprovements.push(improvementPool[6]);

  return {
    overallScore,
    verdict,
    strengths,
    weaknesses,
    originalityAssessment,
    methodologicalSuitability,
    suggestedImprovements: suggestedImprovements.slice(0, 4),
  };
}

export interface ProposalInput {
  title: string;
  problemStatement: string;
  researchPurpose: string;
  proposedMethod: string;
}

export interface ThemeMatch {
  themeId: string;
  label: string;
  similarityScore: number;
  matchedKeywords: string[];
  thesisCount: number;
}

export interface ThematicSimilarityResult {
  topMatches: ThemeMatch[];
  overallScore: number;
  interpretation: string;
}

export interface MethodCompatibilityResult {
  detectedMethod: string;
  detectedMethodId: string;
  compatibilityScore: number;
  compatibleThemes: string[];
  incompatibleThemes: string[];
  recommendation: string;
  level: 'yüksek' | 'orta' | 'düşük';
}

export interface GapMatch {
  themeId: string;
  label: string;
  gapScore: number;
  description: string;
  undercoveredAspects: string[];
  weightedScore: number;
}

export interface YearlyDataPoint {
  year: number;
  count: number;
}

export interface ResearchGapResult {
  addressedGaps: GapMatch[];
  gapCoverageScore: number;
  noveltyLevel: 'yüksek' | 'orta' | 'düşük';
  interpretation: string;
  yearlyData: YearlyDataPoint[];
  topThemeLabel: string;
}

export interface PreReviewReport {
  overallScore: number;
  verdict: 'Güçlü Öneri' | 'Revizyon Önerilir' | 'Önemli Revizyonlar Gerekli';
  strengths: string[];
  weaknesses: string[];
  originalityAssessment: string;
  methodologicalSuitability: string;
  suggestedImprovements: string[];
}

export interface AnalysisResponse {
  step1: ThematicSimilarityResult;
  step2: MethodCompatibilityResult;
  step3: ResearchGapResult;
  step4: PreReviewReport;
}

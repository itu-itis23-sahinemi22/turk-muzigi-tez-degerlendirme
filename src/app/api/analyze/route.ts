import { NextRequest, NextResponse } from 'next/server';
import { ProposalInput } from '@/lib/types';
import { analyzeThematicSimilarity } from '@/lib/analysis/thematicSimilarity';
import { analyzeMethodCompatibility } from '@/lib/analysis/methodCompatibility';
import { analyzeResearchGap } from '@/lib/analysis/researchGap';
import { generatePreReview } from '@/lib/analysis/preReview';

export async function POST(req: NextRequest) {
  let body: ProposalInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek formatı.' }, { status: 400 });
  }

  const required: (keyof ProposalInput)[] = [
    'title', 'problemStatement', 'researchPurpose',
    'researchQuestions', 'proposedMethod', 'keywords',
  ];

  for (const field of required) {
    if (!body[field] || body[field].trim().length < 3) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur.' },
        { status: 400 }
      );
    }
  }

  const step1 = analyzeThematicSimilarity(body);
  const step2 = analyzeMethodCompatibility(body.proposedMethod, step1.topMatches);
  const step3 = analyzeResearchGap(step1.topMatches);
  const step4 = generatePreReview(step1, step2, step3, body);

  return NextResponse.json({ step1, step2, step3, step4 });
}

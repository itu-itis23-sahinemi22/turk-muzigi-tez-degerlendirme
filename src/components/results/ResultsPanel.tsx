import StepProgress from '@/components/ui/StepProgress';
import Step1ThematicSimilarity from './Step1ThematicSimilarity';
import Step2MethodCompatibility from './Step2MethodCompatibility';
import Step3ResearchGap from './Step3ResearchGap';
import Step4PreReview from './Step4PreReview';
import { AnalysisResponse } from '@/lib/types';

interface Props {
  result: AnalysisResponse;
  currentStep: number;
}

export default function ResultsPanel({ result, currentStep }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-sm p-6">
        <h2 className="text-base font-semibold text-slate-100 mb-4">Değerlendirme Süreci</h2>
        <StepProgress currentStep={currentStep} />
      </div>

      <Step1ThematicSimilarity result={result.step1} visible={currentStep >= 1} />
      <Step2MethodCompatibility result={result.step2} visible={currentStep >= 2} />
      <Step3ResearchGap result={result.step3} visible={currentStep >= 3} />
      <Step4PreReview result={result.step4} visible={currentStep >= 4} />
    </div>
  );
}

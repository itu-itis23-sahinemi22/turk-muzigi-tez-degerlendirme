const STEPS = [
  'Tematik Benzerlik',
  'Yöntem Uyumu',
  'Araştırma Boşluğu',
  'Ön Hakem Görüşü',
];

export default function StepProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-start">
        {STEPS.map((label, i) => {
          const done = currentStep > i;
          const active = currentStep === i;
          const isLast = i === STEPS.length - 1;

          return (
            <div key={i} className={`flex items-start ${isLast ? 'shrink-0' : 'flex-1'}`}>
              {/* Circle + label */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500
                  ${done    ? 'bg-brand-500 border-brand-500 text-white' :
                    active  ? 'bg-slate-800 border-brand-400 text-brand-300' :
                              'bg-slate-800 border-slate-600 text-slate-500'}
                `}>
                  {done ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (i + 1)}
                </div>
                <span className={`text-xs mt-1.5 text-center hidden sm:block whitespace-nowrap transition-colors duration-300 ${done || active ? 'text-brand-400 font-medium' : 'text-slate-600'}`}>
                  {label}
                </span>
              </div>

              {/* Connector line (not after last step) */}
              {!isLast && (
                <div className="flex-1 pt-4 px-1">
                  <div className={`h-0.5 transition-colors duration-500 ${done ? 'bg-brand-500' : 'bg-slate-700'}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

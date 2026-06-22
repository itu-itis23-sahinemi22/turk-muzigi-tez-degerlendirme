'use client';
import { ReactNode } from 'react';

interface StepCardProps {
  stepNumber: number;
  title: string;
  badge?: ReactNode;
  visible: boolean;
  children: ReactNode;
}

export default function StepCard({ stepNumber, title, badge, visible, children }: StepCardProps) {
  return (
    <div className={`step-card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-700 text-white flex items-center justify-center text-sm font-bold">
          {stepNumber}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-slate-100 text-base">{title}</h3>
            {badge}
          </div>
        </div>
      </div>
      <div className="pl-11">
        {children}
      </div>
    </div>
  );
}

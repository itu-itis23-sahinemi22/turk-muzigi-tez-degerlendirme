'use client';
import { useEffect, useState } from 'react';

interface ScoreBarProps {
  score: number; // 0–1
  label?: string;
  showPercent?: boolean;
}

function getColor(score: number) {
  if (score >= 0.65) return 'bg-emerald-500';
  if (score >= 0.35) return 'bg-amber-500';
  return 'bg-red-500';
}

export default function ScoreBar({ score, label, showPercent = true }: ScoreBarProps) {
  const [width, setWidth] = useState(0);
  const pct = Math.round(score * 100);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 100);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-slate-400">{label}</span>}
          {showPercent && <span className="text-xs font-semibold text-slate-300 ml-auto">%{pct}</span>}
        </div>
      )}
      <div className="score-bar-track">
        <div
          className={`score-bar-fill ${getColor(score)}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

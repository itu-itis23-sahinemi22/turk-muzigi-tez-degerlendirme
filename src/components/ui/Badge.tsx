interface BadgeProps {
  level: 'yüksek' | 'orta' | 'düşük' | string;
  size?: 'sm' | 'md';
}

const colorMap: Record<string, string> = {
  'yüksek': 'bg-emerald-900/40 text-emerald-300 border-emerald-700',
  'orta':   'bg-amber-900/40 text-amber-300 border-amber-700',
  'düşük':  'bg-red-900/40 text-red-300 border-red-700',
};

export default function Badge({ level, size = 'sm' }: BadgeProps) {
  const colors = colorMap[level] ?? 'bg-slate-700 text-slate-300 border-slate-600';
  const sizeClass = size === 'md' ? 'px-3 py-1 text-sm font-semibold' : 'px-2 py-0.5 text-xs font-medium';
  return (
    <span className={`inline-flex items-center rounded-full border ${colors} ${sizeClass} capitalize`}>
      {level}
    </span>
  );
}

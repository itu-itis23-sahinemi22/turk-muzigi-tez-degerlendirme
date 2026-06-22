'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { YearlyDataPoint } from '@/lib/types';

interface Props {
  data: YearlyDataPoint[];
  themeLabel: string;
}

export default function YearlyBarChart({ data, themeLabel }: Props) {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  const yMax = maxCount + 1;

  return (
    <div className="bg-slate-900/60 rounded-lg border border-slate-700 p-4">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
        Yıllara Göre Çalışma Dağılımı
        {themeLabel && (
          <span className="normal-case ml-1 text-slate-500">— {themeLabel}</span>
        )}
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid
            vertical={false}
            stroke="#334155"
            strokeDasharray="0"
          />
          <XAxis
            dataKey="year"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={2}
          />
          <YAxis
            allowDecimals={false}
            domain={[0, yMax]}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={24}
          />
          <Tooltip
            cursor={{ fill: 'rgba(139,92,246,0.1)' }}
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#e2e8f0',
            }}
            formatter={(value) => [value, 'Çalışma Sayısı']}
            labelFormatter={(label) => String(label)}
          />
          <Bar
            dataKey="count"
            fill="#6d28d9"
            radius={[2, 2, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

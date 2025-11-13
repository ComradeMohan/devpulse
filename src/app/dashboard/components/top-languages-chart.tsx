'use client';

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { CardDescription } from '@/components/ui/card';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export default function TopLanguagesChart({ languages }: { languages: { name: string, count: number }[] }) {
  const top5 = languages.slice(0, 5);

  if (top5.length === 0) {
    return <CardDescription>Not enough data to display language chart.</CardDescription>;
  }

  return (
    <div className="w-full h-[250px] flex items-center">
      <div className="w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Pie
              data={top5}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              nameKey="name"
              stroke="hsl(var(--border))"
            >
              {top5.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-1/2 flex flex-col gap-2 text-sm">
        {top5.map((lang, index) => (
          <div key={lang.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="font-medium">{lang.name}</span>
            <span className="text-muted-foreground ml-auto">
              {((lang.count / languages.reduce((acc, l) => acc + l.count, 0)) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

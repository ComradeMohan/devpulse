'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { CardDescription } from '@/components/ui/card';

type ContributionDay = {
  contributionCount: number;
  date: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export default function CommitsPerMonthChart({ weeks }: { weeks: ContributionWeek[] }) {
  const contributions = weeks.flatMap(week => week.contributionDays);
  const monthlyData: Record<string, number> = {};

  contributions.forEach(day => {
    const date = new Date(day.date);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    
    monthlyData[key] = (monthlyData[key] || 0) + day.contributionCount;
  });

  const chartData = Object.entries(monthlyData)
    .map(([name, commits]) => ({ name, commits }))
    .slice(-12); // Last 12 months

  if (chartData.length === 0) {
    return <CardDescription>Not enough data to display commits chart.</CardDescription>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
          contentStyle={{
            background: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Bar dataKey="commits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

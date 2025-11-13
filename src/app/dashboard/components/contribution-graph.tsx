'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ContributionDay = {
  contributionCount: number;
  date: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

const getContributionColor = (count: number) => {
  if (count === 0) return 'bg-muted/30';
  if (count <= 2) return 'bg-primary/20';
  if (count <= 5) return 'bg-primary/50';
  if (count <= 10) return 'bg-primary/80';
  return 'bg-primary';
};

export default function ContributionGraph({ weeks }: { weeks: ContributionWeek[] }) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const allDays = Array(7).fill(null).map(() => Array(weeks.length).fill(null));

  weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach(day => {
      allDays[day.weekday][weekIndex] = day;
    });
  });

  return (
    <TooltipProvider>
      <div className="flex gap-2 text-xs text-muted-foreground">
        <div className="flex flex-col gap-2 pt-6">
          {weekDays.map((day, i) => ( i % 2 !== 0 && <div key={day}>{day}</div> ))}
        </div>
        <div className="grid grid-flow-col gap-1 overflow-x-auto pb-4">
          {allDays[0].map((_, weekIndex) => (
            <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-1">
              {allDays.map((week, dayIndex) => {
                 const day = week[weekIndex];
                 if (!day) return <div key={`${weekIndex}-${dayIndex}`} className="w-3 h-3 rounded-sm bg-muted/10" />;
                 
                 return (
                  <Tooltip key={day.date} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <div className={cn("w-3 h-3 rounded-sm", getContributionColor(day.contributionCount))} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{day.contributionCount} contributions on {new Date(day.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </TooltipContent>
                  </Tooltip>
                 )
              })}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

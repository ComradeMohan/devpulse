import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ContributionDay = {
  contributionCount: number;
  date: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export function calculateStreaks(weeks: ContributionWeek[]) {
  const contributions: ContributionDay[] = weeks.flatMap(week => week.contributionDays);
  
  const contributionDates = contributions
    .filter(day => day.contributionCount > 0)
    .map(day => new Date(day.date))
    .sort((a, b) => a.getTime() - b.getTime());

  if (contributionDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Calculate longest streak
  let longestStreak = 0;
  let currentLongestStreak = 0;
  if (contributionDates.length > 0) {
    currentLongestStreak = 1;
    longestStreak = 1;
    for (let i = 1; i < contributionDates.length; i++) {
      const currentDate = contributionDates[i];
      const previousDate = contributionDates[i-1];
      const diffTime = currentDate.getTime() - previousDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentLongestStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentLongestStreak);
        currentLongestStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, currentLongestStreak);
  }

  // Calculate current streak
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0,0,0,0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const lastContributionDate = contributionDates[contributionDates.length - 1];
  if (lastContributionDate) {
    lastContributionDate.setHours(0,0,0,0);
    const diffWithToday = today.getTime() - lastContributionDate.getTime();
    
    if(diffWithToday / (1000 * 60 * 60 * 24) <= 1) { // has contributed today or yesterday
      currentStreak = 1;
      for (let i = contributionDates.length - 2; i >= 0; i--) {
        const d1 = contributionDates[i+1];
        const d2 = contributionDates[i];
        const diffTime = d1.getTime() - d2.getTime();
        if (Math.round(diffTime / (1000 * 60 * 60 * 24)) === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }
  
  return { currentStreak, longestStreak };
}

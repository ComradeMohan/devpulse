'use client';

import { useProfile } from "@/components/layout/app-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Code,
  GitCommit,
  GitFork,
  Star,
  Users,
  Zap,
  Calendar,
  Flame,
} from "lucide-react";
import { calculateStreaks } from "@/lib/utils";
import TopLanguagesChart from "./components/top-languages-chart";
import ContributionGraph from "./components/contribution-graph";
import CommitsPerMonthChart from "./components/commits-per-month-chart";
import AiInsights from "./components/ai-insights";
import { Skeleton } from "@/components/ui/skeleton";

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-headline">{value}</div>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-pulse">
       <Skeleton className="h-10 w-1/3 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
             <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
             <Skeleton className="h-[250px] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { profile, loading } = useProfile();
  
  if (loading || !profile) {
    return <DashboardSkeleton />;
  }

  const streaks = calculateStreaks(profile.contributions.weeks);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl font-bold font-headline mb-8">
        GitHub Dashboard for {profile.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<GitCommit />} value={profile.stats.commits.toLocaleString()} label="Total Commits" />
        <StatCard icon={<BarChart />} value={profile.stats.projects} label="Public Repositories" />
        <StatCard icon={<Star />} value={profile.stats.stars.toLocaleString()} label="Stars Earned" />
        <StatCard icon={<Users />} value={profile.stats.followers} label="Followers" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<GitFork />} value={profile.stats.forks.toLocaleString()} label="Total Forks" />
        <StatCard icon={<Code />} value={profile.stats.tech} label="Tech Mastered" />
        <StatCard icon={<Zap />} value={profile.stats.experience} label="Years of Experience" />
        <StatCard icon={<Flame />} value={`${streaks.currentStreak} days`} label="Current Streak" />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Commits per Month</CardTitle>
          </CardHeader>
          <CardContent>
             <CommitsPerMonthChart weeks={profile.contributions.weeks} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Top 5 Languages</CardTitle>
          </CardHeader>
          <CardContent>
             <TopLanguagesChart languages={profile.stats.topLanguages} />
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <AiInsights profile={profile} />
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Yearly Contribution Graph
          </CardTitle>
          <CardDescription>
            Longest streak: {streaks.longestStreak} days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContributionGraph weeks={profile.contributions.weeks} />
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Most Active Repositories</CardTitle>
          <CardDescription>Top repositories based on stars</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.repositories.slice(0, 6).map(repo => (
            <Card key={repo.name} className="bg-card/70 border-border/70 p-4 flex flex-col justify-between">
              <div>
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  <h3 className="font-bold text-primary hover:underline">{repo.name}</h3>
                </a>
                <p className="text-sm text-muted-foreground mt-1 mb-2 line-clamp-2">{repo.description}</p>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-4">
                {repo.primaryLanguage && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                    {repo.primaryLanguage.name}
                  </span>
                )}
                <span className="flex items-center gap-1"><Star size={12}/>{repo.stargazerCount}</span>
                <span className="flex items-center gap-1"><GitFork size={12}/>{repo.forkCount}</span>
                <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

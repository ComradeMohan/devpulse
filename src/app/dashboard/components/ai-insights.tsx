'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { type ContributionAnalysisInput, type ContributionAnalysisOutput } from '@/ai/flows/contribution-analysis-insights';
import type { GitHubProfile } from '@/lib/github';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getInsightsAction } from '../actions';

type AiInsightsProps = {
  profile: GitHubProfile;
};

export default function AiInsights({ profile }: AiInsightsProps) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<ContributionAnalysisOutput | null>(null);
  const { toast } = useToast();

  const handleGetInsights = async () => {
    setLoading(true);
    setInsights(null);

    const topLanguagesMap = profile.stats.topLanguages.reduce((acc, lang) => {
      acc[lang.name] = lang.count;
      return acc;
    }, {} as Record<string, number>);

    const input: ContributionAnalysisInput = {
      totalCommits: profile.stats.commits,
      publicRepos: profile.stats.projects,
      starsEarned: profile.stats.stars,
      forks: profile.stats.forks,
      followersCount: profile.stats.followers,
      techMastered: profile.stats.topLanguages.map(l => l.name),
      yearsOfExperience: profile.stats.experience,
      topLanguages: topLanguagesMap,
      heatmap: "Contribution data available but omitted for brevity.",
    };

    const result = await getInsightsAction(input);

    if ('error' in result) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else {
      setInsights(result);
    }
    setLoading(false);
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Sparkles />
            AI Contribution Analysis
          </CardTitle>
          <CardDescription>Get personalized insights to optimize your contribution habits.</CardDescription>
        </div>
        <Button onClick={handleGetInsights} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2" />
              Generate Insights
            </>
          )}
        </Button>
      </CardHeader>
      {insights && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Alert>
              <AlertTitle className="font-headline">Personalized Insights</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground whitespace-pre-line">
                {insights.insights}
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle className="font-headline">Collaboration Opportunities</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground whitespace-pre-line">
                {insights.collaborationOpportunities}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

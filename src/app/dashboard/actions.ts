'use server';

import {
  analyzeContributions,
  type ContributionAnalysisInput,
  type ContributionAnalysisOutput,
} from '@/ai/flows/contribution-analysis-insights';

export async function getInsightsAction(
  input: ContributionAnalysisInput
): Promise<ContributionAnalysisOutput | { error: string }> {
  try {
    const insights = await analyzeContributions(input);
    return insights;
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to generate AI insights.' };
  }
}

'use server';

/**
 * @fileOverview A contribution analysis AI agent that provides personalized insights and suggestions to optimize contribution habits and identify potential collaboration opportunities.
 *
 * - analyzeContributions - A function that analyzes contribution history and provides insights.
 * - ContributionAnalysisInput - The input type for the analyzeContributions function.
 * - ContributionAnalysisOutput - The return type for the analyzeContributions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContributionAnalysisInputSchema = z.object({
  totalCommits: z.number().describe('The total number of commits.'),
  publicRepos: z.number().describe('The number of public repositories.'),
  starsEarned: z.number().describe('The total number of stars earned.'),
  forks: z.number().describe('The total number of forks.'),
  followersCount: z.number().describe('The number of followers.'),
  techMastered: z.array(z.string()).describe('An array of technologies mastered.'),
  yearsOfExperience: z.number().describe('The number of years of experience.'),
  topLanguages: z.record(z.number()).describe('A map of top languages and their usage counts.'),
  heatmap: z.any().describe('The contribution heatmap data.'),
});
export type ContributionAnalysisInput = z.infer<typeof ContributionAnalysisInputSchema>;

const ContributionAnalysisOutputSchema = z.object({
  insights: z.string().describe('Personalized insights and suggestions to optimize contribution habits.'),
  collaborationOpportunities: z.string().describe('Potential collaboration opportunities based on contribution history.'),
});
export type ContributionAnalysisOutput = z.infer<typeof ContributionAnalysisOutputSchema>;

export async function analyzeContributions(input: ContributionAnalysisInput): Promise<ContributionAnalysisOutput> {
  return contributionAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contributionAnalysisPrompt',
  input: {schema: ContributionAnalysisInputSchema},
  output: {schema: ContributionAnalysisOutputSchema},
  prompt: `You are an AI assistant that analyzes a developer's contribution history and provides personalized insights and suggestions to optimize their contribution habits and identify potential collaboration opportunities.

  Analyze the following contribution data:

  Total Commits: {{{totalCommits}}}
  Public Repositories: {{{publicRepos}}}
  Stars Earned: {{{starsEarned}}}
  Forks: {{{forks}}}
  Followers Count: {{{followersCount}}}
  Technologies Mastered: {{#each techMastered}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Years of Experience: {{{yearsOfExperience}}}
  Top Languages: {{#each topLanguages key="language"}}{{{language}}}: {{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Heatmap: {{{heatmap}}}

  Based on this data, provide actionable insights and suggestions to improve their contribution habits.  Also identify potential collaboration opportunities based on their skills and interests.

  Format your response as follows:

  Insights: [Your personalized insights and suggestions here]
  Collaboration Opportunities: [Potential collaboration opportunities here]`,
});

const contributionAnalysisFlow = ai.defineFlow(
  {
    name: 'contributionAnalysisFlow',
    inputSchema: ContributionAnalysisInputSchema,
    outputSchema: ContributionAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

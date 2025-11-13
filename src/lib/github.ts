'use client';

import { unstable_noStore as noStore } from 'next/cache';

const GITHUB_API_URL = 'https://api.github.com/graphql';

const query = `
query UserData($username: String!) {
  user(login: $username) {
    name
    bio
    avatarUrl
    url
    followers {
      totalCount
    }
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
      totalCount
      nodes {
        name
        description
        url
        stargazerCount
        forkCount
        createdAt
        updatedAt
        primaryLanguage {
          name
          color
        }
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
          }
        }
      }
    }
    createdAt
  }
}
`;

type GitHubResponse = {
  data: {
    user: {
      name: string;
      bio: string;
      avatarUrl: string;
      url: string;
      followers: {
        totalCount: number;
      };
      repositories: {
        totalCount: number;
        nodes: {
          name: string;
          description: string | null;
          url: string;
          stargazerCount: number;
          forkCount: number;
          createdAt: string;
          updatedAt: string;
          primaryLanguage: {
            name: string;
            color: string;
          } | null;
        }[];
      };
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionCount: number;
              date: string;
              weekday: number;
            }[];
          }[];
        };
      };
      createdAt: string;
    };
  };
  errors?: { type: string; message: string }[];
};

export async function getGithubProfile(username: string, token: string) {
  noStore();
  
  if (!token) {
    throw new Error('GitHub token is not provided.');
  }
  if (!username) {
    throw new Error('GitHub username is not provided.');
  }

  const res = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  const json: GitHubResponse = await res.json();

  if (json.errors) {
    throw new Error(`Failed to fetch GitHub data: ${json.errors[0].message}`);
  }

  if (!res.ok || !json.data || !json.data.user) {
    throw new Error(`Failed to fetch GitHub data for user "${username}". Check if the username is correct and the token is valid.`);
  }

  const { user } = json.data;

  const totalStars = user.repositories.nodes.reduce((acc, repo) => acc + repo.stargazerCount, 0);
  const totalForks = user.repositories.nodes.reduce((acc, repo) => acc + repo.forkCount, 0);

  const languageMap: Record<string, number> = {};
  user.repositories.nodes.forEach(repo => {
    if (repo.primaryLanguage) {
      languageMap[repo.primaryLanguage.name] = (languageMap[repo.primaryLanguage.name] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languageMap)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([name]) => ({ name, count: languageMap[name] }));

  const yearsOfExperience = new Date().getFullYear() - new Date(user.createdAt).getFullYear();

  return {
    name: user.name,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    url: user.url,
    stats: {
      experience: yearsOfExperience,
      commits: user.contributionsCollection.contributionCalendar.totalContributions,
      projects: user.repositories.totalCount,
      tech: topLanguages.length,
      stars: totalStars,
      forks: totalForks,
      followers: user.followers.totalCount,
      topLanguages,
    },
    repositories: user.repositories.nodes,
    contributions: user.contributionsCollection.contributionCalendar,
  };
}

export type GitHubProfile = Awaited<ReturnType<typeof getGithubProfile>>;

'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, GitFork, Search, Star } from 'lucide-react';
import type { GitHubProfile } from '@/lib/github';
import { format } from 'date-fns';

type Repository = GitHubProfile['repositories'][0];

const ITEMS_PER_PAGE = 10;

export default function ProjectList({
  repositories,
}: {
  repositories: Repository[];
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredAndSortedRepos = useMemo(() => {
    const filtered = repositories.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazerCount - a.stargazerCount;
        case 'forks':
          return b.forkCount - a.forkCount;
        case 'recent':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return b.stargazerCount - a.stargazerCount;
      }
    });
  }, [repositories, searchTerm, sortBy]);
  
  const visibleRepos = useMemo(() => {
    return filteredAndSortedRepos.slice(0, visibleCount);
  }, [filteredAndSortedRepos, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };
  
  const languages = useMemo(() => {
    const langSet = new Set<string>();
    repositories.forEach(repo => {
      if(repo.primaryLanguage) {
        langSet.add(repo.primaryLanguage.name);
      }
    });
    return Array.from(langSet).sort();
  }, [repositories]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search repositories..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="forks">Forks</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>
          {/* Language filter could be added here */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleRepos.map((repo) => (
           <Card
            key={repo.name}
            className="flex flex-col bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:glow-shadow-primary"
          >
            <CardHeader>
              <CardTitle className="font-headline text-lg truncate">
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">{repo.name}</a>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Created: {format(new Date(repo.createdAt), 'P')} &bull; Updated: {format(new Date(repo.updatedAt), 'P')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">{repo.description || "No description provided."}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-sm">
              <div className="flex gap-4 text-muted-foreground">
                {repo.primaryLanguage && (
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                    <span>{repo.primaryLanguage.name}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-4 text-muted-foreground">
                 <div className="flex items-center gap-1">
                  <Star size={16} />
                  <span>{repo.stargazerCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork size={16} />
                  <span>{repo.forkCount}</span>
                </div>
              </div>
            </CardFooter>
            <div className="p-6 pt-0">
               <Button asChild variant="outline" className="w-full">
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    View on GitHub <ArrowRight className="ml-2" />
                  </a>
                </Button>
            </div>
          </Card>
        ))}
      </div>
       {filteredAndSortedRepos.length === 0 && (
          <div className="text-center col-span-full py-16">
            <p className="text-muted-foreground">No repositories found.</p>
          </div>
        )}
        {visibleCount < filteredAndSortedRepos.length && (
          <div className="text-center mt-8">
            <Button onClick={handleLoadMore}>Load More</Button>
          </div>
        )}
    </div>
  );
}
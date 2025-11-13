'use client';

import { useProfile } from "@/components/layout/app-provider";
import ProjectList from "./components/project-list";
import { Skeleton } from "@/components/ui/skeleton";


function ProjectsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-pulse">
      <div className="text-center mb-12">
        <Skeleton className="h-12 w-1/3 mx-auto mb-2" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Skeleton className="h-10 flex-grow" />
        <Skeleton className="h-10 w-44" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { profile, loading } = useProfile();

  if (loading || !profile) {
    return <ProjectsSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">
          Projects
        </h1>
        <p className="text-lg text-muted-foreground">
          A collection of open-source work and personal projects for {profile.name}.
        </p>
      </div>
      <ProjectList repositories={profile.repositories} />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images";
import { ArrowRight, BarChart, CheckCircle, GitCommit, GitFork, Github, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <BarChart className="w-8 h-8 text-primary" />,
    title: 'Interactive Charts',
    description: 'Visualize your top languages, commit history, and contribution patterns with dynamic charts.',
  },
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: 'Achievement Badges',
    description: 'Showcase your GitHub achievements like Arctic Code Vault Contributor, Pull Shark, and more.',
  },
  {
    icon: <GitFork className="w-8 h-8 text-primary" />,
    title: 'Repository Explorer',
    description: 'Browse and sort your repositories by stars, forks, or recent activity with a powerful search.',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'AI-Powered Insights',
    description: 'Get personalized suggestions to improve your contribution habits and find collaboration opportunities.',
  },
];


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <section className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
          Turn Your GitHub Profile into a Masterpiece
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          DevPulse transforms your GitHub activity into a stunning, professional portfolio with interactive analytics, AI insights, and shareable dashboards.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild size="lg">
            <Link href="/login">
              Get Started for Free <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="#features">
              Explore Features
            </a>
          </Button>
        </div>
      </section>

      <div className="relative mb-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 bg-primary/20 blur-3xl -z-10 rounded-full" />
        <Image
          src={placeholderImages['featured-project-1'].imageUrl}
          alt="DevPulse Dashboard Preview"
          width={1200}
          height={675}
          className="rounded-xl border border-border/20 shadow-2xl shadow-primary/10 mx-auto"
          data-ai-hint="dashboard application"
          priority
        />
      </div>

      <section id="features" className="mb-24">
        <h2 className="text-4xl font-bold font-headline text-center mb-12">
          Everything You Need to Shine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold font-headline mb-4">Create Your Public Profile</h2>
            <p className="text-muted-foreground mb-6">
              Sign up with your GitHub account to instantly generate a shareable, public portfolio. Control your visibility and decide what the world sees. Your profile, your rules.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-accent w-5 h-5" />
                <span>Public URLs like `devpulse.app/your-name`</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-accent w-5 h-5" />
                <span>One-click sign-in with GitHub</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-accent w-5 h-5" />
                <span>Full control over your profile's privacy</span>
              </li>
            </ul>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/login">
                Claim Your Profile <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          <div>
            <Card className="bg-gradient-to-br from-primary/10 to-transparent p-6">
              <div className="flex items-center gap-4 mb-4">
                 <Image src="https://avatars.githubusercontent.com/u/1?v=4" alt="User" width={64} height={64} className="rounded-full" />
                 <div>
                    <h3 className="font-bold text-lg font-headline">Your Name</h3>
                    <p className="text-sm text-muted-foreground">devpulse.app/your-name</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground flex items-center gap-2"><GitCommit size={16}/> Commits</p>
                  <p className="text-2xl font-bold font-headline">1,204</p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground flex items-center gap-2"><Github size={16}/> Repos</p>
                  <p className="text-2xl font-bold font-headline">84</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
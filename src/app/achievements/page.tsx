import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { achievements } from '@/lib/data';

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">
          Achievements
        </h1>
        <p className="text-lg text-muted-foreground">
          A collection of milestones and badges earned on GitHub.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {achievements.map((achievement, index) => (
          <Card
            key={achievement.id}
            className="bg-card/50 backdrop-blur-sm border-border/50 text-center flex flex-col items-center justify-center p-6 transition-all duration-300 hover:glow-shadow-accent hover:-translate-y-2 animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <CardHeader className="p-0 mb-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary glow-shadow-primary mb-4">
                <achievement.Icon className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="font-headline text-lg">
                {achievement.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription>{achievement.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

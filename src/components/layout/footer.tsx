'use client';

import { Github, Globe, Linkedin } from 'lucide-react';
import { useUser } from '@/firebase';
import { Button } from '../ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function Footer() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
      // Redirect to home page after sign out
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        variant: 'destructive',
        title: 'Error Signing Out',
        description: 'There was a problem signing you out.',
      });
    }
  };

  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Mohan Reddy. &copy; {new Date().getFullYear()} DevPulse. All
            Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground">
              Sign Out
            </Button>
          )}
          <a
            href="https://github.com/ComradeMohan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/comrademohan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://comrademohan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Globe size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

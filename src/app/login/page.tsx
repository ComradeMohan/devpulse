'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { Github, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    // Request access to read user profile and public repos
    provider.addScope('read:user');
    provider.addScope('public_repo');
    
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (token) {
        // For now, let's store it in a temporary place. In a real app, this should be handled server-side.
        // **WARNING**: Storing tokens in localStorage is not secure for production apps.
        // This is a temporary measure for development.
        localStorage.setItem('devpulse-temp-token', token);
      }

      toast({
        title: "Successfully signed in!",
        description: `Welcome, ${result.user.displayName}!`,
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Authentication failed: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Failed to sign in with GitHub.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Sign In to DevPulse</CardTitle>
          <CardDescription>
            Connect your GitHub account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleSignIn} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}
            Sign In with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
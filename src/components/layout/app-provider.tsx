'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getGithubProfile, type GitHubProfile } from '@/lib/github';
import { useUser } from '@/firebase'; // Using the new useUser hook

type AppContextType = {
  profile: GitHubProfile | null;
  loading: boolean;
  error: string | null;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user, loading: userLoading, error: userError } = useUser();
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user || !user.username) {
      setLoading(false);
      setProfile(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      // We assume the username and a token can be retrieved for the logged-in user
      // This part will need to be fully implemented with backend logic to securely get a token
      // For now, we will simulate this by requiring a token in localStorage as a fallback.
      const token = localStorage.getItem('devpulse-temp-token');
      if (!token) {
        console.warn("No GitHub token found in temporary storage. API calls will likely fail.");
      }

      const userProfile = await getGithubProfile(user.username, token || '');
      setProfile(userProfile);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Failed to fetch GitHub profile.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!userLoading) {
      fetchProfile();
    }
  }, [userLoading, fetchProfile]);

  useEffect(() => {
    if (userError) {
      setError(userError.message);
      setLoading(false);
    }
  }, [userError]);


  const value = { profile, loading: loading || userLoading, error };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useProfile must be used within an AppProvider');
  }
  return {
    profile: context.profile,
    loading: context.loading,
    error: context.error,
  };
}

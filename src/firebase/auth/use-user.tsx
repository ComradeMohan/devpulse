'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '../provider';

type EnhancedUser = User & {
  username?: string;
};

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<EnhancedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // Extract additional provider data to get the username
          const githubProviderData = user.providerData.find(
            (provider) => provider.providerId === 'github.com'
          );

          let username: string | undefined = undefined;
          if (githubProviderData && githubProviderData.uid) {
            // This is a simplified way to get username.
            // In a real app, you might need to fetch this from the GitHub API
            // using the access token if it's not in the profile.
            // For now, let's see if we can get it from the raw user data.
            const anyUser = user as any;
            if(anyUser.reloadUserInfo?.screenName) {
              username = anyUser.reloadUserInfo.screenName;
            }
          }
          
          setUser({ ...user, username });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  return { user, loading, error };
}

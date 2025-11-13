'use client';

import { ReactNode, useEffect, useState } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './';
import { type FirebaseApp } from 'firebase/app';
import { type Auth } from 'firebase/auth';
import { type Firestore } from 'firebase/firestore';

type FirebaseClientProviderProps = {
  children: ReactNode;
};

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [firebaseInstances, setFirebaseInstances] = useState<{
    app: FirebaseApp;
    auth: Auth;
    db: Firestore;
  } | null>(null);

  useEffect(() => {
    const instances = initializeFirebase();
    setFirebaseInstances(instances);
  }, []);

  if (!firebaseInstances) {
    // You can render a loading spinner here
    return null;
  }

  return (
    <FirebaseProvider
      app={firebaseInstances.app}
      auth={firebaseInstances.auth}
      db={firebaseInstances.db}
    >
      {children}
    </FirebaseProvider>
  );
}

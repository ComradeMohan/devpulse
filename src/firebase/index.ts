import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

function initializeFirebase() {
  let app: FirebaseApp;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  const auth = getAuth(app);
  const db = getFirestore(app);
  return { app, auth, db };
}

export { initializeFirebase };
export * from './provider';
export * from './auth/use-user';
// Add exports for firestore hooks if you have them
// export * from './firestore/use-collection';
// export * from './firestore/use-doc';

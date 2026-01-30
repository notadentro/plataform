'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

export function initializeFirebase() {
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  // Connect to emulators only if the environment variable is set
  if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true' && !auth.emulatorConfig) {
    console.log("Connecting to Firebase Emulators");
    // Point to the emulators running on your local machine
    // IMPORTANT: Make sure you have the Firebase emulators running!
    // Run `firebase emulators:start` in your terminal.
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
  }

  return {
    firebaseApp,
    auth,
    firestore,
  };
}

// Export hooks and utilities
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';

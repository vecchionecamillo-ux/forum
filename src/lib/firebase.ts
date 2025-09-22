'use client';

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all required environment variables are present
const isConfigValid =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId;

// Initialize Firebase only if the configuration is valid
// In a real app, you might want to show an error page or log this issue
const app = isConfigValid ? (!getApps().length ? initializeApp(firebaseConfig) : getApp()) : null;

// Throw an error during development if the config is missing
if (process.env.NODE_ENV !== 'production' && !isConfigValid) {
  console.error(
    'Firebase config is missing or incomplete. Please check your environment variables.'
  );
}

// Export auth and db, but they might be null if config is invalid
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const database = app ? getDatabase(app) : null;

// The page.tsx files that import these might need to handle the case where they are null.
// For this specific app, we will assume the config is always present.
export { app, auth, db, database };

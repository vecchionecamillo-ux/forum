'use client';

import { initializeApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, indexedDBLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyATQlhb1tAJQX9DRG8R95RvNETW6t5_xEY",
  authDomain: "studio-8678152470-9ee44.firebaseapp.com",
  projectId: "studio-8678152470-9ee44",
  appId: "1:740380887001:web:c8619a656ae9b861c3fbc8",
  messagingSenderId: "740380887001",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Explicitly initialize Auth with persistence to solve issues in some environments
const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
  // This explicitly sets the auth domain, which can resolve redirect issues.
  authDomain: firebaseConfig.authDomain,
});

const db = getFirestore(app);
const database = getDatabase(app);

export { app, auth, db, database };

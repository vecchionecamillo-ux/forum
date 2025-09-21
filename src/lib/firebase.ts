'use client';

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATQlhb1tAJQX9DRG8R95RvNETW6t5_xEY",
  authDomain: "studio-8678152470-9ee44.firebaseapp.com",
  projectId: "studio-8678152470-9ee44",
  appId: "1:740380887001:web:c8619a656ae9b861c3fbc8",
  messagingSenderId: "740380887001",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

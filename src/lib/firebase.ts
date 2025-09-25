import { initializeApp, getApp, getApps, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { type Firestore, memoryLocalCache, initializeFirestore } from 'firebase/firestore';
import { getDatabase, type Database } from 'firebase/database';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

type FirebaseInstances = {
    app: FirebaseApp;
    auth: Auth;
    db: Firestore;
    database: Database;
};

// This variable will hold the single initialized instance.
let instances: FirebaseInstances | null = null;

function getFirebaseInstances(): FirebaseInstances {
    if (typeof window !== 'undefined' && !instances) {
        // Initialize the app only if it hasn't been initialized yet.
        const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        const auth = getAuth(app);
        // Use memory persistence to avoid IndexedDB errors in some browser environments
        const db = initializeFirestore(app, {
          localCache: memoryLocalCache(),
        });
        const database = getDatabase(app);
        instances = { app, auth, db, database };
    }
    // Fallback for server-side rendering
    if (!instances) {
        const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        const auth = getAuth(app);
        const db = initializeFirestore(app, { localCache: memoryLocalCache() });
        const database = getDatabase(app);
        instances = { app, auth, db, database };
    }
    return instances;
}

// We will export a function to get instances instead of instances directly
export { getFirebaseInstances };

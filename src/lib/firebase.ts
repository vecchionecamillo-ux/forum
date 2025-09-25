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

let instances: FirebaseInstances | null = null;

function initializeFirebase(): FirebaseInstances {
    if (typeof window === "undefined") {
        // Fallback for server-side rendering, although we aim for client-side Firebase
        if (instances) return instances;
        const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = initializeFirestore(app, { localCache: memoryLocalCache() });
        const database = getDatabase(app);
        instances = { app, auth, db, database };
        return instances;
    }
    
    if (instances) {
        return instances;
    }

    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    // Use initializeFirestore to specify cache settings. This is the modern approach.
    const db = initializeFirestore(app, {
      localCache: memoryLocalCache(),
    });
    const database = getDatabase(app);
    instances = { app, auth, db, database };
    return instances;
}

// This function is now the single source of truth for Firebase instances.
function getFirebaseInstances(): FirebaseInstances {
    if (!instances) {
        instances = initializeFirebase();
    }
    return instances;
}

export { getFirebaseInstances };

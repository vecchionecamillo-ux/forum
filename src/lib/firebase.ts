import { initializeApp, getApp, getApps, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getDatabase, type Database } from 'firebase/database';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

type FirebaseInstances = {
    app: FirebaseApp;
    auth: Auth;
    db: Firestore;
    database: Database;
};

let instances: FirebaseInstances | null = null;

function getFirebaseInstances(): FirebaseInstances {
    if (typeof window !== 'undefined') {
        if (!instances) {
            const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
            const auth = getAuth(app);
            const db = getFirestore(app);
            const database = getDatabase(app);
            instances = { app, auth, db, database };
        }
        return instances;
    }
    // This function should not be called on the server.
    // Server-side initialization is handled in `actions.ts`.
    // We return a proxy that will throw an error if accessed on the server.
    return new Proxy({}, {
        get(target, prop) {
            if (typeof window === 'undefined') {
                throw new Error(`Firebase client SDK (${String(prop)}) cannot be accessed on the server.`);
            }
            return Reflect.get(target, prop);
        }
    }) as FirebaseInstances;
}

// We will export a function to get instances instead of instances directly
export { getFirebaseInstances };
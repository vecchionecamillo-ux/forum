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
    if (getApps().length === 0) {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = initializeFirestore(app, {
            localCache: memoryLocalCache(),
        });
        const database = getDatabase(app);
        instances = { app, auth, db, database };
        return instances;
    } else {
        const app = getApp();
        if (instances) {
            return instances;
        }
        const auth = getAuth(app);
        const db = initializeFirestore(app, {
            localCache: memoryLocalCache(),
        });
        const database = getDatabase(app);
        instances = { app, auth, db, database };
        return instances;
    }
}


function getFirebaseInstances(): FirebaseInstances {
    if (!instances) {
      instances = initializeFirebase();
    }
    return instances;
}

export { getFirebaseInstances };

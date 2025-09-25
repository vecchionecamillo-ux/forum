'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signOut,
  type User,
  getRedirectResult,
} from 'firebase/auth';
import { getFirebaseInstances } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, type Firestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const MODERATOR_EMAILS = ['moderator@example.com', 'admin@example.com', 'vecchionecamillo1@gmail.com'];

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  points: number;
  xp: number; // Experience Points
  rankLevel: number;
  createdAt: any;
  country?: string;
  isStudent?: boolean;
  history?: { id: string, action: string, points: number, date: string }[];
};


type AuthContextType = {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isModerator: boolean;
  logout: () => void;
  auth: ReturnType<typeof getFirebaseInstances>['auth'];
  db: ReturnType<typeof getFirebaseInstances>['db'];
};

const AuthContext = createContext<AuthContextType | null>(null);

// Helper function to create user in Firestore
const createOrUpdateUserInDb = async (db: Firestore, user: User) => {
  if (!user.email) {
    console.warn("User object is missing email, skipping DB creation.");
    return;
  }
  const userDocRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
      const newUserProfile: Omit<UserProfile, 'uid'> = {
          email: user.email!,
          displayName: user.displayName || user.email!.split('@')[0],
          photoURL: user.photoURL,
          points: 0,
          xp: 0,
          rankLevel: 1, // Obsoleto, ma lo teniamo per compatibilità iniziale
          createdAt: serverTimestamp(),
          history: [],
      };
      await setDoc(userDocRef, newUserProfile);
  }
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModerator, setIsModerator] = useState(false);
  const router = useRouter();

  const { auth, db } = getFirebaseInstances();
  
  // Effect for handling redirect result from Google SignIn
  useEffect(() => {
    setLoading(true);
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          await createOrUpdateUserInDb(db, result.user);
          router.push('/profile');
        }
        // Let onAuthStateChanged handle the final loading state
      })
      .catch((error) => {
        console.error("Error getting redirect result: ", error);
        setLoading(false); // End loading on error
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once on component mount

  // Effect for handling auth state changes and profile listening
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsModerator(authUser.email ? MODERATOR_EMAILS.includes(authUser.email) : false);

        // User is logged in, now listen for their profile
        const userDocRef = doc(db, 'users', authUser.uid);
        const unsubscribeProfile = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserProfile({ uid: doc.id, ...doc.data() } as UserProfile);
          } else {
             // If profile doesn't exist, create it. This can happen on first email/pass signup
            createOrUpdateUserInDb(db, authUser);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error listening to user profile:", error);
          setUserProfile(null);
          setLoading(false);
        });
        
        return () => unsubscribeProfile();

      } else {
        setUser(null);
        setUserProfile(null);
        setIsModerator(false);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // onAuthStateChanged will handle the state update
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    isModerator,
    logout,
    auth,
    db
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

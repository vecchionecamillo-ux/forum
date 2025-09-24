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
  type UserCredential
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const MODERATOR_EMAILS = ['moderator@example.com', 'admin@example.com', 'vecchionecamillo1@gmail.com'];

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  points: number;
  rankLevel: number;
  createdAt: any;
  country?: string;
  isStudent?: boolean;
  history?: { id: string, action: string, points: number, date: string }[];
};


type AuthContextType = {
  user: User | null;
  loading: boolean;
  isModerator: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isModerator: false,
  logout: () => {},
});

const createOrUpdateUserInDb = async (user: User) => {
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
            rankLevel: 1,
            createdAt: serverTimestamp(),
            history: [],
        };
        await setDoc(userDocRef, newUserProfile);
    }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModerator, setIsModerator] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const processUser = async (user: User | null) => {
      if (user) {
        await createOrUpdateUserInDb(user);
        setUser(user);
        const isDevModerator = user.email ? MODERATOR_EMAILS.includes(user.email) : false;
        setIsModerator(isDevModerator);
      } else {
        setUser(null);
        setIsModerator(false);
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, processUser);

    // Also handle redirect result
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
           processUser(result.user);
           router.push('/profile');
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result: ", error);
      })
      .finally(() => {
        // This ensures loading is false after either redirect check or auth state change.
        // It might be redundant if onAuthStateChanged already set it, but it's safe.
        setLoading(false);
      });
      
    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      // onAuthStateChanged will handle setting user to null and loading to false
    }
  };

  const value = {
    user,
    loading,
    isModerator,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

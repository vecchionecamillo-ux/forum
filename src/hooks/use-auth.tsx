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
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, Unsubscribe } from 'firebase/firestore';
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
  userProfile: UserProfile | null;
  loading: boolean;
  isModerator: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
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
        setUserProfile(null);
      }
      setLoading(false);
    };

    const unsubscribeAuth = onAuthStateChanged(auth, processUser);

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This will be handled by onAuthStateChanged, but we can push the route here
          router.push('/profile');
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result: ", error);
      });

    return () => unsubscribeAuth();
  }, [router]);

  useEffect(() => {
    if (!user) {
      setUserProfile(null);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribeProfile = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUserProfile({ uid: doc.id, ...doc.data() } as UserProfile);
      } else {
        console.log("No such document in Firestore for user:", user.uid);
        // If the doc doesn't exist, it might be in the process of being created
        // createOrUpdateUserInDb will handle this. We just set the profile to null for now.
        setUserProfile(null);
      }
    }, (error) => {
      console.error("Error fetching user profile:", error);
      setUserProfile(null);
    });

    return () => unsubscribeProfile();
  }, [user]);


  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    // onAuthStateChanged will handle the state cleanup
  };

  const value = {
    user,
    userProfile,
    loading,
    isModerator,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

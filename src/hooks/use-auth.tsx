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
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

// --- DEVELOPMENT ONLY ---
// Add email addresses here to automatically grant them moderator privileges.
const MODERATOR_EMAILS = ['moderator@example.com', 'admin@example.com', 'vecchionecamillo1@gmail.com'];
// --------------------

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModerator, setIsModerator] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      console.warn("Firebase auth is not initialized. Skipping auth state change listener.");
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const tokenResult = await user.getIdTokenResult();
          const hasModeratorClaim = !!tokenResult.claims.moderator;
          const isDevModerator = user.email ? MODERATOR_EMAILS.includes(user.email) : false;
          setIsModerator(hasModeratorClaim || isDevModerator);
        } catch (error) {
          console.error("Error fetching token result:", error);
          const isDevModerator = user.email ? MODERATOR_EMAILS.includes(user.email) : false;
          setIsModerator(isDevModerator);
        }

      } else {
        setUser(null);
        setIsModerator(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      if(auth) {
        await signOut(auth);
      }
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
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

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          // In a production app, you would rely solely on custom claims
          // set by a backend function for security.
          // The local email list is for development convenience.
          const tokenResult = await user.getIdTokenResult();
          const hasModeratorClaim = !!tokenResult.claims.moderator;
          const isDevModerator = user.email ? MODERATOR_EMAILS.includes(user.email) : false;
          setIsModerator(hasModeratorClaim || isDevModerator);
        } catch (error) {
          console.error("Error fetching token result:", error);
          // Fallback to dev list if token fails
          const isDevModerator = user.email ? MODERATOR_EMAILS.includes(user.email) : false;
          setIsModerator(isDevModerator);
        }

      } else {
        setUser(null);
        setIsModerator(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      // Ensure user state is cleared immediately on logout
      setUser(null);
      setIsModerator(false);
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

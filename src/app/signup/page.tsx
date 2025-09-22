'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';


function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
        {...props}
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.021,35.596,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </svg>
    );
  }

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Questa email è già stata utilizzata per un altro account.');
      } else {
        setError('Si è verificato un errore durante la registrazione. Riprova.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/profile');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
            setError(null);
            break;
        case 'auth/cancelled-popup-request':
            setError(null);
            break;
        default:
            console.error('Errore durante la registrazione con Google:', error);
            setError(`Errore di registrazione: ${error.message}`);
            break;
      }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-black">Crea un Account</CardTitle>
          <CardDescription>
            Unisciti alla nostra community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
             <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
                <GoogleIcon className="mr-2" />
                Registrati con Google
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    Oppure continua con l'email
                </span>
                </div>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mario.rossi@email.com"
                    required
                    disabled={loading}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={loading}
                />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creazione in corso...' : 'Registrati con Email'}
                </Button>
            </form>
          </div>
           <div className="mt-4 text-center text-sm">
            Hai già un account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline focus:outline-none">
              Accedi
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

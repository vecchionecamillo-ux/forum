'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          router.push('/profile');
        } else {
          setIsVerifying(false);
        }
      } catch (error: any) {
        setError(error.message);
        setIsVerifying(false);
      }
    };
    checkRedirectResult();
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google') => {
    setError(null);
    setGoogleLoading(true);
    let authProvider;
    if (provider === 'google') {
      authProvider = new GoogleAuthProvider();
    } else {
        setGoogleLoading(false);
        return;
    }

    try {
      await signInWithRedirect(auth, authProvider);
    } catch (error: any) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Verifica in corso...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/10 p-4">
      <Card className="w-full max-w-md bg-card/70 backdrop-blur-lg">
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

          <div className="mb-6">
            <Button variant="outline" onClick={() => handleSocialLogin('google')} disabled={googleLoading || loading} className="w-full">
              {googleLoading ? 'Reindirizzamento...' : 'Continua con Google'}
            </Button>
          </div>

          <div className="flex items-center my-4">
            <Separator className="flex-grow" />
            <span className="mx-4 text-xs text-muted-foreground">OPPURE</span>
            <Separator className="flex-grow" />
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
                className="bg-background/50"
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
                className="bg-background/50"
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? 'Creazione in corso...' : 'Registrati con Email'}
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
            Hai già un account?{' '}
            <Link href="/login" className="underline text-primary">
              Accedi
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

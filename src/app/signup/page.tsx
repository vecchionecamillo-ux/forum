'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, AppleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

const GoogleIcon = () => <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.22,5.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2.5 12.19,2.5C6.42,2.5 2,7.03 2,12.5C2,17.97 6.42,22.5 12.19,22.5C17.6,22.5 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"></path></svg>;
const AppleIcon = () => <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M19.1,12.89C19.1,11.55 19.82,10.5 21.23,9.88C20.3,8.66 18.9,8.05 17.5,8.05C15.5,8.05 14.28,9.23 13.55,9.23C12.8,9.23 11.84,8.2 10.3,8.2C8.38,8.2 6.94,9.36 6.13,11.43C4,12.1 3,13.85 3,16.15C3,19.1 5.38,22 8.5,22C9.9,22 11.3,21.1 12.08,21.1C12.85,21.1 14.18,22 15.7,22C18.83,22 21.2,19.13 21.2,16.18C21.2,14.5 20.35,13.38 19.1,12.89M15.2,7.07C15.83,6.34 16.5,5.25 16.35,4.2C15.2,4.3 14.2,4.93 13.58,5.63C13,6.25 12.4,7.25 12.58,8.25C13.73,8.35 14.6,7.77 15.2,7.07Z"></path></svg>;


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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = async (providerName: 'google' | 'apple') => {
    setLoading(true);
    setError(null);
    try {
      let provider;
      if (providerName === 'google') {
        provider = new GoogleAuthProvider();
      } else {
        provider = new AppleAuthProvider();
      }
      await signInWithPopup(auth, provider);
      router.push('/profile');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


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

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handleProviderLogin('google')} disabled={loading} className="border-white/20">
              <GoogleIcon />
              Google
            </Button>
             <Button variant="outline" onClick={() => handleProviderLogin('apple')} disabled={loading} className="border-white/20">
              <AppleIcon />
              Apple
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">O continua con</span>
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
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
              {loading ? 'Creazione in corso...' : 'Registrati con Email'}
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
            Hai già un account?{' '}
            <Link href="/login" className="underline text-accent">
              Accedi
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

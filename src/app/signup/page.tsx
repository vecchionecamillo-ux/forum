'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

const GoogleIcon = () => <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.22,5.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2.5 12.19,2.5C6.42,2.5 2,7.03 2,12.5C2,17.97 6.42,22.5 12.19,22.5C17.6,22.5 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"></path></svg>;

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

  const handleProviderLogin = async (provider: GoogleAuthProvider) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithRedirect(auth, provider);
      // La pagina verrà ricaricata da Firebase dopo il redirect, quindi il routing qui non è necessario.
    } catch (error: any) {
      setError(error.message);
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

          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" onClick={() => handleProviderLogin(new GoogleAuthProvider())} disabled={loading} className="border-white/20">
              <GoogleIcon />
              Registrati con Google
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
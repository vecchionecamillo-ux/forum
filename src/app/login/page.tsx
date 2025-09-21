'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Nessun utente trovato con questa email.');
          break;
        case 'auth/wrong-password':
          setError('Password errata. Riprova.');
          break;
        case 'auth/invalid-credential':
          setError('Credenziali non valide. Controlla email e password e riprova.');
          break;
        default:
          setError('Si è verificato un errore durante l\'accesso. Riprova.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Per favore, inserisci la tua email per reimpostare la password.');
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Email di recupero inviata! Controlla la tua casella di posta (anche lo spam).');
      setIsResetMode(false); // Torna alla schermata di login
    } catch (error: any) {
       switch (error.code) {
        case 'auth/user-not-found':
          setError('Nessun utente trovato con questa email. Impossibile inviare il link di recupero.');
          break;
        default:
          setError('Si è verificato un errore durante l\'invio dell\'email. Riprova.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleResetMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsResetMode(!isResetMode);
    setError(null);
    setMessage(null);
    setPassword('');
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-black">{isResetMode ? 'Recupera Password' : 'Accedi'}</CardTitle>
          <CardDescription>
            {isResetMode ? 'Inserisci la tua email per ricevere un link di recupero.' : 'Accedi al tuo account per continuare.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
           {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {message && (
              <Alert className="mb-6 border-green-500 text-green-700">
                 <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          
          {isResetMode ? (
             <form onSubmit={handlePasswordReset} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email-reset">Email</Label>
                <Input
                  id="email-reset"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mario.rossi@email.com"
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Invio in corso...' : 'Invia link di recupero'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
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
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Accesso in corso...' : 'Accedi'}
              </Button>
            </form>
          )}

          <div className="mt-4 text-center text-sm">
            {isResetMode ? (
              <>
                Ricordi la password?{' '}
                <button onClick={toggleResetMode} className="underline text-primary" disabled={loading}>
                  Torna al Login
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={toggleResetMode} className="font-medium text-primary hover:underline focus:outline-none" disabled={loading}>
                    Password dimenticata?
                </button>
                 <div className="mt-2">
                  Non hai un account?{' '}
                  <Link href="/signup" className="underline text-primary">
                    Registrati
                  </Link>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

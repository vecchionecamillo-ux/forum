
'use client';
// Gestione errore NOT_FOUND
function handleNotFoundError(error: any, setError: (msg: string) => void) {
  if (error && error.code === 'NOT_FOUND') {
    setError('Dati non trovati. Controlla che la mail sia corretta o che l’utente esista.');
    return true;
  }
  return false;
}

import { useState } from 'react';
import { MembershipForm } from './membership-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function TesserePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [userTokens, setUserTokens] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCheck, setShowCheck] = useState(false);
  const { db } = useAuth(); // Usa l'istanza stabile del DB dal contesto

  const handleFetchPoints = async () => {
    if (!email) {
      setError('Per favore, inserisci una email.');
      return;
    }
    if (!db) {
      setError("Database non pronto. Riprova tra poco.");
      console.warn("[DEBUG] db non pronto", db);
      return;
    }
    setLoading(true);
    setError(null);
    setUserTokens(null);

    try {
      console.log(`[DEBUG] Inizio fetch per email: ${email}`);
      // Cerca l'utente tramite email
      const usersRef = db.collection ? db.collection('users') : undefined;
      let userDocSnap = null;
      if (usersRef) {
        // compatibilità con vecchie versioni
        const q = usersRef.where('email', '==', email.trim());
        const querySnapshot = await q.get();
        if (!querySnapshot.empty) {
          userDocSnap = querySnapshot.docs[0];
        }
      } else {
        // Nuova API modular
        const { collection, query, where, getDocs } = await import('firebase/firestore');
        const q = query(collection(db, 'users'), where('email', '==', email.trim()));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          userDocSnap = querySnapshot.docs[0];
        }
      }
      if (userDocSnap) {
        const userData = userDocSnap.data();
        console.log('[DEBUG] userData:', userData);
        const tokens = userData.token !== undefined ? userData.token : (userData.points !== undefined ? userData.points : null);
        if (tokens !== null) {
          setUserTokens(tokens);
          setError(null);
          console.log(`[DEBUG] Token trovati: ${tokens}`);
        } else {
          setError(`L'utente con email ${email} non ha un campo 'token' o 'points' valido.`);
          console.warn(`[DEBUG] Nessun campo token/points valido per email: ${email}`);
        }
      } else {
        setError('Nessun utente trovato con questa email.');
        console.warn(`[DEBUG] Nessun utente trovato con email: ${email}`);
      }
    } catch (e: any) {
      if (!handleNotFoundError(e, setError)) {
        console.error("[DEBUG] Errore nel recupero dei dati:", e);
        setError("Si è verificato un errore durante il recupero dei dati. " + (e instanceof Error ? e.message : ''));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-4">
      <main className="container mx-auto flex flex-col items-center justify-center max-w-2xl">
        <div className="text-center mb-8 md:mb-12 animate-in fade-in-50 duration-500">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-foreground">
            {formSubmitted ? 'Richiesta Inviata!' : 'Richiedi la Tua Tessera'}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            {formSubmitted
              ? 'Grazie per esserti unito a noi! Riceverai una conferma via email a breve con i dettagli della tua nuova tessera digitale.'
              : 'Compila il modulo sottostante per diventare un membro ufficiale del Cantiere Culturale e iniziare a guadagnare punti.'}
          </p>
        </div>

        {formSubmitted ? (
          <div className="text-center animate-in fade-in-50 duration-500">
            <Button asChild size="lg">
              <Link href="/profile">Vai al Tuo Profilo</Link>
            </Button>
          </div>
        ) : (
          <div className="w-full animate-in fade-in-50 duration-500">
            <MembershipForm onFormSubmit={() => setFormSubmitted(true)} />
          </div>
        )}

        <div className="w-full mt-12 border-t pt-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">Hai già una tessera?</h2>
                <p className="mt-2 text-muted-foreground">Controlla il tuo saldo token qui.</p>
                {!showCheck && (
                    <Button onClick={() => setShowCheck(true)} className="mt-4">
                        Verifica Token
                    </Button>
                )}
            </div>

           {showCheck && (
             <Card className="w-full mt-8 animate-in fade-in-50 duration-500">
                <CardHeader>
                    <CardTitle>Verifica Saldo Token</CardTitle>
                    <CardDescription>Inserisci il tuo ID utente per visualizzare i tuoi token.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Inserisci la tua email..."
            disabled={loading}
          />
                    </div>
                    <Button onClick={handleFetchPoints} disabled={loading || !email} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? 'Caricamento...' : 'Verifica Saldo'}
                    </Button>

                    {error && <p className="text-sm text-center text-destructive mt-2">{error}</p>}
                    {userTokens !== null && !error && (
                      <div className="text-center pt-4 border-t mt-4">
                        <p className="text-muted-foreground">Saldo token per l'utente:</p>
                        <p className="text-4xl font-black text-primary">{userTokens}</p>
                        <p className="text-green-600 dark:text-green-400 mt-2">Saldo recuperato con successo!</p>
                      </div>
                    )}
                </CardContent>
             </Card>
           )}
        </div>
      </main>
    </div>
  );
}

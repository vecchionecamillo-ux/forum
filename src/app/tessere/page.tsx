'use client';

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
  const [userId, setUserId] = useState('');
  const [userTokens, setUserTokens] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCheck, setShowCheck] = useState(false);
  const { db } = useAuth(); // Usa l'istanza stabile del DB dal contesto

  const handleFetchPoints = async () => {
    if (!userId) {
      setError('Per favore, inserisci un ID utente.');
      return;
    }
    if (!db) {
        setError("Database non pronto. Riprova tra poco.");
        return;
    }
    setLoading(true);
    setError(null);
    setUserTokens(null);

    try {
      // 1. Crea un riferimento al documento dell'utente
      const userDocRef = doc(db, 'users', userId.trim());

      // 2. Recupera il documento da Firestore
      const docSnap = await getDoc(userDocRef);

      // 3. Controlla se il documento esiste
      if (docSnap.exists()) {
        const userData = docSnap.data();
        // 4. Legge il valore dal campo 'token' (o 'points' come fallback se 'token' non esiste)
        const tokens = userData.token !== undefined ? userData.token : (userData.points !== undefined ? userData.points : null);

        if (tokens !== null) {
            setUserTokens(tokens);
        } else {
            setError(`L'utente ${userId} non ha un campo 'token' o 'points' valido.`);
        }
      } else {
        setError('Nessun utente trovato con questo ID.');
      }
    } catch (e) {
      console.error("Errore nel recupero dei dati:", e);
      setError("Si è verificato un errore durante il recupero dei dati.");
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
                    <Label htmlFor="userId">ID Utente</Label>
                    <Input
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Inserisci il tuo ID utente..."
                        disabled={loading}
                    />
                    </div>
                    <Button onClick={handleFetchPoints} disabled={loading || !userId} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? 'Caricamento...' : 'Verifica Saldo'}
                    </Button>

                    {error && <p className="text-sm text-center text-destructive mt-2">{error}</p>}
                    
                    {userTokens !== null && (
                    <div className="text-center pt-4 border-t mt-4">
                        <p className="text-muted-foreground">Saldo token per l'utente:</p>
                        <p className="text-4xl font-black text-primary">{userTokens}</p>
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

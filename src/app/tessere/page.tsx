'use client';

import { useState } from 'react';
import { MembershipForm } from './membership-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getFirebaseInstances } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export default function TesserePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCheck, setShowCheck] = useState(false);

  const handleFetchPoints = async () => {
    if (!userId) {
      setError('Per favore, inserisci un ID utente.');
      return;
    }
    setLoading(true);
    setError(null);
    setUserPoints(null);

    try {
      const { db } = getFirebaseInstances();
      const userDocRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserPoints(userData.points !== undefined ? userData.points : null);
      } else {
        setError('Nessun utente trovato con questo ID.');
      }
    } catch (e) {
      setError("Si è verificato un errore durante il recupero dei dati.");
      console.error(e);
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
                <p className="mt-2 text-muted-foreground">Controlla il tuo saldo punti qui.</p>
                {!showCheck && (
                    <Button onClick={() => setShowCheck(true)} className="mt-4">
                        Verifica Punti
                    </Button>
                )}
            </div>

           {showCheck && (
             <Card className="w-full mt-8 animate-in fade-in-50 duration-500">
                <CardHeader>
                    <CardTitle>Verifica Saldo Punti</CardTitle>
                    <CardDescription>Inserisci il tuo ID utente per visualizzare i tuoi punti (token).</CardDescription>
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
                    {loading ? 'Caricamento...' : 'Carica Dati'}
                    </Button>

                    {error && <p className="text-sm text-center text-destructive">{error}</p>}
                    
                    {userPoints !== null && (
                    <div className="text-center pt-4">
                        <p className="text-muted-foreground">L'utente ha</p>
                        <p className="text-4xl font-black text-primary">{userPoints}</p>
                        <p className="text-muted-foreground">punti</p>
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

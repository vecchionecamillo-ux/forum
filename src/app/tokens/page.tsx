'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getFirebaseInstances } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TokensPage() {
  const [userId, setUserId] = useState('');
  const [tokens, setTokens] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadData = async () => {
    if (!userId) {
      setError('Per favore, inserisci un ID utente.');
      return;
    }
    setLoading(true);
    setError(null);
    setTokens(null);

    try {
      const { db } = getFirebaseInstances();
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Assuming 'tokens' are stored as 'points' in the user profile
        setTokens(userData.points || 0);
      } else {
        setError('Nessun utente trovato con questo ID.');
      }
    } catch (e) {
      console.error('Error fetching user data:', e);
      setError("Si è verificato un errore durante il caricamento dei dati. Controlla l'ID e riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Carica Token Utente</CardTitle>
          <CardDescription>
            Inserisci l'ID di un utente per visualizzare il suo saldo di token (punti).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">ID Utente</Label>
            <Input
              id="userId"
              type="text"
              placeholder="Inserisci l'ID utente qui..."
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button onClick={handleLoadData} className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Caricamento...
              </>
            ) : (
              'Carica Dati'
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {tokens !== null && (
            <div className="pt-4 text-center">
              <Label className="text-lg text-muted-foreground">Token dell'utente:</Label>
              <p className="text-4xl font-bold text-primary">{tokens}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

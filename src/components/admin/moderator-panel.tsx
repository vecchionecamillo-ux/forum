'use client';

import { useEffect, useState, useTransition } from 'react';
import { addPoints } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, Loader2, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { UserProfile } from '@/hooks/use-auth';
import { collection, onSnapshot, type Firestore, doc, getDoc } from 'firebase/firestore';
import { getFirebaseInstances } from '@/lib/firebase';
import { getUserTier } from '@/lib/membership-tiers';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';


function UserTokenChecker() {
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
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Controlla Punti Utente</CardTitle>
                 <CardDescription>
                    Inserisci l'ID di un utente per visualizzare il suo saldo di punti.
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
                <Button onClick={handleLoadData} className="w-full sm:w-auto" disabled={loading}>
                    {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Caricamento...
                    </>
                    ) : (
                    'Carica Punti'
                    )}
                </Button>

                {error && (
                    <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {tokens !== null && (
                    <div className="pt-4">
                    <Label className="text-md text-muted-foreground">Punti dell'utente:</Label>
                    <p className="text-3xl font-bold text-primary">{tokens}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}


function UserTableRow({ user, onAction, isPending }: { user: UserProfile, onAction: (formData: FormData, actionType: 'addPoints') => void, isPending: boolean }) {
  const userTier = getUserTier(user.xp || 0);
  const [pointsToAdd, setPointsToAdd] = useState('');

  const handleFormAction = (actionType: 'addPoints') => {
    const formData = new FormData();
    formData.append('userId', user.uid);
    if (actionType === 'addPoints') {
      formData.append('points', pointsToAdd);
    }
    onAction(formData, actionType);
    if (actionType === 'addPoints') setPointsToAdd('');
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{user.displayName}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell className="hidden sm:table-cell text-center">{user.points}</TableCell>
       <TableCell className="hidden sm:table-cell text-center">{user.xp || 0}</TableCell>
      <TableCell>
        <Badge variant="secondary" className={`${userTier.badgeColor} ${userTier.textColor}`}>{userTier.name}</Badge>
      </TableCell>
      <TableCell className="hidden lg:table-cell">{user.country || 'N/A'}</TableCell>
      <TableCell className="hidden lg:table-cell text-center">{user.isStudent ? 'Sì' : 'No'}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost" disabled={isPending}>
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Azioni</DropdownMenuLabel>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <Input
                            type="number"
                            placeholder="Punti"
                            value={pointsToAdd}
                            onChange={(e) => setPointsToAdd(e.target.value)}
                            className="h-8 w-24"
                             disabled={isPending}
                        />
                        <Button size="sm" onClick={() => handleFormAction('addPoints')} disabled={!pointsToAdd || isPending}>Aggiungi</Button>
                    </div>
                </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

function UserTable({ users, onAction, isPending }: { users: UserProfile[], onAction: (formData: FormData, actionType: 'addPoints') => void, isPending: boolean }) {
  return (
    <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden sm:table-cell text-center">Punti</TableHead>
               <TableHead className="hidden sm:table-cell text-center">XP</TableHead>
              <TableHead>Grado</TableHead>
              <TableHead className="hidden lg:table-cell">Paese</TableHead>
              <TableHead className="hidden lg:table-cell text-center">Studente</TableHead>
              <TableHead><span className="sr-only">Azioni</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => <UserTableRow key={user.uid} user={user} onAction={onAction} isPending={isPending} />)}
          </TableBody>
        </Table>
    </div>
  );
}

export function ModeratorPanel() {
  const [db, setDb] = useState<Firestore | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [filter, setFilter] = useState('');
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // getFirebaseInstances() must be called in useEffect to ensure it runs on the client
    const { db: firestoreDb } = getFirebaseInstances();
    setDb(firestoreDb);
  }, []);

  useEffect(() => {
    if (!db) return; // Wait until db is initialized

    const usersColRef = collection(db, 'users');
    const unsubscribe = onSnapshot(usersColRef, (snapshot) => {
        const usersList = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile));
        setUsers(usersList);
    }, (error) => {
        console.error("Failed to subscribe to user updates:", error);
        toast({ title: 'Errore di Sincronizzazione', description: 'Impossibile caricare i dati degli utenti in tempo reale.', variant: 'destructive' });
    });

    return () => unsubscribe();
  }, [db, toast]);

  useEffect(() => {
    const lowercasedFilter = filter.toLowerCase();
    const filtered = users.filter(user =>
      (user.displayName && user.displayName.toLowerCase().includes(lowercasedFilter)) ||
      (user.email && user.email.toLowerCase().includes(lowercasedFilter))
    );
    setFilteredUsers(filtered);
  }, [filter, users]);

  const handleAction = (formData: FormData, actionType: 'addPoints') => {
    startTransition(async () => {
        let result: { success: boolean; message: string };
        if (actionType === 'addPoints') {
            result = await addPoints(formData);
        } else {
            result = { success: false, message: 'Azione non riconosciuta.' };
        }

         if (result.success) {
            toast({ title: 'Successo', description: result.message });
          } else {
            toast({ title: 'Errore', description: result.message, variant: 'destructive' });
          }
    });
  };

  return (
    <div className="space-y-8">
        <UserTokenChecker />
        <Card>
            <CardHeader>
                <CardTitle>Dashboard Tessere Utente</CardTitle>
                <CardDescription>Visualizza, filtra e gestisci i membri della community.</CardDescription>
                <div className="relative mt-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Filtra per nome o email..."
                    className="w-full pl-8"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                </div>
            </CardHeader>
        <CardContent>
            {isPending ? (
                <div className="text-center text-muted-foreground py-8">Aggiornamento in corso...</div>
            ) : filteredUsers.length > 0 ? (
            <UserTable users={filteredUsers} onAction={handleAction} isPending={isPending} />
            ) : (
            <div className="text-center text-muted-foreground py-8">Nessun utente trovato.</div>
            )}
        </CardContent>
        </Card>
    </div>
  );
}

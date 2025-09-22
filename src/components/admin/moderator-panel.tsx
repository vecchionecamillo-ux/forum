'use client';

import { useEffect, useState, useTransition } from 'react';
import { addPoints } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search } from 'lucide-react';
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
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';


const ranks = [
  { level: 1, name: 'Visitatore', color: 'bg-gray-400' },
  { level: 2, name: 'Membro', color: 'bg-blue-500' },
  { level: 3, name: 'Partecipante Attivo', color: 'bg-green-500' },
  { level: 4, name: 'Creatore', color: 'bg-purple-500' },
  { level: 5, name: 'Ambasciatore', color: 'bg-yellow-500 text-black' },
];

function UserTableRow({ user, onAction }: { user: UserProfile, onAction: (formData: FormData) => void }) {
  const userRank = ranks.find(r => r.level === user.rankLevel) || ranks[0];
  const [pointsToAdd, setPointsToAdd] = useState('');

  const handleFormAction = (actionType: 'addPoints' | 'changeRank', value?: string) => {
    const formData = new FormData();
    formData.append('userId', user.uid);
    formData.append('actionType', actionType);
    if (actionType === 'addPoints') {
      formData.append('points', pointsToAdd);
    } else if (actionType === 'changeRank' && value) {
      formData.append('rank', value);
    }
    onAction(formData);
    if (actionType === 'addPoints') setPointsToAdd('');
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{user.displayName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell className="text-center">{user.points}</TableCell>
      <TableCell>
        <Badge variant="secondary" className={`${userRank.color} text-white`}>{userRank.name}</Badge>
      </TableCell>
      <TableCell>{user.country || 'N/A'}</TableCell>
      <TableCell className="text-center">{user.isStudent ? 'Sì' : 'No'}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
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
                        />
                        <Button size="sm" onClick={() => handleFormAction('addPoints')} disabled={!pointsToAdd}>Aggiungi</Button>
                    </div>
                </div>
            </DropdownMenuItem>
             <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <div className="flex items-center space-x-2">
                     <Select onValueChange={(value) => handleFormAction('changeRank', value)}>
                        <SelectTrigger className="h-8 w-[150px]">
                            <SelectValue placeholder="Cambia Grado" />
                        </SelectTrigger>
                        <SelectContent>
                            {ranks.map(rank => (
                                <SelectItem key={rank.level} value={rank.level.toString()}>{rank.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

function UserTable({ users, onAction }: { users: UserProfile[], onAction: (formData: FormData) => void }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center">Punti</TableHead>
          <TableHead>Grado</TableHead>
          <TableHead>Paese</TableHead>
          <TableHead className="text-center">Studente</TableHead>
          <TableHead><span className="sr-only">Azioni</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => <UserTableRow key={user.uid} user={user} onAction={onAction} />)}
      </TableBody>
    </Table>
  );
}

export function ModeratorPanel() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [filter, setFilter] = useState('');
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const usersColRef = collection(db, 'users');
    const unsubscribe = onSnapshot(usersColRef, (snapshot) => {
        const usersList = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile));
        setUsers(usersList);
        setFilteredUsers(usersList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const lowercasedFilter = filter.toLowerCase();
    const filtered = users.filter(user =>
      (user.displayName && user.displayName.toLowerCase().includes(lowercasedFilter)) ||
      user.email.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredUsers(filtered);
  }, [filter, users]);

  const handleAction = (formData: FormData) => {
    startTransition(async () => {
      const actionType = formData.get('actionType');
      const userId = formData.get('userId') as string;
      
      if (actionType === 'addPoints') {
        const result = await addPoints(formData);
         if (result.success) {
            toast({ title: 'Successo', description: result.message });
          } else {
            toast({ title: 'Errore', description: result.message, variant: 'destructive' });
          }
      } else if (actionType === 'changeRank') {
        const newRankLevel = Number(formData.get('rank'));
        console.log(`Changing rank for user ${userId} to level ${newRankLevel} (simulated)`);
        try {
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, { rankLevel: newRankLevel });
            toast({ title: 'Successo', description: `Grado aggiornato per l'utente ${userId}.` });
        } catch (error) {
            console.error("Error changing rank: ", error);
            toast({ title: 'Errore', description: "Impossibile aggiornare il grado.", variant: 'destructive' });
        }
      }
    });
  };

  return (
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
            <div className="text-center text-muted-foreground">Aggiornamento in corso...</div>
        ) : filteredUsers.length > 0 ? (
          <UserTable users={filteredUsers} onAction={handleAction} />
        ) : (
          <div className="text-center text-muted-foreground py-8">Nessun utente trovato.</div>
        )}
      </CardContent>
    </Card>
  );
}

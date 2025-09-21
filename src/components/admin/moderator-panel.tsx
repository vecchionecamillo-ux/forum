'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { addPoints } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, ArrowUp, ArrowDown } from 'lucide-react';

const ranks = [
  { level: 1, name: 'Visitatore', color: 'bg-gray-500' },
  { level: 2, name: 'Membro', color: 'bg-blue-500' },
  { level: 3, name: 'Partecipante Attivo', color: 'bg-green-500' },
  { level: 4, name: 'Creatore', color: 'bg-purple-500' },
  { level: 5, name: 'Ambasciatore', color: 'bg-yellow-500' },
];

type User = {
  _id: string;
  username: string;
  points: number;
  rankLevel: number;
};

// Mock data fetching. In a real app, this would be an API call.
async function fetchUsers(): Promise<User[]> {
  return [
    { _id: '1a', username: 'creative.user@email.com', points: 850, rankLevel: 2 },
    { _id: '2b', username: 'digital.artist@email.com', points: 1240, rankLevel: 3 },
    { _id: '3c', username: 'visionary.collector@email.com', points: 3200, rankLevel: 5 },
    { _id: '4d', username: 'new.innovator@email.com', points: 150, rankLevel: 1 },
  ];
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
      {pending ? 'Applicando...' : children}
    </Button>
  );
}

export function ModeratorPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleAction = (formData: FormData) => {
    startTransition(async () => {
      const actionType = formData.get('actionType');
      
      if (actionType === 'addPoints') {
        const result = await addPoints(formData);
         if (result.success) {
            toast({ title: 'Successo', description: result.message });
            // In a real app, you'd refetch or update state
          } else {
            toast({ title: 'Errore', description: result.message, variant: 'destructive' });
          }
      } else if (actionType === 'changeRank') {
        const userId = formData.get('userId');
        const newRank = formData.get('rank');
        console.log(`Rank per l'utente ${userId} cambiato a ${newRank}`);
        toast({ title: 'Successo', description: `Grado aggiornato per l'utente ${userId}.` });
        // In a real app, you'd refetch or update state
      }
    });
  };

  const getRank = (level: number) => ranks.find(r => r.level === level) || ranks[0];

  return (
    <Card className="bg-card/50 backdrop-blur-lg border-white/10">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-6">
          {users.length > 0 ? (
            users.map((user) => {
              const userRank = getRank(user.rankLevel);
              return (
                <Card key={user._id} className="bg-black/20 border border-white/10 text-white">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-lg font-medium">{user.username}</CardTitle>
                            <CardDescription className="text-white/70 flex items-center gap-2 mt-1">
                                <Badge className={`${userRank.color} text-white`}>{userRank.name}</Badge>
                                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-accent" /> {user.points} punti</span>
                            </CardDescription>
                        </div>
                        <Shield className="h-6 w-6 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form action={handleAction} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                       <input type="hidden" name="actionType" value="addPoints" />
                       <input type="hidden" name="userId" value={user._id} />
                       <div>
                         <label htmlFor={`points-${user._id}`} className="text-xs font-medium text-white/80 mb-1 block">Aggiungi Punti</label>
                         <Input
                           id={`points-${user._id}`}
                           type="number"
                           name="points"
                           placeholder="Es: 150"
                           required
                           min="1"
                           className="bg-background/50 border-white/20"
                           disabled={isPending}
                         />
                       </div>
                       <SubmitButton>
                          <Star className="mr-2 h-4 w-4"/> Assegna Punti
                       </SubmitButton>
                    </form>
                     <form action={handleAction} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                       <input type="hidden" name="actionType" value="changeRank" />
                       <input type="hidden" name="userId" value={user._id} />
                       <div>
                         <label htmlFor={`rank-${user._id}`} className="text-xs font-medium text-white/80 mb-1 block">Cambia Grado</label>
                         <Select name="rank" defaultValue={userRank.name} disabled={isPending}>
                          <SelectTrigger id={`rank-${user._id}`} className="bg-background/50 border-white/20">
                            <SelectValue placeholder="Seleziona grado" />
                          </SelectTrigger>
                          <SelectContent>
                            {ranks.map(rank => (
                              <SelectItem key={rank.level} value={rank.name}>{rank.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                       </div>
                       <SubmitButton>
                          <ArrowUp className="mr-2 h-4 w-4"/> Aggiorna Grado
                       </SubmitButton>
                    </form>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-center text-foreground/70">Caricamento utenti...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

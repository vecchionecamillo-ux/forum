'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { addPoints } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type User = {
  _id: string;
  username: string;
  points: number;
};

// Mock data fetching. In a real app, this would be an API call.
async function fetchUsers(): Promise<User[]> {
  return [
    { _id: '1a', username: 'creative.user@email.com', points: 850 },
    { _id: '2b', username: 'digital.artist@email.com', points: 1240 },
    { _id: '3c', username: 'visionary.collector@email.com', points: 3200 },
    { _id: '4d', username: 'new.innovator@email.com', points: 150 },
  ];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Aggiunta...' : 'Aggiungi'}
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

  const handleAddPoints = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addPoints(formData);
      if (result.success) {
        toast({
          title: 'Successo',
          description: result.message,
        });
        // In a real app, we would re-fetch users or update state based on response
      } else {
        toast({
          title: 'Errore',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-lg border-white/10">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-lg bg-black/20 border border-white/10">
                <div className="text-sm font-medium text-left w-full sm:w-auto">
                  {user.username} - <span className="font-bold text-accent">{user.points} punti</span>
                </div>
                <form action={handleAddPoints} className="flex items-center gap-2 w-full sm:w-auto">
                  <input type="hidden" name="userId" value={user._id} />
                  <Input
                    type="number"
                    name="points"
                    placeholder="Punti"
                    required
                    min="1"
                    className="bg-background/50 border-white/20 w-32"
                    disabled={isPending}
                  />
                  <SubmitButton />
                </form>
              </div>
            ))
          ) : (
            <p className="text-center text-foreground/70">Caricamento utenti...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

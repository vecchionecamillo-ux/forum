'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, Shield, Star } from 'lucide-react';

export default function ProfilePage() {
  const { user, isModerator, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Caricamento profilo...</p>
      </div>
    );
  }

  const userInitial = user.email ? user.email.charAt(0).toUpperCase() : '?';
  // Mock data, replace with real data from your backend
  const userPoints = 1250; 
  const userHistory = [
    { id: 1, action: 'Partecipazione Workshop "Creative Coding"', points: 250 },
    { id: 2, action: 'Volontariato Evento "Visioni Digitali"', points: 150 },
    { id: 3, action: 'Acquisto Stampa Fine Art', points: 850 },
  ];

  return (
    <div className="min-h-screen bg-secondary/10 p-4 pt-24 sm:p-6 lg:p-8">
      <main className="max-w-4xl mx-auto">
        <Card className="bg-card/70 backdrop-blur-lg">
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            <Avatar className="w-24 h-24 text-4xl">
              <AvatarFallback className="bg-accent text-accent-foreground">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{user.email}</CardTitle>
              {isModerator && (
                <p className="text-sm text-accent font-semibold flex items-center justify-center mt-1">
                  <Shield className="mr-1 h-4 w-4" />
                  Moderatore
                </p>
              )}
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-background/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Star className="mr-2 h-5 w-5 text-primary" />
                    Punti
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-black text-accent">{userPoints}</p>
                  <p className="text-sm text-muted-foreground mt-1">Punti totali accumulati.</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Storico Attività
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {userHistory.map(item => (
                       <li key={item.id} className="text-sm flex justify-between items-center">
                         <span>{item.action}</span>
                         <span className="font-bold text-accent whitespace-nowrap">+{item.points} punti</span>
                       </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

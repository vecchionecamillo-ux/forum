'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, Shield, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ranks = [
  { level: 1, name: 'Visitatore', color: 'bg-gray-400' },
  { level: 2, name: 'Membro', color: 'bg-blue-500' },
  { level: 3, name: 'Partecipante Attivo', color: 'bg-green-500' },
  { level: 4, name: 'Creatore', color: 'bg-purple-500' },
  { level: 5, name: 'Ambasciatore', color: 'bg-yellow-500 text-black' },
];

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
  const userRankLevel = 3; // Mock rank level
  const userRank = ranks.find(r => r.level === userRankLevel) || ranks[0];
  const userHistory = [
    { id: 1, action: 'Partecipazione Workshop "Creative Coding"', points: 250 },
    { id: 2, action: 'Volontariato Evento "Visioni Digitali"', points: 150 },
    { id: 3, action: 'Acquisto Stampa Fine Art', points: 850 },
  ];

  return (
    <div className="min-h-screen p-4 pt-24 sm:p-6 lg:p-8">
      <main className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            <Avatar className="w-24 h-24 text-4xl">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{user.email}</CardTitle>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="secondary" className={`${userRank.color} text-white`}>{userRank.name}</Badge>
                {isModerator && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Moderatore
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Star className="mr-2 h-5 w-5 text-primary" />
                    Punti
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-black text-yellow-500">{userPoints}</p>
                  <p className="text-sm text-muted-foreground mt-1">Punti totali accumulati.</p>
                </CardContent>
              </Card>
              <Card>
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
                         <span className="font-bold text-yellow-500 whitespace-nowrap">+{item.points} punti</span>
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

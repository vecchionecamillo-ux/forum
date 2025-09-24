'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, Shield, AtSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ranks = [
  { level: 1, name: 'Visitatore', color: 'bg-gray-400' },
  { level: 2, name: 'Membro', color: 'bg-blue-500' },
  { level: 3, name: 'Partecipante Attivo', color: 'bg-green-500' },
  { level: 4, name: 'Creatore', color: 'bg-purple-500' },
  { level: 5, name: 'Ambasciatore', color: 'bg-yellow-500 text-black' },
];

export default function ProfilePage() {
  const { user, userProfile, isModerator, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Caricamento...</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Caricamento della tua Tessera Digitale...</p>
      </div>
    );
  }


  const userInitial = userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : '?');
  const userRank = ranks.find(r => r.level === userProfile.rankLevel) || ranks[0];

  return (
    <div className="min-h-screen p-4 pt-24 sm:p-6 lg:p-8">
      <main className="max-w-2xl mx-auto">
        <Card className="rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border-white/20">
          <CardHeader className="p-6 bg-foreground/5">
             <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 text-3xl border-2 border-white/50">
                        <AvatarFallback className="bg-primary/80 text-primary-foreground">
                            {userInitial}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl font-black tracking-tight">{userProfile.displayName || user.email}</CardTitle>
                         <p className="text-sm text-muted-foreground flex items-center break-all">
                            <AtSign className="h-3 w-3 mr-1.5 flex-shrink-0" /> {user.uid}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2">
                     <Badge variant="secondary" className={`${userRank.color} text-white shadow-lg`}>{userRank.name}</Badge>
                      {isModerator && (
                        <Badge variant="destructive" className="flex items-center gap-1 shadow-lg">
                            <Shield className="h-3 w-3" />
                            Moderatore
                        </Badge>
                        )}
                </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="text-center">
                <p className="text-sm uppercase text-muted-foreground tracking-wider">Punti Community</p>
                <p className="text-6xl font-black text-primary drop-shadow-lg">{userProfile.points}</p>
            </div>
            
            <div>
              <h4 className="flex items-center text-lg font-semibold mb-4">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Storico Attività
              </h4>
              <Separator />
              {userProfile.history && userProfile.history.length > 0 ? (
                <ul className="space-y-4 mt-4">
                  {userProfile.history.map(item => (
                     <li key={item.id} className="text-sm flex justify-between items-center bg-foreground/5 p-3 rounded-lg">
                       <div>
                          <span>{item.action}</span>
                          <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                       </div>
                       <span className="font-bold text-yellow-500 whitespace-nowrap">+{item.points}</span>
                     </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground mt-4">Nessuna attività registrata.</p>
              )}
            </div>
          </CardContent>
           <CardFooter className="bg-foreground/5 px-6 py-3">
              <p className="text-xs text-muted-foreground text-center w-full">Cantiere Culturale Digitale &mdash; Tessera Membro</p>
           </CardFooter>
        </Card>
      </main>
    </div>
  );
}

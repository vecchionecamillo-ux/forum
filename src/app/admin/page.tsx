'use client';
import { ModeratorPanel } from '@/components/admin/moderator-panel';
import { ActivityDashboard } from '@/components/admin/activity-dashboard';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPage() {
  const { user, isModerator, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isModerator)) {
      router.push('/login');
    }
  }, [user, isModerator, loading, router]);

  if (loading || !user || !isModerator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Verifica in corso...</p>
      </div>
    );
  }

  return (
    <section id="area-riservata" className="min-h-screen px-4 py-24 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Area Riservata Moderatori</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Gestisci utenti, attività, iscrizioni e premi.
          </p>
        </div>
        <div className="mt-12">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="activity">Dashboard Attività</TabsTrigger>
                <TabsTrigger value="users">Gestione Utenti</TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="mt-6">
                <ActivityDashboard />
              </TabsContent>
              <TabsContent value="users" className="mt-6">
                <ModeratorPanel />
              </TabsContent>
            </Tabs>
        </div>
      </div>
    </section>
  );
}

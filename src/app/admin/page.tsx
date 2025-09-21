'use client';
import { ModeratorPanel } from '@/components/admin/moderator-panel';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    <section id="area-riservata" className="min-h-screen flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Area Riservata Moderatori</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Dashboard per la gestione dei punti utente. Accessibile solo ai moderatori autorizzati.
          </p>
        </div>
        <div className="mt-12">
          <ModeratorPanel />
        </div>
      </div>
    </section>
  );
}

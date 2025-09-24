import { allActivities } from '@/lib/activities';
import { ActivityCard } from '@/components/activity-card';

const formazioneItems = allActivities.filter(item => item.category === 'Formazione');

export default function FormazionePage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Formazione</h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Dettagli sul nostro programma di formazione. Qui potrai trovare informazioni su workshop, masterclass e corsi tenuti da professionisti del settore creativo e tecnologico per accrescere le tue competenze.
          </p>
        </div>

        {formazioneItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {formazioneItems.map((item) => (
              <ActivityCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Nessun corso di formazione disponibile al momento.</p>
            <p>Resta sintonizzato per futuri aggiornamenti!</p>
          </div>
        )}
      </main>
    </div>
  );
}

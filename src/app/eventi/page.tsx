import { allActivities } from '@/lib/activities';
import { ActivityCard } from '@/components/activity-card';

const eventiItems = allActivities.filter(item => item.category === 'Eventi');

export default function EventiPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Eventi</h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Scopri i nostri eventi esclusivi. Partecipa a mostre virtuali, talk, performance in diretta e festival digitali che non troverai da nessun'altra parte.
          </p>
        </div>

         {eventiItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventiItems.map((item) => (
              <ActivityCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Nessun evento in programma al momento.</p>
            <p>Torna a trovarci presto per scoprire le novità!</p>
          </div>
        )}
      </main>
    </div>
  );
}

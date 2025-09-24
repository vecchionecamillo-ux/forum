import { allActivities } from '@/lib/activities';
import { ActivityCard } from '@/components/activity-card';

const communityCategories = ['Opportunità', 'Approfondimento', 'Community'];
const communityItems = allActivities.filter(item => communityCategories.includes(item.category));


export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Community</h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Entra a far parte della nostra community. Connettiti, collabora e cresci insieme a una rete internazionale di artisti, curatori e innovatori.
          </p>
        </div>

        {communityItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityItems.map((item) => (
              <ActivityCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Nessuna attività della community al momento.</p>
            <p>Torna a trovarci presto per nuove opportunità!</p>
          </div>
        )}
      </main>
    </div>
  );
}

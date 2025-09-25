'use client';

import { ActivityCard } from '@/components/activity-card';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getFirebaseInstances } from '@/lib/firebase';
import type { Activity } from '@/lib/activities';
import { Skeleton } from '@/components/ui/skeleton';

export default function CommunityPage() {
  const [communityItems, setCommunityItems] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { db } = getFirebaseInstances();
    // Query for activities in the 'Community' category.
    const q = query(collection(db, 'activities'), where('category', 'in', ['Community']));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
      setCommunityItems(items);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching community items:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Community</h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Entra a far parte della nostra community. Connettiti, collabora e cresci insieme a una rete internazionale di artisti, curatori e innovatori.
          </p>
        </div>

        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-[450px] w-full rounded-lg" />)}
           </div>
        ) : communityItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityItems.map((item) => (
              <ActivityCard key={item.id} item={item} />
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

'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Award, Filter, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ActivityCard } from '@/components/activity-card';
import { collection, onSnapshot } from 'firebase/firestore';
import type { Activity } from '@/lib/activities';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';

export default function MarketplacePage() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [maxPoints, setMaxPoints] = useState(1000);
    const { db } = useAuth();

    const [activeTab, setActiveTab] = useState<'spend' | 'earn'>('spend');
    const [pointRange, setPointRange] = useState<[number]>([1000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
      if (!db) return;
      const unsubscribe = onSnapshot(collection(db, 'activities'), (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
        setActivities(items);
        
        // Dynamically set categories and max points from fetched data
        const categories = [...new Set(items.map(item => item.category))];
        setAllCategories(categories);

        const max = Math.max(0, ...items.map(item => item.points || 0));
        setMaxPoints(max > 0 ? max : 1000); // Avoid setting max to 0
        setPointRange([max > 0 ? max : 1000]); // Set initial range to max
        
        setLoading(false);
      }, (error) => {
        console.error("Error fetching marketplace activities:", error);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, [db]);

    const filteredItems = useMemo(() => {
        return activities.filter(item => 
            item.type === activeTab &&
            (item.points || 0) <= pointRange[0] &&
            (selectedCategories.length === 0 || selectedCategories.includes(item.category))
        );
    }, [activeTab, pointRange, selectedCategories, activities]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const tabButtonStyle = (tabName: 'spend' | 'earn') => 
        `flex-1 py-3 px-4 text-lg font-bold transition-all duration-300 rounded-t-lg focus:outline-none ${
            activeTab === tabName 
            ? 'bg-primary text-primary-foreground shadow-inner' 
            : 'bg-muted/50 hover:bg-muted'
        }`;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Marketplace</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
                Guadagna e spendi i tuoi punti per ottenere ricompense, accessi e prodotti esclusivi.
            </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-1/4 lg:w-1/5">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Filter className="w-5 h-5"/>Filtri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3">Punti Massimi</h4>
                             <Slider
                                value={pointRange}
                                max={maxPoints}
                                step={10}
                                onValueChange={(value) => setPointRange(value as [number])}
                                disabled={loading}
                            />
                            <div className="text-sm text-muted-foreground mt-2 text-center">Fino a {pointRange[0]} punti</div>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-3">Categorie</h4>
                            {loading ? (
                                <div className="space-y-3">
                                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-6 w-full" />)}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {allCategories.map(category => (
                                        <div key={category} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={category} 
                                                onCheckedChange={() => handleCategoryChange(category)}
                                                checked={selectedCategories.includes(category)}
                                            />
                                            <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {category}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                <div className="flex border-b mb-8">
                     <button onClick={() => setActiveTab('spend')} className={tabButtonStyle('spend')}>
                        <div className="flex items-center justify-center gap-2"><ShoppingCart /> Spendi Punti</div>
                     </button>
                     <button onClick={() => setActiveTab('earn')} className={tabButtonStyle('earn')}>
                        <div className="flex items-center justify-center gap-2"><Award /> Ottieni Punti</div>
                     </button>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-[450px] w-full rounded-lg" />)}
                  </div>
                ) : filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item) => (
                            <ActivityCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-muted-foreground">
                        <p className="text-lg">Nessun articolo trovato.</p>
                        <p>Prova a modificare i filtri per trovare quello che cerchi.</p>
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { ActivityCard } from '@/components/activity-card';
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { SlidersHorizontal, Layers, FlaskConical, Zap, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getFirebaseInstances } from '@/lib/firebase';
import type { Activity } from '@/lib/activities';
import { Skeleton } from '@/components/ui/skeleton';

type CategoryFilter = 'all' | 'Laboratorio' | 'Workshop';
type DurationFilter = 'all' | 'intensive' | 'long-term';

export function CourseCatalogue() {
  const [formazioneItems, setFormazioneItems] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');

  useEffect(() => {
    const { db } = getFirebaseInstances();
    const formationCategories = ['Laboratorio', 'Workshop'];
    const q = query(collection(db, 'activities'), where('category', 'in', formationCategories));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
      setFormazioneItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredItems = useMemo(() => {
    return formazioneItems.filter(item => {
      // Category Filter
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      if (!matchesCategory) return false;

      // Duration Filter
      const matchesDuration = () => {
        if (durationFilter === 'all') return true;
        if (durationFilter === 'intensive') return item.durationDetail === 'Workshop Intensivo';
        if (durationFilter === 'long-term') return item.durationDetail?.includes('settimane');
        return true;
      };
      if (!matchesDuration()) return false;
      
      return true;
    });
  }, [categoryFilter, durationFilter, formazioneItems]);

  const FilterCard = ({ value, label, icon: Icon, group, selectedValue, onSelect }: { value: string, label: string, icon: React.ElementType, group: string, selectedValue: string, onSelect: (value: any) => void }) => {
    const isSelected = selectedValue === value;
    return (
        <Label htmlFor={`${group}-${value}`} className={cn(
            "flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200",
            isSelected ? "border-primary bg-primary/5 text-primary" : "border-border bg-card hover:bg-accent/50 hover:border-accent"
        )}>
            <RadioGroupItem value={value} id={`${group}-${value}`} className="sr-only" />
            <Icon className={cn("w-8 h-8 mb-2", isSelected ? "text-primary" : "text-muted-foreground")} />
            <span className="text-sm font-semibold text-center">{label}</span>
        </Label>
    );
  };


  return (
    <div className="space-y-12">
        {/* Filter Section */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SlidersHorizontal /> Filtra Corsi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <h4 className="font-semibold text-lg mb-4 text-center md:text-left">Tipo di Corso</h4>
                    <RadioGroup value={categoryFilter} onValueChange={(value: CategoryFilter) => setCategoryFilter(value)} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <FilterCard value="all" label="Tutti" icon={Layers} group="category" selectedValue={categoryFilter} onSelect={setCategoryFilter} />
                        <FilterCard value="Laboratorio" label="Laboratori" icon={FlaskConical} group="category" selectedValue={categoryFilter} onSelect={setCategoryFilter} />
                        <FilterCard value="Workshop" label="Workshop" icon={Zap} group="category" selectedValue={categoryFilter} onSelect={setCategoryFilter} />
                    </RadioGroup>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-4 text-center md:text-left">Durata</h4>
                     <RadioGroup value={durationFilter} onValueChange={(value: DurationFilter) => setDurationFilter(value)} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <FilterCard value="all" label="Tutte" icon={Clock} group="duration" selectedValue={durationFilter} onSelect={setDurationFilter} />
                        <FilterCard value="intensive" label="Intensivi (1 giorno)" icon={Clock} group="duration" selectedValue={durationFilter} onSelect={setDurationFilter} />
                        <FilterCard value="long-term" label="Lungo Termine (+ giorni)" icon={Clock} group="duration" selectedValue={durationFilter} onSelect={setDurationFilter} />
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>

        {/* Results Section */}
        <div>
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
                    <p className="text-lg">Nessun corso trovato con i filtri selezionati.</p>
                </div>
            )}
        </div>
    </div>
  );
}

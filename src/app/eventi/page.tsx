'use client';

import { ActivityCard } from '@/components/activity-card';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SlidersHorizontal, Calendar, Layers, Palette, Users } from 'lucide-react';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import type { Activity } from '@/lib/activities';
import { Skeleton } from '@/components/ui/skeleton';
import { FilterCard } from '@/components/filter-card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

type Timeframe = 'all' | 'week' | 'month';
type PointFilter = 'all' | 'earn' | 'spend' | 'free';

const categoryIcons: Record<string, React.ElementType> = {
  'Mostra': Palette,
  'Talk': Users,
  'Community': Users,
  'Evento': Calendar,
  'Arte': Palette,
  // Aggiungi altre icone per categoria qui
  default: Layers,
};

export default function EventiPage() {
  const [eventItems, setEventItems] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const { db } = useAuth();

  const [timeframe, setTimeframe] = useState<Timeframe>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [pointFilter, setPointFilter] = useState<PointFilter>('all');
  
  const formationCategories = ['Laboratorio', 'Workshop', 'Formazione'];


  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'activities'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
      
      const items = allItems.filter(item => !formationCategories.includes(item.category));
      setEventItems(items);

      const uniqueCategories = [...new Set(items.map(item => item.category))];
      setAllCategories(uniqueCategories);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching event items:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  const filteredItems = useMemo(() => {
    const now = new Date();
    let interval: Interval | null = null;

    if (timeframe === 'week') {
      interval = { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
    } else if (timeframe === 'month') {
      interval = { start: startOfMonth(now), end: endOfMonth(now) };
    }

    return eventItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      const matchesTimeframe = () => {
        if (timeframe === 'all' || !item.date) return true;
        if (interval) {
          try {
            return isWithinInterval(parseISO(item.date), interval);
          } catch(e) { return false; }
        }
        return true;
      }
      if (!matchesTimeframe()) return false;

      const matchesPoints = () => {
        switch (pointFilter) {
          case 'earn':
            return item.type === 'earn' && (item.points || 0) > 0;
          case 'spend':
            return item.type === 'spend';
          case 'free':
            return item.type === 'earn' && (!item.points || item.points === 0);
          case 'all':
          default:
            return true;
        }
      }
      if(!matchesPoints()) return false;

      return true;
    });
  }, [timeframe, selectedCategory, pointFilter, eventItems]);


  const timeframeButtonStyle = (frame: Timeframe) =>
    cn(
      "transition-colors duration-200",
      timeframe === frame
        ? 'bg-primary text-primary-foreground'
        : 'bg-muted hover:bg-muted/80'
    );

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Eventi & Community</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            Scopri i nostri eventi esclusivi, unisciti alla community. Partecipa a mostre virtuali, talk, performance in diretta e festival digitali che non troverai da nessun'altra parte.
          </p>
        </div>

        <Card className="mb-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SlidersHorizontal /> Filtra Eventi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div>
                    <h4 className="font-semibold text-lg mb-4 text-center md:text-left">Categorie</h4>
                    {loading ? (
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
                        </div>
                    ) : (
                    <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                       <FilterCard 
                          value="all" 
                          label="Tutti" 
                          icon={Layers} 
                          selectedValue={selectedCategory} 
                          onSelect={setSelectedCategory} 
                        />
                        {allCategories.map(cat => {
                           const Icon = categoryIcons[cat] || categoryIcons.default;
                           return <FilterCard 
                                    key={cat} 
                                    value={cat} 
                                    label={cat} 
                                    icon={Icon} 
                                    selectedValue={selectedCategory} 
                                    onSelect={setSelectedCategory} 
                                  />
                        })}
                    </RadioGroup>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-3">Quando?</h4>
                        <div className="flex flex-wrap gap-2">
                            <Button onClick={() => setTimeframe('week')} className={timeframeButtonStyle('week')}>Questa Settimana</Button>
                            <Button onClick={() => setTimeframe('month')} className={timeframeButtonStyle('month')}>Questo Mese</Button>
                            <Button onClick={() => setTimeframe('all')} className={timeframeButtonStyle('all')}>Tutti</Button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Punti</h4>
                        <RadioGroup defaultValue="all" onValueChange={(value: PointFilter) => setPointFilter(value)} className="flex flex-wrap gap-x-4 gap-y-2">
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="p-all" />
                                <Label htmlFor="p-all">Tutti</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="earn" id="p-earn" />
                                <Label htmlFor="p-earn">Guadagna Punti</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="spend" id="p-spend" />
                                <Label htmlFor="p-spend">Richiede Punti</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="free" id="p-free" />
                                <Label htmlFor="p-free">Gratuito</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Risultati</h2>
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
                <p className="text-lg">Nessun evento trovato con i filtri selezionati.</p>
                <p>Prova a modificare la ricerca per scoprire le nostre attività!</p>
            </div>
            )}
        </div>
      </main>
    </div>
  );
}

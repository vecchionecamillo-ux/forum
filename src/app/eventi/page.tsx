'use client';

import { allActivities } from '@/lib/activities';
import { ActivityCard } from '@/components/activity-card';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SlidersHorizontal } from 'lucide-react';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const allCategories = [...new Set(allActivities.map(item => item.category))];

type Timeframe = 'all' | 'week' | 'month';
type PointFilter = 'all' | 'earn' | 'spend' | 'free';

export default function EventiPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pointFilter, setPointFilter] = useState<PointFilter>('all');

  const filteredItems = useMemo(() => {
    const now = new Date();
    let interval: Interval | null = null;

    if (timeframe === 'week') {
      interval = { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
    } else if (timeframe === 'month') {
      interval = { start: startOfMonth(now), end: endOfMonth(now) };
    }

    return allActivities.filter(item => {
      // Category Filter
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      if (!matchesCategory) return false;

      // Timeframe Filter
      const matchesTimeframe = () => {
        if (timeframe === 'all') return true;
        if (item.date && interval) {
          return isWithinInterval(parseISO(item.date), interval);
        }
        return timeframe === 'all';
      }
      if (!matchesTimeframe()) return false;

      // Points Filter
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
  }, [timeframe, selectedCategories, pointFilter]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
        prev.includes(category) 
            ? prev.filter(c => c !== category)
            : [...prev, category]
    );
  };

  const timeframeButtonStyle = (frame: Timeframe) =>
    `transition-colors duration-200 ${
      timeframe === frame
        ? 'bg-primary text-primary-foreground'
        : 'bg-muted hover:bg-muted/80'
    }`;


  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Eventi</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            Scopri i nostri eventi esclusivi. Partecipa a mostre virtuali, talk, performance in diretta e festival digitali che non troverai da nessun'altra parte.
          </p>
        </div>

        {/* Interactive Filter Section */}
        <Card className="mb-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SlidersHorizontal /> Filtra Eventi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                 <div>
                    <h4 className="font-semibold mb-3">Cosa ti interessa?</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {allCategories.map(category => (
                            <div key={category} className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
                                <Checkbox 
                                    id={`cat-${category}`}
                                    onCheckedChange={() => handleCategoryChange(category)}
                                    checked={selectedCategories.includes(category)}
                                />
                                <label htmlFor={`cat-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1">
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Risultati</h2>
            {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                <ActivityCard key={item.slug} item={item} />
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

'use client';

import { allActivities } from '@/lib/activities';
import { ActivityCard } from '@/components/activity-card';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { SlidersHorizontal, BookOpenCheck } from 'lucide-react';

const allCourseCategories = ['Laboratorio', 'Workshop'];
type DurationFilter = 'all' | 'intensive' | 'long-term';

const formazioneItems = allActivities.filter(item => allCourseCategories.includes(item.category));

export default function FormazionePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');

  const filteredItems = useMemo(() => {
    return formazioneItems.filter(item => {
      // Category Filter
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
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
  }, [selectedCategories, durationFilter]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
        prev.includes(category) 
            ? prev.filter(c => c !== category)
            : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Formazione</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
                Accresci le tue competenze con i nostri workshop e laboratori. Un'offerta formativa continua per esplorare nuove frontiere creative e tecnologiche.
            </p>
        </div>

        {/* LAB039 Section */}
        <section className="mb-16 p-8 bg-muted/50 rounded-lg">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3"><BookOpenCheck className="w-8 h-8 text-primary"/> LAB039</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                    LAB039 è il cuore pulsante della nostra offerta formativa. Un programma di laboratori permanenti e workshop intensivi per imparare, sperimentare e crescere, guidati da professionisti del settore.
                </p>
            </div>
        </section>

        {/* Filter Section */}
        <Card className="mb-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SlidersHorizontal /> Filtra Corsi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-3">Tipo di Corso</h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-3">
                            {allCourseCategories.map(category => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={`cat-${category}`}
                                        onCheckedChange={() => handleCategoryChange(category)}
                                        checked={selectedCategories.includes(category)}
                                    />
                                    <Label htmlFor={`cat-${category}`} className="text-base font-medium">
                                        {category}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Durata</h4>
                        <RadioGroup defaultValue="all" onValueChange={(value: DurationFilter) => setDurationFilter(value)} className="flex flex-wrap gap-x-4 gap-y-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="d-all" />
                                <Label htmlFor="d-all">Tutti</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="intensive" id="d-intensive" />
                                <Label htmlFor="d-intensive">Intensivi (1 Giorno)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="long-term" id="d-long" />
                                <Label htmlFor="d-long">Lungo Termine</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Results Section */}
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Tutti i Nostri Corsi</h2>
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                    <ActivityCard key={item.slug} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                    <p className="text-lg">Nessun corso trovato con i filtri selezionati.</p>
                    <p>Prova a modificare la ricerca per scoprire la nostra offerta formativa!</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}

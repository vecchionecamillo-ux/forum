'use client';

import { ActivityCard } from '@/components/activity-card';
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup } from '@/components/ui/radio-group';
import { SlidersHorizontal, Layers, FlaskConical, Zap, Clock, Code, Paintbrush, Landmark, BrainCircuit, Lightbulb, Library } from 'lucide-react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import type { Activity } from '@/lib/activities';
import { Skeleton } from '@/components/ui/skeleton';
import { FilterCard } from '@/components/filter-card';
import { useAuth } from '@/hooks/use-auth';


type DurationFilter = 'all' | 'intensive' | 'long-term';

const mainCategoryIcons: Record<string, React.ElementType> = {
    'Informatica e Programmazione': Code,
    'Arte e Design': Paintbrush,
    'Economia e Finanza': Landmark,
    'Scienze Umane': BrainCircuit,
    'Scienza e Matematica': FlaskConical,
    'Sviluppo Personale e Professionale': Lightbulb,
    'Piattaforme Trasversali': Library,
    default: Layers,
};

const courseTypeIcons: Record<string, React.ElementType> = {
    'Laboratorio': FlaskConical,
    'Workshop': Zap,
    'Formazione': Layers,
    default: Layers,
}


export function CourseCatalogue() {
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { db } = useAuth();
  
  const [courseTypes, setCourseTypes] = useState<string[]>([]);
  const [mainCategories, setMainCategories] = useState<string[]>([]);

  const [courseTypeFilter, setCourseTypeFilter] = useState<string>('all');
  const [mainCategoryFilter, setMainCategoryFilter] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');

  const formationCategories = ['Laboratorio', 'Workshop', 'Formazione'];

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'activities'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
      const formationItems = allItems.filter(item => formationCategories.includes(item.category as any));
      setAllActivities(formationItems);
      
      const uniqueCourseTypes = [...new Set(formationItems.map(item => item.category))];
      setCourseTypes(uniqueCourseTypes);

      const uniqueMainCategories = [...new Set(formationItems.map(item => item.mainCategory).filter(Boolean) as string[])];
      setMainCategories(uniqueMainCategories);
      
      setLoading(false);
    }, (error) => {
        console.error("Error fetching course items:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  const filteredItems = useMemo(() => {
    return allActivities.filter(item => {
      const matchesCourseType = courseTypeFilter === 'all' || item.category === courseTypeFilter;
      const matchesMainCategory = mainCategoryFilter === 'all' || item.mainCategory === mainCategoryFilter;
      
      const matchesDuration = () => {
        if (durationFilter === 'all') return true;
        if (durationFilter === 'intensive') return item.durationDetail === 'Workshop Intensivo';
        if (durationFilter === 'long-term') return item.durationDetail === 'Lungo Termine';
        return true;
      };

      return matchesCourseType && matchesMainCategory && matchesDuration();
    });
  }, [courseTypeFilter, mainCategoryFilter, durationFilter, allActivities]);


  return (
    <div className="space-y-12">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SlidersHorizontal /> Filtra Corsi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Filter by Course Type */}
                <div>
                    <h4 className="font-semibold text-lg mb-4 text-center md:text-left">Tipo di Corso</h4>
                    {loading ? (
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
                        </div>
                    ) : (
                    <RadioGroup value={courseTypeFilter} onValueChange={setCourseTypeFilter} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <FilterCard value="all" label="Tutti" icon={Layers} selectedValue={courseTypeFilter} onSelect={setCourseTypeFilter} />
                        {courseTypes.map(cat => (
                          <FilterCard 
                            key={cat} 
                            value={cat} 
                            label={cat} 
                            icon={courseTypeIcons[cat] || courseTypeIcons.default} 
                            selectedValue={courseTypeFilter} 
                            onSelect={setCourseTypeFilter} 
                          />
                        ))}
                    </RadioGroup>
                    )}
                </div>

                {/* Filter by Main Category */}
                <div>
                    <h4 className="font-semibold text-lg mb-4 text-center md:text-left">Materie Principali</h4>
                     {loading ? (
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
                        </div>
                    ) : (
                    <RadioGroup value={mainCategoryFilter} onValueChange={setMainCategoryFilter} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <FilterCard value="all" label="Tutte" icon={Layers} selectedValue={mainCategoryFilter} onSelect={setMainCategoryFilter} />
                        {mainCategories.map(cat => (
                          <FilterCard 
                            key={cat} 
                            value={cat} 
                            label={cat} 
                            icon={mainCategoryIcons[cat] || mainCategoryIcons.default} 
                            selectedValue={mainCategoryFilter} 
                            onSelect={setMainCategoryFilter} 
                          />
                        ))}
                    </RadioGroup>
                    )}
                </div>

                {/* Filter by Duration */}
                <div>
                    <h4 className="font-semibold text-lg mb-4 text-center md:text-left">Durata</h4>
                     <RadioGroup value={durationFilter} onValueChange={(value: DurationFilter) => setDurationFilter(value)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FilterCard value="all" label="Tutte" icon={Clock} selectedValue={durationFilter} onSelect={setDurationFilter} />
                        <FilterCard value="intensive" label="Intensivi" icon={Zap} selectedValue={durationFilter} onSelect={setDurationFilter} />
                        <FilterCard value="long-term" label="Lungo Termine" icon={Layers} selectedValue={durationFilter} onSelect={setDurationFilter} />
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>

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

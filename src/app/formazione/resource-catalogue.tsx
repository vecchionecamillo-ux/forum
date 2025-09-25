'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Code, Paintbrush, Landmark, BrainCircuit, FlaskConical, Lightbulb, Library, Layers, Zap, Clock, SlidersHorizontal } from 'lucide-react';
import { RadioGroup } from '@/components/ui/radio-group';
import { FilterCard } from '@/components/filter-card';
import type { Activity } from '@/lib/activities';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';

const mainCategoryIcons: Record<string, React.ElementType> = {
    'Piattaforme Trasversali': Library,
    'Informatica e Programmazione': Code,
    'Arte e Design': Paintbrush,
    'Economia e Finanza': Landmark,
    'Scienze Umane': BrainCircuit,
    'Scienza e Matematica': FlaskConical,
    'Sviluppo Personale e Professionale': Lightbulb,
    default: Layers,
};

function ResourceCard({ resource }: { resource: Activity }) {
  return (
    <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-300">
      <CardHeader>
        <CardTitle>{resource.title}</CardTitle>
        {resource.durationDetail && (
          <div className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
             <Clock className="w-3 h-3" /> {resource.durationDetail === 'Intensive' ? 'Intensivo' : 'Lungo Termine'}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="mb-4">{resource.description}</CardDescription>
        {resource.examples && resource.examples.length > 0 && (
            <ul className="space-y-2 text-sm text-muted-foreground">
                {resource.examples.map((example, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{example}</span>
                    </li>
                ))}
            </ul>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="text-primary p-0">
          <Link href={resource.link || '#'} target="_blank" rel="noopener noreferrer">
            Visita la piattaforma
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ResourceCatalogue() {
    const [allResources, setAllResources] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const { db } = useAuth();

    const [mainCategories, setMainCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | 'all'>('all');
    const [durationFilter, setDurationFilter] = useState<'all' | 'Intensive' | 'Lungo Termine'>('all');


    useEffect(() => {
        if (!db) return;
        const q = query(collection(db, 'activities'), where('isResource', '==', true));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const resources = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
            setAllResources(resources);

            const uniqueMainCategories = [...new Set(resources.map(r => r.mainCategory).filter(Boolean) as string[])];
            setMainCategories(uniqueMainCategories);

            setLoading(false);
        }, (error) => {
            console.error("Error fetching resources:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [db]);
    

    const groupedResources = useMemo(() => {
        return mainCategories.map(cat => ({
            name: cat,
            icon: mainCategoryIcons[cat] || Layers,
            subCategories: allResources
                .filter(r => r.mainCategory === cat)
                .reduce((acc, current) => {
                    if (!current.subCategory) return acc;
                    let sub = acc.find(s => s.name === current.subCategory);
                    if (!sub) {
                        sub = { name: current.subCategory, resources: [] };
                        acc.push(sub);
                    }
                    sub.resources.push(current);
                    return acc;
                }, [] as { name: string; resources: Activity[] }[])
        }));
    }, [allResources, mainCategories]);


  const filteredItems = useMemo(() => {
    let categoriesToDisplay = groupedResources;
    if (activeCategory !== 'all') {
      categoriesToDisplay = groupedResources.filter(cat => cat.name === activeCategory);
    }
    
    return categoriesToDisplay.map(category => ({
        ...category,
        subCategories: category.subCategories.map(subCategory => ({
            ...subCategory,
            resources: subCategory.resources.filter(resource => 
                durationFilter === 'all' || resource.durationDetail === durationFilter
            )
        })).filter(subCategory => subCategory.resources.length > 0)
    })).filter(category => category.subCategories.length > 0);

  }, [activeCategory, durationFilter, groupedResources]);

  return (
    <div className="space-y-12">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SlidersHorizontal /> Filtra Risorse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                     <h4 className="font-semibold text-lg mb-4 text-center md:text-left">Materie Principali</h4>
                    {loading ? (
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
                        </div>
                    ) : (
                    <RadioGroup value={activeCategory} onValueChange={(val) => setActiveCategory(val as any)} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                        <FilterCard value="all" label="Tutte" icon={Layers} selectedValue={activeCategory} onSelect={(val) => setActiveCategory(val as any)} />
                        {mainCategories.map((name) => (
                             <FilterCard 
                                key={name}
                                value={name} 
                                label={name} 
                                icon={mainCategoryIcons[name] || Layers}
                                selectedValue={activeCategory} 
                                onSelect={(val) => setActiveCategory(val as any)}
                             />
                        ))}
                    </RadioGroup>
                    )}
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-4 text-center md:text-left">Durata</h4>
                     <RadioGroup value={durationFilter} onValueChange={(value) => setDurationFilter(value as any)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FilterCard value="all" label="Tutte" icon={Clock} selectedValue={durationFilter} onSelect={setDurationFilter} />
                        <FilterCard value="Intensive" label="Intensivi" icon={Zap} selectedValue={durationFilter} onSelect={setDurationFilter} />
                        <FilterCard value="Long-term" label="Lungo Termine" icon={Layers} selectedValue={durationFilter} onSelect={setDurationFilter} />
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>

        <div className="space-y-16">
           {loading ? (
             <Skeleton className="h-64 w-full" />
           ) : filteredItems.length > 0 ? (
                filteredItems.map(category => (
                    <section key={category.name}>
                        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">{category.name}</h2>
                        {category.subCategories.map(subCategory => (
                            <div key={subCategory.name} className="mb-12">
                                {subCategory.name !== category.name && <h3 className="text-2xl font-semibold mb-6">{subCategory.name}</h3>}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {subCategory.resources.map(resource => <ResourceCard key={resource.id} resource={resource} />)}
                                </div>
                            </div>
                        ))}
                    </section>
                ))
            ) : (
                 <div className="text-center py-16 text-muted-foreground">
                    <p className="text-lg">Nessuna risorsa trovata con i filtri selezionati.</p>
                </div>
            )}
        </div>
    </div>
  );
}

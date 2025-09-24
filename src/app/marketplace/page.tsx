'use client';

import { useState, useMemo, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Award, Filter, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { registerUserForActivity } from '../actions';
import { allActivities } from '@/lib/activities';
import { ActivityCard } from '@/components/activity-card';

const allCategories = [...new Set(allActivities.map(item => item.category))];
const maxPoints = Math.max(...allActivities.map(item => item.points || 0));

export default function MarketplacePage() {
    const { user, userProfile } = useAuth();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [activeTab, setActiveTab] = useState<'spend' | 'earn'>('spend');
    const [pointRange, setPointRange] = useState<[number]>([maxPoints]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    const filteredItems = useMemo(() => {
        return allActivities.filter(item => 
            item.type === activeTab &&
            (item.points || 0) <= pointRange[0] &&
            (selectedCategories.length === 0 || selectedCategories.includes(item.category))
        );
    }, [activeTab, pointRange, selectedCategories]);

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
            {/* Sidebar Filtri */}
            <aside className="w-full md:w-1/4 lg:w-1/5">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Filter className="w-5 h-5"/>Filtri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3">Punti Massimi</h4>
                             <Slider
                                defaultValue={[maxPoints]}
                                max={maxPoints}
                                step={10}
                                onValueChange={(value) => setPointRange(value as [number])}
                            />
                            <div className="text-sm text-muted-foreground mt-2 text-center">Fino a {pointRange[0]} punti</div>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-3">Categorie</h4>
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
                        </div>
                    </CardContent>
                </Card>
            </aside>

            {/* Contenuto Principale */}
            <div className="flex-1">
                <div className="flex border-b mb-8">
                     <button onClick={() => setActiveTab('spend')} className={tabButtonStyle('spend')}>
                        <div className="flex items-center justify-center gap-2"><ShoppingCart /> Spendi Punti</div>
                     </button>
                     <button onClick={() => setActiveTab('earn')} className={tabButtonStyle('earn')}>
                        <div className="flex items-center justify-center gap-2"><Award /> Ottieni Punti</div>
                     </button>
                </div>

                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item) => (
                            <ActivityCard key={item.slug} item={item} />
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

'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight, Award, ShoppingCart, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { newsItems as allNewsItems } from '../page-sections/news-section';

const earnPointsItems = allNewsItems.filter(item => item.points && item.points > 0);

const spendPointsItems = [
    {
      title: 'Accesso Esclusivo: Opening Mostra "Visioni Digitali"',
      description: 'Assicurati il tuo posto per la serata inaugurale della nostra nuova mostra. Posti limitati.',
      image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
      cta: 'Usa i tuoi Punti',
      category: 'Eventi',
      points: 250,
    },
    {
      title: 'Stampa Fine Art in Edizione Limitata',
      description: 'Una stampa esclusiva dell\'opera "Riflessi Urbani" di Artista Famoso. Solo 50 copie disponibili.',
      image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
      cta: 'Riscatta Ora',
      category: 'Arte',
      points: 500,
    },
    {
      title: 'Workshop di Scultura 3D con Artista Digitale',
      description: 'Un workshop intensivo di 2 giorni per imparare le tecniche avanzate di scultura digitale. Accesso riservato.',
      image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
      cta: 'Usa i tuoi Punti',
      category: 'Formazione',
      points: 800,
    },
];

const allItems = [...earnPointsItems.map(item => ({...item, type: 'earn'})), ...spendPointsItems.map(item => ({...item, type: 'spend'}))];

const allCategories = [...new Set(allItems.map(item => item.category))];
const maxPoints = Math.max(...allItems.map(item => item.points || 0));

export default function MarketplacePage() {
    const [activeTab, setActiveTab] = useState<'earn' | 'spend'>('spend');
    const [pointRange, setPointRange] = useState<[number]>([maxPoints]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    const filteredItems = useMemo(() => {
        return allItems.filter(item => 
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

    const tabButtonStyle = (tabName: 'earn' | 'spend') => 
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
                        {filteredItems.map((item, index) => (
                            <Card key={`${item.title}-${index}`} className="overflow-hidden flex flex-col h-full bg-card/80 backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-300">
                                <div className="aspect-video overflow-hidden relative">
                                    {item.image && (
                                    <Image src={item.image.imageUrl} alt={item.description} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={item.image.imageHint} />
                                    )}
                                    {item.points && (
                                        <Badge className="absolute top-2 right-2 text-lg bg-primary text-primary-foreground shadow-lg">{item.type === 'earn' ? '+' : ''}{item.points} Punti</Badge>
                                    )}
                                </div>
                                <CardHeader>
                                    <Badge variant="secondary" className="w-fit mb-2">{item.category}</Badge>
                                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription className="text-base">{item.description}</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant={item.type === 'earn' ? 'link' : 'default'} className={item.type === 'earn' ? 'text-primary p-0' : 'w-full'}>
                                        <a href={(item as any).link || '#'}>
                                            {item.cta}
                                            {item.type === 'earn' && <ArrowRight className="ml-2 h-4 w-4" />}
                                        </a>

                                    </Button>
                                </CardFooter>
                            </Card>
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

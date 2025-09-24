'use client';

import { useState, useMemo } from 'react';
import { InteractiveCards } from './interactive-cards';
import { membershipTiers, MembershipTier } from '@/lib/membership-tiers';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MembershipCard } from './membership-card';

export default function TesserePage() {
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null);

  const handleSelectTier = (tier: MembershipTier) => {
    setSelectedTier(tier);
  };

  const handleGoBack = () => {
    setSelectedTier(null);
  };

  const title = useMemo(() => {
    if (selectedTier) {
      return `Tessere ${selectedTier.title}`;
    }
    return 'Il Tuo Status nel Cantiere';
  }, [selectedTier]);

  const description = useMemo(() => {
    if (selectedTier) {
       if (selectedTier.levels.length > 1) {
         return `Scopri i livelli e i vantaggi della categoria ${selectedTier.title}. Scorri in verticale per esplorarli.`;
       }
       return `Scopri i vantaggi esclusivi riservati ai nostri ${selectedTier.title}.`
    }
    return 'Scorri in orizzontale per scoprire le categorie. Clicca su una tessera per esplorarne i gradi.';
  }, [selectedTier]);
  
  const renderDetails = () => {
    if (!selectedTier) return null;

    // Use vertical carousel for any tier with more than one level
    if (selectedTier.levels.length > 1) {
      return (
        <InteractiveCards 
          tiers={membershipTiers}
          selectedTier={selectedTier}
        />
      );
    }
    
    // Special static view for single-level tiers (like Ambassador)
    return (
       <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in-50 duration-500">
        <div className="space-y-4">
           {selectedTier.levels.map(level => (
            <MembershipCard key={level.name} level={level} userName={level.name} />
          ))}
        </div>
        <Card className="p-6 md:p-8 bg-card/80">
          <h3 className="text-2xl font-bold mb-4">Vantaggi Principali</h3>
          <ul className="space-y-3">
            {selectedTier.benefits.map(benefit => (
              <li key={benefit} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-foreground/90">{benefit}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-4 overflow-x-hidden">
      <main className="container mx-auto flex flex-col min-h-[calc(100vh-10rem)] items-center justify-center">
        <div className="text-center mb-8 md:mb-12 animate-in fade-in-50 duration-500 relative w-full">
           {selectedTier && (
            <Button 
              variant="ghost" 
              onClick={handleGoBack} 
              className="absolute -top-12 left-0 md:-top-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alla selezione
            </Button>
          )}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-foreground">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            {description}
          </p>
        </div>
        
        {selectedTier ? (
            renderDetails()
        ) : (
            <InteractiveCards 
                tiers={membershipTiers}
                selectedTier={null}
                onSelectTier={handleSelectTier}
            />
        )}
      </main>
    </div>
  );
}

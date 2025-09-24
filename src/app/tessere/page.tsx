'use client';

import { useState, useMemo } from 'react';
import { InteractiveCards } from './interactive-cards';
import { membershipTiers, MembershipTier } from '@/lib/membership-tiers';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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
      return `Scopri i livelli e i vantaggi della categoria ${selectedTier.title}.`;
    }
    return 'Scorri in orizzontale per scoprire le categorie. Clicca su una tessera per esplorarne i gradi.';
  }, [selectedTier]);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-4 overflow-hidden">
      <main className="container mx-auto flex flex-col h-[80vh] items-center justify-center">
        <div className="text-center mb-8 md:mb-12 animate-in fade-in-50 duration-500 relative">
           {selectedTier && (
            <Button 
              variant="ghost" 
              onClick={handleGoBack} 
              className="absolute -top-8 left-0"
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
        <InteractiveCards 
            tiers={membershipTiers}
            selectedTier={selectedTier}
            onSelectTier={handleSelectTier}
        />
      </main>
    </div>
  );
}

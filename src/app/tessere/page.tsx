'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

import { MembershipCard, CardSpotlight } from './membership-card';
import {
  membershipTiers,
  type MembershipTier,
  type UserTier,
  type SpecialTier,
  getUserTier
} from '@/lib/membership-tiers';
import { CheckCircle, Users, Building, Handshake, Crown, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


const selectionOptions: {
  id: 'user' | 'partner' | 'sponsor' | 'ambassador';
  icon: React.ReactNode;
  title: string;
  description: string;
  tier: MembershipTier;
}[] = membershipTiers.map(tier => {
  let icon;
  switch (tier.type) {
    case 'user': icon = <Users className="w-10 h-10 text-primary" />; break;
    case 'partner': icon = <Handshake className="w-10 h-10 text-primary" />; break;
    case 'sponsor': icon = <Building className="w-10 h-10 text-primary" />; break;
    case 'ambassador': icon = <Crown className="w-10 h-10 text-primary" />; break;
  }
  return {
    id: tier.type,
    icon: icon,
    title: tier.title,
    description: tier.description,
    tier: tier,
  };
});


export default function TesserePage() {
    const [selection, setSelection] = useState<MembershipTier | null>(null);
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const handleSelect = (tier: MembershipTier) => {
        setSelection(tier);
    }

    const renderSelectionContent = () => {
        if (!selection) return null;

        if (selection.type === 'user') {
            const userTier = selection as UserTier;
            return (
                <div className="w-full">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Evolvi nella Community
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                            Accumula Punti Esperienza (XP) e sblocca nuovi gradi. Ogni livello ti dà accesso a ricompense, sconti e opportunità esclusive.
                        </p>
                    </div>
                     <Carousel
                        opts={{
                        align: 'start',
                        loop: true,
                        }}
                        plugins={[
                        Autoplay({
                            delay: 5000,
                            stopOnInteraction: true,
                        }),
                        ]}
                        className="w-full max-w-5xl mx-auto"
                    >
                        <CarouselContent className="-ml-4">
                        {userTier.levels.map((level, index) => (
                            <CarouselItem
                            key={index}
                            className="md:basis-1/2 lg:basis-1/3 pl-8"
                            >
                            <div className="p-1 h-full">
                                <CardSpotlight>
                                <MembershipCard
                                    tierType="user"
                                    level={level}
                                    className="h-full"
                                    userXP={level.xpThreshold}
                                />
                                </CardSpotlight>
                            </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden xl:flex" />
                        <CarouselNext className="hidden xl:flex" />
                    </Carousel>
                </div>
            )
        }

        const selectedTier = selection as SpecialTier;
        return (
             <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <CardSpotlight>
                    <MembershipCard
                        tierType={selectedTier.type}
                        level={selectedTier.levels[0]}
                        userName={selectedTier.title}
                    />
                </CardSpotlight>
                <div>
                     <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {selectedTier.title}
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80">
                        {selectedTier.description}
                    </p>
                    <div className="mt-8">
                        <h4 className="font-semibold mb-4 text-xl">
                            Vantaggi Esclusivi
                        </h4>
                        <ul className="space-y-3">
                            {selectedTier.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                <span className="text-foreground/90">{benefit}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-4 overflow-x-hidden">
        <main className="container mx-auto">
            <div className="text-center mb-12 animate-in fade-in-50 duration-500">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-foreground">
                    Il Tuo Status nel Cantiere
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
                    {selection
                    ? `Scopri i dettagli della Tessera ${selection.title}.`
                    : 'Ogni contributo, ogni partecipazione, ogni interazione ti fa crescere all\'interno della nostra community. Scegli il tuo percorso.'}
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                {selection ? (
                    <div className="animate-in fade-in-50 duration-500">
                        <Button variant="ghost" onClick={() => setSelection(null)} className="mb-8">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Torna alla selezione
                        </Button>
                        {renderSelectionContent()}
                    </div>
                ) : (
                    <div className="animate-in fade-in-50 duration-500">
                        <Carousel setApi={setApi} className="w-full">
                            <CarouselContent>
                                {selectionOptions.map((option, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center">
                                         <div 
                                            className="w-[300px]"
                                            onClick={() => handleSelect(option.tier)}
                                         >
                                            <CardSpotlight className="w-full">
                                                <MembershipCard
                                                    tierType={option.id}
                                                    level={option.tier.levels[0]}
                                                />
                                            </CardSpotlight>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        
                        <div className="mt-12 text-center max-w-2xl mx-auto">
                            {api && selectionOptions[current] && (
                                <div className="animate-in fade-in-20 duration-300">
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                        {selectionOptions[current].title}
                                    </h2>
                                    <p className="mt-4 text-lg text-foreground/80">
                                        {selectionOptions[current].description}
                                    </p>
                                    <Button onClick={() => handleSelect(selectionOptions[current].tier)} className="mt-6">
                                        Scopri di più
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    </div>
  );
}

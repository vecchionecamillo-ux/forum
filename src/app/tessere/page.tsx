'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Building, Handshake, Crown, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Selection = 'user' | 'partner' | 'sponsor' | 'ambassador';

const userTierData = membershipTiers.find(
  (tier) => tier.type === 'user'
) as UserTier;

const specialTiersData = membershipTiers.filter(
  (tier) => tier.type !== 'user'
) as SpecialTier[];


const selectionOptions: {
  id: Selection;
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    id: 'user',
    icon: <Users className="w-10 h-10 text-primary" />,
    title: 'Tessera Membro',
    description: 'Il tuo passaporto per la community. Accumula XP, sali di livello e sblocca vantaggi esclusivi.',
  },
  {
    id: 'partner',
    icon: <Handshake className="w-10 h-10 text-primary" />,
    title: 'Tessera Partner',
    description: 'Per le istituzioni che co-progettano attivamente con noi, creando valore condiviso.',
  },
  {
    id: 'sponsor',
    icon: <Building className="w-10 h-10 text-primary" />,
    title: 'Tessera Sponsor',
    description: 'Per le aziende visionarie che sostengono la nostra missione culturale e innovativa.',
  },
   {
    id: 'ambassador',
    icon: <Crown className="w-10 h-10 text-primary" />,
    title: 'Tessera Ambassador',
    description: 'Lo status più prestigioso, riservato a chi incarna e promuove i valori del Cantiere.',
  },
];


export default function TesserePage() {
    const [selection, setSelection] = useState<Selection | null>(null);

    const renderSelectionContent = () => {
        if (!selection) return null;

        if (selection === 'user') {
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
                        {userTierData.levels.map((level, index) => (
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

        const selectedTier = specialTiersData.find(t => t.type === selection);
        if (!selectedTier) return null;

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
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-4">
        <main className="container mx-auto">
            <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-foreground">
                Il Tuo Status nel Cantiere
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
                {selection
                ? `Scopri i dettagli della Tessera ${selection.charAt(0).toUpperCase() + selection.slice(1)}.`
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in-50 duration-500">
                        {selectionOptions.map((option) => (
                            <Card 
                            key={option.id}
                            onClick={() => setSelection(option.id)}
                            className="cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center p-6 bg-card/50"
                            >
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                {option.icon}
                            </div>
                            <h3 className="text-2xl font-bold">{option.title}</h3>
                            <p className="text-foreground/70 mt-2 flex-grow">{option.description}</p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </main>
    </div>
  );
}

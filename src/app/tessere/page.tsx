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
} from '@/lib/membership-tiers';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Building, Handshake, Crown } from 'lucide-react';

const specialTiers = membershipTiers.filter(
  (tier) => tier.type !== 'user'
) as MembershipTier[];

const userTiers = membershipTiers.find(
  (tier) => tier.type === 'user'
) as UserTier;

const tierIcons = {
  user: <Users className="w-8 h-8 text-primary" />,
  partner: <Handshake className="w-8 h-8 text-blue-500" />,
  sponsor: <Building className="w-8 h-8 text-purple-500" />,
  ambassador: <Crown className="w-8 h-8 text-amber-500" />,
};

export default function TesserePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative text-center py-32 md:py-48 px-4 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-0"></div>
        <div className="relative z-10">
          <Badge
            variant="outline"
            className="text-sm sm:text-base py-1 px-4 rounded-full border-primary/50 bg-primary/10 text-primary mb-6"
          >
            Il Tuo Status nel Cantiere
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight text-foreground">
            La Tua Tessera. <br />
            Il Tuo Viaggio.
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            Ogni contributo, ogni partecipazione, ogni interazione ti fa crescere
            all'interno della nostra community. Scopri un ecosistema di
            vantaggi pensato per premiare la tua passione.
          </p>
        </div>
      </section>

      {/* User Tiers Carousel Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Evolvi nella Community
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Accumula Punti Esperienza (XP) e sblocca nuovi gradi. Ogni
              livello ti dà accesso a ricompense, sconti e opportunità
              esclusive.
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
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {userTiers.levels.map((level, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <div className="p-1 h-full">
                    <CardSpotlight>
                      <MembershipCard
                        tierType="user"
                        level={level}
                        className="h-full"
                      />
                    </CardSpotlight>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
      </section>

      {/* Special Tiers Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Un Ruolo da Protagonista
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Il Cantiere Culturale cresce grazie ai suoi alleati strategici.
              Scopri le tessere dedicate a chi contribuisce in modo speciale
              alla nostra missione.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {specialTiers.map((tier) => (
              <div key={tier.type} className="flex flex-col">
                <div className="p-4 bg-muted rounded-t-lg flex flex-col items-center text-center">
                  <div className="mb-4">{tierIcons[tier.type]}</div>
                  <h3 className="text-2xl font-bold">{tier.title}</h3>
                  <p className="text-muted-foreground mt-1">
                    {tier.description}
                  </p>
                </div>
                <div className="bg-muted/40 rounded-b-lg p-6 flex-grow">
                  <h4 className="font-semibold mb-4 text-center">
                    Vantaggi Principali
                  </h4>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-foreground/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

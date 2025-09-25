'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Dummy data structure, replace with your actual partner data type
type Partner = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
};

// In a real application, this would fetch from a database or CMS.
// For now, we simulate with a static array.
const partners: Partner[] = [
  { id: '1', name: 'Partner 1', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner1', websiteUrl: 'https://www.google.com' },
  { id: '2', name: 'Partner 2', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner2', websiteUrl: 'https://www.google.com' },
  { id: '3', name: 'Partner 3', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner3', websiteUrl: 'https://www.google.com' },
  { id: '4', name: 'Partner 4', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner4', websiteUrl: 'https://www.google.com' },
  { id: '5', name: 'Partner 5', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner5', websiteUrl: 'https://www.google.com' },
  { id: '6', name: 'Partner 6', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner6', websiteUrl: 'https://www.google.com' },
  { id: '7', name: 'Partner 7', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner7', websiteUrl: 'https://www.google.com' },
  { id: '8', name: 'Partner 8', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner8', websiteUrl: 'https://www.google.com' },
];


/**
 * Component for a single track of the logo carousel.
 * @param {object} props - The properties of the component.
 * @param {'normal' | 'reverse'} props.direction - The direction of the animation.
 */
const LogoTrack = ({ direction = 'normal' }: { direction: 'normal' | 'reverse' }) => {
  // To create an infinite scroll effect, we duplicate the partner logos.
  const allLogos = [...partners, ...partners];

  return (
    <div
      className={cn(
        'flex animate-scroll w-max',
        direction === 'reverse' ? 'animation-direction-reverse' : ''
      )}
    >
      {allLogos.map((partner, index) => (
        <a
          key={`${partner.name}-${index}`}
          href={partner.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 mx-4 transition-transform duration-300 hover:scale-110"
          aria-label={`Visita il sito di ${partner.name}`}
        >
          <Image
            src={partner.logoUrl}
            alt={`Logo di ${partner.name}`}
            width={120}
            height={60}
            className="object-contain"
          />
        </a>
      ))}
    </div>
  );
};


/**
 * Component that displays a two-row carousel of partner logos.
 * The rows scroll in opposite directions in an infinite loop.
 */
export function PartnerCarousel() {

  // In a real app, you would fetch partners here.
  // const [partners, setPartners] = React.useState<Partner[]>([]);
  // const [loading, setLoading] = React.useState(true);
  // useEffect(() => { ... fetch logic ... }, []);
  const loading = false; // Simulating loaded state

  return (
    <section className="bg-muted/40 py-16 sm:py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
          I Nostri Partner
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-foreground/80 mb-12">
          Collaboriamo con istituzioni, aziende e realtà creative che condividono la nostra visione e supportano la nostra missione.
        </p>
        
        {loading ? (
            <div className="space-y-8">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
        ) : (
          <div className="relative overflow-hidden group space-y-8">
            <LogoTrack direction="normal" />
            <LogoTrack direction="reverse" />
            
            {/* Fading gradients on the sides */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-muted/40 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-muted/40 to-transparent"></div>
          </div>
        )}
      </div>
    </section>
  );
}

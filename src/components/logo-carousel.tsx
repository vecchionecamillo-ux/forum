'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type Logo = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
};

// In a real application, this would fetch from a database or CMS.
// For now, we simulate with a static array.
const defaultLogos: Logo[] = [
  { id: '1', name: 'Partner 1', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner1', websiteUrl: '#' },
  { id: '2', name: 'Partner 2', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner2', websiteUrl: '#' },
  { id: '3', name: 'Partner 3', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner3', websiteUrl: '#' },
  { id: '4', name: 'Partner 4', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner4', websiteUrl: '#' },
  { id: '5', name: 'Partner 5', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner5', websiteUrl: '#' },
  { id: '6', name: 'Partner 6', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner6', websiteUrl: '#' },
  { id: '7', name: 'Partner 7', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner7', websiteUrl: '#' },
  { id: '8', name: 'Partner 8', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner8', websiteUrl: '#' },
];


interface LogoTrackProps {
    logos: { logoUrl: string, name: string, websiteUrl?: string }[];
    direction?: 'normal' | 'reverse';
}

const LogoTrack = ({ logos, direction = 'normal' }: LogoTrackProps) => {
  // To create an infinite scroll effect, we duplicate the logos.
  const allLogos = [...logos, ...logos];

  return (
    <div
      className={cn(
        'flex animate-scroll w-max items-center',
        direction === 'reverse' ? 'animation-direction-reverse' : ''
      )}
    >
      {allLogos.map((logo, index) => (
        <a
          key={`${logo.name}-${index}`}
          href={logo.websiteUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 mx-8 transition-transform duration-300 hover:scale-110"
          aria-label={`Visita il sito di ${logo.name}`}
        >
          <Image
            src={logo.logoUrl}
            alt={`Logo di ${logo.name}`}
            width={120}
            height={60}
            className="object-contain"
            unoptimized // Useful for SVG or simple logos
          />
        </a>
      ))}
    </div>
  );
};


interface LogoCarouselProps {
    logos?: Logo[];
    logoUrl?: string; // For repeating a single logo
    logoCount?: number;
}

export function LogoCarousel({ logos = defaultLogos, logoUrl, logoCount = 16 }: LogoCarouselProps) {
  const loading = false; // Simulating loaded state

  // If a single logoUrl is provided, create an array of logos to repeat
  const displayLogos = logoUrl
    ? Array.from({ length: logoCount }, (_, i) => ({
        id: `logo-${i}`,
        name: `logo ${i + 1}`,
        logoUrl: logoUrl,
        websiteUrl: '#',
      }))
    : logos;

  if (loading) {
      return (
          <div className="space-y-8">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
          </div>
      )
  }
  
  // Split logos for two tracks for a denser pattern if needed
  const half = Math.ceil(displayLogos.length / 2);
  const firstHalf = displayLogos.slice(0, half);
  const secondHalf = displayLogos.slice(half);

  return (
    <div className="relative overflow-hidden group space-y-8">
      <LogoTrack logos={firstHalf} direction="normal" />
      <LogoTrack logos={secondHalf} direction="reverse" />
    </div>
  );
}

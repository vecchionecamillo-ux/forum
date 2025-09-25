'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export type Logo = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
};

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
    loading?: boolean;
}

export function LogoCarousel({ logos, logoUrl, logoCount = 16, loading = false }: LogoCarouselProps) {

  // If a single logoUrl is provided, create an array of logos to repeat
  const displayLogos = logoUrl
    ? Array.from({ length: logoCount }, (_, i) => ({
        id: `logo-${i}`,
        name: `logo ${i + 1}`,
        logoUrl: logoUrl,
        websiteUrl: '#',
      }))
    : logos || [];

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
      {secondHalf.length > 0 && <LogoTrack logos={secondHalf} direction="reverse" />}
    </div>
  );
}

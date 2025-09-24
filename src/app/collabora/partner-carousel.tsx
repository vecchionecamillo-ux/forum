'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// --- Dati Segnaposto per i Partner ---
// In un'applicazione reale, questi dati proverrebbero da un CMS o da un file di configurazione.
const partners = [
  { name: 'Partner 1', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner1', websiteUrl: 'https://www.google.com' },
  { name: 'Partner 2', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner2', websiteUrl: 'https://www.google.com' },
  { name: 'Partner 3', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner3', websiteUrl: 'https://www.google.com' },
  { name: 'Partner 4', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner4', websiteUrl: 'https://www.google.com' },
  { name: 'Partner 5', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner5', websiteUrl: 'https://www.google.com' },
  { name: 'Partner 6', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner6', websiteUrl: 'https://www.google.com' },
  { name: 'Partner 7', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner7', websiteUrl: 'https://www.google.com' },
  { name: 'Partner 8', logoUrl: 'https://placehold.co/120x60/EFEFEF/31343C?text=Partner8', websiteUrl: 'https://www.google.com' },
];

/**
 * Componente per una singola traccia del carosello di loghi.
 * @param {object} props - Le proprietà del componente.
 * @param {'normal' | 'reverse'} props.direction - La direzione dell'animazione.
 */
const LogoTrack = ({ direction = 'normal' }: { direction: 'normal' | 'reverse' }) => {
  // Duplichiamo i loghi per creare l'effetto di scorrimento infinito.
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
 * Componente PartnerCarousel che visualizza un carosello di loghi dei partner su due righe.
 * Le righe scorrono in direzioni opposte in un loop infinito.
 */
export function PartnerCarousel() {
  return (
    // Sezione principale con sfondo grigio chiaro e contenuto centrato.
    <section className="bg-muted/40 py-16 sm:py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
          I Nostri Partner
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-foreground/80 mb-12">
          Collaboriamo con istituzioni, aziende e realtà creative che condividono la nostra visione e supportano la nostra missione.
        </p>
        
        {/* Contenitore per le due righe del carosello. */}
        <div className="space-y-8">
            {/* 
              Prima riga del carosello. 
              'overflow-hidden' nasconde i loghi che escono dall'area visibile.
              'group' viene utilizzato per gli stili di interazione (non usato qui ma buona pratica).
            */}
            <div className="relative overflow-hidden">
                <LogoTrack direction="normal" />
                 {/* Gradiente per un effetto di dissolvenza ai lati */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-muted/40 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-muted/40 to-transparent"></div>
            </div>

            {/* Seconda riga del carosello, con direzione invertita. */}
            <div className="relative overflow-hidden">
                <LogoTrack direction="reverse" />
                 {/* Gradiente per un effetto di dissolvenza ai lati */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-muted/40 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-muted/40 to-transparent"></div>
            </div>
        </div>
      </div>
    </section>
  );
}

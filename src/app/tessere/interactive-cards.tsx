'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { MembershipCard } from './membership-card';
import type { MembershipTier, UserTierLevel } from '@/lib/membership-tiers';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HorizontalCarousel = ({ tiers, onSelectTier }: { tiers: MembershipTier[], onSelectTier: (tier: MembershipTier) => void }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {tiers.map((tier, index) => (
            <div key={tier.type} className="pl-4 min-w-0 flex-[0_0_90%] md:flex-[0_0_50%] lg:flex-[0_0_40%]">
              <div
                className={cn(
                  'transition-opacity duration-300',
                  index === selectedIndex ? 'opacity-100' : 'opacity-40'
                )}
                onClick={() => index === selectedIndex && onSelectTier(tier)}
              >
                <MembershipCard
                  level={tier.levels[0]}
                  userName={tier.title}
                  className={cn(index === selectedIndex && 'cursor-pointer')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
       <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
        <button onClick={scrollPrev} className="text-foreground hover:text-primary transition-colors disabled:opacity-30" disabled={selectedIndex === 0}>
          <ChevronLeft className="w-10 h-10" />
        </button>
        <button onClick={scrollNext} className="text-foreground hover:text-primary transition-colors disabled:opacity-30" disabled={selectedIndex === tiers.length - 1}>
          <ChevronRight className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

const VerticalCarousel = ({ levels }: { levels: UserTierLevel[] }) => {
  const [emblaRef] = useEmblaCarousel({ axis: 'y', loop: false, align: 'center' });

  return (
    <div className="h-[400px] w-full max-w-[500px] overflow-hidden" ref={emblaRef}>
        <div className="flex flex-col -mt-4 h-full">
            {levels.map((level) => (
                <div key={level.name} className="pt-4 min-h-0 flex-[0_0_70%]">
                     <MembershipCard level={level} userXP={level.xpThreshold} />
                </div>
            ))}
        </div>
    </div>
  )
}

interface InteractiveCardsProps {
  tiers: MembershipTier[];
  selectedTier: MembershipTier | null;
  onSelectTier: (tier: MembershipTier) => void;
}

export function InteractiveCards({ tiers, selectedTier, onSelectTier }: InteractiveCardsProps) {
  if (selectedTier) {
    return <VerticalCarousel levels={selectedTier.levels} />;
  }

  return <HorizontalCarousel tiers={tiers} onSelectTier={onSelectTier} />;
}

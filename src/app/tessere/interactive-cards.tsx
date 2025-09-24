'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { MembershipCard } from './membership-card';
import type { MembershipTier, UserTierLevel } from '@/lib/membership-tiers';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HorizontalCarouselProps {
  tiers: MembershipTier[];
  onSelectTier: (tier: MembershipTier) => void;
}

const HorizontalCarousel = ({ tiers, onSelectTier }: HorizontalCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const handleCardClick = (index: number, tier: MembershipTier) => {
    if (index === selectedIndex) {
      onSelectTier(tier);
    } else {
      emblaApi?.scrollTo(index);
    }
  };

  return (
    <div className="w-full relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {tiers.map((tier, index) => (
            <div key={tier.type} className="pl-4 min-w-0 flex-[0_0_90%] md:flex-[0_0_50%] lg:flex-[0_0_40%]">
              <div
                className={cn(
                  'transition-all duration-300 transform',
                  index === selectedIndex ? 'opacity-100 scale-100' : 'opacity-40 scale-90'
                )}
                onClick={() => handleCardClick(index, tier)}
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
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2 pointer-events-none">
        <Button onClick={scrollPrev} className="text-foreground hover:text-primary transition-colors disabled:opacity-30 pointer-events-auto" variant="ghost" size="icon" disabled={!canScrollPrev}>
          <ChevronLeft className="w-10 h-10" />
        </Button>
        <Button onClick={scrollNext} className="text-foreground hover:text-primary transition-colors disabled:opacity-30 pointer-events-auto" variant="ghost" size="icon" disabled={!canScrollNext}>
          <ChevronRight className="w-10 h-10" />
        </Button>
      </div>
    </div>
  );
};

interface VerticalLevelListProps {
    levels: UserTierLevel[];
    onScroll: (index: number) => void;
}

const VerticalLevelList = ({ levels, onScroll }: VerticalLevelListProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: false });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);


    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        onScroll(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi, onScroll]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="w-full max-w-lg relative">
            <Button onClick={scrollPrev} className="absolute -top-12 left-1/2 -translate-x-1/2 text-foreground hover:text-primary transition-colors disabled:opacity-30 z-10" variant="ghost" size="icon" disabled={!canScrollPrev}>
              <ChevronUp className="w-8 h-8" />
            </Button>
            <div className="h-[400px] overflow-hidden" ref={emblaRef}>
                <div className="flex flex-col h-full">
                    {levels.map((level) => (
                        <div key={level.name} className="flex-[0_0_100%] min-h-0 flex items-center justify-center p-4">
                            <MembershipCard level={level} userXP={level.xpThreshold} />
                        </div>
                    ))}
                </div>
            </div>
             <Button onClick={scrollNext} className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-foreground hover:text-primary transition-colors disabled:opacity-30 z-10" variant="ghost" size="icon" disabled={!canScrollNext}>
              <ChevronDown className="w-8 h-8" />
            </Button>
        </div>
    );
};


interface InteractiveCardsProps {
  tiers: MembershipTier[];
  selectedTier: MembershipTier | null;
  onSelectTier?: (tier: MembershipTier) => void;
  onLevelScroll?: (index: number) => void;
}

export function InteractiveCards({ tiers, selectedTier, onSelectTier, onLevelScroll }: InteractiveCardsProps) {
  if (selectedTier) {
    if(!onLevelScroll) return null;
    return <VerticalLevelList levels={selectedTier.levels} onScroll={onLevelScroll} />;
  }

  if(!onSelectTier) return null;
  return <HorizontalCarousel tiers={tiers} onSelectTier={onSelectTier} />;
}

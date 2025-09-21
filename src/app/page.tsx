'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const backgroundImages = [
  PlaceHolderImages.find((img) => img.id === 'art-placeholder'),
  PlaceHolderImages.find((img) => img.id === 'community-placeholder'),
  PlaceHolderImages.find((img) => img.id === 'training-placeholder'),
  PlaceHolderImages.find((img) => img.id === 'events-placeholder'),
].filter(Boolean) as (typeof PlaceHolderImages)[0][];

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleNavigation = useCallback(() => {
    if (hasScrolled) return;
    setHasScrolled(true);
    setIsExiting(true);
    setTimeout(() => {
      router.push('/about');
    }, 800); // Duration should match the animation
  }, [router, hasScrolled]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        handleNavigation();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        handleNavigation();
      }
    };
    
    // For touch devices
    let touchstartY = 0;
    const handleTouchStart = (event: TouchEvent) => {
        touchstartY = event.changedTouches[0].screenY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
        const touchendY = event.changedTouches[0].screenY;
        if (touchendY < touchstartY) { // Swiped up
            handleNavigation();
        }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);


    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNavigation]);

  return (
    <div className={cn("relative h-screen w-screen overflow-hidden", isExiting && 'animate-page-exit')}>
      <Carousel
        className="absolute inset-0 w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {backgroundImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative h-screen w-screen">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none animate-fade-in-up" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
          Cantiere Culturale
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/90 animate-fade-in-up animation-delay-300" style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}>
          Un'esperienza dove arte digitale e innovazione si incontrano per plasmare il futuro creativo europeo.
        </p>
      </div>

       <button
        onClick={handleNavigation}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white animate-bounce"
        style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}
      >
        <span className="text-sm font-medium uppercase tracking-widest">Scorri per scoprire</span>
        <ChevronDown className="h-6 w-6" />
      </button>
    </div>
  );
}

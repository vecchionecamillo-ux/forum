'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const backgroundImage = PlaceHolderImages.find((img) => img.id === 'art-placeholder');

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
      {backgroundImage && (
        <Image
          src={backgroundImage.imageUrl}
          alt={backgroundImage.description}
          fill
          className="object-cover"
          data-ai-hint={backgroundImage.imageHint}
          priority
        />
      )}
      
      <div className="absolute inset-0 bg-background/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none animate-fade-in-up" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
          Benvenuto nel Cantiere Culturale
        </h1>
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

'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  // Pre-fetch the /about route as soon as the component mounts
  useEffect(() => {
    router.prefetch('/about');
  }, [router]);

  const handleNavigation = useCallback(() => {
    if (hasNavigated) return;
    setHasNavigated(true);
    setIsExiting(true);
    // The navigation will be triggered by onAnimationEnd
  }, [hasNavigated]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        handleNavigation();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault(); // Prevent default scroll behavior
        handleNavigation();
      }
    };
    
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

    window.addEventListener('wheel', handleWheel, { once: true });
    window.addEventListener('keydown', handleKeyDown, { once: true });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);


    return () => {
      // Clean up listeners that might not have been triggered
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNavigation]);

  const onAnimationEnd = () => {
    if (isExiting) {
      router.push('/about');
    }
  };


  return (
    <div 
      className={cn("relative h-screen w-screen overflow-hidden", isExiting && 'animate-page-exit')}
      onAnimationEnd={onAnimationEnd}
    >
      
      <div className="absolute inset-0 bg-transparent z-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-foreground px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none animate-fade-in-up">
          Benvenuto nel Cantiere Culturale
        </h1>
      </div>

       <button
        onClick={handleNavigation}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-foreground animate-bounce"
        aria-label="Scorri per scoprire"
      >
        <span className="text-sm font-medium uppercase tracking-widest">Scorri per scoprire</span>
        <ChevronDown className="h-6 w-6" />
      </button>
    </div>
  );
}

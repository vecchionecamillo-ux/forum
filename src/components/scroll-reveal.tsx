'use client';
import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ScrollRevealWrapperProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function ScrollRevealWrapper({ children, className, id }: ScrollRevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={cn(
        'reveal',
        isVisible && 'visible',
        className
      )}
    >
      {children}
    </div>
  );
}


'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

type SectionInfo = {
  id: string;
  image: ImagePlaceholder;
};

type DynamicBackgroundProps = {
  sections: SectionInfo[];
};

export function DynamicBackground({ sections }: DynamicBackgroundProps) {
  const [activeImage, setActiveImage] = useState<ImagePlaceholder | null>(null);
  const [visibleImage, setVisibleImage] = useState<ImagePlaceholder | null>(null);
  const [isFading, setIsFading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (sections.length > 0 && !activeImage) {
      setActiveImage(sections[0].image);
      setVisibleImage(sections[0].image);
    }
  }, [sections, activeImage]);

  useEffect(() => {
    if (activeImage && visibleImage?.id !== activeImage.id) {
      setIsFading(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setVisibleImage(activeImage);
        setIsFading(false);
      }, 500); // Match fade-out duration
    }
  }, [activeImage, visibleImage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const newActiveSection = sections.find((s) => s.id === sectionId);
            if (newActiveSection) {
              setActiveImage(newActiveSection.image);
            }
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    const elements = sections.map((s) => document.getElementById(s.id)).filter(el => el);
    elements.forEach((el) => observer.observe(el!));

    return () => {
      elements.forEach((el) => observer.unobserve(el!));
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [sections]);

  if (!visibleImage) return null;

  return (
    <div className="fixed inset-0 -z-10 w-full h-screen">
       <Image
        key={visibleImage.id}
        src={visibleImage.imageUrl}
        alt={visibleImage.description}
        fill
        className={cn(
          "object-cover transition-opacity duration-500 ease-in-out",
          isFading ? 'opacity-0' : 'opacity-20'
        )}
        priority
      />
    </div>
  );
}

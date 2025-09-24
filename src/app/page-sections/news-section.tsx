import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';
import Image from 'next/image';
import { ArrowRight, Gem, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { allActivities } from '@/lib/activities';
import Link from 'next/link';
import { ActivityCard } from '@/components/activity-card';

const newsItems = allActivities.filter(item => item.type === 'earn').slice(0, 3);

export function NewsSection() {
  return (
    <ScrollRevealWrapper id="news">
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground">News & Annunci</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Rimani aggiornato sugli ultimi articoli, annunci ed eventi.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
             <ScrollRevealWrapper key={item.slug} className={`animation-delay-${index * 150}`}>
                <ActivityCard item={item} />
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
   </ScrollRevealWrapper>
  );
}

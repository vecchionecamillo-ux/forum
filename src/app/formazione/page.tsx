'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseCatalogue } from './course-catalogue';
import { ResourceCatalogue } from './resource-catalogue';
import { BookOpenCheck, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { LogoCarousel } from '@/components/logo-carousel';

export default function FormazionePage() {
  
  return (
    <div className="min-h-screen bg-background pt-16 pb-12">
        <section className="relative overflow-hidden py-20 md:py-28 border-b bg-muted/20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Formazione a cura di lab039</h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
                    Accresci le tue competenze con i nostri workshop, laboratori e serie di contenuti. Esplora le migliori risorse di formazione online gratuite, selezionate e curate da lab039 per te.
                </p>
            </div>
          </div>
           <div className="absolute inset-0 z-0 opacity-10">
             <LogoCarousel logoUrl="/lab039-logo.png" />
           </div>
        </section>
      <main className="container mx-auto px-4 mt-12">
        <Tabs defaultValue="corsi-cantiere" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto h-auto">
                <TabsTrigger value="corsi-cantiere" className="py-3 text-base flex items-center gap-2">
                    <BookOpenCheck className="w-5 h-5"/> Corsi del Cantiere
                </TabsTrigger>
                <TabsTrigger value="risorse-elearning" className="py-3 text-base flex items-center gap-2">
                    <GraduationCap className="w-5 h-5"/> Risorse E-Learning
                </TabsTrigger>
            </TabsList>
            <TabsContent value="corsi-cantiere" className="mt-10">
                <CourseCatalogue />
            </TabsContent>
            <TabsContent value="risorse-elearning" className="mt-10">
                <ResourceCatalogue />
            </TabsContent>
        </Tabs>
        
      </main>
    </div>
  );
}

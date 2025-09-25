'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseCatalogue } from './course-catalogue';
import { ResourceCatalogue } from './resource-catalogue';
import { BookOpenCheck, GraduationCap } from 'lucide-react';

export default function FormazionePage() {
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Formazione & E-Learning</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
                Accresci le tue competenze con i nostri workshop, laboratori e serie di contenuti. Esplora le migliori risorse di formazione online gratuite, selezionate per te.
            </p>
        </div>

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

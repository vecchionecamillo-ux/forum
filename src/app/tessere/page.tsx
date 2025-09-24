'use client';

import { InteractiveCards } from './interactive-cards';

export default function TesserePage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-4 overflow-hidden">
      <main className="container mx-auto flex flex-col h-[80vh] items-center justify-center">
        <div className="text-center mb-8 md:mb-12 animate-in fade-in-50 duration-500">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-foreground">
            Il Tuo Status nel Cantiere
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Scorri in orizzontale per scoprire le categorie. Scorri in verticale per esplorare i gradi.
          </p>
        </div>
        <InteractiveCards />
      </main>
    </div>
  );
}

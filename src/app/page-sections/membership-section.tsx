import { ScrollRevealWrapper } from '@/components/scroll-reveal';

export function MembershipSection() {
  return (
    <section id="tessera" className="min-h-screen flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <ScrollRevealWrapper className="text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">La Tessera</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
          Più di un semplice abbonamento. La tessera è la tua chiave d'accesso a un mondo di vantaggi, contenuti esclusivi e a una community di appassionati.
        </p>
      </ScrollRevealWrapper>
    </section>
  );
}

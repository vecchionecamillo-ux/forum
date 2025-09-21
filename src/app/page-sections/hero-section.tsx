import { ScrollRevealWrapper } from '@/components/scroll-reveal';

export function HeroSection() {
  return (
    <ScrollRevealWrapper>
      <section className="flex flex-col justify-center items-center min-h-screen px-4 py-20 text-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
          Cantiere Culturale
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-foreground/80">
          Un'esperienza dove arte digitale e innovazione si incontrano per plasmare il futuro creativo europeo.
        </p>
      </section>
    </ScrollRevealWrapper>
  );
}

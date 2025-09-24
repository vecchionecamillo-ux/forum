import { PlatformSection } from '../page-sections/platform-section';
import { MembershipSection } from '../page-sections/membership-section';
import { NewsSection } from '../page-sections/news-section';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';


export default function AboutPage() {
  return (
    <>
      <main className="pt-16">
          <ScrollRevealWrapper>
            <section className="py-24 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
                    Chi Siamo
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 px-4">
                    Cantiere Culturale è un ecosistema digitale dove arte e innovazione si incontrano. La nostra missione è plasmare il futuro creativo europeo, offrendo una piattaforma per artisti, curatori e appassionati per connettersi, imparare e crescere.
                </p>
            </section>
          </ScrollRevealWrapper>
        <PlatformSection />
        <MembershipSection />
        <NewsSection />
      </main>
    </>
  );
}

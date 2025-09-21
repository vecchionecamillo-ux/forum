import { PlatformSection } from '../page-sections/platform-section';
import { MembershipSection } from '../page-sections/membership-section';
import { MarketplaceSection } from '../page-sections/marketplace-section';
import { NewsSection } from '../page-sections/news-section';
import { DynamicBackground } from '@/components/layout/dynamic-background';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';

const backgroundSections = [
  { id: 'piattaforma', image: PlaceHolderImages.find(img => img.id === 'training-placeholder') },
  { id: 'tessera', image: PlaceHolderImages.find(img => img.id === 'community-placeholder') },
  { id: 'marketplace', image: PlaceHolderImages.find(img => img.id === 'art-placeholder') },
  { id: 'news', image: PlaceHolderImages.find(img => img.id === 'events-placeholder') },
].filter(item => item.image) as { id: string; image: (typeof PlaceHolderImages)[0] }[];


export default function AboutPage() {
  return (
    <>
      <main className="pt-16 relative z-10">
          <ScrollRevealWrapper>
            <section className="py-24 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
                    Chi Siamo
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/90 px-4" style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}>
                    Cantiere Culturale è un ecosistema digitale dove arte e innovazione si incontrano. La nostra missione è plasmare il futuro creativo europeo, offrendo una piattaforma per artisti, curatori e appassionati per connettersi, imparare e crescere.
                </p>
            </section>
          </ScrollRevealWrapper>
        <PlatformSection />
        <MembershipSection />
        <MarketplaceSection />
        <NewsSection />
      </main>
    </>
  );
}

import { PlatformSection } from '../page-sections/platform-section';
import { MembershipSection } from '../page-sections/membership-section';
import { MarketplaceSection } from '../page-sections/marketplace-section';
import { NewsSection } from '../page-sections/news-section';
import { DynamicBackground } from '@/components/layout/dynamic-background';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const backgroundSections = [
  { id: 'piattaforma', image: PlaceHolderImages.find(img => img.id === 'training-placeholder') },
  { id: 'tessera', image: PlaceHolderImages.find(img => img.id === 'community-placeholder') },
  { id: 'marketplace', image: PlaceHolderImages.find(img => img.id === 'art-placeholder') },
  { id: 'news', image: PlaceHolderImages.find(img => img.id === 'events-placeholder') },
].filter(item => item.image) as { id: string; image: (typeof PlaceHolderImages)[0] }[];


export default function AboutPage() {
  return (
    <>
      <DynamicBackground sections={backgroundSections} />
      <main className="pt-16 relative z-10">
          <section className="py-24 text-center bg-background">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                  Chi Siamo
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 px-4">
                  Cantiere Culturale è un ecosistema digitale dove arte e innovazione si incontrano. La nostra missione è plasmare il futuro creativo europeo, offrendo una piattaforma per artisti, curatori e appassionati per connettersi, imparare e crescere.
              </p>
          </section>
        <PlatformSection />
        <MembershipSection />
        <MarketplaceSection />
        <NewsSection />
      </main>
    </>
  );
}

import { HeroSection } from './page-sections/hero-section';
import { MarketplaceSection } from './page-sections/marketplace-section';
import { MembershipSection } from './page-sections/membership-section';
import { PlatformSection } from './page-sections/platform-section';
import { NewsSection } from './page-sections/news-section';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarketplaceSection />
      <MembershipSection />
      <PlatformSection />
      <NewsSection />
    </main>
  );
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const marketplaceItems = [
  {
    title: 'NFT',
    description: 'Opere digitali uniche e certificate, create dai talenti più visionari della scena contemporanea.',
    image: PlaceHolderImages.find(img => img.id === 'nft-placeholder'),
  },
  {
    title: 'ART',
    description: 'Una selezione esclusiva di opere fisiche, dall\'illustrazione alla scultura, che uniscono tradizione e innovazione.',
    image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
  },
  {
    title: 'MERCHANDISING',
    description: 'Sostieni il progetto e porta con te un pezzo del Cantiere Culturale con la nostra linea di merchandising.',
    image: PlaceHolderImages.find(img => img.id === 'merch-placeholder'),
  },
];

export function MarketplaceSection() {
  return (
    <section id="marketplace" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8 bg-black/20">
      <ScrollRevealWrapper className="w-full max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Marketplace</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Uno spazio curato per scoprire, collezionare e scambiare opere che definiscono la nuova era dell'arte digitale e fisica.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {marketplaceItems.map((item) => (
            <Card key={item.title} className="bg-card/50 backdrop-blur-lg border-white/10 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10">
              {item.image && (
                <div className="aspect-video overflow-hidden">
                  <Image src={item.image.imageUrl} alt={item.description} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={item.image.imageHint} />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-accent">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/80 text-base">{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollRevealWrapper>
    </section>
  );
}

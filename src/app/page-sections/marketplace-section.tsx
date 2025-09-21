import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const marketplaceItems = [
  {
    title: 'Accesso Esclusivo: Opening Mostra "Visioni Digitali"',
    description: 'Assicurati il tuo posto per la serata inaugurale della nostra nuova mostra. Posti limitati.',
    image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
    cta: 'Acquista Accesso',
  },
  {
    title: 'Stampa Fine Art in Edizione Limitata',
    description: 'Una stampa esclusiva dell\'opera "Riflessi Urbani" di Artista Famoso. Solo 50 copie disponibili.',
    image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
    cta: 'Compra Ora',
  },
  {
    title: 'Workshop di Scultura 3D con Artista Digitale',
    description: 'Un workshop intensivo di 2 giorni per imparare le tecniche avanzate di scultura digitale. Accesso riservato.',
    image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
    cta: 'Riserva il tuo Posto',
  },
];

export function MarketplaceSection() {
  return (
    <ScrollRevealWrapper id="marketplace">
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground">Marketplace Esclusivo</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
                    Acquista prodotti unici e assicurati l'accesso a eventi imperdibili riservati alla nostra community.
                </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketplaceItems.map((item, index) => (
                <ScrollRevealWrapper key={item.title} className={`animation-delay-${index * 150}`}>
                    <Card className="overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full">
                    {item.image && (
                        <div className="aspect-video overflow-hidden">
                        <Image src={item.image.imageUrl} alt={item.description} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={item.image.imageHint} />
                        </div>
                    )}
                    <CardHeader className="flex-grow">
                        <CardTitle className="text-2xl font-bold text-primary">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <CardDescription className="text-base flex-grow mb-4">{item.description}</CardDescription>
                        <Button className="w-full mt-auto">{item.cta}</Button>
                    </CardContent>
                    </Card>
                </ScrollRevealWrapper>
            ))}
            </div>
        </div>
      </section>
    </ScrollRevealWrapper>
  );
}

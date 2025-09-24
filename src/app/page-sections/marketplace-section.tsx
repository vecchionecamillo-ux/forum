import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, ShoppingCart } from 'lucide-react';
import { newsItems } from './news-section';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const earnPointsItems = newsItems.filter(item => item.points && item.points > 0);

const spendPointsItems = [
    {
      title: 'Accesso Esclusivo: Opening Mostra "Visioni Digitali"',
      description: 'Assicurati il tuo posto per la serata inaugurale della nostra nuova mostra. Posti limitati.',
      image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
      cta: 'Usa i tuoi Punti',
    },
    {
      title: 'Stampa Fine Art in Edizione Limitata',
      description: 'Una stampa esclusiva dell\'opera "Riflessi Urbani" di Artista Famoso. Solo 50 copie disponibili.',
      image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
      cta: 'Riscatta Ora',
    },
    {
      title: 'Workshop di Scultura 3D con Artista Digitale',
      description: 'Un workshop intensivo di 2 giorni per imparare le tecniche avanzate di scultura digitale. Accesso riservato.',
      image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
      cta: 'Usa i tuoi Punti',
    },
];


export function MarketplaceSection() {
  return (
    <ScrollRevealWrapper id="marketplace">
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground">Marketplace</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
                    Guadagna punti partecipando alle attività della community e spendili per ottenere ricompense esclusive.
                </p>
            </div>

            {/* Sezione Ottieni Punti */}
            <div className="mt-20">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <Award className="h-10 w-10 text-primary" />
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Ottieni Punti</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {earnPointsItems.map((item, index) => (
                        <ScrollRevealWrapper key={item.title} className={`animation-delay-${index * 150}`}>
                            <Card className="overflow-hidden flex flex-col h-full bg-card/50 backdrop-blur-sm">
                                <div className="aspect-video overflow-hidden relative">
                                    {item.image && (
                                    <Image src={item.image.imageUrl} alt={item.description} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={item.image.imageHint} />
                                    )}
                                    <Badge className="absolute top-2 right-2 text-lg bg-primary text-primary-foreground shadow-lg">+{item.points} Punti</Badge>
                                </div>
                                <CardHeader>
                                    <Badge variant="secondary" className="w-fit mb-2">{item.category}</Badge>
                                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription className="text-base">{item.description}</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="link" className="text-primary p-0">
                                        <a href={item.link}>
                                        {item.cta}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </ScrollRevealWrapper>
                    ))}
                </div>
            </div>

            {/* Sezione Spendi Punti */}
            <div className="mt-24">
                 <div className="flex items-center justify-center gap-4 mb-12">
                    <ShoppingCart className="h-10 w-10 text-primary" />
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Spendi i Tuoi Punti</h3>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {spendPointsItems.map((item, index) => (
                    <ScrollRevealWrapper key={item.title} className={`animation-delay-${index * 150}`}>
                        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm flex flex-col h-full">
                        {item.image && (
                            <div className="aspect-video overflow-hidden">
                            <Image src={item.image.imageUrl} alt={item.description} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={item.image.imageHint} />
                            </div>
                        )}
                        <CardHeader className="flex-grow">
                            <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
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
        </div>
      </section>
    </ScrollRevealWrapper>
  );
}

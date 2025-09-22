import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const platformItems = [
  {
    title: 'Formazione',
    description: 'Accedi a workshop, masterclass e corsi tenuti da professionisti del settore creativo e tecnologico.',
    image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
    link: '/formazione',
  },
  {
    title: 'Eventi',
    description: 'Partecipa a mostre virtuali, talk, performance in diretta e festival digitali esclusivi.',
    image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
    link: '/eventi',
  },
  {
    title: 'Community',
    description: 'Connettiti, collabora e cresci insieme a una rete internazionale di artisti, curatori e innovatori.',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    link: '/community',
  },
];

export function PlatformSection() {
  return (
    <ScrollRevealWrapper id="piattaforma">
        <section className="min-h-screen flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground">Piattaforma</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
                        Un ecosistema integrato per far crescere la tua passione e le tue competenze.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {platformItems.map((item, index) => (
                    <ScrollRevealWrapper key={item.title} className={`animation-delay-${index * 150}`}>
                        <Card className="overflow-hidden transform transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                        {item.image && (
                            <div className="aspect-video overflow-hidden">
                            <Image src={item.image.imageUrl} alt={item.description} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={item.image.imageHint} />
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-primary">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                            <CardDescription className="text-base flex-grow mb-4">{item.description}</CardDescription>
                            <Button asChild variant="link" className="text-primary p-0 mt-auto self-start">
                            <Link href={item.link}>
                                Scopri di più
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            </Button>
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

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const newsItems = [
  {
    title: 'Nuova Call per Volontari',
    category: 'Volontariato',
    description: 'Stiamo cercando persone appassionate che vogliano contribuire alla crescita del Cantiere Culturale. Unisciti a noi e fai la differenza!',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    cta: 'Partecipa',
    link: '#',
    points: 150,
  },
  {
    title: 'Annuncio Workshop: "Creative Coding"',
    category: 'Workshop',
    description: 'Impara a creare arte con il codice nel nostro prossimo workshop intensivo. Prenota il tuo slot, i posti sono limitati!',
    image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
    cta: 'Prenota Ora',
    link: '#',
    points: 250,
  },
  {
    title: 'Articolo: Il Futuro dell\'Arte è Digitale?',
    category: 'Articolo',
    description: 'Un approfondimento del nostro curatore sul ruolo crescente della tecnologia nel mondo dell\'arte contemporanea. Leggi l\'articolo completo.',
    image: PlaceHolderImages.find(img => img.id === 'nft-placeholder'),
    cta: 'Leggi di più',
    link: '#',
  },
];

export function NewsSection() {
  return (
    <section id="news" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8">
      <ScrollRevealWrapper className="w-full max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">News & Annunci</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Rimani aggiornato sugli ultimi articoli, annunci, eventi e opportunità di volontariato.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.title} className="bg-card/50 backdrop-blur-lg border-white/10 overflow-hidden flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
              <div className="aspect-video overflow-hidden relative">
                {item.image && (
                  <Image src={item.image.imageUrl} alt={item.description} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={item.image.imageHint} />
                )}
                 <Badge variant="default" className="absolute top-2 left-2 bg-accent text-accent-foreground">{item.category}</Badge>
                 {item.points && (
                    <Badge variant="secondary" className="absolute top-2 right-2 bg-primary/80 text-primary-foreground backdrop-blur-sm">
                      <Star className="mr-1 h-3 w-3" /> {item.points} Punti
                    </Badge>
                  )}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-foreground/80 text-base">{item.description}</CardDescription>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="link" className="text-accent p-0">
                    <a href={item.link}>
                      {item.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollRevealWrapper>
    </section>
  );
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const platformItems = [
  {
    title: 'Formazione',
    description: 'Accedi a workshop, masterclass e corsi tenuti da professionisti del settore creativo e tecnologico.',
    image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
  },
  {
    title: 'Eventi',
    description: 'Partecipa a mostre virtuali, talk, performance in diretta e festival digitali esclusivi.',
    image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
  },
  {
    title: 'Community',
    description: 'Connettiti, collabora e cresci insieme a una rete internazionale di artisti, curatori e innovatori.',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
  },
];

export function PlatformSection() {
  return (
    <section id="piattaforma" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8 bg-black/20">
      <ScrollRevealWrapper className="w-full max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Piattaforma</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Un ecosistema integrato per far crescere la tua passione e le tue competenze.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {platformItems.map((item) => (
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

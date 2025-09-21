import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const platformItems = [
  {
    title: 'Formazione',
    description: 'Accedi a workshop, masterclass e corsi tenuti da professionisti del settore creativo e tecnologico.',
    image: {
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M42,75 C42,85 58,85 58,75 L58,70 L42,70 Z' fill='none' stroke='black' stroke-width='2'/%3E%3Cpath d='M50,70 L50,60' stroke='black' stroke-width='2'/%3E%3Cpath d='M45,60 L55,60' stroke='black' stroke-width='2'/%3E%3Cpath d='M35,60 C25,50 25,30 35,20 C45,10 55,10 65,20 C75,30 75,50 65,60' fill='none' stroke='black' stroke-width='2'/%3E%3Cpath d='M47,55 C42,50 42,40 47,35' stroke='black' stroke-width='1.5'/%3E%3Cpath d='M30,15 L20,5 M70,15 L80,5 M30,55 L20,65 M70,55 L80,65' stroke='black' stroke-width='2'/%3E%3C/svg%3E",
      description: 'Una lampadina stilizzata che rappresenta l\'idea e la formazione.',
      imageHint: 'doodle lightbulb'
    },
    link: '/formazione',
  },
  {
    title: 'Eventi',
    description: 'Partecipa a mostre virtuali, talk, performance in diretta e festival digitali esclusivi.',
    image: {
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50,90 L50,70' stroke='black' stroke-width='2'/%3E%3Cpath d='M50,70 L40,60 M50,70 L60,60 M50,70 L45,55 M50,70 L55,55 M50,70 L40,50 M50,70 L60,50' stroke='black' stroke-width='1.5'/%3E%3Cpath d='M20,50 L30,45 M25,40 L35,40 M20,30 L30,35' stroke='black' stroke-width='1.5'/%3E%3Cpath d='M80,50 L70,45 M75,40 L65,40 M80,30 L70,35' stroke='black' stroke-width='1.5'/%3E%3Cpath d='M45,20 L50,10 L55,20' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E",
      description: 'Scarabocchi di fuochi d\'artificio per rappresentare gli eventi.',
      imageHint: 'doodle fireworks'
    },
    link: '/eventi',
  },
  {
    title: 'Community',
    description: 'Connettiti, collabora e cresci insieme a una rete internazionale di artisti, curatori e innovatori.',
    image: {
       imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='30' cy='35' r='10' fill='none' stroke='black' stroke-width='2'/%3E%3Cpath d='M15,80 C20,60 40,60 45,80 Z' fill='none' stroke='black' stroke-width='2'/%3E%3Ccircle cx='70' cy='35' r='10' fill='none' stroke='black' stroke-width='2'/%3E%3Cpath d='M55,80 C60,60 80,60 85,80 Z' fill='none' stroke='black' stroke-width='2'/%3E%3Ccircle cx='50' cy='25' r='8' fill='none' stroke='black' stroke-width='2'/%3E%3Cpath d='M40,70 C42,50 58,50 60,70 Z' fill='none' stroke='black' stroke-width='2'/%3E%3C/svg%3E",
       description: 'Figure stilizzate di persone per rappresentare la community.',
       imageHint: 'doodle people'
    },
    link: '/community',
  },
];

export function PlatformSection() {
  return (
    <section id="piattaforma" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8">
      <ScrollRevealWrapper className="w-full max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Piattaforma</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Un ecosistema integrato per far crescere la tua passione e le tue competenze.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {platformItems.map((item) => (
            <Card key={item.title} className="bg-card/50 backdrop-blur-lg border-black/10 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
               {item.image && (
                <div className="aspect-video overflow-hidden p-8 bg-accent/20">
                  <Image src={item.image.imageUrl} alt={item.description} width={400} height={400} className="w-full h-full object-contain" data-ai-hint={item.image.imageHint} />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="text-foreground/80 text-base flex-grow mb-4">{item.description}</CardDescription>
                <Button asChild variant="link" className="text-primary p-0 mt-auto self-start">
                  <Link href={item.link}>
                    Scopri di più
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollRevealWrapper>
    </section>
  );
}

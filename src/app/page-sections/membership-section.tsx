import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';
import { Award, Gift, Star } from 'lucide-react';

const benefits = [
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: 'Guadagna Punti',
    description: 'Partecipa a workshop, eventi e call to action per accumulare punti e sbloccare ricompense uniche.',
  },
  {
    icon: <Gift className="h-8 w-8 text-primary" />,
    title: 'Accesso Esclusivo',
    description: 'Utilizza i tuoi punti per accedere a contenuti riservati, aree speciali del sito e prodotti esclusivi nel marketplace.',
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Status e Riconoscimenti',
    description: 'Più partecipi, più il tuo status nella community cresce, dandoti accesso a vantaggi sempre maggiori.',
  },
];


export function MembershipSection() {
  return (
    <ScrollRevealWrapper id="tessera">
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
       <div className="w-full max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground">La Tessera Digitale</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            La tessera è la tua chiave d'accesso a un mondo di vantaggi. Accumula punti partecipando attivamente alla vita del Cantiere Culturale e spendili per ottenere ricompense esclusive.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <ScrollRevealWrapper key={benefit.title} className={`animation-delay-${index * 150}`}>
                <Card className="text-center h-full bg-transparent border-0 shadow-none">
                <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {benefit.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/80">{benefit.description}</p>
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

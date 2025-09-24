'use client';
import { CollaborationForm } from './collaboration-form';
import { Handshake, Heart, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const collaborationTypes = [
    {
        icon: <Heart className="w-8 h-8 text-primary" />,
        title: 'Diventa Volontario',
        description: 'Unisciti al nostro team e contribuisci con il tuo tempo e le tue competenze alla crescita della community. Ogni aiuto è prezioso.',
    },
    {
        icon: <Handshake className="w-8 h-8 text-primary" />,
        title: 'Diventa Partner',
        description: 'Proponi workshop, corsi o eventi. Cerchiamo artisti, professionisti e istituzioni per arricchire la nostra offerta formativa e culturale.',
    },
    {
        icon: <Building className="w-8 h-8 text-primary" />,
        title: 'Diventa Sponsor',
        description: 'Sostieni il nostro progetto e associa il tuo brand a un\'iniziativa culturale innovativa. Scopri le opportunità di visibilità e i vantaggi esclusivi.',
    }
]

export default function CollaboraPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Collabora con Noi
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
            Il Cantiere Culturale cresce grazie alla forza della sua community. Scopri come puoi contribuire e diventare parte attiva del nostro progetto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {collaborationTypes.map(type => (
                <Card key={type.title} className="text-center">
                    <CardHeader className="items-center">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            {type.icon}
                        </div>
                        <CardTitle>{type.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{type.description}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Invia la tua Proposta</CardTitle>
                    <CardDescription>Compila il modulo qui sotto. Il nostro team ti risponderà il prima possibile.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CollaborationForm />
                </CardContent>
            </Card>
        </div>

      </main>
    </div>
  );
}

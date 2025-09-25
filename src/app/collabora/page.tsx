'use client';
import { useState } from 'react';
import { VolunteerForm } from './volunteer-form';
import { InterestForm } from './interest-form';
import { Handshake, Heart, Building, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LogoCarousel } from '@/components/logo-carousel';

type Selection = 'partner' | 'sponsor' | 'volunteer';

const selectionOptions: {
  id: Selection;
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    id: 'partner',
    icon: <Handshake className="w-10 h-10 text-primary" />,
    title: 'Diventa Partner',
    description: 'Proponi una partnership per co-progettare eventi, workshop e iniziative speciali.',
  },
  {
    id: 'sponsor',
    icon: <Building className="w-10 h-10 text-primary" />,
    title: 'Diventa Sponsor',
    description: 'Associa il tuo brand al Cantiere Culturale e investi nel futuro della creatività europea.',
  },
  {
    id: 'volunteer',
    icon: <Heart className="w-10 h-10 text-primary" />,
    title: 'Diventa Volontario',
    description: 'Metti in gioco il tuo tempo e le tue competenze per far crescere la nostra community.',
  },
];

export default function CollaboraPage() {
  const [selection, setSelection] = useState<Selection | null>(null);
  
  const renderSelectionContent = () => {
    switch (selection) {
      case 'partner':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Proponi una Partnership</CardTitle>
              <CardDescription>
                Sei un'istituzione, un'azienda o un collettivo? Collaboriamo per creare valore condiviso.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                <p>I nostri partner sono il motore dell'innovazione. Cerchiamo realtà con cui co-progettare eventi, workshop, contenuti e iniziative speciali.</p>
                <p>I pro di essere nostro partner:</p>
                <ul>
                  <li><strong>Visibilità Amplificata:</strong> Raggiungi una community di creativi, artisti e appassionati.</li>
                  <li><strong>Networking Strategico:</strong> Entra in contatto con talenti e altre istituzioni del settore.</li>
                  <li><strong>Spazio all'Innovazione:</strong> Sperimenta nuovi format e progetti in un contesto dinamico.</li>
                </ul>
              </div>
              <InterestForm type="partner" />
            </CardContent>
          </Card>
        );
      case 'sponsor':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sostieni il Progetto</CardTitle>
              <CardDescription>
                Associa il tuo brand a un'iniziativa culturale all'avanguardia.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                <p>Diventare sponsor del Cantiere Culturale significa investire nel futuro della creatività europea e posizionare il tuo brand come protagonista del cambiamento culturale e tecnologico.</p>
                <p>I pro di essere nostro sponsor:</p>
                <ul>
                  <li><strong>Brand Association:</strong> Lega il tuo nome a valori di innovazione, cultura e community.</li>
                  <li><strong>Opportunità di Marketing:</strong> Accedi a opzioni di visibilità personalizzate durante i nostri eventi e sulle nostre piattaforme.</li>
                  <li><strong>Impatto Sociale:</strong> Sostieni la crescita di talenti e la diffusione della cultura digitale.</li>
                </ul>
              </div>
              <InterestForm type="sponsor" />
            </CardContent>
          </Card>
        );
      case 'volunteer':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Unisciti al Team di Volontari</CardTitle>
              <CardDescription>
                Metti in gioco il tuo tempo e le tue competenze per far crescere la community.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                <p>I volontari sono il cuore pulsante del Cantiere. Cerchiamo persone entusiaste che vogliano aiutarci nell'organizzazione di eventi, nella comunicazione o nella gestione delle attività della community.</p>
                <p>I pro di essere nostro volontario:</p>
                <ul>
                  <li><strong>Formazione sul Campo:</strong> Acquisisci esperienza pratica nella gestione di progetti culturali.</li>
                  <li><strong>Accesso Esclusivo:</strong> Partecipa gratuitamente a molti dei nostri eventi e workshop.</li>
                  <li><strong>Community:</strong> Entra a far parte di un team appassionato e conosci persone con i tuoi stessi interessi.</li>
                </ul>
              </div>
              <VolunteerForm />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Collabora con Noi
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
            {selection 
              ? `Hai scelto di contribuire come ${selection}. Compila il modulo qui sotto.`
              : 'Il Cantiere Culturale cresce grazie alla forza della sua community. Scegli come vuoi contribuire e diventa parte attiva del nostro progetto.'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {selection ? (
            <div className="animate-in fade-in-50 duration-500">
               <Button variant="ghost" onClick={() => setSelection(null)} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Torna alla selezione
              </Button>
              {renderSelectionContent()}
            </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in-50 duration-500">
              {selectionOptions.map((option) => (
                <Card 
                  key={option.id}
                  onClick={() => setSelection(option.id)}
                  className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col"
                >
                  <CardHeader className="items-center">
                     <div className="p-4 bg-primary/10 rounded-full mb-4">
                       {option.icon}
                     </div>
                    <CardTitle className="text-2xl font-bold">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-foreground/80">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <section className="bg-muted/40 py-16 sm:py-24 mt-24">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
            I Nostri Partner
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/80 mb-12">
            Collaboriamo con istituzioni, aziende e realtà creative che condividono la nostra visione e supportano la nostra missione.
            </p>
            <div className="relative overflow-hidden group">
                <LogoCarousel />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-muted/40 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-muted/40 to-transparent"></div>
            </div>
        </div>
      </section>
    </div>
  );
}

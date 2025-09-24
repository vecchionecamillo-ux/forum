'use client';
import { VolunteerForm } from './volunteer-form';
import { InterestForm } from './interest-form';
import { Handshake, Heart, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

        <Tabs defaultValue="partner" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="partner">
                <Handshake className="w-4 h-4 mr-2"/> Diventa Partner
            </TabsTrigger>
            <TabsTrigger value="sponsor">
                <Building className="w-4 h-4 mr-2"/> Diventa Sponsor
            </TabsTrigger>
            <TabsTrigger value="volunteer">
                <Heart className="w-4 h-4 mr-2"/> Diventa Volontario
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="partner" className="mt-6">
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
          </TabsContent>

          <TabsContent value="sponsor" className="mt-6">
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
          </TabsContent>

           <TabsContent value="volunteer" className="mt-6">
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
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}

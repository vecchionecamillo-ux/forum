'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Code, Paintbrush, Landmark, BrainCircuit, FlaskConical, Lightbulb, Library } from 'lucide-react';
import { cn } from '@/lib/utils';


export type Resource = {
  name: string;
  description: string;
  examples: string[];
  link: string;
};

type ResourceCategory = {
  id: string;
  subCategory: string;
  resources: Resource[];
  mainCategory: MainCategory;
};

type MainCategory = 'Piattaforme Trasversali' | 'Informatica e Programmazione' | 'Arte e Design' | 'Economia e Finanza' | 'Scienze Umane' | 'Scienza e Matematica' | 'Sviluppo Personale e Professionale';

// In a real application, this data would come from a database (e.g., Firestore).
const allResources: ResourceCategory[] = [
    {
        mainCategory: 'Piattaforme Trasversali',
        id: 'transverse-coursera',
        subCategory: 'Piattaforme Trasversali',
        resources: [{
            name: 'Coursera',
            description: 'Piattaforma in partnership con università di prestigio e giganti del settore come Google e IBM. Molti corsi possono essere visionati gratuitamente, ma per ottenere un certificato professionale è spesso richiesto un pagamento.',
            examples: ['Corsi brevi (MOOC) e lauree online.', 'Certificati professionali in Data Science, AI e altro.', 'Corsi da Yale, Harvard, Università Bocconi.'],
            link: 'https://www.coursera.org',
        }]
    },
    {
        mainCategory: 'Piattaforme Trasversali',
        id: 'transverse-edx',
        subCategory: 'Piattaforme Trasversali',
        resources: [{
            name: 'edX',
            description: 'Co-fondata da Harvard e MIT, offre un\'offerta formativa di altissima qualità accademica. Ideale per chi cerca certificazioni riconosciute a livello internazionale.',
            examples: ['Corsi in matematica, scienze umane e tecnologia.', 'Programmi MicroMasters e lauree online.'],
            link: 'https://www.edx.org',
        }]
    },
    {
        mainCategory: 'Piattaforme Trasversali',
        id: 'transverse-udemy',
        subCategory: 'Piattaforme Trasversali',
        resources: [{
            name: 'Udemy',
            description: 'Piattaforma "creator-centric" con una vastissima diversità di argomenti, da competenze pratiche come fotografia e musica a corsi professionali.',
            examples: ['Corsi gratuiti e a pagamento su migliaia di argomenti.', 'Lezioni tenute da esperti di settore.'],
            link: 'https://www.udemy.com',
        }]
    },
    {
        mainCategory: 'Piattaforme Trasversali',
        id: 'transverse-khan',
        subCategory: 'Piattaforme Trasversali',
        resources: [{
            name: 'Khan Academy',
            description: 'Organizzazione no-profit con la missione di fornire un\'istruzione gratuita di primo livello. Eccellente per matematica e scienze, con percorsi personalizzati.',
            examples: ['Lezioni di matematica dall\'aritmetica di base al calcolo avanzato.', 'Corsi di scienze, economia e storia.'],
            link: 'https://www.khanacademy.org',
        }]
    },
    {
        mainCategory: 'Piattaforme Trasversali',
        id: 'transverse-google',
        subCategory: 'Piattaforme Trasversali',
        resources: [{
            name: 'Google Digital Garage',
            description: 'Hub formativo gratuito di Google per acquisire competenze nel mondo del web marketing. Include corsi completi su SEO, social media e pubblicità online.',
            examples: ['Certificazione sui principi del marketing digitale.', 'Corsi su Google Ads e Analytics.'],
            link: 'https://learndigital.withgoogle.com/digitalgarage',
        }]
    },
    {
        mainCategory: 'Informatica e Programmazione',
        id: 'it-web-dev',
        subCategory: 'Sviluppo Web (HTML, CSS, JavaScript)',
        resources: [
            { name: 'freeCodeCamp', description: 'Un punto di riferimento per il responsive web design. Offre un curriculum completo e gratuito di oltre 300 ore che copre HTML, CSS e JavaScript con un approccio basato su progetti e certificazioni.', examples: ['Responsive Web Design Certification', 'JavaScript Algorithms and Data Structures'], link: 'https://www.freecodecamp.org' },
            { name: 'The Odin Project', description: 'Un progetto open-source che cura i migliori tutorial per diventare sviluppatore full-stack (Ruby on Rails o JavaScript), con una forte community di supporto.', examples: ['Foundations Path', 'Full Stack JavaScript Path'], link: 'https://www.theodinproject.com' }
        ]
    },
    {
        mainCategory: 'Informatica e Programmazione',
        id: 'it-software-dev',
        subCategory: 'Sviluppo App e Software (Python, Java, C++)',
        resources: [
            { name: 'Codecademy', description: 'Si distingue per i suoi corsi interattivi, perfetti per i principianti assoluti. Guida l\'utente passo dopo passo alla scoperta di linguaggi come Python e JavaScript.', examples: ['Learn Python 3', 'Learn Java'], link: 'https://www.codecademy.com' },
            { name: 'ITLab360', description: 'Propone una selezione di corsi online gratuiti su librerie e framework moderni come React e Vue.js, nonché su linguaggi come SQL, PHP e Golang.', examples: ['Corso React', 'Corso Vue.js', 'Corso SQL'], link: 'https://www.itlab360.com' }
        ]
    },
    {
        mainCategory: 'Informatica e Programmazione',
        id: 'it-ai-cyber',
        subCategory: 'Data Science, Intelligenza Artificiale e Cyber Security',
        resources: [
            { name: 'Coursera', description: 'Offre certificati professionali con prova gratuita in settori di punta come il Google Data Analytics Professional Certificate, l\'IBM Data Science e il Generative AI Engineering.', examples: ['Google Data Analytics', 'IBM Data Science', 'Generative AI Engineering'], link: 'https://www.coursera.org' },
            { name: 'Dicolab (Ministero Cultura)', description: 'Corso online certificato e gratuito sulla Cyber Security, focalizzato sulla difesa delle organizzazioni culturali dagli attacchi informatici.', examples: ['Corso Cyber Security per la Cultura'], link: 'https://www.dicolab.cultura.gov.it' }
        ]
    },
    {
        mainCategory: 'Arte e Design',
        id: 'art-graphics',
        subCategory: 'Grafica e Design',
        resources: [
            { name: 'Canva Design School', description: 'Un eccellente punto di partenza per creare grafiche professionali. Offre un corso video gratuito che copre i principi base del design.', examples: ['Introduzione alla progettazione grafica'], link: 'https://www.canva.com/designschool/' },
            { name: 'ETAss Formazione', description: 'Corsi gratuiti di Grafica Digitale e Siti Web finanziati da enti come la Regione Lombardia, spesso con stage garantito e attestato riconosciuto.', examples: ['Grafica Digitale Adobe e Siti Web'], link: '#' }
        ]
    },
    {
        mainCategory: 'Arte e Design',
        id: 'art-drawing',
        subCategory: 'Disegno e Pittura',
        resources: [{ name: 'Cerchio di Giotto', description: 'Offre un\'ampia varietà di lezioni video gratuite su diverse tecniche, dalla pittura a olio all\'acquerello, dal disegno realistico al fumetto.', examples: ['Corso di disegno realistico', 'Corso di pittura a olio'], link: 'https://cerchiodigiotto.it' }]
    },
    {
        mainCategory: 'Arte e Design',
        id: 'art-photo',
        subCategory: 'Fotografia',
        resources: [{ name: 'Fotografinviaggio', description: 'Mette a disposizione un corso online gratuito con oltre 40 lezioni che coprono le regole di composizione, la gestione dell\'attrezzatura e le tecniche di post-produzione.', examples: ['Corso di Fotografia Base', 'Tutorial Lightroom'], link: 'https://www.fotografinviaggio.it' }]
    },
    {
        mainCategory: 'Arte e Design',
        id: 'art-animation',
        subCategory: 'Animazione',
        resources: [{ name: 'CFTA', description: 'Ente di formazione che offre un Corso Gratuito di Motion Graphics con After Effects in modalità di videoconferenza, coprendo le basi del software e le tecniche di animazione.', examples: ['Corso Motion Graphics con After Effects'], link: '#' },]
    },
    {
        mainCategory: 'Economia e Finanza',
        id: 'econ-personal',
        subCategory: 'Economia e Finanza Personale',
        resources: [
            { name: 'Politecnico di Milano (Finanza per tutti)', description: 'MOOC gratuito di tre settimane in collaborazione con Altroconsumo, che copre argomenti fondamentali per la gestione delle proprie finanze (conti correnti, azioni, mutui).', examples: ['MOOC "Finanza per tutti"'], link: 'https://www.pok.polimi.it/courses/course-v1:Polimi+Fin4all1+2019_M9/about' },
            { name: 'Intesa Sanpaolo (FAI META!)', description: 'Iniziativa di educazione finanziaria in collaborazione con il Museo del Risparmio, con appuntamenti online gratuiti su inflazione, investimenti e criptovalute.', examples: ['Serie di incontri "FAI META! Cura il tuo denaro"'], link: 'https://group.intesasanpaolo.com/it/sezione-editoriale/persone/fai-meta-cura-il-tuo-denaro' }
        ]
    },
    {
        mainCategory: 'Economia e Finanza',
        id: 'econ-marketing',
        subCategory: 'Marketing Digitale',
        resources: [{ name: 'Google Digital Garage', description: 'Piattaforma gratuita di Google che offre un master di digital marketing, coprendo SEO, web analytics (con focus su Google Analytics), social media e e-commerce.', examples: ['Concetti di base del marketing digitale'], link: 'https://learndigital.withgoogle.com/digitalgarage' },]
    },
    {
        mainCategory: 'Economia e Finanza',
        id: 'econ-management',
        subCategory: 'Business Management',
        resources: [{ name: 'Learnn', description: 'Piattaforma che offre un piano gratuito per accedere a una parte di ogni corso. Utile per imprenditori e professionisti, con corsi sulla validazione di un\'idea e la gestione finanziaria.', examples: ['Gestione aziendale e finanziaria'], link: 'https://learnn.com' }]
    },
    {
        mainCategory: 'Scienze Umane',
        id: 'human-history',
        subCategory: 'Storia e Filosofia',
        resources: [{ name: 'Rai Scuola', description: 'Portale Rai con una curata selezione di lezioni gratuite realizzate in collaborazione con il Ministero dell\'Istruzione, su argomenti come la Logica antica e la Filosofia della scienza.', examples: ['Lezioni di Filosofia', 'Approfondimenti di Storia'], link: 'https://www.raiscuola.rai.it' }]
    },
    {
        mainCategory: 'Scienze Umane',
        id: 'human-psychology',
        subCategory: 'Psicologia',
        resources: [{ name: 'Formazione Continua in Psicologia (FCP)', description: 'Per i professionisti del settore, FCP offre corsi gratuiti che permettono di ottenere crediti ECM (Educazione Continua in Medicina), su temi come il trattamento del trauma (EMDR).', examples: ['Corsi ECM gratuiti'], link: 'https://www.formazionecontinuainpsicologia.it' }]
    },
    {
        mainCategory: 'Scienze Umane',
        id: 'human-languages',
        subCategory: 'Lingue',
        resources: [
            { name: 'Duolingo', description: 'Piattaforma che ha rivoluzionato l\'apprendimento delle lingue con un approccio scientifico e basato sul gioco. Lezioni brevi ed efficaci disponibili su mobile.', examples: ['Impara inglese, spagnolo, francese e altre 30+ lingue.'], link: 'https://www.duolingo.com' },
            { name: 'HelloTalk', description: 'App di scambio linguistico che mette in contatto gli utenti con madrelingua da tutto il mondo, trasformando l\'apprendimento in un\'esperienza sociale e collaborativa.', examples: ['Chat, chiamate vocali e correzioni da madrelingua.'], link: 'https://www.hellotalk.com' }
        ]
    },
    {
        mainCategory: 'Scienza e Matematica',
        id: 'sci-math',
        subCategory: 'Matematica',
        resources: [
            { name: 'Khan Academy', description: 'Offre una formazione completa in matematica, dalla scuola materna al calcolo differenziale, con esercizi personalizzati e lezioni create da esperti.', examples: ['Algebra', 'Geometria', 'Calcolo differenziale'], link: 'https://www.khanacademy.org' },
            { name: 'Federica Web Learning', description: 'Piattaforma con MOOC di matematica e fisica offerti da università italiane, mirati a un pubblico di studenti universitari.', examples: ['Introduzione al calcolo delle probabilità', 'Fisica I con laboratorio'], link: 'https://www.federica.eu' }
        ]
    },
    {
        mainCategory: 'Scienza e Matematica',
        id: 'sci-bio',
        subCategory: 'Biologia e Chimica',
        resources: [{ name: 'Federica Web Learning', description: 'Offre una varietà di corsi in Chimica e biologia curati da atenei italiani, come Biologia di base e Scienze chimiche di base.', examples: ['Biologia di base', 'Idrogeno e nuovi combustibili'], link: 'https://www.federica.eu' }]
    },
    {
        mainCategory: 'Sviluppo Personale e Professionale',
        id: 'dev-public-speaking',
        subCategory: 'Public Speaking e Comunicazione',
        resources: [{ name: 'Lacerba.io', description: 'Offre un corso gratuito di Public Speaking che insegna le basi per comunicare in modo chiaro ed efficace, con rilascio di un certificato.', examples: ['Corso di Public Speaking'], link: 'https://lacerba.io' },]
    },
    {
        mainCategory: 'Sviluppo Personale e Professionale',
        id: 'dev-personal-growth',
        subCategory: 'Crescita Personale',
        resources: [{ name: 'Eureka! Form', description: 'Ente che offre un corso di Crescita Personale di 50 ore finanziato dalla Regione Lazio, focalizzato su autoconsapevolezza, gestione dello stress e mindfulness.', examples: ['Corso di Crescita Personale'], link: '#' }]
    }
];

const mainCategories: { name: MainCategory; icon: React.ElementType }[] = [
    { name: 'Piattaforme Trasversali', icon: Library },
    { name: 'Informatica e Programmazione', icon: Code },
    { name: 'Arte e Design', icon: Paintbrush },
    { name: 'Economia e Finanza', icon: Landmark },
    { name: 'Scienze Umane', icon: BrainCircuit },
    { name: 'Scienza e Matematica', icon: FlaskConical },
    { name: 'Sviluppo Personale e Professionale', icon: Lightbulb },
];

const groupedResources = mainCategories.map(cat => ({
    ...cat,
    subCategories: allResources
        .filter(r => r.mainCategory === cat.name)
        .reduce((acc, current) => {
            let sub = acc.find(s => s.name === current.subCategory);
            if (!sub) {
                sub = { name: current.subCategory, resources: [] };
                acc.push(sub);
            }
            sub.resources.push(...current.resources);
            return acc;
        }, [] as { name: string; resources: Resource[] }[])
}));


function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-300">
      <CardHeader>
        <CardTitle>{resource.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="mb-4">{resource.description}</CardDescription>
        <ul className="space-y-2 text-sm text-muted-foreground">
            {resource.examples.map((example, index) => (
                <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{example}</span>
                </li>
            ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="text-primary p-0">
          <Link href={resource.link} target="_blank" rel="noopener noreferrer">
            Visita la piattaforma
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ResourceCatalogue() {
  const [activeFilter, setActiveFilter] = useState<MainCategory | 'all'>('all');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
      return groupedResources;
    }
    return groupedResources.filter(cat => cat.name === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 p-4 rounded-lg bg-muted/50 border">
            <Button 
                variant={activeFilter === 'all' ? 'default' : 'ghost'}
                onClick={() => setActiveFilter('all')}
                className="transition-all"
            >
                Mostra Tutto
            </Button>
            {mainCategories.map(({name, icon: Icon}) => (
                 <Button 
                    key={name}
                    variant={activeFilter === name ? 'default' : 'ghost'}
                    onClick={() => setActiveFilter(name)}
                    className="flex items-center gap-2 transition-all"
                >
                    <Icon className="w-4 h-4"/>
                    <span className="hidden sm:inline">{name}</span>
                </Button>
            ))}
        </div>

        {/* Resources */}
        <div className="space-y-16">
            {filteredItems.map(category => (
                <section key={category.name}>
                    <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">{category.name}</h2>
                    {category.subCategories.map(subCategory => (
                        <div key={subCategory.name} className="mb-12">
                            {/* Hide subcategory title if it's the same as main category (for Piattaforme Trasversali) */}
                            {subCategory.name !== category.name && <h3 className="text-2xl font-semibold mb-6">{subCategory.name}</h3>}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {subCategory.resources.map(resource => <ResourceCard key={resource.name} resource={resource} />)}
                            </div>
                        </div>
                     ))}
                </section>
            ))}
            {filteredItems.length === 0 && (
                 <div className="text-center py-16 text-muted-foreground">
                    <p className="text-lg">Nessuna risorsa trovata.</p>
                </div>
            )}
        </div>
    </div>
  );
}

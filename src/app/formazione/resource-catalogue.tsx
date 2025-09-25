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
import { ArrowRight, CheckCircle, Code, Paintbrush, Landmark, BrainCircuit, FlaskConical, Lightbulb, Library, Layers, Zap, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { RadioGroup } from '../ui/radio-group';
import { FilterCard } from '../filter-card';


export type Resource = {
  name: string;
  description: string;
  examples: string[];
  link: string;
  duration?: 'Intensive' | 'Long-term';
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
        subCategory: 'Piattaforme MOOC',
        resources: [{
            name: 'Coursera',
            description: 'Piattaforma in partnership con università di prestigio e giganti del settore come Google e IBM. Molti corsi possono essere visionati gratuitamente, ma per ottenere un certificato professionale è spesso richiesto un pagamento.',
            examples: ['Corsi brevi (MOOC) e lauree online.', 'Certificati professionali in Data Science, AI e altro.', 'Corsi da Yale, Harvard, Università Bocconi.'],
            link: 'https://www.coursera.org',
            duration: 'Long-term',
        }]
    },
    {
        mainCategory: 'Piattaforme Trasversali',
        id: 'transverse-edx',
        subCategory: 'Piattaforme MOOC',
        resources: [{
            name: 'edX',
            description: 'Co-fondata da Harvard e MIT, offre un\'offerta formativa di altissima qualità accademica. Ideale per chi cerca certificazioni riconosciute a livello internazionale.',
            examples: ['Corsi in matematica, scienze umane e tecnologia.', 'Programmi MicroMasters e lauree online.'],
            link: 'https://www.edx.org',
             duration: 'Long-term',
        }]
    },
    {
        mainCategory: 'Piattaforme Trasversali',
        id: 'transverse-udemy',
        subCategory: 'Piattaforme "Creator-Centric"',
        resources: [{
            name: 'Udemy',
            description: 'Piattaforma con una vastissima diversità di argomenti, da competenze pratiche come fotografia e musica a corsi professionali. Spesso a pagamento ma con frequenti sconti.',
            examples: ['Corsi on-demand su migliaia di argomenti.', 'Lezioni tenute da esperti di settore.'],
            link: 'https://www.udemy.com',
            duration: 'Intensive',
        }]
    },
    {
        mainCategory: 'Piattaforme Trasversali',
        id: 'transverse-khan',
        subCategory: 'Istruzione Gratuita',
        resources: [{
            name: 'Khan Academy',
            description: 'Organizzazione no-profit con la missione di fornire un\'istruzione gratuita di primo livello. Eccellente per matematica e scienze, con percorsi personalizzati.',
            examples: ['Lezioni di matematica dall\'aritmetica di base al calcolo avanzato.', 'Corsi di scienze, economia e storia.'],
            link: 'https://www.khanacademy.org',
            duration: 'Long-term',
        }]
    },
    {
        mainCategory: 'Piattaforme Trasversali',
        id: 'transverse-google',
        subCategory: 'Competenze Digitali',
        resources: [{
            name: 'Google Digital Garage',
            description: 'Hub formativo gratuito di Google per acquisire competenze nel mondo del web marketing. Include corsi completi su SEO, social media e pubblicità online.',
            examples: ['Certificazione sui principi del marketing digitale.', 'Corsi su Google Ads e Analytics.'],
            link: 'https://learndigital.withgoogle.com/digitalgarage',
            duration: 'Intensive',
        }]
    },
    {
        mainCategory: 'Informatica e Programmazione',
        id: 'it-web-dev',
        subCategory: 'Sviluppo Web (HTML, CSS, JavaScript)',
        resources: [
            { name: 'freeCodeCamp', description: 'Un punto di riferimento per il responsive web design. Offre un curriculum completo e gratuito di oltre 300 ore che copre HTML, CSS e JavaScript con un approccio basato su progetti e certificazioni.', examples: ['Responsive Web Design Certification', 'JavaScript Algorithms and Data Structures'], link: 'https://www.freecodecamp.org', duration: 'Long-term' },
            { name: 'The Odin Project', description: 'Un progetto open-source che cura i migliori tutorial per diventare sviluppatore full-stack (Ruby on Rails o JavaScript), con una forte community di supporto.', examples: ['Foundations Path', 'Full Stack JavaScript Path'], link: 'https://www.theodinproject.com', duration: 'Long-term' }
        ]
    },
    {
        mainCategory: 'Informatica e Programmazione',
        id: 'it-software-dev',
        subCategory: 'Sviluppo App e Software (Python, Java, C++)',
        resources: [
            { name: 'Codecademy', description: 'Si distingue per i suoi corsi interattivi, perfetti per i principianti assoluti. Guida l\'utente passo dopo passo alla scoperta di linguaggi come Python e JavaScript.', examples: ['Learn Python 3', 'Learn Java'], link: 'https://www.codecademy.com', duration: 'Intensive' },
            { name: 'ITLab360', description: 'Propone una selezione di corsi online gratuiti su librerie e framework moderni come React e Vue.js, nonché su linguaggi come SQL, PHP e Golang.', examples: ['Corso React', 'Corso Vue.js', 'Corso SQL'], link: 'https://www.itlab360.com', duration: 'Intensive' }
        ]
    },
    {
        mainCategory: 'Informatica e Programmazione',
        id: 'it-ai-cyber',
        subCategory: 'Data Science, Intelligenza Artificiale e Cyber Security',
        resources: [
            { name: 'Coursera', description: 'Offre certificati professionali con prova gratuita in settori di punta come il Google Data Analytics Professional Certificate, l\'IBM Data Science e il Generative AI Engineering.', examples: ['Google Data Analytics', 'IBM Data Science', 'Generative AI Engineering'], link: 'https://www.coursera.org', duration: 'Long-term' },
            { name: 'Dicolab (Ministero Cultura)', description: 'Corso online certificato e gratuito sulla Cyber Security, focalizzato sulla difesa delle organizzazioni culturali dagli attacchi informatici.', examples: ['Corso Cyber Security per la Cultura'], link: 'https://www.dicolab.cultura.gov.it', duration: 'Intensive' }
        ]
    },
    {
        mainCategory: 'Arte e Design',
        id: 'art-graphics',
        subCategory: 'Grafica e Design',
        resources: [
            { name: 'Canva Design School', description: 'Un eccellente punto di partenza per creare grafiche professionali. Offre un corso video gratuito che copre i principi base del design.', examples: ['Introduzione alla progettazione grafica'], link: 'https://www.canva.com/designschool/', duration: 'Intensive' },
            { name: 'ETAss Formazione', description: 'Corsi gratuiti di Grafica Digitale e Siti Web finanziati da enti come la Regione Lombardia, spesso con stage garantito e attestato riconosciuto.', examples: ['Grafica Digitale Adobe e Siti Web'], link: '#', duration: 'Long-term' }
        ]
    },
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
        {resource.duration && (
          <div className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
             <Clock className="w-3 h-3" /> {resource.duration === 'Intensive' ? 'Intensivo' : 'Lungo Termine'}
          </div>
        )}
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
  const [activeCategory, setActiveCategory] = useState<MainCategory | 'all'>('all');
  const [durationFilter, setDurationFilter] = useState<'all' | 'Intensive' | 'Long-term'>('all');

  const filteredItems = useMemo(() => {
    let categoriesToDisplay = groupedResources;
    if (activeCategory !== 'all') {
      categoriesToDisplay = groupedResources.filter(cat => cat.name === activeCategory);
    }
    
    // Then, filter resources within those categories by duration
    return categoriesToDisplay.map(category => ({
        ...category,
        subCategories: category.subCategories.map(subCategory => ({
            ...subCategory,
            resources: subCategory.resources.filter(resource => 
                durationFilter === 'all' || resource.duration === durationFilter
            )
        })).filter(subCategory => subCategory.resources.length > 0) // Remove subcategories with no matching resources
    })).filter(category => category.subCategories.length > 0); // Remove main categories with no matching resources

  }, [activeCategory, durationFilter]);

  return (
    <div className="space-y-12">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SlidersHorizontal /> Filtra Risorse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Filter by Main Category */}
                <div>
                     <h4 className="font-semibold text-lg mb-4 text-center md:text-left">Materie Principali</h4>
                    <RadioGroup value={activeCategory} onValueChange={(val) => setActiveCategory(val as any)} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                        <FilterCard value="all" label="Tutte" icon={Layers} selectedValue={activeCategory} onSelect={(val) => setActiveCategory(val as any)} />
                        {mainCategories.map(({name, icon: Icon}) => (
                             <FilterCard 
                                key={name}
                                value={name} 
                                label={name} 
                                icon={Icon} 
                                selectedValue={activeCategory} 
                                onSelect={(val) => setActiveCategory(val as any)}
                             />
                        ))}
                    </RadioGroup>
                </div>
                {/* Filter by Duration */}
                <div>
                    <h4 className="font-semibold text-lg mb-4 text-center md:text-left">Durata</h4>
                     <RadioGroup value={durationFilter} onValueChange={(value) => setDurationFilter(value as any)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FilterCard value="all" label="Tutte" icon={Clock} selectedValue={durationFilter} onSelect={setDurationFilter} />
                        <FilterCard value="Intensive" label="Intensivi" icon={Zap} selectedValue={durationFilter} onSelect={setDurationFilter} />
                        <FilterCard value="Long-term" label="Lungo Termine" icon={Layers} selectedValue={durationFilter} onSelect={setDurationFilter} />
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>

        {/* Resources */}
        <div className="space-y-16">
            {filteredItems.map(category => (
                <section key={category.name}>
                    <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">{category.name}</h2>
                    {category.subCategories.map(subCategory => (
                        <div key={subCategory.name} className="mb-12">
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
                    <p className="text-lg">Nessuna risorsa trovata con i filtri selezionati.</p>
                </div>
            )}
        </div>
    </div>
  );
}

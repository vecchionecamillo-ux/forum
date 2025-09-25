
'use client';

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
import { ArrowRight, CheckCircle } from 'lucide-react';

export type Resource = {
  name: string;
  description: string;
  examples: string[];
  link: string;
};

const transversePlatforms: Resource[] = [
    {
        name: 'Coursera',
        description: 'Piattaforma in partnership con università di prestigio e giganti del settore come Google e IBM. Molti corsi possono essere visionati gratuitamente, ma per ottenere un certificato professionale è spesso richiesto un pagamento.',
        examples: [
            'Corsi brevi (MOOC) e lauree online.',
            'Certificati professionali in Data Science, AI e altro.',
            'Corsi da Yale, Harvard, Università Bocconi.'
        ],
        link: 'https://www.coursera.org',
    },
    {
        name: 'edX',
        description: 'Co-fondata da Harvard e MIT, offre un\'offerta formativa di altissima qualità accademica. Ideale per chi cerca certificazioni riconosciute a livello internazionale.',
        examples: [
            'Corsi in matematica, scienze umane e tecnologia.',
            'Programmi MicroMasters e lauree online.',
        ],
        link: 'https://www.edx.org',
    },
    {
        name: 'Udemy',
        description: 'Piattaforma "creator-centric" con una vastissima diversità di argomenti, da competenze pratiche come fotografia e musica a corsi professionali.',
        examples: [
            'Corsi gratuiti e a pagamento su migliaia di argomenti.',
            'Lezioni tenute da esperti di settore.',
        ],
        link: 'https://www.udemy.com',
    },
    {
        name: 'Khan Academy',
        description: 'Organizzazione no-profit con la missione di fornire un\'istruzione gratuita di primo livello. Eccellente per matematica e scienze, con percorsi personalizzati.',
        examples: [
            'Lezioni di matematica dall\'aritmetica di base al calcolo avanzato.',
            'Corsi di scienze, economia e storia.',
        ],
        link: 'https://www.khanacademy.org',
    },
    {
        name: 'Google Digital Garage',
        description: 'Hub formativo gratuito di Google per acquisire competenze nel mondo del web marketing. Include corsi completi su SEO, social media e pubblicità online.',
        examples: [
            'Certificazione sui principi del marketing digitale.',
            'Corsi su Google Ads e Analytics.',
        ],
        link: 'https://learndigital.withgoogle.com/digitalgarage',
    },
];

const itAndProgrammingResources: { subCategory: string; resources: Resource[] }[] = [
    {
        subCategory: 'Sviluppo Web (HTML, CSS, JavaScript)',
        resources: [
            {
                name: 'freeCodeCamp',
                description: 'Un punto di riferimento per il responsive web design. Offre un curriculum completo e gratuito di oltre 300 ore che copre HTML, CSS e JavaScript con un approccio basato su progetti e certificazioni.',
                examples: ['Responsive Web Design Certification', 'JavaScript Algorithms and Data Structures'],
                link: 'https://www.freecodecamp.org'
            },
            {
                name: 'The Odin Project',
                description: 'Un progetto open-source che cura i migliori tutorial per diventare sviluppatore full-stack (Ruby on Rails o JavaScript), con una forte community di supporto.',
                examples: ['Foundations Path', 'Full Stack JavaScript Path'],
                link: 'https://www.theodinproject.com'
            }
        ]
    },
    {
        subCategory: 'Sviluppo App e Software (Python, Java, C++)',
        resources: [
            {
                name: 'Codecademy',
                description: 'Si distingue per i suoi corsi interattivi, perfetti per i principianti assoluti. Guida l\'utente passo dopo passo alla scoperta di linguaggi come Python e JavaScript.',
                examples: ['Learn Python 3', 'Learn Java'],
                link: 'https://www.codecademy.com'
            },
            {
                name: 'ITLab360',
                description: 'Propone una selezione di corsi online gratuiti su librerie e framework moderni come React e Vue.js, nonché su linguaggi come SQL, PHP e Golang.',
                examples: ['Corso React', 'Corso Vue.js', 'Corso SQL'],
                link: 'https://www.itlab360.com'
            }
        ]
    },
    {
        subCategory: 'Data Science, Intelligenza Artificiale e Cyber Security',
        resources: [
            {
                name: 'Coursera',
                description: 'Offre certificati professionali con prova gratuita in settori di punta come il Google Data Analytics Professional Certificate, l\'IBM Data Science e il Generative AI Engineering.',
                examples: ['Google Data Analytics', 'IBM Data Science', 'Generative AI Engineering'],
                link: 'https://www.coursera.org'
            },
            {
                name: 'Dicolab (Ministero Cultura)',
                description: 'Corso online certificato e gratuito sulla Cyber Security, focalizzato sulla difesa delle organizzazioni culturali dagli attacchi informatici.',
                examples: ['Corso Cyber Security per la Cultura'],
                link: 'https://www.dicolab.cultura.gov.it'
            }
        ]
    }
];

const artAndDesignResources: { subCategory: string; resources: Resource[] }[] = [
    {
        subCategory: 'Grafica e Design',
        resources: [
            {
                name: 'Canva Design School',
                description: 'Un eccellente punto di partenza per creare grafiche professionali. Offre un corso video gratuito che copre i principi base del design.',
                examples: ['Introduzione alla progettazione grafica'],
                link: 'https://www.canva.com/designschool/'
            },
            {
                name: 'ETAss Formazione',
                description: 'Corsi gratuiti di Grafica Digitale e Siti Web finanziati da enti come la Regione Lombardia, spesso con stage garantito e attestato riconosciuto.',
                examples: ['Grafica Digitale Adobe e Siti Web'],
                link: '#'
            }
        ]
    },
    {
        subCategory: 'Disegno e Pittura',
        resources: [
            {
                name: 'Cerchio di Giotto',
                description: 'Offre un\'ampia varietà di lezioni video gratuite su diverse tecniche, dalla pittura a olio all\'acquerello, dal disegno realistico al fumetto.',
                examples: ['Corso di disegno realistico', 'Corso di pittura a olio'],
                link: 'https://cerchiodigiotto.it'
            }
        ]
    },
    {
        subCategory: 'Fotografia',
        resources: [
            {
                name: 'Fotografinviaggio',
                description: 'Mette a disposizione un corso online gratuito con oltre 40 lezioni che coprono le regole di composizione, la gestione dell\'attrezzatura e le tecniche di post-produzione.',
                examples: ['Corso di Fotografia Base', 'Tutorial Lightroom'],
                link: 'https://www.fotografinviaggio.it'
            }
        ]
    },
    {
        subCategory: 'Animazione',
        resources: [
            {
                name: 'CFTA',
                description: 'Ente di formazione che offre un Corso Gratuito di Motion Graphics con After Effects in modalità di videoconferenza, coprendo le basi del software e le tecniche di animazione.',
                examples: ['Corso Motion Graphics con After Effects'],
                link: '#'
            },
        ]
    }
];

const economyAndFinanceResources: { subCategory: string; resources: Resource[] }[] = [
    {
        subCategory: 'Economia e Finanza Personale',
        resources: [
            {
                name: 'Politecnico di Milano (Finanza per tutti)',
                description: 'MOOC gratuito di tre settimane in collaborazione con Altroconsumo, che copre argomenti fondamentali per la gestione delle proprie finanze (conti correnti, azioni, mutui).',
                examples: ['MOOC "Finanza per tutti"'],
                link: 'https://www.pok.polimi.it/courses/course-v1:Polimi+Fin4all1+2019_M9/about'
            },
            {
                name: 'Intesa Sanpaolo (FAI META!)',
                description: 'Iniziativa di educazione finanziaria in collaborazione con il Museo del Risparmio, con appuntamenti online gratuiti su inflazione, investimenti e criptovalute.',
                examples: ['Serie di incontri "FAI META! Cura il tuo denaro"'],
                link: 'https://group.intesasanpaolo.com/it/sezione-editoriale/persone/fai-meta-cura-il-tuo-denaro'
            }
        ]
    },
    {
        subCategory: 'Marketing Digitale',
        resources: [
            {
                name: 'Google Digital Garage',
                description: 'Piattaforma gratuita di Google che offre un master di digital marketing, coprendo SEO, web analytics (con focus su Google Analytics), social media e e-commerce.',
                examples: ['Concetti di base del marketing digitale'],
                link: 'https://learndigital.withgoogle.com/digitalgarage'
            },
        ]
    },
    {
        subCategory: 'Business Management',
        resources: [
            {
                name: 'Learnn',
                description: 'Piattaforma che offre un piano gratuito per accedere a una parte di ogni corso. Utile per imprenditori e professionisti, con corsi sulla validazione di un\'idea e la gestione finanziaria.',
                examples: ['Gestione aziendale e finanziaria'],
                link: 'https://learnn.com'
            }
        ]
    }
];

const humanSciencesResources: { subCategory: string; resources: Resource[] }[] = [
    {
        subCategory: 'Storia e Filosofia',
        resources: [
            {
                name: 'Rai Scuola',
                description: 'Portale Rai con una curata selezione di lezioni gratuite realizzate in collaborazione con il Ministero dell\'Istruzione, su argomenti come la Logica antica e la Filosofia della scienza.',
                examples: ['Lezioni di Filosofia', 'Approfondimenti di Storia'],
                link: 'https://www.raiscuola.rai.it'
            }
        ]
    },
    {
        subCategory: 'Psicologia',
        resources: [
            {
                name: 'Formazione Continua in Psicologia (FCP)',
                description: 'Per i professionisti del settore, FCP offre corsi gratuiti che permettono di ottenere crediti ECM (Educazione Continua in Medicina), su temi come il trattamento del trauma (EMDR).',
                examples: ['Corsi ECM gratuiti'],
                link: 'https://www.formazionecontinuainpsicologia.it'
            }
        ]
    },
    {
        subCategory: 'Lingue',
        resources: [
            {
                name: 'Duolingo',
                description: 'Piattaforma che ha rivoluzionato l\'apprendimento delle lingue con un approccio scientifico e basato sul gioco. Lezioni brevi ed efficaci disponibili su mobile.',
                examples: ['Impara inglese, spagnolo, francese e altre 30+ lingue.'],
                link: 'https://www.duolingo.com'
            },
            {
                name: 'HelloTalk',
                description: 'App di scambio linguistico che mette in contatto gli utenti con madrelingua da tutto il mondo, trasformando l\'apprendimento in un\'esperienza sociale e collaborativa.',
                examples: ['Chat, chiamate vocali e correzioni da madrelingua.'],
                link: 'https://www.hellotalk.com'
            }
        ]
    }
];

const scienceAndMathResources: { subCategory: string; resources: Resource[] }[] = [
    {
        subCategory: 'Matematica',
        resources: [
            {
                name: 'Khan Academy',
                description: 'Offre una formazione completa in matematica, dalla scuola materna al calcolo differenziale, con esercizi personalizzati e lezioni create da esperti.',
                examples: ['Algebra', 'Geometria', 'Calcolo differenziale'],
                link: 'https://www.khanacademy.org'
            },
            {
                name: 'Federica Web Learning',
                description: 'Piattaforma con MOOC di matematica e fisica offerti da università italiane, mirati a un pubblico di studenti universitari.',
                examples: ['Introduzione al calcolo delle probabilità', 'Fisica I con laboratorio'],
                link: 'https://www.federica.eu'
            }
        ]
    },
    {
        subCategory: 'Biologia e Chimica',
        resources: [
            {
                name: 'Federica Web Learning',
                description: 'Offre una varietà di corsi in Chimica e biologia curati da atenei italiani, come Biologia di base e Scienze chimiche di base.',
                examples: ['Biologia di base', 'Idrogeno e nuovi combustibili'],
                link: 'https://www.federica.eu'
            }
        ]
    }
];

const personalDevelopmentResources: { subCategory: string; resources: Resource[] }[] = [
    {
        subCategory: 'Public Speaking e Comunicazione',
        resources: [
            {
                name: 'Lacerba.io',
                description: 'Offre un corso gratuito di Public Speaking che insegna le basi per comunicare in modo chiaro ed efficace, con rilascio di un certificato.',
                examples: ['Corso di Public Speaking'],
                link: 'https://lacerba.io'
            },
        ]
    },
    {
        subCategory: 'Crescita Personale',
        resources: [
            {
                name: 'Eureka! Form',
                description: 'Ente che offre un corso di Crescita Personale di 50 ore finanziato dalla Regione Lazio, focalizzato su autoconsapevolezza, gestione dello stress e mindfulness.',
                examples: ['Corso di Crescita Personale'],
                link: '#'
            }
        ]
    }
];

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-300">
      <CardHeader>
        <CardTitle>{resource.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="mb-4">{resource.description}</CardDescription>
        <ul className="space-y-2 text-sm text-muted-foreground">
            {resource.examples.map((example) => (
                <li key={example} className="flex items-start gap-2">
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
  return (
    <div className="space-y-16">
        {/* Piattaforme Trasversali */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Piattaforme E-Learning Trasversali</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transversePlatforms.map(resource => <ResourceCard key={resource.name} resource={resource} />)}
          </div>
        </section>

        {/* Informatica e Programmazione */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center border-t pt-12">Informatica e Programmazione</h2>
          {itAndProgrammingResources.map(category => (
            <div key={category.subCategory} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">{category.subCategory}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.resources.map(resource => <ResourceCard key={resource.name} resource={resource} />)}
              </div>
            </div>
          ))}
        </section>
        
        {/* Arte e Design */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center border-t pt-12">Arte e Design</h2>
          {artAndDesignResources.map(category => (
            <div key={category.subCategory} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">{category.subCategory}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.resources.map(resource => <ResourceCard key={resource.name} resource={resource} />)}
              </div>
            </div>
          ))}
        </section>

        {/* Economia e Finanza */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center border-t pt-12">Economia e Finanza</h2>
          {economyAndFinanceResources.map(category => (
            <div key={category.subCategory} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">{category.subCategory}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.resources.map(resource => <ResourceCard key={resource.name} resource={resource} />)}
              </div>
            </div>
          ))}
        </section>
        
        {/* Scienze Umane */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center border-t pt-12">Scienze Umane</h2>
          {humanSciencesResources.map(category => (
            <div key={category.subCategory} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">{category.subCategory}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.resources.map(resource => <ResourceCard key={resource.name} resource={resource} />)}
              </div>
            </div>
          ))}
        </section>

        {/* Scienza e Matematica */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center border-t pt-12">Scienza e Matematica</h2>
          {scienceAndMathResources.map(category => (
            <div key={category.subCategory} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">{category.subCategory}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.resources.map(resource => <ResourceCard key={resource.name} resource={resource} />)}
              </div>
            </div>
          ))}
        </section>
        
        {/* Sviluppo Personale e Professionale */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center border-t pt-12">Sviluppo Personale e Professionale</h2>
          {personalDevelopmentResources.map(category => (
            <div key={category.subCategory} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">{category.subCategory}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.resources.map(resource => <ResourceCard key={resource.name} resource={resource} />)}
              </div>
            </div>
          ))}
        </section>
    </div>
  );
}


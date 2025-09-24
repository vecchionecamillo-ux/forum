import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

export type Activity = {
  title: string;
  slug: string;
  category: string;
  description: string;
  image?: ImagePlaceholder;
  cta: string;
  link?: string;
  points?: number;
  date?: string;
  time?: string;
  duration?: string;
  type: 'earn' | 'spend';
};

const earnPointsItems: Omit<Activity, 'type'>[] = [
  {
    title: 'Nuova Call per Volontari',
    slug: 'call-volontari',
    category: 'Opportunità',
    description: 'Stiamo cercando persone appassionate che vogliano contribuire alla crescita del Cantiere Culturale. Unisciti a noi e fai la differenza!',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    cta: 'Partecipa',
    link: '/news/call-volontari',
    points: 150,
    date: '30 Settembre 2024',
    time: 'Tutto il giorno',
    duration: 'Continuativo'
  },
  {
    title: 'Annuncio Workshop: "Creative Coding"',
    slug: 'workshop-creative-coding',
    category: 'Formazione',
    description: 'Impara a creare arte con il codice nel nostro prossimo workshop intensivo. Prenota il tuo slot, i posti sono limitati!',
    image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
    cta: 'Prenota Ora',
    link: '/news/workshop-creative-coding',
    points: 75,
    date: '15 Ottobre 2024',
    time: '18:00 - 20:00',
    duration: '2 ore'
  },
  {
    title: 'Articolo: Il Futuro dell\'Arte è Digitale?',
    slug: 'articolo-futuro-arte',
    category: 'Approfondimento',
    description: 'Un approfondimento del nostro curatore sul ruolo crescente della tecnologia nel mondo dell\'arte contemporanea. Leggi l\'articolo completo.',
    image: PlaceHolderImages.find(img => img.id === 'nft-placeholder'),
    cta: 'Leggi di più',
    link: '/news/articolo-futuro-arte',
    points: 10,
    date: '20 Settembre 2024',
    time: 'N/A',
    duration: '5 min di lettura'
  },
];

const spendPointsItems: Omit<Activity, 'type'>[] = [
    {
      title: 'Accesso Esclusivo: Opening Mostra "Visioni Digitali"',
      slug: 'opening-visioni-digitali',
      description: 'Assicurati il tuo posto per la serata inaugurale della nostra nuova mostra. Posti limitati.',
      image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
      cta: 'Usa i tuoi Punti',
      category: 'Eventi',
      points: 250,
      link: '#'
    },
    {
      title: 'Stampa Fine Art in Edizione Limitata',
      slug: 'stampa-riflessi-urbani',
      description: 'Una stampa esclusiva dell\'opera "Riflessi Urbani" di Artista Famoso. Solo 50 copie disponibili.',
      image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
      cta: 'Riscatta Ora',
      category: 'Arte',
      points: 500,
      link: '#'
    },
    {
      title: 'Workshop di Scultura 3D con Artista Digitale',
      slug: 'workshop-scultura-3d',
      description: 'Un workshop intensivo di 2 giorni per imparare le tecniche avanzate di scultura digitale. Accesso riservato.',
      image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
      cta: 'Usa i tuoi Punti',
      category: 'Formazione',
      points: 800,
      link: '#'
    },
];


export const allActivities: Activity[] = [
    ...earnPointsItems.map(item => ({...item, type: 'earn' as const})), 
    ...spendPointsItems.map(item => ({...item, type: 'spend' as const}))
];

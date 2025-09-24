import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

export type Activity = {
  title: string;
  slug: string;
  category: 'Formazione' | 'Eventi' | 'Community' | 'Approfondimento' | 'Opportunità' | 'Arte';
  description: string;
  image?: ImagePlaceholder;
  cta: string;
  link?: string;
  points?: number;
  date?: string; // Formato YYYY-MM-DD per facilitare l'ordinamento e il parsing
  time?: string;
  duration?: string;
  type: 'earn' | 'spend';
};

const earnPointsItems: Omit<Activity, 'type'>[] = [
  // FORMAZIONE
  {
    title: 'Laboratorio di Fotografia',
    slug: 'lab-fotografia',
    category: 'Formazione',
    description: 'Un laboratorio permanente per imparare le basi della fotografia, dalla composizione alla post-produzione. Adatto a tutti i livelli.',
    image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
    cta: 'Scopri di più',
    link: '/news/lab-fotografia',
    points: 80,
    duration: 'Permanente'
  },
  {
    title: 'Laboratorio Giovani Idee',
    slug: 'lab-giovani-idee',
    category: 'Formazione',
    description: 'Uno spazio creativo per giovani menti. Trasforma le tue idee in progetti concreti con il supporto di mentor esperti.',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    cta: 'Partecipa',
    link: '/news/lab-giovani-idee',
    points: 80,
    duration: 'Permanente'
  },
  {
    title: 'Laboratorio di Pittura',
    slug: 'lab-pittura',
    category: 'Formazione',
    description: 'Esplora la tua creatività con tele e pennelli. Un corso continuo per affinare la tua tecnica pittorica.',
    image: PlaceHolderImages.find(img => img.id === 'art-gallery-placeholder'),
    cta: 'Iscriviti',
    link: '/news/lab-pittura',
    points: 80,
    duration: 'Permanente'
  },
   // EVENTI
  {
    title: 'Plastic Free: Pulizia del Parco',
    slug: 'plastic-free-parco',
    category: 'Opportunità',
    description: 'Unisciti a noi per un\'attività di volontariato ambientale. Raccoglieremo la plastica e puliremo il parco cittadino. Un piccolo gesto per un grande impatto.',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    cta: 'Partecipa',
    link: '/news/plastic-free-parco',
    points: 120,
    date: '2024-10-02',
    time: '09:00 - 13:00',
    duration: '4 ore'
  },
  // COMMUNITY
  {
    title: 'Incontro con la Psicologa: "Stare Insieme"',
    slug: 'incontro-psicologa-stare-insieme',
    category: 'Community',
    description: 'Un incontro di gruppo per esplorare le dinamiche relazionali e il benessere psicologico in un ambiente sicuro e accogliente.',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    cta: 'Partecipa all\'incontro',
    link: '/news/incontro-psicologa-stare-insieme',
    points: 50,
    date: '2024-10-12',
    time: '18:00',
    duration: '1.5 ore'
  },
  {
    title: 'Cineforum & Lab Pittura',
    slug: 'cineforum-lab-pittura',
    category: 'Community',
    description: 'Una serata che unisce cinema e arte. In collaborazione con Cinemateque, un film d\'autore ispira un laboratorio di pittura a tema. Un evento per la community.',
    image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
    cta: 'Prenota il tuo posto',
    link: '/news/cineforum-lab-pittura',
    points: 100,
    date: '2024-10-05',
    time: '20:00',
    duration: '3 ore'
  },
  // VECCHI EVENTI
  {
    title: 'Nuova Call per Volontari',
    slug: 'call-volontari',
    category: 'Opportunità',
    description: 'Stiamo cercando persone appassionate che vogliano contribuire alla crescita del Cantiere Culturale. Unisciti a noi e fai la differenza!',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    cta: 'Partecipa',
    link: '/news/call-volontari',
    points: 150,
    date: '2024-09-30',
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
    date: '2024-10-15',
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
    date: '2024-09-20',
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
      link: '/news/opening-visioni-digitali',
      date: '2024-11-10',
    },
    {
      title: 'Stampa Fine Art in Edizione Limitata',
      slug: 'stampa-riflessi-urbani',
      description: 'Una stampa esclusiva dell\'opera "Riflessi Urbani" di Artista Famoso. Solo 50 copie disponibili.',
      image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
      cta: 'Riscatta Ora',
      category: 'Arte',
      points: 500,
      link: '/news/stampa-riflessi-urbani',
    },
    {
      title: 'Workshop di Scultura 3D con Artista Digitale',
      slug: 'workshop-scultura-3d',
      description: 'Un workshop intensivo di 2 giorni per imparare le tecniche avanzate di scultura digitale. Accesso riservato.',
      image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
      cta: 'Usa i tuoi Punti',
      category: 'Formazione',
      points: 800,
      link: '/news/workshop-scultura-3d',
      date: '2024-11-20',
    },
];


export const allActivities: Activity[] = [
    ...earnPointsItems.map(item => ({...item, type: 'earn' as const})), 
    ...spendPointsItems.map(item => ({...item, type: 'spend' as const}))
].sort((a, b) => {
    if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
});

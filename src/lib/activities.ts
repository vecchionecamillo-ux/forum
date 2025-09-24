import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

export type Activity = {
  title: string;
  slug: string;
  category: 'Laboratorio' | 'Workshop' | 'Arte' | 'Community';
  description: string;
  image?: ImagePlaceholder;
  cta: string;
  link?: string;
  points?: number;
  xp?: number;
  date?: string; // Formato YYYY-MM-DD per facilitare l'ordinamento e il parsing
  time?: string;
  duration?: string;
  durationDetail?: 'Permanente' | 'Workshop Intensivo' | '4 settimane, 2h/sett';
  type: 'earn' | 'spend';
};

const earnPointsItems: Omit<Activity, 'type'>[] = [
  // --- FORMAZIONE - LAB039 ---
  {
    title: 'Laboratorio di Fotografia',
    slug: 'lab-fotografia',
    category: 'Laboratorio',
    description: 'Un percorso di 4 settimane per imparare le basi della fotografia. Dalla composizione alla post-produzione, una lezione a settimana per padroneggiare la macchina fotografica.',
    image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
    cta: 'Scopri di più',
    link: '/news/lab-fotografia',
    points: 150,
    xp: 200,
    duration: '4 Settimane',
    durationDetail: '4 settimane, 2h/sett',
  },
  {
    title: 'Laboratorio Giovani Idee',
    slug: 'lab-giovani-idee',
    category: 'Laboratorio',
    description: 'Hai un\'idea creativa? Trasformala in un progetto concreto. Un laboratorio di 4 settimane con mentor esperti per guidarti passo dopo passo, con incontri settimanali.',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    cta: 'Partecipa',
    link: '/news/lab-giovani-idee',
    points: 150,
    xp: 200,
    duration: '4 Settimane',
    durationDetail: '4 settimane, 2h/sett',
  },
  {
    title: 'Laboratorio di Pittura',
    slug: 'lab-pittura',
    category: 'Laboratorio',
    description: 'Esplora la tua creatività con tele e pennelli in questo corso di 4 settimane. Affina la tua tecnica pittorica con lezioni pratiche settimanali.',
    image: PlaceHolderImages.find(img => img.id === 'art-gallery-placeholder'),
    cta: 'Iscriviti',
    link: '/news/lab-pittura',
    points: 150,
    xp: 200,
    duration: '4 Settimane',
    durationDetail: '4 settimane, 2h/sett',
  },
  {
    title: 'Laboratorio di Scrittura Creativa',
    slug: 'lab-scrittura-creativa',
    category: 'Laboratorio',
    description: 'Libera la tua voce e impara le tecniche di storytelling per scrivere racconti, poesie e sceneggiature. Un percorso continuo.',
    image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
    cta: 'Inizia a scrivere',
    link: '/news/lab-scrittura-creativa',
    points: 80,
    xp: 100,
    duration: 'Permanente',
    durationDetail: 'Permanente',
  },
  {
    title: 'Workshop di Excel per Creativi',
    slug: 'workshop-excel',
    category: 'Workshop',
    description: 'Impara a usare Excel non solo per i numeri, ma come strumento creativo per la gestione di progetti artistici e portfolio.',
    image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
    cta: 'Iscriviti al workshop',
    link: '/news/workshop-excel',
    points: 40,
    xp: 50,
    date: '2024-11-05',
    time: '18:00 - 20:00',
    duration: '2 ore',
    durationDetail: 'Workshop Intensivo',
  },
  {
    title: 'Workshop di Python e Tecnologia',
    slug: 'workshop-python',
    category: 'Workshop',
    description: 'Un\'introduzione intensiva a Python per artisti e designer. Scopri come la tecnologia può potenziare la tua creatività.',
    image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
    cta: 'Partecipa',
    link: '/news/workshop-python',
    points: 75,
    xp: 100,
    date: '2024-10-22',
    time: '18:00 - 21:00',
    duration: '3 ore',
    durationDetail: 'Workshop Intensivo',
  },
   {
    title: 'Workshop di Marketing Digitale',
    slug: 'workshop-marketing-digitale',
    category: 'Workshop',
    description: 'Promuovi la tua arte online. Un corso intensivo su social media, SEO e strategie di comunicazione per artisti e creativi.',
    image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
    cta: 'Prenota il tuo posto',
    link: '/news/workshop-marketing-digitale',
    points: 75,
    xp: 100,
    date: '2024-11-12',
    time: '17:00 - 20:00',
    duration: '3 ore',
    durationDetail: 'Workshop Intensivo',
  },

  // --- EVENTI & COMMUNITY ---
  {
    title: 'Plastic Free: Pulizia del Parco',
    slug: 'plastic-free-parco',
    category: 'Community',
    description: 'Unisciti a noi per un\'attività di volontariato ambientale. Raccoglieremo la plastica e puliremo il parco cittadino. Un piccolo gesto per un grande impatto.',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    cta: 'Partecipa',
    link: '/news/plastic-free-parco',
    points: 120,
    xp: 150,
    date: '2024-10-02',
    time: '09:00 - 13:00',
    duration: '4 ore'
  },
  {
    title: 'Incontro con la Psicologa: "Stare Insieme"',
    slug: 'incontro-psicologa-stare-insieme',
    category: 'Community',
    description: 'Un incontro di gruppo per esplorare le dinamiche relazionali e il benessere psicologico in un ambiente sicuro e accogliente.',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    cta: 'Partecipa all\'incontro',
    link: '/news/incontro-psicologa-stare-insieme',
    points: 50,
    xp: 75,
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
    xp: 125,
    date: '2024-10-05',
    time: '20:00',
    duration: '3 ore'
  },
  {
    title: 'Nuova Call per Volontari',
    slug: 'call-volontari',
    category: 'Community',
    description: 'Stiamo cercando persone appassionate che vogliano contribuire alla crescita del Cantiere Culturale. Unisciti a noi e fai la differenza!',
    image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
    cta: 'Partecipa',
    link: '/news/call-volontari',
    points: 150,
    xp: 250,
    date: '2024-09-30',
    time: 'Tutto il giorno',
    duration: 'Continuativo'
  },
];

const spendPointsItems: Omit<Activity, 'type'>[] = [
    {
      title: 'Accesso Esclusivo: Opening Mostra "Visioni Digitali"',
      slug: 'opening-visioni-digitali',
      description: 'Assicurati il tuo posto per la serata inaugurale della nostra nuova mostra. Posti limitati.',
      image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
      cta: 'Usa i tuoi Punti',
      category: 'Arte',
      points: 250,
      xp: 300,
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
      xp: 400,
      link: '/news/stampa-riflessi-urbani',
    },
    {
      title: 'Workshop di Scultura 3D con Artista Digitale',
      slug: 'workshop-scultura-3d',
      description: 'Un workshop intensivo di 2 giorni per imparare le tecniche avanzate di scultura digitale. Accesso riservato.',
      image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
      cta: 'Usa i tuoi Punti',
      category: 'Workshop',
      points: 800,
      xp: 600,
      link: '/news/workshop-scultura-3d',
      date: '2024-11-20',
      durationDetail: 'Workshop Intensivo',
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

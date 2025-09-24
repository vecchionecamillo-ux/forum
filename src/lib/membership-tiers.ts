export interface UserTierLevel {
  name: string;
  xpThreshold: number;
  gradient: string;
  textColor?: string;
  color: string; // For badges
  benefits: string[];
}

export interface MembershipTier {
  type: 'user' | 'partner' | 'sponsor' | 'ambassador';
  title: string;
  description: string;
  benefits: string[];
  levels: UserTierLevel[];
}

export type UserTier = MembershipTier & { type: 'user' };

export const membershipTiers: MembershipTier[] = [
  {
    type: 'user',
    title: 'Tessera Utente',
    description: 'La tessera per ogni membro della community.',
    benefits: [],
    levels: [
      {
        name: 'Membro',
        xpThreshold: 0,
        gradient: 'from-gray-500 to-gray-700',
        color: 'bg-gray-500',
        benefits: [
          'Accesso base alla piattaforma e agli eventi gratuiti',
          'Possibilità di guadagnare e spendere Punti Community',
        ],
      },
      {
        name: 'Partecipante Attivo',
        xpThreshold: 500,
        gradient: 'from-blue-500 to-blue-700',
        color: 'bg-blue-500',
        benefits: [
          'Tutti i vantaggi precedenti',
          'Sconto del 5% su tutti gli articoli del Marketplace',
          'Accesso al giornalino digitale "Cantiere News"',
        ],
      },
      {
        name: 'Creatore',
        xpThreshold: 1500,
        gradient: 'from-purple-500 to-purple-700',
        color: 'bg-purple-500',
        benefits: [
          'Tutti i vantaggi precedenti',
          'Sconto del 10% sul Marketplace',
          'Accesso anticipato alle iscrizioni per workshop e laboratori',
        ],
      },
      {
        name: 'Pioniere',
        xpThreshold: 4000,
        gradient: 'from-amber-400 to-orange-500',
        color: 'bg-amber-500',
        textColor: 'text-black',
        benefits: [
          'Tutti i vantaggi precedenti',
          'Sconto del 15% sul Marketplace',
          'Accesso a contenuti e canali esclusivi della community',
          'Inviti a eventi speciali riservati',
        ],
      },
    ],
  },
  {
    type: 'partner',
    title: 'Tessera Partner',
    description:
      'Riservata a istituzioni e aziende che co-progettano attivamente con noi.',
    benefits: [
      'Visibilità e co-branding su tutti i materiali del progetto condiviso',
      'Accesso prioritario ai talenti della community per collaborazioni',
      'Spazio dedicato sulla piattaforma per presentare la propria realtà',
      'Partecipazione a tavoli di lavoro strategici sul futuro del Cantiere',
    ],
    levels: [
      {
        name: 'Partner',
        xpThreshold: 0,
        gradient: 'from-sky-500 to-indigo-500',
        color: 'bg-sky-500',
        benefits: [],
      },
    ],
  },
  {
    type: 'sponsor',
    title: 'Tessera Sponsor',
    description: 'Per le aziende che sostengono la nostra missione culturale.',
    benefits: [
      'Massima visibilità del brand durante gli eventi principali',
      'Pacchetti personalizzati di marketing e comunicazione',
      'Report periodici sull\'impatto sociale e culturale generato',
      'Accesso VIP a tutti gli eventi del Cantiere Culturale',
    ],
    levels: [
      {
        name: 'Sponsor',
        xpThreshold: 0,
        gradient: 'from-slate-800 to-gray-900',
        color: 'bg-slate-800',
        benefits: [],
      },
    ],
  },
  {
    type: 'ambassador',
    title: 'Tessera Ambassador',
    description:
      'La tessera più prestigiosa, per chi incarna e promuove i valori del Cantiere.',
    benefits: [
      'Status permanente, non richiede rinnovo annuale',
      'Accesso illimitato a tutte le attività, workshop ed eventi',
      'Crediti gratuiti per il Marketplace ogni anno',
      'Ruolo di mentore e rappresentante ufficiale della community',
    ],
    levels: [
      {
        name: 'Ambassador',
        xpThreshold: 0,
        gradient: 'from-yellow-400 via-red-500 to-pink-500',
        textColor: 'text-black',
        color: 'bg-yellow-400',
        benefits: [],
      },
    ],
  },
];

export function getUserTier(xp: number): UserTierLevel {
  const userTier = membershipTiers.find((t) => t.type === 'user') as UserTier;
  let currentLevel = userTier.levels[0];
  for (const level of userTier.levels) {
    if (xp >= level.xpThreshold) {
      currentLevel = level;
    }
  }
  return currentLevel;
}

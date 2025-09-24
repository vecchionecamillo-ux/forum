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
    title: 'Tessera Membro',
    description: 'Il punto di partenza per ogni membro della community. Accumula XP per salire di grado.',
    benefits: [],
    levels: [
      {
        name: 'Membro',
        xpThreshold: 0,
        gradient: 'from-orange-800/70 to-amber-900/70', // Bronze
        color: 'bg-amber-700',
        benefits: [
          'Accesso base alla piattaforma e agli eventi gratuiti',
          'Possibilità di guadagnare e spendere Punti Community',
        ],
      },
      {
        name: 'Partecipante Attivo',
        xpThreshold: 500,
        gradient: 'from-sky-600 to-indigo-700', // Sapphire/Silver
        color: 'bg-sky-500',
        benefits: [
          'Tutti i vantaggi precedenti',
          'Sconto del 5% su tutti gli articoli del Marketplace',
          'Accesso al giornalino digitale "Cantiere News"',
        ],
      },
      {
        name: 'Creatore',
        xpThreshold: 1500,
        gradient: 'from-purple-600 to-violet-700', // Amethyst
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
        gradient: 'from-yellow-400 to-amber-500', // Gold
        textColor: 'text-black',
        color: 'bg-yellow-500',
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
        gradient: 'from-cyan-500 to-blue-600',
        color: 'bg-cyan-500',
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
        gradient: 'from-slate-400 to-slate-900', // Platinum
        color: 'bg-slate-700',
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
        gradient: 'from-pink-500 via-red-500 to-yellow-500', // Aurora/Iridescent
        textColor: 'text-white',
        color: 'bg-pink-500',
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

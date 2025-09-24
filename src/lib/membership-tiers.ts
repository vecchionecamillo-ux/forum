export interface UserTierLevel {
  name: string;
  xpThreshold: number;
  backgroundColor: string; // Colore di base della tessera
  textColor: string; // Colore del testo principale
  accentColor: string; // Colore per dettagli/elementi grafici
  badgeColor: string; // Colore per i badge UI
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
export type SpecialTier = MembershipTier & { type: 'partner' | 'sponsor' | 'ambassador' };

// ANTRACITE TEXT: #36454F
// BIANCO CALDO TEXT: #FDFBF7

export const membershipTiers: MembershipTier[] = [
  {
    type: 'user', // ESTATE: Delicatezza e Raffinatezza (palette fredda, pastello)
    title: 'Tessera Membro',
    description: 'Il punto di partenza per ogni membro della community. Accumula XP per salire di grado.',
    benefits: [],
    levels: [
      {
        name: 'Membro',
        xpThreshold: 0,
        backgroundColor: 'bg-[#E0E0E0]', // Grigio Perla
        textColor: 'text-[#36454F]',
        accentColor: 'text-gray-500/50',
        badgeColor: 'bg-gray-400',
        benefits: [
          'Accesso base alla piattaforma e agli eventi gratuiti',
          'Possibilità di guadagnare e spendere Punti Community',
        ],
      },
      {
        name: 'Partecipante Attivo',
        xpThreshold: 500,
        backgroundColor: 'bg-[#AEC6CF]', // Azzurro Polvere
        textColor: 'text-[#36454F]',
        accentColor: 'text-white/70',
        badgeColor: 'bg-sky-400',
        benefits: [
          'Tutti i vantaggi precedenti',
          'Sconto del 5% su tutti gli articoli del Marketplace',
          'Accesso al giornalino digitale "Cantiere News"',
        ],
      },
      {
        name: 'Creatore',
        xpThreshold: 1500,
        backgroundColor: 'bg-[#B4A0E5]', // Lilla/Lavanda
        textColor: 'text-[#36454F]',
        accentColor: 'text-white/80',
        badgeColor: 'bg-purple-400',
        benefits: [
          'Tutti i vantaggi precedenti',
          'Sconto del 10% sul Marketplace',
          'Accesso anticipato alle iscrizioni per workshop e laboratori',
        ],
      },
      {
        name: 'Pioniere',
        xpThreshold: 4000,
        backgroundColor: 'bg-slate-300', // Argento
        textColor: 'text-[#36454F]',
        accentColor: 'text-white',
        badgeColor: 'bg-slate-400',
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
    type: 'partner', // INVERNO: Profondità e Contrasto (palette fredda, intensa)
    title: 'Tessera Partner',
    description: 'Riservata a istituzioni e aziende che co-progettano attivamente con noi.',
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
        backgroundColor: 'bg-[#000033]', // Blu Notte
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-blue-400/70',
        badgeColor: 'bg-blue-600',
        benefits: [],
      },
      {
        name: 'Partner Premium',
        xpThreshold: 1,
        backgroundColor: 'bg-[#000033]',
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-blue-300',
        badgeColor: 'bg-blue-500',
        benefits: [],
      },
       {
        name: 'Partner Master',
        xpThreshold: 2,
        backgroundColor: 'bg-[#000033]',
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-magenta-400', // Dettaglio Magenta
        badgeColor: 'bg-magenta-500',
        benefits: [],
      },
    ],
  },
  {
    type: 'sponsor', // AUTUNNO: Calore e Ricchezza (palette calda, terrosa)
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
        backgroundColor: 'bg-[#10342A]', // Verde Bosco
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-amber-700/80',
        badgeColor: 'bg-green-700',
        benefits: [],
      },
      {
        name: 'Sponsor Premium',
        xpThreshold: 1,
        backgroundColor: 'bg-[#10342A]',
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-amber-500',
        badgeColor: 'bg-green-600',
        benefits: [],
      },
       {
        name: 'Sponsor Master',
        xpThreshold: 2,
        backgroundColor: 'bg-[#10342A]',
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-yellow-400',
        badgeColor: 'bg-yellow-500',
        benefits: [],
      },
    ],
  },
  {
    type: 'ambassador', // PRIMAVERA: Luminosità e Vivacità (palette calda, brillante)
    title: 'Tessera Ambassador',
    description: 'La tessera più prestigiosa, per chi incarna e promuove i valori del Cantiere.',
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
        backgroundColor: 'bg-[#F5F5DC]', // Avorio Caldo
        textColor: 'text-[#36454F]',
        accentColor: 'text-green-500',
        badgeColor: 'bg-lime-400',
        benefits: [],
      },
    ],
  },
];

// Funzione per ottenere il livello corretto dell'utente in base agli XP
export function getUserTier(xp: number): UserTierLevel {
  const userTier = membershipTiers.find((t) => t.type === 'user') as UserTier;
  // Itera sui livelli in ordine decrescente di soglia XP
  for (let i = userTier.levels.length - 1; i >= 0; i--) {
    if (xp >= userTier.levels[i].xpThreshold) {
      return userTier.levels[i];
    }
  }
  return userTier.levels[0]; // Ritorna il livello base se nessuna soglia è raggiunta
}

// Funzione per ottenere il livello di un partner/sponsor
export function getSpecialTierLevel(type: 'partner' | 'sponsor', level: number): UserTierLevel {
    const tier = membershipTiers.find((t) => t.type === type) as SpecialTier;
    return tier.levels[level] || tier.levels[0]; // Ritorna il livello richiesto o il base
}

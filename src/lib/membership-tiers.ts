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
  levels: UserTierLevel[];
}

export type UserTier = MembershipTier & { type: 'user' };
export type SpecialTier = MembershipTier & { type: 'partner' | 'sponsor' | 'ambassador' };

// ANTRACITE TEXT: #36454F
// BIANCO CALDO TEXT: #FDFBF7

export const membershipTiers: MembershipTier[] = [
  {
    type: 'user', // ESTATE: Delicatezza e Raffinatezza (palette fredda, pastello)
    title: 'Membro',
    description: 'Il punto di partenza per ogni membro della community. Accumula XP per salire di grado.',
    levels: [
      {
        name: 'Membro',
        xpThreshold: 0,
        backgroundColor: 'bg-[#E0E0E0]', // Grigio Perla
        textColor: 'text-[#36454F]',
        accentColor: 'text-gray-500/50',
        badgeColor: 'bg-gray-400',
        benefits: [
          'Accesso base alla piattaforma',
          'Partecipazione agli eventi gratuiti della community',
          'Guadagna e spendi Punti Community nel Marketplace',
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
          'Accesso al giornalino digitale mensile "Cantiere News"',
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
          'Possibilità di proporre un\'attività per la community',
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
          'Accesso a canali esclusivi e contenuti premium',
          'Inviti a eventi speciali riservati ai Pionieri',
        ],
      },
    ],
  },
  {
    type: 'partner', // INVERNO: Profondità e Contrasto (palette fredda, intensa)
    title: 'Partner',
    description: 'Riservata a istituzioni e aziende che co-progettano attivamente con noi.',
    levels: [
      {
        name: 'Partner',
        xpThreshold: 0,
        backgroundColor: 'bg-[#000033]', // Blu Notte
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-gray-400/70',
        badgeColor: 'bg-blue-600',
        benefits: [
            'Visibilità e co-branding su tutti i materiali del progetto condiviso',
            'Accesso prioritario ai talenti della community per collaborazioni',
        ],
      },
      {
        name: 'Partner Premium',
        xpThreshold: 1,
        backgroundColor: 'bg-[#000033]',
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-blue-400/80',
        badgeColor: 'bg-blue-500',
        benefits: [
          'Tutti i vantaggi precedenti',
          'Spazio dedicato sulla piattaforma per presentare la propria realtà',
          'Co-progettazione di un evento annuale esclusivo',
        ],
      },
       {
        name: 'Partner Master',
        xpThreshold: 2,
        backgroundColor: 'bg-[#000033]',
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-[#FF00FF]/80', // Dettaglio Magenta
        badgeColor: 'bg-fuchsia-500',
        benefits: [
            'Tutti i vantaggi precedenti',
            'Partecipazione a tavoli di lavoro strategici sul futuro del Cantiere',
            'Accesso a report di settore e analisi dei trend creativi',
        ],
      },
    ],
  },
  {
    type: 'sponsor', // PALETTE BLU ZAFFIRO
    title: 'Sponsor',
    description: 'Per le aziende che sostengono la nostra missione culturale.',
    levels: [
      {
        name: 'Sponsor',
        xpThreshold: 0,
        backgroundColor: 'bg-[#0F5298]', // Blu Zaffiro
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-cyan-400/60',
        badgeColor: 'bg-blue-700',
        benefits: [
            'Visibilità del brand durante gli eventi e le attività supportate',
            'Posti riservati a tutti gli eventi pubblici',
        ],
      },
      {
        name: 'Sponsor Premium',
        xpThreshold: 1,
        backgroundColor: 'bg-[#0F5298]',
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-cyan-300/80',
        badgeColor: 'bg-blue-600',
        benefits: [
          'Tutti i vantaggi precedenti',
          'Pacchetto di comunicazione dedicato sui nostri canali social',
          'Report periodici sull\'impatto generato dal supporto',
        ],
      },
       {
        name: 'Sponsor Master',
        xpThreshold: 2,
        backgroundColor: 'bg-[#0F5298]',
        textColor: 'text-[#FDFBF7]',
        accentColor: 'text-white/80',
        badgeColor: 'bg-cyan-500',
        benefits: [
            'Tutti i vantaggi precedenti',
            'Main Sponsor di un format di eventi a scelta',
            'Accesso VIP a tutte le attività e workshop del Cantiere Culturale',
        ],
      },
    ],
  },
  {
    type: 'ambassador', // PRIMAVERA: Luminosità e Vivacità (palette calda, brillante)
    title: 'Ambassador',
    description: 'La tessera più prestigiosa, per chi incarna e promuove i valori del Cantiere.',
    levels: [
      {
        name: 'Ambassador',
        xpThreshold: 0,
        backgroundColor: 'bg-[#F5F5DC]', // Avorio Caldo
        textColor: 'text-[#36454F]',
        accentColor: 'text-green-500',
        badgeColor: 'bg-lime-400',
        benefits: [
            'Status permanente, non richiede rinnovo annuale',
            'Accesso illimitato e gratuito a tutte le attività, workshop ed eventi',
            'Budget annuale di Punti Community da spendere liberamente',
            'Ruolo di mentore ufficiale all\'interno della community',
            'Posto d\'onore in tutti gli eventi del Cantiere Culturale',
        ],
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

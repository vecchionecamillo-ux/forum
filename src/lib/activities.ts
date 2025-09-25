import type { ImagePlaceholder } from '@/lib/placeholder-images';

// NOTA: I dati delle attività sono stati migrati su Firestore.
// Questo file è ora obsoleto e verrà rimosso in una fase successiva.
// L'applicazione ora recupera le attività direttamente dal database.

export type Supporter = {
  name: string;
  bio: string;
  avatarUrl?: string;
  websiteUrl?: string;
};


export type Activity = {
  id?: string; // ID del documento Firestore
  title: string;
  slug: string;
  category: 'Laboratorio' | 'Workshop' | 'Arte' | 'Community' | 'Mostra' | 'Talk' | 'Premio' | 'Formazione' | 'Evento';
  mainCategory?: 'Informatica e Programmazione' | 'Arte e Design' | 'Economia e Finanza' | 'Scienze Umane' | 'Scienza e Matematica' | 'Sviluppo Personale e Professionale' | 'Piattaforme Trasversali';
  description: string;
  image?: ImagePlaceholder;
  cta: string;
  link?: string;
  points?: number;
  xp?: number;
  date?: string; // Formato YYYY-MM-DD per facilitare l'ordinamento e il parsing
  time?: string;
  duration?: string;
  durationDetail?: 'Permanente' | 'Workshop Intensivo' | '4 settimane, 2h/sett' | 'Lungo Termine';
  type: 'earn' | 'spend';
  supporters?: Supporter[];
};

export const allActivities: Activity[] = [];

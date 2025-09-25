import type { ImagePlaceholder } from '@/lib/placeholder-images';

// NOTA: I dati delle attività sono stati migrati su Firestore.
// Questo file è ora obsoleto e verrà rimosso in una fase successiva.
// L'applicazione ora recupera le attività direttamente dal database.

export type Activity = {
  id?: string; // ID del documento Firestore
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

export const allActivities: Activity[] = [];

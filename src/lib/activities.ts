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
  category: 'Laboratorio' | 'Workshop' | 'Arte' | 'Community' | 'Mostra' | 'Talk' | 'Premio' | 'Formazione' | 'Evento' | 'Piattaforme MOOC' | 'Piattaforme "Creator-Centric"' | 'Istruzione Gratuita' | 'Competenze Digitali' | 'Sviluppo Web (HTML, CSS, JavaScript)' | 'Sviluppo App e Software (Python, Java, C++)' | 'Data Science, Intelligenza Artificiale e Cyber Security' | 'Grafica e Design';
  mainCategory?: 'Informatica e Programmazione' | 'Arte e Design' | 'Economia e Finanza' | 'Scienze Umane' | 'Scienza e Matematica' | 'Sviluppo Personale e Professionale' | 'Piattaforme Trasversali';
  subCategory?: string;
  isResource?: boolean;
  featured?: boolean; // To feature on the homepage
  description: string;
  image?: ImagePlaceholder;
  cta: string;
  link?: string;
  points?: number;
  xp?: number;
  date?: string; // Formato YYYY-MM-DD per facilitare l'ordinamento e il parsing
  time?: string;
  duration?: string;
  durationDetail?: 'Permanente' | 'Workshop Intensivo' | '4 settimane, 2h/sett' | 'Lungo Termine' | 'Intensive' | 'Long-term';
  type: 'earn' | 'spend';
  supporters?: Supporter[];
  examples?: string[];
};

export const allActivities: Activity[] = [];

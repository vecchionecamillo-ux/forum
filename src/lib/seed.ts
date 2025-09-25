
// THIS SCRIPT IS FOR ONE-TIME DATABASE SEEDING.
// DO NOT RUN THIS IN PRODUCTION OR AFTER THE INITIAL SEEDING.

import { collection, addDoc } from 'firebase/firestore';
import { getFirebaseInstances } from './firebase';
import { PlaceHolderImages } from './placeholder-images';

type Activity = {
    title: string;
    slug: string;
    category: 'Laboratorio' | 'Workshop' | 'Arte' | 'Community' | 'Mostra' | 'Talk' | 'Premio' | 'Formazione' | 'Evento';
    description: string;
    image?: { id: string; imageUrl: string; imageHint: string; };
    cta: string;
    link?: string;
    points?: number;
    xp?: number;
    date?: string; 
    time?: string;
    duration?: string;
    durationDetail?: 'Permanente' | 'Workshop Intensivo' | '4 settimane, 2h/sett' | 'Lungo Termine';
    type: 'earn' | 'spend';
};


const allActivities: Activity[] = [
    // --- FORMAZIONE ---
    {
        title: 'Laboratorio di Arte Generativa',
        slug: 'lab-arte-generativa',
        category: 'Laboratorio',
        description: 'Impara a creare arte con il codice. Un workshop pratico sull\'uso di p5.js per esplorare la creatività computazionale e generare opere visive uniche.',
        image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
        cta: 'Scopri di più e iscriviti',
        points: 50,
        xp: 150,
        date: '2024-10-15',
        time: '18:00 - 20:00',
        duration: '2 ore',
        durationDetail: 'Workshop Intensivo',
        type: 'earn',
    },
    {
        title: 'Workshop di Scrittura Creativa',
        slug: 'workshop-scrittura-creativa',
        category: 'Workshop',
        description: 'Libera la tua immaginazione e affina le tue tecniche di narrazione. Un percorso in 4 settimane per sviluppare la tua voce e creare storie coinvolgenti.',
        image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
        cta: 'Dettagli e Iscrizione',
        points: 100,
        xp: 250,
        date: '2024-11-05',
        time: '19:00 - 21:00',
        duration: '4 settimane',
        durationDetail: '4 settimane, 2h/sett',
        type: 'earn',
    },
    {
        title: 'Lezione di Scacchi',
        slug: 'lezione-scacchi',
        category: 'Formazione',
        description: 'Migliora le tue abilità strategiche con le nostre lezioni di scacchi settimanali. Adatto a tutti i livelli, dai principianti ai giocatori avanzati.',
        image: PlaceHolderImages.find(img => img.id === 'chess-placeholder'),
        cta: 'Partecipa',
        points: 20,
        xp: 50,
        time: '18:00 - 20:00',
        duration: 'Ogni Mercoledì',
        durationDetail: 'Lungo Termine',
        type: 'earn',
    },
    // --- EVENTI & COMMUNITY ---
    {
        title: 'Mostra d\'Arte Digitale: "Futuri Possibili"',
        slug: 'mostra-futuri-possibili',
        category: 'Mostra',
        description: 'Esplora le visioni del futuro attraverso le opere di artisti digitali emergenti. Un viaggio immersivo tra NFT, realtà virtuale e arte generativa.',
        image: PlaceHolderImages.find(img => img.id === 'nft-placeholder'),
        cta: 'Esplora la Mostra',
        points: 10,
        xp: 30,
        date: '2024-09-25',
        time: 'Tutto il giorno',
        duration: 'Permanente',
        type: 'earn',
    },
    {
        title: 'Community Meetup & Networking',
        slug: 'community-meetup',
        category: 'Community',
        description: 'Incontra altri membri della community, scambia idee e crea nuove collaborazioni. Un\'occasione informale per connettersi e crescere insieme.',
        image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
        cta: 'Conferma la tua presenza',
        points: 25,
        xp: 50,
        date: '2024-10-10',
        time: '18:30',
        duration: 'Serata',
        type: 'earn',
    },
    {
        title: 'Talk: L\'impatto dell\'IA sulla Creatività',
        slug: 'talk-ia-creativita',
        category: 'Talk',
        description: 'Un panel di esperti discute le opportunità e le sfide che l\'intelligenza artificiale pone al mondo dell\'arte e del design.',
        image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
        cta: 'Segui il Talk',
        points: 15,
        xp: 40,
        date: '2024-10-22',
        time: '19:00',
        duration: '1 ora',
        type: 'earn',
    },
    // --- MARKETPLACE ---
    {
        title: 'Consulenza Portfolio Personalizzata',
        slug: 'consulenza-portfolio',
        category: 'Premio',
        description: 'Ricevi un feedback one-to-one sul tuo portfolio da un curatore esperto. Un\'occasione unica per migliorare la presentazione del tuo lavoro.',
        image: PlaceHolderImages.find(img => img.id === 'art-gallery-placeholder'),
        cta: 'Riscatta con Punti',
        points: 500,
        xp: 100, // XP for redeeming
        type: 'spend',
    },
     {
        title: 'Accesso Esclusivo a Workshop Avanzato',
        slug: 'accesso-workshop-avanzato',
        category: 'Premio',
        description: 'Sblocca l\'accesso a un workshop esclusivo non disponibile al pubblico. Approfondisci le tue competenze con i migliori professionisti.',
        image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
        cta: 'Riscatta con Punti',
        points: 800,
        xp: 200,
        type: 'spend',
    },
    {
        title: 'Stampa Fine Art in Edizione Limitata',
        slug: 'stampa-fine-art',
        category: 'Premio',
        description: 'Possiedi un pezzo unico. Riscatta una stampa fine art in edizione limitata di un\'opera selezionata dalla nostra galleria digitale.',
        image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
        cta: 'Riscatta con Punti',
        points: 1200,
        xp: 250,
        type: 'spend',
    },
    // --- ELEARNING ---
     {
        title: 'Google Digital Garage',
        slug: 'elearning-google-garage',
        category: 'Formazione',
        description: 'Hub formativo gratuito di Google per acquisire competenze nel mondo del web marketing. Include corsi completi su SEO, social media e pubblicità online.',
        link: 'https://learndigital.withgoogle.com/digitalgarage',
        cta: 'Visita la Piattaforma',
        type: 'earn',
        xp: 10,
    },
    {
        title: 'freeCodeCamp',
        slug: 'elearning-freecodecamp',
        category: 'Formazione',
        description: 'Un punto di riferimento per il responsive web design. Offre un curriculum completo e gratuito di oltre 300 ore che copre HTML, CSS e JavaScript con un approccio basato su progetti e certificazioni.',
        link: 'https://www.freecodecamp.org',
        cta: 'Visita la Piattaforma',
        type: 'earn',
        xp: 10,
    },
];

export async function seedDatabase() {
    console.log('Starting database seed...');
    const { db } = getFirebaseInstances();
    const activitiesCollection = collection(db, 'activities');

    // This is a simple seeding script. In a real-world scenario, 
    // you'd want to check if the data already exists to avoid duplicates.
    // For this project, we assume a clean database for the initial seed.

    try {
        for (const activity of allActivities) {
            await addDoc(activitiesCollection, activity);
            console.log(`Added: ${activity.title}`);
        }
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// Automatically trigger the seed function if the script is run directly
// This is a simple approach for development. 
// In a real project, you might have a separate CLI command for this.
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
    // This is a server-side environment
    // We can't directly call it here because this file might be imported by client components.
    // The seeding should be triggered manually or via a dedicated script.
    // For now, we'll log a message.
    console.log('To seed the database, you would typically run a separate script.');
}

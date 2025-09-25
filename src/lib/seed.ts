
// THIS SCRIPT IS FOR ONE-TIME DATABASE SEEDING.
// DO NOT RUN THIS IN PRODUCTION OR AFTER THE INITIAL SEEDING.

import { collection, addDoc } from 'firebase/firestore';
import { getFirebaseInstances } from './firebase';
import { PlaceHolderImages } from './placeholder-images';
import { Activity } from './activities';


const allActivities: Activity[] = [
    // --- FORMAZIONE ---
    {
        title: 'Laboratorio di Arte Generativa',
        slug: 'lab-arte-generativa',
        category: 'Laboratorio',
        mainCategory: 'Arte e Design',
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
        supporters: [
            {
                name: 'Mario Rossi',
                bio: 'Esperto di Arte Generativa e Creative Coding, con 10 anni di esperienza nel settore.',
                avatarUrl: 'https://i.pravatar.cc/150?u=mario',
                websiteUrl: 'https://example.com'
            }
        ]
    },
    {
        title: 'Workshop di Scrittura Creativa',
        slug: 'workshop-scrittura-creativa',
        category: 'Workshop',
        mainCategory: 'Scienze Umane',
        description: 'Libera la tua immaginazione e affina le tue tecniche di narrazione. Un percorso in 4 settimane per sviluppare la tua voce e creare storie coinvolgenti.',
        image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
        cta: 'Dettagli e Iscrizione',
        points: 100,
        xp: 250,
        date: '2024-11-05',
        time: '19:00 - 21:00',
        duration: '4 settimane, 2h/sett',
        durationDetail: 'Lungo Termine',
        type: 'earn',
        supporters: [
            {
                name: 'Julia Verdi',
                bio: 'Scrittrice e editor professionista. Autrice di numerosi romanzi e racconti.',
                avatarUrl: 'https://i.pravatar.cc/150?u=julia',
                websiteUrl: 'https://example.com'
            }
        ]
    },
    {
        title: 'Lezione di Scacchi',
        slug: 'lezione-scacchi',
        category: 'Formazione',
        mainCategory: 'Sviluppo Personale e Professionale',
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
     {
        title: 'Corso Base di Python',
        slug: 'corso-base-python',
        category: 'Formazione',
        mainCategory: 'Informatica e Programmazione',
        description: 'Parti da zero e impara le basi di Python, uno dei linguaggi di programmazione più richiesti al mondo. Ideale per principianti assoluti.',
        image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
        cta: 'Inizia a Imparare',
        points: 80,
        xp: 200,
        date: '2024-10-01',
        duration: '4 settimane',
        durationDetail: 'Lungo Termine',
        type: 'earn',
        supporters: [
            {
                name: 'DevAcademy',
                bio: 'Piattaforma online per la formazione di sviluppatori software.',
                avatarUrl: 'https://i.pravatar.cc/150?u=devacademy',
                websiteUrl: 'https://example.com'
            }
        ]
    },
    {
        title: 'Public Speaking per Creativi',
        slug: 'public-speaking-creativi',
        category: 'Workshop',
        mainCategory: 'Sviluppo Personale e Professionale',
        description: 'Impara a presentare le tue idee e i tuoi progetti con sicurezza e carisma. Un workshop intensivo per superare la paura del palcoscenico.',
        image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
        cta: 'Iscriviti al Workshop',
        points: 60,
        xp: 120,
        date: '2024-11-20',
        time: '10:00 - 13:00',
        duration: '3 ore',
        durationDetail: 'Workshop Intensivo',
        type: 'earn',
    },
    {
        title: 'Introduzione alla Finanza Decentralizzata (DeFi)',
        slug: 'intro-defi',
        category: 'Formazione',
        mainCategory: 'Economia e Finanza',
        description: 'Scopri i principi fondamentali della DeFi, dalle criptovalute agli smart contract. Un corso per capire la rivoluzione finanziaria in atto.',
        image: PlaceHolderImages.find(img => img.id === 'nft-placeholder'),
        cta: 'Scopri di più',
        points: 70,
        xp: 180,
        date: '2024-10-28',
        duration: '2 settimane',
        durationDetail: 'Lungo Termine',
        type: 'earn',
        supporters: [
            {
                name: 'Laura Bianchi',
                bio: 'FinTech Expert e consulente per startup innovative nel settore blockchain.',
                avatarUrl: 'https://i.pravatar.cc/150?u=laura',
                websiteUrl: 'https://example.com'
            }
        ]
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
        mainCategory: 'Informatica e Programmazione',
        description: 'Un panel di esperti discute le opportunità e le sfide che l\'intelligenza artificiale pone al mondo dell\'arte e del design.',
        image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
        cta: 'Segui il Talk',
        points: 15,
        xp: 40,
        date: '2024-10-22',
        time: '19:00',
        duration: '1 ora',
        type: 'earn',
        supporters: [
            {
                name: 'Tech Solutions Inc.',
                bio: 'Azienda leader nello sviluppo di soluzioni AI-driven per il settore creativo.',
                avatarUrl: 'https://i.pravatar.cc/150?u=techinc',
                websiteUrl: 'https://example.com'
            }
        ]
    },
    {
        title: 'Festival del Cinema Indipendente Online',
        slug: 'festival-cinema-indie',
        category: 'Evento',
        description: 'Una settimana di proiezioni gratuite dedicate al cinema indipendente da tutto il mondo. Vota il tuo film preferito e partecipa ai Q&A con i registi.',
        image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
        cta: 'Guarda il programma',
        points: 40,
        xp: 100,
        date: '2024-11-12',
        duration: '1 settimana',
        type: 'earn',
    },
    {
        title: 'Concerto Musica Elettronica Live Streaming',
        slug: 'concerto-elettronica',
        category: 'Evento',
        description: 'Unisciti a noi per una serata di musica elettronica con DJ set e performance live in streaming esclusivo per la nostra community.',
        image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
        cta: 'Partecipa all\'evento',
        points: 20,
        xp: 40,
        date: '2024-11-30',
        time: '21:00',
        duration: '3 ore',
        type: 'earn',
    },
    {
        title: 'Gruppo di Lettura Mensile',
        slug: 'gruppo-lettura',
        category: 'Community',
        mainCategory: 'Scienze Umane',
        description: 'Ogni mese esploriamo un libro su arte, tecnologia o creatività. Unisciti alla discussione e condividi le tue riflessioni.',
        image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
        cta: 'Unisciti al gruppo',
        points: 15,
        xp: 30,
        duration: 'Mensile',
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
        mainCategory: 'Arte e Design',
        description: 'Possiedi un pezzo unico. Riscatta una stampa fine art in edizione limitata di un\'opera selezionata dalla nostra galleria digitale.',
        image: PlaceHolderImages.find(img => img.id === 'art-placeholder'),
        cta: 'Riscatta con Punti',
        points: 1200,
        xp: 250,
        type: 'spend',
    },
     {
        title: 'Biglietti VIP per Eventi Esclusivi',
        slug: 'biglietti-vip',
        category: 'Premio',
        description: 'Ottieni due biglietti VIP per un nostro evento a scelta. Include accesso backstage o incontro con gli artisti (dove disponibile).',
        image: PlaceHolderImages.find(img => img.id === 'events-placeholder'),
        cta: 'Riscatta con Punti',
        points: 2000,
        xp: 400,
        type: 'spend',
    },
    {
        title: 'Merchandising Ufficiale Cantiere Culturale',
        slug: 'merchandising',
        category: 'Premio',
        description: 'Scegli tra T-shirt, borse e altri gadget esclusivi con il logo del Cantiere Culturale. Mostra il tuo supporto alla community.',
        image: PlaceHolderImages.find(img => img.id === 'community-placeholder'),
        cta: 'Riscatta con Punti',
        points: 350,
        xp: 50,
        type: 'spend',
    },
    {
        title: 'Pubblica un Articolo sul Blog',
        slug: 'pubblica-articolo',
        category: 'Premio',
        mainCategory: 'Scienze Umane',
        description: 'Hai una storia da raccontare o un\'idea da condividere? Riscatta questo premio per pubblicare un tuo articolo sul blog ufficiale del Cantiere Culturale.',
        image: PlaceHolderImages.find(img => img.id === 'training-placeholder'),
        cta: 'Riscatta con Punti',
        points: 750,
        xp: 150,
        type: 'spend',
    },
];

export async function seedDatabase() {
    console.log('Starting database seed...');
    const { db } = getFirebaseInstances();
    const activitiesCollection = collection(db, 'activities');

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

// Per eseguire il seeding, potresti voler esporre una funzione eseguibile
// tramite un endpoint API di sviluppo o uno script separato.
// Esempio (non eseguire automaticamente):
// if (process.env.NODE_ENV === 'development') {
//   // Potresti avere una logica qui per triggerare il seed
//   // ad esempio, tramite un comando specifico.
//   console.log('Seed script is ready. Call seedDatabase() to run.');
// }


import { CodeBlock } from '@/components/code-block';
import { BrainCircuit } from 'lucide-react';

export default function MasterPromptPage() {
  const masterPrompt = `
# Master Prompt: Ricostruzione del Sito "Cantiere Culturale"

## 1. Visione Generale e Concetti Chiave

L'obiettivo è creare una piattaforma web dinamica e interattiva chiamata "Cantiere Culturale". Questa è un ecosistema digitale per artisti, creativi e appassionati, progettato per favorire la community, la formazione e la collaborazione.

I concetti chiave sono:
- **Gamification:** Gli utenti possiedono una "Tessera Digitale" (il loro profilo) e guadagnano punti partecipando ad attività. Questi punti possono essere spesi in un marketplace per ottenere ricompense.
- **Community:** La piattaforma deve favorire l'interazione e la collaborazione attraverso eventi, workshop e proposte di partnership.
- **Formazione Continua:** Offrire un catalogo di corsi, laboratori e workshop (LAB039) per accrescere le competenze dei membri.
- **Accesso e Ruoli:** Esistono due ruoli principali: Utente standard e Moderatore. I moderatori hanno accesso a un'area riservata per gestire la community.

---

## 2. Stack Tecnologico

- **Frontend Framework:** Next.js con App Router (React)
- **Linguaggio:** TypeScript
- **Styling:** Tailwind CSS
- **Componenti UI:** ShadCN/UI
- **Backend & Database:** Firebase (Authentication, Firestore)
- **Funzionalità AI:** Genkit (con Google AI/Gemini)

---

## 3. Architettura dei Dati e Firebase

### 3.1 Firebase Authentication
- Gestire l'autenticazione degli utenti.
- Supportare i metodi: Email/Password e Google Sign-In (con redirect).

### 3.2 Firestore (Database NoSQL)

**Collezione \`users\`:**
- **ID Documento:** \`user.uid\` (dall'Authentication)
- **Struttura Dati (Tipo \`UserProfile\`):**
  - \`uid: string\`: ID univoco dell'utente.
  - \`email: string\`: Email dell'utente.
  - \`displayName: string | null\`: Nome visualizzato.
  - \`photoURL: string | null\`: URL dell'avatar.
  - \`points: number\`: Punti community accumulati.
  - \`rankLevel: number\`: Livello di "rango" dell'utente (da 1 a 5).
  - \`createdAt: Timestamp\`: Data di creazione del profilo.
  - \`country?: string\`: Paese di residenza (opzionale).
  - \`isStudent?: boolean\`: Se l'utente è uno studente (opzionale).
  - \`history?: Array<{...}\>\`: Array di oggetti che tracciano le attività (guadagno/spesa punti).
- **Logica:** Un nuovo documento in questa collezione viene creato automaticamente al primo login di un utente, se non esiste già. I profili vengono aggiornati in tempo reale sull'interfaccia utente.

**Collezione \`activityLog\`:**
- **Scopo:** Tracciare ogni registrazione a un evento o riscatto di un premio.
- **Struttura Dati:**
  - \`userId: string\`: ID dell'utente che ha eseguito l'azione.
  - \`userEmail: string\`, \`userDisplayName: string\`: Dati dell'utente per comodità di query.
  - \`activityType: 'event' | 'redemption'\`: Tipo di attività.
  - \`itemId: string\`: Slug dell'attività/premio.
  - \`itemTitle: string\`: Titolo dell'attività/premio.
  - \`points: number\`: Punti associati (positivi per guadagno, negativi per spesa).
  - \`timestamp: Timestamp\`: Data dell'azione.

**Collezione \`proposals\`:**
- **Scopo:** Memorizzare le proposte di collaborazione inviate tramite il form "Collabora con Noi".
- **Struttura Dati:**
  - \`name: string\`, \`lastName: string\`, \`email: string\`: Dati del proponente.
  - \`collaborationType: 'volunteer' | 'partner' | 'sponsor'\`: Tipo di proposta.
  - \`message: string\`: Messaggio della proposta.
  - \`submittedAt: Timestamp\`: Data di invio.
  - \`status: 'new' | 'reviewed' | 'contacted'\`: Stato della proposta per gestione admin.

---

## 4. Single Source of Truth per le Attività

- **File Chiave:** \`src/lib/activities.ts\`
- **Logica:** Questo file deve esportare un array chiamato \`allActivities\`. È l'unica fonte di verità per tutte le attività, corsi, eventi, e premi del marketplace. Qualsiasi aggiunta o modifica ai contenuti deve avvenire qui.
- **Struttura Oggetto (Tipo \`Activity\`):**
  - \`title: string\`: Titolo.
  - \`slug: string\`: ID univoco usato per URL.
  - \`category: string\`: Categoria (es. 'Laboratorio', 'Workshop', 'Arte', 'Community'). I filtri sulle pagine devono leggere dinamicamente queste categorie.
  - \`description: string\`: Descrizione.
  - \`image?: ImagePlaceholder\`: Immagine (opzionale).
  - \`cta: string\`: Testo della call-to-action.
  - \`link?: string\`: Link alla pagina di dettaglio.
  - \`points?: number\`: Punti (positivi o negativi).
  - \`date?: string\`, \`time?: string\`: Dettagli temporali.
  - \`duration?: string\`, \`durationDetail?: string\`: Dettagli sulla durata.
  - \`type: 'earn' | 'spend'\`: Cruciale per distinguere se l'attività fa guadagnare o spendere punti.

---

## 5. Struttura delle Pagine e Funzionalità

### Pagine Pubbliche
- **Homepage (\`/\`):** Landing page immersiva con animazione di scroll-down che porta a \`/about\`.
- **About (\`/about\`):** Presentazione del progetto, divisa in sezioni (Piattaforma, Tessera Digitale, News).
- **Eventi & Community (\`/eventi\`):**
  - **Filtri Dinamici:** La pagina deve presentare una sezione filtri interattiva basata su:
    - **Periodo:** "Questa Settimana", "Questo Mese".
    - **Punti:** "Guadagna Punti", "Richiede Punti", "Gratuito".
    - **Categorie:** Le categorie devono essere generate dinamicamente dall'array \`allActivities\`.
  - **Risultati:** Una griglia di card mostra solo le attività che corrispondono ai filtri selezionati.
- **Formazione (\`/formazione\`):**
  - Simile a Eventi, ma focalizzata sulle categorie "Laboratorio" e "Workshop".
  - **Filtri Specifici:** Includere filtri per **Durata** ("Intensivi", "Lungo Termine").
  - **Sezione "Diventa Partner":** Una call to action per proporre corsi, con un link \`mailto\`.
- **Marketplace (\`/marketplace\`):**
  - **Interfaccia a Schede:** Due tab principali: "Spendi Punti" (mostra attività \`type: 'spend'\`) e "Ottieni Punti" (mostra attività \`type: 'earn'\`).
  - **Filtri Laterali:** Filtri per range di punti e categorie.
- **Collabora (\`/collabora\`):**
  - Presenta i modi per collaborare (Volontario, Partner, Sponsor).
  - **Form di Contatto:** Un modulo validato (con \`react-hook-form\` e \`zod\`) che invia i dati a una Server Action.
  - **Backend:** La Server Action (\`submitCollaborationProposal\`) salva i dati nella collezione \`proposals\` di Firestore.
- **Dettaglio News/Attività (\`/news/[slug]\`):** Pagina dinamica che mostra i dettagli di un'attività da \`allActivities\`. Deve avere un pulsante CTA che, se l'utente è loggato, esegue una Server Action (\`registerUserForActivity\`) per registrare l'utente e aggiornare i suoi punti.

### Pagine Protette (Accesso Utente)
- **Login (\`/login\`):** Form di accesso con Email/Password e pulsante Google Sign-In. Include la logica per il recupero password.
- **Signup (\`/signup\`):** Form di registrazione con Email/Password e Google Sign-In.
- **Profilo (\`/profile\`):**
  - Mostra i dati dell'utente loggato (\`displayName\`, punti, rango).
  - Visualizza lo storico delle transazioni di punti, differenziando guadagni (verde, "+") e spese (rosso, "-").
  - Accessibile solo se loggati, altrimenti reindirizza a \`/login\`.

### Pagine AI
- **AI Assistant (\`/ai-assistant\`):** Interfaccia per chattare con un assistente AI (Genkit) che risponde a domande sul sito. Il prompt deve essere istruito sul contesto del Cantiere Culturale.

---

## 6. Area Riservata Moderatori (\`/admin\`)

- **Accesso:** La pagina deve essere protetta e accessibile solo agli utenti la cui email è presente in una lista di moderatori definita a livello di codice (nel \`useAuth\` hook).
- **Interfaccia a Schede:**
  - **Dashboard Attività:**
    - Visualizza le statistiche aggregate: numero di eventi unici, iscrizioni totali, premi riscattati.
    - Mostra una lista aggregata di tutte le iscrizioni e i riscatti, raggruppati per attività. Deve essere possibile cercare e filtrare per tipo di attività.
    - I dati devono arrivare in tempo reale da Firestore (collezione \`activityLog\`).
  - **Gestione Utenti:**
    - Mostra una tabella di tutti gli utenti registrati (dalla collezione \`users\`).
    - Permette di cercare/filtrare gli utenti.
    - **Azioni per Utente:** Per ogni utente, il moderatore deve poter:
      1.  **Aggiungere punti.**
      2.  **Cambiare il rango.**
    - Queste azioni devono essere eseguite tramite Server Actions che modificano il documento dell'utente su Firestore.

---

## 7. Componenti e Logica Chiave

- **Hook \`useAuth\` (\`src/hooks/use-auth.tsx\`):**
  - Deve gestire lo stato di autenticazione globale.
  - Si interfaccia con Firebase Auth \`onAuthStateChanged\` e Firestore \`onSnapshot\` per tenere sincronizzati i dati dell'utente e del suo profilo.
  - Espone \`user\`, \`userProfile\`, \`loading\`, \`isModerator\`.
- **Card Attività (\`src/components/activity-card.tsx\`):**
  - Componente riutilizzabile per mostrare ogni item da \`allActivities\`.
  - Deve visualizzare dinamicamente un badge per i punti, colorato e formattato diversamente se si tratta di guadagno (verde, "+") o spesa (rosso, "-").
- **Server Actions (\`src/app/actions.ts\`):**
  - Centralizzare qui tutta la logica di interazione con Firestore (aggiunta punti, cambio rango, registrazione ad attività, invio proposte).
  - Le azioni devono usare \`revalidatePath\` di Next.js per aggiornare le cache delle pagine rilevanti.
- **Tema e Stile (\`src/app/globals.css\`):**
  - Utilizzare variabili CSS per i colori del tema (light/dark mode), compatibile con ShadCN/UI.

Costruendo il sito seguendo queste direttive, il risultato finale sarà una replica fedele del "Cantiere Culturale" con tutte le sue funzionalità.
  `;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <BrainCircuit className="w-8 h-8 text-primary" />
            </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Master Prompt del Progetto
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            Questo è il blueprint completo che descrive l'architettura, le funzionalità e le logiche del sito "Cantiere Culturale". Può essere usato come guida per ricreare il progetto da zero.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
            <CodeBlock prompt={masterPrompt} />
        </div>

      </main>
    </div>
  );
}

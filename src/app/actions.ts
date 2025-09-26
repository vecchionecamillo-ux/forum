
'use server';
// Funzione per popolare la collection PROVA1
async function seedProva1() {
  const prova1Collection = collection(db, "PROVA1");
  const prova1Snapshot = await getDocs(prova1Collection);
  if (prova1Snapshot.empty) {
    const data = {
      PROVA2: "SI FUNZIONA",
      PROVA3: 50
    };
    await addDoc(prova1Collection, data);
    console.log("Collection PROVA1 seeded successfully.");
  } else {
    console.log("Collection PROVA1 already contains data. Seeding aborted.");
  }
}

import { revalidatePath } from 'next/cache';
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, runTransaction, getDocs, query } from 'firebase/firestore';
import { allActivities, partnerLogos } from '@/lib/seed-data';
import { db } from '@/lib/firebase'; // Import the stable db instance


export async function addPoints(formData: FormData): Promise<{ success: boolean; message: string }> {
  const userId = formData.get('userId') as string;
  const points = formData.get('points');

  console.log(`Attempting to add ${points} points to user ${userId}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!userId || !points || +points <= 0) {
    return { success: false, message: 'Invalid input. Please provide a valid user and positive points value.' };
  }

  try {
    const userDocRef = doc(db, 'users', userId);
    
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found in database.');
      }
      const currentPoints = userDoc.data().points || 0;
      const newPoints = currentPoints + Number(points);
      transaction.update(userDocRef, { points: newPoints });
    });

    console.log(`Successfully added ${points} points to user ${userId}.`);

    revalidatePath('/admin');
    revalidatePath(`/profile/${userId}`);

    return { success: true, message: `Successfully added ${points} points.` };

  } catch (error) {
    console.error("Error adding points: ", error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while adding points.';
    return { success: false, message: errorMessage };
  }
}

// Mock server action for creating a membership card
export async function createMembershipCard(formData: FormData): Promise<{ success: boolean; message: string }> {
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        birthDate: formData.get('birthDate'),
        country: formData.get('country'),
        profession: formData.get('profession'),
        isStudent: formData.get('isStudent'),
    };

    console.log('Received membership card application:', data);

    // Simulate network delay and processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic validation simulation
    if (!data.firstName || !data.lastName || !data.email) {
        return { success: false, message: 'Dati incompleti. Per favore, compila tutti i campi obbligatori.' };
    }

    // In a real application, you would save this data to a database.
    console.log('Membership card data saved successfully (simulated).');

    revalidatePath('/tessere');

    return { success: true, message: 'Tessera creata con successo! Benvenuto nella community.' };
}

export async function updateUserRank(formData: FormData): Promise<{ success: boolean; message: string }> {
  const userId = formData.get('userId') as string;
  const newRankLevel = Number(formData.get('rank'));

  if (!userId || !newRankLevel || newRankLevel < 1 || newRankLevel > 5) {
    return { success: false, message: 'Invalid input for rank update.' };
  }
  
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { rankLevel: newRankLevel });
    
    revalidatePath('/admin');
    revalidatePath(`/profile/${userId}`);

    return { success: true, message: `Grado aggiornato per l'utente ${userId}.` };
  } catch (error) {
    console.error("Error changing rank: ", error);
    return { success: false, message: "Impossibile aggiornare il grado." };
  }
}

export async function registerUserForActivity(formData: FormData): Promise<{ success: boolean; message: string }> {
  const userId = formData.get('userId') as string;
  const itemId = formData.get('itemId') as string;
  const itemTitle = formData.get('itemTitle') as string;
  const itemPoints = Number(formData.get('itemPoints'));
  const itemXp = Number(formData.get('itemXp'));
  const activityType = formData.get('activityType') as 'event' | 'redemption';

  if (!userId || !itemId || !itemTitle || isNaN(itemPoints) || !activityType || isNaN(itemXp)) {
    return { success: false, message: 'Dati per la registrazione incompleti.' };
  }

  try {
    const userDocRef = doc(db, 'users', userId);

    if (activityType === 'redemption') {
      // Handle redemptions immediately, as they don't need confirmation
      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userDocRef);
        if (!userDoc.exists()) throw new Error("Utente non trovato.");
        
        const currentPoints = userDoc.data().points || 0;
        const currentXp = userDoc.data().xp || 0;

        if (currentPoints < itemPoints) {
          throw new Error("Punti insufficienti per riscattare questo premio.");
        }
        
        transaction.update(userDocRef, { 
            points: currentPoints - itemPoints,
            xp: currentXp + itemXp
        });
        
        const activityLogRef = collection(db, 'activityLog');
        transaction.set(doc(activityLogRef), {
          userId,
          userEmail: userDoc.data().email,
          userDisplayName: userDoc.data().displayName,
          activityType,
          itemId,
          itemTitle,
          points: itemPoints,
          xp: itemXp,
          timestamp: serverTimestamp(),
          status: 'completed',
        });
      });

      revalidatePath('/admin');
      revalidatePath(`/profile/${userId}`);
      revalidatePath('/marketplace');
      
      return { success: true, message: `Premio "${itemTitle}" riscattato con successo! Hai guadagnato ${itemXp} XP.` };

    } else { // Handle event registrations by creating a pending log
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) throw new Error("Utente non trovato.");

      const activityLogRef = collection(db, 'activityLog');
      await addDoc(activityLogRef, {
        userId,
        userEmail: userDoc.data().email,
        userDisplayName: userDoc.data().displayName,
        activityType: 'event',
        itemId,
        itemTitle,
        points: itemPoints,
        xp: itemXp,
        timestamp: serverTimestamp(),
        status: 'pending', // Awaiting admin confirmation
      });

      revalidatePath('/admin');
      revalidatePath(`/news/${itemId}`);

      return { success: true, message: `Registrazione per "${itemTitle}" avvenuta! I punti verranno accreditati dopo la conferma della partecipazione.` };
    }

  } catch (error: any) {
    console.error("Error in registerUserForActivity: ", error);
    return { success: false, message: error.message || "Si è verificato un errore durante l'operazione." };
  }
}

export async function confirmActivityParticipation(formData: FormData): Promise<{ success: boolean; message: string }> {
  const logId = formData.get('logId') as string;
  
  if (!logId) {
    return { success: false, message: 'ID del log non fornito.' };
  }

  try {
    const logDocRef = doc(db, 'activityLog', logId);
    
    await runTransaction(db, async (transaction) => {
      const logDoc = await transaction.get(logDocRef);
      if (!logDoc.exists() || logDoc.data().status !== 'pending') {
        throw new Error("Registrazione non trovata o già elaborata.");
      }

      const logData = logDoc.data();
      const userId = logData.userId;
      const pointsToAdd = logData.points || 0;
      const xpToAdd = logData.xp || 0;

      const userDocRef = doc(db, 'users', userId);
      const userDoc = await transaction.get(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("Utente associato non trovato.");
      }

      const currentPoints = userDoc.data().points || 0;
      const currentXp = userDoc.data().xp || 0;
      
      transaction.update(userDocRef, {
        points: currentPoints + pointsToAdd,
        xp: currentXp + xpToAdd
      });

      transaction.update(logDocRef, { status: 'completed' });
    });
    
    revalidatePath('/admin');
    // Consider revalidating user profile pages if needed
    // revalidatePath(`/profile/${userId}`);

    return { success: true, message: 'Partecipazione confermata e punti accreditati!' };

  } catch (error: any) {
    console.error("Error confirming participation: ", error);
    return { success: false, message: error.message || "Si è verificato un errore durante la conferma." };
  }
}


export async function submitCollaborationProposal(formData: FormData): Promise<{ success: boolean; message: string }> {
  const data = Object.fromEntries(formData.entries());

  // Basic validation
  if (!data.collaborationType || !data.email) {
    return { success: false, message: 'Tutti i campi obbligatori devono essere compilati.' };
  }

  try {
    const proposalsCollectionRef = collection(db, 'proposals');
    await addDoc(proposalsCollectionRef, {
      ...data,
      submittedAt: serverTimestamp(),
      status: 'new', // new, reviewed, contacted
    });

    revalidatePath('/admin');

    return { success: true, message: 'La tua proposta è stata inviata con successo. Grazie per il tuo interesse!' };

  } catch (error) {
    console.error("Error submitting proposal: ", error);
    return { success: false, message: "Si è verificato un errore durante l'invio della proposta. Riprova più tardi." };
  }
}

export async function seedDatabaseAction(): Promise<{ success: boolean; message: string }> {
    console.log('Starting database seed...');
    // Seed PROVA1
    try {
      await seedProva1();
    } catch (error) {
      console.error('Error seeding PROVA1:', error);
      return { success: false, message: `Error seeding PROVA1: ${error}` };
    }
    
    // Seed activities
    const activitiesCollection = collection(db, 'activities');
    const activitiesSnapshot = await getDocs(query(activitiesCollection));
    if (activitiesSnapshot.empty) {
        try {
            for (const activity of allActivities) {
                await addDoc(activitiesCollection, activity);
                console.log(`Added activity: ${activity.title}`);
            }
            console.log('Activities seeded successfully!');
        } catch (error: any) {
            console.error('Error seeding activities:', error);
            return { success: false, message: `Error seeding activities: ${error.message}`};
        }
    } else {
        console.log('Activities collection already contains data. Seeding aborted.');
    }

    // Seed partners
    const partnersCollection = collection(db, 'partners');
    const partnersSnapshot = await getDocs(query(partnersCollection));
    if (partnersSnapshot.empty) {
        try {
            for (const partner of partnerLogos) {
                await addDoc(partnersCollection, partner);
                console.log(`Added partner: ${partner.name}`);
            }
            console.log('Partners seeded successfully!');
        } catch (error: any) {
            console.error('Error seeding partners:', error);
            return { success: false, message: `Error seeding partners: ${error.message}`};
        }
    } else {
        console.log('Partners collection already contains data. Seeding aborted.');
    }

    return { success: true, message: 'Database seeding completed (or was not needed).' };
}

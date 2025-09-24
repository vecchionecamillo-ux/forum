'use server';

import { revalidatePath } from 'next/cache';
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';


// This is a temporary solution to initialize Firebase Admin on the server.
// In a real application, you would use the Firebase Admin SDK with a service account.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Ensure Firebase is initialized for server-side operations
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);


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
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return { success: false, message: 'User not found in database.' };
    }
    const currentPoints = userDoc.data().points || 0;
    const newPoints = currentPoints + Number(points);
    await updateDoc(userDocRef, { points: newPoints });

    console.log(`Successfully added ${points} points to user ${userId}.`);

    revalidatePath('/admin');
    revalidatePath(`/profile/${userId}`);

    return { success: true, message: `Successfully added ${points} points.` };

  } catch (error) {
    console.error("Error adding points: ", error);
    return { success: false, message: 'An error occurred while adding points.' };
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

    revalidatePath('/tessera');

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
  const activityType = formData.get('activityType') as 'event' | 'redemption';

  if (!userId || !itemId || !itemTitle || isNaN(itemPoints) || !activityType) {
    return { success: false, message: 'Dati per la registrazione incompleti.' };
  }

  try {
    await runTransaction(db, async (transaction) => {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await transaction.get(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("Utente non trovato.");
      }

      const userData = userDoc.data();
      const currentPoints = userData.points || 0;
      let newPoints = currentPoints;
      
      if (activityType === 'redemption') {
        if (currentPoints < itemPoints) {
          throw new Error("Punti insufficienti per riscattare questo premio.");
        }
        newPoints -= itemPoints;
      } else { // 'event' or other point-earning activities
        newPoints += itemPoints;
      }

      // Update user's points
      transaction.update(userDocRef, { points: newPoints });

      // Log the activity
      const activityLogRef = collection(db, 'activityLog');
      await addDoc(activityLogRef, {
        userId,
        userEmail: userData.email,
        userDisplayName: userData.displayName,
        activityType,
        itemId,
        itemTitle,
        points: itemPoints,
        timestamp: serverTimestamp(),
      });
    });

    revalidatePath('/admin');
    revalidatePath(`/profile/${userId}`);
    revalidatePath('/marketplace');
    revalidatePath(`/news/${itemId}`);

    if (activityType === 'redemption') {
      return { success: true, message: `Premio "${itemTitle}" riscattato con successo!` };
    }
    return { success: true, message: `Registrazione per "${itemTitle}" avvenuta con successo!` };

  } catch (error: any) {
    console.error("Error registering user for activity: ", error);
    return { success: false, message: error.message || "Si è verificato un errore durante l'operazione." };
  }
}

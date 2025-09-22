'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// This is a mock server action. In a real application, you would:
// 1. Authenticate the user to ensure they are a moderator.
// 2. Validate the input (userId, points).
// 3. Update the user's points in your database.
// 4. Handle potential errors.

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

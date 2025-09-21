'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Importiamo l'oggetto auth che hai già configurato

export default function LoginButton() {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Login avvenuto con successo!
      const user = result.user;
      console.log('Login riuscito per:', user.displayName);
      alert(`Benvenuto, ${user.displayName}!`);
    } catch (error: any) {
      // Qui gestiamo gli errori
      console.error('Errore durante il login:', error);
      // Questo ti mostrerà l'errore esatto, se ce n'è ancora uno
      alert(`Errore: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#4285F4',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Accedi con Google
    </button>
  );
}
// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// La tua configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyATQlhb1tAJQX9DRG8R95RvNETW6t5_xEY",
  authDomain: "studio-8678152470-9ee44.firebaseapp.com",
  databaseURL: "https://studio-8678152470-9ee44-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "studio-8678152470-9ee44",
  storageBucket: "studio-8678152470-9ee44.firebasestorage.app",
  messagingSenderId: "740380887001",
  appId: "1:740380887001:web:c8619a656ae9b861c3fbc8"
};

// Inizializza l'app di Firebase con la tua configurazione
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Esporta l'app per usarla in altre parti del tuo sito
export default app;

'use client';
import { db } from '@/lib/firebase';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

// Interfaccia per definire la struttura dei tuoi dati
interface MyData {
  id: string;
  PROVA2: string;
  PROVA3: number;
}

export default function HomePage() {
  const [data, setData] = useState<MyData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMyData() {
      try {
        const querySnapshot = await getDocs(collection(db, "PROVA1"));
        const fetchedData: MyData[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<MyData, 'id'>
        }));
        setData(fetchedData);
      } catch (error) {
        console.error("Errore nel recupero dei dati: ", error);
        setError("Si è verificato un errore durante il recupero dei dati.");
      }
    }
    fetchMyData();
  }, []);

  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8">Dati dalla Collection PROVA1</h1>
      {error && <p className="text-red-500">{error}</p>}
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id} className="mb-4 p-4 border rounded">
              <p><strong>ID Documento:</strong> {item.id}</p>
              <p><strong>PROVA2:</strong> {item.PROVA2}</p>
              <p><strong>PROVA3:</strong> {item.PROVA3}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Caricamento dati...</p>
      )}
    </main>
  );
}

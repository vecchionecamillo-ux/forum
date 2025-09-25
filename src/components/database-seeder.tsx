'use client';

import { useEffect } from 'react';
import { seedDatabaseAction } from '@/app/actions';

/**
 * A client component that triggers the database seeding API endpoint.
 * This should only be used in development environments.
 * It runs only once per browser session.
 */
export function DatabaseSeeder() {
  useEffect(() => {
    // Ensure this only runs in the development environment and on the client side.
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const hasSeeded = sessionStorage.getItem('db_seeded');

      if (!hasSeeded) {
        console.log('Database not seeded in this session. Triggering seed...');
        seedDatabaseAction()
          .then((result) => {
            if (result.success) {
              console.log('Database seeding triggered successfully.');
              sessionStorage.setItem('db_seeded', 'true');
            } else {
              console.error('Failed to trigger database seeding:', result.message);
            }
          })
          .catch((error) => {
            console.error('Error calling seed action:', error);
          });
      } else {
        console.log('Database has already been seeded in this session.');
      }
    }
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // This component does not render anything.
  return null;
}

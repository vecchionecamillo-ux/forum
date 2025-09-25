
import { seedDatabase } from '@/lib/seed';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  // IMPORTANT: This endpoint should only be accessible in a development environment.
  // Add authentication/authorization checks for production environments if needed.
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('This endpoint is only available in development.', { status: 403 });
  }

  try {
    await seedDatabase();
    return new NextResponse('Database seeded successfully!', { status: 200 });
  } catch (error) {
    console.error('Error seeding database:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return new NextResponse(`Error seeding database: ${errorMessage}`, { status: 500 });
  }
}

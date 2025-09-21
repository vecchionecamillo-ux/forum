import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { AuthProvider } from '@/hooks/use-auth';
import { WebGLBackground } from '@/components/layout/webgl-background';

export const metadata: Metadata = {
  title: 'Cantiere Culturale Digitale',
  description: 'Un\'esperienza dove arte digitale e innovazione si incontrano per plasmare il futuro creativo europeo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <WebGLBackground />
        <AuthProvider>
          <Header />
          <div className="relative z-10">
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

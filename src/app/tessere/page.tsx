'use client';

import { useState } from 'react';
import { MembershipForm } from './membership-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TesserePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-4">
      <main className="container mx-auto flex flex-col items-center justify-center max-w-2xl">
        <div className="text-center mb-8 md:mb-12 animate-in fade-in-50 duration-500">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-foreground">
            {formSubmitted ? 'Richiesta Inviata!' : 'Richiedi la Tua Tessera'}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            {formSubmitted
              ? 'Grazie per esserti unito a noi! Riceverai una conferma via email a breve con i dettagli della tua nuova tessera digitale.'
              : 'Compila il modulo sottostante per diventare un membro ufficiale del Cantiere Culturale e iniziare a guadagnare punti.'}
          </p>
        </div>

        {formSubmitted ? (
          <div className="text-center animate-in fade-in-50 duration-500">
            <Button asChild size="lg">
              <Link href="/profile">Vai al Tuo Profilo</Link>
            </Button>
          </div>
        ) : (
          <div className="w-full animate-in fade-in-50 duration-500">
            <MembershipForm onFormSubmit={() => setFormSubmitted(true)} />
          </div>
        )}
      </main>
    </div>
  );
}

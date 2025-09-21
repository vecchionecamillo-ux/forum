import { StyleGuideForm } from './style-guide-form';
import { PenSquare } from 'lucide-react';

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-3xl mx-auto pt-24 pb-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <PenSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            AI Art Style Guide
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Inserisci una domanda o un argomento per ricevere una guida di stile creativa dal nostro assistente AI.
          </p>
        </div>
        <StyleGuideForm />
      </main>
    </div>
  );
}

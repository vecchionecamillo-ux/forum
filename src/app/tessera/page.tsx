import { MembershipForm } from './membership-form';
import { Layers } from 'lucide-react';


export default function TesseraPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-3xl mx-auto pt-24 pb-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Layers className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Crea la tua Tessera Digitale
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Entra a far parte della nostra community. Compila il modulo per ricevere la tua tessera digitale e iniziare ad accumulare punti.
          </p>
        </div>
        <MembershipForm />
      </main>
    </div>
  );
}

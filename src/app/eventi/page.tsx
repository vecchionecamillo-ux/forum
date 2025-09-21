import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EventiPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <main className="w-full max-w-4xl mx-auto pt-24 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Eventi</h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
          Scopri i nostri eventi esclusivi. Partecipa a mostre virtuali, talk, performance in diretta e festival digitali che non troverai da nessun'altra parte.
        </p>
        <div className="mt-8">
          <Button asChild variant="link" className="text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alla Home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

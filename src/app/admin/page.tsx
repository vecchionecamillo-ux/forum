import { ModeratorPanel } from '@/components/admin/moderator-panel';

export default function AdminPage() {
  return (
    <section id="area-riservata" className="min-h-screen flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">Area Riservata</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Dashboard per la gestione dei punti utente. Accessibile solo ai moderatori autorizzati.
          </p>
        </div>
        <div className="mt-12">
          <ModeratorPanel />
        </div>
      </div>
    </section>
  );
}

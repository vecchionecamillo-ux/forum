'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Gem, Loader2, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useTransition, useState } from 'react';
import { registerUserForActivity } from '@/app/actions';
import { cn } from '@/lib/utils';
import { doc, getDoc } from 'firebase/firestore';
import { getFirebaseInstances } from '@/lib/firebase';
import type { Activity } from '@/lib/activities';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [item, setItem] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!slug) return;
    const { db } = getFirebaseInstances();
    // Assuming slugs are unique and used as document IDs
    const docRef = doc(db, 'activities', slug);
    getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        setItem({ id: docSnap.id, ...docSnap.data() } as Activity);
      } else {
        // Handle not found
        router.push('/eventi');
      }
      setLoading(false);
    }).catch(() => {
      // Handle error
      router.push('/eventi');
      setLoading(false);
    });
  }, [slug, router]);


  if (loading || !item) {
    return (
       <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
           <Skeleton className="h-8 w-32 mb-8" />
           <Skeleton className="h-10 w-full mb-4" />
           <Skeleton className="h-6 w-3/4 mb-8" />
           <Skeleton className="aspect-video w-full rounded-lg mb-8" />
           <Skeleton className="h-6 w-full mb-4" />
           <Skeleton className="h-6 w-full mb-4" />
           <Skeleton className="h-6 w-2/3 mb-12" />
           <Skeleton className="h-12 w-40" />
        </div>
      </main>
    );
  }

  const image = item.image; // Placeholder images are now part of the activity data

  const handleAction = () => {
    if (!user) {
      toast({ title: 'Accesso Richiesto', description: 'Devi effettuare l\'accesso per completare questa azione.', variant: 'destructive' });
      router.push('/login');
      return;
    }
    
    if (item.type === 'spend' && userProfile && userProfile.points < (item.points || 0)) {
        toast({ title: "Punti Insufficienti", description: "Non hai abbastanza punti per questo premio.", variant: 'destructive' });
        return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('userId', user.uid);
      formData.append('itemId', item.slug);
      formData.append('itemTitle', item.title);
      formData.append('itemPoints', (item.points || 0).toString());
      formData.append('itemXp', (item.xp || 0).toString());
      formData.append('activityType', item.type === 'spend' ? 'redemption' : 'event');


      const result = await registerUserForActivity(formData);

      if (result.success) {
        toast({ title: 'Successo!', description: result.message });
      } else {
        toast({ title: 'Errore', description: result.message, variant: 'destructive' });
      }
    });
  }

  let backLink = '/';
  if (item.type === 'spend') {
      backLink = '/marketplace';
  } else if (item.category === 'Laboratorio' || item.category === 'Workshop') {
      backLink = '/formazione';
  } else {
      backLink = '/eventi';
  }


  const pointClass = item.type === 'earn' ? 'text-green-500' : 'text-red-500';
  const pointPrefix = item.type === 'earn' ? '+' : '-';
  const pointText = item.type === 'earn' ? 'Guadagni' : 'Costo:';


  return (
    <main className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
            <Button asChild variant="link" className="text-primary pl-0">
                <Link href={backLink}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Torna Indietro
                </Link>
            </Button>
        </div>

        <article className="max-w-4xl mx-auto">
            <header className="mb-8">
                <Badge variant="secondary" className="w-fit mb-4 text-sm">{item.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{item.title}</h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-sm">
                    {item.date && <div className="flex items-center gap-2"><Calendar className="w-4 h-4"/><span>{item.date}</span></div>}
                    {item.time && <div className="flex items-center gap-2"><Clock className="w-4 h-4"/><span>{item.time}</span></div>}
                    {item.points && item.points > 0 && (
                        <div className={cn("flex items-center gap-2 font-semibold", pointClass)}>
                            <Gem className="w-4 h-4"/>
                            <span>{pointText} {pointPrefix}{item.points} Punti</span>
                        </div>
                    )}
                     {item.xp && item.xp > 0 && (
                        <div className="flex items-center gap-2 font-semibold text-blue-500">
                            <Star className="w-4 h-4"/>
                            <span>+{item.xp} XP</span>
                        </div>
                    )}
                </div>
            </header>

            {image && (
                <div className="aspect-video overflow-hidden relative rounded-lg mb-8 shadow-lg">
                    <Image src={image.imageUrl} alt={item.description} fill className="object-cover" data-ai-hint={image.imageHint} />
                </div>
            )}
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead">{item.description}</p>

                <p>Partecipando a questa attività, non solo contribuirai alla community del Cantiere Culturale, ma avrai anche l'opportunità di accumulare punti preziosi per sbloccare ricompense esclusive nel nostro marketplace. È un modo fantastico per crescere, imparare e essere premiato per la tua passione e il tuo impegno.</p>
                
                {item.duration && <p><strong>Durata:</strong> {item.duration}</p>}

                <p>Non perdere questa occasione! Clicca sul pulsante qui sotto per unirti a noi.</p>
            </div>

            <footer className="mt-12">
                <Button size="lg" onClick={handleAction} disabled={isPending || !user}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {item.cta}
                </Button>
                {!user && <p className="text-sm text-muted-foreground mt-2">Devi essere loggato per partecipare.</p>}
            </footer>

        </article>
      </div>
    </main>
  );
}

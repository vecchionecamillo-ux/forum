'use client';

import { newsItems } from '@/app/page-sections/news-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, Calendar, Clock, Award, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { registerUserForActivity } from '@/app/actions';

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const item = newsItems.find((p) => p.slug === params.slug);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (!item) {
    notFound();
  }

  const image = item.image || PlaceHolderImages.find(img => img.id === 'art-placeholder');

  const handleRegistration = () => {
    if (!user) {
      toast({ title: 'Accesso Richiesto', description: 'Devi effettuare l\'accesso per registrarti a questa attività.', variant: 'destructive' });
      router.push('/login');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('userId', user.uid);
      formData.append('itemId', item.slug);
      formData.append('itemTitle', item.title);
      formData.append('itemPoints', (item.points || 0).toString());
      formData.append('activityType', 'event');

      const result = await registerUserForActivity(formData);

      if (result.success) {
        toast({ title: 'Successo!', description: result.message });
      } else {
        toast({ title: 'Errore', description: result.message, variant: 'destructive' });
      }
    });
  }

  return (
    <main className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
            <Button asChild variant="link" className="text-primary pl-0">
                <Link href="/marketplace">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Torna al Marketplace
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
                    {item.points && <div className="flex items-center gap-2"><Award className="w-4 h-4 text-primary"/><span>Guadagna {item.points} punti</span></div>}
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
                <Button size="lg" onClick={handleRegistration} disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {item.cta}
                </Button>
            </footer>

        </article>
      </div>
    </main>
  );
}

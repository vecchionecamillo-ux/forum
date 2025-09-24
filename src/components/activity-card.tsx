'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Loader2, Star } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { registerUserForActivity } from '@/app/actions';
import type { Activity } from '@/lib/activities';
import { cn } from '@/lib/utils';

export function ActivityCard({ item }: { item: Activity }) {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleRedemption = () => {
    if (!user || !userProfile) {
      toast({
        title: 'Accesso Richiesto',
        description: 'Devi effettuare l\'accesso per riscattare i premi.',
        variant: 'destructive',
      });
      return;
    }
    if ((userProfile.points || 0) < (item.points || 0)) {
      toast({
        title: 'Punti Insufficienti',
        description: 'Non hai abbastanza punti per questo premio.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('userId', user.uid);
      formData.append('itemId', item.slug);
      formData.append('itemTitle', item.title);
      formData.append('itemPoints', (item.points || 0).toString());
      formData.append('itemXp', (item.xp || 0).toString());
      formData.append('activityType', 'redemption');

      const result = await registerUserForActivity(formData);
      if (result.success) {
        toast({ title: 'Successo!', description: result.message });
      } else {
        toast({
          title: 'Errore',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  };

  const pointBadgeClass =
    item.type === 'earn'
      ? 'bg-green-500 text-white'
      : 'bg-destructive text-destructive-foreground';

  return (
    <Card
      key={item.slug}
      className="overflow-hidden flex flex-col h-full bg-card/80 backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="aspect-video overflow-hidden relative">
        {item.image && (
          <Image
            src={item.image.imageUrl}
            alt={item.description}
            width={600}
            height={400}
            className="w-full h-full object-cover"
            data-ai-hint={item.image.imageHint}
          />
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2 items-end">
            {item.points && item.points > 0 && (
              <Badge
                className={cn(
                  'text-md shadow-lg',
                  pointBadgeClass
                )}
              >
                {item.type === 'earn' ? '+' : '-'}
                {item.points} Punti
              </Badge>
            )}
             {item.xp && item.xp > 0 && (
              <Badge
                className={cn(
                  'text-md shadow-lg bg-blue-500 text-white'
                )}
              >
               <Star className="w-3 h-3 mr-1"/> +{item.xp} XP
              </Badge>
            )}
        </div>
      </div>
      <CardHeader>
        <Badge variant="secondary" className="w-fit mb-2">
          {item.category}
        </Badge>
        <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base">{item.description}</CardDescription>
      </CardContent>
      <CardFooter>
        {item.type === 'earn' ? (
          <Button asChild variant="link" className="text-primary p-0">
            <Link href={item.link || '#'}>
              {item.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={handleRedemption}
            disabled={isPending || !user}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {item.cta}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

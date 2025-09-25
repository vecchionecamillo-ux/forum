
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { getFirebaseInstances } from '@/lib/firebase';
import type { Activity } from '@/lib/activities';
import { Skeleton } from '@/components/ui/skeleton';


export function PlatformSection() {
    const [platformItems, setPlatformItems] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { db } = getFirebaseInstances();
        // This query fetches 3 activities marked as "featured" for the homepage platform section.
        const q = query(collection(db, 'activities'), where('featured', '==', true));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
            setPlatformItems(items);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching featured items:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


  return (
    <ScrollRevealWrapper id="piattaforma">
        <section className="min-h-screen flex flex-col justify-center items-center px-4 py-24 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground">Piattaforma</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
                        Un ecosistema integrato per far crescere la tua passione e le tue competenze.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {loading ? (
                    <>
                        <Skeleton className="h-96 w-full" />
                        <Skeleton className="h-96 w-full" />
                        <Skeleton className="h-96 w-full" />
                    </>
                ) : (
                    platformItems.map((item, index) => (
                        <ScrollRevealWrapper key={item.id} className={`animation-delay-${index * 150}`}>
                            <Card className="overflow-hidden flex flex-col h-full bg-transparent border-0 shadow-none">
                            {item.image && (
                                <div className="aspect-video overflow-hidden rounded-lg">
                                <Image src={item.image.imageUrl} alt={item.description} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={item.image.imageHint} />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-grow">
                                <CardDescription className="text-base flex-grow mb-4">{item.description}</CardDescription>
                                <Button asChild variant="link" className="text-primary p-0 mt-auto self-start">
                                <Link href={item.link || '#'}>
                                    Scopri di più
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                                </Button>
                            </CardContent>
                            </Card>
                        </ScrollRevealWrapper>
                    ))
                )}
                </div>
            </div>
        </section>
    </ScrollRevealWrapper>
  );
}

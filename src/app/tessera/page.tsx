'use client';

import { MembershipForm } from './membership-form';
import { Layers, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollRevealWrapper } from '@/components/scroll-reveal';


const benefits = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      text: 'Accesso a tutte le attività esclusive del Forum dei Giovani.'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      text: 'Un profilo personale con un sistema di punti da usare come buoni o voucher presso i nostri partner.'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      text: 'Convenzioni e sconti esclusivi con tutta la rete di partner del Cantiere Culturale.'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      text: 'Accesso al giornalino digitale con news, approfondimenti e opportunità in anteprima.'
    },
];

export default function TesseraPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <ScrollRevealWrapper>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Layers className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              La Tessera del Forum dei Giovani
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
              Entra a far parte della nostra community. La tessera è gratuita e ti dà accesso a un mondo di vantaggi e opportunità per far crescere la tua passione e le tue competenze.
            </p>
          </ScrollRevealWrapper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollRevealWrapper className="lg:pr-8">
                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-2xl">I Vantaggi della tua Tessera</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <span className="mt-1">{benefit.icon}</span>
                                    <p className="text-base text-foreground/90">{benefit.text}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper className="animation-delay-300">
                <div>
                     <h2 className="text-2xl font-bold text-center mb-6">Richiedi la tua Tessera Ora</h2>
                    <MembershipForm />
                </div>
            </ScrollRevealWrapper>
        </div>
      </main>
    </div>
  );
}

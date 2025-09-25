'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export type Resource = {
  name: string;
  description: string;
  examples: string[];
  link: string;
};

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-300">
      <CardHeader>
        <CardTitle>{resource.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="mb-4">{resource.description}</CardDescription>
        <ul className="space-y-2 text-sm text-muted-foreground">
            {resource.examples.map((example) => (
                <li key={example} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{example}</span>
                </li>
            ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="text-primary p-0">
          <Link href={resource.link} target="_blank" rel="noopener noreferrer">
            Visita la piattaforma
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

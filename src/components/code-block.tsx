
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CodeBlock({ prompt }: { prompt: string }) {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.trim());
    setHasCopied(true);
    toast({ title: 'Copiato!', description: 'Il Master Prompt è stato copiato negli appunti.' });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Card className="shadow-lg bg-muted/50">
        <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Project Blueprint</h2>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                {hasCopied ? <Check className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
                <span className="sr-only">Copia Prompt</span>
            </Button>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap p-4 bg-background/50 rounded-md text-sm leading-relaxed overflow-x-auto">
          <code>{prompt.trim()}</code>
        </pre>
      </CardContent>
    </Card>
  );
}

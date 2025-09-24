'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getSiteInfo, type SiteInfoOutput } from '@/ai/flows/site-info-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bot, Sparkles } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
      {pending ? (
        <>
          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
          In elaborazione...
        </>
      ) : (
        'Chiedi all\'Assistente'
      )}
    </Button>
  );
}

export function AssistantForm() {
  const [result, setResult] = useState<SiteInfoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setResult(null);
    setError(null);

    const query = formData.get('query') as string;
    if (!query) {
      setError('Per favore, inserisci una domanda.');
      return;
    }

    try {
      const response = await getSiteInfo({ query });
      setResult(response);
    } catch (e) {
      setError('Si è verificato un errore durante la richiesta. Riprova.');
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <form action={handleSubmit} className="space-y-4">
            <Textarea
              name="query"
              placeholder="Es: 'Come guadagno punti?' o 'Cos'è la tessera digitale?'"
              className="min-h-[120px] text-base"
              rows={5}
            />
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Bot className="mr-2 h-6 w-6" />
              Risposta dell'Assistente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 whitespace-pre-wrap">
              {result.response}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

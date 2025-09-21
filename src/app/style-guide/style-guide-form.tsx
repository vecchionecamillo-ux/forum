'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getArtStyleGuide, type ArtStyleGuideOutput } from '@/ai/flows/ai-art-style-guide';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bot, Sparkles } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
          Generazione...
        </>
      ) : (
        'Ottieni Guida'
      )}
    </Button>
  );
}

export function StyleGuideForm() {
  const [result, setResult] = useState<ArtStyleGuideOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setResult(null);
    setError(null);

    const query = formData.get('query') as string;
    if (!query) {
      setError('Please enter a query.');
      return;
    }

    try {
      const response = await getArtStyleGuide({ query });
      setResult(response);
    } catch (e) {
      setError('An error occurred while fetching the style guide. Please try again.');
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-lg border-white/10">
        <CardContent className="p-6">
          <form action={handleSubmit} className="space-y-4">
            <Textarea
              name="query"
              placeholder="Es: 'Dammi consigli per uno stile pittorico cyberpunk' o 'Quali sono gli elementi chiave dell'arte espressionista?'"
              className="min-h-[120px] bg-background/50 border-white/20 text-base"
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
        <Card className="bg-card/50 backdrop-blur-lg border-white/10 animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center text-accent">
              <Bot className="mr-2 h-6 w-6" />
              Guida di Stile AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none text-foreground/90 whitespace-pre-wrap">
              {result.guidance}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

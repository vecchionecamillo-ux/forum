'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitCollaborationProposal } from '@/app/actions';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri.'),
  sector: z.string().min(2, 'Il settore deve contenere almeno 2 caratteri.'),
  email: z.string().email('Inserisci un indirizzo email valido.'),
  message: z.string().min(10, 'Il messaggio deve contenere almeno 10 caratteri.').max(1000, 'Il messaggio non può superare i 1000 caratteri.'),
});

interface InterestFormProps {
  type: 'partner' | 'sponsor';
}

export function InterestForm({ type }: InterestFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      sector: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('collaborationType', type);
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await submitCollaborationProposal(formData);
      if (result.success) {
        toast({ title: 'Proposta Inviata!', description: result.message });
        form.reset();
      } else {
        toast({ title: 'Errore', description: result.message, variant: 'destructive' });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-t pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Azienda / Referente</FormLabel>
                <FormControl>
                  <Input placeholder="Es: Azienda S.p.A." {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Settore</FormLabel>
                <FormControl>
                  <Input placeholder="Es: Arte, Tecnologia, Food..." {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email di Contatto</FormLabel>
              <FormControl>
                <Input placeholder="info@azienda.com" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breve messaggio (opzionale)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Vorremmo discutere di una potenziale partnership..."
                  className="min-h-[120px]"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Invio in corso...
            </>
          ) : (
            'Invia Manifestazione di Interesse'
          )}
        </Button>
      </form>
    </Form>
  );
}

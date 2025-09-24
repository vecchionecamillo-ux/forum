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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri.'),
  lastName: z.string().min(2, 'Il cognome deve contenere almeno 2 caratteri.'),
  email: z.string().email('Inserisci un indirizzo email valido.'),
  collaborationType: z.enum(['volunteer', 'partner', 'sponsor'], {
    required_error: 'Seleziona un tipo di collaborazione.',
  }),
  message: z.string().min(10, 'Il messaggio deve contenere almeno 10 caratteri.').max(1000, 'Il messaggio non può superare i 1000 caratteri.'),
});

export function CollaborationForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Mario" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cognome</FormLabel>
                <FormControl>
                  <Input placeholder="Rossi" {...field} disabled={isPending} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="mario.rossi@email.com" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collaborationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo di Collaborazione</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona un'opzione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="volunteer">Voglio diventare un volontario</SelectItem>
                  <SelectItem value="partner">Voglio proporre una partnership</SelectItem>
                  <SelectItem value="sponsor">Sono interessato a sponsorizzare</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>La tua proposta o messaggio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrivi la tua idea, le tue competenze o come vorresti contribuire..."
                  className="min-h-[150px]"
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
            'Invia Proposta'
          )}
        </Button>
      </form>
    </Form>
  );
}

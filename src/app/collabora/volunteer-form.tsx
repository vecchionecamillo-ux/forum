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
  firstName: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri.'),
  lastName: z.string().min(2, 'Il cognome deve contenere almeno 2 caratteri.'),
  email: z.string().email('Inserisci un indirizzo email valido.'),
  message: z.string().min(10, 'Il messaggio deve contenere almeno 10 caratteri.').max(1000, 'Il messaggio non può superare i 1000 caratteri.'),
});

export function VolunteerForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('collaborationType', 'volunteer');
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await submitCollaborationProposal(formData);
      if (result.success) {
        toast({ title: 'Candidatura Inviata!', description: result.message });
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
            name="firstName"
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parlaci di te</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrivi perché vuoi diventare un volontario, le tue competenze o come vorresti contribuire..."
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
            'Invia Candidatura'
          )}
        </Button>
      </form>
    </Form>
  );
}

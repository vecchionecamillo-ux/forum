'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createMembershipCard } from '@/app/actions';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'Il nome deve contenere almeno 2 caratteri.' }),
  lastName: z.string().min(2, { message: 'Il cognome deve contenere almeno 2 caratteri.' }),
  email: z.string().email({ message: 'Inserisci un indirizzo email valido.' }),
  birthDate: z.date({
    required_error: 'La data di nascita è obbligatoria.',
  }),
  country: z.string().min(2, { message: 'Il paese di residenza è richiesto.' }),
  profession: z.string().optional(),
  isStudent: z.boolean().default(false),
});

type MembershipFormProps = {
  onFormSubmit: () => void;
};

export function MembershipForm({ onFormSubmit }: MembershipFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      profession: '',
      isStudent: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         if (value instanceof Date) {
            formData.append(key, value.toISOString());
        } else if (typeof value === 'boolean') {
            formData.append(key, value.toString());
        } else if (value) {
            formData.append(key, value);
        }
      });

      const result = await createMembershipCard(formData);
      if (result.success) {
        toast({ title: 'Richiesta Inviata!', description: result.message });
        form.reset();
        onFormSubmit();
      } else {
        toast({ title: 'Errore', description: result.message, variant: 'destructive' });
      }
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Data di Nascita</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                disabled={isPending}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Seleziona una data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Paese di Residenza</FormLabel>
                        <FormControl>
                        <Input placeholder="Italia" {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
             <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Professione (Opzionale)</FormLabel>
                    <FormControl>
                    <Input placeholder="Studente, Artista, Sviluppatore..." {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="isStudent"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                        <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                        Sei uno studente?
                        </FormLabel>
                        <FormDescription>
                        Gli studenti potrebbero avere accesso a sconti e opportunità dedicate.
                        </FormDescription>
                    </div>
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
                'Invia Richiesta'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

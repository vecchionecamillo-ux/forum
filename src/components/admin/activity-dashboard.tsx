'use client';

import { useEffect, useState, useMemo } from 'react';
import { collection, onSnapshot, query, where, type Firestore } from 'firebase/firestore';
import { getFirebaseInstances } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Ticket, Gift, Users } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type ActivityLog = {
  id: string;
  userId: string;
  userEmail: string;
  userDisplayName: string;
  activityType: 'event' | 'redemption';
  itemId: string;
  itemTitle: string;
  points: number;
  timestamp: { seconds: number, nanoseconds: number };
};

export function ActivityDashboard() {
  const [db, setDb] = useState<Firestore | null>(null);
  const { toast } = useToast();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'event' | 'redemption'>('all');

  useEffect(() => {
    const { db: firestoreDb } = getFirebaseInstances();
    setDb(firestoreDb);
  }, []);

  useEffect(() => {
    if (!db) return;

    const activityColRef = collection(db, 'activityLog');
    const unsubscribe = onSnapshot(activityColRef, (snapshot) => {
      const activityList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ActivityLog));
      setActivities(activityList);
    }, (error) => {
      console.error("Failed to subscribe to activity updates:", error);
      toast({ title: 'Errore di Sincronizzazione', description: 'Impossibile caricare le attività in tempo reale.', variant: 'destructive' });
    });

    return () => unsubscribe();
  }, [db, toast]);

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const searchLower = searchFilter.toLowerCase();
      const matchesSearch =
        activity.userDisplayName.toLowerCase().includes(searchLower) ||
        activity.userEmail.toLowerCase().includes(searchLower) ||
        activity.itemTitle.toLowerCase().includes(searchLower);
      
      const matchesType = typeFilter === 'all' || activity.activityType === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [activities, searchFilter, typeFilter]);

  const aggregatedData = useMemo(() => {
    const data = filteredActivities.reduce((acc, activity) => {
        if (!acc[activity.itemId]) {
            acc[activity.itemId] = {
                title: activity.itemTitle,
                type: activity.activityType,
                count: 0,
                participants: []
            };
        }
        acc[activity.itemId].count++;
        acc[activity.itemId].participants.push({
            name: activity.userDisplayName,
            email: activity.userEmail,
            date: new Date(activity.timestamp.seconds * 1000).toLocaleString()
        });
        return acc;
    }, {} as Record<string, {title: string, type: string, count: number, participants: {name: string, email: string, date: string}[]}>);
    
    return Object.values(data).sort((a,b) => b.count - a.count);
  }, [filteredActivities]);

  const totalEvents = useMemo(() => new Set(activities.filter(a => a.activityType === 'event').map(a => a.itemId)).size, [activities]);
  const totalRedemptions = useMemo(() => activities.filter(a => a.activityType === 'redemption').length, [activities]);
  const totalParticipants = useMemo(() => activities.filter(a => a.activityType === 'event').length, [activities]);

  return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventi Unici</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEvents}</div>
              <p className="text-xs text-muted-foreground">Numero di eventi con almeno un iscritto.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Iscrizioni Totali</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalParticipants}</div>
               <p className="text-xs text-muted-foreground">Numero totale di partecipazioni agli eventi.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premi Riscattati</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRedemptions}</div>
              <p className="text-xs text-muted-foreground">Numero totale di premi riscattati con i punti.</p>
            </CardContent>
          </Card>
        </div>


        <Card>
            <CardHeader>
                <CardTitle>Log Attività e Iscrizioni</CardTitle>
                <CardDescription>Visualizza le iscrizioni agli eventi e i premi riscattati dagli utenti.</CardDescription>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cerca per nome, email o attività..."
                            className="w-full pl-8"
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                        />
                    </div>
                    <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as any)}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filtra per tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tutte le attività</SelectItem>
                            <SelectItem value="event">Eventi/Workshop</SelectItem>
                            <SelectItem value="redemption">Riscatto Premi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                {filteredActivities.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                        {aggregatedData.map(item => (
                            <AccordionItem value={item.title} key={item.title}>
                                <AccordionTrigger>
                                    <div className="flex justify-between items-center w-full pr-4">
                                      <div className="text-left">
                                        <Badge variant={item.type === 'event' ? 'secondary' : 'destructive'} className="mb-1">{item.type === 'event' ? 'Evento' : 'Premio'}</Badge>
                                        <p className="font-semibold">{item.title}</p>
                                      </div>
                                       <div className="text-right">
                                            <p className="font-semibold text-lg">{item.count}</p>
                                            <p className="text-sm text-muted-foreground">{item.type === 'event' ? 'Iscritti' : 'Riscatti'}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nome</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Data Registrazione</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {item.participants.map(p => (
                                                <TableRow key={p.email}>
                                                    <TableCell>{p.name}</TableCell>
                                                    <TableCell>{p.email}</TableCell>
                                                    <TableCell>{p.date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="text-center text-muted-foreground py-8">Nessuna attività trovata con i filtri attuali.</div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}

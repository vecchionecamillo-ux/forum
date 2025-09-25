'use client';

import { useEffect, useState, useMemo, useTransition } from 'react';
import { collection, onSnapshot, query, type Firestore, orderBy } from 'firebase/firestore';
import { getFirebaseInstances } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Gift, CheckCircle, Clock } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '../ui/button';
import { confirmActivityParticipation } from '@/app/actions';

type ActivityLog = {
  id: string;
  userId: string;
  userEmail: string;
  userDisplayName: string;
  activityType: 'event' | 'redemption';
  itemId: string;
  itemTitle: string;
  points: number;
  xp: number;
  timestamp: { seconds: number, nanoseconds: number };
  status: 'pending' | 'completed' | 'cancelled';
};

function ConfirmButton({ logId, disabled }: { logId: string; disabled: boolean }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleConfirm = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('logId', logId);
      const result = await confirmActivityParticipation(formData);
      if (result.success) {
        toast({ title: 'Successo', description: result.message });
      } else {
        toast({ title: 'Errore', description: result.message, variant: 'destructive' });
      }
    });
  };
  
  return (
    <Button size="sm" onClick={handleConfirm} disabled={disabled || isPending}>
      {isPending ? 'Confermo...' : 'Conferma'}
    </Button>
  );
}


export function ActivityDashboard() {
  const [db, setDb] = useState<Firestore | null>(null);
  const { toast } = useToast();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('pending');

  useEffect(() => {
    const { db: firestoreDb } = getFirebaseInstances();
    setDb(firestoreDb);
  }, []);

  useEffect(() => {
    if (!db) return;

    const activityColRef = collection(db, 'activityLog');
    const q = query(activityColRef, orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
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
      if (activity.activityType !== 'event') return false; // Only show events/confirmations

      const searchLower = searchFilter.toLowerCase();
      const matchesSearch =
        activity.userDisplayName.toLowerCase().includes(searchLower) ||
        activity.userEmail.toLowerCase().includes(searchLower) ||
        activity.itemTitle.toLowerCase().includes(searchLower);
      
      const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [activities, searchFilter, statusFilter]);

  const aggregatedData = useMemo(() => {
    const data = filteredActivities.reduce((acc, activity) => {
        if (!acc[activity.itemId]) {
            acc[activity.itemId] = {
                title: activity.itemTitle,
                participants: []
            };
        }
        acc[activity.itemId].participants.push({
            logId: activity.id,
            name: activity.userDisplayName,
            email: activity.userEmail,
            date: new Date(activity.timestamp.seconds * 1000).toLocaleString(),
            status: activity.status
        });
        return acc;
    }, {} as Record<string, {title: string, participants: {logId: string, name: string, email: string, date: string, status: ActivityLog['status']}[]}>);
    
    return Object.values(data).sort((a,b) => b.participants.length - a.participants.length);
  }, [filteredActivities]);

  const totalPending = useMemo(() => activities.filter(a => a.activityType === 'event' && a.status === 'pending').length, [activities]);
  const totalCompleted = useMemo(() => activities.filter(a => a.activityType === 'event' && a.status === 'completed').length, [activities]);
  const totalRedemptions = useMemo(() => activities.filter(a => a.activityType === 'redemption').length, [activities]);


  return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Iscrizioni da Confermare</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPending}</div>
              <p className="text-xs text-muted-foreground">Partecipazioni in attesa di approvazione.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partecipazioni Confermate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCompleted}</div>
               <p className="text-xs text-muted-foreground">Numero totale di partecipazioni approvate.</p>
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
                <CardTitle>Conferma Partecipazione Eventi</CardTitle>
                <CardDescription>Approva la partecipazione degli utenti agli eventi per accreditare Punti e XP.</CardDescription>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cerca per nome, email o evento..."
                            className="w-full pl-8"
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filtra per stato" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tutti</SelectItem>
                            <SelectItem value="pending">In Sospeso</SelectItem>
                            <SelectItem value="completed">Completati</SelectItem>
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
                                        <p className="font-semibold">{item.title}</p>
                                      </div>
                                       <div className="text-right">
                                            <p className="font-semibold text-lg">{item.participants.length}</p>
                                            <p className="text-sm text-muted-foreground">Iscritti</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nome</TableHead>
                                                <TableHead>Data Iscrizione</TableHead>
                                                <TableHead>Stato</TableHead>
                                                <TableHead className="text-right">Azione</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {item.participants.map(p => (
                                                <TableRow key={p.logId}>
                                                    <TableCell className="font-medium">{p.name}<br/><span className="text-xs text-muted-foreground">{p.email}</span></TableCell>
                                                    <TableCell>{p.date}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={p.status === 'pending' ? 'secondary' : 'default'} className={p.status === 'completed' ? 'bg-green-500' : ''}>
                                                            {p.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {p.status === 'pending' && <ConfirmButton logId={p.logId} disabled={p.status !== 'pending'} />}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="text-center text-muted-foreground py-8">Nessuna iscrizione trovata con i filtri attuali.</div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}

    
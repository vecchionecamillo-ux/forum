'use client';

import { useState, useMemo } from 'react';
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Activity } from '@/lib/activities';

interface EventCalendarProps {
  events: Activity[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const firstDayOfCalendar = startOfWeek(firstDayOfMonth, { locale: it });
  const lastDayOfCalendar = endOfWeek(lastDayOfMonth, { locale: it });
  const days = eachDayOfInterval({ start: firstDayOfCalendar, end: lastDayOfCalendar });
  
  const weekDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Activity[]>();
    events.forEach(event => {
      if (event.date) {
        const dateStr = format(parseISO(event.date), 'yyyy-MM-dd');
        if (!map.has(dateStr)) {
          map.set(dateStr, []);
        }
        map.get(dateStr)?.push(event);
      }
    });
    return map;
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <TooltipProvider>
      <div className="bg-card p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: it })}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground">
          {weekDays.map(day => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map(day => {
            const dayStr = format(day, 'yyyy-MM-dd');
            const dayEvents = eventsByDate.get(dayStr);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentMonth);

            return (
              <Tooltip key={day.toString()} delayDuration={100}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'relative h-20 sm:h-24 rounded-md border p-2 text-left transition-colors',
                      !isCurrentMonth && 'bg-muted/50 text-muted-foreground',
                      isCurrentMonth && 'bg-background hover:bg-accent',
                      isToday && 'border-2 border-primary'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')} className="font-semibold">
                      {format(day, 'd')}
                    </time>
                    {dayEvents && (
                      <div className="absolute bottom-1 left-1.5 right-1.5 flex flex-col gap-1">
                        {dayEvents.slice(0, 3).map((event, i) => (
                           <div key={i} className="w-full h-1.5 rounded-full bg-primary/80"></div>
                        ))}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                {dayEvents && dayEvents.length > 0 && (
                   <TooltipContent>
                     <div className="space-y-2 p-2">
                        {dayEvents.map(event => (
                            <div key={event.slug}>
                                <p className="font-bold">{event.title}</p>
                                {event.time && <p className="text-sm text-muted-foreground">{event.time}</p>}
                            </div>
                        ))}
                     </div>
                   </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}

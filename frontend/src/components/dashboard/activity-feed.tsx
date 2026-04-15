'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, UserPlus, Star, ArrowUpRight } from 'lucide-react';
import { useContacts } from '@/hooks/use-contacts';
import { format } from 'date-fns';

const activityIcons: Record<string, any> = {
  message: MessageSquare,
  new_lead: UserPlus,
  stage_change: Star,
};

export default function ActivityFeed() {
  const { data: contacts = [] } = useContacts();

  // Creating a mock feed based on existing contacts to show high-impact UI
  const activities = [
    {
      id: 1,
      type: 'message',
      user: contacts[0]?.name || 'Alejandro Ortiz',
      content: 'Respondió a tu propuesta sobre la integración del Q3.',
      time: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      status: 'unread',
    },
    {
      id: 2,
      type: 'new_lead',
      user: 'Sistema',
      content: 'Nuevo prospecto capturado desde la Página de Inicio: Sara Castro.',
      time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      status: 'read',
    },
    {
      id: 3,
      type: 'stage_change',
      user: contacts[1]?.name || 'Marcos Aurelio',
      content: 'Movido a la etapa de "Cliente" tras la firma del contrato.',
      time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      status: 'read',
    },
  ];

  return (
    <Card className="bg-transparent border-none shadow-none h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
          Historial de Actividad
        </CardTitle>
        <button className="text-[10px] text-primary hover:underline flex items-center gap-1 font-medium">
          Ver Todo <ArrowUpRight className="h-3 w-3" />
        </button>
      </CardHeader>
      <CardContent className="pt-4 space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border/10">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          return (
            <div key={activity.id} className="flex gap-4 relative">
              <div className="shrink-0 relative">
                <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center border border-border/10">
                  <Icon className="h-4 w-4 text-primary opacity-80" />
                </div>
                {activity.status === 'unread' && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold text-foreground/90">{activity.user}</p>
                  <span className="text-[10px] text-muted-foreground">
                    {format(new Date(activity.time), 'HH:mm')}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {activity.content}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

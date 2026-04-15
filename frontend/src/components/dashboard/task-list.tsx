'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Task {
  id: number;
  title: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  contactName?: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Llamar a Rosa Sánchez para demo', dueDate: new Date(), priority: 'high', completed: false, contactName: 'Rosa Sánchez' },
    { id: 2, title: 'Enviar propuesta Q3 a Juan Quispe', dueDate: new Date(Date.now() + 86400000), priority: 'medium', completed: false, contactName: 'Juan Quispe' },
    { id: 3, title: 'Revisar contrato de Ana Flores', dueDate: new Date(Date.now() - 3600000), priority: 'high', completed: true, contactName: 'Ana Flores' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Tareas y Recordatorios</h3>
          <p className="text-[10px] text-muted-foreground mt-1">Sigue el ritmo de tus negociaciones activas.</p>
        </div>
        <button className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3">
        {tasks.map((task) => (
          <Card key={task.id} className={cn(
            "bg-card/40 backdrop-blur-xl border-border/10 transition-all duration-300 group hover:bg-card/60",
            task.completed && "opacity-60 bg-muted/5 border-transparent shadow-none"
          )}>
            <CardContent className="p-4 flex items-center gap-4">
              <Checkbox 
                checked={task.completed} 
                onCheckedChange={() => toggleTask(task.id)}
                className="border-border/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn(
                    "text-xs font-bold truncate tracking-tight transition-all",
                    task.completed ? "line-through text-muted-foreground" : "text-foreground"
                  )}>
                    {task.title}
                  </p>
                  <Badge variant="outline" className={cn(
                    "text-[8px] h-4 px-1 leading-none border-none font-black uppercase tracking-tighter",
                    task.priority === 'high' && "bg-red-500/10 text-red-500",
                    task.priority === 'medium' && "bg-amber-500/10 text-amber-500",
                    task.priority === 'low' && "bg-blue-500/10 text-blue-500"
                  )}>
                    {task.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3 mt-1.5 overflow-hidden">
                  <div className="flex items-center gap-1 text-[9px] text-muted-foreground font-medium uppercase tracking-tight">
                    <Calendar className="h-3 w-3 opacity-50" />
                    {format(task.dueDate, 'dd MMM', { locale: es })}
                  </div>
                  {task.contactName && (
                    <div className="flex items-center gap-1 text-[9px] text-primary/60 font-bold uppercase tracking-tighter">
                      <CheckCircle2 className="h-3 w-3 opacity-50" />
                      {task.contactName}
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground/40 hover:text-destructive transition-all hover:bg-destructive/10 rounded-md"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </CardContent>
          </Card>
        ))}

        {tasks.length === 0 && (
          <div className="py-12 border-2 border-dashed border-border/5 rounded-3xl flex flex-col items-center justify-center bg-muted/5">
             <CheckCircle2 className="h-8 w-8 text-muted-foreground/20 mb-3" />
             <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground/40 text-center">Todo al día</p>
          </div>
        )}
      </div>
    </div>
  );
}

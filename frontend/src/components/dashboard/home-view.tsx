'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import TaskList from '@/components/dashboard/task-list';
import ActivityFeed from '@/components/dashboard/activity-feed';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CalendarDays, 
  Bell, 
  ListTodo, 
  TrendingUp, 
  Users, 
  Lightbulb, 
  ArrowUpRight,
  Target,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useContacts } from '@/hooks/use-contacts';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function HomeView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data: contacts = [] } = useContacts();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-20 max-w-[1600px] mx-auto"
    >
      {/* Enhanced Welcome Header */}
      <motion.div variants={item} className="relative overflow-hidden rounded-[32px] bg-card/20 border border-border/5 p-8 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
              <Sparkles className="h-3 w-3" /> Dashboard Ejecutivo
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none">
              {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40 text-glow-sm">Lucero.</span>
            </h2>
            <p className="text-sm text-muted-foreground font-medium max-w-md">
              Hoy es <span className="text-foreground">{format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}</span>. Tienes una agenda activa para hoy.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-4 w-full sm:w-auto">
            <HeaderStat icon={Users} label="Prospectos" value={contacts.length} trend="+12" />
            <HeaderStat icon={Target} label="Conversión" value="24%" trend="+2.4%" />
            <HeaderStat icon={Clock} label="Disponibilidad" value="99.9%" />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Column (8/12) */}
        <div className="lg:col-span-8 space-y-8">
          {/* CRM Coach Advice Section */}
          <motion.div variants={item}>
            <CRMCoach />
          </motion.div>

          {/* Tasks Section */}
          <motion.div variants={item} className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <ListTodo className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest">Tus Objetivos</h3>
                    <p className="text-[10px] text-muted-foreground">Prioridades seleccionadas para hoy</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-muted-foreground">Progreso</span>
                  <div className="w-24 h-1.5 bg-muted/20 rounded-full overflow-hidden">
                    <div className="w-[66%] h-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  </div>
               </div>
            </div>
            <div className="bg-card/40 backdrop-blur-xl rounded-[32px] p-2 border border-border/10 shadow-xl overflow-hidden">
               <TaskList />
            </div>
          </motion.div>
        </div>

        {/* Side Column (4/12) */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div variants={item}>
            <Card className="bg-card/40 backdrop-blur-xl border-border/10 shadow-3xl rounded-[32px] border-none overflow-hidden h-fit">
              <div className="p-6 border-b border-border/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Calendario</h3>
                </div>
                <button className="text-[10px] font-bold text-primary hover:underline">Ver todo</button>
              </div>
              <CardContent className="p-4 flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-xl border-none p-0 scale-105"
                  locale={es}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Bell className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest">Línea de Tiempo</h3>
              </div>
            </div>
            <div className="bg-card/40 backdrop-blur-xl rounded-[32px] p-2 border border-border/10 shadow-xl h-[500px] overflow-hidden">
               <ActivityFeed />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function CRMCoach() {
  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 border-none shadow-2xl shadow-primary/20 rounded-[32px] overflow-hidden text-white relative group">
       <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
         <Lightbulb className="h-32 w-32" />
       </div>
       <CardContent className="p-8 lg:p-10 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <TrendingUp className="h-8 w-8 text-white" />
             </div>
             <div className="space-y-4 max-w-xl">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[2px] opacity-70 mb-1">CRM Coach - Análisis</p>
                   <h3 className="text-2xl font-bold leading-tight tracking-tight">
                     Optimización de Seguimiento: <span className="opacity-80">Detectamos 3 leads de alta prioridad que no han sido contactados en 48 horas.</span>
                   </h3>
                </div>
                <p className="text-sm opacity-70 leading-relaxed italic">
                  "El tiempo de respuesta es clave. Un seguimiento en menos de 2 horas aumenta la probabilidad de cierre en un 35%."
                </p>
                <div className="flex gap-4 pt-2">
                   <button className="px-6 py-2.5 bg-white text-primary text-xs font-bold rounded-xl hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2">
                      Ver Leads <ArrowUpRight className="h-3.5 w-3.5" />
                   </button>
                   <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/10">
                      Ignorar por ahora
                   </button>
                </div>
             </div>
          </div>
       </CardContent>
    </Card>
  );
}

function HeaderStat({ icon: Icon, label, value, trend }: any) {
  return (
    <div className="flex items-center gap-4 bg-background/40 backdrop-blur-xl p-4 rounded-3xl border border-border/10 flex-1 min-w-[140px] shadow-sm hover:shadow-md transition-shadow">
      <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
         <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
         <div className="flex items-center gap-1.5">
           <p className="text-base font-black tracking-tight">{value}</p>
           {trend && <span className="text-[8px] text-emerald-500 font-black tracking-tight">{trend}</span>}
         </div>
         <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mt-0.5 truncate">{label}</p>
      </div>
    </div>
  );
}

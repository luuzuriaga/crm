'use client';

import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { useContacts } from '@/hooks/use-contacts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Users, Target, Zap, ArrowUpRight } from 'lucide-react';
import { format, parseISO, startOfDay, eachDayOfInterval, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

export default function AnalyticsView() {
  const { data: contacts = [], isLoading } = useContacts();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const metrics = useMemo(() => {
    const totalLeads = contacts.length;
    const clients = contacts.filter(c => c.funnel_stage === 'client').length;
    const conversionRate = totalLeads > 0 ? ((clients / totalLeads) * 100).toFixed(1) : 0;
    
    // Growth calculation (last 7 days)
    const sevenDaysAgo = subDays(new Date(), 7);
    const recentLeads = contacts.filter(c => c.created_at && new Date(c.created_at) > sevenDaysAgo).length;
    const growth = totalLeads > 0 ? ((recentLeads / totalLeads) * 100).toFixed(1) : 0;

    return { totalLeads, conversionRate, recentLeads, growth };
  }, [contacts]);

  const funnelData = useMemo(() => {
    const stages: Record<string, number> = {
      'lead': 0,
      'following_up': 0,
      'client': 0
    };
    
    contacts.forEach(c => {
      if (stages[c.funnel_stage] !== undefined) {
        stages[c.funnel_stage]++;
      }
    });

    return [
      { name: 'Prospectos', value: stages.lead, color: '#3b82f6' },
      { name: 'Seguimiento', value: stages.following_up, color: '#f59e0b' },
      { name: 'Clientes', value: stages.client, color: '#10b981' }
    ];
  }, [contacts]);

  const timeData = useMemo(() => {
    // Last 14 days
    const days = eachDayOfInterval({
      start: subDays(new Date(), 13),
      end: new Date()
    });

    return days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const count = contacts.filter(c => c.created_at && format(parseISO(c.created_at), 'yyyy-MM-dd') === dayStr).length;
      return {
        name: format(day, 'dd MMM', { locale: es }),
        leads: count
      };
    });
  }, [contacts]);

  const tagData = useMemo(() => {
    const tags: Record<string, number> = {};
    contacts.forEach(c => {
      if (c.tags) {
        c.tags.split(',').forEach(tag => {
          const t = tag.trim();
          if (t) tags[t] = (tags[t] || 0) + 1;
        });
      }
    });

    return Object.entries(tags)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [contacts]);

  if (isLoading || !mounted) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-3xl bg-muted/10 border border-border/5" />)}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] rounded-3xl bg-muted/10 border border-border/5" />
          <Skeleton className="h-[400px] rounded-3xl bg-muted/10 border border-border/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Leads Totales" 
          value={metrics.totalLeads} 
          subtext={`+${metrics.recentLeads} últimos 7 días`}
          icon={Users}
          color="blue"
        />
        <MetricCard 
          title="Tasa de Conversión" 
          value={`${metrics.conversionRate}%`} 
          subtext="De prospecto a cliente"
          icon={Target}
          color="emerald"
        />
        <MetricCard 
          title="Crecimiento" 
          value={`${metrics.growth}%`} 
          subtext="Incremento semanal"
          icon={TrendingUp}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Funnel Chart */}
        <Card className="bg-card/40 backdrop-blur-xl border-border/10 shadow-2xl overflow-hidden rounded-3xl border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Embudo de Conversión
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#888' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#888' }} 
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Chart */}
        <Card className="bg-card/40 backdrop-blur-xl border-border/10 shadow-2xl overflow-hidden rounded-3xl border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
              Crecimiento de Leads
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#888' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#888' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorLeads)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tags Distribution (Pie Chart) */}
        <Card className="bg-card/40 backdrop-blur-xl border-border/10 shadow-2xl overflow-hidden rounded-3xl border-none xl:col-span-2">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tagData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {tagData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Distribución por Etiquetas</h4>
                <div className="space-y-3">
                  {tagData.map((tag, i) => (
                    <div key={tag.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-xs font-medium text-foreground/80">{tag.name}</span>
                      </div>
                      <span className="text-xs font-bold">{tag.value}</span>
                    </div>
                  ))}
                  {tagData.length === 0 && <p className="text-xs text-muted-foreground italic">No hay tags suficientes para mostrar datos.</p>}
                </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtext, icon: Icon, color }: any) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-blue-500/10",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20 shadow-amber-500/10",
  };

  return (
    <Card className="bg-card/40 backdrop-blur-xl border-border/10 shadow-2xl rounded-3xl border-none overflow-hidden group hover:bg-card/60 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground/60">{title}</p>
            <h3 className="text-3xl font-black tracking-tighter text-foreground">{value}</h3>
          </div>
          <div className={cn("p-3 rounded-2xl border transition-transform group-hover:scale-110 duration-500", colorMap[color])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tight">
          <ArrowUpRight className="h-3 w-3 text-emerald-500" />
          {subtext}
        </div>
      </CardContent>
    </Card>
  );
}

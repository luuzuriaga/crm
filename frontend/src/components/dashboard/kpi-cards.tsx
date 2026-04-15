'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useContacts } from "@/hooks/use-contacts";
import { Users, Target, Rocket, TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const sparklineData = [
  { value: 40 }, { value: 30 }, { value: 45 }, { value: 50 },
  { value: 35 }, { value: 60 }, { value: 55 }, { value: 70 },
];

function Sparkline({ color }: { color: string }) {
  return (
    <div className="h-8 w-16 opacity-50">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparklineData}>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.2}
            strokeWidth={1.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function KPICards() {
  const { data: contacts = [] } = useContacts();

  // Metrics calculation
  const totalLeads = contacts.length;
  const activeClients = contacts.filter((c: any) => c.funnel_stage === 'client').length;
  const conversionRate = totalLeads > 0 ? ((activeClients / totalLeads) * 100).toFixed(1) : 0;
  const potentialRevenue = contacts.length * 1250; // Mock calculation

  const stats = [
    {
      title: "Leads Totales",
      value: totalLeads,
      icon: Users,
      trend: "+12.5%",
      isPositive: true,
      color: "oklch(0.623 0.214 259.815)", // Electric Blue
      sparkColor: "#3b82f6"
    },
    {
      title: "Clientes Activos",
      value: activeClients,
      icon: Rocket,
      trend: "+8.2%",
      isPositive: true,
      color: "oklch(0.723 0.219 149.579)", // Emerald
      sparkColor: "#10b981"
    },
    {
      title: "Conversión",
      value: `${conversionRate}%`,
      icon: Target,
      trend: "-2.4%",
      isPositive: false,
      color: "oklch(0.696 0.23 12.357)", // Rose/Red
      sparkColor: "#f43f5e"
    },
    {
      title: "Ingresos Activos",
      value: `$${potentialRevenue.toLocaleString()}`,
      icon: TrendingUp,
      trend: "+24.1%",
      isPositive: true,
      color: "oklch(0.852 0.199 91.936)", // Gold/Yellow
      sparkColor: "#eab308"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card 
          key={stat.title} 
          className="bg-card/40 backdrop-blur-2xl border-border/10 hover:border-primary/30 transition-all duration-500 overflow-hidden group shadow-lg hover:shadow-primary/5"
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div 
                className="p-2.5 rounded-xl border border-white/5 shadow-inner"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <Sparkline color={stat.sparkColor} />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground/60">{stat.title}</h3>
              <div className="flex items-baseline gap-3">
                <p className="text-2xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text">
                  {stat.value}
                </p>
                <span className={cn(
                  "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full border",
                  stat.isPositive 
                    ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" 
                    : "text-rose-500 bg-rose-500/10 border-rose-500/20"
                )}>
                  {stat.isPositive ? <TrendingUp className="h-2.5 w-2.5 mr-1" /> : <TrendingDown className="h-2.5 w-2.5 mr-1" />}
                  {stat.trend}
                </span>
              </div>
            </div>
          </CardContent>
          <div 
            className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent transition-all duration-700 group-hover:w-full"
            style={{ backgroundImage: `linear-gradient(to right, transparent, ${stat.color})` }}
          />
        </Card>
      ))}
    </div>
  );
}

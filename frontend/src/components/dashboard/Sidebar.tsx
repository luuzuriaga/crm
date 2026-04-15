'use client';

import React from 'react';
import { 
  Users, 
  LayoutDashboard, 
  Settings, 
  BarChart3, 
  MessageSquare,
  Search,
  Bell,
  Command,
  Zap,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  onSearchClick: () => void;
}

const navItems = [
  { id: 'home', label: 'Inicio', icon: LayoutDashboard },
  { id: 'dashboard', label: 'Tablero', icon: Zap },
  { id: 'contacts', label: 'Contactos', icon: Users },
  { id: 'chats', label: 'Mensajes', icon: MessageSquare },
  { id: 'emails', label: 'Email', icon: Mail },
  { id: 'analytics', label: 'Analíticas', icon: BarChart3 },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onSearchClick }) => {
  return (
    <div className="w-64 h-full bg-background/50 border-r border-border/10 flex flex-col p-6 backdrop-blur-xl">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300">
          <Zap className="text-primary-foreground w-4 h-4 fill-current" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-foreground/90">Velocity CRM</h1>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Enterprise</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 space-y-1.5 text-left">
        <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground/50 mb-4 px-3">Menú Principal</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-xs font-semibold group",
              activeTab === item.id 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground/80"
            )}
          >
            <item.icon className={cn(
              "w-4 h-4",
              activeTab === item.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground/80"
            )} />
            {item.label}
          </button>
        ))}

        <div className="pt-8 space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground/50 px-3">Acciones Rápidas</p>
          <button 
            onClick={onSearchClick}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted/50 rounded-md transition-all group text-left"
          >
             <span className="flex items-center gap-3">
               <Search className="w-4 h-4 group-hover:text-foreground/80" /> Buscar
             </span>
             <kbd className="text-[8px] bg-muted px-1.5 py-0.5 rounded border border-border/10 opacity-50">⌘K</kbd>
          </button>
        </div>
      </nav>

      {/* User Footer */}
      <div className="mt-auto pt-6 border-t border-border/10">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-8 w-8 border border-border/10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">LU</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-foreground/90 truncate">Lucero Uzuriaga</p>
            <p className="text-[10px] text-muted-foreground truncate">Cuenta Administradora</p>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

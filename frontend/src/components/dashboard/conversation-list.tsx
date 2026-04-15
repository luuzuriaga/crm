'use client';

import React, { useState } from 'react';
import { useContacts } from '@/hooks/use-contacts';
import { useCRMStore } from '@/store/useCRMStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function ConversationList() {
  const { data: contacts = [], isLoading } = useContacts();
  const { activeContact, setActiveContact } = useCRMStore();
  const [search, setSearch] = useState('');

  const filteredContacts = contacts.filter((c: any) => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-card/20 backdrop-blur-xl border-r border-border/10">
      {/* List Header */}
      <div className="p-4 border-b border-border/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-tight px-1">Mensajes</h2>
          <button className="p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar conversaciones..." 
            className="pl-9 bg-muted/20 border-border/5 text-xs h-9 rounded-xl focus-visible:ring-primary/20"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border/10 p-2 space-y-1">
        {isLoading ? (
          [1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 w-full bg-muted/10 animate-pulse rounded-lg mb-2" />
          ))
        ) : filteredContacts.length === 0 ? (
          <div className="p-8 text-center space-y-2 opacity-40">
            <MessageSquare className="h-8 w-8 mx-auto" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Sin historial</p>
          </div>
        ) : (
          filteredContacts.map((contact: any) => {
            const isActive = activeContact?.id === contact.id;
            return (
              <button
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={cn(
                  "w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-300 group relative",
                  isActive 
                    ? "bg-primary/10 shadow-[inset_4px_0_0_0_#3b82f6]" 
                    : "hover:bg-muted/30"
                )}
              >
                <Avatar className={cn(
                  "h-10 w-10 border transition-all duration-300",
                  isActive ? "border-primary/40 scale-105" : "border-border/10"
                )}>
                  <AvatarFallback className={cn(
                    "text-xs font-bold",
                    isActive ? "bg-primary/20 text-primary" : "bg-secondary/30 text-muted-foreground"
                  )}>
                    {contact.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={cn(
                      "text-xs font-bold truncate transition-colors",
                      isActive ? "text-primary" : "text-foreground/90"
                    )}>
                      {contact.name}
                    </span>
                    <span className="text-[9px] text-muted-foreground/50 font-medium">10:42 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-muted-foreground/60 truncate italic max-w-[140px]">
                      {contact.notes ? contact.notes.split('.')[0] : "Iniciar nueva conversación..."}
                    </p>
                    {contact.status === 'active' && !isActive && (
                      <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

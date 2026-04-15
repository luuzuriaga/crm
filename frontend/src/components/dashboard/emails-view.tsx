'use client';

import React, { useState } from 'react';
import { useContacts } from '@/hooks/use-contacts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Mail, User, Clock, ChevronRight, Inbox, Send, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';
import EmailComposer from '@/components/dashboard/email-composer';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmailsView() {
  const { data: contacts = [], isLoading } = useContacts();
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-160px)] gap-8">
      {/* Sidebar: Inbox / Contact List */}
      <div className="w-[350px] shrink-0 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
           <h2 className="text-2xl font-black tracking-tighter">Centro de Email</h2>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
              <Input 
                placeholder="Buscar contacto..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-muted/20 border-border/5 pl-9 text-xs h-9 focus-visible:ring-primary/20"
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[2px] text-muted-foreground/40 px-2 mb-4">Contactos Recientes</p>
          
          {isLoading ? (
            [1,2,3,4,5].map(i => <div key={i} className="h-16 rounded-2xl bg-muted/10 animate-pulse" />)
          ) : (
            filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={cn(
                  "w-full p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 text-left group",
                  selectedContact?.id === contact.id 
                    ? "bg-primary/10 border-primary/20 shadow-lg shadow-primary/5" 
                    : "bg-card/20 border-border/5 hover:bg-card/40 hover:border-border/10"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center border font-bold text-xs transition-all",
                  selectedContact?.id === contact.id 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-background/50 text-muted-foreground border-border/10 group-hover:border-primary/30"
                )}>
                  {contact.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{contact.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate font-medium">{contact.email}</p>
                </div>
                <ChevronRight className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  selectedContact?.id === contact.id ? "text-primary translate-x-1" : "text-muted-foreground/20"
                )} />
              </button>
            ))
          )}

          {!isLoading && filteredContacts.length === 0 && (
            <div className="py-20 text-center">
               <User className="h-8 w-8 text-muted-foreground/20 mx-auto mb-3" />
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">No se encontraron contactos</p>
            </div>
          )}
        </div>
      </div>

      {/* Main: Email Composer / Preview */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {selectedContact ? (
            <motion.div 
              key={selectedContact.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <EmailComposer contact={selectedContact} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-12 bg-card/10 border border-dashed border-border/10 rounded-[40px]"
            >
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center border border-primary/10 mb-6">
                <Mail className="h-8 w-8 text-primary/40 animate-bounce" />
              </div>
              <h3 className="text-xl font-black tracking-tighter">Bandeja de Salida lista</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-[300px] font-medium leading-relaxed">
                Selecciona un contacto de la lista para redactar un email profesional usando nuestras plantillas dinámicas.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mt-10">
                <FeatureSmall icon={Inbox} label="Entrada" />
                <FeatureSmall icon={Send} label="Enviados" />
                <FeatureSmall icon={Archive} label="Archivados" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeatureSmall({ icon: Icon, label }: any) {
  return (
    <div className="flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity cursor-not-allowed">
       <div className="p-3 rounded-2xl bg-muted/20 border border-border/10">
          <Icon className="h-4 w-4" />
       </div>
       <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );
}

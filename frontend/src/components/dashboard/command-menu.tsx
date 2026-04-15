'use client';

import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { 
  Search, 
  Users, 
  Zap, 
  LayoutDashboard, 
  Mail, 
  BarChart3, 
  Plus, 
  Download,
  Settings,
  MessageSquare,
  Home as HomeIcon,
  ArrowRight
} from 'lucide-react';
import { useContacts } from '@/hooks/use-contacts';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogOverlay
} from '@/components/ui/dialog';

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onTabChange: (tabId: string) => void;
  onCreateLead: () => void;
}

export default function CommandMenu({ open, setOpen, onTabChange, onCreateLead }: CommandMenuProps) {
  const { data: contacts = [] } = useContacts();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    command();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <>
            <DialogOverlay className="z-[100]" />
            <DialogContent 
              showCloseButton={false}
              className="top-[15vh] translate-y-0 left-1/2 -translate-x-1/2 z-[101] bg-transparent border-none shadow-none ring-0 focus:ring-0 outline-none p-0 w-[calc(100%-2rem)] max-w-[640px] sm:max-w-[640px]"
            >
              <div className="sr-only">
                <DialogTitle>Comandos Globales</DialogTitle>
                <DialogDescription>Búsqueda universal y acciones rápidas para el CRM.</DialogDescription>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="w-full max-w-[640px] bg-card/95 border border-border/10 shadow-3xl rounded-[28px] overflow-hidden backdrop-blur-2xl ring-1 ring-white/5"
              >
                <Command className="flex h-full w-full flex-col overflow-hidden">
                  <div className="flex items-center border-b border-border/5 px-6 gap-4 h-14">
                    <Search className="h-4 w-4 text-primary" />
                    <Command.Input 
                      placeholder="Busca un contacto, una pestaña o una acción..." 
                      className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-muted-foreground/30 py-4 h-full"
                    />
                    <kbd className="hidden sm:flex h-5 select-none items-center gap-1 rounded border border-border/10 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-50">
                      ESC
                    </kbd>
                  </div>

                  <Command.List className="max-h-[400px] overflow-y-auto p-3 scrollbar-none">
                    <Command.Empty className="py-12 text-center">
                      <div className="w-12 h-12 bg-muted/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border/5">
                         <Search className="h-5 w-5 text-muted-foreground/20" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[2px] text-muted-foreground/40">No se encontraron resultados</p>
                    </Command.Empty>

                    <Command.Group heading="Navegación Rápida" className="px-2 mb-4 text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground/40">
                       <CommandItem 
                         onSelect={() => runCommand(() => onTabChange('home'))}
                         icon={HomeIcon}
                         label="Ir a Inicio"
                         shortcut="H"
                       />
                       <CommandItem 
                         onSelect={() => runCommand(() => onTabChange('dashboard'))}
                         icon={Zap}
                         label="Ir al Tablero (Kanban)"
                         shortcut="D"
                       />
                       <CommandItem 
                         onSelect={() => runCommand(() => onTabChange('contacts'))}
                         icon={Users}
                         label="Ver Todos los Contactos"
                         shortcut="C"
                       />
                       <CommandItem 
                         onSelect={() => runCommand(() => onTabChange('emails'))}
                         icon={Mail}
                         label="Centro de Email"
                         shortcut="E"
                       />
                    </Command.Group>

                    <Command.Group heading="Acciones" className="px-2 mb-4 text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground/40">
                       <CommandItem 
                         onSelect={() => runCommand(() => onCreateLead())}
                         icon={Plus}
                         label="Crear Nuevo Lead"
                         shortcut="N"
                         color="blue"
                       />
                       <CommandItem 
                         onSelect={() => runCommand(() => {})}
                         icon={Download}
                         label="Exportar Base de Datos"
                         shortcut="X"
                       />
                    </Command.Group>

                    {contacts.length > 0 && (
                      <Command.Group heading="Contactos" className="px-2 text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground/40">
                        {contacts.slice(0, 8).map((contact) => (
                          <CommandItem 
                            key={contact.id}
                            onSelect={() => runCommand(() => {
                               onTabChange('contacts');
                            })}
                            icon={Users}
                            label={contact.name}
                            description={contact.email}
                          />
                        ))}
                      </Command.Group>
                    )}
                  </Command.List>

                  <div className="h-10 border-t border-border/5 bg-muted/5 px-6 flex items-center justify-between text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest">
                     <span>Utiliza las flechas para navegar</span>
                     <div className="flex gap-4">
                        <span className="flex items-center gap-1"><ArrowRight className="h-2.5 w-2.5" /> Seleccionar</span>
                     </div>
                  </div>
                </Command>
              </motion.div>
            </DialogContent>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  );
}

function CommandItem({ icon: Icon, label, description, shortcut, onSelect, color }: any) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 group outline-none",
        "data-[selected=true]:bg-primary data-[selected=true]:shadow-lg data-[selected=true]:shadow-primary/20"
      )}
    >
      <div className={cn(
        "p-2 rounded-xl border border-border/10 transition-colors bg-muted/20",
        "group-data-[selected=true]:bg-white/20 group-data-[selected=true]:border-white/10 group-data-[selected=true]:text-white",
        color === 'blue' && "bg-blue-500/10 text-blue-500 border-blue-500/20"
      )}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate group-data-[selected=true]:text-white transition-colors">
          {label}
        </p>
        {description && (
          <p className="text-[10px] text-muted-foreground truncate group-data-[selected=true]:text-white/60">
            {description}
          </p>
        )}
      </div>
      {shortcut && (
        <kbd className="h-5 min-w-5 flex items-center justify-center rounded border border-border/10 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground group-data-[selected=true]:border-white/20 group-data-[selected=true]:bg-white/10 group-data-[selected=true]:text-white transition-colors">
          {shortcut}
        </kbd>
      )}
    </Command.Item>
  );
}

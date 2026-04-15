'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, MoreHorizontal, ExternalLink, Trash2, Star } from 'lucide-react';
import { useContacts, useDeleteContact } from '@/hooks/use-contacts';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useCRMStore } from '@/store/useCRMStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

function TableSkeleton() {
  return (
    <div className="rounded-xl border border-border/10 bg-card/40 backdrop-blur-xl overflow-hidden shadow-xl">
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full bg-muted/10" />
        ))}
      </div>
    </div>
  );
}

export default function ContactTable({ searchTerm = '', onEditClick }: { 
  searchTerm?: string,
  onEditClick?: (contact: any) => void 
}) {
  const { data: contacts = [], isLoading } = useContacts();
  const deleteContact = useDeleteContact();
  const { activeContact, setActiveContact } = useCRMStore();
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const filteredContacts = contacts.filter((c: any) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tags?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      deleteContact.mutate(deleteId, {
        onSuccess: () => {
          toast.success('Lead eliminado permanentemente');
          setDeleteId(null);
        },
        onError: () => toast.error('Error al eliminar el lead')
      });
    }
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <div className="rounded-xl border border-border/10 bg-card/40 backdrop-blur-xl overflow-hidden shadow-xl min-h-[400px]">
        <Table>
          <TableHeader className="bg-muted/10 text-left">
            <TableRow className="hover:bg-transparent border-border/10">
              <TableHead className="w-[300px] text-[10px] font-bold uppercase tracking-widest py-4 text-muted-foreground/60 text-left">Contacto</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4 text-muted-foreground/60 text-left">Estado</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4 text-muted-foreground/60 text-left">Etapa</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4 text-muted-foreground/60 text-left">Etiquetas</TableHead>
              <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest py-4 text-muted-foreground/60">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact: any) => {
              const isActive = activeContact?.id === contact.id;
              
              return (
                <TableRow 
                  key={contact.id} 
                  onClick={() => setActiveContact(contact)}
                  className={cn(
                    "border-border/5 transition-all cursor-pointer group",
                    isActive 
                      ? "bg-primary/[0.03] shadow-[inset_4px_0_0_0_#3b82f6]" 
                      : "hover:bg-muted/10"
                  )}
                >
                  <TableCell className="py-4 text-left">
                    <div className="flex items-center gap-3">
                      <Avatar className={cn(
                        "h-9 w-9 border transition-colors",
                        isActive ? "border-primary/30" : "border-border/10"
                      )}>
                        <AvatarFallback className={cn(
                          "text-xs font-bold transition-colors",
                          isActive ? "bg-primary/20 text-primary" : "bg-secondary/30 text-muted-foreground"
                        )}>
                          {contact.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className={cn(
                          "text-sm font-bold transition-colors",
                          isActive ? "text-primary" : "text-foreground/90"
                        )}>
                          {contact.name}
                        </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Mail className="h-3 w-3 opacity-50" /> {contact.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${contact.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-muted-foreground/30'}`} />
                    <span className="text-xs text-foreground/70 capitalize">
                      {contact.status === 'active' ? 'Activo' : contact.status === 'inactive' ? 'Inactivo' : contact.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-[10px] font-bold border opacity-90 uppercase tracking-tighter px-2 py-0.5 rounded-full",
                      contact.funnel_stage === 'lead' && "bg-blue-500/10 text-blue-500 border-blue-500/20",
                      contact.funnel_stage === 'following_up' && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                      contact.funnel_stage === 'client' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    )}
                  >
                    {contact.funnel_stage === 'lead' ? 'Prospecto' : 
                     contact.funnel_stage === 'following_up' ? 'Seguimiento' : 
                     contact.funnel_stage === 'client' ? 'Cliente' : contact.funnel_stage}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 overflow-hidden">
                    {contact.tags?.split(',').slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0 bg-secondary/20 font-bold border-none text-muted-foreground">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => toast.info(`Accediendo a la interfaz de ${contact.name}`)}
                      className="h-8 w-8 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground border border-border/5"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-8 w-8 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground border border-border/5">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover border-border/10 text-xs shadow-2xl">
                        <DropdownMenuItem 
                          className="focus:bg-muted/50 gap-2 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditClick?.(contact);
                          }}
                        >
                          <Star className="h-3.5 w-3.5 text-primary" /> Editar Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeleteId(contact.id)}
                          className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Eliminar Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
        
        {filteredContacts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[350px] space-y-4 animate-in fade-in zoom-in-95 duration-500">
             <div className="w-12 h-12 bg-muted/10 rounded-2xl flex items-center justify-center border border-border/5">
                <Mail className="h-6 w-6 text-muted-foreground/20" />
             </div>
             <div className="text-center">
                <p className="text-sm font-bold text-foreground/80 tracking-tight">Índice de búsqueda vacío</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase tracking-widest font-medium">No se encontraron resultados para su búsqueda</p>
             </div>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card/95 backdrop-blur-2xl border-border/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold tracking-tight">¿Purgar datos del lead?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              Esto desconectará inmediatamente todos los registros de interacción asociados del tablero principal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-muted/50 text-xs h-9">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-white text-xs h-9 shadow-lg shadow-destructive/20"
            >
              Verificar Purga
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

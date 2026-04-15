'use client';

import React, { useState } from 'react';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy, 
  useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useContacts, useUpdateContactStage, useDeleteContact } from '@/hooks/use-contacts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, Plus, GripVertical, Trash2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from 'sonner';
import { useCRMStore } from '@/store/useCRMStore';

const STAGES = [
  { id: 'lead', title: 'Prospectos', color: 'bg-blue-500', accent: 'border-l-blue-500' },
  { id: 'following_up', title: 'Seguimiento', color: 'bg-amber-500', accent: 'border-l-amber-500' },
  { id: 'client', title: 'Clientes', color: 'bg-emerald-500', accent: 'border-l-emerald-500' },
];

function KanbanSkeleton() {
  return (
    <div className="flex gap-6 h-full overflow-x-auto pb-6">
      {STAGES.map((stage) => (
        <div key={stage.id} className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
          <Skeleton className="h-10 w-full bg-muted/20 border border-border/5" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full bg-muted/10 border border-border/5" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface KanbanCardProps {
  contact: any;
  onDelete: (id: number) => void;
  onEdit: (contact: any) => void;
  isOverlay?: boolean;
  isActive?: boolean;
  onSelect?: (contact: any) => void;
}

function KanbanCard({ contact, onDelete, onEdit, isOverlay, isActive, onSelect }: KanbanCardProps) {
  const stage = STAGES.find(s => s.id === contact.funnel_stage) || STAGES[0];
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: contact.id.toString(),
    data: { contact }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card 
        onClick={() => onSelect?.(contact)}
        className={cn(
          "group relative bg-card/60 border transition-all duration-300 cursor-pointer border-l-[3px]",
          stage.accent,
          isActive 
            ? "border-y-primary border-r-primary shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-primary/5 active:scale-[0.98]" 
            : "border-y-border/10 border-r-border/10 hover:border-y-primary/40 hover:border-r-primary/40",
          isOverlay && "border-primary/50 shadow-2xl scale-105"
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <Avatar className={cn(
                "h-10 w-10 border transition-colors",
                isActive ? "border-primary/30" : "border-border/10"
              )}>
                <AvatarFallback className={cn(
                  "text-xs font-bold",
                  isActive ? "bg-primary/20 text-primary" : "bg-secondary/30 text-muted-foreground"
                )}>
                  {contact.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className={cn(
                  "text-sm font-bold truncate tracking-tight transition-colors",
                  isActive ? "text-primary" : "text-foreground/90"
                )}>
                  {contact.name}
                </span>
                <p className="text-[10px] text-muted-foreground truncate max-w-[140px]">{contact.email}</p>
              </div>
            </div>
            <div {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-muted-foreground transition-colors p-1">
              <GripVertical className="h-4 w-4" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge 
                variant="outline" 
                className={cn(
                  "text-[9px] font-bold border opacity-90 uppercase tracking-tighter px-1.5 py-0 rounded-md",
                  stage.id === 'lead' && "bg-blue-500/10 text-blue-500 border-blue-500/20",
                  stage.id === 'following_up' && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                  stage.id === 'client' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                )}
              >
                {stage.title}
              </Badge>
              <div className="flex gap-1 overflow-hidden">
                {contact.tags?.split(',').slice(0, 2).map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0 bg-secondary/50 border-none font-medium whitespace-nowrap">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
               {isActive && (
                 <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
               )}
               <DropdownMenu>
                <DropdownMenuTrigger className="text-muted-foreground/40 hover:text-foreground transition-colors p-1 rounded-md">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover border-border/10 text-xs shadow-2xl">
                  <DropdownMenuItem 
                    className="focus:bg-muted/50 gap-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(contact);
                    }}
                  >
                    <Star className="h-3.5 w-3.5 text-primary" /> Editar Lead
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(contact.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Eliminar Lead
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ModernKanban({ searchTerm = '', onCreateClick, onEditClick }: { 
  searchTerm?: string, 
  onCreateClick?: (stage: string) => void,
  onEditClick?: (contact: any) => void
}) {
  const { data: contacts = [], isLoading } = useContacts();
  const updateStage = useUpdateContactStage();
  const deleteContact = useDeleteContact();
  const { activeContact, setActiveContact } = useCRMStore();
  const [activeDndId, setActiveDndId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (isLoading) return <KanbanSkeleton />;

  const handleDelete = () => {
    if (deleteId) {
      deleteContact.mutate(deleteId, {
        onSuccess: () => {
          toast.success('Lead eliminado de los sistemas centrales');
          setDeleteId(null);
        },
        onError: () => toast.error('Error al eliminar el lead')
      });
    }
  };

  const filteredContacts = contacts.filter((c: any) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tags?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (event: any) => setActiveDndId(event.active.id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveDndId(null);

    if (over && active.id !== over.id) {
      const contactId = parseInt(active.id);
      const newStage = over.id;
      
      const contact = contacts.find(c => c.id === contactId);
      if (contact && contact.funnel_stage !== newStage) {
        updateStage.mutate({ id: contactId, stage: newStage });
      }
    }
  };

  return (
    <>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 h-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-border/10">
          {STAGES.map((stage) => {
            const stageContacts = filteredContacts.filter((c: any) => c.funnel_stage === stage.id);
            
            return (
              <div key={stage.id} className="min-w-[320px] max-w-[320px] flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between px-2 bg-background/40 backdrop-blur-md py-2 rounded-lg border border-border/10 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", stage.color)} />
                    <h3 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground/80">
                      {stage.title}
                    </h3>
                    <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-border/10 bg-muted/20 text-muted-foreground/80">
                      {stageContacts.length}
                    </Badge>
                  </div>
                  <button 
                    onClick={() => onCreateClick?.(stage.id)}
                    className="text-muted-foreground/40 hover:text-foreground p-1 hover:bg-muted/50 rounded transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 space-y-3 min-h-[500px]">
                  <SortableContext 
                    id={stage.id}
                    items={stageContacts.map((c: any) => c.id.toString())}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="h-full">
                      {stageContacts.map((contact: any) => (
                        <div key={contact.id} className="mb-3">
                          <KanbanCard 
                            contact={contact} 
                            onDelete={(id) => setDeleteId(id)} 
                            onEdit={(c) => onEditClick?.(c)}
                            isActive={activeContact?.id === contact.id}
                            onSelect={setActiveContact}
                          />
                        </div>
                      ))}
                      
                      {stageContacts.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-border/5 bg-muted/5 group hover:bg-muted/10 transition-colors">
                           <p className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest">Sin registros</p>
                           <button 
                             onClick={() => onCreateClick?.(stage.id)}
                             className="mt-2 text-[10px] text-primary hover:underline font-bold"
                           >
                              + Add lead
                           </button>
                        </div>
                      )}

                      <div 
                        className="h-full min-h-[100px] rounded-lg border-2 border-transparent"
                        id={stage.id}
                      />
                    </div>
                  </SortableContext>
                </div>
              </div>
            );
          })}
        </div>

        <DragOverlay adjustScale={false} dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: "0.5",
              },
            },
          }),
        }}>
          {activeDndId ? (
            <KanbanCard 
              contact={contacts.find(c => c.id.toString() === activeDndId)} 
              isOverlay 
              onDelete={() => {}}
              onEdit={() => {}}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card/95 backdrop-blur-2xl border-border/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold tracking-tight">¿Dar de baja al Lead?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              Esta acción es permanente. El perfil del contacto y el historial de interacciones serán purgados de los sistemas activos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-muted/50 text-xs h-9">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-white text-xs h-9 shadow-lg shadow-destructive/20"
            >
              Confirmar Eliminación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

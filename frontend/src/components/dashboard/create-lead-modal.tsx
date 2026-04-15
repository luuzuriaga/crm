'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateContact } from '@/hooks/use-contacts';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStage?: string;
}

export default function CreateLeadModal({ isOpen, onClose, defaultStage = 'lead' }: CreateLeadModalProps) {
  const createContact = useCreateContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active',
    funnel_stage: defaultStage,
    tags: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Por favor, completa los campos obligatorios');
      return;
    }

    createContact.mutate(formData, {
      onSuccess: () => {
        toast.success('¡Lead creado con éxito!');
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          status: 'active',
          funnel_stage: 'lead', 
          tags: '', 
          notes: '' 
        });
        onClose();
      },
      onError: () => {
        toast.error('Error al crear el lead');
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-2xl border-border/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">Crear Nuevo Lead</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Entra en la siguiente fase. Ingresa los detalles del lead para comenzar el seguimiento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
              Nombre *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-3 h-9 bg-muted/20 border-border/5 text-xs"
              placeholder="e.g. Gianfranco Loli"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
              Correo *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="col-span-3 h-9 bg-muted/20 border-border/5 text-xs"
              placeholder="name@company.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stage" className="text-right text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
              Etapa
            </Label>
            <div className="col-span-3">
              <Select 
                value={formData.funnel_stage} 
                onValueChange={(val) => setFormData({ ...formData, funnel_stage: val || 'lead' })}
              >
                <SelectTrigger className="h-9 bg-muted/20 border-border/5 text-xs">
                  <SelectValue placeholder="Seleccionar Etapa" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/10 text-xs">
                  <SelectItem value="lead">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Lead
                    </div>
                  </SelectItem>
                  <SelectItem value="following_up">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Seguimiento
                    </div>
                  </SelectItem>
                  <SelectItem value="client">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Cliente
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
              Etiquetas
            </Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="col-span-3 h-9 bg-muted/20 border-border/5 text-xs"
              placeholder="SaaS, Enterprise, High Interest"
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-xs h-9">Cancelar</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={createContact.isPending}
            className="text-xs h-9 shadow-lg shadow-primary/20 transition-all hover:scale-105"
          >
            {createContact.isPending ? 'Creando...' : 'Crear Lead'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
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
import { useUpdateContact } from '@/hooks/use-contacts';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
}

export default function EditContactModal({ isOpen, onClose, contact }: EditContactModalProps) {
  const updateContact = useUpdateContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active',
    funnel_stage: 'lead',
    tags: '',
    notes: ''
  });

  // Effect to sync form with contact data when modal opens
  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        status: contact.status || 'active',
        funnel_stage: contact.funnel_stage || 'lead',
        tags: contact.tags || '',
        notes: contact.notes || ''
      });
    }
  }, [contact, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Por favor, completa los campos obligatorios');
      return;
    }

    if (!contact?.id) return;

    updateContact.mutate({ id: contact.id, contact: formData }, {
      onSuccess: () => {
        toast.success('¡Lead actualizado con éxito!');
        onClose();
      },
      onError: () => {
        toast.error('Error al actualizar el lead');
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-2xl border-border/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">Editar Lead</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Actualiza la información del contacto y progresión en el embudo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
              Nombre *
            </Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-3 h-9 bg-muted/20 border-border/5 text-xs"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-email" className="text-right text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
              Correo *
            </Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="col-span-3 h-9 bg-muted/20 border-border/5 text-xs"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-stage" className="text-right text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
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
            <Label htmlFor="edit-tags" className="text-right text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
              Etiquetas
            </Label>
            <Input
              id="edit-tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="col-span-3 h-9 bg-muted/20 border-border/5 text-xs"
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-xs h-9">Cancelar</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={updateContact.isPending}
            className="text-xs h-9 shadow-lg shadow-primary/20 transition-all hover:scale-105"
          >
            {updateContact.isPending ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Tag, Shield, Bell, Database, Save, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsView() {
  const [tags, setTags] = useState(['VIP', 'Inversionista', 'Tech', 'Q3 Lead', 'Partner']);
  const [newTag, setNewTag] = useState('');

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
      toast.success('Etiqueta global añadida');
    }
  };

  const deleteTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
    toast.info('Etiqueta eliminada');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black tracking-tighter">Ajustes del Sistema</h2>
          <p className="text-xs text-muted-foreground mt-1">Configura parámetros globales, etiquetas y automatizaciones.</p>
        </div>
        <Button className="h-9 px-6 text-[10px] font-black uppercase tracking-[2px] gap-2 shadow-xl shadow-primary/20">
          <Save className="h-3.5 w-3.5" /> Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Tags Management */}
        <Card className="bg-card/40 backdrop-blur-xl border-border/10 shadow-3xl rounded-3xl border-none">
          <CardHeader className="pb-4 border-b border-border/5">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" /> Gestión de Etiquetas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="pl-3 pr-1 py-1 bg-muted/30 border-border/5 group font-bold text-[10px] items-center gap-2">
                  {tag}
                  <button onClick={() => deleteTag(tag)} className="p-0.5 rounded-full hover:bg-destructive/20 text-muted-foreground/40 hover:text-destructive transition-colors">
                    <Trash2 className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              ))}
            </div>
            
            <form onSubmit={addTag} className="flex gap-2">
              <Input 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Nueva etiqueta (ej: 'Priority 1')"
                className="bg-muted/20 border-border/10 h-9 text-xs focus-visible:ring-primary/20"
              />
              <Button type="submit" size="sm" className="h-9 px-4 rotate-0 hover:rotate-90 transition-transform">
                <Plus className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notifications & Security */}
        <Card className="bg-card/40 backdrop-blur-xl border-border/10 shadow-3xl rounded-3xl border-none">
          <CardHeader className="pb-4 border-b border-border/5">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" /> Seguridad y Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <ToggleRow 
                icon={Bell} 
                title="Notificaciones push" 
                desc="Recibe alertas de nuevos leads en tiempo real."
                defaultChecked 
              />
              <ToggleRow 
                icon={MailIcon} 
                title="Reportes semanales" 
                desc="Envío automático de analíticas por correo."
              />
              <ToggleRow 
                icon={Database} 
                title="Respaldo automático" 
                desc="Copia de seguridad cifrada cada 24 horas."
                defaultChecked 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ToggleRow({ icon: Icon, title, desc, defaultChecked = false }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/10 border border-border/5 transform-gpu transition-all hover:bg-muted/20">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-background/50 border border-border/10">
          <Icon className="h-4 w-4 text-muted-foreground/60" />
        </div>
        <div>
          <p className="text-xs font-bold text-foreground/90 tracking-tight">{title}</p>
          <p className="text-[10px] text-muted-foreground font-medium">{desc}</p>
        </div>
      </div>
      <Switch defaultChecked={defaultChecked} className="data-[state=checked]:bg-primary" />
    </div>
  );
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

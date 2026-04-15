'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Send, FileText, ChevronRight, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const EMAIL_TEMPLATES = [
  { id: 'first_contact', title: 'Primer Contacto', subject: 'Colaboración Potencial', body: 'Hola {{name}},\n\nHe visto tu perfil y me gustaría presentarte nuestra solución. ¿Tendrías 10 minutos esta semana?\n\nSaludos.' },
  { id: 'follow_up', title: 'Seguimiento', subject: 'Re: Nuestra charla anterior', body: 'Hola {{name}},\n\nQuería dar seguimiento a nuestra última conversación sobre el plan Q3. ¿Has tenido oportunidad de revisar la propuesta?\n\nQuedo atento.' },
  { id: 'closing', title: 'Propuesta Final', subject: 'Acuerdo de Servicios', body: 'Hola {{name}},\n\nAdjunto los detalles finales para dar inicio al proyecto. Avísame si tienes cualquier duda.\n\nUn abrazo.' },
];

export default function EmailComposer({ contact, onClose }: { contact?: any, onClose?: () => void }) {
  const [template, setTemplate] = useState('first_contact');
  const [subject, setSubject] = useState(EMAIL_TEMPLATES[0].subject);
  const [body, setBody] = useState(EMAIL_TEMPLATES[0].body.replace('{{name}}', contact?.name || 'Cliente'));
  const [isSending, setIsSending] = useState(false);

  const handleTemplateChange = (id: string) => {
    const t = EMAIL_TEMPLATES.find(temp => temp.id === id);
    if (t) {
      setTemplate(id);
      setSubject(t.subject);
      setBody(t.body.replace('{{name}}', contact?.name || 'Cliente'));
    }
  };

  const handleSend = () => {
    setIsSending(true);
    // Simulation
    setTimeout(() => {
      setIsSending(false);
      toast.success(`Email enviado exitosamente a ${contact?.email || 'el destinatario'}`);
      onClose?.();
    }, 1500);
  };

  return (
    <Card className="bg-card/95 backdrop-blur-2xl border-border/10 shadow-3xl overflow-hidden rounded-3xl border-none h-full flex flex-col">
      <CardHeader className="border-b border-border/5 bg-muted/5 py-4 flex flex-row items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Mail className="h-4 w-4 text-primary" />
           </div>
           <CardTitle className="text-sm font-black uppercase tracking-widest text-foreground/90">Redactor de Email</CardTitle>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="p-6 space-y-5 flex-1 overflow-y-auto">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Para</label>
              <Input 
                value={contact?.email || ''} 
                disabled 
                className="bg-muted/30 border-border/10 h-10 text-xs font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Plantilla</label>
              <Select value={template} onValueChange={handleTemplateChange}>
                <SelectTrigger className="bg-muted/30 border-border/10 h-10 text-xs font-semibold">
                  <SelectValue placeholder="Selecciona una plantilla" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/10 text-xs font-semibold">
                  {EMAIL_TEMPLATES.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Asunto</label>
            <Input 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              className="bg-muted/30 border-border/10 h-10 text-xs font-semibold focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Mensaje</label>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1.5 text-primary/60 hover:text-primary transition-colors font-bold uppercase px-2 hover:bg-primary/5">
                <Sparkles className="h-3 w-3" /> Refinar con IA
              </Button>
            </div>
            <Textarea 
              value={body} 
              onChange={(e) => setBody(e.target.value)}
              className="bg-muted/30 border-border/10 min-h-[220px] text-xs leading-relaxed font-medium resize-none focus-visible:ring-primary/20 scrollbar-thin overflow-y-auto"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center border-t border-border/5">
           <div className="flex items-center gap-1 opacity-40">
              <FileText className="h-3 w-3" />
              <span className="text-[9px] font-black uppercase tracking-widest">Borrador Listo</span>
           </div>
           <Button 
            onClick={handleSend} 
            disabled={isSending || !contact}
            className={cn(
              "h-10 px-8 text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95",
              isSending && "opacity-80"
            )}
           >
             {isSending ? (
               <span className="flex items-center gap-2">
                 <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 Enviando...
               </span>
             ) : (
               <>
                 Enviar Ahora <Send className="h-3.5 w-3.5" />
               </>
             )}
           </Button>
        </div>
      </CardContent>
    </Card>
  );
}

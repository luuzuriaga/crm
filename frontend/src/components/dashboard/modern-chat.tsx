'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMessages, useSendMessage } from '@/hooks/use-messages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, User, Phone, Video, MoreVertical, Paperclip, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ChatInterfaceProps {
  contact: any;
  onEmailClick?: () => void;
}

export const ModernChat: React.FC<ChatInterfaceProps> = ({ contact, onEmailClick }) => {
  const { data: messages = [] } = useMessages(contact?.id);
  const sendMessage = useSendMessage();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !contact) return;
    
    sendMessage.mutate({ contact_id: contact.id, content: input });
    setInput('');
  };

  if (!contact) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/5 space-y-4 rounded-xl border border-border/5">
        <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center border border-border/10">
          <MessageSquareIcon className="w-6 h-6 opacity-20" />
        </div>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest opacity-40">Chat</p>
          <p className="text-[10px] mt-1">Selecciona un contacto para ver el historial</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="h-full flex flex-col bg-card/40 backdrop-blur-xl border-border/10 shadow-2xl overflow-hidden">
      <CardHeader className="py-4 border-b border-border/10 flex flex-row items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border/10">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {contact.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-sm font-bold tracking-tight">{contact.name}</CardTitle>
            <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> En línea
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => toast.info(`Iniciando llamada de voz con ${contact.name}...`)}
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => toast.info(`Iniciando video llamada con ${contact.name}...`)}
          >
            <Video className="h-4 w-4" />
          </Button>
          {onEmailClick && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/5"
              onClick={onEmailClick}
            >
              <MailIcon className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col relative bg-[#ece3d9]">
        {/* WhatsApp-style blurred background pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
             style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }} />
        
        <ScrollArea className="flex-1 px-6 py-6 z-10">
          <div className="space-y-4">
            {messages.map((msg: any) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={cn(
                    "relative max-w-[80%] px-3.5 py-2 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]",
                    isUser 
                      ? "bg-[#d1f8c5] text-[#111b21] rounded-2xl rounded-tr-none" 
                      : "bg-white text-[#111b21] rounded-2xl rounded-tl-none border border-border/5"
                  )}>
                    <p className="text-[13.5px] leading-relaxed pr-10">{msg.content}</p>
                    <div className="flex items-center gap-1 absolute bottom-1 right-2">
                       <span className="text-[9px] opacity-60 font-medium">
                         {format(new Date(msg.timestamp), 'HH:mm')}
                       </span>
                       {isUser && (
                         <div className="flex -space-x-1 items-center opacity-80">
                            <Check className="h-2.5 w-2.5 text-blue-500" />
                            <Check className="h-2.5 w-2.5 text-blue-500" />
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Post Input */}
        <div className="p-4 border-t border-border/10">
          <form onSubmit={handleSend} className="flex gap-2">
            <Button type="button" variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..." 
              className="bg-muted/20 border-border/5 text-xs h-9 rounded-full px-4 focus-visible:ring-primary/20"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || sendMessage.isPending} className="shrink-0 h-9 w-9 rounded-full shadow-lg shadow-primary/20">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

function MessageSquareIcon(props: any) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
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

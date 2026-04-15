import React, { useState, useEffect, useRef } from 'react';
import { useCRMStore } from '@/store/useCRMStore';
import { RetroBox } from '@/components/ui/RetroBox';
import { Send, User, Phone, Video, Info, Paperclip, Smile } from 'lucide-react';
import { format } from 'date-fns';

export const ChatInterface: React.FC = () => {
  const { activeContact, messages, sendMessage, fetchMessages } = useCRMStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeContact) {
      fetchMessages(activeContact.id);
      const interval = setInterval(() => fetchMessages(activeContact.id), 5000);
      return () => clearInterval(interval);
    }
  }, [activeContact, fetchMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeContact) return;
    
    await sendMessage(activeContact.id, input);
    setInput('');
  };

  if (!activeContact) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/50">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 opacity-20" />
        </div>
        <p className="font-medium text-sm">Select a contact to start chatting</p>
        <p className="text-xs opacity-60">Your messages will appear here</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <RetroBox variant="window" title={`Chat with ${activeContact.name}`} className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="flex justify-between items-center pb-3 border-b border-border/50 mb-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-none">{activeContact.name}</h3>
              <span className="text-[10px] text-green-500 font-medium">Online</span>
            </div>
          </div>
          <div className="flex gap-4 text-muted-foreground">
            <button className="hover:text-primary transition-colors"><Phone className="w-4 h-4" /></button>
            <button className="hover:text-primary transition-colors"><Video className="w-4 h-4" /></button>
            <button className="hover:text-primary transition-colors"><Info className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 px-2 pb-4 scrollbar-thin scrollbar-thumb-muted"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`
                    px-4 py-2 rounded-2xl text-sm shadow-sm
                    ${isUser 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-muted/50 text-foreground rounded-tl-none border border-border/50'}
                  `}>
                    {msg.content}
                  </div>
                  <span className="text-[8px] text-muted-foreground mt-1 uppercase tracking-tighter">
                    {format(new Date(msg.timestamp), 'HH:mm')} • {msg.sender}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="pt-4 border-t border-border/50 flex gap-2 items-center px-1">
          <button type="button" className="text-muted-foreground hover:text-primary transition-colors"><Paperclip className="w-4 h-4" /></button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-muted/30 border border-border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <button 
            type="submit"
            disabled={!input.trim()}
            className="w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            <Send className="w-4 h-4 mr-0.5" />
          </button>
        </form>
      </RetroBox>
    </div>
  );
};

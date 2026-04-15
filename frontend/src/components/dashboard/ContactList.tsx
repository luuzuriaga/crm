import React, { useState } from 'react';
import { useCRMStore } from '@/store/useCRMStore';
import { RetroBox } from '@/components/ui/RetroBox';
import { Search, Filter, Phone, Mail, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ContactList: React.FC = () => {
  const { contacts, setActiveContact } = useCRMStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-muted/50 border border-border rounded-md pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm hover:bg-muted font-medium transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 font-medium transition-colors shadow-lg shadow-primary/20">
            Add Contact
          </button>
        </div>
      </div>

      <RetroBox variant="default" className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Info</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Stage</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filteredContacts.map((contact) => (
              <tr 
                key={contact.id} 
                className="hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => setActiveContact(contact)}
              >
                <td className="px-6 py-4">
                  <div className="font-bold text-sm text-foreground">{contact.name}</div>
                  {contact.tags && (
                    <div className="text-[10px] text-primary mt-0.5">{contact.tags}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      {contact.email}
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border",
                    contact.funnel_stage === 'lead' ? "bg-primary/10 text-primary border-primary/20" :
                    contact.funnel_stage === 'following_up' ? "bg-secondary/10 text-secondary border-secondary/20" :
                    "bg-accent/10 text-accent border-accent/20"
                  )}>
                    {contact.funnel_stage.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      contact.status === 'active' ? "bg-green-500" : "bg-muted-foreground"
                    )} />
                    <span className="text-xs capitalize text-foreground/80">{contact.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredContacts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Search className="w-10 h-10 mb-4 opacity-20" />
            <p className="text-sm italic">No contacts found</p>
          </div>
        )}
      </RetroBox>
    </div>
  );
};

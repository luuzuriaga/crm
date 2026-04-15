import React, { useEffect } from 'react';
import { useCRMStore } from '@/store/useCRMStore';
import { RetroBox } from '@/components/ui/RetroBox';
import { MoreHorizontal, Plus, User } from 'lucide-react';

const stages = [
  { id: 'lead', title: 'Prospectos', color: 'bg-primary' },
  { id: 'following_up', title: 'En Seguimiento', color: 'bg-secondary' },
  { id: 'client', title: 'Clientes', color: 'bg-accent' },
];

export const KanbanBoard: React.FC = () => {
  const { contacts, fetchContacts, setActiveContact } = useCRMStore();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <div className="flex gap-6 h-full overflow-x-auto pb-4">
      {stages.map((stage) => {
        const stageContacts = contacts.filter(c => c.funnel_stage === stage.id);
        
        return (
          <div key={stage.id} className="min-w-[320px] flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">
                  {stage.title}
                </h3>
                <span className="bg-muted px-2 py-0.5 rounded text-[10px] text-muted-foreground font-mono">
                  {stageContacts.length}
                </span>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4">
              {stageContacts.map((contact) => (
                <RetroBox 
                  key={contact.id} 
                  variant="default"
                  className="cursor-pointer hover:scale-[1.02] transition-transform"
                  onClick={() => setActiveContact(contact)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm">{contact.name}</h4>
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-4 break-all">
                    {contact.email}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <User className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </div>
                    {contact.tags && (
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                        {contact.tags}
                      </span>
                    )}
                  </div>
                </RetroBox>
              ))}
              
              {stageContacts.length === 0 && (
                <div className="h-32 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center text-muted-foreground text-xs italic">
                  Sin contactos en esta etapa
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

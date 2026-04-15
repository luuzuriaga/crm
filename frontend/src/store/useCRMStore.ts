import { create } from 'zustand';
import { Contact, contactsService } from '@/services/contacts/contacts.service';
import { Message, messagesService } from '@/services/conversations/messages.service';

interface CRMState {
  contacts: Contact[];
  activeContact: Contact | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchContacts: (stage?: string) => Promise<void>;
  setActiveContact: (contact: Contact | null) => void;
  fetchMessages: (contactId: number) => Promise<void>;
  sendMessage: (contactId: number, content: string) => Promise<void>;
  updateContactStage: (contactId: number, stage: string) => Promise<void>;
}

export const useCRMStore = create<CRMState>((set, get) => ({
  contacts: [],
  activeContact: null,
  messages: [],
  isLoading: false,
  error: null,

  fetchContacts: async (stage) => {
    set({ isLoading: true });
    try {
      const contacts = await contactsService.getAll(stage);
      set({ contacts, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  setActiveContact: (contact) => {
    set({ activeContact: contact });
    if (contact) {
      get().fetchMessages(contact.id);
    } else {
      set({ messages: [] });
    }
  },

  fetchMessages: async (contactId) => {
    try {
      const messages = await messagesService.getByContactId(contactId);
      set({ messages });
    } catch (err: any) {
      console.error("Error fetching messages:", err);
    }
  },

  sendMessage: async (contactId, content) => {
    try {
      const newMessage = await messagesService.send({ contact_id: contactId, content });
      set((state) => ({ messages: [...state.messages, newMessage] }));
    } catch (err: any) {
      console.error("Error sending message:", err);
    }
  },

  updateContactStage: async (contactId, stage) => {
    try {
      const updated = await contactsService.update(contactId, { funnel_stage: stage });
      set((state) => ({
        contacts: state.contacts.map((c) => (c.id === contactId ? updated : c)),
        activeContact: state.activeContact?.id === contactId ? updated : state.activeContact
      }));
    } catch (err: any) {
      console.error("Error updating contact stage:", err);
    }
  }
}));

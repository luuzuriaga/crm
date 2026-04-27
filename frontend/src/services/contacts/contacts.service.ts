import api from '../api';
import { MOCK_CONTACTS } from '@/constants/mock-contacts';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  status: string;
  funnel_stage: 'lead' | 'following_up' | 'client' | string;
  tags?: string;
  notes?: string;
  created_at?: string;
}

// In-memory storage for the demo
let localContacts: Contact[] = [...MOCK_CONTACTS];

export const contactsService = {
  getAll: async (stage?: string): Promise<Contact[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (stage) {
      return localContacts.filter(c => c.funnel_stage === stage);
    }
    return localContacts;
  },
  
  getById: async (id: number): Promise<Contact> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const contact = localContacts.find(c => c.id === id);
    if (!contact) throw new Error('Contact not found');
    return contact;
  },

  create: async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newContact: Contact = {
      ...contact,
      id: Math.max(0, ...localContacts.map(c => c.id)) + 1,
      created_at: new Date().toISOString()
    };
    localContacts = [newContact, ...localContacts];
    return newContact;
  },

  update: async (id: number, contact: Partial<Contact>): Promise<Contact> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    let updatedContact: Contact | null = null;
    
    localContacts = localContacts.map(c => {
      if (c.id === id) {
        updatedContact = { ...c, ...contact };
        return updatedContact;
      }
      return c;
    });

    if (!updatedContact) throw new Error('Contact not found');
    return updatedContact;
  },

  delete: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localContacts = localContacts.filter(c => c.id !== id);
  }
};

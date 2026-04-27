import api from '../api';
import { MOCK_MESSAGES } from '@/constants/mock-messages';

export interface Message {
  id: number;
  contact_id: number;
  content: string;
  sender: 'user' | 'contact' | string;
  timestamp: string;
}

// In-memory storage for the demo
let localMessages: Record<number, Message[]> = { ...MOCK_MESSAGES };

export const messagesService = {
  getByContactId: async (contactId: number): Promise<Message[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return localMessages[contactId] || [];
  },

  send: async (payload: { contact_id: number; content: string; sender?: string }): Promise<Message> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newMessage: Message = {
      id: Math.floor(Math.random() * 1000000),
      contact_id: payload.contact_id,
      content: payload.content,
      sender: payload.sender || 'user',
      timestamp: new Date().toISOString()
    };

    if (!localMessages[payload.contact_id]) {
      localMessages[payload.contact_id] = [];
    }
    
    localMessages[payload.contact_id] = [...localMessages[payload.contact_id], newMessage];
    
    return newMessage;
  }
};

import api from '../api';

export interface Message {
  id: number;
  contact_id: number;
  content: string;
  sender: 'user' | 'contact' | string;
  timestamp: string;
}

export const messagesService = {
  getByContactId: async (contactId: number): Promise<Message[]> => {
    const response = await api.get(`/messages/contact/${contactId}`);
    return response.data;
  },

  send: async (message: { contact_id: number; content: string; sender?: string }): Promise<Message> => {
    const response = await api.post('/messages/', message);
    return response.data;
  }
};

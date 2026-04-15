import api from '../api';

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

export const contactsService = {
  getAll: async (stage?: string): Promise<Contact[]> => {
    const response = await api.get('/contacts/', { params: { stage } });
    return response.data;
  },
  
  getById: async (id: number): Promise<Contact> => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  create: async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
    const response = await api.post('/contacts/', contact);
    return response.data;
  },

  update: async (id: number, contact: Partial<Contact>): Promise<Contact> => {
    const response = await api.put(`/contacts/${id}`, contact);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  }
};

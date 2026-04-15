import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsService, Contact } from '@/services/contacts/contacts.service';

export const useContacts = (stage?: string) => {
  return useQuery({
    queryKey: ['contacts', stage],
    queryFn: () => contactsService.getAll(stage),
  });
};

export const useContact = (id: number) => {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => contactsService.getById(id),
    enabled: !!id,
  });
};

export const useUpdateContactStage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stage }: { id: number; stage: string }) => 
      contactsService.update(id, { funnel_stage: stage }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, contact }: { id: number; contact: Partial<Contact> }) => 
      contactsService.update(id, contact),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact', data.id] });
    },
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contact: Omit<Contact, 'id'>) => contactsService.create(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => contactsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

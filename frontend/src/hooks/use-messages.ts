import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesService, Message } from '@/services/conversations/messages.service';

export const useMessages = (contactId: number) => {
  return useQuery({
    queryKey: ['messages', contactId],
    queryFn: () => messagesService.getByContactId(contactId),
    enabled: !!contactId,
    refetchInterval: 5000, // Polling for real-time history
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { contact_id: number; content: string }) => 
      messagesService.send(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.contact_id] });
    },
  });
};

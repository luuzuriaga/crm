import { Message } from '../services/conversations/messages.service';

export const MOCK_MESSAGES: Record<number, Message[]> = {
  1: [
    { id: 101, contact_id: 1, content: "Hola Alex, ¿pudiste revisar la propuesta?", sender: "user", timestamp: "2024-03-22T10:00:00Z" },
    { id: 102, contact_id: 1, content: "Sí, me parece excelente. Me gustaría discutir la integración del Q3.", sender: "contact", timestamp: "2024-03-22T10:15:00Z" }
  ],
  2: [
    { id: 201, contact_id: 2, content: "Hola Sofia, ¿agendamos el demo?", sender: "user", timestamp: "2024-03-22T11:00:00Z" },
    { id: 202, contact_id: 2, content: "Hola! Sí, el jueves a las 3pm nos viene bien.", sender: "contact", timestamp: "2024-03-22T11:30:00Z" }
  ],
  3: [
    { id: 301, contact_id: 3, content: "¡Bienvenido a bordo, Jordan!", sender: "user", timestamp: "2024-03-22T09:00:00Z" },
    { id: 302, contact_id: 3, content: "Gracias, el equipo está emocionado por empezar.", sender: "contact", timestamp: "2024-03-22T09:10:00Z" }
  ]
};

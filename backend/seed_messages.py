import os
import sys
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import random

# Add root directory to path to allow importing app modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import SessionLocal, engine
from app.models.models import Contact, Message

def seed_messages():
    db = SessionLocal()
    try:
        contacts = db.query(Contact).all()
        if not contacts:
            print("No contacts found in database. Seed contacts first.")
            return

        print(f"Found {len(contacts)} contacts. Seeding messages...")

        # Clear existing messages for a clean demo
        db.query(Message).delete()
        db.commit()

        persian_conversations = [
            [
                ("contact", "Hola, me interesa el servicio de consultoría para mi nuevo local en Miraflores."),
                ("user", "¡Hola! Claro que sí, Miraflores es una excelente zona. ¿Qué tipo de negocio están planeando?"),
                ("contact", "Es una sucursal de mi restaurante. Necesitamos optimizar la gestión de inventario."),
                ("user", "Perfecto. Podemos integrar nuestro módulo de inventarios en tiempo real. ¿Le parece una reunión mañana a las 3 PM?"),
                ("contact", "Mañana a las 3 me queda perfecto. Envíame la invitación por favor."),
            ],
            [
                ("contact", "¿Tienen disponible el módulo de facturación electrónica para Perú?"),
                ("user", "Sí, estamos integrados con SUNAT y cumplimos todas las normativas vigentes."),
                ("contact", "Genial. Manejamos un volumen alto en Gamarra y necesitamos velocidad."),
                ("user", "Entiendo perfectamente. Nuestra API procesa miles de documentos por segundo."),
                ("contact", "Me interesa. ¿Pueden hacernos una demo técnica?"),
            ],
            [
                ("contact", "Hola, vi sus servicios en el evento de Mistura. Quisiera saber más sobre los planes."),
                ("user", "¡Qué bueno que nos encontraras en Mistura! Tenemos planes especiales para el sector gastronómico."),
                ("contact", "Necesito algo que me ayude a fidelizar clientes. Mi cevichería está creciendo."),
                ("user", "Felicidades por el crecimiento. Nuestro módulo de CRM tiene herramientas de fidelización muy potentes."),
                ("contact", "Excelente. Somos un equipo pequeño en San Borja, ¿el soporte es personalizado?"),
                ("user", "Absolutamente. Asignamos un consultor dedicado para cada cliente premium."),
            ],
            [
                ("contact", "Necesitamos renovar la flota de logística y buscamos financiamiento."),
                ("user", "Hola. Contamos con partners financieros especializados en leasing para empresas."),
                ("contact", "Perfecto. Operamos en el Callao y la logística de última milla es crítica para nosotros."),
                ("user", "El Callao es un punto clave. Podemos agendar una visita a sus almacenes."),
                ("contact", "Me parece una buena idea. Avísame qué día de la semana les queda mejor."),
            ]
        ]

        messages_to_add = []
        
        for contact in contacts:
            # Pick a conversation template or create one
            template = random.choice(persian_conversations)
            
            # Start dates a few days ago
            start_date = datetime.now() - timedelta(days=random.randint(2, 10))
            
            for i, (sender, content) in enumerate(template):
                timestamp = start_date + timedelta(hours=i*2, minutes=random.randint(1, 59))
                
                msg = Message(
                    contact_id=contact.id,
                    content=content,
                    sender=sender,
                    timestamp=timestamp
                )
                messages_to_add.append(msg)

        db.add_all(messages_to_add)
        db.commit()
        print(f"Successfully seeded {len(messages_to_add)} messages across {len(contacts)} contacts.")

    except Exception as e:
        print(f"Error seeding messages: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_messages()

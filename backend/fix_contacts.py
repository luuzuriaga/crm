import os
import sys

# Add root directory to path to allow importing app modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import SessionLocal
from app.models.models import Contact

def fix_contacts():
    db = SessionLocal()
    try:
        contacts = db.query(Contact).all()
        
        peruvian_personas = [
            {"name": "Juan Quispe", "email": "jquispe@negociosperu.pe", "notes": "Interesado en expandir su ferretería. Requiere control de inventario básico."},
            {"name": "María Rodríguez", "email": "mrodriguez@clinica.com.pe", "notes": "Buscando sistema para gestionar citas médicas. Prioridad media."},
            {"name": "Luis Huamán", "email": "lhuaman@transporte.pe", "notes": "Solicitó presupuesto para flota de camiones. Venta directa."},
            {"name": "Ana Flores", "email": "aflores@bodega.pe", "notes": "Evaluando software de facturación para pequeñas tiendas."},
            {"name": "José Mamani", "email": "jmamani@construccion.pe", "notes": "Interesado en gestión de materiales de obra. Seguimiento semanal."},
            {"name": "Rosa Sánchez", "email": "rsanchez@educacion.edu.pe", "notes": "Consultó sobre licencias administrativas para institutos."},
            {"name": "Carlos García", "email": "cgarcia@textil.com.pe", "notes": "Interesada en exportaciones. Contacto comercial."},
            {"name": "Carmen Rojas", "email": "crojas@pasteleria.pe", "notes": "Buscando optimizar costos de producción en su taller."},
            {"name": "Jorge Díaz", "email": "jdiaz@tecnologia.pe", "notes": "Evaluando integraciones con plataformas de e-commerce locales."},
            {"name": "Elena Torres", "email": "etorres@turismo.pe", "notes": "Interesada en herramientas de marketing para su agencia de viajes."}
        ]

        print(f"Updating {len(contacts)} contacts to Peruvian personas...")

        for i, contact in enumerate(contacts):
            persona = peruvian_personas[i % len(peruvian_personas)]
            contact.name = persona["name"]
            contact.email = f"{contact.id}_{persona['email']}" # Unique email trick
            contact.notes = persona["notes"]
            contact.status = "active"
            
        db.commit()
        print("Successfully updated contacts with names and detailed notes.")

    except Exception as e:
        print(f"Error fixing contacts: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    fix_contacts()

import os
import sys

# Add root directory to path to allow importing app modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import SessionLocal
from app.models.models import Contact
from collections import Counter

def cleanup_duplicates():
    db = SessionLocal()
    try:
        # 1. Obtener todos los contactos
        contacts = db.query(Contact).all()
        
        # 2. Encontrar nombres duplicados
        names = [c.name for c in contacts]
        counts = Counter(names)
        duplicates = [name for name, count in counts.items() if count > 1]
        
        if not duplicates:
            print("No se encontraron nombres duplicados. ¡Tu base de datos está limpia!")
            return

        print(f"Se encontraron {len(duplicates)} nombres con duplicados. Iniciando limpieza...")

        # 3. Procesar duplicados
        # Usaremos una lista de nombres frescos para reemplazar en caso de ser necesario
        fresh_names = [
            "Fernando Belaunde", "Valentín Paniagua", "Gloria Helfer", "Javier Pérez", 
            "Estela Morales", "Ricardo Gareca", "Paolo Guerrero", "Jefferson Farfán"
        ]
        name_idx = 0

        for name in duplicates:
            # Encontrar todos los registros con este nombre
            records = db.query(Contact).filter(Contact.name == name).all()
            
            # Mantener el primero, renombrar los demás
            for i in range(1, len(records)):
                old_name = records[i].name
                if name_idx < len(fresh_names):
                    new_name = fresh_names[name_idx]
                    name_idx += 1
                else:
                    new_name = f"{old_name} ({i+1})"
                
                records[i].name = new_name
                print(f"Renombrado: '{old_name}' (ID: {records[i].id}) -> '{new_name}'")

        db.commit()
        print("\nLimpieza completada exitosamente.")

    except Exception as e:
        print(f"Error durante la limpieza: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    cleanup_duplicates()

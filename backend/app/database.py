import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Cargamos las variables del archivo .env
load_dotenv()

# Configuración de la URL de conexión obtenida desde las variables de entorno
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Añadimos connect_args para forzar SSL, necesario para Supabase
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"sslmode": "require"}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Generador de sesiones de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
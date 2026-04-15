from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
# Importaciones directas de los archivos
from app.routers.contacts import router as contacts_router
from app.routers.mocks import router as mocks_router
from app.routers.messages import router as messages_router

# Creamos las tablas en PostgreSQL
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="🧩 Startup CRM API",
    description="API para gestión de leads y clientes con integración de canales",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción pon la URL de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluimos los routers usando los nombres que importamos arriba
app.include_router(contacts_router)
app.include_router(mocks_router)
app.include_router(messages_router)

@app.get("/")
def read_root():
    return {"message": "Startup CRM API is running 🚀", "docs": "/docs"}
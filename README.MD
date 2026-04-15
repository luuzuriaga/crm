# 🧩 Startup CRM

## 📌 Descripción General
Startup CRM es una aplicación diseñada para centralizar la gestión de contactos, comunicaciones y el seguimiento de clientes potenciales (leads) y clientes activos.

El sistema permite gestionar conversaciones en tiempo real mediante la integración de canales como WhatsApp y correo electrónico, facilitando la automatización de seguimientos y la organización de contactos según su etapa dentro del proceso de ventas.

---
###
## 🎯 Objetivo del Proyecto
Desarrollar un CRM inteligente orientado a startups que permita:

- Gestionar contactos y clasificarlos según su etapa en el proceso de ventas.
- Centralizar la comunicación con clientes.
- Automatizar tareas de seguimiento.
- Visualizar métricas clave del negocio.
- Facilitar la colaboración entre equipos.

# ⚙️ Backend API - CRM Project

Este es el microservicio de backend para la aplicación web. Está construido con **FastAPI** y diseñado para ejecutarse en contenedores Docker, conectándose a una base de datos **PostgreSQL**.

## 🛠️ Stack Tecnológico

* **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
* **Lenguaje:** Python 3.12
* **ORM:** SQLAlchemy
* **Base de Datos:** PostgreSQL 15
* **Servidor ASGI:** Uvicorn
* **Infraestructura:** Docker & Docker Compose (Multi-stage build)



## 🚀 Configuración del Entorno de Desarrollo

### 1. Variables de Entorno
Antes de levantar el servidor, debes configurar las credenciales de la base de datos. 

1. Copia el archivo de ejemplo:

```
cp .env.example .env
```

2. Asegúrate de que el archivo .env tenga la siguiente estructura (sin usar comillas):

POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_DB=crm_db
DATABASE_URL=postgresql://postgres:admin@db:5432/crm_db

2. Ejecución con Docker (Recomendado)
El proyecto utiliza un Dockerfile optimizado en múltiples etapas (multi-stage) y se apoya en un script entrypoint.sh para levantar Uvicorn de forma segura.

Desde la raíz del proyecto (una carpeta atrás), ejecuta:

```bash
docker compose up --build -d backend
```


## 📚 Documentación de la API

FastAPI genera automáticamente la documentación interactiva. Una vez que el contenedor esté corriendo, puedes acceder a:

Swagger UI (Pruebas interactivas): http://localhost:8000/docs

ReDoc (Documentación alternativa): http://localhost:8000/redoc




# 🚀 CRM Startup - Guía de Configuración Local

Este proyecto utiliza **Docker** y **Docker Compose** para orquestar los servicios de Base de Datos (PostgreSQL), Backend (FastAPI) y Frontend (React).

---

## 🛠 Requisitos Previos

* **Docker Desktop** instalado y en ejecución.
* Si usas Windows, asegúrate de tener configurado **WSL2** con Ubuntu.

---

## ⚙️ Configuración Inicial

### 1. Variables de Entorno (.env)
Para que el sistema funcione, es **obligatorio** crear un archivo `.env` dentro de la carpeta `/backend`. 

> **Nota importante:** No utilices comillas (`" "`) en los valores de las variables, ya que Docker las interpreta como parte de la cadena de texto.

**Contenido recomendado para `backend/.env`:**
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_DB=crm_db
DATABASE_URL=postgresql://postgres:admin@db:5432/crm_db

2. Archivo de ejemplo
Se ha incluido un archivo backend/.env.example con la estructura base. Puedes copiarlo y renombrarlo:
cp backend/.env.example backend/.env

🚀 Ejecución del Proyecto
Desde la raíz del repositorio (donde se encuentra el archivo docker-compose.yml), ejecuta el siguiente comando:

Bash
docker compose up --build -d
🔍 Acceso a los servicios
Una vez que los contenedores estén en verde, puedes acceder a:

Backend (Swagger UI): http://localhost:8000/docs

Frontend (React/Vite): http://localhost:3000

Base de Datos: Puerto 5432 (Conexión local vía DBeaver o similar).

🆘 Solución de Problemas (Troubleshooting)
❌ Error: ArgumentError: Expected string or URL object, got None
Este error ocurre cuando Python no encuentra la variable DATABASE_URL.

Verifica que el archivo .env esté dentro de la carpeta backend/.

Asegúrate de que el nombre sea exactamente DATABASE_URL (en mayúsculas).

❌ Error: exec format error o falla en entrypoint.sh
Si trabajas desde Windows/WSL, el script de arranque puede tener caracteres invisibles de Windows. Corrígelo con:

Bash
sed -i 's/\r$//' backend/entrypoint.sh
chmod +x backend/entrypoint.sh
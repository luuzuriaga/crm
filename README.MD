# 🧩 Startup CRM — Intelligent Relationship Management

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Elevating Startup Growth through Intelligent Communication and Seamless lead tracking.**

Startup CRM is a high-performance, professional-grade dashboard designed for modern companies. It centralizes WhatsApp, email, and funnel management into a single "Source of Truth," enabling teams to focus on closing deals rather than managing spreadsheets.

---

## 📖 Project Vision

### **Sector de Negocio**
**Cross-Industry:** Diseñado para ser versátil y adaptable a cualquier industria que requiera una gestión de clientes dinámica y omnicanal.

### **Necesidad del Cliente**
Las startups enfrentan el reto de gestionar múltiples canales de comunicación (WhatsApp, Email) de forma fragmentada. Buscan un CRM inteligente que:
- Integre nativamente **WhatsApp Cloud API** y **Email**.
- Permita gestionar conversaciones en **tiempo real**.
- Automatice seguimientos y segmente usuarios de manera eficiente.
- Ofrezca una experiencia **colaborativa y asincrónica**.

### **Objetivo Principal**
Desarrollar un centro de mando inteligente que centralice la comunicación y automatice el ciclo de vida del cliente, priorizando la simplicidad y el impacto visual.

---

## ✨ Características Principales

| Característica | Descripción |
| :--- | :--- |
| **🚀 Gestión de Leads & Funnel** | Kanban dinámico (Drag-and-Drop) para mover prospectos entre etapas (Prospecto, Seguimiento, Cliente). |
| **💬 Comunicación Omnicanal** | Integración nativa con WhatsApp Cloud API y SMTP/Brevo para centralizar el historial de mensajes. |
| **📧 Email con Plantillas** | Envío y registro de correos electrónicos utilizando etiquetas personalizables y plantillas predefinidas. |
| **⏰ Recordatorios Automáticos** | Sistema de alertas para tareas críticas y seguimientos pendientes para que nunca se pierda un lead. |
| **📊 Panel de Métricas (KPIs)** | Visualización de métricas clave: tasa de conversión, contactos activos y volumen de mensajes. |
| **📥 Exportación de Datos** | Generación de reportes en formatos **CSV** y **PDF** para análisis externo. |
| **🛠️ Personalización Total** | Configuración de etiquetas, filtros guardados y vistas personalizadas por el usuario. |

---

## 🛠️ Stack Tecnológico

### **Frontend**
- **Next.js 16 (App Router):** Máximo rendimiento y SEO.
- **React 19:** Con las últimas funcionalidades concurrentes.
- **Tailwind CSS 4:** Estilizado moderno y ultra-rápido.
- **TanStack Query (React Query):** Gestión de estado de servidor y caching.
- **Framer Motion:** Micro-animaciones para una experiencia fluida.
- **Zustand:** Estado global ligero y eficiente.

### **Backend**
- **FastAPI:** Framework de alto rendimiento para Python.
- **PostgreSQL 15:** Base de datos relacional robusta.
- **SQLAlchemy:** ORM potente para gestión de modelos.
- **Docker:** Orquestación completa mediante Docker Compose.

---

## 🔌 Integraciones Externas

El corazón del CRM reside en su capacidad de conectar con plataformas líderes:
- **Meta (WhatsApp Cloud API):** Conversaciones directas e historial integrado.
- **Brevo / SMTP:** Motor de envío de correos transaccionales y de marketing.

---

## 🚀 Guía de Instalación Local

### Requisitos Previos
- **Docker & Docker Compose**
- **Node.js 18+** (Si se desea ejecutar fuera de Docker)
- **Python 3.12+** (Si se desea ejecutar fuera de Docker)

### Paso 1: Clonar e Inicializar
```bash
git clone https://github.com/No-Country-simulation/S03-26-Equipo-04-Web-App-Development.git
cd S03-26-Equipo-04-Web-App-Development
```

### Paso 2: Configuración de Entorno
Crea un archivo `.env` en la carpeta `backend/`:
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_DB=crm_db
DATABASE_URL=postgresql://postgres:admin@db:5432/crm_db
```

### Paso 3: Levantar con Docker (Recomendado)
```bash
docker compose up --build -d
```

Una vez levantado, accede a:
- **Frontend Dashboard:** [http://localhost:3000](http://localhost:3000)
- **Documentación API (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📋 Entregables Esperados

- [x] **Prototipo Funcional:** Flujos básicos de usuario, comunicación y segmentación.
- [x] **Panel de Métricas:** Visualización de KPIs clave (contactos activos, mensajes, tasa de respuesta).
- [ ] **Documentación de Endpoints:** Guía detallada de la API (Swagger integrado).
- [ ] **Exportación Multi-formato:** Soporte completo para PDF/CSV.

---

## 🆘 Troubleshooting & Soporte

- **Error de Conexión DB:** Asegúrese de que el archivo `.env` no tenga comillas en los valores.
- **Scripts de Arranque (Windows):** Si `entrypoint.sh` falla, ejecute `sed -i 's/\r$//' backend/entrypoint.sh`.

---

<p align="center">
  Desarrollado con ❤️ para el ecosistema Startup.
</p>
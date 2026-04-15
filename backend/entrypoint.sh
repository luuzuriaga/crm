#!/bin/sh

echo "🚀 Iniciando el servidor FastAPI..."

# Usar 'python -m uvicorn' es más seguro en entornos Docker
exec python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
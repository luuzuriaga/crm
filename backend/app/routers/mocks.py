from fastapi import APIRouter

router = APIRouter(tags=["Integrations (Mocks)"])

@router.post("/webhook/whatsapp")
async def whatsapp_webhook_mock(payload: dict):
    print(f"DEBUG: WhatsApp Payload recibido -> {payload}")
    return {
        "status": "success", 
        "message": "Webhook recibido correctamente",
        "mock_received": payload
    }

@router.post("/email/send")
async def send_email_mock(email_payload: dict):
    target_email = email_payload.get("email", "unknown")
    return {
        "status": "sent",
        "to": target_email,
        "provider_mock": "Brevo API Simulator"
    }
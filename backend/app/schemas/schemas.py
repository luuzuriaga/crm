from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

# --- ESQUEMAS DE MENSAJES ---
class MessageCreate(BaseModel):
    contact_id: int
    content: str
    sender: Optional[str] = "user"

class MessageResponse(BaseModel):
    id: int
    contact_id: int
    content: str
    sender: str
    timestamp: datetime

    class Config:
        from_attributes = True

# --- ESQUEMAS DE CONTACTOS ---
class ContactBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    status: Optional[str] = "active"
    funnel_stage: Optional[str] = "lead"
    tags: Optional[str] = None
    notes: Optional[str] = None

class ContactCreate(ContactBase):  # <--- ESTE ES EL QUE FALTABA
    pass

class ContactUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    status: Optional[str] = None
    funnel_stage: Optional[str] = None
    tags: Optional[str] = None
    notes: Optional[str] = None

class ContactResponse(ContactBase):
    id: int
    
    class Config:
        from_attributes = True
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    status = Column(String, default="active") 
    funnel_stage = Column(String, default="lead") 
    tags = Column(String, nullable=True) 
    notes = Column(Text, nullable=True) 
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relación para ver los mensajes desde el contacto
    messages = relationship("Message", back_populates="contact", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    contact_id = Column(Integer, ForeignKey("contacts.id"))
    content = Column(Text, nullable=False)
    sender = Column(String, default="system") # "user", "contact" o "system"
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    # Relación inversa
    contact = relationship("Contact", back_populates="messages")
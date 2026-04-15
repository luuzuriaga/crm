from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.models import Message
from app.schemas.schemas import MessageCreate, MessageResponse

router = APIRouter(prefix="/messages", tags=["Messages & History"])

@router.post("/", response_model=MessageResponse, status_code=201)
def create_message(message: MessageCreate, db: Session = Depends(get_db)):
    db_message = Message(**message.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/contact/{contact_id}", response_model=List[MessageResponse])
def get_messages_by_contact(contact_id: int, db: Session = Depends(get_db)):
    return db.query(Message).filter(Message.contact_id == contact_id).all()
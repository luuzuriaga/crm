from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.models import Contact
from app.schemas.schemas import ContactCreate, ContactResponse, ContactUpdate

router = APIRouter(prefix="/contacts", tags=["Contacts"])

@router.post("/", response_model=ContactResponse, status_code=201)
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    # Verificar si ya existe un contacto con el mismo nombre
    existing_name = db.query(Contact).filter(Contact.name == contact.name).first()
    if existing_name:
        raise HTTPException(status_code=400, detail="Un contacto con este nombre ya existe")
        
    # Verificar si ya existe un contacto con el mismo email
    existing_email = db.query(Contact).filter(Contact.email == contact.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Un contacto con este email ya existe")

    db_contact = Contact(**contact.model_dump())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@router.get("/", response_model=List[ContactResponse])
def get_all_contacts(stage: str = None, db: Session = Depends(get_db)):
    query = db.query(Contact)
    if stage:
        query = query.filter(Contact.funnel_stage == stage)
    return query.all()

@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact_by_id(contact_id: int, db: Session = Depends(get_db)):
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contacto no encontrado")
    return db_contact

@router.put("/{contact_id}", response_model=ContactResponse)
def update_contact(contact_id: int, contact: ContactUpdate, db: Session = Depends(get_db)):
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contacto no encontrado")
    
    update_data = contact.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_contact, key, value)
        
    db.commit()
    db.refresh(db_contact)
    return db_contact

@router.delete("/{contact_id}", status_code=204)
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not db_contact:
        raise HTTPException(status_code=404, detail="Contacto no encontrado")
    
    db.delete(db_contact)
    db.commit()
    return {"message": "Contacto eliminado"}
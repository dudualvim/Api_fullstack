from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from ..db.database import get_db
from ..models.usuario import User, UserRole
from ..models.empresa import Empresa
from ..schemas.usuario_schemas import UserCreate, UserResponse
from ..core.security import get_current_user, get_password_hash
from typing import List

router = APIRouter()

@router.get("/list", response_model=List[UserResponse])
def list_users(db: Session = Depends(get_db)):
    users = db.query(User).options(joinedload(User.empresa)).all()
    return users

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(
        email=user.email,
        password=get_password_hash(user.password),
        name=user.name,
        role=user.role,
        empresa_id=user.empresa_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

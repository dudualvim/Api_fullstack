from sqlalchemy.orm import Session
from ..models.usuario import User
from ..core.security import get_password_hash

def get_usuario_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db, email: str, password: str):
    hashed_password = get_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
from datetime import timedelta
from sqlalchemy.orm import Session
from ..repositories.usuario_repository import get_usuario_by_email
from ..core.security import verify_password, create_access_token

def authenticate_user(db: Session, email: str, password: str):
    usuario = get_usuario_by_email(db, email)
    if usuario and verify_password(password, usuario.password):
        return usuario
    return None

def login_user(db: Session, email: str, password: str):
    usuario = authenticate_user(db, email, password)
    if not usuario:
        return None
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": usuario.email, "role": usuario.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

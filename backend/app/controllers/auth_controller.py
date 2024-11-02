from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from jose import JWTError
from ..schemas.auth_schemas import TokenSchema, LoginSchema
from ..db.database import get_db
from ..service.auth_service import authenticate_user
from ..core.security import create_access_token, decode_token, create_refresh_token
import logging

logger = logging.getLogger(__name__)
ACCESS_TOKEN_EXPIRE_MINUTES = 40
REFRESH_TOKEN_EXPIRE_DAYS = 7

router = APIRouter()

@router.post("/login", response_model=TokenSchema)
def login(login_data: LoginSchema, db: Session = Depends(get_db)):
    user = authenticate_user(db, login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha inválidos.",
        )

    access_token_expires = timedelta(minutes=40)
    refresh_token_expires = timedelta(days=7)

    # Gerar tokens de acesso e de refresh com as informações do usuário
    access_token = create_access_token(
        data={"sub": user.email, "type": "access", "role": user.role, "email": user.email},
        expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(
        data={"sub": user.email, "type": "refresh", "email": user.email},
        expires_delta=refresh_token_expires
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/refresh-token", response_model=TokenSchema)
def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    try:
        # Decodifica e valida o token de refresh
        payload = decode_token(refresh_token)
        
        # Validações explícitas para o token de refresh
        if not payload.sub:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token está faltando o campo 'sub'."
            )
            
        if payload.type != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Tipo de token inválido."
            )

        # Gerar novos tokens de acesso e de refresh
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

        new_access_token = create_access_token(
            data={"sub": payload.sub, "type": "access", "email": payload.email},
            expires_delta=access_token_expires
        )
        
        new_refresh_token = create_refresh_token(
            data={"sub": payload.sub, "type": "refresh", "email": payload.email},
            expires_delta=refresh_token_expires
        )

        return {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "token_type": "bearer"
        }
        
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Formato inválido do token."
        )

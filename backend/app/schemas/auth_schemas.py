from pydantic import BaseModel, EmailStr
from typing import Optional
from app.core.enums import UserRole  # Importe UserRole do arquivo enums.py

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: str
    sub: str 
    type: str | None = None
from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime
from app.core.enums import UserRole

class UserBase(BaseModel):
    email: EmailStr
    name: str 
    role: UserRole
    empresa_id: Optional[int] = None 

class UserCreate(UserBase):
    password: str
    empresa_id: Optional[int] = None

class UserBasicResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

class UserResponse(UserBasicResponse):
    empresa: Optional["EmpresaBasicResponse"] = None


from .empresa_schemas import EmpresaBasicResponse

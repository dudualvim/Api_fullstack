from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime
from .usuario_schemas import UserBasicResponse

class EmpresaBase(BaseModel):
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    cnpj: Optional[str] = None
    status: Optional[bool] = True

class EmpresaCreate(EmpresaBase):
    pass

class EmpresaBasicResponse(EmpresaBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None


class EmpresaResponse(BaseModel):
    id: int
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    cnpj: Optional[str] = None
    status: bool
    users: List[UserBasicResponse] = []

    class Config:
        orm_mode = True
 

class EmpresaUpdate(EmpresaBase):
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    cnpj: Optional[str] = None
    status: Optional[bool] = None

# Configuração de referência cruzada
from .usuario_schemas import UserBasicResponse
